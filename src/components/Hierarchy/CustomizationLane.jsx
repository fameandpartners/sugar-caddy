import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import intersection from 'lodash/intersection';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import qs from 'querystring';
import { showModal } from 'actions/modals';
import { setCurrentHierarchy } from 'actions/hierarchy';
import Customization from './Customization';

class CustomizationLane extends PureComponent {
  static propTypes = {
    levelId: PropTypes.string.isRequired,
    order: PropTypes.number.isRequired,
    attachedModules: PropTypes.instanceOf(Immutable.Map),
    mode: PropTypes.string.isRequired,
    currentPath: PropTypes.instanceOf(Immutable.List).isRequired,
    components: PropTypes.instanceOf(Immutable.Map).isRequired,
    showModal: PropTypes.func.isRequired,
    setCurrentHierarchy: PropTypes.func.isRequired,
    compLoading: PropTypes.bool.isRequired,
    hierLoading: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    attachedModules: Immutable.Map(),
  };

  spawnModal = () => {
    const { levelId } = this.props;
    this.props.setCurrentHierarchy(levelId);
    this.props.showModal('AddModulesModal');
  };

  renderCustomizations = (customizations) => {
    const {
      currentPath, order, components, mode,
    } = this.props;
    const currentTags = currentPath
      .slice(0, order - 1)
      .reduce(
        (acc, curr) =>
          acc.concat(components.getIn([curr, 'tags']).toArray() || []),
        [],
      );
    return (
      <div
        id="customizations"
        className="flex bg-grey-light overflow-x-auto p-2"
      >
        {customizations.map((custom) => {
          const tagIntersect = intersection(
            currentTags,
            custom.get('tags', Immutable.List()).toArray(),
          );
          const incompIntersect = intersection(
            currentTags,
            (custom.get('incompatibilities') || Immutable.List()).toArray(),
          );
          return (
            <Customization
              key={custom.get('id')}
              order={order}
              customization={custom}
              mode={mode}
              disabled={
                mode === 'view' &&
                !!currentTags.length &&
                (!tagIntersect.length || !!incompIntersect.length)
              }
              selected={
                mode === 'view' &&
                custom.get('id') === currentPath.get(order - 1)
              }
            />
          );
        })}
      </div>
    );
  };

  renderAddModules = () => (
    <div id="add-modules" className="flex justify-center py-8">
      <button className="btn btn-primary" onClick={this.spawnModal}>
        + Add Modules
      </button>
    </div>
  );

  renderMiniAddButton = () => (
    <div className="flex justify-end mb-3">
      <button className="btn btn-link p-0" onClick={this.spawnModal}>
        Add Modules
      </button>
    </div>
  );

  renderLoading = () => (
    <div id="customization-lane" className="my-4 text-center">
      Loading ...
    </div>
  );

  render() {
    const {
      mode,
      components,
      attachedModules,
      compLoading,
      hierLoading,
    } = this.props;
    const loading = compLoading || hierLoading;

    const customizations = attachedModules
      .map((val, key) => components.get(key).set('preview', val))
      .toList();

    const hasCustomizations = customizations.size > 0;
    const addMode = mode === 'add';

    if (loading) return this.renderLoading();

    return (
      <div id="customization-lane">
        {addMode && hasCustomizations && this.renderMiniAddButton()}
        {addMode && !hasCustomizations
          ? this.renderAddModules()
          : this.renderCustomizations(customizations)}
      </div>
    );
  }
}

export default connect(
  (state) => {
    const { search } = state.router.location;
    const { mode } = qs.parse(search.slice(1));
    return {
      mode,
      currentPath: state.hierarchy.get('currentPath'),
      components: state.components.get('data'),
      compLoading: state.components.get('loading'),
      hierLoading: state.hierarchy.get('loading'),
    };
  },
  { showModal, setCurrentHierarchy },
)(CustomizationLane);
