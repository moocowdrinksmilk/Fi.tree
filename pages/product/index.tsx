import React, { useEffect, useState } from "react"
import { AiOutlineEllipsis } from "react-icons/ai"
import SideBar from "../../components/homepage/Sidebar"
import ProductItem from "../../components/product/ProductItem"
import Link from 'next/link'
import { getProductSupa, Product } from "../../supabase/product"
import { useAnchorWallet } from "@solana/wallet-adapter-react"
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui"


const Product = () => {
    const wallet = useAnchorWallet()
    const [products, setProducts] = useState<Product[]>()

    useEffect(() => {
        if (!wallet) {
            return
        }
        getProductSupa(wallet?.publicKey).then(res => {
            setProducts(res)
        })
    }, [wallet])
    return (
        <div className="row bg-gray-50">
            <SideBar />

            <div className="flex-1 bg-gray-100 col">
                <div className="row h-20">

                </div>
                <div className="col px-20 w-full gap-10">
                    <div className="row gap-20">
                        <h1 className="text-3xl font-semibold">
                            Products
                        </h1>

                        <Link href="/product/add">
                            <button className="bg-white rounded-md px-4 hover:bg-gray-200">
                                + Add Product
                            </button>
                        </Link>
                        <WalletModalProvider>
                            <WalletMultiButton />
                        </WalletModalProvider>
                    </div>

                    <div className="row gap-20 text-md item-center">
                        <div className="border-b-2 border-blue-300">
                            Active
                        </div>

                        <div>
                            Inactive
                        </div>
                    </div>

                    <div className="row justify-between w-full">
                        <input type="text" className="w-4/6 h-8 rounded-md px-2" />

                        <div className="row gap-2 w-full justify-end items-center">
                            <div>
                                Sort by
                            </div>

                            <select className="w-1/6 h-8 rounded-md" name="" id="">
                                <option value=""></option>
                            </select>
                        </div>
                    </div>

                    <div className="col w-full">
                        {
                            products && products.map((item, index) => {
                                return (
                                    <ProductItem
                                        name={item.name}
                                        recurring={item.recurring}
                                        created={item.created_at}
                                    />
                                )
                            })
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product