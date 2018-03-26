import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  input: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const TextBlock = ({ input: { value }, onDelete }) => (
  <div className="flex p-2 border border-grey-darkest rounded-sm">
    <div>{value}</div>
    <button type="button" className="ml-1" onClick={onDelete}>
      &times;
    </button>
  </div>
);

TextBlock.propTypes = propTypes;

export default TextBlock;
