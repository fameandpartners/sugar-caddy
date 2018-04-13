import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Module from 'components/common/Module';
import { updateComponentSuccess } from 'actions/components';

const propTypes = {
  components: PropTypes.instanceOf(Immutable.Map).isRequired,
  levelId: PropTypes.string.isRequired,
  updateComponentSuccess: PropTypes.func.isRequired,
};

const ModulesList = ({
  components,
  levelId,
  updateComponentSuccess: updateComponent,
}) => (
  <div
    id="module-list"
    className="flex flex-wrap justify-center my-8 overflow-y-auto"
    style={{ maxHeight: 'calc(100% - 135px)' }}
  >
    {components.toList().map(custom => (
      <Module
        id={custom.get('id')}
        key={custom.get('id')}
        className={classnames('m-3', {
          'border-2 border-blue': custom.get('levelId') === levelId,
        })}
        name={custom.get('name')}
        image={custom.get('image')}
        onClick={() =>
          updateComponent({
            componentId: custom.get('id'),
            update: { levelId: custom.get('levelId') === levelId ? '' : levelId },
          })
        }
        tags={custom.get('tags')}
        incompatibilities={custom.get('incompatibilities')}
      />
    ))}
  </div>
);

ModulesList.propTypes = propTypes;

export default connect(
  state => ({
    components: state.components.get('data'),
  }),
  { updateComponentSuccess },
)(ModulesList);
