function ourSelectors() {
  var firstnameInput = document.querySelector("[id='firstname']");
  var lastnameInput = document.querySelector("[id='lastname']");
  var emailInput = document.querySelector("[id='email']");
  var passwordInput = document.querySelector("[id='password']");
  var formElement = document.querySelector(".form");
  var arrInputElementsWithRequiredAttr =
    document.querySelectorAll("input[required]");
  var bodyElement = document.querySelector("body");
  var submitBtn = document.getElementById("submit-btn");

  return {
    bodyElement,
    firstnameInput,
    lastnameInput,
    emailInput,
    passwordInput,
    formElement,
    arrInputElementsWithRequiredAttr,
    submitBtn,
  };
}

customeValidMessage();

function customeValidMessage(
  /***** check element.validity.valid *****/
  {
    bodyElement,
    firstnameInput,
    lastnameInput,
    emailInput,
    passwordInput,
    formElement,
    arrInputElementsWithRequiredAttr,
    submitBtn,
  } = ourSelectors()
) {
  let spanElementInErrorContainer;
  let imgContainerWithErrorImg;
  var testStr;
  submitBtn.addEventListener("click", function showInvalidMessage(event) {
    // event.preventDefault();
    console.log(event);
    /***** loop through the input elements *****/
    arrInputElementsWithRequiredAttr.forEach(function printStuff(eachInput) {
      if (!eachInput.validity.valid) {
        testStr = "hello world";
        let spanElementInErrorContainer = eachInput.nextElementSibling;
        let imgContainerWithErrorImg =
          spanElementInErrorContainer.nextElementSibling;
        eachInput.classList.add("invalid-message-border");
        spanElementInErrorContainer.classList.remove("hide");
        imgContainerWithErrorImg.classList.remove("hide");
      } else if (eachInput.validity.valid) {
        let spanElementInErrorContainer = eachInput.nextElementSibling;
        let imgContainerWithErrorImg =
          spanElementInErrorContainer.nextElementSibling;
        eachInput.classList.remove("invalid-message-border");
        spanElementInErrorContainer.classList.add("hide");
        imgContainerWithErrorImg.classList.add("hide");
      }
    });
    /***** loop through the input elements *****/
  });

  window.addEventListener("load", function clearInputs(event) {
    arrInputElementsWithRequiredAttr.forEach(function clearEachInputValue(
      inputElement
    ) {
      inputElement.value = "";
    });
  });
}
