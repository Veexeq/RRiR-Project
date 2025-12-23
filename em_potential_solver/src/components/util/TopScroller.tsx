import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function TopScroller() {
  const { pathname } = useLocation();

  useEffect(() => {
    const container = document.querySelector(".mainContent");

    if (container) {
      container.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

export default TopScroller;
