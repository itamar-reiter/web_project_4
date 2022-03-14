export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeIcon = this._popup.querySelector(".popup__close-icon");
  }

  open() {
    this._popup.classList.add("popup_active");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    document.removeEventListener("keydown", this._handleEscClose);
    this._popup.classList.remove("popup_active");
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();//need fix
    }
  }

  setEventListeners() {
    this._closeIcon.addEventListener("click", this.close);
    this._popup.addEventListener("click", this._closeOverlay);
  }
  
  _closeOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }
}
