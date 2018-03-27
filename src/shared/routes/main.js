import React from 'react';
import HierarchyPage from 'pages/HierarchyPage';
import ProductsPage from 'pages/ProductsPage';

// Startup Apps
// import MainApp from '../../js/components/startup/MainApp';
// import SecondaryApp from '../../js/components/startup/SecondaryApp';


// Our renders are functions that are returning functions
//   - This allows us to customize and decorate our render on runtime
const routes = [
  {
    path: '/products',
    render: () => props => <ProductsPage {...props} />,
  },
  {
    path: '/',
    render: () => props => <HierarchyPage {...props} />,
  },
];

export default routes;
