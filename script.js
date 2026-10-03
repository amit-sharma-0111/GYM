// DOM Elements
const themeToggle = document.getElementById("theme-toggle")
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")
const navbar = document.getElementById("navbar")
const contactForm = document.getElementById("contact-form")
const modal = document.getElementById("image-modal")
const modalImage = document.getElementById("modal-image")
const closeModal = document.querySelector(".close")
const filterBtns = document.querySelectorAll(".filter-btn")
const testimonialCards = document.querySelectorAll(".testimonial-card")
const videoCards = document.querySelectorAll(".video-card")
const galleryItems = document.querySelectorAll(".gallery-item")
// Add these variables at the top with other DOM elements
const watchVideoBtn = document.getElementById("watch-video-btn")
const videoModal = document.getElementById("video-modal")
const modalVideo = document.getElementById("modal-video")
const videoClose = document.querySelector(".video-close")

// ─── EmailJS Configuration ───────────────────────────────────────────────────
// 1. Sign up free at https://www.emailjs.com
// 2. Create an Email Service and note the Service ID
// 3. Create an Email Template with variables:
//    {{from_name}}, {{from_email}}, {{phone}}, {{service}}, {{message}}
// 4. Go to Account > API Keys and copy your Public Key
// 5. Replace the three placeholders below:
const EMAILJS_PUBLIC_KEY  = "fx9aifu3xEDiV1gE7"
const EMAILJS_SERVICE_ID  = "service_ucwtb2m"
const EMAILJS_TEMPLATE_ID = "iozlfpv"
emailjs.init(EMAILJS_PUBLIC_KEY)
// ─────────────────────────────────────────────────────────────────────────────


// Theme Toggle Functionality
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "light"
  document.documentElement.setAttribute("data-theme", savedTheme)
  updateThemeIcon(savedTheme)
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  document.documentElement.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)
  updateThemeIcon(newTheme)

  // Update navbar immediately
  handleNavbarScroll()
}

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector("i")
  icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon"
}

// Mobile Navigation
function toggleMobileNav() {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
}

// Navbar Scroll Effect
function handleNavbarScroll() {
  const currentTheme = document.documentElement.getAttribute("data-theme")

  if (window.scrollY > 100) {
    if (currentTheme === "dark") {
      navbar.style.background = "rgba(10, 10, 10, 0.98)"
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.98)"
    }
    navbar.style.backdropFilter = "blur(25px)"
    navbar.style.boxShadow = "0 2px 30px rgba(0, 0, 0, 0.15)"
  } else {
    if (currentTheme === "dark") {
      navbar.style.background = "rgba(10, 10, 10, 0.95)"
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)"
    }
    navbar.style.backdropFilter = "blur(20px)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }

      // Close mobile menu if open
      if (navMenu.classList.contains("active")) {
        toggleMobileNav()
      }
    })
  })
}

// Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Add animation classes and observe elements
  const animatedElements = document.querySelectorAll(
    ".service-card, .testimonial-card, .gallery-item, .about-text, .about-image, .contact-item",
  )

  animatedElements.forEach((el, index) => {
    if (index % 2 === 0) {
      el.classList.add("fade-in")
    } else {
      el.classList.add("slide-in-left")
    }
    observer.observe(el)
  })
}

// Video Hover Effects
function initVideoHoverEffects() {
  videoCards.forEach((card) => {
    const video = card.querySelector("video")
    const overlay = card.querySelector(".video-overlay")

    card.addEventListener("mouseenter", () => {
      video.play()
      overlay.style.opacity = "0"
    })

    card.addEventListener("mouseleave", () => {
      video.pause()
      video.currentTime = 0
      overlay.style.opacity = "1"
    })
  })
}

// Gallery Modal
function initGalleryModal() {
  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img")
      modalImage.src = img.src
      modalImage.alt = img.alt
      modal.style.display = "block"
      document.body.style.overflow = "hidden"
    })
  })

  closeModal.addEventListener("click", closeGalleryModal)
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeGalleryModal()
    }
  })

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "block") {
      closeGalleryModal()
    }
  })
}

function closeGalleryModal() {
  modal.style.display = "none"
  document.body.style.overflow = "auto"
}

// Testimonial Filter
function initTestimonialFilter() {
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"))
      // Add active class to clicked button
      btn.classList.add("active")

      const filter = btn.getAttribute("data-filter")
      filterTestimonials(filter)
    })
  })
}

// Fix the testimonial filter function
function filterTestimonials(filter) {
  testimonialCards.forEach((card) => {
    const rating = Number.parseInt(card.getAttribute("data-rating"))

    // Remove hidden class first
    card.classList.remove("hidden")

    if (filter === "all") {
      // Show all cards
      card.style.display = "block"
      setTimeout(() => {
        card.style.opacity = "1"
        card.style.transform = "scale(1)"
      }, 10)
    } else if (filter === "top") {
      if (rating >= 4) {
        // Show top-rated cards
        card.style.display = "block"
        setTimeout(() => {
          card.style.opacity = "1"
          card.style.transform = "scale(1)"
        }, 10)
      } else {
        // Hide low-rated cards
        card.style.opacity = "0"
        card.style.transform = "scale(0.8)"
        setTimeout(() => {
          card.style.display = "none"
        }, 300)
      }
    }
  })
}

// Form Validation
function initFormValidation() {
  const formInputs = contactForm.querySelectorAll("input, select, textarea")

  formInputs.forEach((input) => {
    input.addEventListener("blur", () => validateField(input))
    input.addEventListener("input", () => clearFieldError(input))
  })

  contactForm.addEventListener("submit", handleFormSubmit)
}

function validateField(field) {
  const value = field.value.trim()
  const fieldName = field.name
  let isValid = true
  let errorMessage = ""

  // Required field validation
  if (field.hasAttribute("required") && !value) {
    isValid = false
    errorMessage = `${getFieldLabel(fieldName)} is required`
  }

  // Email validation
  if (fieldName === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      isValid = false
      errorMessage = "Please enter a valid email address"
    }
  }

  // Phone validation
  if (fieldName === "phone" && value) {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
    if (!phoneRegex.test(value.replace(/[\s\-().]/g, ""))) {
      isValid = false
      errorMessage = "Please enter a valid phone number"
    }
  }

  showFieldError(field, isValid, errorMessage)
  return isValid
}

function clearFieldError(field) {
  const formGroup = field.closest(".form-group")
  formGroup.classList.remove("error")
  const errorElement = formGroup.querySelector(".error-message")
  errorElement.textContent = ""
}

function showFieldError(field, isValid, errorMessage) {
  const formGroup = field.closest(".form-group")
  const errorElement = formGroup.querySelector(".error-message")

  if (isValid) {
    formGroup.classList.remove("error")
    errorElement.textContent = ""
  } else {
    formGroup.classList.add("error")
    errorElement.textContent = errorMessage
  }
}

function getFieldLabel(fieldName) {
  const labels = {
    name: "Name",
    email: "Email",
    phone: "Phone",
    service: "Service",
    message: "Message",
  }
  return labels[fieldName] || fieldName
}

function handleFormSubmit(e) {
  e.preventDefault()

  const formInputs = contactForm.querySelectorAll("input, select, textarea")
  let isFormValid = true

  formInputs.forEach((input) => {
    if (!validateField(input)) {
      isFormValid = false
    }
  })

  if (isFormValid) {
    const submitBtn = contactForm.querySelector('button[type="submit"]')
    const originalText = submitBtn.textContent

    // Show loading state
    submitBtn.textContent = "Sending..."
    submitBtn.disabled = true
    submitBtn.style.opacity = "0.75"

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
      .then(() => {
        showFormSuccess()
        contactForm.reset()
        submitBtn.textContent = originalText
        submitBtn.style.opacity = "1"
        submitBtn.disabled = false
      })
      .catch((error) => {
        console.error("EmailJS Error:", error)
        submitBtn.textContent = "Failed! Try Again"
        submitBtn.style.background = "#e74c3c"
        submitBtn.style.opacity = "1"
        submitBtn.disabled = false
        setTimeout(() => {
          submitBtn.textContent = originalText
          submitBtn.style.background = ""
        }, 3000)
      })
  }
}

function showFormSuccess() {
  const submitBtn = contactForm.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent

  submitBtn.textContent = "Message Sent!"
  submitBtn.style.background = "#27ae60"
  submitBtn.disabled = true

  setTimeout(() => {
    submitBtn.textContent = originalText
    submitBtn.style.background = ""
    submitBtn.disabled = false
  }, 3000)
}

// Parallax Effect for Hero Section
function initParallaxEffect() {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const heroContent = document.querySelector(".hero-content")
    const heroVideo = document.querySelector(".hero-video")

    if (heroContent && heroVideo) {
      heroContent.style.transform = `translateY(${scrolled * 0.5}px)`
      heroVideo.style.transform = `translateY(${scrolled * 0.3}px)`
    }
  })
}

// Counter Animation for Stats
function initCounterAnimation() {
  const stats = document.querySelectorAll(".stat-item h4")
  const observerOptions = {
    threshold: 0.5,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target)
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  stats.forEach((stat) => observer.observe(stat))
}

function animateCounter(element) {
  const target = Number.parseInt(element.textContent.replace(/\D/g, ""))
  const suffix = element.textContent.replace(/\d/g, "")
  let current = 0
  const increment = target / 50
  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      current = target
      clearInterval(timer)
    }
    element.textContent = Math.floor(current) + suffix
  }, 40)
}

// Loading Animation
function initLoadingAnimation() {
  window.addEventListener("load", () => {
    document.body.classList.add("loaded")

    // Trigger hero animations
    const heroTitle = document.querySelector(".hero-title")
    const heroSubtitle = document.querySelector(".hero-subtitle")
    const heroButtons = document.querySelector(".hero-buttons")

    if (heroTitle) heroTitle.style.animationPlayState = "running"
    if (heroSubtitle) heroSubtitle.style.animationPlayState = "running"
    if (heroButtons) heroButtons.style.animationPlayState = "running"
  })
}

// Video Modal Functions
function initVideoModal() {
  if (watchVideoBtn) {
    watchVideoBtn.addEventListener("click", openVideoModal)
  }

  if (videoClose) {
    videoClose.addEventListener("click", closeVideoModal)
  }

  if (videoModal) {
    videoModal.addEventListener("click", (e) => {
      if (e.target === videoModal) {
        closeVideoModal()
      }
    })
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && videoModal && videoModal.style.display === "block") {
      closeVideoModal()
    }
  })
}

function openVideoModal() {
  if (videoModal && modalVideo) {
    videoModal.style.display = "block"
    document.body.style.overflow = "hidden"
    modalVideo.play()
  }
}

function closeVideoModal() {
  if (videoModal && modalVideo) {
    videoModal.style.display = "none"
    document.body.style.overflow = "auto"
    modalVideo.pause()
    modalVideo.currentTime = 0
  }
}

// Initialize all functionality
function init() {
  initTheme()
  initSmoothScrolling()
  initScrollAnimations()
  initVideoHoverEffects()
  initGalleryModal()
  initTestimonialFilter()
  initFormValidation()
  initParallaxEffect()
  initCounterAnimation()
  initLoadingAnimation()
  initVideoModal()
  initBMICalculator()
  initActiveNav()
  initBackToTop()
}

// ─── BMI Calculator ───────────────────────────────────────────────────────────
let bmiUnit = "metric"

function initBMICalculator() {
  const metricBtn   = document.getElementById("metric-btn")
  const imperialBtn = document.getElementById("imperial-btn")
  const calculateBtn = document.getElementById("calculate-bmi")

  if (!calculateBtn) return

  metricBtn.addEventListener("click", () => {
    bmiUnit = "metric"
    metricBtn.classList.add("active")
    imperialBtn.classList.remove("active")
    document.getElementById("height-unit").textContent = "cm"
    document.getElementById("weight-unit").textContent = "kg"
    document.getElementById("bmi-height").placeholder = "e.g. 175"
    document.getElementById("bmi-weight").placeholder = "e.g. 70"
    document.getElementById("bmi-height").value = ""
    document.getElementById("bmi-weight").value = ""
    resetBMIResult()
  })

  imperialBtn.addEventListener("click", () => {
    bmiUnit = "imperial"
    imperialBtn.classList.add("active")
    metricBtn.classList.remove("active")
    document.getElementById("height-unit").textContent = "in"
    document.getElementById("weight-unit").textContent = "lb"
    document.getElementById("bmi-height").placeholder = "e.g. 68"
    document.getElementById("bmi-weight").placeholder = "e.g. 154"
    document.getElementById("bmi-height").value = ""
    document.getElementById("bmi-weight").value = ""
    resetBMIResult()
  })

  calculateBtn.addEventListener("click", calculateBMI)

  // Also allow Enter key
  document.getElementById("bmi-height").addEventListener("keyup", (e) => { if (e.key === "Enter") calculateBMI() })
  document.getElementById("bmi-weight").addEventListener("keyup", (e) => { if (e.key === "Enter") calculateBMI() })
}

function resetBMIResult() {
  document.getElementById("bmi-score").textContent = "--"
  document.getElementById("bmi-score").style.cssText = ""
  document.getElementById("bmi-category").textContent = "Enter your details"
  document.getElementById("bmi-category").style.color = ""
  document.getElementById("bmi-advice").textContent = "Your result will appear here after calculation."
  document.getElementById("scale-indicator").style.left = "0%"
}

function calculateBMI() {
  const height = parseFloat(document.getElementById("bmi-height").value)
  const weight = parseFloat(document.getElementById("bmi-weight").value)

  if (!height || !weight || height <= 0 || weight <= 0) {
    document.getElementById("bmi-advice").textContent = "⚠️ Please enter valid height and weight values."
    return
  }

  let bmi
  if (bmiUnit === "metric") {
    const heightM = height / 100
    bmi = weight / (heightM * heightM)
  } else {
    bmi = (703 * weight) / (height * height)
  }
  bmi = Math.round(bmi * 10) / 10

  let category, advice, color, position

  if (bmi < 18.5) {
    category = "Underweight 🥗"
    advice   = "Focus on gaining healthy weight. Our Nutrition Coaching and Strength Training programs can help you build muscle mass safely!"
    color    = "#3498db"
    position = Math.max(2, (bmi / 18.5) * 20)
  } else if (bmi < 25) {
    category = "Normal Weight ✅"
    advice   = "Great job! You're in a healthy range. Keep it up with our Cardio and Group Classes to maintain your fitness level."
    color    = "#2ecc71"
    position = 20 + ((bmi - 18.5) / 6.5) * 30
  } else if (bmi < 30) {
    category = "Overweight ⚠️"
    advice   = "Our HIIT and Cardio Workout programs can help you reach a healthy weight. Consider also our Nutrition Coaching!"
    color    = "#f39c12"
    position = 50 + ((bmi - 25) / 5) * 25
  } else {
    category = "Obese 🚨"
    advice   = "Start your transformation today with Personal Training tailored to your needs. Our certified trainers will guide you every step of the way!"
    color    = "#e74c3c"
    position = Math.min(97, 75 + ((bmi - 30) / 10) * 22)
  }

  const scoreEl    = document.getElementById("bmi-score")
  const categoryEl = document.getElementById("bmi-category")
  const adviceEl   = document.getElementById("bmi-advice")
  const indicator  = document.getElementById("scale-indicator")

  scoreEl.textContent   = bmi
  scoreEl.style.cssText = `-webkit-text-fill-color:${color};color:${color};background:none`
  categoryEl.textContent = category
  categoryEl.style.color = color
  adviceEl.textContent  = advice
  indicator.style.left  = position + "%"
  indicator.style.background = color
}
// ─────────────────────────────────────────────────────────────────────────────


// Event Listeners
themeToggle.addEventListener("click", toggleTheme)
hamburger.addEventListener("click", toggleMobileNav)
window.addEventListener("scroll", handleNavbarScroll)

// ─── Active Nav Link on Scroll ───────────────────────────────────────────────
function initActiveNav() {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  window.addEventListener("scroll", () => {
    let currentSection = ""
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute("id")
      }
    })
    navLinks.forEach((link) => {
      link.classList.remove("active-link")
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active-link")
      }
    })
  })
}

// ─── Back to Top Button ──────────────────────────────────────────────────────
function initBackToTop() {
  const btn = document.getElementById("back-to-top")
  if (!btn) return

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      btn.classList.add("visible")
    } else {
      btn.classList.remove("visible")
    }
  })

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  })
}
// ─────────────────────────────────────────────────────────────────────────────


// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", init)

// Handle window resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 768 && navMenu.classList.contains("active")) {
    toggleMobileNav()
  }
})

// Preload critical images
function preloadImages() {
  const imageUrls = [
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  ]

  imageUrls.forEach((url) => {
    const img = new Image()
    img.src = url
  })
}

// Start preloading
preloadImages()