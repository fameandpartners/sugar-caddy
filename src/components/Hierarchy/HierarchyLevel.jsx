import React from 'react';
import PropTypes from 'prop-types';
import CustomizationLane from './CustomizationLane';

const propTypes = {
  level: PropTypes.object.isRequired,
};

const HierarchyLevel = ({ level }) => (
  <div className="text-left mb-6">
    <div className="text-lg font-semibold">{level.name}</div>
    <CustomizationLane order={level.order} levelId={level.id} />
  </div>
);

HierarchyLevel.propTypes = propTypes;

export default HierarchyLevel;
