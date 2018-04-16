import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import Module from 'components/common/Module';

const propTypes = {
  currentModule: PropTypes.instanceOf(Immutable.Map).isRequired,
  incompatibleModule: PropTypes.instanceOf(Immutable.Map).isRequired,
};

const IncompatibilityDrawer = ({ currentModule, incompatibleModule }) => (
  <div
    id="incompatibility-drawer"
    className="p-8 flex items-center justify-between"
  >
    <Module id={`incompatible-${currentModule.get('id')}`} />
    is incompatible with
    <Module id={`incompatible-${incompatibleModule.get('id')}`} />
    <div>
      <button className="btn btn-primary">Submit</button>
      <button className="btn btn-link">Cancel</button>
    </div>
  </div>
);

IncompatibilityDrawer.propTypes = propTypes;

export default connect((state, { moduleId, incompatibleId }) => {
  const components = state.components.get('data');
  const currentModule = components.get(moduleId);
  const incompatibleModule = components.get(incompatibleId);
  return { currentModule, incompatibleModule };
})(IncompatibilityDrawer);
