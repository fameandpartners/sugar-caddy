import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuidV4 from 'uuid/v4';
import { fetchComponents, createComponent } from 'actions/components';
import { uploadItem } from 'actions/uploads';
import Overlay from 'components/common/Overlay';
import ModulesDropzone from './ModulesDropzone';
import AddModulesButton from './AddModulesButton';
import ModuleList from './ModuleList';

class Modules extends Component {
  static propTypes = {
    uploading: PropTypes.bool,
    fetchComponents: PropTypes.func.isRequired,
    uploadItem: PropTypes.func.isRequired,
    createComponent: PropTypes.func.isRequired,
  };

  static defaultProps = {
    uploading: false,
  };

  componentWillMount() {
    this.props.fetchComponents();
  }

  handleDrop = (files) => {
    files.forEach((file) => {
      const fileId = uuidV4();
      this.props.uploadItem(file, fileId).then((data) => {
        const id = uuidV4();
        const component = {
          id,
          image: data.Location,
          name: '',
          code: '',
          levelId: '',
        };
        this.props.createComponent(component);
      });
    });
  };

  render() {
    const { uploading } = this.props;
    return (
      <ModulesDropzone
        id="modules"
        className="w-screen h-screen md:px-8 sm:px-6 px-3"
        onDrop={this.handleDrop}
      >
        {uploading && <Overlay>Uploading images...</Overlay>}
        <AddModulesButton />
        <ModuleList />
      </ModulesDropzone>
    );
  }
}

export default connect(
  (state) => {
    const anyUploading = state.uploads.get('items').size > 0 && state.uploads
      .get('items')
      .some(item => item.get('status') === 'loading');
    return {
      uploading: anyUploading,
    };
  },
  { fetchComponents, createComponent, uploadItem },
)(Modules);
