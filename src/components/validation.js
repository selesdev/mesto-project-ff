export function enableValidation() {
  const forms = document.querySelectorAll(".popup__form");
  forms.forEach((form) => {
    setEventListeners(form);
  });
}

function setEventListeners(form) {
  const inputs = Array.from(form.querySelectorAll(".popup__input"));
  const button = form.querySelector(".popup__button");

  toggleButtonState(inputs, button);

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(form, input);
      toggleButtonState(inputs, button);
    });
  });
}

function checkInputValidity(form, input) {
  const nameFieldsToValidate = ["name", "description", "place-name"];
  const allowedPattern = /^[А-Яа-яЁёA-Za-z -]+$/;

  if (nameFieldsToValidate.includes(input.name)) {
    if (!allowedPattern.test(input.value)) {
      const customMessage = input.dataset.errorMessage || "Разрешены только буквы, дефисы и пробелы";
      input.setCustomValidity(customMessage);
    } else {
      input.setCustomValidity("");
    }
  } else {
    input.setCustomValidity(""); 
  }

  if (!input.validity.valid) {
    showInputError(form, input);
  } else {
    hideInputError(form, input);
  }
}


export function showInputError(form, input) {
  const errorElement = form.querySelector(`.${input.classList[1]}-error`);
  input.classList.add("popup__input_type_error");
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add("popup__error_visible");
}

export function hideInputError(form, input) {
  const errorElement = form.querySelector(`.${input.classList[1]}-error`);
  if (!errorElement) return;
  input.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("popup__error_visible");
}

export function toggleButtonState(inputs, button) {
  const isFormValid = inputs.every((input) => input.validity.valid);
  button.disabled = !isFormValid;
  button.classList.toggle("popup__button_disabled", !isFormValid);
}

export function clearValidation(form) {
  const inputs = Array.from(form.querySelectorAll(".popup__input"));
  const button = form.querySelector(".popup__button");

  inputs.forEach((input) => {
    input.setCustomValidity("");
    hideInputError(form, input);
  });

  button.disabled = true;
  button.classList.add("popup__button_disabled");
}