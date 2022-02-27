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
  closePopup(evt.target);
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

function handleCardFormSubmit(Card) {
  constants.placesContainer.prepend(
    createCard(Card, constants.imageLinkInput.value, constants.titleInput.value)
  );
  resetSubmitButtonCardForm();
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

function resetSubmitButtonCardForm() {
  constants.popupAddPhotoSubmitButton.disabled = true;
  constants.popupAddPhotoSubmitButton.classList.add(
    "popup__submit-button_inactive"
  );
}

function openPopupImage(cardName, cardImage) {
  openPopup(popupImage);
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
    console.log("edit popup open");
  });
  constants.popupEditProfileSubmitButton.addEventListener(
    "click",
    handleProfileFormSubmit
  );

  constants.popupEditProfileCloseButton.addEventListener("click", () => {
    closePopup(constants.popupEditProfile);
  });

  //add button event listeners
  constants.addButton.addEventListener("click", () => {
    openPopup(constants.popupAddPhoto);
    console.log("add photo popup open");
  });

  constants.popupAddPhotoSubmitButton.addEventListener("click", () => {
    handleCardFormSubmit(Card);
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

function initFormValidating(FormValidator) {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    new FormValidator(
      constants.formValidatorData,
      formElement
    ).enableValidation();
  });
}

function initialRenderCard(cards, CardClass) {
  cards.forEach((card) => {
    constants.placesContainer.append(createCard(CardClass, card.link, card.name));
  });
}

initialRenderCard(cards, Card);
setEventListeners(Card);
initFormValidating(FormValidator);
