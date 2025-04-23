import { imageOpen } from "../index.js";
const cardTemplate = document.querySelector("#card-template").content
export  function createCard(name ,link, delcard) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImg = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const likeButton = card.querySelector(".card__like-button");
  cardImg.src = link;
  cardImg.alt = name;
  cardTitle.textContent = name;
  card.querySelector(".card__delete-button").addEventListener("click", delcard);
  cardImg.addEventListener("click", function() {
    imageOpen (link,name)});
  likeButton.addEventListener("click", function() {
  
    likeButton.classList.toggle("card__like-button_is-active");
  })
  return card;
}

export   function delcard(event) {
  event.target.closest(".card").remove();
}