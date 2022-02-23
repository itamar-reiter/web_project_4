import cards from "./cards.js";
import Card from "./Card.js";
const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileAboutMe = profile.querySelector(".profile__about-me");
const editButton = profile.querySelector("#editButton");
const addButton = profile.querySelector("#addButton");
const placesContainer = document.querySelector(".grid-elements");
const overlayList = Array.from(document.querySelectorAll(".popup"));
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

/* const cardTemplate = document.querySelector("#cardTemplate").content;

function createCard(placeName, placePhoto) {
  const card = cardTemplate.querySelector(".element").cloneNode(true);
  const cardGarbageButton = card.querySelector(".element__garbage-button");
  const cardImage = card.querySelector(".element__image");
  const cardName = card.querySelector(".element__name");
  const cardLikeButton = card.querySelector(".element__like-button");
  cardName.textContent = placeName;
  cardImage.alt = placeName;
  cardImage.src = placePhoto;
  cardGarbageButton.addEventListener("click", () => {
    removeCard(card);
  });
  cardImage.addEventListener("click", () => {
    addContentPopupImage(cardImage, placeName);
    openPopup(popupImage);
  });
  cardLikeButton.addEventListener("click", () => {
    toggleCardLikeButton(cardLikeButton);
  });
  return card;
}

function removeCard(card) {
  card.remove();
}

function addContentPopupImage(cardImage, placeName) {
  popupBackground.style.backgroundImage =
    `
      url(` +
    cardImage.src +
    `)`;
  popupPlaceName.textContent = placeName;
}

function toggleCardLikeButton(cardLikeButton) {
  cardLikeButton.classList.toggle("element__like-button_active");
} */

//call Card class



function openPopup(popup) {
  popup.classList.add("popup_active");
  document.addEventListener("keydown", closeWithEsc);
}

function closePopup(popup) {
  document.removeEventListener("keydown", closeWithEsc);
  popup.classList.remove("popup_active");
  console.log("closePopupActivate");
}

function closeWithEsc(evt) {
  const popup = document.querySelector(".popup_active");
  if (evt.key === "Escape") {
    closePopup(popup);
  }
}

function addInputsFormEditProfile() {
  nameInput.value = profileName.textContent;
  aboutMeInput.value = profileAboutMe.textContent;
}

function openEditProfilePopup() {
  addInputsFormEditProfile();
  openPopup(popupEditProfile);
}

function handleProfileFormSubmit() {
  profileName.textContent = nameInput.value;
  profileAboutMe.textContent = aboutMeInput.value;
  closePopup(popupEditProfile);
}

function handleCardFormSubmit() {
  placesContainer.prepend(createCard(titleInput.value, imageLinkInput.value));
  closePopup(popupAddPhoto);
  popupFormAddPhoto.reset();
}

function closeOverlay(evt) {
  closePopup(evt.target);
}

cards.forEach((card) => {
  placesContainer.append(new Card(card.link, card.name, "#cardTemplate").generateCard());
});

popupImageCloseButton.addEventListener("click", () => {
  closePopup(popupImage);
});

addInputsFormEditProfile();

editButton.addEventListener("click", () => {
  openEditProfilePopup();
});

popupEditProfileSubmitButton.addEventListener("click", handleProfileFormSubmit);

popupEditProfileCloseButton.addEventListener("click", () => {
  closePopup(popupEditProfile);
});

addButton.addEventListener("click", () => {
  openPopup(popupAddPhoto);
});

popupAddPhotoSubmitButton.addEventListener("click", handleCardFormSubmit);

popupAddPhotoCloseButton.addEventListener("click", () => {
  closePopup(popupAddPhoto);
});

overlayList.forEach((overlay) => {
  overlay.addEventListener("click", closeOverlay);
});
