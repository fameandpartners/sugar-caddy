import React from 'react';
import HierarchyPage from 'pages/HierarchyPage';
import ProductsPage from 'pages/ProductsPage';
import ColorsPage from 'pages/ColorsPage';
import PricingPage from 'pages/PricingPage';

// Startup Apps
// import MainApp from '../../js/components/startup/MainApp';
// import SecondaryApp from '../../js/components/startup/SecondaryApp';


// Our renders are functions that are returning functions
//   - This allows us to customize and decorate our render on runtime
const routes = [
  {
    path: '/products/:productId/hierarchy',
    render: () => props => <HierarchyPage {...props} />,
  },
  {
    path: '/products/:productId/colors',
    render: () => props => <ColorsPage {...props} />,
  },
  {
    path: '/products/:productId/pricing',
    render: () => props => <PricingPage {...props} />,
  },
  {
    path: '/',
    render: () => props => <ProductsPage {...props} />,
  },
];

export default routes;
