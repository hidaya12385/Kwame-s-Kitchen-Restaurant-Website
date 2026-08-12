// ===== Hamburger menu toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
  navToggle.classList.toggle('open');

  // Change icon shape: ☰ when closed, ✕ when open
  if (navToggle.classList.contains('open')) {
    navToggle.innerHTML = '&#10005;'; // ✕
  } else {
    navToggle.innerHTML = '&#9776;'; // ☰
  }
});

// Optional: close menu after clicking a link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
    navToggle.classList.remove('open');
    navToggle.innerHTML = '&#9776;';
  });
});

// ===== Hero slider =====
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentSlide = 0;

function showSlide(index) {
  if (index >= slides.length) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = slides.length - 1;
  } else {
    currentSlide = index;
  }

  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

// Only run slider logic if the slider actually exists on this page
if (prevBtn && nextBtn) {
  nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
  prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const slideIndex = parseInt(dot.getAttribute('data-slide'));
      showSlide(slideIndex);
    });
  });

  setInterval(() => {
    showSlide(currentSlide + 1);
  }, 5000);
}


// ===== Menu page: render + filter =====
// Only runs if menuGrid exists on the page (so it won't break other pages)
const menuGrid = document.getElementById('menuGrid');

if (menuGrid) {
  // Build one card's HTML from a menu item object
  function createMenuCard(item) {
    return `
      <div class="menu-card" data-category="${item.category}">
        <div>
          <span class="tag">${item.category}</span>
          <h3>${item.name}</h3>
          <p>${item.description}</p>
        </div>
        <span class="price-tag">GH₵${item.price}</span>
      </div>
    `;
  }

  // Render a list of items into the grid
  function renderMenu(items) {
    menuGrid.innerHTML = items.map(createMenuCard).join('');
  }

  // Initial render — show everything
  renderMenu(menuItems);

  // ===== Filter buttons =====
  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // highlight the clicked button, un-highlight the rest
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const category = button.getAttribute('data-category');

      if (category === 'all') {
        renderMenu(menuItems);
      } else {
        const filtered = menuItems.filter(item => item.category === category);
        renderMenu(filtered);
      }
    });
  });
}

// ===== Gallery lightbox =====
const lightbox = document.getElementById('lightbox');

if (lightbox) {
  const galleryImgs = document.querySelectorAll('.gallery-img');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  galleryImgs.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('show');
    });
  });

  lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('show');
  });

  // Also close if you click the dark background (not the image itself)
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('show');
    }
  });
}

// ===== Contact page: reservation form validation =====
const reservationForm = document.getElementById('reservationForm');

if (reservationForm) {
  const nameInput = document.getElementById('name');
  const phoneInput = document.getElementById('phone');
  const dateInput = document.getElementById('date');
  const timeInput = document.getElementById('time');
  const formSuccess = document.getElementById('formSuccess');

  reservationForm.addEventListener('submit', (e) => {
    e.preventDefault(); // stop the page from reloading

    let isValid = true;

    // Reset previous errors first
    [nameInput, phoneInput, dateInput, timeInput].forEach(input => {
      input.classList.remove('invalid');
    });
    document.querySelectorAll('.error-msg').forEach(msg => msg.textContent = '');

    // Name check
    if (nameInput.value.trim() === '') {
      showError(nameInput, 'nameError', 'Please enter your name');
      isValid = false;
    }

    // Phone check — must be at least 10 digits
    const phoneDigits = phoneInput.value.replace(/\D/g, ''); // strip non-numbers
    if (phoneDigits.length < 10) {
      showError(phoneInput, 'phoneError', 'Enter a valid phone number');
      isValid = false;
    }

    // Date check — must not be empty or in the past
    if (dateInput.value === '') {
      showError(dateInput, 'dateError', 'Please choose a date');
      isValid = false;
    } else {
      const chosenDate = new Date(dateInput.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (chosenDate < today) {
        showError(dateInput, 'dateError', 'Date cannot be in the past');
        isValid = false;
      }
    }

    // Time check
    if (timeInput.value === '') {
      showError(timeInput, 'timeError', 'Please choose a time');
      isValid = false;
    }

    // If everything passed, show success and reset the form
    if (isValid) {
      formSuccess.classList.add('show');
      reservationForm.reset();

      // Hide the success message after a few seconds
      setTimeout(() => {
        formSuccess.classList.remove('show');
      }, 5000);
    }
  });

  // Helper: mark a field invalid and show its error message
  function showError(input, errorId, message) {
    input.classList.add('invalid');
    document.getElementById(errorId).textContent = message;
  }
}

// ===== Back to top button =====
const backToTop = document.getElementById('backToTop');

if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
