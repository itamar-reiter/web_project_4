gitlet profileName = document.querySelector(".profile__name");
let profileAboutMe = document.querySelector(".profile__about-me");
let editButton= document.querySelector("#editButton");
let popupEdit = document.querySelector(".popup-edit");
let popupEditForm = popupEdit.querySelector(".popup-edit__form");
let formCloseButton = popupEditForm.querySelector("#close-icon");
let form = popupEditForm.querySelector(".form");
let formSubmitButton = form.querySelector(".form__save-button");
let nameInput = form.querySelector("#name");
let aboutMeInput = form.querySelector("#about-me");
function enableDisableForm(){
  if (popupEdit.classList.contains("popup-edit_opened") !== true){
    nameInput.value = profileName.textContent;
    aboutMeInput.value = profileAboutMe.textContent;
  }
  popupEdit.classList.toggle("popup-edit_opened");
}
function handleProfileFormSubmit(evt){
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAboutMe.textContent = aboutMeInput.value;
  enableDisableForm();
}
editButton.addEventListener("click", enableDisableForm);
formCloseButton.addEventListener("click", enableDisableForm);
form.addEventListener("submit" , handleProfileFormSubmit);
/*
if (nameInput.textContent ==! "" && aboutMeInput.textContent ==! ""){
  formSubmitButton.classList.add("popup-edit__save-button_active");
}
*/
