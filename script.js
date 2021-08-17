const heartToggle = document.querySelector('.element__like-icon');

function toggleHeart() {
  if (heartToggle.src = './images/svg/Heart.svg') {
    heartToggle.setAttribute('src', './images/svg/Heart_black.svg');
  } else {
    heartToggle.setAttribute('src', './images/svg/Heart.svg');
  }
}

heartToggle.addEventListener('click', toggleHeart);
