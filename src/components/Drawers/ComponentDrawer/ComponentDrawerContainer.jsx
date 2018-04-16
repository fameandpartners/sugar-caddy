import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import * as componentActions from 'actions/components';
import ComponentDrawer from './ComponentDrawer';

const propTypes = {
  onClose: PropTypes.func.isRequired,
  setCurrentId: PropTypes.func.isRequired,
};

const ComponentDrawerContainer = props => (
  <ComponentDrawer
    {...props}
    onClose={() => {
      props.onClose();
      props.setCurrentId();
    }}
  />
);

ComponentDrawerContainer.propTypes = propTypes;

export default connect(
  (state) => {
    const currentId = state.components.get('currentId');
    return {
      customization: state.components.getIn(['data', currentId]),
    };
  },
  {
    resetForm: reset,
    ...componentActions,
  },
)(ComponentDrawerContainer);
