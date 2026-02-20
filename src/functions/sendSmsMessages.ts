import { TableRow } from "../components/Table/TableTypes";


// https://cellsms.cellcom.co.il/SmsGate2.asmx/SendSmsEx?username=user&password=pass&target=0521234567&source=1234&message=Test&pushUrl=&validity=1&replace=false&immediate=false&isBinary=false&deliveryReceipt=true&maxSegments=0
interface HebrewDateTime {
  weekday_he: string;
  month_he: string;
  time_il: Date;
}

function sendSmsMessages(tableData: TableRow[]) {

  const mappedRecipients = tableData
    .filter((r) => r.status === "שובץ")
    .map((row) => ({
      username: 'marpearava',
      password: 'Marpearava123!',
      target: row.phone,
      time: row.pickupTime,
      name: row.fullName,
      station: row.station,
      driver: row.driver,
    }))

  const convertTimeToHebrew = (timeUtcIso: string): HebrewDateTime => {
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

    // Parse ISO and add 3 hours (3 * 60 * 60 * 1000 ms)
    const timeUtc = new Date(timeUtcIso)
    const timeIl = new Date(timeUtc.getTime() + (3 * 60 * 60 * 1000))

    // Use Intl to get the English names for mapping
    const weekdayEn = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(timeIl)
    const monthEn = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(timeIl)

    return {
      weekday_he: hebrewDays[weekdayEn],
      month_he: hebrewMonths[monthEn],
      time_il: timeIl
    }
  }


  function createMessage(details: { name: string, station: string }, weekday_he: string, month_he: string, time_il: Date) {
    const hour_minute = time_il.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
    const day = time_il.getDate();
    const year = time_il.getFullYear();

    return (
      `שלום ${details['name']},\n` +
      `השאטל שלך מ${details['station']} נקבע בהצלחה ליום ${weekday_he}, ` +
      `${day} ב${month_he} ${year} בשעה ${hour_minute}.\n` +
      `אם יש שינוי או שאלה — אפשר לפנות אלינו בכל עת.\n` +
      `נסיעה טובה! 🚐`
    );
  }

  function sendMessage() {
    try {

    } catch (e: any) {
      console.error("❌ Error:", e);
      return { status: "error", message: e.message, code: 500 };
    } finally {
      console.log("🧹 Browser closed");
    }

  }

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
}
export default sendMessage;


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