import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import ComponentDrawerForm from './ComponentDrawerForm';

const propTypes = {
  open: PropTypes.bool.isRequired,
  customization: PropTypes.object,
  resetForm: PropTypes.func.isRequired,
  setCurrentId: PropTypes.func.isRequired,
  updateComponent: PropTypes.func.isRequired,
};

const defaultProps = {
  customization: {},
};

const ComponentDrawer = ({
  open,
  customization,
  resetForm,
  setCurrentId,
  updateComponent,
}) => {
  if (!open) return <div />;
  return (
    <div id="tag-drawer" className="bg-grey h-48 fixed pin-l pin-r pin-b">
      <div className="flex h-full p-8">
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
            setCurrentId();
            resetForm();
          }}
        />
      </div>
    </div>
  );
};

ComponentDrawer.propTypes = propTypes;
ComponentDrawer.defaultProps = defaultProps;

export default ComponentDrawer;
