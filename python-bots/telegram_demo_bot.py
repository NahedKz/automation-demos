import requests
import time

TOKEN = "PASTE_YOUR_TOKEN_HERE"
BASE_URL = f"https://api.telegram.org/bot{TOKEN}/"

def get_updates(offset=None):
    url = BASE_URL + "getUpdates"
    params = {"offset": offset}
    response = requests.get(url, params=params).json()
    return response.get("result", [])

def send_message(chat_id, text):
    url = BASE_URL + "sendMessage"
    payload = {"chat_id": chat_id, "text": text}
    requests.post(url, json=payload)

def main():
    last_update = None
    print("Bot is running...")

    while True:
        updates = get_updates(offset=last_update)
        for update in updates:
            message = update.get("message", {})
            chat_id = message.get("chat", {}).get("id")
            text = message.get("text")

            if text:
                reply = f"You said: {text}"
                send_message(chat_id, reply)

            last_update = update["update_id"] + 1

        time.sleep(1)

if __name__ == "__main__":
    main()
