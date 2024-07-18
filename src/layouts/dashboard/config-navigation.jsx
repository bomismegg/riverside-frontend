import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'dishes',
    path: '/products',
    icon: icon('ic_dishes'),
  },
  {
    title: 'Order',
    path: '/order',
    icon: icon('ic_order'),
  },
  {
    title: 'area',
    path: '/area',
    icon: icon('ic_area'),
  }
];

export default navConfig;
