document.addEventListener("DOMContentLoaded", function() {
    const chatbotcontainer = document.getElementById(chatbot-container);
    const Closebtn = document.getElementById("close-btn");
    const SendBtn = document.getElementById("send-btn");
    const ChatbotInput = document.getElementById("chatbot-input");
    const ChatbotMessages = document.getElementById("chatbot-messages");

    const ChatbotIcon = document.getElementById("chatbot-icon");
    const Closebutton = document.getElementById("close-btn");

    // Toggle chatbot visibility
    ChatbotIcon.addEventListener("click", function() {
        chatbotcontainer.classList.remove("hidden");
    });
});