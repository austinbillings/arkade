// ∆
import React, { useState, useEffect } from 'react';

import './cover-video.scss';

export const CoverVideo = ({ children, yOffset, aspectRatio, sources = [], style = {} }) => {
    const isBrowser = !!process.browser;
    const [dimensions, setDimensions] = useState({
        width: isBrowser ? window.innerWidth : '100vw',
        height: isBrowser ? window.innerHeight : null
    });

    const viewportAspectRatio = dimensions.width / dimensions.height;
    const orientation = viewportAspectRatio > aspectRatio ? 'wide' : 'tall';
    const differential = (viewportAspectRatio / aspectRatio);

    const height = orientation === 'tall' ? '100vh' : (differential * 100) + 'vh';
    const marginTop = orientation === 'tall' ? 0 : ((1 - differential) * 50) + 'vh';

    function handleResizeEvent (evt) {
        setDimensions({
            width: evt.target.innerWidth,
            height: evt.target.innerHeight
        });
    }

    useEffect(() => {
        if (!isBrowser)
            return;

        handleResizeEvent({ target: window });

        window.addEventListener('resize', handleResizeEvent);

        return () => window.removeEventListener('resize', handleResizeEvent);
    }, [process.browser, process.browser ? window.innerWidth : null, process.browser ? window.innerHeight : null]);

    return (
        <div className="cover-video-wrapper" style={style}>
            <div className="cover-video">
                <video
                    loop={true}
                    muted={true}
                    autoPlay={true}
                    controls={false}
                    style={{ height, marginTop }}>
                    {sources.map((videoSource, index) => (
                        <source type={videoSource.type} src={videoSource.src} key={index}/>
                    ))}
                </video>
            </div>
            {children && (
                <div className="cover-video-content">
                    {children}
                </div>
            )}
        </div>
    );
};
