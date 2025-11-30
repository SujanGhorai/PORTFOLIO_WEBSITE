
// 1. Initialize EmailJS
// IMPORTANT: You must replace 'YOUR_PUBLIC_KEY' with your actual EmailJS Public Key.
(function () {
    emailjs.init("YOUR_PUBLIC_KEY"); // <--- REPLACE THIS
})();

// 2. Typewriter Effect
const words = ["Developer", "Designer", "Freelancer", "Creator"];
let i = 0;
let timer;

function typeWriter() {
    const heading = document.getElementById("typewriter");
    const word = words[i];
    let current = heading.innerText;

    if (current.length < word.length) {
        heading.innerText = word.substring(0, current.length + 1);
        timer = setTimeout(typeWriter, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    const heading = document.getElementById("typewriter");
    let current = heading.innerText;

    if (current.length > 0) {
        heading.innerText = current.substring(0, current.length - 1);
        timer = setTimeout(erase, 50);
    } else {
        i = (i + 1) % words.length;
        setTimeout(typeWriter, 500);
    }
}

window.onload = () => {
    typeWriter();
    document.getElementById('year').innerText = new Date().getFullYear();
};

// 3. Scroll Reveal Animation (Intersection Observer)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-el');
        }
    });
}, observerOptions);

document.querySelectorAll('.hidden-el').forEach(el => observer.observe(el));

// 4. Mobile Menu Logic
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const body = document.body;
let isMenuOpen = false;

menuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        mobileMenu.classList.add('mobile-menu-open');
        menuBtn.classList.add('nav-active');
        body.style.overflow = 'hidden'; // Lock scroll
    } else {
        mobileMenu.classList.remove('mobile-menu-open');
        menuBtn.classList.remove('nav-active');
        body.style.overflow = 'auto'; // Unlock scroll
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        isMenuOpen = false;
        mobileMenu.classList.remove('mobile-menu-open');
        menuBtn.classList.remove('nav-active');
        body.style.overflow = 'auto';
    });
});

// 5. Contact Form Handling with EmailJS
document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const btn = document.getElementById('submit-btn');
    const originalText = btn.innerHTML;
    const successMsg = document.getElementById('success-msg');
    const errorMsg = document.getElementById('error-msg');

    // Set loading state
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    successMsg.classList.add('hidden');
    errorMsg.classList.add('hidden');

    // Send Email
    // IMPORTANT: Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with actual EmailJS IDs
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
        .then(function () {
            console.log('SUCCESS!');
            btn.innerHTML = originalText;
            btn.disabled = false;
            successMsg.classList.remove('hidden');
            document.getElementById('contact-form').reset();
        }, function (error) {
            console.log('FAILED...', error);
            btn.innerHTML = originalText;
            btn.disabled = false;
            errorMsg.classList.remove('hidden');
        });
});

// 6. Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('shadow-lg');
    } else {
        nav.classList.remove('shadow-lg');
    }
});
