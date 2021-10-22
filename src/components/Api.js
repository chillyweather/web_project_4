export default class Api {
  constructor({ baseUrl, authToken }) {
    this._baseUrl = baseUrl;
    this._authToken = authToken;
  }

  //seems like not very elegant solution, but probably that's the
  //best I can do for now ))
  _checkResponse(prom) {
    const response = prom
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        return data;
      });
    return response;
  }

  getCardList() {
    const cards = fetch(`${this._baseUrl}cards`, {
      headers: {
        authorization: this._authToken,
      },
    });

    return this._checkResponse(cards);
  }

  getUserInfo() {
    const userInfo = fetch(`${this._baseUrl}users/me`, {
      headers: {
        authorization: this._authToken,
      },
    });

    return this._checkResponse(userInfo);
  }

  updateUserInfo(name, about) {
    const updateUser = fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        about,
      }),
    });

    return this._checkResponse(updateUser);
  }

  updateProfilePicture(avatar) {
    const updateAvatar = fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar,
      }),
    });

    return this._checkResponse(updateAvatar);
  }

  addCard({ name, link }) {
    const card = fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        link,
      }),
    });

    return this._checkResponse(card);
  }

  deleteCard(cardId) {
    const removeCard = fetch(`${this._baseUrl}cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json',
      },
    });

    return this._checkResponse(removeCard);
  }

  likeCard(cardId) {
    const like = fetch(`${this._baseUrl}cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json',
      },
    });

    return this._checkResponse(like);
  }

  dislikeCard(cardId) {
    const dislike = fetch(`${this._baseUrl}cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json',
      },
    });

    return this._checkResponse(dislike);
  }
}
