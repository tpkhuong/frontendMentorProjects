(function scopeOurVariables() {
  // activate mobile menu selectors
  const {
    cartBtn,
    ourDataElement,
    cartModalElement,
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
  addEventListener(cartBtn, "click", cartBtnFunctionality);
  // add event listener to cart btn

  console.log(openMobileMenuBtn);
  function ourSelectors() {
    const cartBtn = document.querySelector(".open-cart-btn");
    // data obj
    const ourDataElement = document.querySelector("#data");
    //cart modal
    const cartModalElement = document.querySelector("#modal-two");
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
      cartBtn,
      ourDataElement,
      cartModalElement,
      modalWrapperElement,
      mobileModalElement,
      openMobileMenuBtn,
      headerElement,
      mobileCloseBtn,
      arrOfMobileNavbarAnchorTags,
    };
  }
  // declare our data obj
  declareOurDataObj(ourDataElement);

  function declareOurDataObj(element) {
    element.dataElement = {
      cartIconQuantity: 0,
      // when we click on hamburger btn
      //look to see if cart modal has class "active"
      cartModalShown: null,
    };
  }

  function keyboardFunctionality(event) {
    //   check for shift key pressed before tab key pressed
    if (document.activeElement == mobileCloseBtn) {
      console.log("here");
    }
  }

  function mobileMenuFunctionality(event) {
    /**
     * when we click on hamburger btn
     * look to see if cart modal has class "active"
     * if cartModal has class "active" we want to remove it when hamburger btn is clicked
     * but we want to save a ref letting our other algorithm know that cartModal was shown
     * when user clicked on hamburger btn
     * when user click on "x" btn of mobile menu
     * we will apply class 'active' to cartModal
     * if user didnt click cartBtn to show cartModal leave it alone
     * **/
    // cartModal has class "active" or doesnt
    const booleanToCheckClassActiveOnCartModal = elementContainClass(
      cartModalElement,
      "active"
    );
    // func below will change value of cartModalShown based on booleanToCheckClassActiveOnCartModal
    changeValueOfCartModalShown(
      ourDataElement,
      booleanToCheckClassActiveOnCartModal
    );
    // if cartModal does have active class remove it
    if (booleanToCheckClassActiveOnCartModal) {
      removeClassFromElement(cartModalElement, "active");
    }
    /**
     * tenary operator
     * booleanToCheckClassActiveOnCartModal ? removeClassFromElement(cartModalElement, "active") : null
     * **/
    // console.log(elementContainClass(cartModalElement, "active"));
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

  /**
   * cart btn algorithm
   * **/

  function cartBtnFunctionality(event) {
    cartModalElement.classList.toggle("active");
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

    /**
     * check if cartModalShown is true or false
     * **/
    // if cartModalShown is true add active class to cartModalElement
    const cartModalShownBooleanValue =
      booleanValueOfCartModalShownPropertyInDataElement(ourDataElement);
    if (cartModalShownBooleanValue) {
      addClassToElement(cartModalElement, "active");
    }
    /**
     * tenary operator 
     * cartModalShownBooleanValue ? addClassToElement(cartModalElement, "active") : null
     cartModalShownBooleanValue
       ? addClassToElement(cartModalElement, "active")
       : null;
     *  **/
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

  /**
   * change value of dataObj
   * **/

  function changeValueOfCartModalShown(element, booleanInput) {
    // if booleanInput is truthy
    // we will see true value to cartModalShown property in data obj
    if (booleanInput) {
      element.dataElement.cartModalShown = true;
    } else {
      element.dataElement.cartModalShown = false;
    }
  }

  /**
   * value of cartModalShown in dataElement
   * **/

  function booleanValueOfCartModalShownPropertyInDataElement(element) {
    return element.dataElement.cartModalShown;
  }

  /**
   * remove class
   * **/
  function removeClassFromElement(element, classStr) {
    element.classList.remove(classStr);
  }

  /**
   * add class
   * **/

  function addClassToElement(element, classStr) {
    element.classList.add(classStr);
  }
  /**
   *cartModalAndCloseBtnAlgorithm
   * **/

  function cartModalAndClosedBtnAlgorithm(cartElement) {}

  /**
   * look for class of element
   * **/

  function elementContainClass(element, classStr) {
    // use .attributes["class"].value
    const booleanValue = element.attributes["class"].value.includes(
      `${classStr}`
    );
    return booleanValue;
  }

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

alert("work on img slider");
