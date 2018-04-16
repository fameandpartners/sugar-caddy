import React from 'react';
import PropTypes from 'prop-types';
import TextInput from 'components/common/TextInput';
import TextArray from 'components/common/TextArray';
import { Field, FieldArray, reduxForm } from 'redux-form';

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Name is required.';
  }

  return errors;
};

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const ComponentDrawerForm = ({ handleSubmit, onDelete }) => (
  <form className="flex-1 flex justify-between" onSubmit={handleSubmit}>
    <div>
      <div className="text-lg font-semibold mb-2">Name</div>
      <Field type="text" name="name" component={TextInput} />
    </div>
    <div>
      <div className="text-lg font-semibold mb-2">Tags</div>
      <FieldArray type="text" name="tags" component={TextArray} />
    </div>
    <div>
      <div className="text-lg font-semibold mb-2">Incompatibilities</div>
      <FieldArray type="text" name="incompatibilities" component={TextArray} />
    </div>
    <div className="self-center">
      <div className="text-center">
        <button
          className="bg-black hover:bg-grey-darkest text-white font-bold py-2 px-4 rounded-sm"
          type="submit"
        >
          Done
        </button>
      </div>
      <div>
        <button
          className="btn btn-link"
          onClick={(e) => {
            e.preventDefault();
            onDelete();
          }}
        >
          Delete module
        </button>
      </div>
    </div>
  </form>
);

ComponentDrawerForm.propTypes = propTypes;

export default reduxForm({
  form: 'ComponentDrawer',
  validate,
  enableReinitialize: true,
})(ComponentDrawerForm);
