import React from 'react';
import PropTypes from 'prop-types';
import intersection from 'lodash/intersection';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import Customization from './Customization';

const propTypes = {
  levelId: PropTypes.string.isRequired,
  order: PropTypes.number.isRequired,
  mode: PropTypes.string.isRequired,
  currentPath: PropTypes.instanceOf(Immutable.List).isRequired,
  components: PropTypes.instanceOf(Immutable.Map).isRequired,
};

const CustomizationLane = ({
  levelId,
  order,
  mode,
  currentPath,
  components,
}) => {
  const customizations = components
    .toList()
    .filter(item => item.get('levelId') === levelId);
  const currentTags = currentPath
    .slice(0, order - 1)
    .reduce(
      (acc, curr) =>
        acc.concat(components.getIn([curr, 'tags']).toArray() || []),
      [],
    );

  return (
    <div
      id="customization-lane"
      className="flex bg-grey-light overflow-x-auto p-2"
    >
      {customizations.map((custom) => {
        const tagIntersect = intersection(
          currentTags,
          (custom.get('tags') || Immutable.List()).toArray(),
        );
        const incompIntersect = intersection(
          currentTags,
          (custom.get('incompatibilities') || Immutable.List()).toArray(),
        );
        return (
          <Customization
            key={custom.get('id')}
            order={order}
            customization={custom}
            mode={mode}
            disabled={
              mode === 'view' &&
              !!currentTags.length &&
              (!tagIntersect.length || !!incompIntersect.length)
            }
            selected={
              mode === 'view' && custom.get('id') === currentPath.get(order - 1)
            }
          />
        );
      })}
    </div>
  );
};

CustomizationLane.propTypes = propTypes;

export default connect(state => ({
  mode: state.hierarchy.get('mode'),
  currentPath: state.hierarchy.get('currentPath'),
  components: state.components.get('data'),
}))(CustomizationLane);
