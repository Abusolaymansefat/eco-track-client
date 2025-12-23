import usePayment from "../../hooks/usePayment";
import { FaMoneyCheckAlt } from "react-icons/fa";

const PaymentHistory = () => {
  const { payments, isLoading } = usePayment();

  if (isLoading)
    return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FaMoneyCheckAlt className="text-indigo-600" />
        Payment History
      </h2>

      {payments.length === 0 ? (
        <p>No payment records found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-xl">
          <table className="table table-zebra">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th>Date</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Transaction</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p._id}>
                  <td>{new Date(p.date).toLocaleDateString()}</td>
                  <td>{p.userEmail}</td>
                  <td className="font-semibold">
                    ${(p.amount / 100).toFixed(2)}
                  </td>
                  <td className="text-xs text-gray-500">
                    {p.transactionId}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
