import React, { useState } from 'react';

const EventColorPicker = ({ selectedColor, onSelectColor }) => {
  const colors = ['#d44b4bea', '#ff7f00', '#e3e300', '#00ff00', '#0000ff', '#4b0082', '#9400d3', '#ff1493', '#dbdbdb', '#303030'];

  return (
    <div className="color-picker">
        Event colour:
      {colors.map((color, index) => (
        <button
          key={index}
          className="color-button"
          style={{ backgroundColor: color, border: selectedColor === color ? '3px solid black' : 'none' }}
          onClick={() => onSelectColor(color)}
        ></button>
      ))}
    </div>
  );
};

export default EventColorPicker;