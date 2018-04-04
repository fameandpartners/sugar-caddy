import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import DropzoneContext from './DropzoneContext';

const overlayStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  padding: '2.5em 0',
  background: 'rgba(0,0,0,0.5)',
  textAlign: 'center',
  color: '#fff',
};

class ModulesDropzone extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onDrop: PropTypes.func.isRequired,
  };

  static childContext = {

  };

  state = { dropzoneActive: false };

  onDropzoneClick = () => {
    this.dropzoneRef.open();
  };

  onDrop = (files) => {
    this.props.onDrop(files);
    this.setState({ dropzoneActive: false });
  };

  onDragEnter = () => this.setState({ dropzoneActive: true });

  onDragLeave = () => this.setState({ dropzoneActive: false });

  render() {
    const { dropzoneActive } = this.state;
    const { children } = this.props;
    return (
      <Dropzone
        id="modules"
        ref={(el) => { this.dropzoneRef = el; }}
        className="w-screen h-screen md:px-8 sm:px-6 px-3"
        disableClick
        onDrop={this.onDrop}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
      >
        {dropzoneActive && <div style={overlayStyle}>Drop files...</div>}
        <DropzoneContext.Provider value={this.onDropzoneClick}>
          {children}
        </DropzoneContext.Provider>
      </Dropzone>
    );
  }
}

export default ModulesDropzone;
