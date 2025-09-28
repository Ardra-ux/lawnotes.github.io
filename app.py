from dotenv import load_dotenv
import os
import openai

# Load .env file
load_dotenv()

# Get the API key
openai.api_key = os.getenv("OPENAI_API_KEY")

# Test if API key is loaded
if openai.api_key:
    print("✅ OpenAI API Key loaded successfully!")
else:
    print("❌ Failed to load OpenAI API Key. Check your .env file.")

# Optional: simple API test (comment out if not needed)
try:
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": "Say hello!"}]
    )
    print("OpenAI Response:", response.choices[0].message.content)
except Exception as e:
    print("Error calling OpenAI API:", e)
