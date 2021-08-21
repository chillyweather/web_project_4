const profileEditButton = document.querySelector('.profile__edit-button');

const popupForm = document.querySelector('.popup');

const popupCloseButton = document.querySelector('.popup__close-button');

// form inputs
const nameInput = document.querySelector('.popup__submit-text_content_name');
const jobInput = document.querySelector('.popup__submit-text_content_about');

// text in profile
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const form = document.querySelector('.popup__content');

function openPopup() {
  popupForm.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
}

function closePopup() {
  popupForm.classList.remove('popup_opened');
}

function submitData(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup();
}

form.addEventListener('submit', submitData);

profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
