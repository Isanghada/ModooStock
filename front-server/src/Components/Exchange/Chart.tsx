import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart } from 'recharts';

function Chart({ data }: any) {
  const formatYAxis = (tickItem: any) => tickItem.toLocaleString() + '원';
  const formatTooltip = (tickItem: any) => tickItem.toLocaleString() + '원';
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
        <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={formatTooltip} />
        <Area type="monotone" dataKey="종가" stroke="#33D03D" fill="#c2eec5" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
export default Chart;
