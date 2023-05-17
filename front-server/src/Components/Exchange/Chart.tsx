import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart } from 'recharts';

function Chart({ data }: any) {
  const formatYAxis = (tickItem: any) => tickItem.toLocaleString() + '원';
  const formatTooltip = (tickItem: any) => tickItem.toLocaleString();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis
          type="number"
          label={{ value: '원', offset: 30, angle: 0, position: 'top' }}
          tickFormatter={formatYAxis}
        />
        <Tooltip
          cursor={{ strokeDasharray: '3 3' }}
          formatter={(value, name) => (name === '종가' ? value.toLocaleString() + '원' : value)}
        />
        <Area type="monotone" dataKey="종가" stackId="1" stroke="#03aa0e" fill="#c2eec5" />
        <Area type="monotone" dataKey="일자" stackId="1" stroke="#0cb2be" fill="#c2eec5" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
export default Chart;
