import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const handleToolTip = (props: TooltipProps<ValueType, NameType>) => {
    return (
        <div>
            {}
        </div>
    )
}

const LineChartItem = () => {
    return (
        <ResponsiveContainer width="99%" height="90%" >
            <LineChart
                data={data}
                margin={{
                    top: 50,
                    right: 0,
                    left: 0,
                    bottom: 0,
                }}
            >
                <Tooltip content={handleToolTip} />
                <Line type="monotone" stroke="#248BFC" dataKey="uv" fill="#248BFC" dot={false} opacity={1} />
                <Line type="monotone" stroke="#000000" dataKey="pv" fill="#000000" dot={false} opacity={1} />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default LineChartItem