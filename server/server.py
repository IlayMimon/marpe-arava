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

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

@app.route('/send-message', methods=['POST'])
def send_message():
    data = request.json
    phone = data.get('phone')
    message = data.get('message')

    if not phone or not message:
        return {"status": "error", "message": "Missing phone or message"}, 400

    encoded_message = quote(message)
    url = f"https://web.whatsapp.com/send?phone={phone}"

    options = Options()
    # version .94
    options.binary_location = r"C:\Users\agush\OneDrive\Desktop\chrome-win64\chrome.exe"
    options.add_argument(r"user-data-dir=C:\Users\agush\AppData\Local\Google\Chrome\User Data")
    options.add_argument("profile-directory=Profile 1")
    options.add_argument("--start-maximized")
    
    try:
        driver = webdriver.Chrome(options=options)
    except Exception as e:
        print('chrome failed to start')
        return {"status": "error", "message": f"Chrome failed to start: {e}"}, 500

    try:
        print("🌐 Opening WhatsApp chat...")
        driver.get(url)

        msg_box = WebDriverWait(driver, 30).until(
            EC.presence_of_element_located((By.XPATH, '//footer//div[@contenteditable="true"]'))
        )

        msg_box.click()
        time.sleep(1)
        msg_box.send_keys(message)
        msg_box.send_keys(Keys.ENTER)

        print("✅ Message sent!")
        time.sleep(5)

        return {"status": "success", "message": "Message sent!"}, 200

    except Exception as e:
        print("❌ Failed to send message:", e)
        return {"status": "error", "message": str(e)}, 500

    finally:
        driver.quit()


if __name__ == '__main__':
    app.run(port=5000)
