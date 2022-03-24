export default class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
    this._closeIcon = this.popup.querySelector(".popup__close-icon");
  }

  open() {
    this.popup.classList.add("popup_active");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    document.removeEventListener("keydown", this._handleEscClose);
    this.popup.classList.remove("popup_active");
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._closeIcon.addEventListener("click", () => {
      this.close();
    });
    this.popup.addEventListener("click", (evt) => {
      this._closeOverlay(evt);
    });
  }

  _closeOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }
}
