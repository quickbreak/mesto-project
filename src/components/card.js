// Функция лайка карточки
function likeCard(evt) {
    const likeButton = evt.target;
    likeButton.classList.toggle("card__like-button_is-active");
}

// список существующих карточек
const placesList = document.querySelector(".places__list");

// Функция удаления карточки
function deleteCard(evt) {
    const deleteButton = evt.target;
    const cardToBeDeleted = deleteButton.closest(".card");
    placesList.removeChild(cardToBeDeleted);
}


// Темплейт карточки
const cardTemplate = document.querySelector("#card-template");

// Функция создания карточки
function createCard(link, name, showCardHandler) {
    const newCard = cardTemplate.content.cloneNode(true);
    const img = newCard.querySelector(".card__image");
    img.src = link;
    img.alt = name;
    const title = newCard.querySelector(".card__title");
    title.textContent = name;

    newCard.querySelector(".card__like-button").addEventListener("click", likeCard);
    newCard.querySelector(".card__delete-button").addEventListener("click", deleteCard);
    newCard.querySelector(".card__image").addEventListener("click", showCardHandler);

    return newCard;
}


export {createCard};
