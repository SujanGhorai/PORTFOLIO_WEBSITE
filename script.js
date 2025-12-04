(function () {
  emailjs.init("YOUR_PUBLIC_KEY");
})();

const words = ["Developer", "Designer", "Freelancer", "Creator"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriter = document.getElementById("typewriter");

function type() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    typewriter.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriter.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    setTimeout(type, 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, 500);
  } else {
    setTimeout(type, isDeleting ? 50 : 100);
  }
}

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, observerOptions);

document
  .querySelectorAll(".fade-in, .slide-in-left, .slide-in-right")
  .forEach((el) => {
    observer.observe(el);
  });

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.getElementById("closeMenu");
const mobileLinks = document.querySelectorAll(".mobile-link");

function openMobileMenu() {
  hamburger.classList.add("active");
  mobileMenu.classList.add("active");
  document.body.classList.add("menu-open");
  document.body.style.overflow = "hidden";
}

function closeMobileMenu() {
  hamburger.classList.remove("active");
  mobileMenu.classList.remove("active");
  document.body.classList.remove("menu-open");
  document.body.style.overflow = "auto";
}

hamburger.addEventListener("click", () => {
  if (mobileMenu.classList.contains("active")) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
});

closeMenu.addEventListener("click", closeMobileMenu);

mobileLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    closeMobileMenu();

    setTimeout(() => {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  });
});

const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const btn = document.querySelector('#contactForm button[type="submit"]');
  const btnText = document.getElementById("btnText");
  const successMsg = document.getElementById("successMsg");
  const errorMsg = document.getElementById("errorMsg");

  btnText.textContent = "Sending...";
  btn.disabled = true;
  successMsg.classList.add("hidden");
  errorMsg.classList.add("hidden");

  emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this).then(
    () => {
      btnText.textContent = "Send Message";
      btn.disabled = false;
      successMsg.classList.remove("hidden");
      errorMsg.classList.add("hidden");
      this.reset();

      setTimeout(() => {
        successMsg.classList.add("hidden");
      }, 5000);
    },
    () => {
      btnText.textContent = "Send Message";
      btn.disabled = false;
      errorMsg.classList.remove("hidden");
      successMsg.classList.add("hidden");

      setTimeout(() => {
        errorMsg.classList.add("hidden");
      }, 5000);
    }
  );
});

window.addEventListener("load", () => {
  type();
  document.getElementById("year").textContent = new Date().getFullYear();
});

document
  .querySelectorAll(".nav-link, .btn-primary, .btn-secondary")
  .forEach((anchor) => {
    if (
      anchor.getAttribute("href") &&
      anchor.getAttribute("href").startsWith("#")
    ) {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }
  });

document.addEventListener("click", (e) => {
  if (
    mobileMenu.classList.contains("active") &&
    !mobileMenu.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    closeMobileMenu();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
    closeMobileMenu();
  }
});
