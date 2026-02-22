import { TableRow } from "../components/Table/TableTypes";
import dayjs, { Dayjs } from "dayjs";



// https://cellsms.cellcom.co.il/SmsGate2.asmx/SendSmsEx?username=user&password=pass&target=0521234567&source=1234&message=Test&pushUrl=&validity=1&replace=false&immediate=false&isBinary=false&deliveryReceipt=true&maxSegments=0
// response is number of amount that got the message (eg. : "2")\
// %20 = space // %0D%0A = \n
interface HebrewDateTime {
  weekday_he: string;
  month_he: string;
  time_il: Date;
}

async function sendSmsMessages(tableData: TableRow[]) {

  const senderName = 'MarpeArava'
  const username = 'marpearava'
  const password = 'Marpearava123!'
  const apiToken = 'f4be1fb0-97d4-4bff-bffd-3a0fcc12b441'
  const base64ApiToken = 'Basic bWFycGVhcmF2YTpmNGJlMWZiMC05N2Q0LTRiZmYtYmZmZC0zYTBmY2MxMmI0NDE='
  const message = encodeURIComponent(
    "שלום [#FirstName#],\n" +
    "השאטל שלך מ[#Station#] נקבע בהצלחה ביום [#Weekday_he#], בתאריך [#Day#] ב[#Month_he#] [#Year#] בשעה [#Hour_minute#].\n" +
    "אם יש שינוי או שאלה — אפשר לפנות אלינו בכל עת בטלפון 0523817083.\n" +
    "נסיעה טובה! 🚐"
  )
  const settings = {
    "Sender": senderName,
    "CampaignName": "Marpe Arava",
    "Priority": 0,
    "MaxSegments": 0,
    "IgnoreUnsubscribeCheck": false,
  }



  if (tableData.some(row => !row.phone)) {
    return { status: "error", message: "Some Recipients Are Missing Phone", code: 400 }
  }
  if (tableData.some(row => !row.pickupTime)) {
    return { status: "error", message: "Some Recipients Are Missing pickupTime", code: 400 }
  }

  const convertTimeToHebrew = (timeUtcIso: Dayjs): HebrewDateTime => {

    const hebrewDays: Record<string, string> = {
      'Sunday': 'ראשון', 'Monday': 'שני', 'Tuesday': 'שלישי',
      'Wednesday': 'רביעי', 'Thursday': 'חמישי',
      'Friday': 'שישי', 'Saturday': 'שבת'
    }

    const hebrewMonths: Record<string, string> = {
      'January': 'ינואר', 'February': 'פברואר', 'March': 'מרץ',
      'April': 'אפריל', 'May': 'מאי', 'June': 'יוני',
      'July': 'יולי', 'August': 'אוגוסט', 'September': 'ספטמבר',
      'October': 'אוקטובר', 'November': 'נובמבר', 'December': 'דצמבר'
    }

    // Parse ISO and add 3 hours using the .add() method
    const timeUtc = dayjs(timeUtcIso)
    const timeIl = timeUtc.add(3, 'hour')

    // Use Intl to get the English names for mapping
    const weekdayEn = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(timeIl.toDate())
    const monthEn = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(timeIl.toDate())

    return {
      weekday_he: hebrewDays[weekdayEn],
      month_he: hebrewMonths[monthEn],
      time_il: timeIl.toDate()
    }
  }

  const mappedRecipients = tableData
    .filter((r) => r.status === "שובץ")
    .map((row) => {
      const rowTimeHeb = convertTimeToHebrew(row.pickupTime!) // theres a null check in the beginning of the funciton
      const date = rowTimeHeb.time_il
      const hourMinute = dayjs(date).format('HH:mm')
      return {
        Phone: row.phone,
        FirstName: row.fullName,
        Station: row.station,
        Weekday_he: rowTimeHeb.weekday_he,
        Day: date.getDate(),
        Month_he: rowTimeHeb.month_he,
        Year: date.getFullYear(),
        Hour_minute: hourMinute,
      }
    })

  const cellcomRes = await fetch('https://capi.inforu.co.il/api/v2/SMS/SendSms', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": base64ApiToken
    },
    body: JSON.stringify(
      {
        Message: message,
        Recipients: [
          mappedRecipients
        ],
        Settings: settings
      }
    ),
  })

  console.log("🌐 Sent messages to recipients! response:", cellcomRes)
}

export default sendSmsMessages;