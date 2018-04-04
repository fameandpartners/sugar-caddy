import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Immutable from 'immutable';
import CustomizationTags from 'components/Hierarchy/Customization/CustomizationTags';
import Incompatibilities from 'components/Hierarchy/Customization/Incompatibilities';

const propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  tags: PropTypes.instanceOf(Immutable.List),
  incompatibilities: PropTypes.instanceOf(Immutable.List),
  onClick: PropTypes.func,
  className: PropTypes.string,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
};

const defaultProps = {
  image: '',
  tags: Immutable.List(),
  incompatibilities: Immutable.List(),
  onClick: () => {},
  className: '',
  selected: false,
  disabled: false,
};

const Module = ({
  name,
  image,
  onClick,
  className,
  selected,
  disabled,
  tags,
  incompatibilities,
}) => (
  <div
    role="button"
    tabIndex={0}
    className={classnames('Customization', {
      'Customization--selected': selected,
      'Customization--disabled': disabled,
    }, className)}
    style={{ minHeight: '12rem', minWidth: '12rem' }}
    onClick={onClick}
  >
    {image ? (
      <img
        alt="Customization"
        className="w-24 h-24"
        style={{ objectFit: 'contain' }}
        src={image}
      />
    ) : (
      <div className="w-24 h-24" />
    )}
    <div>{name}</div>
    <CustomizationTags tags={tags} />
    <Incompatibilities incompatibilities={incompatibilities} />
  </div>
);

Module.propTypes = propTypes;
Module.defaultProps = defaultProps;

export default Module;
