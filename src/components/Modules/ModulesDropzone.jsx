import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import Overlay from 'components/common/Overlay';
import DropzoneContext from './DropzoneContext';

class ModulesDropzone extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onDrop: PropTypes.func.isRequired,
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
        id="modules-dropzone"
        ref={(el) => { this.dropzoneRef = el; }}
        className="w-screen h-screen md:px-8 sm:px-6 px-3 py-6"
        disableClick
        onDrop={this.onDrop}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
      >
        {dropzoneActive && <Overlay>Drop files...</Overlay>}
        <DropzoneContext.Provider value={this.onDropzoneClick}>
          {children}
        </DropzoneContext.Provider>
      </Dropzone>
    );
  }
}

export default ModulesDropzone;
