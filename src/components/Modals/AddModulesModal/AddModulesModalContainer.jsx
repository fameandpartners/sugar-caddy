import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { addModalStyles } from 'actions/modals';
import { setCurrentHierarchy, updateAttachments } from 'actions/hierarchy';
import AddModulesModal from './AddModulesModal';

class AddModulesModalContainer extends PureComponent {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    setCurrentHierarchy: PropTypes.func.isRequired,
    addModalStyles: PropTypes.func.isRequired,
    updateAttachments: PropTypes.func.isRequired,
    currentLevel: PropTypes.instanceOf(Immutable.Map).isRequired,
    currentProduct: PropTypes.instanceOf(Immutable.Map).isRequired,
  };

  componentWillMount() {
    this.props.addModalStyles({
      overlay: {
        overflow: 'unset',
      },
      content: {
        border: 'none',
        overflow: 'unset',
        borderRadius: 'unset',
        margin: 0,
        height: '100%',
        width: '100%',
      },
    });
  }

  handleSave = () => {
    const { currentLevel, currentProduct } = this.props;
    const update = currentLevel.get('attachedModules').toJS();
    console.log(
      'update',
      currentProduct.get('id'),
      currentLevel.get('id'),
      update,
    );
    this.props.updateAttachments(
      currentProduct.get('id'),
      currentLevel.get('id'),
      update,
    );
    this.handleClose();
  };

  handleClose = () => {
    this.props.onClose();
    this.props.setCurrentHierarchy();
  };

  render() {
    return (
      <AddModulesModal
        {...this.props}
        onSave={this.handleSave}
        onClose={this.handleClose}
      />
    );
  }
}

export default connect(
  (state) => {
    const levelId = state.hierarchy.get('currentId');
    const currentLevel = state.hierarchy.getIn(['data', levelId]);
    const productId = state.products.get('currentId');
    const currentProduct = state.products.getIn(['data', productId]);
    return { currentLevel, currentProduct };
  },
  {
    setCurrentHierarchy,
    addModalStyles,
    updateAttachments,
  },
)(AddModulesModalContainer);
