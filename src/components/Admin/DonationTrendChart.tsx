import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DonationTrendProps {
  data: { _id: string; count: number }[];
}

const DonationTrendChart: React.FC<DonationTrendProps> = ({ data }) => {
  return (
    <div className="w-full h-[300px] bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Donation Trend</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#00b894" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonationTrendChart;
