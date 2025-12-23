// generateInvoice.js
import jsPDF from "jspdf";

const generateInvoice = ({ user, amount, transactionId, date }) => {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text("INVOICE", 20, 20);

  doc.setFontSize(12);
  doc.text("Premium Membership Payment", 20, 30);

  doc.line(20, 34, 190, 34);

  doc.text(`Name: ${user.displayName}`, 20, 45);
  doc.text(`Email: ${user.email}`, 20, 55);
  doc.text(`Transaction ID: ${transactionId}`, 20, 65);
  doc.text(`Date: ${new Date(date).toLocaleDateString()}`, 20, 75);

  doc.setFontSize(14);
  doc.text(
    `Total Paid: $${(amount / 100).toFixed(2)}`,
    20,
    95
  );

  doc.setFontSize(11);
  doc.text(
    "Thank you for choosing our platform ❤️",
    20,
    120
  );

  doc.save("membership-invoice.pdf");
};

export default generateInvoice;
