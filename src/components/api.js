export function getResponseData(res) {
  if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-24',
  headers: {
    authorization: '902e7d86-3306-44b1-a025-c502f89e3c4a',
    'Content-Type': 'application/json'
  }
}

export const getUserInformation = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => getResponseData(res));
}

export const changeUserInformation = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    body: JSON.stringify({
      name: `${name}`,
      about: `${about}`,
    }),
    headers: config.headers
  })
    .then(res => getResponseData(res));
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export const postNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    body: JSON.stringify({
      name: `${name}`,
      link: `${link}`,
    }),
    headers: config.headers
  })
    .then(res => getResponseData(res));
}

export const deleteCardFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => getResponseData(res));
}

export const likeCardToServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(res => getResponseData(res));
}

export const disLikeCardFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => getResponseData(res));
}

export const changeUserAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    body: JSON.stringify({
      avatar: `${link}`
    }),
    headers: config.headers
  })
    .then(res => getResponseData(res));
}

// ========= ООП ===========

export default class Api {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInformation() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
      .then(res => this._getResponseData(res));
  }

  changeUserInformation(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`,
      }),
      headers: this.headers
    })
      .then(res => this._getResponseData(res));
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers
    })
      .then(res => this._getResponseData(res));
  }

  postNewCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      body: JSON.stringify({
        name: `${name}`,
        link: `${link}`,
      }),
      headers: this.headers
    })
      .then(res => this._getResponseData(res));
  }

  deleteCardFromServer(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(res => this._getResponseData(res));
  }

  likeCardToServer(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this.headers
    })
      .then(res => this._getResponseData(res));
  }

  disLikeCardFromServer(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(res => this._getResponseData(res));
  }

  changeUserAvatar(link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: `${link}`
      }),
      headers: this.headers
    })
      .then(res => this._getResponseData(res));
  }

}


// Экземпляр для тестов

const newApi = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-24',
  headers: {
    authorization: '902e7d86-3306-44b1-a025-c502f89e3c4a',
    'Content-Type': 'application/json'
  }
});

