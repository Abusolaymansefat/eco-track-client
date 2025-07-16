import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useAuth from "./useAuth";

const useAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const { data: role, isLoading } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      try {
        const res = await axiosSecure.get(`/users/role/${user.email}`);
        return res.data.role; 
      } catch (error) {
        console.error("Error fetching role:", error);
        
        return "user";
      }
    },
    enabled: !!user?.email,
  });

  return [role, isLoading];
};

export default useAdmin;
