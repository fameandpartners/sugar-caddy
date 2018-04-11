import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const propTypes = {
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  meta: PropTypes.object.isRequired,
  onKeyPress: PropTypes.func,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  style: PropTypes.object,
};

const defaultProps = {
  placeholder: '',
  onKeyPress: () => {},
  className: '',
  inputClassName: '',
  style: {},
};

const TextInput = ({
  input,
  type,
  onKeyPress,
  meta: { touched, error },
  placeholder,
  className,
  inputClassName,
}) => (
  <div className={classnames(className)}>
    <input
      className={classnames(
        'TextInput',
        {
          'TextInput--error': touched && error,
        },
        inputClassName,
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
