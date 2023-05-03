import "./style.css";

// Import lottieWeb
import lottieWeb from "https://cdn.skypack.dev/lottie-web";

// Load hero animation
const heroAnimation = lottieWeb.loadAnimation({
  container: document.querySelector(".hero-animation"),
  path: "hero.json",
  renderer: "svg",
  loop: true,
  autoplay: true,
  name: "Hero Animation",
});

const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menuItem");
const hamburger = document.querySelector(".hamburger");
const closeIcon = document.querySelector(".closeIcon");
const menuIcon = document.querySelector(".menuIcon");
const formMessage = document.querySelector(".result");

//Detect Height of the Viewport
const documentHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
};
window.addEventListener("resize", documentHeight);
documentHeight();

// Toggle menu
function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    hideMenu();
  } else {
    showMenu();
  }
}

function showMenu() {
  menu.classList.add("showMenu");
  closeIcon.style.display = "block";
  menuIcon.style.display = "none";
}

function hideMenu() {
  menu.classList.remove("showMenu");
  closeIcon.style.display = "none";
  menuIcon.style.display = "block";
}

hamburger.addEventListener("click", toggleMenu);

// Scroll to section on clicking menu links
const menuLinks = document.querySelectorAll(
  "ul:not(.clients-logo-container) a"
);

function handleMenuLinkClick(event) {
  event.preventDefault();
  hideMenu();
  const href = this.getAttribute("href");
  const offsetTop = document.querySelector(href).offsetTop - 74;
  scroll({
    top: offsetTop,
    behavior: "smooth",
  });
}

for (const menuLink of menuLinks) {
  menuLink.addEventListener("click", handleMenuLinkClick);
}

// Send email using EmailJS
function sendEmail(event) {
  event.preventDefault();
  emailjs.sendForm("service_he34dcx", "template_qel9bgo", this).then(
    function () {
      window.location.replace("/success.html");
    },
    function (error) {
      console.log("FAILED...", error);
    }
  );
}

function initEmailJS() {
  emailjs.init("zFcvTNO1cZrAy2Nuj");
}

window.addEventListener("load", function () {
  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", sendEmail);
  initEmailJS();
});

//Section Animation

const reveal = () => {
  const reveals = document.querySelectorAll(".reveal");
  const windowHeight = window.innerHeight;
  const elementVisible = 150;

  reveals.forEach((reveal) => {
    const elementTop = reveal.getBoundingClientRect().top;
    if (elementTop < windowHeight - elementVisible) {
      reveal.classList.add("active");
    } else {
      reveal.classList.remove("active");
    }
  });
};

window.addEventListener("scroll", reveal);

//Contact Form Validation
const form = document.getElementById("contact-form");
const nameInput = document.getElementById("user_name");
const emailInput = document.getElementById("user_email");
const phoneInput = document.getElementById("contact_number");
const messageInput = document.getElementById("message");

form.addEventListener("submit", (event) => {
  let messages = [];

  if (nameInput.value === "" || nameInput.value == null) {
    messages.push("Name is required");
  }

  if (emailInput.value === "" || emailInput.value == null) {
    messages.push("Email is required");
  } else if (!isValidEmail(emailInput.value)) {
    messages.push("Email is invalid");
  }

  if (phoneInput.value === "" || phoneInput.value == null) {
    messages.push("Phone number is required");
  } else if (!isValidPhone(phoneInput.value)) {
    messages.push("Phone number is invalid");
  }

  if (messageInput.value === "" || messageInput.value == null) {
    messages.push("Message is required");
  }

  if (messages.length > 0) {
    event.preventDefault();
    const result = document.querySelector(".result");
    result.innerHTML =
      "<ul>" +
      messages.map((message) => "<li>" + message + "</li>").join("") +
      "</ul>";
  }
});

function isValidEmail(email) {
  // Regular expression to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  // Regular expression to validate phone number format
  const phoneRegex = /^(\+?\d{11,14})$/;
  return phoneRegex.test(phone);
}
