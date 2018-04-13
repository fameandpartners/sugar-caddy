import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import Module from 'components/common/Module';
import intersection from 'lodash/intersection';

const propTypes = {
  modules: PropTypes.instanceOf(Immutable.List).isRequired,
};

const ModuleSelection = ({ modules }) => (
  <div
    id="module-selection"
    className="w-2/3 px-6 py-4 bg-grey-light flex flex-wrap items-center"
  >
    <div
      className="text-5xl font-light absolute"
      style={{ marginLeft: -40, marginTop: -32 }}
    >
      +
    </div>
    {modules.map(module => (
      <Module
        id={module.get('id')}
        key={module.get('id')}
        className="m-2"
        name={module.get('name')}
        image={module.get('image')}
        tags={module.get('tags')}
        incompatibilities={module.get('incompatibilities')}
      />
    ))}
  </div>
);

ModuleSelection.propTypes = propTypes;

export default connect((state, { moduleId, levelId }) => {
  const components = state.components.get('data');
  const currentTags = components
    .getIn([moduleId, 'tags'], Immutable.List())
    .toArray();
  const nextComponents = state.hierarchy
    .getIn(['data', levelId, 'attachedModules'])
    .map((_, key) => components.get(key));
  // grab all components with intersecting tags with current component
  const filteredComponents = nextComponents
    .filter(comp =>
      intersection(comp.get('tags', Immutable.List()).toArray(), currentTags)
        .length > 0)
    .filter(comp =>
      intersection(
        comp.get('incompatibilities', Immutable.List()).toArray(),
        currentTags,
      ).length === 0);
  // filter components with incompatibilities
  return { modules: filteredComponents.toArray() };
})(ModuleSelection);
