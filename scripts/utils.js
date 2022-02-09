// showing the modal pop-ups
export const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  popup.addEventListener("mousedown", closePopupByClickOverlay);
  document.addEventListener("keydown", closePopupByEsc);
};

// hiding the modal pop-ups
export const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  popup.removeEventListener("click", closePopupByClickOverlay);
  document.removeEventListener("keydown", closePopupByEsc);
};

// hiding the modal pop-ups by clicking the overlay
export const closePopupByClickOverlay = (evt) => {
  if (evt.target == evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
};

export const closePopupByEsc = (evt) => {
  const activePopup = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    closePopup(activePopup);
  }
};
