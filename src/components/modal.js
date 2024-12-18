// Закрытие попапа нажатием клавиши Esc
function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

// Закрытие попапа кликом по оверлею
function closeByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

import { updateFormValidity } from "./validate";

// Открыть модальное окно (попап)
function openModal(popup, validationSettings) {
  if (popup.querySelector(validationSettings.formSelector)) {
    // если есть у чего проверять валидность
    // обновляем состояние валидности формы
    updateFormValidity(
      popup.querySelector(validationSettings.formSelector),
      validationSettings
    );
  }
  popup.classList.add("popup_is-opened");
  popup.addEventListener("click", closeByOverlay);
  document.addEventListener("keydown", closeByEsc);
}

// Закрыть модальное окно (попап)
function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  popup.removeEventListener("click", closeByOverlay);
  document.removeEventListener("keydown", closeByEsc);
}

export { openModal, closeModal };
