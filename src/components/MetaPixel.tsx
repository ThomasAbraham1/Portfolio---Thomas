import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PIXEL_ID = '837921148862485';

export const MetaPixel = () => {
    const location = useLocation();

    useEffect(() => {
        // Initialize Facebook Pixel
        if (typeof window !== 'undefined') {
            import('react-facebook-pixel')
                .then((x) => x.default)
                .then((ReactPixel) => {
                    ReactPixel.init(PIXEL_ID);
                    ReactPixel.pageView();
                });
        }
    }, []);

    useEffect(() => {
        // Track page views on route change
        import('react-facebook-pixel')
            .then((x) => x.default)
            .then((ReactPixel) => {
                ReactPixel.pageView();
            });
    }, [location.pathname]);

    return null;
};

// Helper to track custom events (like Lead)
export const trackEvent = (event: string, data?: any) => {
    import('react-facebook-pixel')
        .then((x) => x.default)
        .then((ReactPixel) => {
            ReactPixel.track(event, data);
        });
};
