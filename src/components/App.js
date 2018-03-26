import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hierarchy from './Hierarchy';
import ComponentDrawer from './ComponentDrawer';
import ModeButton from './ModeButton';

class App extends Component {
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

  toggleMode = () =>
    this.setState(state => ({ mode: state.mode === 'view' ? 'edit' : 'view' }));

  selectCustomization = (customizationId, order) => {
    const { mode, currentPath } = this.state;
    if (mode === 'view') {
      const currentIndex = currentPath.indexOf(customizationId);
      if (currentIndex === -1 && order <= currentPath.length + 1) {
        const newPath = currentPath.slice(0, order - 1).concat(customizationId);
        this.setState({ currentPath: newPath });
      } else {
        const newPath = currentPath.slice(0, order - 1);
        this.setState({ currentPath: newPath });
      }
    } else {
      this.toggleDrawer(customizationId);
    }
  };

  toggleDrawer = (currentId = '') => this.setState({ currentId });

  render() {
    const { components, currentId, mode } = this.state;
    return (
      <div className="App">
        <div className="mt-6 ml-8">
          <ModeButton mode={mode} onClick={this.toggleMode} />
        </div>
        <Hierarchy />
        <ComponentDrawer
          open={!!currentId}
          customization={components[currentId]}
        />
      </div>
    );
  }
}

export default App;
