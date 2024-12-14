// Обновление карточки
function updateCard(cardId, newLikesCount) {
    console.log(`Новое количество лайков: ${newLikesCount}`);
    document.getElementById(cardId).querySelector('.card__like-count').textContent = newLikesCount;
}

import { putCardLike } from "./api";
import { deleteCardLike } from "./api";

// Лайк / отмена лайка карточки
function likeCard(evt) {
    const likeButton = evt.target;
    likeButton.classList.toggle("card__like-button_is-active");
    const card = likeButton.closest('.card');
    if (likeButton.classList.contains("card__like-button_is-active")) { // лайк
        putCardLike(card.id)
            .then((result) => {
                console.log(`Ответ на запрос добавления лайка:`);
                console.log(result);
                const newLikesCount = result.likes.length;
                updateCard(card.id, newLikesCount);
            })
            .catch((err) => {
                console.log(err); // выводим ошибку в консоль
            });
    } else {                                                            // отмена лайка
        deleteCardLike(card.id)
            .then((result) => {
                console.log(`Ответ на запрос удаления лайка:`);
                console.log(result);
                const newLikesCount = result.likes.length;
                updateCard(card.id, newLikesCount);
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


// Проверка наличия моего лайка
function hasMyLike(likes, myPersonalId) {
    return Array.from(likes).some((man) => {
        return man._id === myPersonalId;
    });
}


// Темплейт карточки
const cardTemplate = document.querySelector("#card-template");

// Функция создания карточки
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
    const count = newCard.querySelector('.card__like-count');
    count.textContent = likesCount;
    newCard.querySelector('.card').id = cardId;

    
    if (cardObject.owner._id != myPersonalId) {
        const deleteButton = newCard.querySelector('.card__delete-button');
        deleteButton.disabled = true;
        deleteButton.style.display = 'none';
    }

    if (hasMyLike(cardObject.likes, myPersonalId)) {
        console.log('Я лайкал');
        newCard.querySelector(".card__like-button").classList.add("card__like-button_is-active");
    } else {
        console.log('Я не лайкал');
    }

    newCard.querySelector(".card__like-button").addEventListener("click", likeCard);
    newCard.querySelector(".card__delete-button").addEventListener("click", deleteCard);
    newCard.querySelector(".card__image").addEventListener("click", showCardHandler);

    return newCard;
}


// Отображение новой карточки
function displayNewCard(cardObject, myPersonalId, showCardHandler) {
    const newCard = createCard(cardObject, myPersonalId, showCardHandler);            
    placesList.insertBefore(newCard, placesList.firstChild);
}


export {createCard, displayNewCard};
