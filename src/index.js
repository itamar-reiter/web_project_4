import "./pages/index.css";
import cards from "./cards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import * as constants from "./utils/constants.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import Section from "./Section.js";

//create instances for both forms

const popupProfileForm = new PopupWithForm(
  ".popup_type_edit-profile",
  () => {
    popupProfileForm._getInputValue();
    constants.profileName.textContent = popupProfileForm._inputData.name;
    constants.profileAboutMe.textContent = popupProfileForm._inputData.aboutMe;
    popupProfileForm.close();
  }
);

const popupCardForm = new PopupWithForm(
  ".popup_type_add-photo",
  (_getInputValue) => {
    const newCard = new Card(
      _getInputValue.imageLink,
      _getInputValue.title,
      "#cardTemplate",
      new PopupWithImage(
        ".popup_type_image",
        _getInputValue.title,
        _getInputValue.imageLink
      )
    );
    newCard.generateCard();
  }
);

/* function handleCardFormSubmit() {
    constants.placesContainer.prepend(
      createCard(constants.imageLinkInput.value, constants.titleInput.value)
    );
    closePopup(constants.popupAddPhoto);
    constants.popupFormAddPhoto.reset();
  } */

function openEditProfilePopup() {
  addInputsFormEditProfile();
}

function addInputsFormEditProfile() {
  constants.nameInput.value = constants.profileName.textContent;
  constants.aboutMeInput.value = constants.profileAboutMe.textContent;
}

/* function createCard(cardImage, cardName) {
  const newCard = new Card(
    cardImage,
    cardName,
    "#cardTemplate",
    new PopupWithImage(".popup_type_image", cardName, cardImage)
  );
  return newCard.generateCard();
} */

//exported functions//

function setEventListeners() {
  //edit button event listeners
  addInputsFormEditProfile();
  constants.editButton.addEventListener("click", () => {
    openEditProfilePopup();
    popupProfileForm.open();
    popupProfileForm.setEventListeners();
  });

  //add button event listeners
  constants.addButton.addEventListener("click", () => {
    popupCardForm.open();
    popupCardForm.setEventListeners();
  });
}

function initFormValidating(formElement, formSubmitFunction) {
  new FormValidator(
    constants.formValidatorData,
    formElement,
    formSubmitFunction
  ).enableValidation();
}

const initialCards = new Section(
  {
    items: cards,
    renderer: (item) => {
      const renderedCard = new Card(
        item.link,
        item.name,
        "#cardTemplate",
        new PopupWithImage(".popup_type_image", item.name, item.link)
      ).generateCard();
      initialCards.setItem(renderedCard);
    },
  },
  ".grid-elements"
);
//instance of Section for initialCards
initialCards.renderItems();
setEventListeners();
initFormValidating(constants.popupFormEditProfile, handleProfileFormSubmit);
initFormValidating(constants.popupFormAddPhoto, handleCardFormSubmit);
