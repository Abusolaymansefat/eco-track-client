import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAuth from "../../hooks/UseAuth";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [coupon, setCoupon] = useState("");
  const [couponValid, setCouponValid] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const baseAmount = 3000; // $30
  const discountAmount = 500; // $5 off
  const finalAmount = couponValid ? baseAmount - discountAmount : baseAmount;

  const handleApplyCoupon = () => {
    if (coupon.trim().toLowerCase() === "discount5") {
      setCouponValid(true);
      toast.success("🎉 Coupon applied! You get $5 off.");
    } else {
      setCouponValid(false);
      toast.error("❌ Invalid coupon code.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError("");

    try {
      const res = await axiosSecure.post("/create-payment-intent", {
        email: user.email,
        amount: finalAmount,
        coupon: couponValid ? coupon : null,
      });

      const clientSecret = res.data.clientSecret;
      const card = elements.getElement(CardElement);

      const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card,
            billing_details: {
              name: user.displayName,
              email: user.email,
            },
          },
        }
      );

      if (stripeError) {
        setError(stripeError.message);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        // ✅ Save payment to DB
        await axiosSecure.post("/save-payment", {
          userEmail: user.email,
          amount: finalAmount,
          transactionId: paymentIntent.id,
          date: new Date(),
          coupon: couponValid ? coupon : null,
        });

        // ✅ Update role and membership
        await axiosSecure.patch(`/subscribe/${user.email}`, {
          isSubscribed: true,
          role: "membership", // 🔥 Set role
          coupon: couponValid ? coupon : null,
        });

        // ✅ Refetch profile data
        await queryClient.invalidateQueries(["userProfile", user.email]);

        toast.success("✅ Payment successful & membership activated!");
        navigate("/dashboardLayout/profile");
      }
    } catch (err) {
      setError("❌ Payment failed. Please try again.", err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded shadow-lg w-full max-w-md bg-[#76d48a]"
      >
        <h2 className="text-xl font-bold text-center mb-4">
          Complete Payment: ${(finalAmount / 100).toFixed(2)}
        </h2>

        {/* Coupon Input */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Coupon code (optional)"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="input input-bordered flex-grow"
            disabled={processing}
          />
          <button
            type="button"
            onClick={handleApplyCoupon}
            className="btn btn-secondary"
            disabled={processing}
          >
            Apply
          </button>
        </div>

        {couponValid && (
          <p className="text-green-600 mb-4">🎉 Coupon applied! You save $5.</p>
        )}

        <CardElement className="p-2 border rounded-md mb-4" />

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={processing}
        >
          {processing ? "Processing..." : `Pay $${(finalAmount / 100).toFixed(2)}`}
        </button>

        {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
