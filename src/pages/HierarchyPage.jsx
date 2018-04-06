import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchHierarchy } from 'actions/hierarchy';
import { fetchHierarchyComponents } from 'actions/components';
import { connect } from 'react-redux';
import Hierarchy from 'components/Hierarchy';
import ModeButton from 'components/ModeButton';

class HierarchyPage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    fetchHierarchy: PropTypes.func.isRequired,
    fetchHierarchyComponents: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const { match: { params: { productId } } } = this.props;
    this.props.fetchHierarchy(productId);
    this.props.fetchHierarchyComponents(productId);
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
  fetchHierarchyComponents,
})(HierarchyPage);
