import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const data01 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
    { name: 'Group E', value: 278 },
    { name: 'Group F', value: 189 },
];

const PieChartItem = () => {
    return (
        <ResponsiveContainer width="99%" height="99%">
            <PieChart>
                <Pie
                    dataKey="value"
                    isAnimationActive={true}
                    data={data01}
                    cx="50%"
                    cy="70%"
                    outerRadius={40}
                    fill="#8884d8"
                />
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    )
}

export default PieChartItem