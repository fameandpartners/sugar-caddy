import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import * as hierarchyActions from 'actions/hierarchy';
import * as componentActions from 'actions/components';
import ComponentDrawer from './ComponentDrawer';

const propTypes = {
  currentId: PropTypes.string.isRequired,
  components: PropTypes.instanceOf(Immutable.Map).isRequired,
};

const ComponentDrawerContainer = ({ currentId, components, ...props }) => {
  const customization = components.get(currentId);
  return (
    <ComponentDrawer
      customization={customization}
      open={!!currentId}
      {...props}
    />
  );
};

ComponentDrawerContainer.propTypes = propTypes;

export default connect(
  state => ({
    currentId: state.hierarchy.get('currentId'),
    components: state.components.get('data'),
  }),
  {
    resetForm: reset,
    ...hierarchyActions,
    ...componentActions,
  },
)(ComponentDrawerContainer);
