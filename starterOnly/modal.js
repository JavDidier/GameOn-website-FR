function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg     = document.querySelector(".bground");
const modalBtn    = document.querySelectorAll(".modal-btn");
const formData    = document.querySelectorAll(".formData");

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



/* CONTROL FIRST (PRENOM )*/
/* CONTROL LAST (NOM)*/
let form           = document.querySelector(".form-data");   // STOCK FORM
let btnSubmit      = document.querySelector(".btn-submit");  // BTN SUBMIT FORM

let stateSubmitBtn = false;                                  // Par défaut le formulaire n'est pas valide ( pas remplis )


// REGEXP
let text         = "^[a-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ -]{2,30}$";
let textaddress  = "^[0-9a-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ -]{2,50}$";

/* ===============
-- BTN SUBMIT --
================== */
form.addEventListener("submit", function(event) {

    event.preventDefault();
    
    /* VÉRIFIER PRÉNOM */
    checkFirst(form.first);
    event.stopPropagation();

    /* VÉRIFIER NOM */
    checkLast(form.last);

    /* VÉRIFIER EMAIL */
    checkEmail(form.email);

    /* VÉRIFIER DATE DE NAISSANCE */
    checkBirthdate(form.birthdate.value);

    /* VÉRIFIER NOMBRE DE TOURNOIS */
    checkQuantity(form.quantity.value);

    /* VÉRIFIER SELECTION D UN TOURNOIS */
    checkRadioTournament();

    /* Accepter les conditions générales d'utilisation */
    checkConditions();

    /* inscriptions newsletter */
    checkNewsletter(form.checkbox2);

    validate();

  });


  
function validate() {
  if((checkFirst()) && (checkLast()) && (checkEmail(form.email)) && (checkBirthdate()) && (checkQuantity()) && (checkRadioTournament()) && (checkConditions())){
    console.log("Le formulaire est valide");
    return true;
  }else {
    console.log("Le formulaire n'est pas valide");
    return false;
  }
}

/* FONCTION VÉRIFIE LONGUEUR D UN CHAMP ET SI IL N'EST PAS VIDE */
function validateName(label) {
  if (label.value.trim().length <= 2 || label.value == "") {
    return false;
  } else {
    return true;
  }
}


/* FIRST */
function checkFirst() {
  if (validateName(form.first)) {
    form.first.parentElement.removeAttribute("data-error");
    form.first.parentElement.removeAttribute("data-error-visible");
    return true;
  }
  else {
    form.first.parentElement.setAttribute("data-error", "Le Prénom est trop court");
    form.first.parentElement.setAttribute("data-error-visible", "true");
    return false;
  }
}

/* LAST */
function checkLast() {
  if (validateName(form.last)) {
    form.last.parentElement.removeAttribute("data-error");
    form.last.parentElement.removeAttribute("data-error-visible");
    return true;
  }
  else {
    form.last.parentElement.setAttribute("data-error", "Le Nom est trop court");
    form.last.parentElement.setAttribute('data-error-visible', 'true');
    return false;
  }
}

/* EMAIL */
function checkEmail(label) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(label.value.trim()) || label.value == undefined) {
    form.email.parentElement.setAttribute("data-error", "Veuillez entrer une adresse e-mail valide");
    form.email.parentElement.setAttribute('data-error-visible', 'true');
    return false;
  } else {
    form.email.parentElement.removeAttribute("data-error");
    form.email.parentElement.removeAttribute("data-error-visible");
    return true;
  }
}

/* BIRTH DATE */
function checkBirthdate() {
  let birthDate = document.querySelector("#birthdate");

  if (!birthDate.value || birthDate.value == undefined || birthDate.value == "") {
    form.birthdate.parentElement.setAttribute("data-error", "Veuillez sélectionner une date");
    form.birthdate.parentElement.setAttribute('data-error-visible', 'true');
    return false;
  }
  form.birthdate.parentElement.removeAttribute("data-error");
  form.birthdate.parentElement.removeAttribute("data-error-visible");
  return true;
}

/* QUANTITY TOURNAMENTS */
function checkQuantity(quantity) {
  if((Number(quantity) != isNaN) || (quantity == 0)){
    return true;
  }
  else {
    alert("Veuillez entre une valeure comprise entre 0 et 99");
    return false;
  }
};

/* RADIO TOURNAMENT */
function checkRadioTournament() {
  let location = document.querySelector('input[name="location"]:checked');
  let input = document.querySelector(".checkbox-input");

  if (!location) {
    input.parentElement.setAttribute("data-error", "Veuillez sélectionner une ville");
    input.parentElement.setAttribute('data-error-visible', 'true');
    return false;
  }
  input.parentElement.removeAttribute("data-error");
  input.parentElement.removeAttribute("data-error-visible");
  return true;
}

/* CONDITION */
function checkConditions() {
  let rulesAccepted = document.querySelector("#checkbox1");


  if ((!rulesAccepted.checked)) {
    rulesAccepted.parentElement.setAttribute("data-error", "Veuillez accepter les conditions d'utilisation.");
    rulesAccepted.parentElement.setAttribute('data-error-visible', 'true');
    return false;
  }
  rulesAccepted.parentElement.removeAttribute("data-error");
  rulesAccepted.parentElement.removeAttribute("data-error-visible");
  return true;
}

/* NEWSLETTER */
function checkNewsletter(label) {
  if (!label.checked) {
    return false;
  }
  return true;
}