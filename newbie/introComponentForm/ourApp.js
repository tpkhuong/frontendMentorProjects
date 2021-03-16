function ourSelectors() {
  var firstnameInput = document.querySelector("[id='firstname']");
  var lastnameInput = document.querySelector("[id='lastname']");
  var emailInput = document.querySelector("[id='email']");
  var passwordInput = document.querySelector("[id='password']");
  var formElement = document.querySelector(".form");

  return {
    firstnameInput,
    lastnameInput,
    emailInput,
    passwordInput,
    formElement,
  };
}

customeValidMessage();

function customeValidMessage(
  /***** check element.validity.valid *****/
  {
    firstnameInput,
    lastnameInput,
    emailInput,
    passwordInput,
    formElement,
  } = ourSelectors()
) {
  alert("getting close");
  var spanElementInErrorContainer;
  var imgContainerWithErrorImg;
  var testStr;
  formElement.addEventListener("submit", function showInvalidMessage(event) {
    event.preventDefault();
    if (!firstnameInput.validity.valid) {
      testStr = "hello world";
      spanElementInErrorContainer = firstnameInput.nextElementSibling;
      imgContainerWithErrorImg = spanElementInErrorContainer.nextElementSibling;
      firstnameInput.classList.add("invalid-message-border");
      spanElementInErrorContainer.classList.remove("hide");
      imgContainerWithErrorImg.classList.remove("hide");
    } else {
      console.log(testStr);
      console.log(spanElementInErrorContainer);
      console.log(imgContainerWithErrorImg);
    }
  });
}
