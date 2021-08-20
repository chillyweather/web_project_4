let profileEditButton = document.querySelector('.profile__edit-button');

let popupForm = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-button');
let submitProfileInfoButton = document.querySelector('.popup__submit-button');

// form inputs
let inputName = document.querySelector('.popup__submit-text_content_name');
let inputAbout = document.querySelector('.popup__submit-text_content_about');

// text in profile
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

// toggle popup window function
function togglePopup() {
  popupForm.classList.toggle('popup_opened');
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
}

function submitProfileInfo(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  togglePopup();
}

submitProfileInfoButton.addEventListener('click', submitProfileInfo);
profileEditButton.addEventListener('click', togglePopup);
popupCloseButton.addEventListener('click', togglePopup);
