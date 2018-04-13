import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import Module from 'components/common/Module';

const propTypes = {
  module: PropTypes.instanceOf(Immutable.Map).isRequired,
};

const CurrentModule = ({ module }) => (
  <div id="current-module" className="w-1/3 flex justify-center items-center p-4">
    <Module
      id={module.get('id')}
      key={module.get('id')}
      className="cursor-default"
      name={module.get('name')}
      image={module.get('image')}
      tags={module.get('tags')}
      incompatibilities={module.get('incompatibilities')}
    />
  </div>
);

CurrentModule.propTypes = propTypes;

export default connect((state, { moduleId }) => ({
  module: state.components.getIn(['data', moduleId]),
}))(CurrentModule);
