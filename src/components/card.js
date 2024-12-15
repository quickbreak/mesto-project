// Лайк / отмена лайка карточки
// Обновить количество лайков карточки
function updateCardLikeCount(cardId, newLikesCount) {
  console.log(`Новое количество лайков: ${newLikesCount}`);
  document
    .getElementById(cardId)
    .querySelector(".card__like-count").textContent = newLikesCount;
}

import { putCardLike } from "./api";
import { deleteCardLike } from "./api";

function handleCardLikeClick(evt) {
  const likeButton = evt.target;
  likeButton.classList.toggle("card__like-button_is-active");
  const card = likeButton.closest(".card");
  if (likeButton.classList.contains("card__like-button_is-active")) {
    // лайк
    putCardLike(card.id)
      .then((result) => {
        console.log(`Ответ на запрос добавления лайка:`);
        console.log(result);
        const newLikesCount = result.likes.length;
        updateCardLikeCount(card.id, newLikesCount);
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
  } else {
    // отмена лайка
    deleteCardLike(card.id)
      .then((result) => {
        console.log(`Ответ на запрос удаления лайка:`);
        console.log(result);
        const newLikesCount = result.likes.length;
        updateCardLikeCount(card.id, newLikesCount);
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
  }
}

const placesList = document.querySelector(".places__list"); // список существующих карточек

// Удаление карточки
import { deleteMyCard } from "./api";

function deleteCard(evt) {
  const deleteButton = evt.target;
  const cardToBeDeleted = deleteButton.closest(".card");
  deleteMyCard(cardToBeDeleted.id)
    .then((result) => {
      console.log(`Ответ на запрос удаления карточки:`);
      console.log(result);
      placesList.removeChild(cardToBeDeleted);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
}

// Проверить наличие моего лайка
function hasMyLike(likes, myPersonalId) {
  return Array.from(likes).some((man) => {
    return man._id === myPersonalId;
  });
}

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template");

// Создать карточку (новую)
function createCard(cardObject, myPersonalId, showCardHandler) {
  const name = cardObject.name;
  const link = cardObject.link;
  const likesCount = cardObject.likes.length;
  const cardId = cardObject._id;

  const newCard = cardTemplate.content.cloneNode(true);
  const img = newCard.querySelector(".card__image");
  img.src = link;
  img.alt = name;
  const title = newCard.querySelector(".card__title");
  title.textContent = name;
  const count = newCard.querySelector(".card__like-count");
  count.textContent = likesCount;
  newCard.querySelector(".card").id = cardId;

  if (cardObject.owner._id != myPersonalId) {
    const deleteButton = newCard.querySelector(".card__delete-button");
    deleteButton.disabled = true;
    deleteButton.style.display = "none";
  }

  if (hasMyLike(cardObject.likes, myPersonalId)) {
    console.log("Я лайкал");
    newCard
      .querySelector(".card__like-button")
      .classList.add("card__like-button_is-active");
  } else {
    console.log("Я не лайкал");
  }

  newCard
    .querySelector(".card__like-button")
    .addEventListener("click", handleCardLikeClick);
  newCard
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);
  newCard
    .querySelector(".card__image")
    .addEventListener("click", showCardHandler);

  return newCard;
}

// Отобразить новую карточку
function displayNewCard(cardObject, myPersonalId, showCardHandler) {
  const newCard = createCard(cardObject, myPersonalId, showCardHandler);
  placesList.insertBefore(newCard, placesList.firstChild);
}

export { createCard, displayNewCard };
