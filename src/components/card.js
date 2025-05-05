import { delNewCard, likeCard, unlikeCard } from "../components/api.js";

const cardTemplate = document.querySelector("#card-template").content;
export function createCard(name, link, {handleImageClick, likes=[], ownerId, cardId, currentUserId}) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImg = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const deleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");
  const likeCounter = document.createElement("span");
  likeCounter.classList.add("card__like-counter");
  likeButton.after(likeCounter);
  likeCounter.classList.add("card__like-counter");
  const likeContainer = document.createElement("div");
  likeContainer.classList.add("card__like-container");
  likeContainer.appendChild(likeButton);
  likeContainer.appendChild(likeCounter);

card.querySelector(".card__description").appendChild(likeContainer);
  cardImg.src = link;
  cardImg.alt = name;
  cardTitle.textContent = name;
  likeCounter.textContent = likes.length;
  if (likes.some((user) => user._id === currentUserId)) {
    likeButton.classList.add("card__like-button_is-active")
  }

  likeButton.addEventListener("click", function () {
    const isLiked = likeButton.classList.contains("card__like-button_is-active");
    const request = isLiked ? unlikeCard(cardId) : likeCard(cardId);
    request 
      .then((updatedCard) => {
        likeCounter.textContent = updatedCard.likes.length;

        if (isLiked) {
          likeButton.classList.remove("card__like-button_is-active");
        } else {
          likeButton.classList.add("card__like-button_is-active");
        }
      })
      .catch(console.log);
  });

  cardImg.addEventListener("click", () => {
    handleImageClick(link, name);
  });

  if (ownerId === currentUserId) {
    deleteButton.addEventListener("click", () => {
      delNewCard(cardId)
        .then(() => card.remove())
        .catch(console.log);
    });
  } else {
    deleteButton.remove();
  }

  return card;
}
