import { ConnectionProvider, WalletProvider, useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, sendAndConfirmTransaction, Transaction } from '@solana/web3.js';
import React, { useMemo, useState } from 'react';
import { PaymentContext } from './usePayment'
import { BN, Program, Provider, web3 } from '@project-serum/anchor';
import { getProgram } from './utils/program';
import { getProvider } from './utils/provider';
import { notification } from 'antd';
import {
    createAssociatedTokenAccount,
    createMint,
    TOKEN_PROGRAM_ID, NATIVE_MINT, createSyncNativeInstruction, getAccount, createAssociatedTokenAccountInstruction, getAssociatedTokenAddress, getOrCreateAssociatedTokenAccount
} from "@solana/spl-token";
import { Product } from '../types/product';
import { addTransactionSupa } from '../supabase/transaction';
import { getAuthorityFromUserPubKey } from '../supabase/authority';
import {Authority} from '../supabase/authority'

interface props {
    children: any
}

const PaymentProvider = (props: props) => {
    const wallet = useAnchorWallet()
    const solWallet = useWallet()
    const [authority, setAuthority] = useState("")

    const sendProductTransaction = async (productAccountKey: web3.PublicKey) => {
        const provider = await getProvider(wallet)
        const program = await getProgram(provider as Provider)
        const tokenAccount = await getAssociatedTokenAddress(new web3.PublicKey("Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr"), wallet?.publicKey)
        
        // const addWrappedSol = new web3.Transaction().add(
        //     web3.SystemProgram.transfer({
        //         fromPubkey: key,
        //         toPubkey: tokenAccount,
        //         lamports: product.price.toNumber()
        //     }),
        //     createSyncNativeInstruction(
        //         tokenAccount
        //     )
        // )
        // addWrappedSol.feePayer = wallet.publicKey
        // let blockhashObj1 = await provider?.connection.getLatestBlockhash()
        // addWrappedSol.recentBlockhash = blockhashObj1?.blockhash
        // const signedTxws = await wallet.signTransaction(addWrappedSol)
        // const txIdws = await provider?.connection.sendRawTransaction(signedTxws.serialize())
        // await provider?.connection.confirmTransaction(txIdws as string)
        const tokenAccountDetails = await getAccount(provider?.connection, tokenAccount, "confirmed")
        console.log(tokenAccountDetails);
        
        const balance = tokenAccountDetails.amount
        console.log(balance.toString());
        console.log(120 * 1000000);
        
        
        
        

        const product = await getProductDetails(new web3.PublicKey("9Mshty3EG7ni2H8N5eLmFQpfFdYeqD48kxbitgFhdYxm"))
        const tx = program.transaction.transactProduct({
            accounts: {
                signer: wallet?.publicKey,
                product: productAccountKey,
                sendingAccount: tokenAccount,
                receivingAccount: product.tokenAccount,
                tokenProgram: TOKEN_PROGRAM_ID
            }
        })
            tx.feePayer = wallet.publicKey
            let blockhashObj = await provider?.connection.getLatestBlockhash()
            tx.recentBlockhash = blockhashObj?.blockhash
            const signedTx = await wallet.signTransaction(tx)
            const txId = await provider?.connection.sendRawTransaction(signedTx.serialize())
            await provider?.connection.confirmTransaction(txId as string)
            console.log(txId);
            addTransactionSupa(txId, productAccountKey.toBase58(), product.authorityGroup.toBase58())
            
    }

    const initAuthorities = async () => {
        if (!wallet) {
            return
        }
        try {
            const provider = await getProvider(wallet)
            const program = await getProgram(provider as Provider)
            const newAuthoritiesAccount = web3.Keypair.generate()
            const tx = program.transaction.initAuthorities({
                accounts: {
                    signer: wallet.publicKey,
                    authorities: newAuthoritiesAccount.publicKey,
                    systemProgram: web3.SystemProgram.programId
                }
            })
            tx.feePayer = wallet.publicKey
            let blockhashObj = await provider?.connection.getLatestBlockhash()
            tx.recentBlockhash = blockhashObj?.blockhash
            tx.sign(newAuthoritiesAccount)
            const signedTx = await wallet.signTransaction(tx)
            const txId = await provider?.connection.sendRawTransaction(signedTx.serialize())

            await provider?.connection.confirmTransaction(txId as string)
            console.log(newAuthoritiesAccount.publicKey.toBase58());

            setAuthority(newAuthoritiesAccount.publicKey.toBase58())
        } catch (e) {
            notification.error({
                message: e.message,
                placement: "bottomLeft"
            })
        }
    }

    const addProduct = async (amount: number, authority: Authority) => {
        if (!wallet) {
            return
        }

        try {
            const provider = await getProvider(wallet) as Provider
            const program = await getProgram(provider)
            const newProduct = web3.Keypair.generate()

            const tokenAccount = await getTokenAccount(new web3.PublicKey("9Mshty3EG7ni2H8N5eLmFQpfFdYeqD48kxbitgFhdYxm"))
            console.log(tokenAccount, "returned token account");
            console.log(authority);
            

            const tx = program.transaction.initProduct(
                new BN(amount * 1000000), {
                accounts: {
                    signer: wallet.publicKey,
                    product: newProduct.publicKey,
                    tokenAccount: tokenAccount,
                    authorityGroup: new web3.PublicKey(authority.id),
                    systemProgram: web3.SystemProgram.programId
                }
            }
            )
            tx.feePayer = wallet.publicKey
            let blockhashObj = await provider?.connection.getLatestBlockhash()
            tx.recentBlockhash = blockhashObj?.blockhash
            tx.sign(newProduct)
            const signedTx = await wallet.signTransaction(tx)
            const txId = await provider?.connection.sendRawTransaction(signedTx.serialize())
            await provider?.connection.confirmTransaction(txId as string)
            console.log(newProduct.publicKey);
            
            return newProduct.publicKey
        } catch (e) {
            console.log(e);

            notification.error({
                message: e.message,
                placement: "bottomLeft"
            })
        }
    }

    const getProductDetails = async (publicKey: web3.PublicKey) => {
        if (!wallet) {
            return
        }
        const provider = await getProvider(wallet) as Provider
        const program = await getProgram(provider)
        const productAccount = await program.account.product.fetch(publicKey)
        console.log(productAccount);

        return productAccount
    }

    const getTokenAccount = async (mint: web3.PublicKey) => {
        if (!wallet) {
            return
        }

        const provider = await getProvider(wallet) as Provider
        const program = await getProgram(provider)
        const tokenAccount = await getAssociatedTokenAddress(
            mint,
            wallet?.publicKey as web3.PublicKey
        )
        try {
            const tokenAccountTransaction = new Transaction().add(
                createAssociatedTokenAccountInstruction(
                    wallet?.publicKey as web3.PublicKey,
                    tokenAccount,
                    wallet?.publicKey as web3.PublicKey,
                    mint
                )
            )
            tokenAccountTransaction.feePayer = wallet?.publicKey
            let blockhashObj = await provider?.connection.getLatestBlockhash()
            tokenAccountTransaction.recentBlockhash = blockhashObj?.blockhash
            const signedTx = await wallet?.signTransaction(tokenAccountTransaction)
            console.log(signedTx);

            const txId = await provider.connection.sendRawTransaction(signedTx?.serialize())
            console.log(txId);

            await provider.connection.confirmTransaction(txId)
            return tokenAccount
        } catch (e) {
            console.log(e);

        }
        finally {
            return tokenAccount
        }
    }

    return (

        <PaymentContext.Provider value={{
            sendProductTransaction,
            initAuthorities,
            addProduct,
            getProductDetails
        }}>
            {props.children}
        </PaymentContext.Provider>
    )
}

export default PaymentProvider