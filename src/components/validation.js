export function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => {
    setEventListeners(form, config);
  });
}

function setEventListeners(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);

  toggleButtonState(inputs, button, config);

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(form, input, config);
      toggleButtonState(inputs, button, config);
    });
  });
}

function checkInputValidity(form, input, config) {
  if (input.validity.patternMismatch) {
    const customMessage = input.dataset.errorMessage || input.validationMessage;
    input.setCustomValidity(customMessage);
  } else {
    input.setCustomValidity("");
  }

  if (!input.validity.valid) {
    showInputError(form, input, config);
  } else {
    hideInputError(form, input, config);
  }
}

function showInputError(form, input, config) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  if (errorElement) {
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(config.errorClass);
  }
}

function hideInputError(form, input, config) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  if (errorElement) {
    errorElement.textContent = "";
    errorElement.classList.remove(config.errorClass);
  }
}

export function toggleButtonState(inputs, button, config) {
  const isFormValid = inputs.every((input) => input.validity.valid);
  button.disabled = !isFormValid;
  button.classList.toggle(config.inactiveButtonClass, !isFormValid);
}

export function clearValidation(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);

  inputs.forEach((input) => {
    input.setCustomValidity("");
    hideInputError(form, input, config);
  });

  button.disabled = true;
  button.classList.add(config.inactiveButtonClass);
}
