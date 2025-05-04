

const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-37',
  headers: {
    authorization: '27cc1487-2c2f-4ec3-87c8-07368c48e287',
    'Content-Type': 'application/json'
  }
};

function checkFunction(res) {
  if (res.ok) {
    return res.json();
  } 
  return Promise.reject("Ошибка: " + res.status)
};

export function getUserInformation()  {
  return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-37/users/me`, {headers: config.headers}).then(checkFunction)
};

export function getUserCards() {
  return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-37/cards`, {headers: config.headers}).then(checkFunction)
};

export function newInformationBack(name,about) {
  return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-37/users/me`, {
    method: 'PATCH', 
    headers: config.headers,
    body: JSON.stringify({ name:name, about:about })
  }).then(checkFunction)
};

export function addNewCard(name,link) {
  return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-37/cards`, {
    method: `POST`,
    headers: config.headers,
    body: JSON.stringify({name:name, link:link})
  }).then(checkFunction)
};

export function delNewCard(cardId){
  return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-37/cards/` + cardId, {
    method: "DELETE",
    headers: config.headers
  }).then(checkFunction);
};


export function likeCard(cardId) {
  return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-37/cards/likes/` + cardId, {
    method: "PUT",
    headers: config.headers
  }).then(checkFunction);
}

export function unlikeCard(cardId) {
  return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-37/cards/likes/` + cardId, {
    method: "DELETE",
    headers: config.headers
  }).then(checkFunction);
}

export function updateAvatar(avatarUrl) {
  return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-37/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar: avatarUrl })
  }).then(checkFunction);
}