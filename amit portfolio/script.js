/* ═══════════════════════════════════════
   PORTFOLIO — DARK MODERN
   script.js
═══════════════════════════════════════ */

// ── GLOBAL THEME TOGGLE FUNCTION ──────
window.toggleTheme = function() {
  console.log('Button clicked - toggleTheme called');
  const btn = document.getElementById('themeToggle');
  const body = document.body;
  
  body.classList.toggle('light-mode');
  const isLight = body.classList.contains('light-mode');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  
  if (btn) {
    btn.textContent = isLight ? '☀️' : '🌙';
  }
  console.log('Theme toggled to:', isLight ? 'LIGHT MODE' : 'DARK MODE');
};

window.openCertificateModal = function(trigger) {
  const modal = document.getElementById('certificateModal');
  const frame = document.getElementById('certificateFrame');
  const title = document.getElementById('certificateModalTitle');
  const download = document.getElementById('certificateDownload');

  if (!modal || !frame || !title || !download) return;

  const pdf = trigger?.getAttribute('data-pdf') || 'CV.pdf';
  const modalTitle = trigger?.getAttribute('data-title') || 'Certificate';
  const safeName = modalTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  title.textContent = modalTitle;
  frame.src = pdf;
  download.href = pdf;
  download.download = `${safeName || 'certificate'}.pdf`;
  modal.style.display = 'block';
};

window.closeCertificateModal = function() {
  const modal = document.getElementById('certificateModal');
  if (modal) modal.style.display = 'none';
};

window.openMarksheetModal = function(trigger) {
  const modal = document.getElementById('marksheetModal');
  const frame = document.getElementById('marksheetFrame');
  const title = document.getElementById('marksheetModalTitle');
  const download = document.getElementById('marksheetDownload');

  if (!modal || !frame || !title || !download) return;

  const pdf = trigger?.getAttribute('data-pdf') || 'assets/CV.pdf';
  const modalTitle = trigger?.getAttribute('data-title') || 'Marksheet';
  const safeName = modalTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  title.textContent = modalTitle;
  frame.src = pdf;
  download.href = pdf;
  download.download = `${safeName || 'marksheet'}.pdf`;
  modal.style.display = 'block';
};

window.closeMarksheetModal = function() {
  const modal = document.getElementById('marksheetModal');
  if (modal) modal.style.display = 'none';
};

window.openPaperModal = function(trigger) {
  const modal = document.getElementById('paperModal');
  const frame = document.getElementById('paperFrame');
  const title = document.getElementById('paperModalTitle');
  const download = document.getElementById('paperDownload');

  if (!modal || !frame || !title || !download) return;

  const pdf = trigger?.getAttribute('data-pdf') || '';
  const modalTitle = trigger?.getAttribute('data-title') || 'Research Paper';
  const safeName = modalTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  title.textContent = modalTitle;
  frame.src = pdf;
  download.href = pdf;
  download.download = `${safeName || 'paper'}.pdf`;
  modal.style.display = 'block';
};

window.closePaperModal = function() {
  const modal = document.getElementById('paperModal');
  if (modal) modal.style.display = 'none';
};

document.addEventListener('DOMContentLoaded', () => {
  const CONTACT_EMAIL = 'amitsingh.bee@gmail.com';

  const showFormStatus = (message, isSuccess) => {
    if (!successMsg) return;
    successMsg.textContent = message;
    successMsg.style.color = isSuccess ? '#4ade80' : '#ff6b6b';
    successMsg.style.borderColor = isSuccess ? 'rgba(74, 222, 128, 0.2)' : 'rgba(255, 107, 107, 0.35)';
    successMsg.style.background = isSuccess ? 'rgba(74, 222, 128, 0.08)' : 'rgba(255, 107, 107, 0.12)';
    successMsg.style.display = 'block';
  };

  // ── THEME TOGGLE ────────────────────────
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  
  // Load saved theme on page load
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    if (themeToggle) themeToggle.textContent = '☀️';
    console.log('Loaded LIGHT mode from storage');
  } else {
    document.body.classList.remove('light-mode');
    if (themeToggle) themeToggle.textContent = '🌙';
    console.log('Loaded DARK mode from storage');
  }
  
  // Add event listener
  if (themeToggle) {
    themeToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.toggleTheme();
    });
    console.log('Click listener added to theme toggle button');
  }

  // ── NAV SCROLL ──────────────────────────
  const nav = document.getElementById('nav');
  const homeSection = document.getElementById('home');

  if (nav) {
    let lastScroll = window.scrollY;
    
    // Initial state
    nav.classList.add('nav--visible');

    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      
      if (currentScroll > 80 && currentScroll > lastScroll) {
        // Scrolling down & past 80px: hide nav
        nav.classList.remove('nav--visible');
      } else {
        // Scrolling up or at the very top: show nav
        nav.classList.add('nav--visible');
      }
      
      lastScroll = currentScroll;
    });
  }

  // ── HAMBURGER (mobile) ──────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav__links');
  
  if (hamburger && navLinks) {
    let menuOpen = false;

    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      menuOpen = !menuOpen;
      if (menuOpen) {
        navLinks.classList.add('mobile-open');
      } else {
        navLinks.classList.remove('mobile-open');
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (menuOpen && !hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        menuOpen = false;
        navLinks.classList.remove('mobile-open');
      }
    });

    // Close menu on link click
    document.querySelectorAll('.nav__links a').forEach(link => {
      link.addEventListener('click', () => {
        menuOpen = false;
        navLinks.classList.remove('mobile-open');
      });
    });
  }

  // ── REVEAL ON SCROLL ───────────────────
  const revealElements = document.querySelectorAll(
    '.section-label, .section-title, .skill-card, .project-card, .testi-card, .about__grid, .contact__grid, .hero__stats'
  );
  revealElements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => observer.observe(el));

  // ── STAGGERED CARD REVEAL ──────────────
  const cardGroups = [
    document.querySelectorAll('.skill-card'),
    document.querySelectorAll('.project-card'),
    document.querySelectorAll('.education-item'),
    document.querySelectorAll('.testi-card'),
  ];

  cardGroups.forEach(cards => {
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = entry.target.parentElement.querySelectorAll('.reveal');
          cards.forEach((card, i) => {
            setTimeout(() => card.classList.add('visible'), i * 120);
          });
          cardObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    cards.forEach(card => cardObserver.observe(card));
  });

  // ── SKILL BAR ANIMATION ────────────────
  const skillBars = document.querySelectorAll('.skill-bar__fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const targetWidth = fill.getAttribute('data-width');
        setTimeout(() => {
          fill.style.width = targetWidth;
        }, 200);
        skillObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  skillBars.forEach(bar => skillObserver.observe(bar));

  // ── CONTACT FORM ───────────────────────
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');

  if (form && successMsg) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      successMsg.style.display = 'none';

      const formData = new FormData(form);
      // Add the Web3Forms access key
      formData.append("access_key", "69b0f5fa-7e99-4d81-97c0-3c1783e14eb0");

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });
        const result = await response.json();

        if (response.status === 200) {
          showFormStatus('✅ Message sent successfully! I will get back to you soon.', true);
          form.reset();
        } else {
          showFormStatus('❌ ' + (result.message || 'Something went wrong!'), false);
        }
      } catch (error) {
        showFormStatus('❌ Network error! Please try again.', false);
      } finally {
        btn.textContent = originalText;
        btn.disabled = false;
      }
    });
  }

  // ── ACTIVE NAV LINK (scrollspy) ────────
  const sections = document.querySelectorAll('section[id]');
  const navMenuLinks = document.querySelectorAll('.nav__links a');

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navMenuLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.style.color = '#c9a84c';
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => spyObserver.observe(s));

  // ── TYPEWRITER EFFECT (hero sub) ──────
  const subEl = document.querySelector('.hero__sub');
  if (subEl) {
    const texts = ['Innovative · Technical · Results-Driven', 'AI Engineer · Problem Solver', 'Building Intelligent Systems'];
    let textIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let pauseTimer = null;

    const type = () => {
      const current = texts[textIndex];
      if (!deleting) {
        subEl.textContent = current.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          deleting = true;
          pauseTimer = setTimeout(type, 2200);
          return;
        }
      } else {
        subEl.textContent = current.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          deleting = false;
          textIndex = (textIndex + 1) % texts.length;
        }
      }
      setTimeout(type, deleting ? 40 : 80);
    };
    setTimeout(type, 1500);
  }

  // ── PARALLAX ORBS ──────────────────────
  const orb1 = document.querySelector('.orb--1');
  const orb2 = document.querySelector('.orb--2');
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    if (orb1) orb1.style.transform = `translate(${x}px, ${y}px)`;
    if (orb2) orb2.style.transform = `translate(${-x}px, ${-y}px)`;
  });

  // ── COUNTER ANIMATION (stats) ─────────
  const statNums = document.querySelectorAll('.stat__num');
  const targets = [5, 40, 20];

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statNums.forEach((el, i) => {
          let count = 0;
          const target = targets[i];
          const step = Math.ceil(target / 30);
          const interval = setInterval(() => {
            count = Math.min(count + step, target);
            el.textContent = count + '+';
            if (count >= target) clearInterval(interval);
          }, 40);
        });
        counterObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const statsEl = document.querySelector('.hero__stats');
  if (statsEl) counterObserver.observe(statsEl);

  // ── MODAL CLICK-OUTSIDE TO CLOSE ──────
  const cvModal = document.getElementById('cvModal');
  const paperModal = document.getElementById('paperModal');
  const certificateModal = document.getElementById('certificateModal');
  const marksheetModal = document.getElementById('marksheetModal');

  if (cvModal) {
    cvModal.addEventListener('click', (e) => {
      if (e.target === cvModal) {
        cvModal.style.display = 'none';
      }
    });
  }

  if (paperModal) {
    paperModal.addEventListener('click', (e) => {
      if (e.target === paperModal) {
        paperModal.style.display = 'none';
      }
    });
  }

  if (certificateModal) {
    certificateModal.addEventListener('click', (e) => {
      if (e.target === certificateModal) {
        certificateModal.style.display = 'none';
      }
    });
  }

  if (marksheetModal) {
    marksheetModal.addEventListener('click', (e) => {
      if (e.target === marksheetModal) {
        marksheetModal.style.display = 'none';
      }
    });
  }

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (cvModal) cvModal.style.display = 'none';
      if (paperModal) paperModal.style.display = 'none';
      if (certificateModal) certificateModal.style.display = 'none';
      if (marksheetModal) marksheetModal.style.display = 'none';
    }
  });

});
