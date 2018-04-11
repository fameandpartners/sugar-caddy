import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import HierarchyLevel from './HierarchyLevel';
import CreateHierarchyForm from './CreateHierarchyForm';

const Hierarchy = ({ hierarchy }) => (
  <div id="hierarchy" className="container my-8">
    {(hierarchy || Immutable.Map())
      .toList()
      .sort((a, b) => a.get('order') - b.get('order'))
      .map(level => (
        <HierarchyLevel key={level.get('name')} level={level} />
      ))}
    <CreateHierarchyForm />
  </div>
);

Hierarchy.propTypes = {
  hierarchy: PropTypes.object.isRequired,
};

export default connect(state => ({ hierarchy: state.hierarchy.get('data') }))(Hierarchy);
