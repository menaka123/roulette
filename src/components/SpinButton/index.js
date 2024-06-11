import React from 'react';
import './SpinButton.scss';

const SpinButton = ({ onClick, text, ...rest }) => (
  <button {...rest} className="image-button" onClick={onClick}>{text}</button>
);

export default SpinButton;