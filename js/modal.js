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
    if (localStorage.getItem('modalEjali') === 'false') {
      closeModal();
    } else {
      openModal();
    }
    // Set localStorage to false
    localStorage.setItem('modalEjali', false);
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

//Listen for escape key to close modal
document.addEventListener('keyup', function(event) {
  if (event.defaultPrevented) {
    return;
  }
  var key = event.key || event.keyCode;

  if (key === 'Escape' || key === 'Esc' || key === 27) {
    closeModal();
  }
});

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
