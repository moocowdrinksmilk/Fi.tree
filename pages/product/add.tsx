import FormItem from "../../components/product/FormItem"
import { useForm, SubmitHandler } from "react-hook-form";
import { Image } from 'antd';
import { FaChevronLeft } from 'react-icons/fa'
import Link from 'next/link'
import { usePayment } from "../../context/usePayment";
import React, { useState } from "react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { addProductSupa, Product } from '../../supabase/product'
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { getAuthorityFromUserPubKey } from "../../supabase/authority";
import { useRouter } from 'next/router'

export interface IFormInput {
    name: string
    category: string
    description: string
    pricingModel: string
    price: number
    billingCycle: string
    shipping: number
}


const Add = () => {
    const { register, handleSubmit } = useForm<IFormInput>();
    const payment = usePayment()
    const wallet = useAnchorWallet()
    const [recurring, setRecurring] = useState(true)
    const router = useRouter()

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        if (!wallet) {
            return
        }
        const authority = await getAuthorityFromUserPubKey(wallet.publicKey.toBase58())
        if (!authority) {
            return
        }

        const pubkey = await payment.addProduct(data.price, authority)

         await addProductSupa(
            pubkey.toBase58(),
            authority?.id,
            data.name,
            data.category,
            data.pricingModel,
            data.price,
            recurring,
            2,
            data.shipping,
            data.description
        )
        router.push("/product")
    };


    return (
        <div className="col relative">
            <div className="row w-full px-20 pt-6">
                <Link href="/product">
                    <FaChevronLeft size={20} className="cursor-pointer" />
                </Link>
            </div>
            <div className="px-20 py-10">
                <h1 className="text-2xl font-semibold">
                    Product Information
                </h1>
                <form className="flex-1" onSubmit={handleSubmit(onSubmit)}>
                    <div className="row w-full gap-10">


                        <div className="flex-1 col gap-8 py-10">
                            <FormItem
                                title="Product Name"
                                description="Do not exceed 20 characters when entering the product name"
                                register={register("name", { required: true, maxLength: 20 })}
                            />

                            <FormItem
                                title="Category"
                                register={register("category", { required: true, maxLength: 20 })}
                            />

                            <FormItem
                                title="Description"
                                register={register("description", { required: false, maxLength: 500 })}
                                inputType="textarea"
                                description="Do not exceed 500 characters when entering the product name"
                            />

                            <h1 className="text-xl font-bold">
                                Price Information
                            </h1>

                            <FormItem
                                title="Pricing Model"
                                register={register("pricingModel", { required: true })}
                                inputType="select"
                                options={["Standard Pricing", "Non-Standard Pricing"]}
                            />

                            <FormItem
                                title="Price"
                                inputType="number"
                                register={register("price", { required: true })}
                            />

                            <div className="row w-full gap-10">
                                <button className={`flex-1 py-2 text-center border-2 ${recurring ? "border-blue-300" : "border-gray-300"} rounded-md`}
                                    type="button"
                                    onClick={() => { setRecurring(true) }}
                                >
                                    Recurring
                                </button>

                                <button className={`flex-1 py-4 text-center border-2 ${recurring ? "border-gray-300" : "border-blue-300"} rounded-md`}
                                    type="button"
                                    onClick={() => { setRecurring(false) }}
                                >
                                    One Time
                                </button>
                            </div>


                                <FormItem
                                    title="Billing Cycle"
                                    register={register("billingCycle", { required: false })}
                                    inputType="select"
                                    options={["Monthly", "Weekly", "Yearly"]}
                                />
                            

                            <FormItem
                                title="Shipping Fee"
                                inputType="number"
                                register={register("shipping", { required: true })}
                            />

                            <input type="submit" className="w-2/6 bg-blue-500 text-white py-2 rounded-md cursor-pointer" value="Save & Add Product" />
                            <WalletModalProvider>
                                <WalletMultiButton />
                            </WalletModalProvider>
                        </div>

                        <div className="flex-1 col items-center gap-20">

                            <div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="border-gray-400 border w-44 h-44 col items-center justify-center text-3xl hover:bg-gray-200 cursor-pointer">
                                        <div>
                                            +
                                        </div>
                                    </div>

                                    <div className="border-gray-400 border w-44 h-44 col items-center justify-center text-3xl hover:bg-gray-200 cursor-pointer">
                                        <div>
                                            +
                                        </div>
                                    </div>

                                    <div className="border-gray-400 border w-44 h-44 col items-center justify-center text-3xl hover:bg-gray-200 cursor-pointer">
                                        <div>
                                            +
                                        </div>
                                    </div>

                                    <div className="border-gray-400 border w-44 h-44 col items-center justify-center text-3xl hover:bg-gray-200 cursor-pointer">
                                        <div>
                                            +
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>

                    </div>
                </form>

            </div>
        </div>
    )
}

export default Add