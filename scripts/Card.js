//createCard template -> add content to it -> add event listeners -> display it on the screen ->
class Card {
  constructor(image, name, elementSelector, openPopupImage) {
    this._image = image;
    this._name = name;
    this._elementSelector = elementSelector;
    this._openPopupImage = openPopupImage;
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
  }

  _addDataToCard() {
    this._nameContainer.textContent = this._name;
    this._imageContainer.alt = this._name;
    this._imageContainer.src = this._image;
  }
  _setEventListeners() {
    this._garbageButton.addEventListener("click", () => {
      this._removeCard();
    });
    this._likeButton.addEventListener("click", () => {
      this._toggleCardLikeButton();
    });
    this._imageContainer.addEventListener("click", () => {
      this._openPopupImage(this._name, this._image);
    });
  }
  _removeCard() {
    this._card.remove();
  }
  _toggleCardLikeButton() {
    this._likeButton.classList.toggle("element__like-button_active");
  }
  generateCard() {
    this._getTemplate();
    this._defineCardVariables();
    this._addDataToCard();
    this._setEventListeners();

    return this._card;
  }
}
export default Card;
