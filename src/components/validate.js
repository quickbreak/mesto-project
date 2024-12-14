const showInputError = (formElement, inputElement, errorMessage, validationSettings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationSettings.errorClass);
};
  
const hideInputError = (formElement, inputElement, validationSettings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationSettings.inputErrorClass);
    errorElement.classList.remove(validationSettings.errorClass);
    errorElement.textContent = '';
};
  
const checkInputValidity = (formElement, inputElement, validationSettings) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationSettings);
    } else {
        hideInputError(formElement, inputElement, validationSettings);
    }
};
  
function hasInvalidInput(inputList) {
    return inputList.some( (inputElement) => {
        return !inputElement.validity.valid;
    });
}
  
function toggleButtonState (inputList, buttonElement, validationSettings) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(validationSettings.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(validationSettings.inactiveButtonClass);
        buttonElement.disabled = false;
    }
}

const setEventListeners = (formElement, validationSettings) => {
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector); 
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, validationSettings);
        toggleButtonState(inputList, buttonElement, validationSettings);
        });
    });
};
  
// Включение автоматического обновления состояния валидности формы после каждого изменения поля ввода
const enableValidation = (validationSettings) => {
    const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
    formList.forEach((formElement) => { 
        setEventListeners(formElement, validationSettings);
    });
};


// Обновление состояния валидности формы перед открытием попапа
function updateFormValidity(formElement, validationSettings) {
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validationSettings);
    inputList.forEach((inputElement) => {
        checkInputValidity(formElement, inputElement, validationSettings);
    });
}

export {enableValidation, updateFormValidity};
