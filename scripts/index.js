// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template");
// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

profilePopup.classList.add(".popup_is-animated");
cardPopup.classList.add(".popup_is-animated");
imagePopup.classList.add(".popup_is-animated");

// @todo: Функция создания карточки
function createCard(link, name) {
    const newCard = cardTemplate.content.cloneNode(true);
    const img = newCard.querySelector(".card__image");
    img.src = link;
    img.alt = name;
    const title = newCard.querySelector(".card__title");
    title.textContent = name;

    newCard.querySelector(".card__like-button").addEventListener("click", likeCard);
    newCard.querySelector(".card__delete-button").addEventListener("click", deleteCard);
    newCard.querySelector(".card__image").addEventListener("click", showCard);

    return newCard;
}
// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
    const newCard = createCard(card.link, card.name);
    placesList.appendChild(newCard);
})
// Открыть модальное окно
function openModal(popup) {      
    popup.classList.add('popup_is-opened');
}
// Закрыть модальное окно
function closeModal(popup) {      
    popup.classList.remove('popup_is-opened');
}

// окна редактирования
// редактирование профиля
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const profileInfo = document.querySelector(".profile__info");
const profileTitle = profileInfo.querySelector(".profile__title");
const profileDescription = profileInfo.querySelector(".profile__description");
// Нажатие на кнопку редактирования профиля
function onProfileEdit() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(profilePopup);
}
const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener("click", onProfileEdit);
// Нажатие на кнопку закрытия окна редактирования, наверное, чего-либо
function onProfileClose() {
    closeModal(profilePopup);
}
const closeProfileButton = document.querySelector(".popup_type_edit").querySelector(".popup__close");
closeProfileButton.addEventListener("click", onProfileClose);

// Сохранение изменённого профиля
const profileFormElement = profilePopup.querySelector(".popup__form");
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    const name = nameInput.value;
    const job = jobInput.value;
    profileTitle.textContent = name;
    profileDescription.textContent = job;
    onProfileClose();
}
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

// добавление карточки
const titleInput = document.querySelector('.popup__input_type_card-name');
const linkInput = document.querySelector('.popup__input_type_url');
// Нажатие на кнопку редактирования профиля
function onCardAdd() {
    titleInput.value = "";
    linkInput.value = "";
    openModal(cardPopup);
}
const addCardButton = document.querySelector('.profile__add-button');
addCardButton.addEventListener("click", onCardAdd);
// Нажатие на кнопку закрытия окна редактирования, наверное, чего-либо
function onCardClose() {
    closeModal(cardPopup);
}
const closeCardButton = document.querySelector(".popup_type_new-card").querySelector(".popup__close");
closeCardButton.addEventListener("click", onCardClose);
// Сохранение новой карточки
const cardFormElement = cardPopup.querySelector(".popup__form");
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleCardFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    const title = titleInput.value;
    const link = linkInput.value;
    const newCard = createCard(link, title);
    placesList.insertBefore(newCard, placesList.firstChild);
    onCardClose();
}
cardFormElement.addEventListener('submit', handleCardFormSubmit);

// Взаимодействие с карточкой
function likeCard(evt) {
    const likeButton = evt.target;
    likeButton.classList.toggle("card__like-button_is-active");
}

function deleteCard(evt) {
    const deleteButton = evt.target;
    cardToBeDeleted = deleteButton.closest(".card");
    placesList.removeChild(cardToBeDeleted);
}
const imageToShow = imagePopup.querySelector(".popup__image");
const captionToShowLink = imagePopup.querySelector(".popup__caption");
function showCard(evt) {
    const img = evt.target;
    const link = img.src;
    const card = img.closest(".card");
    const title = card.querySelector(".card__title");
    imageToShow.src = link;
    imageToShow.alt = title.textContent;
    captionToShowLink.textContent = imageToShow.alt;
    openModal(imagePopup);
}

function closeShow() {
    closeModal(imagePopup);
}
const closeShowButton = imagePopup.querySelector(".popup__close");
closeShowButton.addEventListener("click", closeShow);
