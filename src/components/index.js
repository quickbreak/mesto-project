// импорт главного файла стилей
import "../pages/index.css";
// импорт чего-либо из других js-модулей
// import { initialCards } from './cards';
import { createCard, displayNewCard } from "./card";
import { openModal, closeModal } from "./modal";

let myPersonalId;

// DOM узлы
const placesList = document.querySelector(".places__list");
const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const avatarPopup = document.querySelector(".popup_type_avatar");

// Делаем анимации плавными
profilePopup.classList.add(".popup_is-animated");
cardPopup.classList.add(".popup_is-animated");
imagePopup.classList.add(".popup_is-animated");
avatarPopup.classList.add(".popup_is-animated");

// Открытие окна редактирования профиля
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(
  ".popup__input_type_description"
);
const profileInfo = document.querySelector(".profile__info");
const profileTitle = profileInfo.querySelector(".profile__title");
const profileDescription = profileInfo.querySelector(".profile__description");
function onProfileEdit(evt) {
  evt.stopPropagation();
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(profilePopup, validationSettings);
}
const editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener("click", onProfileEdit);
// Закрытие окна редактирования профиля
function onProfileClose() {
  closeModal(profilePopup);
}
const closeProfileButton = document
  .querySelector(".popup_type_edit")
  .querySelector(".popup__close");
closeProfileButton.addEventListener("click", onProfileClose);

// Обновление информации профиля
import { patchProfileInfo } from "./api";

const profileFormElement = profilePopup.querySelector(".popup__form");
const saveProfileInfoButtonElement =
  profileFormElement.querySelector(".popup__button");
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  saveProfileInfoButtonElement.textContent = "Сохранение...";
  const name = nameInput.value;
  const description = descriptionInput.value;
  patchProfileInfo(name, description)
    .then((result) => {
      console.log("Ответ на запрос обновления профиля");
      console.log(result);
      profileTitle.textContent = name;
      profileDescription.textContent = description;
      onProfileClose();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      saveProfileInfoButtonElement.textContent = "Сохранить";
    });
}
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

// Открытие окна добавления карточки
const titleInput = cardPopup.querySelector(".popup__input_type_card-name");
const linkInput = cardPopup.querySelector(".popup__input_type_url");
function onCardAdd(evt) {
  evt.stopPropagation();
  titleInput.value = "";
  linkInput.value = "";
  openModal(cardPopup, validationSettings);
}
const addCardButton = document.querySelector(".profile__add-button");
addCardButton.addEventListener("click", onCardAdd);
// Закрытие окна добавления карточки
function onCardClose() {
  closeModal(cardPopup);
}
const closeCardButton = cardPopup.querySelector(".popup__close");
closeCardButton.addEventListener("click", onCardClose);

// Создание новой карточки
import { postNewCard } from "./api";

const cardFormElement = cardPopup.querySelector(".popup__form");
const postNewCardButtonElement =
  cardFormElement.querySelector(".popup__button");
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  postNewCardButtonElement.textContent = "Сохранение...";
  postNewCard(titleInput.value, linkInput.value)
    .then((result) => {
      console.log("Ответ на запрос отправки новой карточки:");
      console.log(result);
      displayNewCard(result, myPersonalId, onCardShow);
      onCardClose();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      postNewCardButtonElement.textContent = "Сохранить";
    });
}
cardFormElement.addEventListener("submit", handleCardFormSubmit);

// Открытие окна просмотра картинки
const imageToShow = imagePopup.querySelector(".popup__image");
const captionToShowLink = imagePopup.querySelector(".popup__caption");
function onCardShow(evt) {
  evt.stopPropagation();
  const img = evt.target;
  const link = img.src;
  const card = img.closest(".card");
  const title = card.querySelector(".card__title");
  imageToShow.src = link;
  imageToShow.alt = title.textContent;
  captionToShowLink.textContent = imageToShow.alt;
  openModal(imagePopup, validationSettings);
}
// Закрытие окна просмотра картинки
function onCardShowClose() {
  closeModal(imagePopup);
}
const closeShowButton = imagePopup.querySelector(".popup__close");
closeShowButton.addEventListener("click", onCardShowClose);

import { enableValidation } from "./validate";

// Создание объекта с настройками валидации
const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation(validationSettings);

// Отобразить информацию о пользователе
const profileImageElement = document.querySelector(".profile__image");
function setProfileInfo(profileInfoObject) {
  profileTitle.textContent = profileInfoObject.name;
  profileDescription.textContent = profileInfoObject.about;
  profileImageElement.src = profileInfoObject.avatar;
  console.log("Полученная информация о пользователе");
  console.log(profileInfoObject);
  myPersonalId = profileInfoObject._id;
}

import { getProfileInfo } from "./api";

getProfileInfo()
  .then((result) => {
    setProfileInfo(result);
  })
  .catch((err) => {
    console.log(err);
  });

// Отобразить начальные карточки
function setInitialCards(cardList) {
  cardList.forEach((card) => {
    const newCard = createCard(card, myPersonalId, onCardShow);
    console.log(`Полученная карточка:`);
    console.log(card);
    placesList.appendChild(newCard);
  });
}

import { getInitialCards } from "./api";

getInitialCards()
  .then((result) => {
    setInitialCards(result);
  })
  .catch((err) => {
    console.log(err);
  });

// Открытие окна изменения автара
const avatarLinkInput = avatarPopup.querySelector(".popup__input_type_url");
function onAvatarEdit(evt) {
  evt.stopPropagation();
  avatarLinkInput.value = "";
  openModal(avatarPopup, validationSettings);
}
const avatarElement = document.querySelector(".profile__image-container");
avatarElement.addEventListener("click", onAvatarEdit);
// Закрытие окна изменения автара
function onAvatarClose() {
  closeModal(avatarPopup);
}
const closeAvatarButton = avatarPopup.querySelector(".popup__close");
closeAvatarButton.addEventListener("click", onAvatarClose);

// Обновление аватара
import { patchProfileAvatar } from "./api";

const avatarFormElement = avatarPopup.querySelector(".popup__form");
const saveAvatarButton = avatarFormElement.querySelector(".popup__button");
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  saveAvatarButton.textContent = "Сохранение...";
  const link = avatarLinkInput.value;
  profileImageElement.src = link;
  patchProfileAvatar(link)
    .then((result) => {
      console.log("Ответ на запрос замены автара:");
      console.log(result);
      onAvatarClose();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      saveAvatarButton.textContent = "Сохранить";
    });
}
avatarFormElement.addEventListener("submit", handleAvatarFormSubmit);
