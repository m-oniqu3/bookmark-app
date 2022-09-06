import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({ children }) {
  const location = useLocation();

  // scroll to top of page on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return children;
}
