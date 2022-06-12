import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { PublicKey } from '@solana/web3.js'
import Image from 'next/image'
import React from 'react'
import { usePayment } from '../context/usePayment'

const Example = () => {
    const payment = usePayment()
    return (
        <div className="h-screen col items-center justify-center bg-gray-100">
            <div className="w-1/2 h-3/6 bg-white rounded-md p-4 row justify-between">
                <div className="col h-full justify-center w-1/2">
                    <div className="w-full h-3/6 relative">
                        <Image src="/wallet.jpeg" layout="fill" objectFit="contain" />
                    </div>
                </div>

                <div className=" col w-1/2 gap-6">
                    <div className="text-3xl">
                        Organic Leather Wallet
                    </div>

                    <div className="text-gray-600">
                        This wallet was made with materials ethically sourced from the mountains, and picked by professionals specifically for you
                    </div>

                    <div className="row gap-1 text-xl">
                        <div>
                            120
                        </div>

                        <div className="text-gray-400">
                            USDC
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <div className="border-2 border-blue-200 px-4 py-1 text-gray-500 hover:bg-gray-200 cursor-pointer">
                            Black
                        </div>
                        <div className="border-2 border-gray-200 px-4 py-1 text-gray-500 hover:bg-gray-200 cursor-pointer">
                            Blue
                        </div>
                        <div className="border-2 border-gray-200 px-4 py-1 text-gray-500 hover:bg-gray-200 cursor-pointer">
                            Green
                        </div>
                        <div className="border-2 border-gray-200 px-4 py-1 text-gray-500 hover:bg-gray-200 cursor-pointer">
                            Red
                        </div>
                        <div className="border-2 border-gray-200 px-4 py-1 text-gray-500 hover:bg-gray-200 cursor-pointer">
                            Brown
                        </div>
                        <div className="border-2 border-gray-200 px-4 py-1 text-gray-500 hover:bg-gray-200 cursor-pointer">
                            Purple
                        </div>
                    </div>

                    <button className="w-full py-2 text-white bg-blue-400 rounded-md" onClick={() => {
                        payment.sendProductTransaction(new PublicKey("42q4G2TX3jvWp9iYU2ZaPJ5FQYBoG2tg7N1oC2JAVxJF"))
                    }}>
                        Pay
                    </button>
                    
                    <WalletModalProvider>
                        <WalletMultiButton />
                    </WalletModalProvider>
                </div>

            </div>
        </div>
    )
}

export default Example