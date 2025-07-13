// import { useQuery } from "@tanstack/react-query";
// import useAuth from "./UseAuth";
// import useAxios from "./useAxios";

import { useQuery } from "@tanstack/react-query";
import useAuth from "./UseAuth";
import useAxios from "./useAxios";

const usePayment = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    enabled: !!user?.email, // ইউজার লোড না হলে ফেচ করবে না
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/payment/payment-history/${user.email}`);
      return res.data;
    },
  });

  return { payments, isLoading };
};

export default usePayment;
