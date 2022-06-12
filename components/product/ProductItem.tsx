import React from "react"
import { AiOutlineEllipsis } from "react-icons/ai"
import {DateTime} from 'luxon'
import Image from 'next/image'

interface props {
    name: string
    recurring: boolean
    created: string
}

const ProductItem = (props: props) => {
    return (
        <div className="py-4 px-6 bg-white row justify-between items-center border-b">
            <div className="row items-center gap-4">
                <div className="h-20 w-20 relative">
                    <Image src="/leather.webp" layout="fill" objectFit="contain" />
                </div>

                <div className="col gap-1">
                    <div>
                        {props.name}
                    </div>
                    <div>
                        {
                            props.recurring ?
                            "Recurring"
                            :
                            "One Time"
                        }
                    </div>
                </div>
            </div>

            <div className="row gap-8 items-center">
                <div>
                    {DateTime.fromISO(props.created).toFormat("dd LLLL yyyy")}
                </div>

                <div>
                    {DateTime.fromISO(props.created).toFormat("dd LLLL yyyy")}
                </div>

                <AiOutlineEllipsis size={30} />
            </div>
        </div>
    )
}

export default ProductItem