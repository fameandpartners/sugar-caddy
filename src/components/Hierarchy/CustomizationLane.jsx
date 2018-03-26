import React from 'react';
import PropTypes from 'prop-types';
import intersection from 'lodash/intersection';
import Customization from './Customization';

const propTypes = {
  levelId: PropTypes.string.isRequired,
  order: PropTypes.number.isRequired,
};

const contextTypes = {
  mode: PropTypes.string.isRequired,
  components: PropTypes.object.isRequired,
  currentPath: PropTypes.array.isRequired,
};

const CustomizationLane = (
  { levelId, order },
  { mode, components, currentPath },
) => {
  const customizations = Object.keys(components)
    .map(key => components[key])
    .filter(item => item.levelId === levelId);
  const currentTags =
    currentPath &&
    currentPath
      .slice(0, order - 1)
      .reduce((acc, curr) => acc.concat(components[curr].tags || []), []);

  return (
    <div
      id="customization-lane"
      className="flex bg-grey-light overflow-x-auto p-2"
    >
      {customizations.map((custom) => {
        const tagIntersect = intersection(currentTags, custom.tags || []);
        const incompIntersect = intersection(
          currentTags,
          custom.incompatibilities || [],
        );
        return (
          <Customization
            key={custom.id}
            order={order}
            customization={custom}
            disabled={
              mode === 'view' &&
              !!currentTags.length &&
              (!tagIntersect.length || incompIntersect.length)
            }
            selected={mode === 'view' && custom.id === currentPath[order - 1]}
          />
        );
      })}
    </div>
  );
};

CustomizationLane.propTypes = propTypes;
CustomizationLane.contextTypes = contextTypes;

export default CustomizationLane;
