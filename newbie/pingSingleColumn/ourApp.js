function ourSelectors() {
  var formElement = document.querySelector("form");
  var emailInput = document.querySelector("[type='email']");

  return {
    formElement,
    emailInput,
  };
}

errorMessage();

function errorMessage({ formElement, emailInput } = ourSelectors()) {
  formElement.addEventListener("submit", function applyErrorMessage(event) {
    event.preventDefault();
    var spanElement = emailInput.nextElementSibling;
    if (!emailInput.validity.valid) {
      emailInput.classList.add("invalid-message-ring");
      spanElement.classList.remove("hide-off-left");
    } else {
      emailInput.classList.remove("invalid-message-ring");
      spanElement.classList.add("hide-off-left");
    }
  });

  window.addEventListener("load", function clearInput(event) {
    emailInput.value = "";
  });
}
