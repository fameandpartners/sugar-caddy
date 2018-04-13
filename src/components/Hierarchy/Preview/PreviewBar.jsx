import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';

const propTypes = {
  percentage: PropTypes.number.isRequired,
};

const PreviewBar = ({ percentage }) => (
  <div id="preview-bar" className="flex w-full h-2 bg-grey-lightest">
    <div
      id="completed"
      className="bg-black"
      style={{ width: `${percentage}%` }}
    />
  </div>
);

PreviewBar.propTypes = propTypes;

export default connect((state) => {
  const completedModules = state.hierarchy
    .get('data')
    .reduce(
      (allAttach, level) =>
        allAttach.merge(level.get('attachedModules', Immutable.Map())),
      Immutable.Map(),
    )
    .reduce((sum, x) => sum + x, 0);
  const totalModules = state.hierarchy
    .get('data')
    .reduce(
      (total, level) =>
        total + level.get('attachedModules', Immutable.Map()).size,
      0,
    );

  const percentage = (completedModules / totalModules) * 100 || 0;
  return { percentage };
})(PreviewBar);
