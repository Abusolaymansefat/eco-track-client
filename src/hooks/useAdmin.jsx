import { useQuery } from "@tanstack/react-query";
import useAuth from "./UseAuth";
import useAxios from "./useAxios";

const useAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const { data: role, isLoading } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data.role; // এখানে নিশ্চিত হও role ঠিকভাবে আসছে
    },
    enabled: !!user?.email,
  });

  return [role, isLoading];
};


export default useAdmin;
