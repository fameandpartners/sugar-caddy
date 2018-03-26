import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  incompatibilities: PropTypes.array,
};

const defaultProps = {
  incompatibilities: [],
};

const Incompatibilities = ({ incompatibilities }) => (
  <div id="customization-incompatibilities" className="flex flex-wrap">
    {incompatibilities.map(tag => (
      <div
        key={tag}
        className="border border-red-dark bg-red rounded-full px-1 m-1"
      >
        {tag}
      </div>
    ))}
  </div>
);

Incompatibilities.propTypes = propTypes;
Incompatibilities.defaultProps = defaultProps;

export default Incompatibilities;
