//variables for default displayed content
export const apiData = {
  groupId: "group-12",
  token: "4c5ffc10-7ef8-4216-9730-733ca7b03273",
  serverAdress: "https://around.nomoreparties.co",
  userId: "2e5154ce112b4a6ba0a11409",
};
export const profile = document.querySelector(".profile");
export const userImage = document.querySelector(".user-image");
export const profileName = profile.querySelector(".profile__name");
export const profileAboutMe = profile.querySelector(".profile__about-me");
export const editButton = profile.querySelector("#editButton");
export const addButton = profile.querySelector("#addButton");
export const placesContainer = document.querySelector(".grid-elements");
export const overlayList = Array.from(document.querySelectorAll(".popup"));

//variables for popup's content
export const popupEditProfile = document.querySelector(
  ".popup_type_edit-profile"
);
export const popupEditProfileCloseButton = popupEditProfile.querySelector(
  ".popup__close-icon_type_form"
);
export const popupFormEditProfile = document.querySelector(
  ".popup__form_type_edit-profile"
);
export const nameInput = document.querySelector(".popup__input_type_name");
export const aboutMeInput = document.querySelector(
  ".popup__input_type_about-me"
);
export const popupEditProfileSubmitButton = popupFormEditProfile.querySelector(
  ".popup__submit-button"
);
export const popupAddPhoto = document.querySelector(".popup_type_add-photo");
export const popupAddPhotoCloseButton = popupAddPhoto.querySelector(
  ".popup__close-icon_type_form"
);
export const popupFormAddPhoto = document.querySelector(
  ".popup__form_type_add-photo"
);
export const titleInput = document.querySelector(".popup__input_type_title");
export const imageLinkInput = document.querySelector(
  ".popup__input_type_image-link"
);
export const popupAddPhotoSubmitButton = popupFormAddPhoto.querySelector(
  ".popup__submit-button"
);
export const popupImage = document.querySelector(".popup_type_image");
export const popupImageCloseButton = document.querySelector(
  ".popup__close-icon_type_image"
);
export const popupBackground = popupImage.querySelector(".popup__background");
export const popupPlaceName = popupImage.querySelector(".popup__place-name");
export const formValidatorData = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error-message_active",
};
