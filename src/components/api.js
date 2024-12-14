const config = {
    baseUrl: 'https://nomoreparties.co/v1/frontend-st-cohort-201',
    headers: {
      authorization: '65dc1807-e548-427d-a758-a7110530ed35',
      'Content-Type': 'application/json'
    }
};


// Универсальная отправка запроса на сервер
function sendRequest(additionalUrl, method = 'GET', body = null) {
    return fetch(`${config.baseUrl}/${additionalUrl}`, {
        method: method,
        headers: config.headers,
        body: body
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
    
            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
        }); 
} 


// Отправка запроса получения начальных карточек
export const getInitialCards = () => {
    console.log(`Отправка запроса получения начальных карточек`);
    return sendRequest(`cards`);
}


// Отправка запроса удаления карточки
export const deleteMyCard = (cardId) => {
    console.log(`Отправка запроса удаления карточки: ${cardId}`);
    return sendRequest(`cards/${cardId}`, 'DELETE');    
}


// Отправка запроса добавления лайка
export const putCardLike = (cardId) => {
    console.log(`Отправка запроса добавления лайка: ${cardId}`);
    return sendRequest(`cards/likes/${cardId}`, 'PUT');    
}


// Отправка запроса удаления лайка
export const deleteCardLike = (cardId) => {
    console.log(`Отправка запроса удаления лайка: ${cardId}`);
    return sendRequest(`cards/likes/${cardId}`, 'DELETE');
}


// Отправка запроса обновления профиля
export const patchProfileInfo = (name, description) => {
    console.log(`Отправка запроса обновления профиля: ${name}, ${description}`);
    return sendRequest(`users/me`, 'PATCH', 
        JSON.stringify({
            name: name,
            about: description
        })
    );   
}


// Отправка запроса создания новой карточки
export const postNewCard = (title, link) => {
    console.log(`Отправка запроса создания новой карточки`);
    return sendRequest(`cards`, 'POST', 
        JSON.stringify({
            name: title,
            link: link
        })
    );   
}


// Отправка запроса получения информации о пользователе
export const getProfileInfo = () => {
    console.log(`Отправка запроса получения информации о пользователе`);
    return sendRequest(`users/me`);   
}


// Отправка запроса замены аватара
export const patchProfileAvatar = (link) => {
    console.log(`Отправка запроса замены аватара: ${link}`);
    return sendRequest(`users/me/avatar`, 'PATCH', 
        JSON.stringify({
            avatar: link
        })
    );   
}
