import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateHierarchy, setCurrentHierarchy } from 'actions/hierarchy';
import { showModal } from 'actions/modals';
import curry from 'lodash/curry';
import EditHierNameForm from './EditHierNameForm';

class LevelName extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    productId: PropTypes.string.isRequired,
    levelId: PropTypes.string.isRequired,
    updateHierarchy: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
    setCurrentHierarchy: PropTypes.func.isRequired,
  };

  state = { editMode: false, hover: false };

  toggleState = curry((item, value) => () => this.setState({ [item]: value }));

  toggleEditMode = this.toggleState('editMode');

  toggleHover = this.toggleState('hover');

  handleSubmit = (data) => {
    const { productId, levelId } = this.props;
    this.props.updateHierarchy(productId, levelId, data);
    this.setState({ editMode: false });
  };

  handleDelete = () => {
    const { levelId } = this.props;
    this.props.showModal('DeleteHierarchyModal');
    this.props.setCurrentHierarchy(levelId);
  }

  render() {
    const { value } = this.props;
    const { editMode, hover } = this.state;
    return (
      <div
        className="flex items-center text-grey-darkest"
        onMouseEnter={this.toggleHover(true)}
        onMouseLeave={this.toggleHover(false)}
      >
        <div
          className="flex-1 border-b border-grey-darkest"
          style={{ marginBottom: 2, marginTop: 1 }}
        />
        {editMode ? (
          <EditHierNameForm
            initialValues={{ name: value }}
            onSubmit={this.handleSubmit}
            onClose={this.toggleEditMode(false)}
          />
        ) : (
          <div
            role="presentation"
            className="py-2 my-2 px-8 border border-transparent hover:bg-grey-lighter hover:border-grey-darkest"
            onClick={this.toggleEditMode(true)}
          >
            {value}
          </div>
        )}
        <div className="flex-1 flex items-center">
          <div
            className="flex-1 border-b border-grey-darkest"
            style={{ marginBottom: 2, marginTop: 1 }}
          />
          {hover && (
            <div
              role="presentation"
              className="mx-2 w-6 h-6 flex justify-center items-center cursor-pointer border border-grey-darkest rounded-full hover:text-red-light hover:border-red-light"
              style={{ width: '1.25rem', height: '1.25rem' }}
              onClick={this.handleDelete}
            >
              &times;
            </div>
          )}
          <div
            className="border-b border-grey-darkest w-4"
            style={{ marginBottom: 2, marginTop: 1 }}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    productId: state.products.get('currentId'),
  }),
  { updateHierarchy, showModal, setCurrentHierarchy },
)(LevelName);
