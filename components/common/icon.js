// ∆
import React from 'react';

export const ImageIcon = ({ image, onClick, className, name, style = {} }) => (
  <img
    src={image}
    onClick={onClick}
    alt={name || '(Image Icon)'}
    className={`icon icon-image ${className || ''}`}
    style={{ height: '1em', ...style }}
  />
);

export const FontAwesomeIcon = ({ fa, onClick, name, className, style }) => (
  <i
    style={style}
    onClick={onClick}
    title={name || '(Symbol icon)'}
    className={`icon icon-fa fa fa-${fa} ${className || ''}`}
  />
);

export const Icon = ({ fa, image, ...rest }) => (
  fa
    ? <FontAwesomeIcon fa={fa} {...rest}/>
    : <ImageIcon image={image} {...rest}/>
);
