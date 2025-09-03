// AI Chatbot Functionality
class CoderBrothersAI {
    constructor() {
        this.container = document.getElementById('chatbotContainer');
        this.toggle = document.getElementById('chatbotToggle');
        this.messages = document.getElementById('chatMessages');
        this.input = document.getElementById('messageInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.minimizeBtn = document.getElementById('minimizeBtn');
        this.closeBtn = document.getElementById('closeBtn');
        this.quickReplies = document.getElementById('quickReplies');
        
        this.isOpen = false;
        this.isMinimized = false;
        this.conversationHistory = [];
        
        this.initializeEventListeners();
        this.loadConversationHistory();
    }
    
    initializeEventListeners() {
        // Toggle chatbot
        this.toggle.addEventListener('click', () => this.toggleChatbot());
        
        // Send message
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        
        // Controls
        this.minimizeBtn.addEventListener('click', () => this.minimizeChatbot());
        this.closeBtn.addEventListener('click', () => this.closeChatbot());
        
        // Quick replies
        this.quickReplies.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-reply')) {
                const message = e.target.dataset.message;
                this.input.value = message;
                this.sendMessage();
            }
        });
        
        // Auto-open after 5 seconds
        setTimeout(() => {
            if (!this.isOpen && !localStorage.getItem('chatbotClosed')) {
                this.showNotification();
            }
        }, 5000);
    }
    
    toggleChatbot() {
        if (this.isOpen) {
            this.closeChatbot();
        } else {
            this.openChatbot();
        }
    }
    
    openChatbot() {
        this.isOpen = true;
        this.container.classList.add('active');
        this.toggle.style.display = 'none';
        this.input.focus();
        this.scrollToBottom();
    }
    
    closeChatbot() {
        this.isOpen = false;
        this.isMinimized = false;
        this.container.classList.remove('active', 'minimized');
        this.toggle.style.display = 'flex';
        localStorage.setItem('chatbotClosed', 'true');
    }
    
    minimizeChatbot() {
        this.isMinimized = !this.isMinimized;
        this.container.classList.toggle('minimized');
    }
    
    showNotification() {
        this.toggle.querySelector('.notification-dot').style.display = 'block';
        this.toggle.style.animation = 'pulse 1s infinite';
    }
    
    async sendMessage() {
        const message = this.input.value.trim();
        if (!message) return;
        
        // Add user message
        this.addMessage(message, 'user');
        this.input.value = '';
        this.sendBtn.disabled = true;
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Process message and generate response
        const response = await this.processMessage(message);
        
        // Remove typing indicator and add bot response
        this.hideTypingIndicator();
        this.addMessage(response, 'bot');
        
        this.sendBtn.disabled = false;
        this.input.focus();
    }
    
    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        
        const icon = document.createElement('i');
        icon.className = sender === 'bot' ? 'fas fa-robot' : 'fas fa-user';
        avatar.appendChild(icon);
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        if (typeof content === 'string') {
            messageContent.innerHTML = `<p>${content}</p>`;
        } else {
            messageContent.appendChild(content);
        }
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        this.messages.appendChild(messageDiv);
        this.scrollToBottom();
        
        // Save to conversation history
        this.conversationHistory.push({ sender, content, timestamp: new Date() });
        this.saveConversationHistory();
    }
    
    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator-message';
        typingDiv.id = 'typingIndicator';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        const icon = document.createElement('i');
        icon.className = 'fas fa-robot';
        avatar.appendChild(icon);
        
        const content = document.createElement('div');
        content.className = 'message-content';
        
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.className = 'typing-dot';
            typingIndicator.appendChild(dot);
        }
        
        content.appendChild(typingIndicator);
        typingDiv.appendChild(avatar);
        typingDiv.appendChild(content);
        
        this.messages.appendChild(typingDiv);
        this.scrollToBottom();
    }
    
    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    scrollToBottom() {
        this.messages.scrollTop = this.messages.scrollHeight;
    }
    
    async processMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        // Simulate AI processing delay
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
        
        // Intent recognition
        if (this.containsKeywords(lowerMessage, ['website', 'web', 'site'])) {
            return this.handleWebsiteInquiry(message);
        } else if (this.containsKeywords(lowerMessage, ['mobile', 'app', 'android', 'ios'])) {
            return this.handleMobileAppInquiry(message);
        } else if (this.containsKeywords(lowerMessage, ['price', 'cost', 'quote', 'estimate'])) {
            return this.handlePricingInquiry(message);
        } else if (this.containsKeywords(lowerMessage, ['consultation', 'meeting', 'book', 'schedule'])) {
            return this.handleConsultationBooking(message);
        } else if (this.containsKeywords(lowerMessage, ['technology', 'tech', 'stack', 'framework'])) {
            return this.handleTechnologyInquiry(message);
        } else if (this.containsKeywords(lowerMessage, ['hello', 'hi', 'hey'])) {
            return this.handleGreeting(message);
        } else if (this.containsKeywords(lowerMessage, ['thank', 'thanks'])) {
            return this.handleThanks(message);
        } else {
            return this.handleGeneralInquiry(message);
        }
    }
    
    containsKeywords(message, keywords) {
        return keywords.some(keyword => message.includes(keyword));
    }
    
    handleWebsiteInquiry(message) {
        const response = document.createElement('div');
        response.innerHTML = `
            <p>Great! I'd love to help you with your website project. Let me ask a few questions to provide you with the best estimate:</p>
            <div style="margin-top: 1rem;">
                <p><strong>What type of website do you need?</strong></p>
                <ul>
                    <li>Business/Corporate Website</li>
                    <li>E-commerce/Online Store</li>
                    <li>Portfolio/Personal Website</li>
                    <li>Blog/Content Website</li>
                    <li>Web Application</li>
                </ul>
            </div>
            <div style="margin-top: 1rem;">
                <p><strong>Estimated Timeline:</strong> 2-8 weeks</p>
                <p><strong>Starting Price:</strong> ₹25,000 - ₹2,00,000</p>
            </div>
            <p style="margin-top: 1rem;">Would you like me to create a detailed quote for you?</p>
        `;
        return response;
    }
    
    handleMobileAppInquiry(message) {
        const response = document.createElement('div');
        response.innerHTML = `
            <p>Excellent choice! Mobile apps are a great way to reach your customers. Here's what I need to know:</p>
            <div style="margin-top: 1rem;">
                <p><strong>Platform:</strong></p>
                <ul>
                    <li>iOS (iPhone/iPad)</li>
                    <li>Android</li>
                    <li>Cross-platform (React Native/Flutter)</li>
                </ul>
            </div>
            <div style="margin-top: 1rem;">
                <p><strong>App Type:</strong></p>
                <ul>
                    <li>Business App</li>
                    <li>E-commerce App</li>
                    <li>Social/Community App</li>
                    <li>Utility/Tool App</li>
                    <li>Entertainment App</li>
                </ul>
            </div>
            <div style="margin-top: 1rem;">
                <p><strong>Estimated Timeline:</strong> 3-12 weeks</p>
                <p><strong>Starting Price:</strong> ₹50,000 - ₹5,00,000</p>
            </div>
        `;
        return response;
    }
    
    handlePricingInquiry(message) {
        return `Here's our transparent pricing structure:

💰 <strong>Website Development:</strong>
• Basic Website: ₹25,000 - ₹50,000
• E-commerce: ₹75,000 - ₹2,00,000
• Custom Web App: ₹1,00,000 - ₹5,00,000

📱 <strong>Mobile App Development:</strong>
• Simple App: ₹50,000 - ₹1,00,000
• Complex App: ₹1,50,000 - ₹5,00,000
• Enterprise App: ₹3,00,000+

🎨 <strong>UI/UX Design:</strong>
• Website Design: ₹15,000 - ₹50,000
• App Design: ₹25,000 - ₹75,000

💼 <strong>Consultation:</strong>
• 1-hour Session: ₹2,500
• Project Planning: ₹5,000

All prices are in INR and include:
✅ Responsive Design
✅ SEO Optimization
✅ 3 Months Support
✅ Training & Documentation

Would you like a custom quote for your specific project?`;
    }
    
    handleConsultationBooking(message) {
        const response = document.createElement('div');
        response.innerHTML = `
            <p>Perfect! Let's schedule a consultation to discuss your project in detail.</p>
            <div style="margin-top: 1rem;">
                <p><strong>Available Time Slots:</strong></p>
                <ul>
                    <li>Monday - Friday: 10:00 AM - 7:00 PM</li>
                    <li>Saturday: 10:00 AM - 5:00 PM</li>
                </ul>
            </div>
            <div style="margin-top: 1rem;">
                <p><strong>Consultation Options:</strong></p>
                <ul>
                    <li>Video Call (Zoom/Google Meet)</li>
                    <li>Phone Call</li>
                    <li>WhatsApp Video Call</li>
                </ul>
            </div>
            <p style="margin-top: 1rem;">Please provide your preferred date and time, and I'll confirm the booking. You can also contact us directly:</p>
            <p>📞 <strong>Phone:</strong> +91 98765 43210</p>
            <p>📱 <strong>WhatsApp:</strong> +91 98765 43210</p>
        `;
        return response;
    }
    
    handleTechnologyInquiry(message) {
        return `Here are the cutting-edge technologies we specialize in:

🛠️ <strong>Frontend Technologies:</strong>
• React.js, Angular, Vue.js
• Next.js, Nuxt.js
• TypeScript, JavaScript

📱 <strong>Mobile Development:</strong>
• React Native (Cross-platform)
• Flutter (Cross-platform)
• Native iOS (Swift)
• Native Android (Kotlin)

⚙️ <strong>Backend Technologies:</strong>
• Node.js, Python, PHP
• Django, Laravel, Express.js
• PostgreSQL, MongoDB, MySQL

☁️ <strong>Cloud & DevOps:</strong>
• AWS, Google Cloud, Azure
• Docker, Kubernetes
• CI/CD Pipelines

🤖 <strong>AI & Machine Learning:</strong>
• TensorFlow, PyTorch
• OpenAI API Integration
• Custom AI Solutions

Which technology interests you most for your project?`;
    }
    
    handleGreeting(message) {
        return `Hello! 👋 Welcome to CoderBrothers! I'm your AI assistant, ready to help you bring your digital ideas to life.

I can help you with:
• 🎯 Project planning and estimation
• 💰 Pricing and quotes
• 📅 Consultation booking
• 🛠️ Technology recommendations
• 📱 Website and app development

What would you like to discuss today?`;
    }
    
    handleThanks(message) {
        return `You're very welcome! 😊 

I'm here to help make your digital journey smooth and successful. If you have any more questions or need assistance with your project, feel free to ask anytime.

Don't forget to check out our portfolio to see some amazing projects we've delivered! 🚀`;
    }
    
    handleGeneralInquiry(message) {
        return `Thank you for your message! I'm here to help you with all things related to web and mobile development.

Could you please provide more details about what you're looking for? For example:
• What type of project do you have in mind?
• Are you looking for a website, mobile app, or something else?
• Do you have a specific timeline or budget in mind?

This will help me provide you with the most relevant information and accurate estimates.`;
    }
    
    saveConversationHistory() {
        localStorage.setItem('chatbotHistory', JSON.stringify(this.conversationHistory));
    }
    
    loadConversationHistory() {
        const saved = localStorage.getItem('chatbotHistory');
        if (saved) {
            this.conversationHistory = JSON.parse(saved);
        }
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CoderBrothersAI();
}); 