import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import ComponentDrawerForm from './ComponentDrawerForm';

const propTypes = {
  open: PropTypes.bool.isRequired,
  customization: PropTypes.object,
  resetForm: PropTypes.func.isRequired,
};

const defaultProps = {
  customization: {},
};

const contextTypes = {
  toggleDrawer: PropTypes.func.isRequired,
  updateComponent: PropTypes.func.isRequired,
};

const ComponentDrawer = (
  { open, customization, resetForm },
  { toggleDrawer, updateComponent },
) => {
  if (!open) return <div />;
  return (
    <div id="tag-drawer" className="bg-grey h-48 fixed pin-l pin-r pin-b">
      <div className="flex h-full p-8">
        {customization.image ? (
          <img
            alt="Customization"
            className="w-32 h-32 bg-white mr-8"
            style={{ objectFit: 'contain' }}
            src={customization.image}
          />
        ) : (
          <div className="w-32 h-32 bg-white mr-8" />
        )}
        <ComponentDrawerForm
          initialValues={{
            name: customization.name,
            tags: (customization.tags || []).concat(''),
            incompatibilities: (customization.incompatibilities || []).concat(''),
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

            updateComponent(customization.id, update);
            toggleDrawer();
            resetForm();
          }}
        />
      </div>
    </div>
  );
};

ComponentDrawer.propTypes = propTypes;
ComponentDrawer.defaultProps = defaultProps;
ComponentDrawer.contextTypes = contextTypes;

export default connect(null, { resetForm: reset })(ComponentDrawer);
