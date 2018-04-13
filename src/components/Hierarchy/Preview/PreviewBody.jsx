import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { setAttachment } from 'actions/hierarchy';
import PreviewTitle from './PreviewTitle';
import CurrentModule from './CurrentModule';
import ModuleSelection from './ModuleSelection';

const propTypes = {
  currentLevel: PropTypes.instanceOf(Immutable.Map),
  nextLevel: PropTypes.instanceOf(Immutable.Map),
  productId: PropTypes.string.isRequired,
  currentModuleId: PropTypes.string,
  previousModuleId: PropTypes.string,
  previousLevelId: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  setAttachment: PropTypes.func.isRequired,
};

const defaultProps = {
  currentLevel: Immutable.Map(),
  nextLevel: Immutable.Map(),
  currentModuleId: '',
  previousModuleId: '',
  previousLevelId: '',
};

const PreviewBody = ({
  currentLevel,
  nextLevel,
  currentModuleId,
  loading,
  previousModuleId,
  productId,
  previousLevelId,
  setAttachment: updateAttachment,
}) => {
  const handleContinue = () => {
    updateAttachment(productId, currentLevel.get('id'), currentModuleId, true);
  };

  const handlePrevious = () => {
    updateAttachment(productId, previousLevelId, previousModuleId, false);
  };

  return (
    <div id="preview-module" className="m-8">
      {loading ? (
        <div>Loading ...</div>
      ) : (
        <Fragment>
          <PreviewTitle
            currentName={currentLevel.get('name')}
            nextName={nextLevel.get('name')}
          />
          <div className="flex">
            <CurrentModule moduleId={currentModuleId} />
            <ModuleSelection moduleId={currentModuleId} levelId={nextLevel.get('id')} />
          </div>
          <div className="flex justify-end my-8">
            <button
              className={classnames('btn btn-primary-inverse mr-4', {
                'btn-primary-inverse-disabled': !previousModuleId,
              })}
              onClick={handlePrevious}
              disabled={!previousModuleId}
            >
              Previous
            </button>
            <button className="btn btn-primary" onClick={handleContinue}>
              Continue
            </button>
          </div>
        </Fragment>
      )}
    </div>
  );
};

PreviewBody.propTypes = propTypes;
PreviewBody.defaultProps = defaultProps;

export default connect(
  (state) => {
    const orderedLevels = state.hierarchy
      .get('data', Immutable.Map())
      .sortBy(level => level.get('order'))
      .toList();
    const availableLevels = orderedLevels.filter(level =>
      level.get('attachedModules', Immutable.Map()).some(val => !val));
    const nonAvailableLevels = orderedLevels.filter(level =>
      level.get('attachedModules', Immutable.Map()).size &&
        level.get('attachedModules').every(val => val));
    const previousLevel = nonAvailableLevels.reverse().get(0, Immutable.Map());
    const currentLevel = availableLevels.get(0, Immutable.Map());
    const nextLevel = availableLevels.get(1, Immutable.Map());
    const currentModules = currentLevel
      .get('attachedModules', Immutable.Map())
      .sortBy((_, key) => key);
    const currentModuleId = currentModules.findKey(val => !val);
    // previous module could be previous
    const lastPreviewed = currentModules.reverse().findKey(val => val);
    const lastPreviousModuleId = previousLevel
      .get('attachedModules', Immutable.Map())
      .sortBy((_, key) => key)
      .reverse()
      .findKey(val => val);
    const previousModuleId = lastPreviewed || lastPreviousModuleId;
    const previousLevelId = lastPreviewed
      ? currentLevel.get('id')
      : previousLevel.get('id');
    return {
      currentLevel,
      nextLevel,
      currentModuleId,
      previousModuleId,
      previousLevelId,
      loading: !currentModuleId,
      productId: state.products.get('currentId'),
    };
  },
  { setAttachment },
)(PreviewBody);
