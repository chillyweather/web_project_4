const popupForm = document.querySelector('.popup');

const popupCloseButton = document.querySelector('.popup__close-button');

const profileEditButton = document.querySelector('.profile__edit-button');

const submitProfileInfoButton = document.querySelector('.popup__submit-button');

// form inputs
const inputName = document.querySelector('.popup__submit-text_name');
const inputAbout = document.querySelector('.popup__submit-text_about');

// text in profile
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

// toggle popup window function

function togglePopup() {
  popupForm.classList.toggle('popup_opened');
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;

}

// update profile info function

function submitProfileInfo(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  togglePopup();
}

profileEditButton.addEventListener('click', togglePopup);

popupCloseButton.addEventListener('click', togglePopup);

submitProfileInfoButton.addEventListener('click', submitProfileInfo);
