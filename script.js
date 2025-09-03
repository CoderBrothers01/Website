// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Theme Toggle Functionality
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const themeIcon = themeToggle.querySelector("i");

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem("theme") || "dark";
body.classList.toggle("light-theme", currentTheme === "light");

// Update icon based on current theme
function updateThemeIcon() {
  if (body.classList.contains("light-theme")) {
    themeIcon.className = "fas fa-sun";
  } else {
    themeIcon.className = "fas fa-moon";
  }
}

updateThemeIcon();

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-theme");

  // Save theme preference
  const theme = body.classList.contains("light-theme") ? "light" : "dark";
  localStorage.setItem("theme", theme);

  // Update icon
  updateThemeIcon();

  // Add animation effect
  themeToggle.style.transform = "scale(0.8)";
  setTimeout(() => {
    themeToggle.style.transform = "scale(1)";
  }, 150);
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("loaded");
    }
  });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll("section").forEach((section) => {
  section.classList.add("loading");
  observer.observe(section);
});

// Contact form handling
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Simple validation
    if (!data.name || !data.email || !data.service || !data.message) {
      showNotification("Please fill in all required fields.", "error");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      showNotification("Please enter a valid email address.", "error");
      return;
    }

    // Simulate form submission
    showNotification("Thank you! We'll get back to you soon.", "success");

    // Reset form
    this.reset();

    // In a real application, you would send this data to your server
    console.log("Form submitted:", data);
  });
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${
          type === "success"
            ? "#10b981"
            : type === "error"
            ? "#ef4444"
            : "#3b82f6"
        };
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;

  // Add to page
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Close button functionality
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => notification.remove(), 300);
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll(".stat-item h3");

  counters.forEach((counter) => {
    const target = parseInt(counter.textContent);
    const increment = target / 100;
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent =
          Math.ceil(current) + (counter.textContent.includes("+") ? "+" : "");
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent =
          target + (counter.textContent.includes("+") ? "+" : "");
      }
    };

    updateCounter();
  });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector(".about-stats");
if (statsSection) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statsObserver.observe(statsSection);
}

// Portfolio filter functionality
function initializePortfolioFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      button.classList.add("active");

      const filter = button.dataset.filter;

      // Filter portfolio items
      portfolioItems.forEach((item) => {
        const categories = item.dataset.category.split(" ");

        if (filter === "all" || categories.includes(filter)) {
          item.style.display = "block";
          item.style.animation = "slideInFromBottom 0.6s ease-out";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
}

// Initialize portfolio filters when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initializePortfolioFilters();
});

// WhatsApp integration
function openWhatsApp() {
  const phone = "+919876543210"; // Replace with your actual WhatsApp number
  const message = "Hi! I'm interested in your services. Can you help me?";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// Telegram integration
function openTelegram() {
  const username = "coderbrothers"; // Replace with your actual Telegram username
  const message = "Hi! I'm interested in your services. Can you help me?";
  const url = `https://t.me/${username}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// Add click handlers for contact methods
document.addEventListener("DOMContentLoaded", () => {
  // WhatsApp contact method
  const whatsappContact = document.querySelector(
    ".contact-method:nth-child(2)"
  );
  if (whatsappContact) {
    whatsappContact.style.cursor = "pointer";
    whatsappContact.addEventListener("click", openWhatsApp);
  }

  // Telegram contact method
  const telegramContact = document.querySelector(
    ".contact-method:nth-child(3)"
  );
  if (telegramContact) {
    telegramContact.style.cursor = "pointer";
    telegramContact.addEventListener("click", openTelegram);
  }
});

// Lazy loading for images
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing animation when page loads
document.addEventListener("DOMContentLoaded", () => {
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 50);
  }

  // Initialize WhatsApp functionality
  initializeWhatsApp();
});

// WhatsApp Integration
function initializeWhatsApp() {
  const whatsappFloat = document.getElementById("whatsappFloat");
  if (whatsappFloat) {
    whatsappFloat.addEventListener("click", function () {
      const message = encodeURIComponent(
        "Hello! I'm interested in your services. Can you help me with a project?"
      );
      const phone = "+919876543210"; // Replace with your actual WhatsApp number
      const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
      window.open(whatsappUrl, "_blank");
    });
  }
}

// Scroll to top functionality
function createScrollToTopButton() {
  const scrollBtn = document.createElement("button");
  scrollBtn.innerHTML = "↑";
  scrollBtn.className = "scroll-to-top";
  scrollBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    `;

  document.body.appendChild(scrollBtn);

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.style.opacity = "1";
      scrollBtn.style.visibility = "visible";
    } else {
      scrollBtn.style.opacity = "0";
      scrollBtn.style.visibility = "hidden";
    }
  });

  // Scroll to top when clicked
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Hover effects
  scrollBtn.addEventListener("mouseenter", () => {
    scrollBtn.style.transform = "scale(1.1)";
    scrollBtn.style.background = "#1d4ed8";
  });

  scrollBtn.addEventListener("mouseleave", () => {
    scrollBtn.style.transform = "scale(1)";
    scrollBtn.style.background = "#2563eb";
  });
}

// Initialize scroll to top button
createScrollToTopButton();

// Preloader (optional)
function createPreloader() {
  const preloader = document.createElement("div");
  preloader.className = "preloader";
  preloader.innerHTML = `
        <div class="preloader-content">
            <div class="spinner"></div>
            <h3>CoderBrothers</h3>
            <p>Loading...</p>
        </div>
    `;

  preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;

  document.body.appendChild(preloader);

  // Hide preloader after page loads
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.style.opacity = "0";
      setTimeout(() => preloader.remove(), 500);
    }, 1000);
  });
}

// Initialize preloader
createPreloader();
