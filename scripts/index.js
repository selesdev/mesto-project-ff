// @todo: Темплейт карточки
  const cardTemplate = document.querySelector("#card-template").content
// @todo: DOM узлы
const content = document.querySelector(".content")
const placesList = content.querySelector(".places__list");

// @todo: Функция создания карточки
  function createCard(name ,link, delcard) {
    const card = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImg = card.querySelector(".card__image");
    const cardTitle = card.querySelector(".card__title");
    cardImg.src = link;
    cardImg.alt = name;
    cardTitle.textContent = name;
    card.querySelector(".card__delete-button").addEventListener("click", delcard);
    return card;
    
  }
  
    
// @todo: Функция удаления карточки
  function delcard(event) {
    event.target.closest(".card").remove();
  }
// @todo: Вывести карточки на страницу

for (let i = 0; i < initialCards.length; i++) {
  const newCard = createCard (initialCards[i].name, initialCards[i].link,  delcard)
  placesList.append(newCard);
}

