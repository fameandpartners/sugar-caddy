import React from 'react';
import PropTypes from 'prop-types';

const overlayStyle = {
  padding: '4rem 0',
  background: 'rgba(0,0,0,0.5)',
};

const propTypes = {
  children: PropTypes.node.isRequired,
};

const Overlay = ({ children }) => (
  <div id="overlay" style={overlayStyle} className="absolute pin py-8 px-0 text-center text-white">
    {children}
  </div>
);

Overlay.propTypes = propTypes;

export default Overlay;
