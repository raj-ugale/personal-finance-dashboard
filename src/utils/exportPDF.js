import jsPDF from "jspdf";
import "jspdf-autotable";

export const exportTransactionsToPDF = (transactions) => {
  if (!transactions || transactions.length === 0) {
    alert("No transactions to export!");
    return;
  }

  const doc = new jsPDF();
  doc.setFont("helvetica", "bold");
  doc.text("Personal Finance Dashboard - Transactions", 14, 15);
  
  // Add month and year below heading\
  const date = new Date();
  const monthYear = date.toLocaleString("default", { month: "long", year: "numeric"});
  doc.setFont("helvetica", "normal");
  doc.text(monthYear, 14, 22);

  const tableColumn = ["Date", "Details", "Category", "Amount", "Type"];
  const tableRows = [];

  transactions.forEach((t) => {
    const amountValue = parseFloat(t.amount) || 0;

    // Add + for income, - for expense
    const sign = t.type?.toLowerCase() === "income" ? "+" : "-"
    const formattedAmount = t.isEdited ?`${sign}${amountValue.toFixed(2)} (edit)` : `${sign}${amountValue.toFixed(2)}`;
    const row = [
      t.date || "-",
      t.text || "-",
      t.category || "-",
      formattedAmount,
      t.type || "-",
    ];
    tableRows.push(row);
  });

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 30,
    styles: { fontSize: 11, cellPadding: 2 },
    headStyles: { fillColor: [22, 160, 133], textColor: 255 },
    alternateRowStyles: { fillColor: [245, 245, 245] },
  });

  doc.save("transactions.pdf");
};
