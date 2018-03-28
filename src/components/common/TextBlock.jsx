import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  input: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const TextBlock = ({ input: { value }, onDelete }) => (
  <div className="border border-grey-darkest flex px-2 py-1 rounded-full">
    <div>{value}</div>
    <button type="button" className="ml-1" onClick={onDelete}>
      &times;
    </button>
  </div>
);

TextBlock.propTypes = propTypes;

export default TextBlock;
