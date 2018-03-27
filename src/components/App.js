import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchHierarchy, toggleMode } from 'actions/hierarchy';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import Hierarchy from './Hierarchy';
import ComponentDrawer from './ComponentDrawer';
import ModeButton from './ModeButton';

class App extends Component {
  static propTypes = {
    hierarchy: PropTypes.instanceOf(Immutable.Map).isRequired,
    fetchHierarchy: PropTypes.func.isRequired,
    toggleMode: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.fetchHierarchy();
  }

  render() {
    const { hierarchy } = this.props;
    return (
      <div className="App">
        <div className="mt-6 ml-8">
          <ModeButton
            mode={hierarchy.get('mode')}
            onClick={this.props.toggleMode}
          />
        </div>
        <Hierarchy />
        <ComponentDrawer />
      </div>
    );
  }
}

export default connect(state => ({ hierarchy: state.hierarchy }), {
  fetchHierarchy,
  toggleMode,
})(App);
