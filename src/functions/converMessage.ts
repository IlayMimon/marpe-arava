


/*
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