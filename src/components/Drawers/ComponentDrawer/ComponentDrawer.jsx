import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import ComponentDrawerForm from './ComponentDrawerForm';

const propTypes = {
  customization: PropTypes.object,
  resetForm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  updateComponent: PropTypes.func.isRequired,
  deleteComponent: PropTypes.func.isRequired,
};

const defaultProps = {
  customization: {},
};

const ComponentDrawer = ({
  customization,
  resetForm,
  onClose,
  updateComponent,
  deleteComponent,
}) => (
  <div id="tag-drawer" className="flex h-full p-8">
    {customization.get('image') ? (
      <img
        alt="Customization"
        className="w-32 h-32 bg-white mr-8"
        style={{ objectFit: 'contain' }}
        src={customization.get('image')}
      />
    ) : (
      <div className="w-32 h-32 bg-white mr-8" />
    )}
    <ComponentDrawerForm
      initialValues={{
        name: customization.get('name'),
        tags: (customization.get('tags') || Immutable.List())
          .toArray()
          .concat(''),
        incompatibilities: (
          customization.get('incompatibilities') || Immutable.List()
        )
          .toArray()
          .concat(''),
      }}
      onDelete={() => {
        deleteComponent(customization.get('id'));
        onClose();
      }}
      onSubmit={(data) => {
        const tags = data.tags
          .slice(0, data.tags.length - 1)
          .filter(item => !!item);
        const incompatibilities = data.incompatibilities
          .slice(0, data.incompatibilities.length - 1)
          .filter(item => !!item);
        const update = Object.assign({}, data, {
          tags,
          incompatibilities,
        });

        updateComponent(customization.get('id'), update);
        onClose();
        resetForm();
      }}
    />
  </div>
);

ComponentDrawer.propTypes = propTypes;
ComponentDrawer.defaultProps = defaultProps;

export default ComponentDrawer;
