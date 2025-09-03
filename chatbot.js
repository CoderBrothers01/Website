// Chatbot toggle functionality
const chatbotToggle = document.getElementById("chatbotToggle");
const chatbotContainer = document.getElementById("chatbotContainer");

// Toggle chatbot visibility
chatbotToggle.addEventListener("click", () => {
  chatbotContainer.classList.toggle("active");
});

// Auto-open chatbot after 3-5 seconds
setTimeout(() => {
  chatbotContainer.classList.add("active");
}, Math.random() * 2000 + 3000);
