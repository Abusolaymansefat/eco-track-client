// PaymentForm.jsx
import {
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaLock,
  FaShieldAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";

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

  const baseAmount = 3000;
  const discountAmount = 500;
  const finalAmount = couponValid ? baseAmount - discountAmount : baseAmount;

  const handleApplyCoupon = () => {
    if (coupon.toLowerCase() === "discount5") {
      setCouponValid(true);
      toast.success("🎉 Coupon Applied! $5 Discount");
    } else {
      setCouponValid(false);
      toast.error("❌ Invalid Coupon");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError("");

    try {
      const { data } = await axiosSecure.post("/create-payment-intent", {
        amount: finalAmount,
        email: user.email,
      });

      const card = elements.getElement(CardElement);

      const { paymentIntent, error } =
        await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: {
            card,
            billing_details: {
              name: user.displayName,
              email: user.email,
            },
          },
        });

      if (error) {
        setError(error.message);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        await axiosSecure.post("/save-payment", {
          userEmail: user.email,
          amount: finalAmount,
          transactionId: paymentIntent.id,
          date: new Date(),
          coupon: couponValid ? coupon : null,
        });

        await axiosSecure.patch(`/subscribe/${user.email}`, {
          isSubscribed: true,
          role: "membership",
          coupon: couponValid ? coupon : null,
        });

        await queryClient.invalidateQueries(["userProfile", user.email]);

        toast.success("✅ Membership Activated!");
        navigate("/dashboardLayout/profile");
      }
    } catch {
      setError("Payment failed. Try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 px-4">
      <motion.form
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-[32px] shadow-[0_25px_80px_rgba(0,0,0,0.25)] p-8"
      >
        <h2 className="text-3xl font-extrabold text-center mb-2">
          Premium Membership
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Secure & encrypted payment
        </p>

        {/* Card Icons */}
        <div className="flex justify-center gap-6 text-5xl mb-6">
          <FaCcVisa className="text-[#1a1f71]" />
          <FaCcMastercard className="text-[#eb001b]" />
          <FaCcAmex className="text-[#2e77bb]" />
        </div>

        {/* Price Box */}
        <div className="bg-indigo-50 rounded-2xl p-4 mb-5 text-center">
          <p className="text-sm text-gray-500">Total Payable</p>
          <p className="text-4xl font-extrabold text-indigo-600">
            ${(finalAmount / 100).toFixed(2)}
          </p>
          {couponValid && (
            <p className="text-green-600 text-sm font-semibold mt-1">
              🎉 Coupon Applied
            </p>
          )}
        </div>

        {/* Coupon */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Coupon code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="input input-bordered flex-1 font-semibold"
          />
          <button
            type="button"
            onClick={handleApplyCoupon}
            className="btn btn-secondary font-bold"
          >
            Apply
          </button>
        </div>

        {/* Card Input */}
        <div className="border-2 border-indigo-200 rounded-2xl p-4 mb-5 bg-gray-50 focus-within:ring-4 focus-within:ring-indigo-300">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "17px",
                  fontWeight: "600",
                  color: "#1f2937",
                },
              },
            }}
          />
        </div>

        {/* Pay Button */}
        <button
          type="submit"
          disabled={processing}
          className="btn btn-primary w-full text-lg font-extrabold flex items-center justify-center gap-2"
        >
          <FaLock />
          {processing ? "Processing..." : "Confirm Payment"}
        </button>

        {/* Security */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-5">
          <FaShieldAlt className="text-green-600" />
          256-bit SSL Secure Payment
        </div>

        {error && (
          <p className="text-red-500 mt-4 text-sm text-center font-semibold">
            {error}
          </p>
        )}
      </motion.form>
    </div>
  );
};

export default PaymentForm;