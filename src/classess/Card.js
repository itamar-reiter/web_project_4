//createCard template -> add content to it -> add event listeners -> display it on the screen ->
export default class Card {
  constructor(image, name, likeArray, elementSelector, handleCardClick) {
    this._image = image;
    this._name = name;
    this._likeArray = likeArray;
    this._elementSelector = elementSelector;
    this._handleCardClick = () => {
      handleCardClick(this._name, this._image);
    };
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
    /* this._likeCounter.textContent = this._likeArray.length; */
  }

  _increaseLike() {
    this._likeCounter.textContent = `${this._likeArray.length + 1}`;
  }

  _initLike() {
    this._likeCounter.textContent = `${this._likeArray.length}`;
  }

  _addDataToCard() {
    this._nameContainer.textContent = this._name;
    this._imageContainer.alt = this._name;
    this._imageContainer.src = this._image;
    this._initLike();
  }

  _setEventListeners() {
    this._garbageButton.addEventListener("click", this._removeCard);

    this._likeButton.addEventListener("click", this._handleCardLikeButton);

    this._imageContainer.addEventListener("click", this._handleCardClick);
  }

  _removeCard = () => {
    this._card.remove();
    this._card = null;
  };

  _handleCardLikeButton = () => {
    this._likeButton.classList.toggle("element__like-button_active");
    this._likeButton.classList.contains("element__like-button_active")
      ? this._increaseLike()
      : this._initLike();
  };

  generateCard() {
    this._getTemplate();
    this._defineCardVariables();
    this._addDataToCard();
    this._setEventListeners();

    return this._card;
  }
}
