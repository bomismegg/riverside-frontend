import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import Chart, { useChart } from 'src/components/chart';

export default function AppRevenueReport({ title, subheader, chart, ...other }) {
  const { labels, series, options } = chart;

  const chartOptions = useChart({
    colors: ['#00AB55', '#FFC107', '#FF4842', '#007BFF'],
    plotOptions: {
      bar: {
        columnWidth: '16%',
      },
    },
    fill: {
      type: series.map((i) => i.fill || 'solid'),
    },
    labels,
    xaxis: {
      type: 'category',
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value) => {
          if (typeof value !== 'undefined') {
            return `${value.toFixed(0)} VND`;
          }
          return value;
        },
      },
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <Box sx={{ p: 3, pb: 1 }}>
        <Chart
          dir="ltr"
          type="column"
          series={series}
          options={chartOptions}
          width="100%"
          height={364}
        />
      </Box>
    </Card>
  );
}

AppRevenueReport.propTypes = {
  chart: PropTypes.object.isRequired,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
