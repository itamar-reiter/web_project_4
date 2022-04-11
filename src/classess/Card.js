//createCard template -> add content to it -> add event listeners -> display it on the screen ->
export default class Card {
  constructor(
    cardData,
    elementSelector,
    handleCardClick,
    popupConfirmation,
    serverRequest
  ) {
    this._cardData = cardData;
    this._elementSelector = elementSelector;
    this._handleCardClick = () => {
      handleCardClick(this._cardData.name, this._cardData.link);
    };
    this._popupConfirmation = popupConfirmation;
    this._serverRequest = serverRequest;
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
    if (
      !this._cardData.owner ||
      this._cardData.owner._id === "2e5154ce112b4a6ba0a11409"
    ) {
      this._garbageButton.classList.add("element__garbage-button_active");
    }
  };

  _addDataToCard() {
    this._nameContainer.textContent = this._cardData.name;
    this._imageContainer.alt = this._cardData.name;
    this._imageContainer.src = this._cardData.link;
    this._likeCounter.textContent = this._cardData.likes.length;
  }

  _decreaseLike() {
    this._serverRequest.deleteLike(this._cardData._id).then((res) => {
      this._likeCounter.textContent = `${res.likes.length}`;
    });
  }

  _increaseLike() {
    this._serverRequest.putLike(this._cardData._id).then((res) => {
      this._likeCounter.textContent = `${res.likes.length}`;
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

  _removeCard = () => {
    this._card.remove();
    this._card = null;
  };

  _handleCardLikeButton = () => {
    this._likeButton.classList.toggle("element__like-button_active");
    this._likeButton.classList.contains("element__like-button_active")
      ? this._increaseLike()
      : this._decreaseLike();
  };

  generateCard() {
    this._getTemplate();
    this._defineCardVariables();
    this._displayGarbageIcon();
    this._addDataToCard();
    this._setEventListeners();

    return this._card;
  }
}
