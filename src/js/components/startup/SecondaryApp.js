import React, { Component } from 'react';
import autoBind from 'react-autobind';


class SecondaryApp extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <div className="SecondaryApp">
        Put the secondary appy stuff here
      </div>
    );
  }
}

SecondaryApp.propTypes = {};

export default SecondaryApp;
