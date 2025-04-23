import "./index.css";
import { createCard, delcard} from "./components/card.js";
import {Openpopup, closePopup, cloceESC, setModalWindowEventListeners} from "./components/modal.js";


const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  }
];

const cardTemplate = document.querySelector("#card-template").content
const content = document.querySelector(".content")
const placesList = content.querySelector(".places__list");
const likeButton = document.querySelector(".card__like-button")
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupImageType = document.querySelector('.popup_type_image');
const popupEditButton = document.querySelector('.profile__edit-button');
const popupAddButton = document.querySelector('.profile__add-button');
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const formAdd = document.forms["new-place"];
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");
const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const proName = document.querySelector(".profile__title");
const proJob = document.querySelector(".profile__description")



for (let i = 0; i < initialCards.length; i++) {
  const newCard = createCard (initialCards[i].name, initialCards[i].link,  delcard)
  placesList.append(newCard);
}

export function imageOpen(scr,alt) {
  popupImage.src=scr;
  popupImage.alt=alt;
  popupCaption.textContent=alt;
  Openpopup(popupImageType)
};


popupEditButton.addEventListener("click", function(){
  Openpopup(popupEdit)
});

popupAddButton.addEventListener("click",function(){
  Openpopup(popupAdd)
});

const popUps = document.querySelectorAll(".popup");

popUps.forEach(function(ModalWidow){
    setModalWindowEventListeners(ModalWidow);
});

function handleFormSubmit(evt) {
  evt.preventDefault(); 
  proName.textContent=nameInput.value;
  proJob.textContent=jobInput.value;
}

formElement.addEventListener('submit', handleFormSubmit);

popupEditButton.addEventListener("click", function(){
  nameInput.value=proName.textContent;
  jobInput.value=proJob.textContent;
  Openpopup(popupEdit)
});

function addNewCard(evt) {
  evt.preventDefault();
  placesList.prepend(createCard(cardNameInput.value, cardLinkInput.value, delcard));
  formAdd.reset();
  closePopup(popupAdd);
};

formAdd.addEventListener("submit",addNewCard)


document.querySelectorAll(".popup").forEach(popup => {
  popup.classList.add("popup_is-animated")
})

popUps.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === popup) {
      closePopup(popup)
    }
  })
});