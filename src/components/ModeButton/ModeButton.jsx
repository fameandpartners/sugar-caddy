import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  mode: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const ModeButton = ({ mode, onClick }) => (
  <button
    className="bg-black hover:bg-grey-darkest text-white font-bold py-2 px-4 rounded-sm"
    onClick={onClick}
  >
    {mode === 'edit' ? 'Visualize possibilities' : 'Edit dress components'}
  </button>
);

ModeButton.propTypes = propTypes;

export default ModeButton;
