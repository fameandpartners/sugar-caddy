import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchHierarchy } from 'actions/hierarchy';
import { fetchComponents } from 'actions/components';
import { connect } from 'react-redux';
import Hierarchy from 'components/Hierarchy';
import ModeButton from 'components/ModeButton';

class HierarchyPage extends Component {
  static propTypes = {
    fetchHierarchy: PropTypes.func.isRequired,
    fetchComponents: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.fetchHierarchy();
    this.props.fetchComponents();
  }

  render() {
    return (
      <div>
        <div className="mt-6 ml-8">
          <ModeButton />
        </div>
        <Hierarchy />
      </div>
    );
  }
}

export default connect(null, {
  fetchHierarchy,
  fetchComponents,
})(HierarchyPage);
