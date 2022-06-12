import React from "react"
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc"
import LineChartItem from './LineChart'

interface props {
    children: any
    title: string
    value: number
}

const ChartContainer = (props: props) => {
    return (
        <div className="w-1/2 h-full rounded-md bg-white relative">
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

            {props.children}
        </div>
    )
}

export default ChartContainer