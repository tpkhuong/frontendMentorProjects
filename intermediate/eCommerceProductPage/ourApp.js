(function scopeOurVariables() {
  //   our selectors
  const { headerElement, mobileCloseBtn, arrOfMobileNavbarAnchorTags } =
    ourSelectors();
  // add event listeners
  addEventListeners();
  console.log(headerElement);
  function ourSelectors() {
    const mobileCloseBtn = document.querySelector(
      "#mobile-modal-style-wrapper .close-menu-btn"
    );
    /** select the anchor tag of mobile nav menu **/
    const arrOfMobileNavbarAnchorTags = document.querySelectorAll(
      ".mobile-menu-navigation .navlink"
    );
    //   header element
    const headerElement = document.querySelector("[role='banner']");
    return {
      headerElement,
      mobileCloseBtn,
      arrOfMobileNavbarAnchorTags,
    };
  }

  function addEventListeners() {
    headerElement.addEventListener("keydown", keyboardFunctionality);
  }

  function keyboardFunctionality(event) {
    //   check for shift key pressed before tab key pressed
    if (document.activeElement == mobileCloseBtn) {
      console.log("here");
    }
  }

  function getLastElementOfMobileNav(arrInput) {
    const lengthOfArrInput = arrInput.length;
    const lastItemOfArr = arrInput[lengthOfArrInput - 1];
    return lastItemOfArr;
  }
})();
