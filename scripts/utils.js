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

//call Card class

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
      titleInput.value,
      imageLinkInput.value,
      "#cardTemplate",
      openPopupImage,
    ).generateCard()
  );
  closePopup(popupAddPhoto);
  popupFormAddPhoto.reset();
}

function closeOverlay(evt) {
  closePopup(evt.target);
}

function addContentPopupImage(cardName, cardImage) {
  popupBackground.style.backgroundImage =
    `
      url(` +
    cardImage +
    `)`;
  popupPlaceName.textContent = cardName;
}

function openPopupImage(cardName, cardImage) {
  openPopup(popupImage);
  addContentPopupImage(cardName, cardImage);
}

function setEventListeners(FormValidator, formValidatorData, Card) {
  //edit button event listeners
  editButton.addEventListener("click", () => {
    openEditProfilePopup();
    const popupFormEditProfileValidator = new FormValidator(
      formValidatorData,
      popupFormEditProfile
    ).enableValidation();
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
    const popupFormAddPhotoValidator = new FormValidator(
      formValidatorData,
      popupFormAddPhoto
    ).enableValidation();
    console.log("add photo popup open");
  });

  popupAddPhotoSubmitButton.addEventListener("click", () => {handleCardFormSubmit(Card);});

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
export { openPopupImage, setEventListeners, handleCardFormSubmit, placesContainer};