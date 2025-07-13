import { useQuery } from "@tanstack/react-query";
import useAuth from "./UseAuth";
import useAxios from "./useAxios";

const useAdmin = () => {
  const { user } = useAuth();
  const { data: isAdmin, isLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    queryFn: async () => {
      if (!user?.email) return false;
      const res = await useAxios.get(
        `http://localhost:3000/users/admin/${user.email}`
      );
      return res.data.isAdmin;
    },
    enabled: !!user?.email,
  });

  return [isAdmin, isLoading];
};

export default useAdmin;
