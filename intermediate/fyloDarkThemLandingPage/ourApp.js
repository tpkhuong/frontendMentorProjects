(function ourScopeVariables() {
  // calling our functions
  // our selectors
  console.log(
    "using selector :invalid on email to show error message when the email input is invalid when its valid we have display none on error-message"
  );
  const { emailElement } = ourSelectors();
  resetInputValues();

  function ourSelectors() {
    const emailElement = document.getElementById("email");

    return { emailElement };
  }

  function resetInputValues() {
    window.addEventListener("load", function emptyEmailInputOnLoad(event) {
      emailElement.value = "";
    });
  }
})();
