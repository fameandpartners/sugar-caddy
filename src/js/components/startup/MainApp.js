import React, { Component } from 'react';
import autoBind from 'react-autobind';


class MainApp extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <div className="MainApp">
        Put the main appy stuff here
      </div>
    );
  }
}

MainApp.propTypes = {};

export default MainApp;
