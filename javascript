// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // Get references to the DOM elements
    const chatForm = document.getElementById("ai-chat-form"); // Assuming you use a <form>
    const chatbox = document.getElementById("chatbox");
    const userInput = document.getElementById("user-input");
    const submitBtn = document.getElementById("submit-btn");

    // Function to add a message to the chatbox
    function addMessage(sender, text) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", sender);

        // Use innerHTML to allow for simple formatting like <strong> or <em>
        messageDiv.innerHTML = text; 
        
        chatbox.appendChild(messageDiv);
        chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll to the latest message
    }

    // Function to show a loading indicator
    function showLoading() {
        const loadingDiv = document.createElement("div");
        loadingDiv.classList.add("message", "bot");
        loadingDiv.id = "loading-indicator";
        loadingDiv.innerHTML = `<em>Bot is typing...</em>`;
        chatbox.appendChild(loadingDiv);
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    // Function to remove the loading indicator
    function hideLoading() {
        const loadingIndicator = document.getElementById("loading-indicator");
        if (loadingIndicator) {
            loadingIndicator.remove();
        }
    }

    // The main function to handle the AI request
    async function askAI(subject) {
        const question = userInput.value.trim();
        if (!question) return; // Don't send empty messages

        // 1. Display the user's message immediately
        addMessage("user", `<strong>You:</strong> ${question}`);
        userInput.value = ""; // Clear the input field

        // 2. Disable the button and show loading state
        submitBtn.disabled = true;
        submitBtn.innerText = "Thinking...";
        showLoading();

        try {
            // 3. Make the API call to your backend
            const response = await fetch("http://127.0.0.1:5000/ask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question, subject })
            });

            if (!response.ok) {
                // If the server response is not OK, throw an error
                throw new Error(`Server error: ${response.statusText}`);
            }

            const data = await response.json();

            // 4. Display the AI's response
            hideLoading();
            addMessage("bot", `<strong>Bot:</strong> ${data.answer}`);

        } catch (error) {
            // 5. Handle any errors that occurred during the fetch
            console.error("Error:", error);
            hideLoading();
            addMessage("bot", `<strong>Bot:</strong> Sorry, I encountered an error. Please check the console and try again.`);
        } finally {
            // 6. Re-enable the button and reset its text
            submitBtn.disabled = false;
            submitBtn.innerText = "Ask AI";
        }
    }

    // Add event listener to the FORM for submission
    if (chatForm) {
        chatForm.addEventListener("submit", function(event) {
            // Prevent the form from reloading the page
            event.preventDefault();
            // Call the main function with the correct subject
            askAI('Public International Law'); 
        });
    }
});
