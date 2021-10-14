//auth: a0741150-1ecd-4e0a-82be-ba6cc5789e2b
//url: https://around.nomoreparties.co/v1/group-12/

export default class Api {
  constructor({ baseUrl, authToken }) {
    this._baseUrl = baseUrl;
    this._authToken = authToken;
  }

  getCardList() {
    return fetch(`${this._baseUrl}cards`, {
      headers: {
        authorization: this._authToken,
      },
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      )
      .catch((err) => {
        console.log(err);
      });
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: {
        authorization: this._authToken,
      },
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      )
      .catch((err) => {
        console.log(err);
      });
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}cards`, {
      method: "POST",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        link
      })
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    )
      .catch((err) => {
        console.log(err);
      });
  }
}
