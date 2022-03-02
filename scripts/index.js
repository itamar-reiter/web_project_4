import cards from "./cards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import * as constants from "./utils/constants.js";
//internal functions (for internal use)//
function openPopup(popup) {
  popup.classList.add("popup_active");
  document.addEventListener("keydown", closeWithEsc);
}

function closePopup(popup) {
  document.removeEventListener("keydown", closeWithEsc);
  popup.classList.remove("popup_active");
}

function closeWithEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_active");
    closePopup(popup);
  }
}

function closeOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

function openEditProfilePopup() {
  addInputsFormEditProfile();
  openPopup(constants.popupEditProfile);
}

function addInputsFormEditProfile() {
  constants.nameInput.value = constants.profileName.textContent;
  constants.aboutMeInput.value = constants.profileAboutMe.textContent;
}

function handleProfileFormSubmit() {
  constants.profileName.textContent = constants.nameInput.value;
  constants.profileAboutMe.textContent = constants.aboutMeInput.value;
  closePopup(constants.popupEditProfile);
}

function handleCardFormSubmit() {
  constants.placesContainer.prepend(
    createCard(Card, constants.imageLinkInput.value, constants.titleInput.value)
  );
  closePopup(constants.popupAddPhoto);
  constants.popupFormAddPhoto.reset();
}

function createCard(Card, cardImage, cardName) {
  const newCard = new Card(
    cardImage,
    cardName,
    "#cardTemplate",
    openPopupImage
  ).generateCard();
  return newCard;
}

function openPopupImage(cardName, cardImage) {
  openPopup(constants.popupImage);
  addContentPopupImage(cardName, cardImage);
}

function addContentPopupImage(cardName, cardImage) {
  constants.popupBackground.style.backgroundImage =
    `
      url(` +
    cardImage +
    `)`;
  constants.popupPlaceName.textContent = cardName;
}

//exported functions//

function setEventListeners(Card) {
  //edit button event listeners
  addInputsFormEditProfile();
  constants.editButton.addEventListener("click", () => {
    openEditProfilePopup();
  });

  constants.popupEditProfileCloseButton.addEventListener("click", () => {
    closePopup(constants.popupEditProfile);
  });

  //add button event listeners
  constants.addButton.addEventListener("click", () => {
    openPopup(constants.popupAddPhoto);
  });

  constants.popupAddPhotoCloseButton.addEventListener("click", () => {
    closePopup(constants.popupAddPhoto);
  });

  constants.popupImageCloseButton.addEventListener("click", () => {
    closePopup(constants.popupImage);
  });

  constants.overlayList.forEach((overlay) => {
    overlay.addEventListener("click", closeOverlay);
  });
}

function initFormValidating(formElement, formSubmitFunction) {
  new FormValidator(
    constants.formValidatorData,
    formElement,
    formSubmitFunction
  ).enableValidation();
}

function initialRenderCard(cards, CardClass) {
  cards.forEach((card) => {
    constants.placesContainer.append(
      createCard(CardClass, card.link, card.name)
    );
  });
}

initialRenderCard(cards, Card);
setEventListeners(Card);
initFormValidating(constants.popupFormEditProfile, handleProfileFormSubmit);
initFormValidating(constants.popupFormAddPhoto, handleCardFormSubmit);
