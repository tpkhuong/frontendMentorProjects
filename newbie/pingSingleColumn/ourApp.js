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
    alert("work on error message");
    console.log(emailInput);
  });
}
