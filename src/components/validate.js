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
  
const setEventListeners = (formElement, validationSettings) => {
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
    // toggleButtonState(inputList, buttonElement, validationSettings);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, validationSettings);
        toggleButtonState(inputList, buttonElement, validationSettings);
        });
    });
};
  
const enableValidation = (validationSettings) => {
    const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
    formList.forEach((formElement) => {
        // formElement.addEventListener('submit', function (evt) {
        //     evt.preventDefault();
        // });
        // const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));

        //     fieldsetList.forEach((fieldSet) => {
        //         setEventListeners(fieldSet);
        // }); 
        setEventListeners(formElement, validationSettings);
    });
    /* костыль. Настройка, верная до тех пор, пока при загрузке страницы
    input-элементы первой формы валидны, а второй - нет: */
    const buttonList = Array.from(document.querySelectorAll('.popup__button'));
    buttonList[1].classList.add(validationSettings.inactiveButtonClass);
};
  
// enableValidation();
  
function hasInvalidInput(inputList) {
    return inputList.some( (inputElement) => {
        return !inputElement.validity.valid;
    });
}
  
function toggleButtonState (inputList, buttonElement, validationSettings) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(validationSettings.inactiveButtonClass);  
    } else {
        buttonElement.classList.remove(validationSettings.inactiveButtonClass);
    }
}

export {enableValidation};
