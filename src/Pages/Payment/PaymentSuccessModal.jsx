// PaymentSuccessModal.jsx
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { FaCheckCircle, FaDownload } from "react-icons/fa";

const PaymentSuccessModal = ({ open, onClose, payment }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <Confetti numberOfPieces={400} recycle={false} />

      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center"
      >
        <FaCheckCircle className="text-green-500 text-7xl mx-auto mb-4" />

        <h2 className="text-3xl font-extrabold mb-2">
          Payment Successful 🎉
        </h2>

        <p className="text-gray-600 mb-5">
          Welcome to Premium Membership
        </p>

        <div className="bg-gray-50 rounded-xl p-4 text-sm text-left mb-5 font-semibold">
          <p>Transaction: {payment.transactionId}</p>
          <p>Amount: ${(payment.amount / 100).toFixed(2)}</p>
          <p>Date: {new Date(payment.date).toLocaleDateString()}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={payment.downloadInvoice}
            className="btn btn-outline flex-1 flex items-center justify-center gap-2 font-bold"
          >
            <FaDownload /> Invoice
          </button>

          <button
            onClick={onClose}
            className="btn btn-primary flex-1 font-bold"
          >
            Dashboard
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccessModal;
