
import { useState } from "react";
import useAuth from "../../hooks/UseAuth";
import useAxios from "../../hooks/useAxios";

const Payment = () => {
  const { user } = useAuth();
  const [coupon, setCoupon] = useState("");

  const handlePay = async () => {
    const res = await useAxios.post("/payment/create-checkout-session", {
      userEmail: user.email,
      coupon: coupon,
    });
    window.location.href = res.data.url;
  };

  return (
    <div className="space-y-2">
      <input
        type="text"
        placeholder="Coupon code (optional)"
        onChange={(e) => setCoupon(e.target.value)}
        className="input input-bordered"
      />
      <button onClick={handlePay} className="btn btn-primary">
        Subscribe
      </button>
    </div>
  );
};

export default Payment;
