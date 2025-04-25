import "./index.css";
import { createCard, delCard } from "./components/card.js";
import {
  openPopup,
  closePopup,
  cloceESC,
  setModalWindowEventListeners,
} from "./components/modal.js";
import { initialCards } from "./components/initialCards.js";

const cardTemplate = document.querySelector("#card-template").content;
const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");
const likeButton = document.querySelector(".card__like-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-card");
const popupImageType = document.querySelector(".popup_type_image");
const popupEditButton = document.querySelector(".profile__edit-button");
const popupAddButton = document.querySelector(".profile__add-button");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const formAdd = document.forms["new-place"];
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");
const profileForm = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const proName = document.querySelector(".profile__title");
const proJob = document.querySelector(".profile__description");

for (let i = 0; i < initialCards.length; i++) {
  const newCard = createCard(initialCards[i].name, initialCards[i].link, {
    delCard: delCard,
    handleImageClick: handleImageClick,
  });
  placesList.append(newCard);
}

function handleImageClick(scr, alt) {
  popupImage.src = scr;
  popupImage.alt = alt;
  popupCaption.textContent = alt;
  openPopup(popupImageType);
}

popupAddButton.addEventListener("click", function () {
  openPopup(popupAdd);
});

const popUps = document.querySelectorAll(".popup");

popUps.forEach(setModalWindowEventListeners);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  proName.textContent = nameInput.value;
  proJob.textContent = jobInput.value;
  closePopup(popupEdit);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

popupEditButton.addEventListener("click", function () {
  nameInput.value = proName.textContent;
  jobInput.value = proJob.textContent;
  openPopup(popupEdit);
});

function addNewCard(evt) {
  evt.preventDefault();
  placesList.prepend(
    createCard(cardNameInput.value, cardLinkInput.value, {
      delCard: delCard,
      handleImageClick: handleImageClick,
    })
  );
  formAdd.reset();
  closePopup(popupAdd);
}

formAdd.addEventListener("submit", addNewCard);

popUps.forEach((popup) => {
  popup.classList.add("popup_is-animated");
});
