import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchHierarchy } from 'actions/hierarchy';
import { fetchHierarchyComponents } from 'actions/components';
import Hierarchy from 'components/Hierarchy';
import HierarchyHeader from 'components/HierarchyHeader';


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
        <HierarchyHeader />
        <Hierarchy />
      </div>
    );
  }
}

export default connect(null, {
  fetchHierarchy,
  fetchHierarchyComponents,
})(HierarchyPage);
