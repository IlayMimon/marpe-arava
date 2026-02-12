import { TableRow } from "../components/Table/TableTypes";


// https://cellsms.cellcom.co.il/SmsGate2.asmx/SendSmsEx?username=user&password=pass&target=0521234567&source=1234&message=Test&pushUrl=&validity=1&replace=false&immediate=false&isBinary=false&deliveryReceipt=true&maxSegments=0


const sendSmsMessages = async (tableData: TableRow[]) => {
  const messagesInfo = tableData
    .filter((r) => r.status === "שובץ")
    .map((row) => ({
      username: 'marpearava',
      password: 'Marpearava123!',
      target: `972${row.phone.slice(1)}`, // Remove the leading '0' and add country code
      time: row.pickupTime,
      name: row.fullName,
      station: row.station,
      driver: row.driver,
    }));

  const res = await fetch("https://cellsms.cellcom.co.il/SmsGate2.asmx/SendSmsEx", {
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


/*
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
*/
