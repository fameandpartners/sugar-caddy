import React from 'react';
import PropTypes from 'prop-types';
import CustomizationLane from './CustomizationLane';
import LevelName from './LevelName';

const propTypes = {
  level: PropTypes.object.isRequired,
};

const HierarchyLevel = ({ level }) => (
  <div className="text-left mb-6">
    <LevelName levelId={level.get('id')} value={level.get('name')} order={level.get('order')} />
    <CustomizationLane order={level.get('order')} levelId={level.get('id')} />
  </div>
);

HierarchyLevel.propTypes = propTypes;

export default HierarchyLevel;
