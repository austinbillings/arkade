// ∆
import React from 'react';

export const ImageIcon = ({ image, onClick, className, name, style = {}, ...rest }) => (
  <img
    src={image}
    onClick={onClick}
    alt={name || '(Image Icon)'}
    className={`ak-icon ak-icon-image ${className || ''}`}
    style={{ height: '1em', ...style }}
    {...rest}
  />
);

export const FontAwesomeIcon = ({ fa, onClick, name, className, style = {}, ...rest }) => (
  <i
    style={style}
    onClick={onClick}
    title={name || '(Symbol icon)'}
    className={`ak-icon ak-icon-fa fa fa-${fa} ${className || ''}`}
    {...rest}
  />
);

export const Icon = ({ fa, image, ...rest }) => (
  fa
    ? <FontAwesomeIcon fa={fa} {...rest}/>
    : <ImageIcon image={image} {...rest}/>
);
