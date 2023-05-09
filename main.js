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

//Hero Call to Action
const calltoAction = document.querySelector(".btnlink");

calltoAction.addEventListener("click", handleMenuLinkClick);

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
function sendEmail() {
  const errors = [];

  // Validate name field
  if (nameInput.value === "") {
    errors.push("Name field cannot be empty");
  }

  // Validate email field
  if (emailInput.value === "") {
    errors.push("Email field cannot be empty");
  } else if (!isValidEmail(emailInput.value)) {
    errors.push("Invalid email address");
  }

  // Validate phone field
  if (phoneInput.value === "") {
    errors.push("Phone field cannot be empty");
  } else if (!isValidPhoneNumber(phoneInput.value)) {
    errors.push("Invalid phone number");
  }

  // Show errors or submit the form
  if (errors.length > 0) {
    resultDiv.innerHTML = errors.join("<br>");
  } else {
    emailjs.sendForm("service_he34dcx", "template_qel9bgo", form).then(
      function () {
        resultDiv.innerHTML = "Thank You! We will get back to you soon.";
      },
      function (error) {
        console.log("FAILED...", error);
        resultDiv.innerHTML = "Message failed to send.";
      }
    );
  }
}

function initEmailJS() {
  emailjs.init("zFcvTNO1cZrAy2Nuj");
}

window.addEventListener("load", function () {
  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    sendEmail();
  });
  initEmailJS();
});

//Contact Form Validation
const form = document.querySelector("#contact-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");

let resultDiv = document.querySelector(".result");

// Helper functions for email and phone number validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper function for phone number validation
function isValidPhoneNumber(phone) {
  const phoneRegex = /^\+?\d{11,14}$/;
  return phoneRegex.test(phone);
}

//Footer Current Year

const currentYear = new Date().getFullYear();
document.querySelector(".current-year").innerHTML = currentYear;
