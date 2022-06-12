import GMVChart from "../components/homepage/charts/GMVChart"
import SideBar from "../components/homepage/Sidebar"
import { VscTriangleUp } from 'react-icons/vsc'
import { AiOutlineEllipsis } from 'react-icons/ai'
import LineChartItem from "../components/homepage/charts/LineChart"
import ChartContainer from '../components/homepage/charts/ChartContainer'
import SmallChartContainer from "../components/homepage/charts/SmallChartContainer"
import PieChartItem from "../components/homepage/charts/PieChartItem"
import React from "react"
import { BsBroadcast } from "react-icons/bs"
import InvoiceItem from "../components/homepage/invoice/InvoiceItem"

const Dashboard = () => {
    return (
        <div className="row bg-gray-50">
            <SideBar />

            <div className="flex-1 col bg-gray-100">
                <div className="row h-14 pt-2 justify-end px-10">
                    <button className="px-4 bg-blue-400 rounded-md text-white">
                        Connect Wallet
                    </button>
                </div>

                <div className="col w-full px-6 pt-4 gap-4 h-full">
                    <div>
                        <h1 className="text-2xl font-bold">
                            Welcome back Wei Zhen
                        </h1>

                        <h2>
                            Here is your monthly performance
                        </h2>
                    </div>

                    <div className="row h-full">
                        <div className="col w-9/12 pb-10 gap-2">

                            <div className="col rounded-md h-1/3 bg-white relative z-10 relative">
                                <div className="absolute top-0 left-0 p-4">
                                    <h1>
                                        GMV
                                    </h1>

                                    <div className="row items-center">
                                        <VscTriangleUp fill="green" />
                                        <span>
                                            12.2%
                                        </span>
                                    </div>
                                </div>

                                <div className="absolute top-0 right-0 p-4">
                                    <AiOutlineEllipsis />
                                </div>
                                <div className="h-full rounded-md">
                                    <GMVChart />
                                </div>
                            </div>

                            <div className="row h-1/3 gap-2">
                                <ChartContainer title="Gross Volume" value={-12.2} >
                                    <LineChartItem />
                                </ChartContainer>

                                <ChartContainer title="Net Volume from Sales" value={1.1} >
                                    <LineChartItem />
                                </ChartContainer>
                            </div>

                            <div className="row h-1/3 gap-2">
                                <ChartContainer title="Traffic across platforms" value={12.64} >
                                    <LineChartItem />
                                </ChartContainer>

                                <ChartContainer title="Conversion rate" value={8.33} >
                                    <LineChartItem />
                                </ChartContainer>
                            </div>



                        </div>

                        <div className="col w-3/12 px-2 pb-10 gap-2">
                            <SmallChartContainer title="Earnings in June" value={40.8}>
                                
                            </SmallChartContainer>

                            <div className="w-full h-1/3 bg-white rounded-md col p-4 gap-6">
                                <div>
                                    <h1>
                                        Invoice Detail
                                    </h1>
                                    <div className="row gap-1 items-center">
                                        <BsBroadcast color="blue" size={20} />
                                        <div>
                                            Live
                                        </div>
                                    </div>
                                </div>

                                <div className="col w-ful gap-6 overflow-auto no-scroll">
                                    <InvoiceItem time={20} value={35} status={2} payer="Shopify" />
                                    <InvoiceItem time={100} value={1000} status={3} payer="Amazon" />
                                    <InvoiceItem time={20} value={70} status={1} payer="Personal Site A" />
                                </div>
                            </div>

                            <div className="w-full h-1/3 bg-white rounded-md p-4">
                                <div className="">
                                    <h1>
                                        Balances
                                    </h1>
                                </div>

                                <div className="col w-full gap-10">
                                    <div className="">
                                        <div className="text-gray-500">USDC Balances</div>
                                        <div>10,875  (843,171 INR)</div>
                                    </div>

                                    <div className="">
                                        <div className="text-gray-500">Payouts (USDC)</div>
                                        <div>4,875  (377,973 INR)</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard