import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { connect } from 'react-redux';
import Products from 'components/Products';
import Modules from 'components/Modules';
import qs from 'querystring';
import { push } from 'react-router-redux';

const tabs = ['modules', 'products', 'themes'];

const propTypes = {
  tabIndex: PropTypes.number.isRequired,
  historyPush: PropTypes.func.isRequired,
};

const Dashboard = ({ tabIndex, historyPush }) => (
  <div id="dashboard">
    <Tabs
      selectedIndex={tabIndex}
      onSelect={index => historyPush(`?tab=${tabs[index]}`)}
    >
      <TabList>
        <Tab>Modules</Tab>
        <Tab>Products</Tab>
        <Tab>Theme Pages</Tab>
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

export default connect(
  (state) => {
    const { tab } = qs.parse(state.router.location.search.slice(1));
    const tabIndex = tabs.indexOf(tab);
    return {
      tabIndex: tabIndex > -1 ? tabIndex : 0,
    };
  },
  { historyPush: push },
)(Dashboard);
