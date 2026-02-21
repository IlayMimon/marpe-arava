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

function sendSmsMessages(tableData: TableRow[]) {

  const senderName = 'MarpeArava'
  // username: 'marpearava',
  // password: 'Marpearava123!',
  const apiToken = ''

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

  ///////////////////////////////////////////////////////////////////////////////////////

  const mappedRecipients = tableData
    .filter((r) => r.status === "שובץ")
    .map((row) => ({
      let rowTimeHeb = convertTimeToHebrew(row.pickupTime),

      Phone: row.phone,
      FirstName: row.fullName,
      Station: row.station,
      Weekday_he: rowTimeHeb.weekday_he,
      Day: rowTimeHeb.time_il.day,
      Month_he: rowTimeHeb.month_he,
      Year: rowTimeHeb.time_il.year,
      Hour_minute: rowTimeHeb.time_il.strftime('%H:%M'),
    }))


  for (const details of mappedRecipients) {
    const phone = details.phone
    if (!phone) {
      return { status: "error", message: "Missing phone", code: 400 }
    }
    if (!details.time) {
      return { status: "error", message: "Missing time", code: 400 }
    }

    const { weekday_he, month_he, time_il } = convertTimeToHebrew(details.time)


    const recipientsParamList = 


    const cellcomRes = await fetch('https://capi.inforu.co.il/api/v2/SMS/SendSms', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        {
          Message: encodeURIComponent(
            `שלום [#FirstName#],\n` +
            `השאטל שלך מ[#Station#] נקבע בהצלחה ליום [#Weekday_he#], ` +
            `[#Day#] ב[#Month_he#] [#Year#] בשעה [#Hour_minute#].\n` +
            `אם יש שינוי או שאלה — אפשר לפנות אלינו בכל עת.\n` +
            `נסיעה טובה! 🚐`
          ),
          Recipients: [
            {
              "Phone": "0541234567",
              "FirstName": "Jon",
              "Station": "Smith",
              "Weekday_he": "David",
              "Day": "David",
              "Month_he": "David",
              "Year": "David",
              "Hour_minute": "David",
            },
          ]
        }
      ),
    })

    console.log("🌐 Sent messages to recipients! response:", cellcomRes)

    await new Promise(res => setTimeout(res, 2000))
  }

  return { status: "success", message: "All messages sent!" }
}

export default sendSmsMessages;


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








/* PYTHON SERVER SIDE CODE WHOM THIS FUNC USED TO SEND TO
 
from datetime import datetime, timedelta
from flask import Flask, request
from flask_cors import CORS
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from urllib.parse import quote
import time
import random
import os

# -----------------------------
#       CREATE DRIVER (NO CHROMEDRIVER)
# -----------------------------

def create_driver():
    """יוצר WebDriver שעובד בכל מחשב ללא דרייבר כלל"""

    # יצירת תקיית פרופיל (נשאר כמו אצלך)
    profile_path = r"C:/whatsapp-profile"
    if not os.path.exists(profile_path):
        os.makedirs(profile_path)

    options = Options()
    options.add_argument(f"user-data-dir={profile_path}")
    options.add_argument("profile-directory=Default")
    options.add_argument("--disable-notifications")
    options.add_argument("--disable-infobars")
    options.add_argument("--disable-extensions")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-gpu")

    try:
        driver = webdriver.Chrome(options=options)
        driver.minimize_window()
        return driver

    except Exception as e:
        print("❌ Native Chrome mode failed:", e)
        raise RuntimeError("Chrome could not start in DevTools mode. Make sure Chrome is installed.")


# -----------------------------
#       TIME + MESSAGE
# -----------------------------

#################################################################### IM HERE RN ↓
def convert_time_to_hebrew(time_utc_iso):
    hebrew_days = {
        'Sunday': 'ראשון', 'Monday': 'שני', 'Tuesday': 'שלישי',
        'Wednesday': 'רביעי', 'Thursday': 'חמישי',
        'Friday': 'שישי', 'Saturday': 'שבת'
    }

    hebrew_months = {
        'January': 'ינואר', 'February': 'פברואר', 'March': 'מרץ',
        'April': 'אפריל', 'May': 'מאי', 'June': 'יוני',
        'July': 'יולי', 'August': 'אוגוסט', 'September': 'ספטמבר',
        'October': 'אוקטובר', 'November': 'נובמבר', 'December': 'דצמבר'
    }

    time_utc = datetime.fromisoformat(time_utc_iso.replace('Z', '+00:00'))
    time_il = time_utc + timedelta(hours=3)

    weekday_he = hebrew_days[time_il.strftime('%A')]
    month_he = hebrew_months[time_il.strftime('%B')]

    return weekday_he, month_he, time_il


def create_message(details, weekday_he, month_he, time_il):
    hour_minute = time_il.strftime('%H:%M')
    day = time_il.day
    year = time_il.year

    return (
        f"שלום {details['name']},\n"
        f"השאטל שלך מ{details['station']} נקבע בהצלחה ליום {weekday_he}, "
        f"{day} ב{month_he} {year} בשעה {hour_minute}.\n"
        f"אם יש שינוי או שאלה — אפשר לפנות אלינו בכל עת.\n"
        f"נסיעה טובה! 🚐"
    )


# -----------------------------
#       FLASK APP
# -----------------------------

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)


@app.route('/send-message', methods=['POST'])
def send_message():
    data = request.json

    # יצירת דרייבר
    try:
        driver = create_driver()
        print("✅ Chrome started successfully (no driver mode!)")
    except Exception as e:
        print("❌ Error creating Chrome:", e)
        return {"status": "error", "message": str(e)}, 500

    try:
        for details in data:
            phone = details.get("phone")
            if not phone:
                return {"status": "error", "message": "Missing phone"}, 400

            weekday_he, month_he, time_il = convert_time_to_hebrew(details["time"])
            message = create_message(details, weekday_he, month_he, time_il)
            encoded_message = quote(message)

            url = f"https://web.whatsapp.com/send?phone={phone}&text={encoded_message}"
            print("🌐 Opening chat:", phone)
            driver.get(url)

            # ממתין לתיבת ההקלדה
            try:
                msg_box = WebDriverWait(driver, 40).until(
                    EC.presence_of_element_located(
                        (By.XPATH, '//footer//div[@contenteditable="true"]')
                    )
                )
            except:
                return {"status": "error", "message": "Chat did not load"}, 500

            time.sleep(random.uniform(1.4, 2.9))
            msg_box.send_keys(Keys.ENTER)
            print(f"📨 Message sent to {phone}")
            time.sleep(2)

        return {"status": "success", "message": "All messages sent!"}

    except Exception as e:
        print("❌ Error:", e)
        return {"status": "error", "message": str(e)}, 500

    finally:
        driver.quit()
        print("🧹 Browser closed")


if __name__ == '__main__':
    app.run(port=5000)



 */