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
const popupAddPhoto = document.querySelector(".popup_type_add-photo");
const popupAddPhotoCloseButton = popupAddPhoto.querySelector(
  ".popup__close-icon_type_form"
);
const popupFormAddPhoto = document.querySelector(".popup__form_type_add-photo");
const titleInput = document.querySelector(".popup__input_type_title");
const imageLinkInput = document.querySelector(".popup__input_type_image-link");
const popupImage = document.querySelector(".popup_type_image");
const popupImageCloseButton = document.querySelector(
  ".popup__close-icon_type_image"
);
const popupBackground = popupImage.querySelector(".popup__background");
const popupPlaceName = popupImage.querySelector(".popup__place-name");
const cardTemplate = document.querySelector("#cardTemplate").content;

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
    card.remove();
  });
  cardImage.addEventListener("click", () => {
    addContentPopupImage(cardImage, placeName);
    openPopup(popupImage);
  });
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("element__like-button_active");
  });
  return card;
}

function addContentPopupImage(cardImage, placeName) {
  popupBackground.style.backgroundImage =
    `
      url(` +
    cardImage.src +
    `)`;
  popupPlaceName.textContent = placeName;
}

function openPopup(popup) {
  popup.classList.add("popup_active");
  document.addEventListener("keydown", (evt) =>  {closeWithEsc(evt, popup)});
}

function closePopup(popup) {
  popup.classList.remove("popup_active");
  document.removeEventListener("keydown", (evt) =>  {closeWithEsc(evt, popup)});
  console.log("escape listener removed");
} 

function closeWithEsc(evt, popup) {
  if(evt.key === "Escape") {
    closePopup(popup);
  }
}

function openEditProfilePopup() {
  nameInput.value = profileName.textContent;
  aboutMeInput.value = profileAboutMe.textContent;
  openPopup(popupEditProfile);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAboutMe.textContent = aboutMeInput.value;
  closePopup(popupEditProfile);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  placesContainer.prepend(createCard(titleInput.value, imageLinkInput.value));
  closePopup(popupAddPhoto);
  popupFormAddPhoto.reset();
}

function closeOverlay(evt) {
  console.log(evt.target);
  closePopup(evt.target);
}

initialCards.forEach((card) => {
  placesContainer.append(createCard(card.name, card.link));
});

popupImageCloseButton.addEventListener("click", () => {
  closePopup(popupImage);
});
editButton.addEventListener("click", () => {
  openEditProfilePopup();
  enableValidation(popupFormEditProfile, handleProfileFormSubmit);
});
popupEditProfileCloseButton.addEventListener("click", () => {
  closePopup(popupEditProfile);
});
addButton.addEventListener("click", () => {
  openPopup(popupAddPhoto);
  enableValidation(popupFormAddPhoto, handleCardFormSubmit);
});
popupAddPhotoCloseButton.addEventListener("click", () => {
  closePopup(popupAddPhoto);
});
overlayList.forEach((overlay) => {
  overlay.addEventListener("click", closeOverlay);
});
