import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchHierarchy, updateCurrentPath, toggleMode } from 'actions/hierarchy';
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

  static childContextTypes = {
    hierarchy: PropTypes.object.isRequired,
    components: PropTypes.object.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
    updateComponent: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired,
    selectCustomization: PropTypes.func.isRequired,
    currentPath: PropTypes.array.isRequired,
  };

  state = {
    hierarchy: {},
    components: {},
    currentId: '',
    mode: 'edit',
    currentPath: [],
  };

  getChildContext() {
    return {
      hierarchy: this.state.hierarchy,
      components: this.state.components,
      toggleDrawer: this.toggleDrawer,
      updateComponent: this.updateComponent,
      mode: this.state.mode,
      selectCustomization: this.selectCustomization,
      currentPath: this.state.currentPath,
    };
  }

  componentWillMount() {
    this.props.fetchHierarchy();
    fetch('https://sugar-caddy-dev.firebaseio.com/.json')
      .then(text => text.json())
      .then(response => this.setState(response));
  }

  updateComponent = (componentId, update) => {
    fetch(
      `https://sugar-caddy-dev.firebaseio.com/components/${componentId}.json`,
      {
        method: 'PATCH',
        'content-type': 'Application/json',
        body: JSON.stringify(update),
      },
    ).then(() => {
      const newComponent = Object.assign(
        {},
        this.state.components[componentId],
        update,
      );
      const newComponents = Object.assign({}, this.state.components, {
        [componentId]: newComponent,
      });
      this.setState({ components: newComponents });
    });
  };

  render() {
    const { components, currentId, mode } = this.state;
    const { hierarchy } = this.props;
    return (
      <div className="App">
        <div className="mt-6 ml-8">
          <ModeButton mode={hierarchy.get('mode')} onClick={this.props.toggleMode} />
        </div>
        <Hierarchy />
        <ComponentDrawer
          open={!!hierarchy.get('currentId')}
          customization={components[currentId]}
        />
      </div>
    );
  }
}

export default connect(state => ({ hierarchy: state.hierarchy }), {
  fetchHierarchy,
  toggleMode,
})(App);
