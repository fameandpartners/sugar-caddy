import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import TextInput from 'components/common/TextInput';

const propTypes = {
  id: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const EditProductForm = ({ id, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div className="w-32 mr-2">
      <Field
        placeholder="Code"
        name={`${id}-code`}
        type="text"
        component={TextInput}
      />
    </div>

    <div className="w-1/6 mr-3">
      <Field
        placeholder="Name"
        name={`${id}-name`}
        type="text"
        component={TextInput}
      />
    </div>

    <div className="grow-1">
      <button
        className="bg-blue hover:bg-blue-dark text-white py-2 px-4 rounded-sm"
        type="submit"
      >
        Add
      </button>
    </div>
  </form>
);

EditProductForm.propTypes = propTypes;

export default reduxForm({
  form: 'EditProductForm',
})(EditProductForm);
