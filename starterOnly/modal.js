function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
// const formData      = document.querySelectorAll(".formData");
const modalCloseBtn = document.querySelector(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
modalCloseBtn.addEventListener("click", closeModal);

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}


/* FORM CONTROL */
let form = document.querySelector(".form-data");   // STOCK FORM
let btnSubmit = document.querySelector(".btn-submit");  // BTN SUBMIT FORM


/* ===============
-- SUBMIT FORM --
================== */
form.addEventListener("submit", function (event) {

  event.preventDefault();

  checkFirst();
  checkLast();
  checkEmail();
  checkBirthdate();
  checkQuantity(form.quantity.value);
  checkRadioTournament();
  checkConditions();
  checkNewsletter(form.checkbox2);

  validate();
});


/* ====================
-- FUNCTION VALIDATE --
======================= */
function validate() {

  /* IF FORM OK */
  if ((checkFirst()) && (checkLast()) && (checkEmail()) && (checkBirthdate()) && (checkQuantity()) && (checkRadioTournament()) && (checkConditions())) {

    /* REMOVE FORM  */
    form.remove();

    /* Je créé le prochain contenu */
    let modalBody = document.querySelector(".modal-body");
    modalBody.classList.add("modal-succes");
    let btncloseModal = document.createElement("button");
    btncloseModal.textContent = " Fermer ";

    modalBody.innerHTML = "<p>Merci pour<br> votre inscription</p>";
    modalBody.appendChild(btncloseModal);
    btncloseModal.classList.add("btn-signup");

    // close modal event
    btncloseModal.addEventListener("click", closeModal);
  }
}

/* FONCTION VÉRIFIE LONGUEUR D UN CHAMP ET SI IL N'EST PAS VIDE */
function checkLength(data) {
  if (data.value.trim().length <= 2) {
    return false;
  } else {
    return true;
  }
}


/* FIRST */
function checkFirst() {
  if (checkLength(form.first)) {
    form.first.parentElement.removeAttribute("data-error");
    form.first.parentElement.removeAttribute("data-error-visible");
    return true;
  }
  else {
    form.first.parentElement.setAttribute("data-error", "Le prénom est trop court");
    form.first.parentElement.setAttribute("data-error-visible", "true");
    return false;
  }
}

/* LAST */
function checkLast() {
  if (checkLength(form.last)) {
    form.last.parentElement.removeAttribute("data-error");
    form.last.parentElement.removeAttribute("data-error-visible");
    return true;
  }
  else {
    form.last.parentElement.setAttribute("data-error", "Le nom est trop court");
    form.last.parentElement.setAttribute('data-error-visible', 'true');
    return false;
  }
}


/* EMAIL */
function checkEmail() {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let dataEmail = document.querySelector("#email");

  if (dataEmail != undefined) {
    if (regexEmail.test(dataEmail.value)) {
      form.email.parentElement.removeAttribute("data-error");
      form.email.parentElement.removeAttribute("data-error-visible");
      return true;
    } else {
      form.email.parentElement.setAttribute("data-error", "Veuillez entrer une adresse e-mail valide");
      form.email.parentElement.setAttribute('data-error-visible', 'true');
      return false;
    }
  }
}


/* BIRTH DATE */
function checkBirthdate() {
  let birthDate = document.querySelector("#birthdate");

  if (birthDate != undefined) {
    if ((birthDate.value == undefined) || (birthDate.value == "") || (birthDate.value === null)) {
      form.birthdate.parentElement.setAttribute("data-error", "Veuillez sélectionner une date");
      form.birthdate.parentElement.setAttribute('data-error-visible', 'true');
      return false;
    }
    else {
      form.birthdate.parentElement.removeAttribute("data-error");
      form.birthdate.parentElement.removeAttribute("data-error-visible");
      return true;
    }
  }
}

/* QUANTITY TOURNAMENTS */
function checkQuantity(quantity) {
  if ((Number(quantity) != isNaN) || (quantity == 0)) {
    return true;
  }
  else {
    alert("Veuillez entre une valeure comprise entre 0 et 99");
    return false;
  }
};


function checkRadioTournament() {
  let input = document.querySelector(".checkbox-input");

  const radioButtons = document.getElementsByName("location");
  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      input.parentElement.removeAttribute("data-error");
      // input.parentElement.removeAttribute("data-error-visible");
      return true;
    }
    else {
      input.parentElement.setAttribute("data-error", "Veuillez sélectionner une ville");
      input.parentElement.setAttribute('data-error-visible', 'true');
      return false;
    }
  }

}



function checkConditions() {
  let rulesAccepted = document.querySelector("#checkbox1");
  if ((rulesAccepted === null)) {
    return false;
  } else {
    if ((!rulesAccepted.checked)) {
      rulesAccepted.parentElement.setAttribute("data-error", "Veuillez accepter les conditions d'utilisation.");
      rulesAccepted.parentElement.setAttribute("data-error-visible", "true");
      return false;
    } else {
      rulesAccepted.parentElement.removeAttribute("data-error");
      rulesAccepted.parentElement.removeAttribute("data-error-visible");
      return true;
    }
  }
}

/* NEWSLETTER */
function checkNewsletter(label) {
  if (!label.checked) {
    return false;
  }
  return true;
}

