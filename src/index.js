import "./index.css";
import { createCard } from "./components/card.js";
import {
  openPopup,
  closePopup,
  cloceESC,
  setModalWindowEventListeners,
} from "./components/modal.js";
import { enableValidation, clearValidation, toggleButtonState } from "./components/validation.js";
import { getUserInformation, getUserCards, newInformationBack, addNewCard, updateAvatar } from "./components/api.js";


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
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
const avatar = document.querySelector(".profile__image")
const popupAvatar = document.querySelector(".popup_type_avatar");
const avatarForm = popupAvatar.querySelector(".popup__form");
const avatarInput = popupAvatar.querySelector(".popup__input_type_avatar");
const avatarButton = document.querySelector(".profile__image");
const profileSaveButton = profileForm.querySelector(".popup__button");
const cardSaveButton = formAdd.querySelector(".popup__button");
const avatarSaveButton = avatarForm.querySelector(".popup__button");




Promise.all([getUserInformation(), getUserCards()]) 
  .then(([userData, cards]) => {
    const currentUserId = userData._id;
    proName.textContent=userData.name;
    proJob.textContent=userData.about;
    avatar.style.backgroundImage=`url(${userData.avatar})`;

    cards.forEach((cardData) => {
      const newCard = createCard(cardData.name, cardData.link, {
        handleImageClick,
        likes: cardData.likes,
        ownerId: cardData.owner._id,
        cardId: cardData._id,
        currentUserId: currentUserId
      });
      placesList.prepend(newCard);
    })
  })
  .catch(console.log)

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
  const baseText = profileSaveButton.textContent
  profileSaveButton.textContent = "Сохранение..."
  newInformationBack(nameInput.value,jobInput.value)
  .then((updatedUser) => {
    proName.textContent = updatedUser.name;
  proJob.textContent = updatedUser.about;
  closePopup(popupEdit);
  })
  .catch(console.log)
  .finally(() => {
    profileSaveButton.textContent = baseText;
  }) 
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

popupEditButton.addEventListener("click", function () {
  nameInput.value = proName.textContent;
  jobInput.value = proJob.textContent;
  clearValidation(profileForm);
  toggleButtonState(
    Array.from(profileForm.querySelectorAll(".popup__input")),
    profileForm.querySelector(".popup__button")
  );
  openPopup(popupEdit);
});

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const baseText =cardSaveButton.textContent;
  cardSaveButton.textContent= "Сохранение..."
  addNewCard(cardNameInput.value, cardLinkInput.value)
    .then((cardData) => {
      const newCard = createCard(cardData.name, cardData.link, {
        handleImageClick,
        likes: cardData.likes,
        ownerId: cardData.owner._id,
        cardId: cardData._id,
        currentUserId: cardData.owner._id,
      });
      placesList.prepend(newCard);
      formAdd.reset();
      clearValidation(formAdd);
      closePopup(popupAdd);
    })
    .catch(console.log)
    .finally(() => {
      cardSaveButton.textContent = baseText;
    }) 
}

formAdd.addEventListener("submit", handleAddCardSubmit);

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const baseText = avatarSaveButton.textContent;
  avatarSaveButton.textContent = "Сохранение...";

  updateAvatar(avatarInput.value)
    .then((updatedUser) => {
      avatar.style.backgroundImage = `url(${updatedUser.avatar})`;
      closePopup(popupAvatar);
      formAvatar.reset();
      clearValidation(formAvatar);
    })
    .catch(console.log)
    .finally(() => {
      avatarSaveButton.textContent = baseText;
    });
}

avatarForm.addEventListener("submit", handleAvatarFormSubmit);



popUps.forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

avatarButton.addEventListener("click", function () {
  avatarInput.value = "";
  clearValidation(avatarForm, validationConfig);
  toggleButtonState(
    Array.from(avatarForm.querySelectorAll(".popup__input")),
    avatarForm.querySelector(".popup__button")
  );
  openPopup(popupAvatar);
});

avatarForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  updateAvatar(avatarInput.value)
    .then((updatedUser) => {
      avatar.style.backgroundImage = `url(${updatedUser.avatar})`;
      closePopup(popupAvatar);
    })
    .catch(console.log);
});


enableValidation();
