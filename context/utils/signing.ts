import { getProgram } from './program';
import { getProvider } from './provider';
import { BN, Program, Provider, Wallet, web3 } from '@project-serum/anchor';
import { Transaction } from '@solana/web3.js';

export const signTransaction = async (wallet: Wallet, tx: Transaction) => {
    const provider = await getProvider(wallet)
    let blockhashObj = await provider?.connection.getLatestBlockhash()
    tx.recentBlockhash = blockhashObj?.blockhash
    const signedTx = await wallet.signTransaction(tx)
    return signedTx
}

export const signTransactions = async (wallet: Wallet, txs: Transaction[]) => {
    const provider = await getProvider(wallet)
    let blockhashObj = await provider?.connection.getLatestBlockhash()
    for (let i = 0; i < txs.length; i++) {
        txs[i].recentBlockhash = blockhashObj?.blockhash
        txs[i] = await wallet.signTransaction(txs[i])
    }
    return txs
}