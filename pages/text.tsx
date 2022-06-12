import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react'
import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { usePayment } from '../context/usePayment'
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { web3 } from '@project-serum/anchor';
import axios from 'axios';
import { Product } from '../types/product';
import { addProductSupa, getProductSupa } from '../supabase/product';


const Test: NextPage = () => {
    const payment = usePayment()
    const wallet = useAnchorWallet()
    const wallet1 = useWallet()
    console.log(wallet?.publicKey);
    const [product, setProduct] = useState<Product>()
    const [products, setProducts] = useState<Product[]>()
    const [productsid, setProductsid] = useState<web3.PublicKey[]>()

    useEffect(() => {
        if (!wallet) {
            return
        }
        const getProducts = async () => {
            const products = await getProductSupa()
            let fetchedProducts: Product[] = []
            let ids: web3.PublicKey[] = []
            for (let i = 0; i< products?.length; i++) {
                const key = new web3.PublicKey(products[i].id)
                const indivProduct = await payment.getProductDetails(key)
                if (!indivProduct) {
                    continue
                }
                fetchedProducts.push(indivProduct)
                ids.push(key)
                console.log(fetchedProducts);
                
            }
            console.log(fetchedProducts);
            setProductsid(ids)
            setProducts(fetchedProducts)
        }
        getProducts()
    }, [wallet, addProductSupa])

    const add = async () => {
        const account = await payment.addProduct(1)
        console.log(account.toBase58());

        const product = await payment.getProductDetails(account)
        await addProductSupa(account.toBase58(), "623L46fZw5tdnzzx8pqoWTnNVwQem1Zm315aYpc4wFFg")
        console.log(product);
        setProduct(product)

    }

    const transact = async () => {
        await payment.sendProductTransaction(wallet?.publicKey, products[0], productsid[0])
    }



    return (
        <div className="h-screen flex flex-row gap-4 items-center justify-center">
            <button className="p-2 bg-blue-200 rouded-md" onClick={payment.initAuthorities}>
                Add Authority
      </button>
            <WalletModalProvider>
                <WalletMultiButton />
            </WalletModalProvider>
            <button className="p-2 bg-blue-200 rouded-md" onClick={add}>
                Add Product
      </button>
            <button className="p-2 bg-blue-200 rouded-md" onClick={add}>
                Login
      </button>
      <button className="p-2 bg-blue-200 rouded-md" onClick={transact}>
          transact
      </button>
            <div className="flex flex-col">
                <div>
                    {
                        product && product.payee.toBase58()
                    }
                </div>
                <div>
                    {
                        product && product.price.toNumber()
                    }
                </div>
                <div>
                    {
                        products && products?.map((item, index) => {
                            return (
                                <div>
                                    <div>
                                        {item.price.toNumber()}
                                    </div>
                                    <div>
                                        {item.authorityGroup.toBase58()}
                                    </div>
                                    <div>
                                        {item.payee.toBase58()}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Test
