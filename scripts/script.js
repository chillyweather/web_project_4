const initialCards = [
  {
    name: 'Yosemite Valley',
    link: 'https://code.s3.yandex.net/web-code/yosemite.jpg',
  },
  {
    name: 'Lake Louise',
    link: 'https://code.s3.yandex.net/web-code/lake-louise.jpg',
  },
  {
    name: 'Bald Mountains',
    link: 'https://code.s3.yandex.net/web-code/bald-mountains.jpg',
  },
  {
    name: 'Latemar',
    link: 'https://code.s3.yandex.net/web-code/latemar.jpg',
  },
  {
    name: 'Vanoise National Park',
    link: 'https://code.s3.yandex.net/web-code/vanoise.jpg',
  },
  {
    name: 'Lago di Braies',
    link: 'https://code.s3.yandex.net/web-code/lago.jpg',
  },
];

// buttons

const profileEditButton = document.querySelector('.profile__edit-button');

const popupForm = document.querySelector('.popup');

const popupCloseButton = document.querySelector('.popup__close-button');

// creating element card from template

// initial cards

// form inputs
const nameInput = document.querySelector('.popup__submit-text_content_name');
const jobInput = document.querySelector('.popup__submit-text_content_about');

// text in profile
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const form = document.querySelector('.popup__content');

// functions

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

// initialCards.forEach((item) => {
//   const elementTemplate = document.querySelector('#element-template').content.querySelector('.element');
// });

initialCards.forEach((item) => {
  const elementTemplate = document.querySelector('#element-template').content;
  const elementsContainer = document.querySelector('.elements__container');

  const newElement = elementTemplate.querySelector('.element').cloneNode(true);

  newElement.querySelector('.element__title').textContent = item.name;
  newElement.querySelector('.element__image').src = item.link;

  elementsContainer.append(newElement);
});

// event listeners

form.addEventListener('submit', submitData);
profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
