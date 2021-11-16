(function scopeOurVariables() {
  // activate mobile menu selectors
  const {
    // close mobile menu
    mobileModalElement,
    openMobileMenuBtn,
    headerElement,
    mobileCloseBtn,
    arrOfMobileNavbarAnchorTags,
  } = ourSelectors();
  // add event listener to hamburger btn
  addEventListener(openMobileMenuBtn, "click", mobileMenuFunctionality);
  console.log(openMobileMenuBtn);
  function ourSelectors() {
    // mobile-modal
    const mobileModalElement = document.querySelector(".mobile-modal");
    // activate mobile menu
    const openMobileMenuBtn = document.querySelector(".open-mobile-menu-btn");
    // close mobile menu
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
      mobileModalElement,
      openMobileMenuBtn,
      headerElement,
      mobileCloseBtn,
      arrOfMobileNavbarAnchorTags,
    };
  }

  function keyboardFunctionality(event) {
    //   check for shift key pressed before tab key pressed
    if (document.activeElement == mobileCloseBtn) {
      console.log("here");
    }
  }

  function mobileMenuFunctionality(event) {
    // declare our selector at top of func
    const { openMobileMenuBtn, mobileCloseBtn } = ourSelectors();
    //add click listener to closebtn
    addClickListenerToCloseMobileBtn();
    //add keydown listener to mobile modal element
    addKeydownListenerToMobileModalElement();
    removeEventListener(openMobileMenuBtn, "click", mobileMenuFunctionality);
    // openMobileMenuBtn.removeEventListener("click", mobileMenuFunctionality);
    // focus on close btn
    focusElement(mobileCloseBtn);
  }

  function addClickListenerToCloseMobileBtn() {
    console.log("addClickListenerToCloseMobileBtn");
    const { mobileCloseBtn } = ourSelectors();
    addEventListener(mobileCloseBtn, "click", closeMobileBtnFunctionality);
    // mobileCloseBtn.addEventListener("click", closeMobileBtnFunctionality);
  }

  function closeMobileBtnFunctionality(eventInput) {
    // declare our selector at top of func
    const { openMobileMenuBtn, mobileCloseBtn } = ourSelectors();

    // remove event listener from mobile modal element
    removeKeydownListenerOnMobileModalElement();
    // remove event listener from close btn
    removeEventListener(mobileCloseBtn, "click", closeMobileBtnFunctionality);
    // focus on hamburger btn
    focusElement(openMobileMenuBtn);
  }

  function addKeydownListenerToMobileModalElement() {
    console.log("addKeydownListenerToMobileModalElement");
    const { mobileModalElement } = ourSelectors();
    addEventListener(mobileModalElement, "keydown", tabThroughMobileMenu);
    // mobileModalElement.addEventListener("keydown", tabThroughMobileMenu);
  }

  function removeKeydownListenerOnMobileModalElement() {
    const { mobileModalElement } = ourSelectors();
    removeEventListener(mobileModalElement, "keydown", mobileMenuFunctionality);
  }

  function tabThroughMobileMenu(event) {
    // declare our selectors at top of func
    const { mobileCloseBtn, arrOfMobileNavbarAnchorTags } = ourSelectors();
    const lastItemOfMobileMenu = getLastElementOfNavMenu(
      arrOfMobileNavbarAnchorTags
    );
    // run helper func
    keyboardTabbingHelperFunc(event, mobileCloseBtn, lastItemOfMobileMenu);
  }

  alert("work on this first");
  function keyboardTabbingHelperFunc(eventInput, firstElement, lastElement) {
    // check for shift btn first
    console.log(eventInput);
    console.log(firstElement);
    console.log(lastElement);
  }

  // helper func

  /**
   * focus element
   * **/

  function focusElement(element) {
    element.focus();
  }

  /**
   * add event listener
   * **/

  function addEventListener(element, eventStr, listenerCallback) {
    // headerElement.addEventListener("keydown", keyboardFunctionality);
    element.addEventListener(eventStr, listenerCallback);
  }

  /**
   * remove event listener
   * **/
  function removeEventListener(element, eventStrForm, eventListenerCallback) {
    element.removeEventListener(eventStrForm, eventListenerCallback);
  }
  function getLastElementOfNavMenu(arrInput) {
    const lengthOfArrInput = arrInput.length;
    const lastItemOfArr = arrInput[lengthOfArrInput - 1];
    return lastItemOfArr;
  }
})();
