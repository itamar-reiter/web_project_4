//variables for default displayed content
const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileAboutMe = profile.querySelector(".profile__about-me");
const editButton = profile.querySelector("#editButton");
const addButton = profile.querySelector("#addButton");
const placesContainer = document.querySelector(".grid-elements");
const overlayList = Array.from(document.querySelectorAll(".popup"));

//variables for popup's content
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupEditProfileCloseButton = popupEditProfile.querySelector(
  ".popup__close-icon_type_form"
);
const popupFormEditProfile = document.querySelector(
  ".popup__form_type_edit-profile"
);
const nameInput = document.querySelector(".popup__input_type_name");
const aboutMeInput = document.querySelector(".popup__input_type_about-me");
const popupEditProfileSubmitButton = popupFormEditProfile.querySelector(
  ".popup__submit-button"
);
const popupAddPhoto = document.querySelector(".popup_type_add-photo");
const popupAddPhotoCloseButton = popupAddPhoto.querySelector(
  ".popup__close-icon_type_form"
);
const popupFormAddPhoto = document.querySelector(".popup__form_type_add-photo");
const titleInput = document.querySelector(".popup__input_type_title");
const imageLinkInput = document.querySelector(".popup__input_type_image-link");
const popupAddPhotoSubmitButton = popupFormAddPhoto.querySelector(
  ".popup__submit-button"
);
const popupImage = document.querySelector(".popup_type_image");
const popupImageCloseButton = document.querySelector(
  ".popup__close-icon_type_image"
);
const popupBackground = popupImage.querySelector(".popup__background");
const popupPlaceName = popupImage.querySelector(".popup__place-name");
const formValidatorData = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error-message_active",
};

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
  const popup = document.querySelector(".popup_active");
  if (evt.key === "Escape") {
    closePopup(popup);
  }
}

function closeOverlay(evt) {
  closePopup(evt.target);
}

function openEditProfilePopup() {
  addInputsFormEditProfile();
  openPopup(popupEditProfile);
}

function addInputsFormEditProfile() {
  nameInput.value = profileName.textContent;
  aboutMeInput.value = profileAboutMe.textContent;
}

function handleProfileFormSubmit() {
  profileName.textContent = nameInput.value;
  profileAboutMe.textContent = aboutMeInput.value;
  closePopup(popupEditProfile);
}

function handleCardFormSubmit(Card) {
  placesContainer.prepend(
    new Card(
      imageLinkInput.value,
      titleInput.value,
      "#cardTemplate",
      openPopupImage
    ).generateCard()
  );
  resetSubmitButtonCardForm();
  closePopup(popupAddPhoto);
  popupFormAddPhoto.reset();

}

function resetSubmitButtonCardForm(){
  popupAddPhotoSubmitButton.disabled = true;
  popupAddPhotoSubmitButton.classList.add("popup__submit-button_inactive");
}

function openPopupImage(cardName, cardImage) {
  openPopup(popupImage);
  addContentPopupImage(cardName, cardImage);
}

function addContentPopupImage(cardName, cardImage) {
  popupBackground.style.backgroundImage =
    `
      url(` +
    cardImage +
    `)`;
  popupPlaceName.textContent = cardName;
}

//exported functions//

function setEventListeners(Card) {
  //edit button event listeners
  addInputsFormEditProfile();
  editButton.addEventListener("click", () => {
    openEditProfilePopup();
    console.log("edit popup open");
  });
  popupEditProfileSubmitButton.addEventListener(
    "click",
    handleProfileFormSubmit
  );

  popupEditProfileCloseButton.addEventListener("click", () => {
    closePopup(popupEditProfile);
  });

  //add button event listeners
  addButton.addEventListener("click", () => {
    openPopup(popupAddPhoto);
    console.log("add photo popup open");
  });

  popupAddPhotoSubmitButton.addEventListener("click", () => {
    handleCardFormSubmit(Card);
  });

  popupAddPhotoCloseButton.addEventListener("click", () => {
    closePopup(popupAddPhoto);
  });

  popupImageCloseButton.addEventListener("click", () => {
    closePopup(popupImage);
  });

  overlayList.forEach((overlay) => {
    overlay.addEventListener("click", closeOverlay);
  });
}

function initFormValidating(FormValidator) {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach(formElement => {
    new FormValidator(formValidatorData, formElement).enableValidation();
  })
}

function initialRenderCard(cards, CardClass) {
  cards.forEach((card) => {
    placesContainer.append(
      new CardClass(
        card.link,
        card.name,
        "#cardTemplate",
        openPopupImage
      ).generateCard()
    );
  });
}

export { setEventListeners, initFormValidating, initialRenderCard };
