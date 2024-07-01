// import axios from 'axios';
// import { useState, useEffect } from 'react';

// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import Link from '@mui/material/Link';
// import Stack from '@mui/material/Stack';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Unstable_Grid2';
// import Typography from '@mui/material/Typography';

// export default function TableView() {
//   const [tables, setTables] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTables = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/table');
//         const activeTables = response.data.content.filter(table => table.isAvailable);
//         setTables(activeTables);
//       } catch (error) {
//         console.error('Failed to fetch tables:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTables();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Container>
//       <Typography variant="h4" sx={{ mb: 5 }}>
//         Active Tables
//       </Typography>

//       <Grid container spacing={3}>
//         {tables.map((table) => (
//           <Grid key={table.tableId} xs={12} sm={6} md={3}>
//             <TableCard table={table} />
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// }

// function TableCard({ table }) {
//   return (
//     <Card>
//       <Box sx={{ pt: '100%', position: 'relative' }}>
//         <Box
//           component="img"
//           alt={table.name}
//           src="http://example.com/table.jpg" // Replace with actual image URL if available
//           sx={{
//             top: 0,
//             width: 1,
//             height: 1,
//             objectFit: 'cover',
//             position: 'absolute',
//           }}
//         />
//       </Box>
//       <Stack spacing={2} sx={{ p: 3 }}>
//         <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
//           {table.name}
//         </Link>
//         <Typography variant="body2" color="text.secondary">
//           Area ID: {table.areaId}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Available: {table.isAvailable ? 'Yes' : 'No'}
//         </Typography>
//       </Stack>
//     </Card>
//   );
// }
