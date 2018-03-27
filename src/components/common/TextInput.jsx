import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const propTypes = {
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  meta: PropTypes.object.isRequired,
  onKeyPress: PropTypes.func,
};

const defaultProps = {
  placeholder: '',
  onKeyPress: () => {},
};

const TextInput = ({
  input, type, onKeyPress, meta: { touched, error }, placeholder,
}) => (
  <div className="w-48">
    <input
      className={classnames(
        'bg-grey-lighter appearance-none border-2 rounded-sm w-full p-2 text-grey-darker',
        {
          'border-grey-lighter hover:border-purple': !(touched && error),
          'border-red hover:border-red-dark': touched && error,
        },
      )}
      id="inline-full-name"
      type={type}
      {...input}
      placeholder={placeholder}
      onKeyPress={onKeyPress}
    />
    {touched && error && <div className="text-red">{error}</div>}
  </div>
);

TextInput.propTypes = propTypes;
TextInput.defaultProps = defaultProps;

export default TextInput;
