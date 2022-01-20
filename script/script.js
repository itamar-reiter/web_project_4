let profileName = document.querySelector(".profile__name");
let profileAboutMe = document.querySelector(".profile__about-me");
let editButton= document.querySelector("#editButton");
let addButton= document.querySelector("#addButton");
let popupEdit = document.querySelector(".popup-edit");
let popupEditForm = popupEdit.querySelector(".popup-edit__form");
const popupTitle = popupEditForm.querySelector(".popup-edit__title");
let formCloseButton = popupEditForm.querySelector("#close-icon");
let form = popupEditForm.querySelector(".form");
let formSubmitButton = form.querySelector(".form__save-button");
let nameInput = form.querySelector("#name");
let aboutMeInput = form.querySelector("#about-me");
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
    nameInput.value = "";
    aboutMeInput.value = "";
    popupTitle.textContent = "New place";
    nameInput.placeholder = "title";
    aboutMeInput.placeholder = "Image link";
    formSubmitButton.textContent = "Create";
  popupEdit.classList.toggle("popup-edit_opened");
}
function handleProfileFormSubmit(evt){
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAboutMe.textContent = aboutMeInput.value;
  enableDisableFormEdit();
}
editButton.addEventListener("click", enableDisableFormEdit);
addButton.addEventListener("click", enableDisableFormAdd);
formCloseButton.addEventListener("click", enableDisableFormEdit);
form.addEventListener("submit" , handleProfileFormSubmit);
/*
if (nameInput.textContent ==! "" && aboutMeInput.textContent ==! ""){
  formSubmitButton.classList.add("popup-edit__save-button_active");
}
*/
