export default class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
    this._closeIcon = this.popup.querySelector(".popup__close-icon");
  }

  open() {
    this.popup.classList.add("popup_active");
    document.addEventListener("keydown", this._handleEscClose);
    this.popup.addEventListener("mousedown", this._closeOverlay);
  }

  close() {
    this._removeEventListeners();
    this.popup.classList.remove("popup_active");
  }

  setEventListeners() {
    this._closeIcon.addEventListener("click", () => {
      this.close();
    });
  }

  _removeEventListeners = () => {
    document.removeEventListener("keydown", this._handleEscClose);
    this.popup.removeEventListener("mousedown", this._closeOverlay);
  };

  _closeOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  };

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  submitSaving = (isLoading, defaultText) => {
    if (isLoading) {
      this.popup.querySelector(".popup__submit-button").textContent =
        "Saving...";
    } else {
      this.popup.querySelector(".popup__submit-button").textContent =
        defaultText;
    }
  };
}
