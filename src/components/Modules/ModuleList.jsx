import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import Module from 'components/common/Module';
import { connect } from 'react-redux';

const propTypes = {
  components: PropTypes.instanceOf(Immutable.Map).isRequired,
};

const ModuleList = ({ components }) => (
  <div id="module-list" className="flex flex-wrap justify-center my-8">
    {components.toList().map(custom => (
      <Module
        id={custom.get('id')}
        key={custom.get('id')}
        className="m-3"
        order={0}
        name={custom.get('name')}
        image={custom.get('image')}
        onClick={() => {}}
        tags={custom.get('tags')}
        incompatibilities={custom.get('incompatibilities')}
      />
    ))}
  </div>
);

ModuleList.propTypes = propTypes;

export default connect(state => ({ components: state.components.get('data') }))(ModuleList);
