import React, { useEffect, useState } from "react"
import { SiDiscord } from "react-icons/si"
import { BsFillArrowRightSquareFill, BsFillArrowLeftSquareFill } from 'react-icons/bs'

interface props {
}

const CardPages = (props: props) => {
    const [page, setPage] = useState(0)
    const [pageState, setPageState] = useState([1, 2, 2])
    const left = "-translate-x-full invisible absolute opacity-0"
    const right = "translate-x-full invisible absolute opacity-0"
    const getPosition = (index: number) => {
        const position = (
            pageState[index] == 1
            // if
            ? "visible opacity-100" 
            // else if
            : pageState[index] == 0
            ? "-translate-x-full invisible absolute opacity-0"
            // else
            : "translate-x-full invisible absolute opacity-0"
            )
        return position
            
    }

    const nextPage = () => {
        let currPageState = pageState
        if (page == pageState.length -1) {
            currPageState[page] -= 1
            setPageState(currPageState)
            return
        }
        currPageState[page] -= 1
        currPageState[page + 1] -= 1
        setPageState(currPageState)
        setPage(page + 1)
    }

    const prevPage = () => {
        let currPageState = pageState
        if (page == 0) {
            currPageState[page] -= 1
            setPageState(currPageState)
            return
        }
        currPageState[page] += 1
        currPageState[page - 1] += 1
        setPageState(currPageState)
        setPage(page - 1)
    }
    useEffect(() => {
        console.log(pageState);
        
    }, [page])
    const position = (
        pageState[0] == 1 
        // if
        ? "visible opacity-100" 
        // else if
        : pageState[0] == 1 
        ? "-translate-x-full invisible absolute opacity-0"
        // else
        : "translate-x-full invisible absolute opacity-0"
        )

    return (
        <div className="relative absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white px-8 py-14 rounded-lg lg:w-4/12 w-8/12 h-1/2 flex flex-row gap-8 items-center z-40 overflow-hidden">
            {/* {
                    props.pages && props.pages.map((item, index) => {
                        return (
                            <div key={index}>
                                { item }
                            </div>
                        )
                    })
                } */}
            <div className={`w-full flex flex-col items-center justify-center gap-4 transform animation-all ease-in-out duration-300  ${getPosition(0)}`}>
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl font-bold mb-4">
                        Create an account with Discord
                        </h1>
                    {/* <h2 className="text-lg text-gray-500">
                        Already have an account? <a href="">Sign in</a>
                    </h2> */}
                </div>
                <button className="flex flex-row justify-center items-center gap-2 py-2 w-full bg-indigo-400 hover:bg-indigo-500 rounded-lg font-semibold text-lg text-white"
                    onClick={() => { nextPage() }}
                >
                    <SiDiscord size={25} />
                    <div>Sign up with discord</div>
                </button>
            </div>

            <div className={`flex-1 w-full flex flex-col items-center justify-center gap-4 transform animation-all ease-in-out duration-300 ${getPosition(1)}`}>
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl font-bold mb-4">
                        Create Account Page 2
                        </h1>
                    <h2 className="text-lg text-gray-500">
                        Already have an account? <a href="">Sign in</a>
                    </h2>
                </div>
                <button className="flex flex-row justify-center items-center gap-2 py-2 w-full bg-indigo-400 hover:bg-indigo-500 rounded-lg font-semibold text-lg text-white"
                    onClick={() => { prevPage() }}
                >
                    <SiDiscord size={25} />
                    <div>Sign up with discord</div>
                </button>
            </div>

            <div className="absolute bottom-0 left-0 mb-14 w-full px-8 flex flex-row justify-between">
                <button onClick={() => { prevPage() }}>
                    <BsFillArrowLeftSquareFill size={30} color="lightblue" />
                </button>
            </div>
        </div>
    )
}

export default CardPages