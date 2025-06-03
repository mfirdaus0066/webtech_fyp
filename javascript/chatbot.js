document.addEventListener("DOMContentLoaded", function() {
    const chatbotcontainer = document.getElementById("chatbot-container");
    const Closebtn = document.getElementById("close-btn");
    const SendBtn = document.getElementById("send-btn");
    const ChatbotInput = document.getElementById("chatbot-input");
    const ChatbotMessages = document.getElementById("chatbot-messages");

    const ChatbotIcon = document.getElementById("chatbot-icon");
    const Closebutton = document.getElementById("close-btn");

    // Toggle chatbot visibility
    ChatbotIcon.addEventListener("click", function() {
        chatbotcontainer.classList.remove("hidden");
        ChatbotIcon.style.display = "none";
    });

    // Close chatbot
    Closebutton.addEventListener("click", function() {
        chatbotcontainer.classList.add("hidden");
        ChatbotIcon.style.display = "flex";
    });

    // Send message on button click
    SendBtn.addEventListener("click",sendMessage);
    ChatbotInput.addEventListener("keypress",function(e){
        if (e.key === "Enter") {
            e.preventDefault(); 
            sendMessage();
        }
    });
});

function sendMessage()
{
    const userMessage = ChatbotInput.value.trim();
    if (userMessage)
    {
        appendmessage("user", userMessage);
        ChatbotInput.value = "";
        getBotResponse(userMessage);
    }
}

function appendmessage(sender, message) 
{
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.textContent = message;
    ChatbotMessages.appendChild(messageElement);
    ChatbotMessages.scrollTop = ChatbotMessages.scrollHeight;
}

async function getBotResponse(userMessage)
{
    const apiKey = "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";
    const apiUrl = "https://api.openai.com/v1/chat/completions";

    try{
        const response = await fetch(apiUrl,{
            method: "POST",
            headers :{
                "content-type" : "application/json",
                Authhorization: `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "user", content: userMessage }],
                    max_token: 150,
            }),
        });
        const data = await response.json();
        const botMessage = data.choices[0].message.content;
        appendMessage("bot", botMessage);
    }
    catch (error) {
      console.error("Error fetching bot response:", error);
      appendMessage("bot", "Sorry, something went wrong. Please try again.");
    }
}