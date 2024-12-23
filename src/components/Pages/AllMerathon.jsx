import { useLoaderData, Link } from "react-router-dom";
import { useState } from "react";

const AllMerathon = () => {
  const campaigns = useLoaderData();
  const [loadedCampaigns, setLoadedCampaigns] = useState(campaigns);
  const [isAscending, setIsAscending] = useState(true); // Track sort direction

  // Function to sort campaigns by minimum donation
  const handleSort = () => {
    const sortedCampaigns = [...loadedCampaigns].sort((a, b) => {
      if (isAscending) {
        return a.minimumDonation - b.minimumDonation; // Ascending
      } else {
        return b.minimumDonation - a.minimumDonation; // Descending
      }
    });
    setLoadedCampaigns(sortedCampaigns);
    setIsAscending(!isAscending); // Toggle sort direction
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center">All Campaigns</h1>
      <p className="text-center text-gray-600 mt-2">Total campaigns: {campaigns.length}</p>

      {/* Sort Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSort}
          className="btn bg-green-500 text-white hover:bg-green-400 px-4 py-2 rounded"
        >
          Sort by Minimum Donation ({isAscending ? "Ascending" : "Descending"})
        </button>
      </div>

      {/* Cards Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {loadedCampaigns.map((campaign) => (
          <div
            key={campaign._id}
            className="card bg-white shadow-md rounded-lg overflow-hidden border border-gray-300 hover:shadow-lg"
          >
            {/* Marathon Image */}
            <img
              src={campaign.image || "https://via.placeholder.com/400"} // Fallback image
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
              <Link to={`/merathon/${campaign._id}`}>
                <button className="btn bg-green-500 hover:bg-green-400 text-white w-full rounded px-4 py-2">
                  See More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMerathon;
