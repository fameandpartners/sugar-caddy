// import 'regenerator-runtime/runtime';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { Switch, Route } from 'react-router';
import routes from './shared/routes/main';

// CSS STUFFS ?
// import '../../css/components/AppLayout.scss';


class AppLayout extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  getInitialSettings() {
    const { settings } = this.props;
    if (!settings) {
      console.warn('The app needs settings to be hydrated');
    }

    return settings;
  }

  render() {
    const settings = this.getInitialSettings();

    return (
      <div className="AppLayout">
        <Switch>
          {routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              render={route.render(settings)}
            />
          ))}
        </Switch>
      </div>
    );
  }
}

AppLayout.propTypes = {
  // Passed Props
  // eslint-disable-next-line
  settings: PropTypes.object,
};

export default AppLayout;
