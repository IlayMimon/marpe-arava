import { TableRow } from "../components/Table/TableTypes";

const sendWhatsMessages = async (tableData: TableRow[]) => {
  const messagesInfo = tableData
    .filter((r) => r.status === "שובץ")
    .map((row) => ({
      phone: `972${row.phone.slice(1)}`, // Remove the leading '0' and add country code
      time: row.pickupTime,
      name: row.fullName,
      station: row.station,
      driver: row.driver,
    }));

  const res = await fetch("http://127.0.0.1:5000/send-message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(messagesInfo),
  });

  if (res.ok) {
    alert("✅ Message sent!");
  } else {
    alert("❌ Failed to send message");
  }
};

export default sendWhatsMessages;
