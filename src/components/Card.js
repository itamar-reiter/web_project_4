//createCard template -> add content to it -> add event listeners -> display it on the screen ->
export default class Card {
  constructor(
    cardData,
    elementSelector,
    handleCardClick,
    popupConfirmation,
    serverRequest,
    userId
  ) {
    this._cardData = cardData;
    this._elementSelector = elementSelector;
    this._handleCardClick = () => {
      handleCardClick(this._cardData.name, this._cardData.link);
    };
    this._popupConfirmation = popupConfirmation;
    this._serverRequest = serverRequest;
    this._userId = userId;
  }

  _getTemplate() {
    this._card = document
      .querySelector(this._elementSelector)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  _defineCardVariables() {
    this._garbageButton = this._card.querySelector(".element__garbage-button");
    this._imageContainer = this._card.querySelector(".element__image");
    this._nameContainer = this._card.querySelector(".element__name");
    this._likeButton = this._card.querySelector(".element__like-button");
    this._likeCounter = this._card.querySelector(".element__like-counter");
  }

  _displayGarbageIcon = () => {
    if (!this._cardData.owner || this._cardData.owner._id === this._userId) {
      this._garbageButton.classList.add("element__garbage-button_active");
    }
  };

  _addDataToCard() {
    this._nameContainer.textContent = this._cardData.name;
    this._imageContainer.alt = this._cardData.name;
    this._imageContainer.src = this._cardData.link;
    this._likeCounter.textContent = this._cardData.likes.length;
  }

  _handleLikeStatus(card) {
    if (card.likes.length !== 0) {
      card.likes.every((like) => {
        if (like._id === this._userId) {
          this._likeButton.classList.add("element__like-button_active");
          return false;
        } else {
          this._likeButton.classList.remove("element__like-button_active");
          return true;
        }
      });
    } else if (card.likes.length === 0) {
      this._likeButton.classList.remove("element__like-button_active");
    }
  }

  _decreaseLike() {
    this._serverRequest
      .deleteLike(this._cardData._id)
      .then((res) => {
        this._handleLikeStatus(res);
        this._likeCounter.textContent = `${res.likes.length}`;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _increaseLike() {
    this._serverRequest
      .putLike(this._cardData._id)
      .then((res) => {
        this._handleLikeStatus(res);
        this._likeCounter.textContent = `${res.likes.length}`;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _setEventListeners() {
    this._garbageButton.addEventListener("click", this._handleGarbageClick);

    this._likeButton.addEventListener("click", this._handleCardLikeButton);

    this._imageContainer.addEventListener("click", this._handleCardClick);
  }

  _handleGarbageClick = () => {
    this._popupConfirmation.open();
    this._popupConfirmation.setEventListeners(this._card, this._cardData);
  };

  _handleCardLikeButton = () => {
    this._likeButton.classList.contains("element__like-button_active")
      ? this._decreaseLike()
      : this._increaseLike();
  };

  generateCard() {
    this._getTemplate();
    this._defineCardVariables();
    this._displayGarbageIcon();
    this._handleLikeStatus(this._cardData);
    this._addDataToCard();
    this._setEventListeners();

    return this._card;
  }
}
