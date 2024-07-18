/* eslint-disable no-shadow */
import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { fetchOrders } from 'src/api/order';
import { fetchDishCategories } from 'src/api/category';
import { fetchDishesByCategoryId } from 'src/api/dishes';

import AppCurrentVisits from '../app-current-visits';
import AppRevenueReport from '../app-revenue-report';
import AppWidgetSummary from '../app-widget-summary';

// ----------------------------------------------------------------------

export default function AppView() {
  const [orders, setOrders] = useState([]);
  const [dailyRevenue, setDailyRevenue] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [dishCounts, setDishCounts] = useState([]);
  const currentMonth = new Date().getMonth();
  useEffect(() => {
    async function getOrders() {
      try {
        const response = await fetchOrders();
        const data = response;
        setOrders(data);

        // Calculate daily and monthly revenue
        const today = new Date();
        const currentDate = today.getDate();

        const dailyRevenue = data.reduce((total, order) => {
          const orderDate = new Date(order.createdDate);
          if (orderDate.getDate() === currentDate) {
            return total + order.totalPrice;
          }
          return total;
        }, 0);

        const monthlyRevenueArray = new Array(12).fill(0);
        data.forEach((order) => {
          const orderDate = new Date(order.createdDate);
          const month = orderDate.getMonth();
          monthlyRevenueArray[month] += order.totalPrice;
        });

        setDailyRevenue(dailyRevenue);
        setMonthlyRevenue(monthlyRevenueArray);
      } catch (error) {
        console.error(error);
      }
    }

    async function getDishCounts() {
      try {
        const categories = await fetchDishCategories();
        const counts = await Promise.all(
          categories.map(async (category) => {
            const dishes = await fetchDishesByCategoryId(category.dishCateGoryId);
            return { label: category.name, value: dishes.length };
          })
        );
        setDishCounts(counts);
      } catch (error) {
        console.error(error);
      }
    }

    getOrders();
    getDishCounts();
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Daily Revenue"
            total={dailyRevenue}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Monthly Revenue"
            total={monthlyRevenue[currentMonth]}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Total Orders"
            total={orders.length}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppRevenueReport
            title="Revenue Report by Month"
            subheader="Total revenue per month"
            chart={{
              labels: [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
              ],
              series: [
                {
                  name: 'Revenue',
                  type: 'column',
                  fill: 'solid',
                  data: monthlyRevenue,
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Dish Count by Category"
            chart={{
              series: dishCounts,
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
