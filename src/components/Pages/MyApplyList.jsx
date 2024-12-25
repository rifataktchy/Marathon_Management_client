import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../components/provider/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";

const MyApplyList = () => {
  const { user } = useContext(AuthContext); // Logged-in user context
  const [registrations, setRegistrations] = useState([]); // User's registrations
  const [filteredRegistrations, setFilteredRegistrations] = useState([]); // Filtered registrations for search
  const [searchQuery, setSearchQuery] = useState(""); // Search input value
  const [selectedRegistration, setSelectedRegistration] = useState(null); // For update modal
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // Modal state

  // Fetch user's registrations
  useEffect(() => {
    axios
      .get(`https://merathon-server.vercel.app/register?email=${user.email}`, {
        withCredentials: true,
      })
      .then((res) => {
        setRegistrations(res.data);
        setFilteredRegistrations(res.data); // Initialize filtered with full data
      })
      .catch((err) => console.error("Error fetching registrations:", err));
  }, [user.email]);

  // Search functionality (case-insensitive)
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    setFilteredRegistrations(
      registrations.filter((registration) =>
        registration.title.toLowerCase().includes(lowercasedQuery)
      )
    );
  }, [searchQuery, registrations]);

  // Open the update modal
  const handleUpdate = (registration) => {
    setSelectedRegistration(registration);
    setIsUpdateModalOpen(true);
  };

  // Handle update submission
  const handleUpdateSubmit = (updatedData) => {
    fetch(`https://merathon-server.vercel.app/register/${selectedRegistration._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Updated Successfully",
            text: "Your registration details have been updated.",
          });
          // Update the UI
          setRegistrations((prev) =>
            prev.map((reg) =>
              reg._id === selectedRegistration._id
                ? { ...reg, ...updatedData }
                : reg
            )
          );
          setIsUpdateModalOpen(false); // Close modal
        }
      })
      .catch((err) => console.error("Error updating registration:", err));
  };

  // Handle delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://merathon-server.vercel.app/register/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "Your registration has been removed.",
              });
              // Remove from UI
              setRegistrations((prev) => prev.filter((reg) => reg._id !== id));
            }
          })
          .catch((err) => console.error("Error deleting registration:", err));
      }
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">My Apply List</h1>

      {/* Search Bar */}
      <div className="mb-6 text-black">
        <input
          type="text"
          placeholder="Search by Marathon Title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>

      {/* Registrations Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-black">
              <th className="border border-gray-300 px-4 py-2">Marathon Title</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Contact Number</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRegistrations.length > 0 ? (
              filteredRegistrations.map((registration) => (
                <tr key={registration._id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {registration.title}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(registration.startDate).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {registration.contactNumber}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 space-x-2">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleUpdate(registration)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(registration._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="border border-gray-300 px-4 py-2 text-center"
                >
                  No registrations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-customOrange text-black p-6 rounded-md shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Update Registration</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const updatedData = {
                  contactNumber: e.target.contactNumber.value,
                  additionalInfo: e.target.additionalInfo.value,
                };
                handleUpdateSubmit(updatedData);
              }}
            >
              {/* Marathon Title (Read-Only) */}
              <div className="mb-4 text-black">
                <label
                  htmlFor="marathonTitle"
                  className="block text-sm font-medium text-gray-700"
                >
                  Marathon Title
                </label>
                <input
                  id="marathonTitle"
                  type="text"
                  value={selectedRegistration.title}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>

              {/* Marathon Start Date (Read-Only) */}
              <div className="mb-4">
                <label
                  htmlFor="marathonStartDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Marathon Start Date
                </label>
                <input
                  id="marathonStartDate"
                  type="text"
                  value={new Date(
                    selectedRegistration.startDate
                  ).toLocaleDateString()}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>

              {/* Contact Number */}
              <div className="mb-4">
                <label
                  htmlFor="contactNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contact Number
                </label>
                <input
                  id="contactNumber"
                  type="text"
                  defaultValue={selectedRegistration.contactNumber}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Additional Info */}
              <div className="mb-4">
                <label
                  htmlFor="additionalInfo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Additional Info
                </label>
                <textarea
                  id="additionalInfo"
                  defaultValue={selectedRegistration.additionalInfo}
                  className="textarea textarea-bordered w-full"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsUpdateModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplyList;
