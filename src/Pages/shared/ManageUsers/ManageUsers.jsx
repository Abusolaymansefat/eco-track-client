import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const axiosSecure = useAxios();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = async (email) => {
    try {
      const res = await axiosSecure.patch(`/users/admin/${email}`);
      if (res.data.modifiedCount > 0) {
        toast.success("User promoted to admin!");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to promote user to admin", error);
    }
  };

  const handleRemoveAdmin = async (email) => {
    try {
      const res = await axiosSecure.patch(`/users/remove-admin/${email}`);
      if (res.data.modifiedCount > 0) {
        toast.success("Admin role removed. User is now a normal user.");
        refetch();
      } else if (res.data.message === "User is not an admin") {
        toast.info("User is not an admin");
      } else {
        toast.error("Failed to remove admin role");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">👥 Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  No users found.
                </td>
              </tr>
            )}
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name || "No Name"}</td>
                <td>{u.email}</td>
                <td>{u.role || "user"}</td>
                <td className="space-x-2">
                  {u.role !== "admin" && (
                    <button
                      onClick={() => handleMakeAdmin(u.email)}
                      className="btn btn-xs btn-success"
                    >
                      Make Admin
                    </button>
                  )}
                  {u.role === "admin" && (
                    <button
                      onClick={() => handleRemoveAdmin(u.email)}
                      className="btn btn-xs btn-warning"
                    >
                      Remove Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
