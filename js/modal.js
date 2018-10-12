/**
 * VARIABLES
 */
// Fetch data endpoint
const endpoint =
  'https://raw.githubusercontent.com/pndiogo/ejali-maps/master/README.md';

// Get open modal button
const modalBtn = document.getElementById('modalBtn');

// Get modal element
const modal = document.getElementById('simpleModal');

// Get modal body
const modalBody = document.querySelector('.modal-body');

// Get close button
const closeBtn = document.getElementById('closeBtn');

/**
 * FETCH DATA
 */
fetch(endpoint)
  .then(res => res.text())
  .then(res => {
    let converter = new showdown.Converter();
    modalBody.innerHTML = converter.makeHtml(res);
  });

/**
 * EVENT LISTENERS
 */
// Listen for open click
modalBtn.addEventListener('click', openModal);

// Listen for close click
closeBtn.addEventListener('click', closeModal);

// Listen for outside click
window.addEventListener('click', clickOutside);

/**
 * FUNCTIONS
 */
// Function to open modal
function openModal() {
  modal.style.display = 'block';
}

// Function to close modal
function closeModal() {
  modal.style.display = 'none';
}

// Function to close modal if outside click
function clickOutside(e) {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
}
