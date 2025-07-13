import usePayment from "../../hooks/usePayment";

const PaymentHistory = () => {
  const { payments, isLoading } = usePayment();

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">💳 Payment History</h2>
      {payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Date</th>
              <th>Email</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p._id}>
                <td>{new Date(p.date).toLocaleDateString()}</td>
                <td>{p.userEmail}</td>
                <td>${(p.amount / 100).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentHistory;
