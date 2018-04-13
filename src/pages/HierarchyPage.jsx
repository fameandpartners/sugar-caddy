import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'querystring';
import { connect } from 'react-redux';
import { fetchProduct, setCurrentId } from 'actions/products';
import { fetchHierarchy, fetchAttachments } from 'actions/hierarchy';
import { fetchComponents } from 'actions/components';
import Hierarchy from 'components/Hierarchy';
import HierarchyHeader from 'components/HierarchyHeader';
import HierarchyPreview from 'components/Hierarchy/Preview';

class HierarchyPage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    fetchHierarchy: PropTypes.func.isRequired,
    fetchComponents: PropTypes.func.isRequired,
    fetchAttachments: PropTypes.func.isRequired,
    fetchProduct: PropTypes.func.isRequired,
    setProductId: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const {
      match: { params: { productId } },
      location: { pathname, search },
      history: { push },
    } = this.props;
    const { mode } = qs.parse(search.slice(1));
    if (!mode) push(`${pathname}?mode=add`);
    this.props.fetchHierarchy(productId);
    this.props
      .fetchComponents()
      .then(() => this.props.fetchAttachments(productId));
    this.props
      .fetchProduct(productId)
      .then(() => this.props.setProductId(productId));
  }

  render() {
    const { location: { search } } = this.props;
    const { mode } = qs.parse(search.slice(1));
    return (
      <div>
        <HierarchyHeader />
        {mode === 'preview' ? <HierarchyPreview /> : <Hierarchy />}
      </div>
    );
  }
}

export default connect(null, {
  fetchHierarchy,
  fetchComponents,
  fetchAttachments,
  fetchProduct,
  setProductId: setCurrentId,
})(HierarchyPage);
