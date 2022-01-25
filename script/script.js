const popupImage = document.querySelector(".popup-image");
const popupImageBackground = popupImage.querySelector(".popup-image__background");
const popupImageCloseButton = popupImageBackground.querySelector(".popup-image__close-icon");
const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileAboutMe = profile.querySelector(".profile__about-me");
const editButton= profile.querySelector("#editButton");
const addButton= profile.querySelector("#addButton");
const placesContainer = document.querySelector(".grid-elements");
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];
const popupEdit = document.querySelector(".popup-edit");
const popupEditForm = popupEdit.querySelector(".popup-edit__form");
const popupTitle = popupEditForm.querySelector(".popup-edit__title");
const formCloseButton = popupEditForm.querySelector("#close-icon");
const form = popupEditForm.querySelector(".form");
const formSubmitButton = form.querySelector(".form__save-button");
const nameInput = form.querySelector("#name");
const aboutMeInput = form.querySelector("#about-me");
function singleNewPlace(placeName, placePhoto){
  const newPlaceTemplate = document.querySelector("#newPlaceTemplate").content;
  const newPlace = newPlaceTemplate.querySelector(".element").cloneNode(true);
  const cardGarbageButton = newPlace.querySelector(".element__garbage-button");
  const cardImage = newPlace.querySelector(".element__image");
  const cardName = newPlace.querySelector(".element__name");
  const cardLikeButton = newPlace.querySelector(".element__like-button");
  cardName.textContent = placeName;
  cardImage.src = placePhoto;
  cardGarbageButton.addEventListener("click", () => {
    newPlace.remove();
  });
  cardImage.addEventListener("click", () => {
    popupImageBackground.style.backgroundImage = "url("+ cardImage.src +")";
    popupImage.classList.add("popup-image_active");
  });
  popupImageCloseButton.addEventListener("click", () => {
    popupImage.classList.remove("popup-image_active");
  });
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("element__like-button_active");
  });
  return newPlace;
}
initialCards.forEach(card => { 
placesContainer.append(singleNewPlace(card.name, card.link));
})
function enableDisableFormEdit(){
  if (popupEdit.classList.contains("popup-edit_opened") !== true){
    nameInput.value = profileName.textContent;
    aboutMeInput.value = profileAboutMe.textContent;
    popupTitle.textContent = "Edit profile";
    nameInput.placeholder = "name";
    aboutMeInput.placeholder = "about me";
    formSubmitButton.textContent = "Save";
  }
  popupEdit.classList.toggle("popup-edit_opened");
}
function enableDisableFormAdd(){
  if (popupEdit.classList.contains("popup-edit_opened") !== true){
    nameInput.value = "";
    aboutMeInput.value = "";
    popupTitle.textContent = "New place";
    nameInput.placeholder = "title";
    aboutMeInput.placeholder = "Image link";
    formSubmitButton.textContent = "Create";
  }
  popupEdit.classList.toggle("popup-edit_opened");
}
function handleProfileFormSubmit(evt){
  evt.preventDefault();
  if (formSubmitButton.textContent === "Save"){
    profileName.textContent = nameInput.value;
    profileAboutMe.textContent = aboutMeInput.value;
  }
  else{
    placesContainer.prepend(singleNewPlace(nameInput.value, aboutMeInput.value));
  }
  enableDisableFormEdit();
}
editButton.addEventListener("click", enableDisableFormEdit);
addButton.addEventListener("click", enableDisableFormAdd);
formCloseButton.addEventListener("click", enableDisableFormEdit);
form.addEventListener("submit" , handleProfileFormSubmit);