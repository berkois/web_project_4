export default class Api {
  constructor(customFetch, { baseUrl, headers, errorFunction }) {
    this._customFetch = customFetch;
    this._errorFunction = errorFunction;
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return this._customFetch(
      `${this._baseUrl}/cards`,
      {
        headers: this._headers,
      },
      this._errorFunction
    );
  }

  getUserInfo() {
    return this._customFetch(
      `${this._baseUrl}/users/me`,
      {
        headers: this._headers,
      },
      this._errorFunction
    );
  }

  updateUserInfo(userData) {
    return this._customFetch(
      `${this._baseUrl}/users/me`,
      {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: userData.name,
          about: userData.about,
        }),
      },
      this._errorFunction
    );
  }

  setNewCard(cardData) {
    return this._customFetch(
      `${this._baseUrl}/cards`,
      {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: cardData.name,
          link: cardData.link,
        }),
      },
      this._errorFunction
    );
  }

  deleteCard(cardId) {
    return this._customFetch(
      `${this._baseUrl}/cards/${cardId}`,
      {
        method: "DELETE",
        headers: this._headers,
      },
      this._errorFunction
    );
  }

  addLike(cardId) {
    return this._customFetch(
      `${this._baseUrl}/cards/likes/${cardId}`,
      {
        method: "PUT",
        headers: this._headers,
      },
      this._errorFunction
    );
  }

  removeLike(cardId) {
    return this._customFetch(
      `${this._baseUrl}/cards/likes/${cardId}`,
      {
        method: "DELETE",
        headers: this._headers,
      },
      this._errorFunction
    );
  }

  setUserAvatar(avatarLink) {
    return this._customFetch(
      `${this._baseUrl}/users/me/avatar`,
      {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatarLink.avatar,
        }),
      },
      this._errorFunction
    );
  }
}
