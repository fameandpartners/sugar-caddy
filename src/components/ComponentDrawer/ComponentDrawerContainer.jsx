import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import * as hierarchyActions from 'actions/hierarchy';
import ComponentDrawer from './ComponentDrawer';

const propTypes = {
  hierarchy: PropTypes.instanceOf(Immutable.Map).isRequired,
};

const ComponentDrawerContainer = ({ hierarchy, ...props }) => {
  const currentId = hierarchy.get('currentId');
  const customization = hierarchy.getIn(['data', 'components', currentId]);
  return (
    <ComponentDrawer
      customization={customization}
      open={!!currentId}
      {...props}
    />
  );
};

ComponentDrawerContainer.propTypes = propTypes;

export default connect(state => ({ hierarchy: state.hierarchy }), {
  resetForm: reset,
  ...hierarchyActions,
})(ComponentDrawerContainer);
