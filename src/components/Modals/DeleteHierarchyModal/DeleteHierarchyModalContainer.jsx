import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteHierarchy, setCurrentHierarchy } from 'actions/hierarchy';
import DeleteHierarchyModal from './DeleteHierarchyModal';

const propTypes = {
  onClose: PropTypes.func.isRequired,
  setCurrentHierarchy: PropTypes.func.isRequired,
};

const DeleteHierarchyModalContainer = props => (
  <DeleteHierarchyModal
    {...props}
    onClose={() => {
      props.onClose();
      props.setCurrentHierarchy();
    }}
  />
);

DeleteHierarchyModalContainer.propTypes = propTypes;

export default connect((state) => {
  const levelId = state.hierarchy.get('currentId');
  const currentLevel = state.hierarchy.getIn(['data', levelId]);
  const productId = state.products.get('currentId');
  const currentProduct = state.products.getIn(['data', productId]);
  return { currentLevel, currentProduct };
}, { deleteHierarchy, setCurrentHierarchy })(DeleteHierarchyModalContainer);
