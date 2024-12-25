import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../components/provider/AuthProvider";
import Swal from "sweetalert2";

const MyMarathon = () => {
  const { user } = useContext(AuthContext); // Logged-in user context
  const [marathons, setMarathons] = useState([]); // User's marathons
  const [selectedMarathon, setSelectedMarathon] = useState(null); // For update modal
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // Modal state

  // Fetch user's marathons
  useEffect(() => {
    fetch(`https://merathon-server.vercel.app/events?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setMarathons(data))
      .catch((err) => console.error("Error fetching marathons:", err));
  }, [user.email]);

  // Open the update modal
  const handleUpdate = (marathon) => {
    setSelectedMarathon(marathon);
    setIsUpdateModalOpen(true);
  };

  // Handle update submission
  const handleUpdateSubmit = (updatedData) => {
    fetch(`https://merathon-server.vercel.app/events/${selectedMarathon._id}`, {
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
            text: "Your marathon details have been updated.",
          });
          // Update the UI
          setMarathons((prev) =>
            prev.map((mar) =>
              mar._id === selectedMarathon._id
                ? { ...mar, ...updatedData }
                : mar
            )
          );
          setIsUpdateModalOpen(false); // Close modal
        }
      })
      .catch((err) => console.error("Error updating marathon:", err));
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
        fetch(`https://merathon-server.vercel.app/events/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "Your marathon has been removed.",
              });
              // Remove from UI
              setMarathons((prev) => prev.filter((mar) => mar._id !== id));
            }
          })
          .catch((err) => console.error("Error deleting marathon:", err));
      }
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">My Marathon List</h1>

      {/* Marathons Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-orange-300">
              <th className="border border-gray-300 px-4 py-2">Marathon Title</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Location</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {marathons.map((marathon) => (
              <tr key={marathon._id}>
                <td className="border border-gray-300 px-4 py-2">
                  {marathon.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(marathon.date).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {marathon.location}
                </td>
                <td className="border border-gray-300 px-4 py-2 space-x-2">
                  <button
                    className="btn btn-sm bg-customOrange hover:bg-orange-800 border-none"
                    onClick={() => handleUpdate(marathon)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-sm  bg-customOrange hover:bg-orange-800 border-none"
                    onClick={() => handleDelete(marathon._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Update Marathon</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const updatedData = {
                  title: e.target.title.value,
                  date: e.target.date.value,
                  location: e.target.location.value,
                };
                handleUpdateSubmit(updatedData);
              }}
            >
              {/* Marathon Title */}
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Marathon Title
                </label>
                <input
                  id="title"
                  type="text"
                  defaultValue={selectedMarathon.title}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Marathon Date */}
              <div className="mb-4">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Marathon Date
                </label>
                <input
                  id="date"
                  type="date"
                  defaultValue={new Date(selectedMarathon.date).toLocaleDateString('en-CA')}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Marathon Location */}
              <div className="mb-4">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Marathon Location
                </label>
                <input
                  id="location"
                  type="text"
                  defaultValue={selectedMarathon.location}
                  className="input input-bordered w-full"
                />
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

export default MyMarathon;
