import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import TextInput from 'components/common/TextInput';

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }

  return errors;
};

class EditHierNameForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.inputRef.focus();
    this.inputRef.select();
  }

  render() {
    const { handleSubmit, onClose } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field
          inputRef={(el) => {
            this.inputRef = el;
          }}
          name="name"
          type="text"
          component={TextInput}
          className="my-2"
          inputClassName="border-grey-darker hover:border-grey-darker rounded-none border"
          onBlur={onClose}
        />
      </form>
    );
  }
}

export default reduxForm({
  form: 'EditHierNameForm',
  validate,
})(EditHierNameForm);
