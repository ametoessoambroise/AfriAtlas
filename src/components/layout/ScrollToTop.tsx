import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scroll to top on every route change.
 * Place this component inside the Router (e.g. in AppContent).
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
