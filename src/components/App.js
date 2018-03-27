import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchHierarchy } from 'actions/hierarchy';
import { connect } from 'react-redux';
import Hierarchy from './Hierarchy';
import ComponentDrawer from './ComponentDrawer';
import ModeButton from './ModeButton';

class App extends Component {
  static propTypes = {
    fetchHierarchy: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.fetchHierarchy();
  }

  render() {
    return (
      <div className="App">
        <div className="mt-6 ml-8">
          <ModeButton />
        </div>
        <Hierarchy />
        <ComponentDrawer />
      </div>
    );
  }
}

export default connect(null, {
  fetchHierarchy,
})(App);
