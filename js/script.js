// Scroll animations
document.addEventListener('DOMContentLoaded', function() {
  // Intersection Observer for animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, observerOptions);

  // Observe all section elements for animations
  document.querySelectorAll('.section, .project-card, .timeline-item').forEach(element => {
    element.classList.add('fade-element');
    fadeObserver.observe(element);
  });

  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.classList.toggle('nav-open');
    });
  }

  // Close mobile nav when clicking on links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.classList.remove('nav-open');
    });
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for header height
          behavior: 'smooth'
        });
      }
    });
  });

  // Add active class to nav links on scroll
  const sections = document.querySelectorAll('section[id]');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        document.querySelectorAll('.nav-links a').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: '-100px 0px -300px 0px'
  });

  sections.forEach(section => {
    navObserver.observe(section);
  });

  // Add scroll indicator animation
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Parallax effect for hero section
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition < window.innerHeight) {
        const translateY = scrollPosition * 0.3;
        heroSection.style.transform = `translateY(${translateY}px)`;
      }
    });
  }

  // Typing animation for hero greeting
  function typeGreeting(text, elementId, speed = 70) {
    const el = document.getElementById(elementId);
    let i = 0;
    function type() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    el.textContent = '';
    type();
  }

  typeGreeting('Hi, my name is', 'typing-greeting', 70);
}); 