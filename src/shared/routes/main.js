import React from 'react';

// Startup Apps
import MainApp from '../../js/components/startup/MainApp';
import SecondaryApp from '../../js/components/startup/SecondaryApp';


// Our renders are functions that are returning functions
//   - This allows us to customize and decorate our render on runtime
const routes = [
  {
    path: '/secondaryApp',
    render: () => props => <SecondaryApp {...props} />,
  },
  {
    path: '/',
    render: () => props => <MainApp {...props} />,
  },
];

export default routes;
