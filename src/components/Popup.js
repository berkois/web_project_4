export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this._popup.classList.remove("popup_opened");
    }
  };

  _handleClickOverlayClose = (evt) => {
    if (evt.target == evt.currentTarget) {
      this.close();
    }
  };

  open() {
    this._popup.classList.add("popup_opened");
    this._popup.addEventListener("mousedown", this._handleClickOverlayClose);
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    this._popup.removeEventListener("mousedown", this._handleClickOverlayClose);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    this._popup.querySelector(".popup__close-button").addEventListener("click", () => this.close());
  }
}
