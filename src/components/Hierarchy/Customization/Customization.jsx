import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import * as hierarchyActions from 'actions/hierarchy';
import * as componentActions from 'actions/components';
import * as drawerActions from 'actions/drawers';
import CustomizationTags from './CustomizationTags';
import Incompatibilities from './Incompatibilities';

const propTypes = {
  customization: PropTypes.instanceOf(Immutable.Map).isRequired,
  order: PropTypes.number.isRequired,
  mode: PropTypes.string.isRequired,
  updateCurrentPath: PropTypes.func.isRequired,
  setCurrentId: PropTypes.func.isRequired,
  openDrawer: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
};

const defaultProps = {
  selected: false,
  disabled: false,
};

const Customization = ({
  customization,
  order,
  selected,
  disabled,
  mode,
  updateCurrentPath,
  setCurrentId,
  openDrawer,
}) => (
  <div
    role="button"
    tabIndex={0}
    className={classnames('Customization', {
      'Customization--selected': selected,
      'Customization--disabled': disabled,
    })}
    style={{ minHeight: '12rem', minWidth: '12rem' }}
    onClick={() => {
      if (disabled) return null;
      if (mode === 'view') {
        return updateCurrentPath({
          customizationId: customization.get('id'),
          order,
        });
      }
      openDrawer('ComponentDrawer');
      return setCurrentId(customization.get('id'));
    }}
    disabled={disabled}
  >
    {customization.get('image') ? (
      <img
        alt="Customization"
        className="w-24 h-24"
        style={{ objectFit: 'contain' }}
        src={customization.get('image')}
      />
    ) : (
      <div className="w-24 h-24" />
    )}
    <div>{customization.get('name')}</div>
    <CustomizationTags tags={customization.get('tags')} />
    <Incompatibilities
      incompatibilities={customization.get('incompatibilities')}
    />
  </div>
);

Customization.propTypes = propTypes;
Customization.defaultProps = defaultProps;

export default connect(null, {
  ...hierarchyActions,
  ...componentActions,
  ...drawerActions,
})(Customization);
