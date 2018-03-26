import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Immutable from 'immutable';
import CustomizationTags from './CustomizationTags';
import Incompatibilities from './Incompatibilities';

const propTypes = {
  customization: PropTypes.instanceOf(Immutable.Map).isRequired,
  order: PropTypes.number.isRequired,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
};

const defaultProps = {
  selected: false,
  disabled: false,
};

const contextTypes = {
  selectCustomization: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
};

const Customization = (
  {
    customization, order, selected, disabled,
  },
  { selectCustomization },
) => (
  <div
    role="button"
    tabIndex={0}
    className={classnames('Customization', {
      'Customization--selected': selected,
      'Customization--disabled': disabled,
    })}
    style={{ minHeight: '12rem', minWidth: '12rem' }}
    onClick={() => selectCustomization(customization.get('id'), order)}
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
    <Incompatibilities incompatibilities={customization.get('incompatibilities')} />
  </div>
);

Customization.propTypes = propTypes;
Customization.defaultProps = defaultProps;
Customization.contextTypes = contextTypes;

export default Customization;
