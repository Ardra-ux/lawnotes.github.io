const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", () => {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage("user", message);
    userInput.value = "";

    // Simulate AI response
    setTimeout(() => {
        const aiReply = "This is a placeholder reply. Replace with real AI API call!";
        addMessage("bot", aiReply);
    }, 500);
});

function addMessage(sender, text) {
    const div = document.createElement("div");
    div.classList.add("message", sender);
    div.textContent = text;
    chatbox.appendChild(div);
    chatbox.scrollTop = chatbox.scrollHeight;
}
