import React, { useEffect, useState } from 'react'
import { SiDiscord, SiGrab } from 'react-icons/si'
import CardPages from '../components/CardPages'
import { login } from '../supabase/discord'
import Image from 'next/image'
import Link from 'next/link'

const Home = () => {

    const loginWithDiscord = async () => {
        await login()
    }
    return (
        <div className="relative h-screen bg-blue-100 col items-center justify-center">
            <div className="h-20 w-1/2 relative">
                <Image src="/logo.png" layout="fill" objectFit="contain" />
            </div>
            <div className="bg-white w-2/6 col gap-6 rounded-md py-8 px-12">
                {/* Sign in Sign up switch */}
                <div className="row justify-around items-center text-lg">
                    <div className="border-b-2 border-blue-400">
                        Sign In
                    </div>

                    <div>
                        Sign Up
                    </div>
                </div>

                <div className="col w-full gap-2 items-start">
                    <div>
                        Email
                    </div>

                    <input className="h-10 rounded-md border-2 w-full px-2" type="text"/>
                </div>

                <div className="col w-full gap-2 items-start">
                    <div className="row justify-between w-full">
                        <div>Password</div>

                        <a href="">Forgot your password?</a>
                    </div>

                    <input className="h-10 rounded-md border-2 w-full px-2" type="text"/>
                </div>

                <button className="w-full text-center text-white py-2 bg-blue-500 text-lg rounded-md">
                    Sign In
                </button>

                <div className="col gap-2 items-center">
                    <div>
                        -Or sign in with-
                    </div>

                    <div className="row gap-4">
                        <Link href="/dashboard">
                            <button className="row gap-2 items-center border rounded-md px-4 py-2 hover:bg-gray-100">
                                <SiDiscord size={25} color="#7289DA" /> Discord
                            </button>
                        </Link>
                        <Link href="/dashboard">
                            <button className="row gap-2 items-center border rounded-md px-4 py-2 hover:bg-gray-100">
                                <SiGrab size={25} color="green" /> Grab
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
