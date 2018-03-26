import React from 'react';
import PropTypes from 'prop-types';
import intersection from 'lodash/intersection';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import Customization from './Customization';

const propTypes = {
  levelId: PropTypes.string.isRequired,
  order: PropTypes.number.isRequired,
  hierarchy: PropTypes.instanceOf(Immutable.Map).isRequired,
};

const contextTypes = {
  mode: PropTypes.string.isRequired,
  components: PropTypes.object.isRequired,
  currentPath: PropTypes.array.isRequired,
};

const CustomizationLane = (
  { levelId, order, hierarchy },
  { mode, components, currentPath },
) => {
  const customizations = hierarchy.getIn(['data', 'components']).toList()
    .filter(item => item.get('levelId') === levelId);
  const currentTags =
    currentPath &&
    currentPath
      .slice(0, order - 1)
      .reduce((acc, curr) => acc.concat(components.getIn([curr, 'tags']).toArray() || []), []);

  console.log('customizations', customizations.toJS());

  return (
    <div
      id="customization-lane"
      className="flex bg-grey-light overflow-x-auto p-2"
    >
      {customizations.map((custom) => {
        const tagIntersect = intersection(currentTags, (custom.get('tags') || Immutable.List()).toArray());
        const incompIntersect = intersection(
          currentTags,
          (custom.get('incompatibilities') || Immutable.List()).toArray(),
        );
        return (
          <Customization
            key={custom.get('id')}
            order={order}
            customization={custom}
            disabled={
              mode === 'view' &&
              !!currentTags.length &&
              (!tagIntersect.length || incompIntersect.length)
            }
            selected={mode === 'view' && custom.get('id') === currentPath[order - 1]}
          />
        );
      })}
    </div>
  );
};

CustomizationLane.propTypes = propTypes;
CustomizationLane.contextTypes = contextTypes;

export default connect(state => ({ hierarchy: state.hierarchy }))(CustomizationLane);
