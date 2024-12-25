import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useDynamicTitle = () => {
  const location = useLocation(); // Get the current location (route)

  useEffect(() => {
    // Define your dynamic titles for different routes
    const routeTitles = {
      "/": "Home - Marathon Management Website",
      "/allmerathon": "All Marathons",
      "/dashboard": "Dashboard",
      
    };

    // Set the document title based on the current route
    document.title = routeTitles[location.pathname] || "Marathon Management System"; // Default title if no match
  }, [location]); // Run the effect every time the location changes
};

export default useDynamicTitle;
