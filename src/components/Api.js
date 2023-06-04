
const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-24',
  headers: {
    authorization: '902e7d86-3306-44b1-a025-c502f89e3c4a',
    'Content-Type': 'application/json'
  }
};

class Api {
  constructor({ baseUrl, headers }) {
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

const api = new Api(config);

export { api }
