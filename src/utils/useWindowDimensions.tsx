import { useState, useEffect } from 'react';

const useWindowDimensions = () => {
    const hasWindow = typeof window !== 'undefined';

    const getWindowDimensions = () => {
        const width = window.innerWidth;
        const isXs = width < 600 ?? false;
        const isSm = (width < 960 && width >= 600) ?? false;

        return {
            width,
            isXs,
            isSm,
        };
    };

    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    useEffect(() => {
        const handleResize = () => {
            setWindowDimensions(getWindowDimensions());
        };

        if (hasWindow) {
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [hasWindow]);

    return windowDimensions;
};

export default useWindowDimensions;
