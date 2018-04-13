import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { addModalStyles } from 'actions/modals';
import { setCurrentHierarchy } from 'actions/hierarchy';
import { fetchComponents, updateAttachments } from 'actions/components';
import AddModulesModal from './AddModulesModal';

class AddModulesModalContainer extends PureComponent {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    setCurrentHierarchy: PropTypes.func.isRequired,
    addModalStyles: PropTypes.func.isRequired,
    fetchComponents: PropTypes.func.isRequired,
    updateAttachments: PropTypes.func.isRequired,
    components: PropTypes.instanceOf(Immutable.Map).isRequired,
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
    const { components, currentLevel, currentProduct } = this.props;
    console.log('saving');
    const filteredComponents = components
      .filter(comp => comp.get('levelId') === currentLevel.get('id'))
      .map(() => true);
    console.log('filtered comps', filteredComponents.toJS());
    const update = filteredComponents.toJS();
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
    const components = state.components.get('data');
    return { currentLevel, currentProduct, components };
  },
  {
    setCurrentHierarchy, addModalStyles, fetchComponents, updateAttachments,
  },
)(AddModulesModalContainer);
