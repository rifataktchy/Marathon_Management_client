import { useLoaderData, Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useDynamicTitle from '../useDynamicTitle';
import Loading from "./Loading";
const AllMerathon = () => {
  const campaigns = useLoaderData();
  const { user, logOut } = useContext(AuthContext);
  const [loadedCampaigns, setLoadedCampaigns] = useState(campaigns);
  const [loading, setLoading] = useState(true);
  const [isAscending, setIsAscending] = useState(true); // Track sort direction
  useDynamicTitle();
  const navigate = useNavigate();

  const handleRedirect = (campaignId) => {
    console.log(campaignId)
    // Correct string interpolation for navigate
    navigate(`/auth/login`, { state: { from: `/merathon/${campaignId}` } });
  };

  // Function to handle sorting
  const handleSort = async () => {
    const newSortOrder = isAscending ? "desc" : "asc";  // Toggle sort order
    setIsAscending(!isAscending); // Toggle sort direction

    try {
      // Fetch the sorted campaigns from the backend based on the selected order
      const response = await fetch(`https://merathon-server.vercel.app/events?sortOrder=${newSortOrder}`);
      console.log("Sorted campaigns:",response);
      const sortedCampaigns = await response.json();
      console.log("Sorted campaigns:", sortedCampaigns); 
      // Update the state with the sorted campaigns
      setLoadedCampaigns(sortedCampaigns);
      setLoading(false);
      console.log("Sorted campaigns:",loadedCampaigns);
    } catch (error) {
      console.error("Error fetching sorted campaigns:", error);
    }
  };
  if(loading){
    return <Loading></Loading>
}

  // Effect to set the initial campaigns
  useEffect(() => {
    setLoadedCampaigns(campaigns); // Set initial campaigns
  }, [campaigns]);

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
          Sort by Created Date ({isAscending ? "Newest" : "Oldest"})
        </button>
      </div>

      {/* Cards Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {loadedCampaigns.map((campaign) => (
          <div
            key={campaign._id}
            className="card shadow-md rounded-lg overflow-hidden border border-gray-300 hover:shadow-lg"
          >
            {/* Marathon Image */}
            <img
              src={campaign.image || " "} // Fallback image
              alt={campaign.title}
              className="w-full h-48 object-cover"
            />

            {/* Marathon Information */}
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800">{campaign.title}</h2>
              <p className="text-gray-600 mt-2">
                <strong>Location:</strong> {campaign.location || "N/A"}
              </p>
              <p className="text-gray-600 mt-2">
                <strong>Registration Start:</strong>{" "}
                {campaign.startRegistrationDate
                  ? new Date(campaign.startRegistrationDate).toLocaleDateString()
                  : "N/A"}
              </p>
              <p className="text-gray-600 mt-2">
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
        ))}
      </div>
    </div>
  );
};

export default AllMerathon;

