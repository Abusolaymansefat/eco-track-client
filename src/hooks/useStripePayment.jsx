import { useState } from "react";

const useStripePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const initiatePayment = async ({ amount, email, coupon }) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3000/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, userEmail: email, coupon }),
      });

      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url;
      } else {
        setError("No checkout URL returned");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to initiate payment");
    } finally {
      setLoading(false);
    }
  };

  return { initiatePayment, loading, error };
};

export default useStripePayment;
