(function scopeOurVariables() {
  // activate mobile menu selectors
  const {
    // close mobile menu
    modalWrapperElement,
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
    // faded modal wrapper
    const modalWrapperElement = document.querySelector(
      ".faded-bg-modal-wrapper"
    );
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
      modalWrapperElement,
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
    const { openMobileMenuBtn, mobileCloseBtn, modalWrapperElement } =
      ourSelectors();
    //add click listener to closebtn
    addClickListenerToCloseMobileBtn();
    //add keydown listener to mobile modal element
    addKeydownListenerToMobileModalElement();
    removeEventListener(openMobileMenuBtn, "click", mobileMenuFunctionality);
    // openMobileMenuBtn.removeEventListener("click", mobileMenuFunctionality);
    // hide open menu button
    addingAttr(openMobileMenuBtn, "hidden", "");
    // show mobile modal
    addingClass(modalWrapperElement, "active");
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
    const { openMobileMenuBtn, mobileCloseBtn, modalWrapperElement } =
      ourSelectors();

    // remove event listener from mobile modal element
    removeKeydownListenerOnMobileModalElement();
    // remove event listener from close btn
    removeEventListener(mobileCloseBtn, "click", closeMobileBtnFunctionality);
    // add click event to open menu btn
    addEventListener(openMobileMenuBtn, "click", mobileMenuFunctionality);
    // hide mobile modal
    removingClass(modalWrapperElement, "active");
    // show mobile menu btn
    removingAttr(openMobileMenuBtn, "hidden");
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
    removeEventListener(mobileModalElement, "keydown", tabThroughMobileMenu);
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

  function keyboardTabbingHelperFunc(eventInput, firstElement, lastElement) {
    // check for shift btn first
    // const targetElement = eventInput.target;
    // const targetKeyStrForm = eventInput.key;
    // const booleanShiftKeyPressed = eventInput.shiftKey;

    const { targetElement, targetKeyStrForm, booleanShiftKeyPressed } =
      propertiesOfEventObj(eventInput);
    // if shift key pressed enter check if tab key is pressed too
    if (booleanShiftKeyPressed) {
      targetKeyStrForm == "Tab" && targetElement == firstElement
        ? (focusElement(lastElement), eventInput.preventDefault())
        : null;
    } else {
      // user is not pressing down on shift key
      targetKeyStrForm == "Tab" && targetElement == lastElement
        ? (focusElement(firstElement), eventInput.preventDefault())
        : null;
    }
  }
  // helper func

  function propertiesOfEventObj(event) {
    return {
      targetElement: event.target,
      targetKeyStrForm: event.key,
      booleanShiftKeyPressed: event.shiftKey,
    };
  }

  /**
   * show element
   * **/

  function addingClass(element, attrStrValue) {
    element.classList.add(attrStrValue);
  }

  function addingAttr(element, attributeStr, attrStrValue) {
    element.setAttribute(attributeStr, attrStrValue);
  }
  /**
   * hide element
   * **/

  function removingAttr(element, attributeStr, attrStrValue) {
    element.removeAttribute(attributeStr);
  }

  function removingClass(element, attrStrValue) {
    element.classList.remove(attrStrValue);
  }

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
