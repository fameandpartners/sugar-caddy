import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Module from 'components/common/Module';
import { addAttachmentClient, deleteAttachmentClient } from 'actions/hierarchy';

const propTypes = {
  components: PropTypes.instanceOf(Immutable.Map).isRequired,
  attachedModules: PropTypes.instanceOf(Immutable.Map).isRequired,
  levelId: PropTypes.string.isRequired,
  addAttachmentClient: PropTypes.func.isRequired,
  deleteAttachmentClient: PropTypes.func.isRequired,
};

const ModulesList = ({
  components,
  levelId,
  attachedModules,
  deleteAttachmentClient: deleteAttachment,
  addAttachmentClient: addAttachment,
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
          'border-2 border-blue': attachedModules.has(custom.get('id')),
        })}
        name={custom.get('name')}
        image={custom.get('image')}
        onClick={() =>
          (attachedModules.has(custom.get('id'))
            ? deleteAttachment({ levelId, componentId: custom.get('id') })
            : addAttachment({ levelId, componentId: custom.get('id') }))
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
  { addAttachmentClient, deleteAttachmentClient },
)(ModulesList);
