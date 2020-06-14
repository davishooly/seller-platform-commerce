import { useEffect } from 'react';
import { useLocation } from 'react-use';

/**
 * support for scroll restoration
 *  https://reacttraining.com/react-router/web/guides/scroll-restoration
 *  this helps us to achieve scroll to top on every page navigation
 */

export const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};
