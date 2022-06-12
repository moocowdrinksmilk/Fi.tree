import React from "react"
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc"
import LineChartItem from './LineChart'

interface props {
    children: any
    title: string
    value: number
}

const SmallChartContainer = (props: props) => {
    return (
        <div className="w-full h-1/3 bg-white rounded-md relative">
            <div className="absolute top-0 left-0 p-4">
                <h1>
                    { props.title }
                </h1>

                <div className="row items-center">
                    {
                        props.value >= 0 ?
                        <VscTriangleUp fill="green" />
                        :
                        <VscTriangleDown fill="red" />
                    }
                    <span>
                        { props.value }
                </span>
                </div>
            </div>

            <div className="w-full h-full text-5xl text-left col justify-center items-start pl-4">
                <div>400 USDC</div>
            </div>
        </div>
    )
}

export default SmallChartContainer