import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import ModulesList from './ModulesList';

const propTypes = {
  currentProduct: PropTypes.instanceOf(Immutable.Map).isRequired,
  currentLevel: PropTypes.instanceOf(Immutable.Map).isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

const AddModulesModal = ({
  currentProduct, currentLevel, onClose, onSave,
}) => (
  <div id="add-modules-modal" className="h-full flex flex-col">
    <div className="flex justify-end border-b border-grey-darkest pb-4">
      <div className="w-1/6" />
      <div className="flex flex-1 font-light items-center justify-center text-2xl">
        Select Modules: {currentProduct.get('name')} {currentLevel.get('name')}
      </div>
      <div className="w-1/6 flex justify-end items-center leading-none">
        <div
          role="button"
          tabIndex={0}
          className="cursor-pointer text-4xl text-grey-darkest hover:text-grey-dark"
          onClick={onClose}
        >
          &times;
        </div>
      </div>
    </div>
    <ModulesList levelId={currentLevel.get('id')} />
    <div className="flex justify-end">
      <button className="btn btn-primary" onClick={onSave}>
        Done
      </button>
    </div>
  </div>
);

AddModulesModal.propTypes = propTypes;

export default AddModulesModal;
