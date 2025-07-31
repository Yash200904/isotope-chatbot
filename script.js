// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileNavigation();
    initTabSwitching();
    initChatbot();
    initSmoothScrolling();
    initScrollEffects();
    initAnimations();
});

// Mobile Navigation
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Tab Switching
function initTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Chatbot Functionality
function initChatbot() {
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    const chatMessages = document.getElementById('chatMessages');
    
    if (chatInput && sendButton && chatMessages) {
        // Send message on button click
        sendButton.addEventListener('click', sendMessage);
        
        // Send message on Enter key
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        // Auto-resize input
        chatInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 120) + 'px';
        });
    }
}

async function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    const message = chatInput.value.trim();
    
    console.log('sendMessage called with:', message);
    console.log('chatInput:', chatInput);
    console.log('chatMessages:', chatMessages);
    
    if (message) {
        // Add user message
        addMessage(message, 'user');
        
        // Clear input
        chatInput.value = '';
        chatInput.style.height = 'auto';
        
        // Show loading message
        const loadingId = 'loading-' + Date.now();
        addMessage('<span class="loading"></span> Thinking...', 'bot', loadingId);
        
        // Get AI response
        let botResponse = 'Sorry, I could not generate a response.';
        try {
            console.log('About to call askBot...');
            botResponse = await askBot(message);
            console.log('askBot returned:', botResponse);
        } catch (e) {
            console.error('Error calling askBot:', e);
            botResponse = 'Sorry, there was an error connecting to the AI service.';
        }
        // Remove loading message
        const loadingMsg = document.getElementById(loadingId);
        if (loadingMsg) loadingMsg.remove();
        // Add AI response
        addMessage(botResponse, 'bot');
    } else {
        console.log('No message to send');
    }
}

function addMessage(text, sender, customId) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    if (customId) messageDiv.id = customId;
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Convert line breaks to HTML and preserve formatting
    const formattedText = text
        .replace(/\n/g, '<br>')
        .replace(/---/g, '<hr style="margin: 0.5rem 0; border: 1px solid #e2e8f0;">')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/📚|✅|❌|🎉|🧠|🎮|❓|👋/g, '<span style="font-size: 1.1em;">$&</span>');
    
    messageDiv.innerHTML = `
        <div class="message-content">
            <div>${formattedText}</div>
        </div>
        <span class="message-time">${currentTime}</span>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Use relative URL for deployment compatibility
async function askBot(message) {
  console.log('askBot called with message:', message);
  try {
    // Use relative URL so it works both locally and when deployed
    const apiUrl = window.location.hostname === 'localhost' ? 
      'http://localhost:3001/chat' : '/chat';
    
    console.log('Sending request to:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify({ 
        message,
        timestamp: Date.now() // Help with mobile caching issues
      }),
      // Mobile-friendly options
      credentials: 'same-origin',
      cache: 'no-cache'
    });
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Response data:', data);
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      return data.choices[0].message.content.trim();
    }
    if (data.error) return 'AI Error: ' + data.error.message;
    return 'Sorry, I could not generate a response. Please try again.';
  } catch (error) {
    console.error('Error in askBot:', error);
    
    // Mobile-friendly error messages
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      return `**Connection Error** 📱\n\n• Check your internet connection\n• Try switching between WiFi and mobile data\n• Refresh the page and try again\n\nThe chatbot should work on both desktop and mobile devices!`;
    } else if (error.message.includes('status: 5')) {
      return `**Server Error** 🔧\n\n• The server is experiencing issues\n• Please try again in a few moments\n• Contact support if the problem persists`;
    } else {
      return `**Technical Error** ⚠️\n\n• Error: ${error.message}\n• Please refresh the page\n• Try from a different browser if needed\n\nI'm here to help with isotope questions once we're reconnected! 🔬`;
    }
  }
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Effects
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.info-card, .application-card, .tab-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize Animations
function initAnimations() {
    // Add loading animation to send button
    const sendButton = document.getElementById('sendButton');
    if (sendButton) {
        sendButton.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const originalIcon = icon.className;
            
            // Show loading state
            icon.className = 'fas fa-spinner fa-spin';
            this.disabled = true;
            
            // Reset after response
            setTimeout(() => {
                icon.className = originalIcon;
                this.disabled = false;
            }, 1000);
        });
    }
    
    // Add hover effects to application cards
    document.querySelectorAll('.application-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to buttons
    document.querySelectorAll('button, .cta-button').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    button, .cta-button {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Form validation (if needed)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = 'var(--danger-color)';
            isValid = false;
        } else {
            input.style.borderColor = 'var(--border-color)';
        }
    });
    
    return isValid;
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimization
const optimizedScrollHandler = throttle(function() {
    // Handle scroll events efficiently
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could send this to an error tracking service
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export functions for potential external use
window.IsotopeWebsite = {
    sendMessage,
    addMessage,
    generateBotResponse,
    validateForm
}; 