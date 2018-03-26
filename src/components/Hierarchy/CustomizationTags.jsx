import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  tags: PropTypes.array,
};

const defaultProps = {
  tags: [],
};

const CustomizationTags = ({ tags }) => (
  <div id="customization-tags" className="flex flex-wrap">
    {tags.map(tag => (
      <div
        key={tag}
        className="border border-green-dark bg-green rounded-full px-1 m-1"
      >
        {tag}
      </div>
    ))}
  </div>
);

CustomizationTags.propTypes = propTypes;
CustomizationTags.defaultProps = defaultProps;

export default CustomizationTags;
