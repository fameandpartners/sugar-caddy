import React from 'react';
import DropzoneContext from './DropzoneContext';

const AddModulesButton = () => (
  <DropzoneContext.Consumer>
    {onClick => (
      <button className="btn btn-primary" onClick={onClick}>
        Add Modules
      </button>
    )}
  </DropzoneContext.Consumer>
);

export default AddModulesButton;
