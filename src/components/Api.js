export default class Api {
  constructor(data) {
    this._groupId = data.groupId;
    this._token = data.token;
    this._serverAdress = data.serverAdress;
  }
  getUserInfo() {
    return fetch(`${this._serverAdress}/v1/${this._groupId}/users/me`, {
      method: "GET",
      headers: {
        authorization: this._token,
      },
    })
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getInitialCards() {
    return fetch(`${this._serverAdress}/v1/${this._groupId}/cards`, {
      method: "GET",
      headers: {
        authorization: this._token,
      },
    })
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  saveProfileData(nameValue, aboutValue) {
    return fetch(`${this._serverAdress}/v1/${this._groupId}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameValue,
        about: aboutValue,
      }),
    })
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateProfilePicture(avatarValue) {
    return fetch(`${this._serverAdress}/v1/${this._groupId}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatarValue,
      }),
    })
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  saveNewCard(data) {
    return fetch(`${this._serverAdress}/v1/${this._groupId}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._serverAdress}/v1/${this._groupId}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    })
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    })
    /* .catch((err) => {
      console.log(err);
    }) */;
  }

  putLike(cardId) {
    return fetch(
      `${this._serverAdress}/v1/${this._groupId}/cards/likes/${cardId}`,
      {
        method: "PUT",
        headers: {
          authorization: this._token,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteLike(cardId) {
    return fetch(
      `${this._serverAdress}/v1/${this._groupId}/cards/likes/${cardId}`,
      {
        method: "DELETE",
        headers: {
          authorization: this._token,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
