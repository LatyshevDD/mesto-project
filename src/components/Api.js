
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

  _request(url, options) {
    return fetch(url, options).then(res => this._getResponseData(res))
  }

  getUserInformation() {
    return this._request(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
  }

  changeUserInformation(name, about) {
    return this._request(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`,
      }),
      headers: this.headers
    })
  }

  getInitialCards() {
    return this._request(`${this.baseUrl}/cards`, {
      headers: this.headers
    })
  }

  postNewCard(name, link) {
    return this._request(`${this.baseUrl}/cards`, {
      method: 'POST',
      body: JSON.stringify({
        name: `${name}`,
        link: `${link}`,
      }),
      headers: this.headers
    })
  }

  deleteCardFromServer(cardId) {
    return this._request(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
  }

  likeCardToServer(cardId) {
    return this._request(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this.headers
    })
  }

  disLikeCardFromServer(cardId) {
    return this._request(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
  }

  changeUserAvatar(link) {
    return this._request(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: `${link}`
      }),
      headers: this.headers
    })
  }

}

const api = new Api(config);

export { api }
