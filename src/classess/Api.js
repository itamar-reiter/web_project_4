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
    fetch(`${this._serverAdress}/v1/${this._groupId}/cards`, {
      method: "GET",
      headers: {
        authorization: this._token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
      });
  }
  editProfileData() {
    fetch(`${this._serverAdress}/v1/${this._groupId}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "",
        about: "",
      }),
    });
  }
  addNewCard() {
    fetch(`${this._serverAdress}/v1/${this._groupId}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "",
        link: "",
      }),
    });
  }
}
