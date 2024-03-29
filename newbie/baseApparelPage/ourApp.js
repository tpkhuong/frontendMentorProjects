function ourSelectors() {
  var formElement = document.querySelector("form[action='#']");
  var emailInputElement = document.querySelector("input[type='email']");

  return {
    formElement,
    emailInputElement,
  };
}

// we used css to handle invalid

activeState();

function activeState({ formElement, emailInputElement } = ourSelectors()) {
  emailInputElement.addEventListener("invalid", function showError(event) {
    event.preventDefault();
    console.log(event.target);
  });
}
