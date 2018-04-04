import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Products from 'components/Products';
import Modules from 'components/Modules';
import qs from 'querystring';

const tabs = ['modules', 'products', 'themes'];

const propTypes = {
  tabIndex: PropTypes.number.isRequired,
};

const Dashboard = ({ tabIndex }) => (
  <div id="dashboard">
    <Tabs selectedIndex={tabIndex} onSelect={() => {}}>
      <TabList>
        <Tab>
          <Link to="?tab=modules">Modules</Link>
        </Tab>
        <Tab>
          <Link to="?tab=products">Products</Link>
        </Tab>
        <Tab>
          <Link to="?tab=themes">Theme Pages</Link>
        </Tab>
      </TabList>

      <TabPanel>
        <Modules />
      </TabPanel>

      <TabPanel>
        <Products />
      </TabPanel>

      <TabPanel>
        <div>
          <h1 className="text-2xl font-semibold">Theme Pages</h1>
        </div>
      </TabPanel>
    </Tabs>
  </div>
);

Dashboard.propTypes = propTypes;

export default connect((state) => {
  const { tab } = qs.parse(state.router.location.search.slice(1));
  const tabIndex = tabs.indexOf(tab);
  return {
    tabIndex: tabIndex > -1 ? tabIndex : 0,
  };
})(Dashboard);
