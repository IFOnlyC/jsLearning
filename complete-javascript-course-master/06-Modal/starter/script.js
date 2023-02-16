'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeModalBtn = document.querySelector('.close-modal');

const showModal = document.querySelectorAll('.show-modal');

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const openModal = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

showModal.forEach(m => {
  m.addEventListener('click', openModal);
});

// not closeModal()
// because it will call the function as soon as the JavaScript loads
closeModalBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
