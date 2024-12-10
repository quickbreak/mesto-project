import { initialCards } from './cards';
import { createCard } from './card';
import { openModal, closeModal } from './modal';

// DOM узлы
const placesList = document.querySelector(".places__list");
const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");


// Делаем анимации плавными
profilePopup.classList.add(".popup_is-animated");
cardPopup.classList.add(".popup_is-animated");
imagePopup.classList.add(".popup_is-animated");


// Выводим начальные карточки на страницу
initialCards.forEach((card) => {
    const newCard = createCard(card.link, card.name, showCard);
    placesList.appendChild(newCard);
})


// Открытие окна редактирования профиля
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');
const profileInfo = document.querySelector(".profile__info");
const profileTitle = profileInfo.querySelector(".profile__title");
const profileDescription = profileInfo.querySelector(".profile__description");
function onProfileEdit(evt) {
    evt.stopPropagation();
    nameInput.value = profileTitle.textContent;
    descriptionInput.value = profileDescription.textContent;
    openModal(profilePopup);
}
const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener("click", onProfileEdit);
// Закрытие окна редактирования профиля
function onProfileClose() {
    closeModal(profilePopup);
}
const closeProfileButton = document.querySelector(".popup_type_edit").querySelector(".popup__close");
closeProfileButton.addEventListener("click", onProfileClose);


// Сохранение изменённого профиля
const profileFormElement = profilePopup.querySelector(".popup__form");
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 
    const name = nameInput.value;
    const descriptionInput = descriptionInputInput.value;
    profileTitle.textContent = name;
    profileDescription.textContent = descriptionInput;
    onProfileClose();
}
profileFormElement.addEventListener('submit', handleProfileFormSubmit);


// Открытие окна добавления карточки
const titleInput = document.querySelector('.popup__input_type_card-name');
const linkInput = document.querySelector('.popup__input_type_url');
function onCardAdd(evt) {
    evt.stopPropagation();
    titleInput.value = "";
    linkInput.value = "";
    openModal(cardPopup);
}
const addCardButton = document.querySelector('.profile__add-button');
addCardButton.addEventListener("click", onCardAdd);
// Закрытие окна добавления карточки
function onCardClose() {
    closeModal(cardPopup);
}
const closeCardButton = document.querySelector(".popup_type_new-card").querySelector(".popup__close");
closeCardButton.addEventListener("click", onCardClose);


// Сохранение новой карточки
const cardFormElement = cardPopup.querySelector(".popup__form");
function handleCardFormSubmit(evt) {
    evt.preventDefault(); 
    const title = titleInput.value;
    const link = linkInput.value;
    const newCard = createCard(link, title, showCard);
    placesList.insertBefore(newCard, placesList.firstChild);
    onCardClose();
}
cardFormElement.addEventListener('submit', handleCardFormSubmit);


// Открытие окна просмотра картинки
const imageToShow = imagePopup.querySelector(".popup__image");
const captionToShowLink = imagePopup.querySelector(".popup__caption");
function showCard(evt) {
    evt.stopPropagation();
    const img = evt.target;
    const link = img.src;
    const card = img.closest(".card");
    const title = card.querySelector(".card__title");
    imageToShow.src = link;
    imageToShow.alt = title.textContent;
    captionToShowLink.textContent = imageToShow.alt;
    openModal(imagePopup);
}
// Закрытие окна просмотра картинки
function closeShow() {
    closeModal(imagePopup);
}
const closeShowButton = imagePopup.querySelector(".popup__close");
closeShowButton.addEventListener("click", closeShow);


import { enableValidation } from './validate';

// Создание объекта с настройками валидации
const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation(validationSettings);



// импорт главного файла стилей
import '../pages/index.css';
