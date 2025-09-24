from flask import Flask, request, jsonify
import openai
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

openai.api_key = OKINOWA@23

@app.route("/ask", methods=["POST"])
def ask():
    user_question = request.json.get("question")
    subject = request.json.get("subject", "Law")
    
    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": f"You are a helpful tutor for {subject}."},
            {"role": "user", "content": user_question}
        ]
    )
    answer = response["choices"][0]["message"]["content"]
    return jsonify({"answer": answer})

if __name__ == "__main__":
    app.run(debug=True)
