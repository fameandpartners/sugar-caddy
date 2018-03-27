import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleMode } from 'actions/hierarchy';
import ModeButton from './ModeButton';

const propTypes = {
  mode: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const ModeButtonContainer = ({ mode, onClick }) => (
  <ModeButton mode={mode} onClick={onClick} />
);

ModeButtonContainer.propTypes = propTypes;

export default connect(state => ({ mode: state.hierarchy.get('mode') }), {
  onClick: toggleMode,
})(ModeButtonContainer);
