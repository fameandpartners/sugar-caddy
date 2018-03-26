import React from 'react';
import PropTypes from 'prop-types';
import HierarchyLevel from './HierarchyLevel';

const Hierarchy = (_, { hierarchy }) => (
  <div id="hierarchy" className="container my-8">
    {Object.keys(hierarchy)
      .map(key => hierarchy[key])
      .sort((a, b) => a.order - b.order)
      .map(level => <HierarchyLevel key={level.name} level={level} />)}
  </div>
);

Hierarchy.contextTypes = {
  hierarchy: PropTypes.object.isRequired,
};

export default Hierarchy;
