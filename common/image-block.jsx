import React from 'react';

export const ImageBlock = ({ src = '', style = {}, caption = '', ...rest }) => {
    const figureStyle = {
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        ...style
    };

    const imageStyle = { visibility: 'hidden', height: 0, width: 0  };

    return (
        <figure style={figureStyle} {...rest}>
            <img src={src} alt={caption} style={imageStyle} />
            {caption && caption.length && (
                <figcaption children={caption} />
            )}
        </figure>
    )
}
