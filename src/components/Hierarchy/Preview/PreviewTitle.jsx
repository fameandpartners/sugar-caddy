import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  currentName: PropTypes.string.isRequired,
  nextName: PropTypes.string.isRequired,
};

const PreviewTitle = ({ currentName, nextName }) => (
  <div className="flex my-6">
    <div className="w-1/3" />
    <div className="w-2/3">
      <div className="my-2 font-light">
        {currentName} + {nextName}
      </div>
      <div className="text-xl my-2 font-light">
        Select the modules that are incompatible
      </div>
    </div>
  </div>
);

PreviewTitle.propTypes = propTypes;

export default PreviewTitle;
