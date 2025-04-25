export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", cloceESC);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", cloceESC);
}

function cloceESC(evt) {
  if (evt.key === "Escape") {
    const popupOpen = document.querySelector(".popup_is-opened");
    if (popupOpen) {
      closePopup(popupOpen);
    }
  }
}

export function setModalWindowEventListeners(modalWindow) {
  const closeCross = modalWindow.querySelector(".popup__close");
  closeCross.addEventListener("click", function () {
    closePopup(modalWindow);
  });

  modalWindow.addEventListener("mousedown", function (evt) {
    if (evt.target === modalWindow) {
      closePopup(modalWindow);
    }
  });
}
