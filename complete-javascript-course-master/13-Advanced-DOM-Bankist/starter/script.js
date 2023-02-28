'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const slides = document.querySelectorAll('.slide');
const slider = document.querySelectorAll('.slider');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Button Scolling

btnScrollTo.addEventListener('click', function (e) {
  const sc1coords = section1.getBoundingClientRect();
  console.log(sc1coords);

  console.log(e.target.getBoundingClientRect());
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'Height, Width of the viewport',
    document.documentElement.clientHeight,
    document.documentElement.width
  );

  // Scrolling
  // current position + current scroll
  // // Method 1
  // window.scrollTo(
  //   sc1coords.left + window.scrollX,
  //   sc1coords.top + window.scrollY
  // );

  // // Method 2
  // window.scrollTo({
  //   left: sc1coords.left + window.scrollX,
  //   top: sc1coords.top + window.scrollY,
  //   behavior: 'smooth',
  // });

  // Method 3 (only works in modern browsers)
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Page Navigation
// not efficient, what if we have 1000, 100000 links
// we will have a lot of copies of the same callback function

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
// Tabbed Component
tabsContainer.addEventListener('click', function (e) {
  const clickedTab = e.target.closest('.operations__tab');
  if (!clickedTab) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(tc => tc.classList.remove('operations__content--active'));
  clickedTab.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clickedTab.dataset.tab}`)
    .classList.add('operations__content--active');
  // document
  //   .querySelector(
  //     `.operations__content--${clickedTab.getAttribute('data-tab')}`
  //   )
  //   .classList.add('operations__content--active');
});

///////////////////////////////////////
// Menu Fade Animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    // console.log(this);
    siblings.forEach(ele => {
      if (ele !== link) ele.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
// Passing 'arguement' into handler
// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 1);
// });

///////////////////////////////////////
// Sticky Navigation (Intersection Server API)
const navHeight = nav.getBoundingClientRect().height;
const observeOptions = {
  root: null, // => viewport
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};
const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, observeOptions);
headerObserver.observe(header);

///////////////////////////////////////
// Reveal Sections
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

///////////////////////////////////////
// Lazy Loading Imgs
const imgTargets = document.querySelectorAll('img[data-src]');
const lazyLoadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  // Replace img src with data src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function (e) {
    // e.preventDefault();
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(lazyLoadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTargets.forEach(img => {
  imgObserver.observe(img);
});

///////////////////////////////////////
// Slider Component
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotsContainer = document.querySelector('.dots');

let curSlide = 0;
const maxSlide = slides.length;
const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

goToSlide(0);

// Next slide
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

// Previous slide
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

// Create dots
const createDots = function () {
  slides.forEach((_, i) => {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data__slide="${i}"></button>`
    );
  });
};
createDots();

const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data__slide="${slide}"]`)
    .classList.add('dots__dot--active');
};
activateDot(0);

// Event handlers
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});

dotsContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    // console.log(e.target);
    const slide = e.target.getAttribute('data__slide');
    console.log(slide);
    goToSlide(slide);
    activateDot(slide);
  }
});

///////////////////////////////////////
///////////////////////////////////////
// LECTURE

// creating and inserting elements
const message = document.createElement('div');
message.classList.add('cookie-message');

message.innerHTML =
  'We use cookie message for improved functionality and analytics. <button class="btn btn--close--cookie">Got it!</button>';
header.append(message);
// header.prepend(message);

// header.before(message);
// header.after(message);

document
  .querySelector('.btn--close--cookie')
  .addEventListener('click', function () {
    // message.remove();
    message.parentElement.removeChild(message);
  });

message.style.backgroundColor = '#37383d';
message.style.width = '120%';
console.log(message.style.color); // we will get nothing
console.log(message.style.backgroundColor);
console.log(getComputedStyle(message).color);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// Events: events types and eventhandler
const h1 = document.querySelector('h1');
h1.addEventListener('mouseenter', function (e) {
  // console.log('addEventListener: You are reading the heading!');
});

h1.onmouseenter = function (e) {
  // console.log('onmouseenter: You are reading the heading!');
};

// capturing phase (⬇) & bubbling phase（⬆）
// => event propagation
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   console.log('LINK: ', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);

//   // Stop propagation
//   // e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   console.log('LINK: ', e.target, e.currentTarget);
// });

// event is listening for the capturing phase
// so the NAV will appear first
// because in the capturing phase, the event will pass through 'NAV' first
/*
document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    console.log('LINK: ', e.target, e.currentTarget);
  },
  true
);
*/
