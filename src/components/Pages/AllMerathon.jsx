import { useLoaderData, Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useDynamicTitle from '../useDynamicTitle';
import Loading from "./Loading";

const AllMerathon = () => {
  const initialCampaigns = useLoaderData();
  const { user, logOut } = useContext(AuthContext);
  const [loadedCampaigns, setLoadedCampaigns] = useState(initialCampaigns || []);
  const [loading, setLoading] = useState(true);  // Show loading initially
  const [isAscending, setIsAscending] = useState(true); // Track sort direction
  const navigate = useNavigate();

  // Hook to set the page title
  useDynamicTitle();

  // Redirect user to login page if not logged in
  const handleRedirect = (campaignId) => {
    console.log(campaignId)
    navigate(`/auth/login`, { state: { from: `/merathon/${campaignId}` } });
  };

  // Function to handle sorting by created date
  const handleSort = async () => {
    const newSortOrder = isAscending ? "desc" : "asc";  // Toggle sort order
    setIsAscending(!isAscending); // Toggle sort direction

    try {
      // Fetch sorted campaigns from the backend based on the selected order
      const response = await fetch(`https://merathon-server.vercel.app/events?sortOrder=${newSortOrder}`);
      if (!response.ok) {
        throw new Error('Failed to fetch sorted campaigns');
      }
      const sortedCampaigns = await response.json();
      console.log("Sorted campaigns from API:", sortedCampaigns); // Check the fetched data
      setLoadedCampaigns(sortedCampaigns); // Update the state with the sorted campaigns
      setLoading(false); // Set loading to false
    } catch (error) {
      console.error("Error fetching sorted campaigns:", error);
    }
  };

  // Fetch campaigns from the backend if initialCampaigns is empty
  useEffect(() => {
    if (!initialCampaigns || initialCampaigns.length === 0) {
      // Fetch campaigns if not loaded via the loader
      const fetchCampaigns = async () => {
        try {
          const response = await fetch('https://merathon-server.vercel.app/events');
          const data = await response.json();
          setLoadedCampaigns(data);
          setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
          console.error("Error fetching campaigns:", error);
        }
      };
      fetchCampaigns();
    } else {
      setLoadedCampaigns(initialCampaigns); // Set initial campaigns
      setLoading(false); // Set loading to false after initial load
    }
  }, [initialCampaigns]);

  // Effect to log whenever loadedCampaigns state changes
  useEffect(() => {
    console.log("Loaded campaigns updated:", loadedCampaigns);
  }, [loadedCampaigns]);

  return (
    <div className="p-6">
      <h1 className="text-3xl text-white font-bold text-center">All Campaigns</h1>
      <p className="text-center text-white mt-2">Total campaigns: {loadedCampaigns.length}</p>

      {/* Sort Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSort}
          className="btn bg-customOrange text-white hover:bg-orange-800 px-4 py-2 rounded"
        >
          Sort by Created Date ({isAscending ? " Newest" : "Oldest "})
        </button>
      </div>

      {/* Cards Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {loading ? (
          <Loading /> // Show a loading component if data is still being fetched
        ) : (
          loadedCampaigns.map((campaign) => (
            <div
              key={campaign._id}
              className="card text-white shadow-md rounded-lg overflow-hidden border border-gray-300 hover:shadow-lg"
            >
              {/* Marathon Image */}
              <img
                src={campaign.image || " "} // Fallback image
                alt={campaign.title}
                className="w-full h-48 object-cover"
              />

              {/* Marathon Information */}
              <div className="p-4">
                <h2 className="text-xl font-bold ">{campaign.title}</h2>
                <p className="text-white mt-2">
                  <strong>Location:</strong> {campaign.location || "N/A"}
                </p>
                <p className=" mt-2">
                  <strong>Registration Start:</strong>{" "}
                  {campaign.startRegistrationDate
                    ? new Date(campaign.startRegistrationDate).toLocaleDateString()
                    : "N/A"}
                </p>
                <p className=" mt-2">
                  <strong>Registration End:</strong>{" "}
                  {campaign.endRegistrationDate
                    ? new Date(campaign.endRegistrationDate).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>

              {/* Actions */}
              <div className="p-4 border-t">
                {user && user?.email ? (
                  <Link to={`/merathon/${campaign._id}`}>
                    <button className="btn bg-customOrange hover:bg-orange-800 text-white border-none w-full rounded px-4 py-2">
                      See Details
                    </button>
                  </Link>
                ) : (
                  <button
                    className="btn bg-customOrange hover:bg-orange-800 text-white border-none w-full rounded px-4 py-2"
                    onClick={() => handleRedirect(campaign._id)}
                  >
                    See Details
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllMerathon;





