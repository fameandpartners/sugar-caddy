import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import TextInput from 'components/common/TextInput';

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
};

const CreateProductForm = ({ handleSubmit, size }) => (
  <form
    onSubmit={handleSubmit}
    className="flex px-6 py-2 border border-grey-darker items-center"
  >
    <div className="w-8">{size + 1}</div>
    <div className="w-32 mr-2">
      <Field
        placeholder="Code"
        type="text"
        name="code"
        component={TextInput}
      />
    </div>
    <div className="w-1/6 mr-3">
      <Field
        placeholder="Name"
        type="text"
        name="name"
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

CreateProductForm.propTypes = propTypes;

export default reduxForm({
  form: 'CreateProductForm',
})(CreateProductForm);
