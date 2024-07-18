import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, Legend, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Card, CardHeader } from '@mui/material';

export default function AppRevenueReport({ data, title }) {
  const formattedData = data.map((value, index) => ({
    month: new Date(0, index).toLocaleString('default', { month: 'short' }),
    revenue: value,
  }));
  console.log(formattedData)

  return (
    <Card>
      <CardHeader title={title} sx={{ mb: 5 }} />
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={formattedData}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis dataKey="revenue" />
          <Tooltip />
          <Legend />
          <Bar dataKey="revenue" fill="#458eff" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

AppRevenueReport.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};
