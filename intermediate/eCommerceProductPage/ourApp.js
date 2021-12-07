(function scopeOurVariables() {
  // activate mobile menu selectors
  const {
    cartAvatarWrapper,
    cartBtn,
    ourDataElement,
    cartModalElement,
    cartModalCloseBtn,
    cartModalCheckoutBtn,
    // close mobile menu
    modalWrapperElement,
    mobileModalElement,
    mobileArrowBtnContainer,
    mobilePreviousImgBtn,
    mobileNextImgBtn,
    openMobileMenuBtn,
    headerElement,
    quantityControllerCartBtn,
    quantityDisplayInput,
    incrementQuantityBtn,
    decrementQuantityBtn,
    mobileCloseBtn,
    arrOfMobileNavbarAnchorTags,
    arrOfMobileImgSliderContainers,
    addToCartBtn,
    notFocusableAddToCartBtn,
    cartQuantityDisplayElement,
    bottomCartDisplayEmpty,
    bottomCartDisplayHasItem,
    bottomCartHasItemImg,
    bottomCartTitleElement,
    bottomCartPriceElement,
    bottomCartQuantityElement,
    bottomCartPriceTotalElement,
    trashBtn,
    desktopImgDisplayContainer,
    desktopImgModalLightbox,
    closeBtnLightBox,
    lastELementOfLightBox,
    arrDesktopLargeImages,
    arrDesktopSmallImages,
    arrLightboxLargeImages,
    arrLightboxSmallImages,
    lightboxPreviousImgBtn,
    lightboxNextImgBtn,
  } = ourSelectors();
  // add event listener to hamburger btn
  window.addEventListener("load", function resetInputValue(event) {
    quantityDisplayInput.value = "";
  });
  addEventListener(
    quantityDisplayInput,
    "keydown",
    function spaceBarInputWillNotAddSpaceForInputDisplay(event) {
      const { targetKeyCode } = propertiesOfEventObj(event);
      /**
       * when focus is on quantityDisplay and user hit space key
       * it will not add a space to input display
       * if user hit enter key it will not trigger event listener "change"
       * **/
      if (targetKeyCode == "Space" || targetKeyCode == "Enter") {
        event.preventDefault();
      }
    }
  );
  addEventListener(openMobileMenuBtn, "click", mobileMenuFunctionality);
  /**
   * this algorithm that will work with trashBtn will work for both mouse and keyboard user
   * for our closeModalBtn and trashBtn we will have one algorithm
   * add event click listener to cartModal when user click on cartBtn and user keydown
   * on space or enter key when focus is on cartBtn
   * addEventListener(cartModalElement, "click", cartModalDisplayAlgorithm);
   * **/
  addEventListener(
    quantityControllerCartBtn,
    "click",
    quantityDisplayAlgorithm
  );
  addEventListener(
    quantityDisplayInput,
    "change",
    changeValueOfQuantityDisplayInputWhenUserClickOnUpDownArrow
  );
  // add event listener to cart btn

  /**
   * run at mobile size
   * **/
  if (window.innerWidth < 415) {
    addEventListener(mobileArrowBtnContainer, "click", mobileLayoutImgSlider);
    addEventListener(
      cartBtn,
      "click",
      cartBtnMobileSizeClickEventFunctionality
    );
  }
  /**
   * run at desktop size
   * **/
  if (window.innerWidth > 430) {
    addEventListener(cartAvatarWrapper, "focusin", cartAvatarWrapperFocusEvent);
    addEventListener(
      cartBtn,
      "mouseenter",
      mouseenterCartBtnDesktopSizeFunctionality
    );
    /**
     * add click event to container element of desktop large and small images
     * **/
    addEventListener(
      desktopImgDisplayContainer,
      "click",
      desktopImgSliderAlgorithm
    );
  }
  // console.log(openMobileMenuBtn);
  function ourSelectors() {
    // cartAvatarWrapper element
    const cartAvatarWrapper = document.querySelector(
      ".cart-avatar-style-wrapper"
    );
    const cartBtn = document.querySelector(".open-cart-btn");
    // data obj
    const ourDataElement = document.querySelector("#data");
    //cart modal
    const cartModalElement = document.querySelector("#modal-two");
    // cart modal close btn
    const cartModalCloseBtn = document.querySelector(".close-cart-modal-btn");
    // cart modal checkout btn
    const cartModalCheckoutBtn = document.querySelector(".checkout-btn");
    // faded modal wrapper
    const modalWrapperElement = document.querySelector(
      ".faded-bg-modal-wrapper"
    );
    // mobile previous and next btn container
    const mobileArrowBtnContainer = document.querySelector(
      ".mobile-img-display-controller-container"
    );
    // mobile previous btn
    const mobilePreviousImgBtn = document.querySelector(
      ".mobile-img-display-controller-container [aria-label='previous image'"
    );
    const mobileNextImgBtn = document.querySelector(
      ".mobile-img-display-controller-container [aria-label='next image'"
    );
    // mobile next btn
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
    // quantity-controller-cart-btn-style-wrapper
    const quantityControllerCartBtn = document.querySelector(
      ".quantity-controller-cart-btn-style-wrapper"
    );
    // input for quantity display
    const quantityDisplayInput = document.querySelector("#quantity-display");
    // increment quantity btn
    const incrementQuantityBtn = document.querySelector(
      "[aria-label='increment quantity']"
    );
    // decrement quantity btn
    const decrementQuantityBtn = document.querySelector(
      "[aria-label='decrement quantity']"
    );
    // add to cart btn
    const addToCartBtn = document.querySelector(".add-to-cart-button");
    // add to cart btn not focusable
    const notFocusableAddToCartBtn = document.querySelector(
      ".add-cart-not-focusable"
    );
    // cart quantity display element
    const cartQuantityDisplayElement = document.querySelector(
      ".cart-quantity-display"
    );
    // bottom cart empty
    const bottomCartDisplayEmpty = document.querySelector(
      ".bottom-cart-style-wrapper-empty"
    );
    // bottom cart has item
    const bottomCartDisplayHasItem = document.querySelector(
      ".bottom-cart-style-wrapper-filled"
    );
    // cart display img element
    const bottomCartHasItemImg = document.querySelector(
      ".bottom-cart-filled-img-wrapper img"
    );
    // cart display title element
    const bottomCartTitleElement = document.querySelector(
      ".cart-selection-title"
    );
    // cart display price element
    const bottomCartPriceElement = document.querySelector(
      ".price-quantity__price"
    );
    // cart display quantity element
    const bottomCartQuantityElement = document.querySelector(
      ".price-quantity__quantity"
    );
    // cart display price total element
    const bottomCartPriceTotalElement = document.querySelector(
      ".price-quantity__total"
    );

    // bottom cart display trash btn
    const trashBtn = document.querySelector(".trash-btn");
    // desktop img display container for large and small images
    const desktopImgDisplayContainer = document.querySelector(
      ".desktop-img-display"
    );
    // desktop img modal (lightbox)
    const desktopImgModalLightbox =
      document.querySelector("[id='modal-three']");
    // close btn for lightBox
    const closeBtnLightBox = document.querySelector(".light-box-close-btn");
    //last item for lightbox keyboard tabbing feature
    const lastELementOfLightBox = document.querySelector(
      "[id='desktop-modal-img-slider'][aria-label='fourth image']"
    );
    /** array of img containers **/
    // mobile
    // const arrOfMobileImgSliderContainers = Array.from(document.querySelectorAll(
    //   ".mobile-images-container__img-container"
    // ));
    // mobile modal
    const arrOfMobileImgSliderContainers = Array.prototype.slice.call(
      document.querySelectorAll(".mobile-images-container__img-container")
    );
    // desktop img slider large images
    const arrDesktopLargeImages = Array.from(
      document.querySelectorAll(
        ".desktop-img-display__large-img-container button"
      )
    );
    //desktop img slider small images
    const arrDesktopSmallImages = Array.prototype.slice.call(
      document.querySelectorAll(
        ".desktop-img-display__small-img-container button"
      )
    );
    // lightbox large images
    const arrLightboxLargeImages = Array.prototype.slice.call(
      document.querySelectorAll(
        ".lightbox-large-img-container div[class*='large-img']"
      )
    );
    //lightbox small images
    const arrLightboxSmallImages = Array.from(
      document.querySelectorAll(
        ".lightbox-img-display__small-img-container button"
      )
    );
    // lightbox previous and next arrow btn
    // previous arrow
    const lightboxPreviousImgBtn = document.querySelector(
      ".lightbox-arrow-container [aria-label='previous image']"
    );
    // next arrow
    const lightboxNextImgBtn = document.querySelector(
      ".lightbox-arrow-container [aria-label='next image']"
    );
    return {
      cartAvatarWrapper,
      cartBtn,
      ourDataElement,
      cartModalElement,
      cartModalCloseBtn,
      cartModalCheckoutBtn,
      modalWrapperElement,
      mobileArrowBtnContainer,
      mobilePreviousImgBtn,
      mobileNextImgBtn,
      mobileModalElement,
      openMobileMenuBtn,
      headerElement,
      quantityControllerCartBtn,
      quantityDisplayInput,
      incrementQuantityBtn,
      decrementQuantityBtn,
      mobileCloseBtn,
      arrOfMobileNavbarAnchorTags,
      arrOfMobileImgSliderContainers,
      addToCartBtn,
      notFocusableAddToCartBtn,
      cartQuantityDisplayElement,
      bottomCartDisplayEmpty,
      bottomCartDisplayHasItem,
      bottomCartHasItemImg,
      bottomCartTitleElement,
      bottomCartPriceElement,
      bottomCartQuantityElement,
      bottomCartPriceTotalElement,
      trashBtn,
      desktopImgDisplayContainer,
      desktopImgModalLightbox,
      closeBtnLightBox,
      lastELementOfLightBox,
      arrDesktopLargeImages,
      arrDesktopSmallImages,
      arrLightboxLargeImages,
      arrLightboxSmallImages,
      lightboxPreviousImgBtn,
      lightboxNextImgBtn,
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
      mouseenterForCartBtn: null,
      userClickedOnCartBtn: false,
      userClickedOnCartBtnFirstTime: false,
      // number of img for mobile slider
      //our img slider will start at aria-label=1 of 4
      positionNumFormMobileSlider: 1,
      positionNumberFormLightboxSlider: 1,
      // valueOfQuantityDisplayInput
      valueOfQuantityDisplayInput: 0,
      autumnEdition: {
        shoeTitle: "Fall Limited Edition Sneakers",
        shoePrice: "$125.00",
        imgURL: "images/image-product-1-thumbnail.jpg",
      },
      objOfConversionsForDesktopImgSlider: {
        numToStr: {
          1: "first",
          2: "second",
          3: "third",
          4: "fourth",
        },
        strToNum: {
          first: "1",
          second: "2",
          third: "3",
          fourth: "4",
        },
      },
      selectorObjForCartDisplay: {
        bottomCartDisplayEmpty,
        bottomCartDisplayHasItem,
        bottomCartHasItemImg,
        bottomCartTitleElement,
        bottomCartPriceElement,
        bottomCartQuantityElement,
        bottomCartPriceTotalElement,
      },
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
    /** ANOTHER APPROACH: remove active class on cartModal element when user click hamburger btn
     * not perform our check in the closeBtn algorithm
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
   * cart btn algorithm run cartBtnFunctionality at mobile size
   * **/

  function cartBtnMobileSizeClickEventFunctionality(event) {
    console.log(event);
    let { cartModalElement, ourDataElement } = ourSelectors();
    const {
      dataElement: { mouseenterForCartBtn },
    } = ourDataElement;
    const booleanToCheckClassActiveOnCartModal = elementContainClass(
      cartModalElement,
      "active"
    );
    if (!booleanToCheckClassActiveOnCartModal) {
      cartModalElement.classList.add("active");
      ourDataElement.dataElement.cartModalShown = true;
    } else {
      cartModalElement.classList.remove("active");
      ourDataElement.dataElement.cartModalShown = false;
    }
  }

  /**
   * add keyboard event to cartBtn when it has focus
   * **/

  function cartAvatarWrapperFocusEvent(event) {
    // addEventListener(cartBtn, "click", cartBtnFunctionalityDesktopClickEvent);
    const { cartBtn } = ourSelectors();
    const { targetElement } = propertiesOfEventObj(event);

    if (targetElement == cartBtn) {
      // when focus is cartBtn add keydown event to cartBtnDesktopKeyboardFunc
      addEventListener(cartBtn, "keydown", cartBtnDesktopKeyboardFunc);
    } else {
      // when focus is not cartBtn remove keydown event to cartBtnDesktopKeyboardFunc
      removeEventListener(cartBtn, "keydown", cartBtnDesktopKeyboardFunc);
    }
  }

  /**
   * cartBtnMobileSizeClickEventFunctionality helper func at desktop size
   * **/

  function cartBtnFunctionalityDesktopClickEvent(event) {
    const { cartBtn, ourDataElement, cartModalElement } = ourSelectors();
    const { targetElement } = propertiesOfEventObj(event);
    const {
      dataElement: {
        mouseenterForCartBtn,
        userClickedOnCartBtn,
        userClickedOnCartBtnFirstTime,
      },
    } = ourDataElement;
    const cartModalContainActive = elementContainClass(
      cartModalElement,
      "active"
    );
    /**
     * if userClickedOnCartBtnFirstTime is falsey and elementContainClass("active") returns true
     * remove mouseenter and mouseleave event from cartBtn
     * it will leave active class on cartModalElement which will show cartModalElement
     * set userClickedOnCartBtn to true
     * **/

    if (!userClickedOnCartBtnFirstTime && cartModalContainActive) {
      // remove mouseenter and mouseleave event from cartBtn
      removeEventListener(
        cartBtn,
        "mouseenter",
        mouseenterCartBtnDesktopSizeFunctionality
      );
      removeEventListener(
        cartBtn,
        "mouseleave",
        mouseleaveCartBtnDesktopSizeFunctionality
      );
      // add click event to cartModalElement for functionality with closeBtn,trashBtn, checkoutBtn
      addEventListener(cartModalElement, "click", cartModalDisplayAlgorithm);
      // set userClickedOnCartBtn to true
      ourDataElement.dataElement.userClickedOnCartBtnFirstTime = true;
      return;
    }
    /**
     * when user click on cartBtn we also want to check if userClickedOnCartBtnFirstTime is truthy
     * and if elementContainClass("active") returns true
     * we will remove click event from cartBtn, remove class "active" from cartModalElement
     * then add mouseenter event to cartBtn set mouseenterForCartBtn to false
     * set userClickedOnCartBtnFirstTime to false
     * **/
    if (userClickedOnCartBtnFirstTime && cartModalContainActive) {
      // remove click event from cartBtn
      removeEventListener(
        cartBtn,
        "click",
        cartBtnFunctionalityDesktopClickEvent
      );
      // remove class "active" from cartBtn
      removeClassFromElement(cartModalElement, "active");
      // add mouseenter event to cartBtn
      addEventListener(
        cartBtn,
        "mouseenter",
        mouseenterCartBtnDesktopSizeFunctionality
      );
      // remove click event from cartModalElement
      removeEventListener(cartModalElement, "click", cartModalDisplayAlgorithm);
      // set false boolean value to mouseenterForCartBtn
      ourDataElement.dataElement.mouseenterForCartBtn = false;
      // set userClickedOnCartBtn to false
      ourDataElement.dataElement.userClickedOnCartBtnFirstTime = false;
    }
  }

  /**
   * cartBtn keyboard for when user has focus on cartBtn
   * **/

  function cartBtnDesktopKeyboardFunc(event) {
    const { cartModalElement, cartModalCloseBtn, ourDataElement } =
      ourSelectors();
    const {
      targetElement,
      targetKeyCode: keyCode,
      booleanShiftKeyPressed: shiftKeyPressed,
    } = propertiesOfEventObj(event);
    // without event.preventDefault() when user keyDown on "Enter" key
    // JS did not add active class to cartModalELement, add event to cartModalElement
    // set focus on cartModalCloseBtn
    if (keyCode == "Enter") {
      event.preventDefault();
    }
    // const {
    //   dataElement: { userClickedOnCartBtnFirstTime },
    // } = ourDataElement;
    if (keyCode == "Space" || keyCode == "Enter") {
      // when user on cartBtn with "Space" or "Enter" key
      // add keydown event to cartModalElement
      // focus cartModalCloseBtn
      // when user click cartBtn for firstTime add keydown event to cartModalElement
      // we want to check if userClickedOnCartBtnFirstTime is falsy because that would mean
      //user have not clicked on cartBtn
      /**if (!userClickedOnCartBtnFirstTime) {
         addEventListener(
          cartModalElement,
          "keydown",
          cartModalKeyboardFunctionality
          );
        }**/
      console.log(keyCode == "Enter");

      /**
       * another approach we can remove keydown event listener on cartModalElement
       * when user click on closeBtn of cartModalELement that algorithm will be in
       * cartModalKeyboardFunctionality func
       * **/
      // this is for tabbing through focusable element of cartModalElement
      addEventListener(
        cartModalElement,
        "keydown",
        cartModalKeyboardFunctionality
      );
      /**
       * add event click for cartModalElement for closeBtn, trashBt, and checkoutBtn algorithm
       * **/
      addEventListener(cartModalElement, "click", cartModalDisplayAlgorithm);
      // add active class to cartModalElement to show that element
      addClassToElement(cartModalElement, "active");
      // set focus to cartModalCloseBtn
      focusElement(cartModalCloseBtn);
    }
  }

  /**
   * cartModal keyboard helper
   * **/

  function cartModalKeyboardFunctionality(event) {
    const {
      cartModalElement,
      cartBtn,
      cartModalCloseBtn,
      cartModalCheckoutBtn,
    } = ourSelectors();

    const {
      targetElement,
      targetKeyCode: keyCode,
      booleanShiftKeyPressed: shiftKeyPressed,
    } = propertiesOfEventObj(event);

    /**
     * if user press hold shift and tab
     * **/
    // if (shiftKeyPressed && keyCode == "Tab") {
    //   targetElement == cartModalCloseBtn
    //     ? (focusElement(cartModalCheckoutBtn), event.preventDefault())
    //     : null;
    // } else {
    //   /**
    //    * tab
    //    * **/
    //   if (keyCode == "Tab") {
    //     targetElement == cartModalCheckoutBtn
    //       ? (focusElement(cartModalCloseBtn), event.preventDefault())
    //       : null;
    //   }
    // }
    /**
     * another way of coding keyboard tabbing
     * **/

    if (shiftKeyPressed) {
      // shift pressed and tab key pressed
      keyCode == "Tab" && targetElement == cartModalCloseBtn
        ? (focusElement(cartModalCheckoutBtn), event.preventDefault())
        : null;
    } else {
      // tab pressed without shift
      keyCode == "Tab" && targetElement == cartModalCheckoutBtn
        ? (focusElement(cartModalCloseBtn), event.preventDefault())
        : null;
    }
    /**
     * another approach
     * **/
    /**
     * we moved the algorithm below to cartModalDisplayAlgorithm.
     * the cartModalDisplayAlgorithm func will take care of when user click
     * or keyDown(space or enter) on trashBtn and cartModalCloseBtn
     * **/
    /**
     * if click target is cartModalCloseBtn remove class "active"
     * remove keydown event from cartModalElement
     * set focus on cartBtn
     * **/
    // if (targetElement == cartModalCloseBtn) {
    //   // if click target is cartModalCloseBtn remove class "active"
    //   removeClassFromElement(cartModalElement, "active");
    //   // remove keydown event from cartModalElement
    //   removeEventListener(
    //     cartModalElement,
    //     "keydown",
    //     cartModalKeyboardFunctionality
    //   );
    //   // set focus on cartBtn
    //   focusElement(cartBtn);
    // }
    /**
     * another approach
     * **/
  }

  /**
   * run cartBtnFunctionality at desktop size
   * **/

  function mouseenterCartBtnDesktopSizeFunctionality(event) {
    const { ourDataElement, cartModalElement, cartBtn } = ourSelectors();
    const {
      dataElement: { userClickedOnCartBtn },
    } = ourDataElement;
    /**
     * when user hover over cartBtn add event click to cartBtn
     * **/

    // cartModalElement.classList.toggle("active");
    // when userClickedOnCartBtn is faley null or false
    // it means cartModalElement does not have active class
    if (!userClickedOnCartBtn) {
      addClassToElement(cartModalElement, "active");
    }

    /**
     * add click event and mouseleave event when user hover mouse over cartBtn
     * **/

    addEventListener(cartBtn, "click", cartBtnFunctionalityDesktopClickEvent);
    addEventListener(
      cartBtn,
      "mouseleave",
      mouseleaveCartBtnDesktopSizeFunctionality
    );
    addEventListener(cartModalElement, "click", cartModalDisplayAlgorithm);
    ourDataElement.dataElement.mouseenterForCartBtn = true;
  }
  function mouseleaveCartBtnDesktopSizeFunctionality(event) {
    const { ourDataElement, cartModalElement, cartBtn } = ourSelectors();
    const {
      dataElement: { userClickedOnCartBtn },
    } = ourDataElement;
    /**
     * when user hover over cartBtn remove event click to cartBtn
     * **/
    // when userClickedOnCartBtn is falsey null or false
    // it means cartModalElement does not have active class
    if (!userClickedOnCartBtn) {
      removeClassFromElement(cartModalElement, "active");
    }
    /**
     * remove click event and mouseleave event when user leave cartBtn with mouse
     * **/
    removeEventListener(
      cartBtn,
      "click",
      cartBtnFunctionalityDesktopClickEvent
    );
    removeEventListener(
      cartBtn,
      "mouseleave",
      mouseleaveCartBtnDesktopSizeFunctionality
    );
    removeEventListener(cartModalElement, "click", cartModalDisplayAlgorithm);
    ourDataElement.dataElement.mouseenterForCartBtn = false;
  }

  /**
   * run cartBtnFunctionality at desktop size
   * **/
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
    /** ANOTHER APPROACH: remove active class on cartModal element when user click hamburger btn
     * not perform our check in the closeBtn algorithm and add class active based on our
     * cartModalShown property in our dataElement
     * **/
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

  /**
   * mobile layout img slider
   * **/

  function mobileLayoutImgSlider(event) {
    // declare element at top of func
    const { mobilePreviousImgBtn, mobileNextImgBtn } = ourSelectors();
    const { targetElement: clickedTarget } = propertiesOfEventObj(event);
    /**
     * run previous arrow btn algorith,
     * **/
    if (
      clickedTarget == mobilePreviousImgBtn ||
      clickedTarget.parentElement.parentElement == mobilePreviousImgBtn
    ) {
      mobilePreviousImgBtnAlgorithm(event);
    }
    /**
     * run next arrow btn algorith,
     * **/
    if (
      clickedTarget == mobileNextImgBtn ||
      clickedTarget.parentElement.parentElement == mobileNextImgBtn
    ) {
      mobileNextImgBtnAlgorithm(event);
    }
  }
  /** quanity display algorithm **/

  function quantityDisplayAlgorithm(event) {
    // console.log(event.target);
    // console.log(event.target);
    const { incrementQuantityBtn, decrementQuantityBtn, addToCartBtn } =
      ourSelectors();
    const { targetElement: clickedBtn } = propertiesOfEventObj(event);
    /**
     * run increment quantity btn func
     * **/

    if (
      clickedBtn == incrementQuantityBtn ||
      clickedBtn.parentElement == incrementQuantityBtn
    ) {
      incrementQuantityBtnHelperFunc(event);
    }

    /**
     * run decrement quantity btn func
     * **/
    if (
      clickedBtn == decrementQuantityBtn ||
      clickedBtn.parentElement == decrementQuantityBtn
    ) {
      decrementQuantityBtnHelperFunc(event);
    }
    /**
     * run add to cart algorithm
     * **/
    if (clickedBtn == addToCartBtn) {
      addToCartBtnAlgorithm(event);
    }
  }

  /**
   * algorithm for when user click on add to cart btn
   * **/

  function addToCartBtnAlgorithm(event) {
    const {
      quantityDisplayInput,
      cartQuantityDisplayElement,
      ourDataElement: {
        // destructure ourDataElement obj
        // dataElement: { autumnEdition, selectorObjForCartDisplay },
        dataElement,
        // destructure dataElement obj
        /**
         * pass in dataElement as our this to .call()
         * use destructuring in that func cartModalEmptyOrFilledAlgorithm
         * **/
      },
    } = ourSelectors();
    console.log(dataElement);
    // console.log(selectorObjForCartDisplay);
    //get value of quantityDisplayInput
    const valueOfQuantityInput = Number(
      getElementValue(quantityDisplayInput, "value")
    );
    // if value is <= 0
    if (valueOfQuantityInput <= 0) {
      //set value of cartQuantityDisplay element to empty string
      assignValueToElement(cartQuantityDisplayElement, "innerText", "");
      //remove class show-element cartQuantityDisplay element
      removeClassFromElement(cartQuantityDisplayElement, "show-element");
    } else {
      // if value is >= 1
      // set value of cartQuantityDisplay element to value of quantityDisplayInput
      assignValueToElement(
        cartQuantityDisplayElement,
        "innerText",
        String(valueOfQuantityInput)
      );
      //add class show-element to cartQuantityDisplay element
      addClassToElement(cartQuantityDisplayElement, "show-element");
      // using .call() method and passing in dataElement as our this binding to the func call
      cartModalEmptyOrFilledAlgorithm.call(dataElement, valueOfQuantityInput);
    }
  }

  /**
   *cartModalAndCloseBtnAlgorithm
   * **/

  function cartModalEmptyOrFilledAlgorithm(quantityValue) {
    /**
     * passing in quantityValue as a number when we assign the value to an element
     * convert it to String form
     * **/
    /**
     * console.log below we were passing in autumnEdition as our this obj to .call() method
     * **/
    // console.log(this.shoeTitle);
    // console.log(this.shoePrice);
    // console.log(this.imgURL);
    /**
     * another approach we will pass in dataElement as our this obj to .call() method
     * destructure that obj in this func
     * **/
    const {
      autumnEdition: { shoeTitle, shoePrice, imgURL },
      selectorObjForCartDisplay: {
        bottomCartDisplayEmpty,
        bottomCartDisplayHasItem,
        bottomCartHasItemImg,
        bottomCartTitleElement,
        bottomCartPriceElement,
        bottomCartQuantityElement,
        bottomCartPriceTotalElement,
      },
    } = this;
    // console.log("autumnEdition", autumnEdition);
    // console.log("shoeTitle,shoePrice,imgURL", shoeTitle, shoePrice, imgURL);
    // console.log("selectorObjForCartDisplay", selectorObjForCartDisplay);
    // console.log(
    //   bottomCartDisplayEmpty,
    //   bottomCartDisplayHasItem,
    //   bottomCartHasItemImg,
    //   bottomCartTitleElement,
    //   bottomCartPriceElement,
    //   bottomCartQuantityElement,
    //   bottomCartPriceTotalElement
    // );
    // console.log("cartSelectorObj", cartSelectorObj);
    // console.log("quantityValue", quantityValue);
    /**
     * algorithm steps
     * **/
    //if quantityValue is <= 0
    if (quantityValue <= 0) {
      //add class active to bottom cart empty display
      addClassToElement(bottomCartDisplayEmpty, "active");
      //remove class active to bottom cart has item display
      removeClassFromElement(bottomCartDisplayHasItem, "active");
      //if quantityValue is >= 1
    } else {
      //add class active to bottom cart has item display
      addClassToElement(bottomCartDisplayHasItem, "active");
      //remove class active to bottom cart empty display
      removeClassFromElement(bottomCartDisplayEmpty, "active");
    }
    // calc totalPrice
    /**
     * shoePrice is string "$125.00" remove decimal and trailing zeros
     * then use regex to get only number of "$125"
     * convert string "125" to number
     * **/

    /**
     * shoePrice algorithm before we pass the value to calc func
     * **/

    const shoePriceWithoutDecimalAndTrailingZeros =
      removeDecimalAndTrailingZeros(shoePrice);

    const shoePriceWithoutDollarSign = getOnlyNumberOfStrUsingRegex(
      shoePriceWithoutDecimalAndTrailingZeros
    );
    /**
     * shoePrice algorithm before we pass the value to calc func
     * **/
    const { totalValue } = bottomCartDisplayTotalCalcHelperFunc(
      quantityValue,
      Number(shoePriceWithoutDollarSign)
    );
    /**
     * assign value to elements
     * **/
    // img element
    assignValueUsingAttr(
      bottomCartHasItemImg,
      "attributes",
      "src",
      "value",
      imgURL
    );
    // title element
    assignValueToElement(bottomCartTitleElement, "innerText", shoeTitle);
    // price element
    assignValueToElement(bottomCartPriceElement, "innerText", shoePrice);
    // quantity element
    assignValueToElement(
      bottomCartQuantityElement,
      "innerText",
      String(quantityValue)
    );
    // totalPrice element
    /**
     * use template literal to pass in totalPrice with $ sign
     * **/
    assignValueToElement(
      bottomCartPriceTotalElement,
      "innerText",
      `$${totalValue}.00`
    );
  }

  /**
   * cartModalDisplay Algorithm
   * **/

  function cartModalDisplayAlgorithm(event) {
    const { trashBtn, cartModalCloseBtn } = ourSelectors();
    const { targetElement: clickedBtn } = propertiesOfEventObj(event);
    /**
     * run trashBtn algorithm
     * **/
    if (clickedBtn == trashBtn) {
      trashBtnAlgorithm(event);
    }
    /**
     * run cartModalCloseBtn algorithm
     * **/
    if (clickedBtn == cartModalCloseBtn) {
      closeBtnModalElementAlgorithm(event);
    }
  }

  /**
   * trash btn algorithm
   * **/

  function trashBtnAlgorithm(event) {
    const {
      cartModalCloseBtn,
      cartQuantityDisplayElement,
      ourDataElement: {
        dataElement: {
          selectorObjForCartDisplay: {
            bottomCartDisplayEmpty,
            bottomCartDisplayHasItem,
            bottomCartHasItemImg,
            bottomCartTitleElement,
            bottomCartPriceElement,
            bottomCartQuantityElement,
            bottomCartPriceTotalElement,
          },
        },
      },
    } = ourSelectors();
    /**
     * set value of
     * bottomCartHasItemImg,
     * bottomCartTitleElement,
     * bottomCartPriceElement,
     * bottomCartQuantityElement,
     * bottomCartPriceTotalElement,
     * to default value
     * **/
    // set value of bottomCartHasItemImg
    assignValueUsingAttr(
      bottomCartHasItemImg,
      "attributes",
      "src",
      "value",
      ""
    );

    // set value of bottomCartTitleElement
    assignValueToElement(bottomCartTitleElement, "innerText", "");
    // set value of bottomCartPriceElement
    assignValueToElement(bottomCartPriceElement, "innerText", "");
    // set value of bottomCartQuantityElement
    assignValueToElement(bottomCartQuantityElement, "innerText", "");
    // set value of bottomCartPriceTotalElement
    assignValueToElement(bottomCartPriceTotalElement, "innerText", "");
    // set value of cartQuantityDisplayElement to default
    assignValueToElement(cartQuantityDisplayElement, "innerText", "");
    // remove class show-element to cartQuantityDisplayElement
    removeClassFromElement(cartQuantityDisplayElement, "show-element");
    // remove class active from bottomCartDisplayHasItem
    removeClassFromElement(bottomCartDisplayHasItem, "active");
    // add class active from bottomCartDisplayEmpty
    addClassToElement(bottomCartDisplayEmpty, "active");
    // focus cartModalCloseBtn
    focusElement(cartModalCloseBtn);
  }

  /** 
   * when we want to log our elements

  logOurElements(
    arrDesktopLargeImages,
    arrDesktopSmallImages,
    arrLightboxLargeImages,
    arrLightboxSmallImages,
    lightboxPreviousImgBtn,
    lightboxNextImgBtn
  );
  function logOurElements(...ourArguments) {
    console.log(...ourArguments, "our arrays");
  }

  **/
  /**
   * cartModalCloseBtn
   * **/

  function closeBtnModalElementAlgorithm(event) {
    const { cartModalElement, cartBtn } = ourSelectors();
    //when user click on cartModalCloseBtn
    // remove click and keydown event from cartModalELement
    removeEventListener(cartModalElement, "click", cartModalDisplayAlgorithm);
    removeEventListener(
      cartModalElement,
      "keydown",
      cartModalKeyboardFunctionality
    );
    // remove class active from cartModalElement
    removeClassFromElement(cartModalElement, "active");
    // focus on cartBtn
    focusElement(cartBtn);
  }

  /**
   * desktop img modal tabbing through focusable element
   * **/

  addEventListener(
    desktopImgModalLightbox,
    "keydown",
    tabbingThroughLighBoxModalElements
  );

  function tabbingThroughLighBoxModalElements(event) {
    const { closeBtnLightBox, lastELementOfLightBox } = ourSelectors();
    // call keyboardTabbingHelperFunc func passing in closeBtnLightBox and lastELementOfLightBox
    keyboardTabbingHelperFunc(event, closeBtnLightBox, lastELementOfLightBox);
  }

  /**
   * desktop img slider functionality
   * **/

  function desktopImgSliderAlgorithm(event) {
    // declare our elements at top of function
    const { desktopImgModalLightbox } = ourSelectors();
    const { targetElement: clickedElement } = propertiesOfEventObj(event);
    /**
     * if user click on button with class desktop-img-display__large-img
     * run desktopLargeImgAlgorithm
     * add click event to desktopImgModalLightbox
     * **/
    const elementClickedIsLargeImg = elementContainClass(
      clickedElement,
      "desktop-img-display__large-img"
    );

    if (elementClickedIsLargeImg) {
      addEventListener(
        desktopImgModalLightbox,
        "click",
        lightboxImgModalAlgorithm
      );
      //run desktopLargeImgAlgorithm
      const { focusElementOfSmallImgsArr } = desktopLargeImgAlgorithm(event);
      // add class add-flex-display to modal-three element
      addClassToElement(desktopImgModalLightbox, "add-flex-display");
      // focus on element that match "first image" to "fourth image" of arr of lightbox small img
      focusElement(focusElementOfSmallImgsArr);
      /**
       * use return to break out of this func if user click
       * on large img because we dont want to run code below
       * **/
      return;
    }

    /**
     * if user click on button with class desktop-img-display__small-img
     * run desktopSmallImgAlgorithm
     * **/
    const elementClickedIsSmallImg = elementContainClass(
      clickedElement,
      "desktop-img-display__small-img"
    );

    if (elementClickedIsSmallImg) {
      //run desktopSmallImgAlgorithm
      desktopSmallImgAlgorithm(event);
    }
  }

  /**
   * think about what we want to do before we code
   * **/

  /**
   * desktop img large and small img
   * **/

  //when user click on large img
  // get aria-label of element with class active get first value which will be str "1" to "4"
  // use "1" to find that key in our numToStr obj
  // get the value that match key in numToStr obj
  // add class active to modal-three
  // loop through arr of element of lightbox large img
  // find matching element of element in lightbox large img arr
  // use reduce to loop through elements in arr and remove class active
  // add element that matches aria-label to array
  /**
   * what if user click on same button multiple times
   * then we might have to loop through arr of element and remove class active
   * **/

  // or use foreach without adding the element that match aria-label to an arr
  // find matching element of element in lightbox small img arr
  // use "first" to find the element that match aria-label="first image"
  // set focus on that lightbox small img
  // when user click on small img
  // get aria-label, get first value it will be one of "first" to "fourth"
  // use "first" key and find value that matches key in strToNum obj

  /**
   * desktop large img
   * **/

  function desktopLargeImgAlgorithm(event) {
    const { arrLightboxLargeImages, arrLightboxSmallImages, ourDataElement } =
      ourSelectors();
    const { targetElement: clickedElement } = propertiesOfEventObj(event);
    // destructuring
    const {
      dataElement: {
        objOfConversionsForDesktopImgSlider: { numToStr },
      },
    } = ourDataElement;
    // the element we clicked will be the button element with active
    // we dont need to check for active class on element
    // we will get aria label of eleemnt click
    const ariaLabelStrFormOfClickedElement = getAttrValueOfElement(
      clickedElement,
      "aria-label"
    );
    // get first value of aria label ex this will be "1"
    const numOneToFourOfAriaLabelStrForm = getValueAtZeroIndexOfStr(
      ariaLabelStrFormOfClickedElement
    );
    /**
    // find matching element with img in lightbox large img arr ex "1 of 4"
    const [matchingImgElementInLightboxLargeArr] =
      getElementThatMatchesAriaLabelForImgContainer(
        arrLightboxLargeImages,
        `${numOneToFourOfAriaLabelStrForm} of 4`
      );
    
    // arr of element that does not match matchingImgElementInLightboxLargeArr
    const arrNotMatchingAriaLabel =
      arrOfElementNotMatchingArialabelUsingFilterMethod(
        arrLightboxLargeImages,
        matchingImgElementInLightboxLargeArr
      );
      **/

    // using algorithm below
    /**
     * using reduce we will loop though an array return an array with two subarrays
     * one subarray will have element that match aria-label
     * one subarray will have elements that does not match aria-label
     const [[matchingImgElementInLightboxLargeArr], arrNotMatchingAriaLabel] =
       arrWithTwoSubarraysOneMatchingElementThreeNotMatching(
         arrLightboxLargeImages,
         `${numOneToFourOfAriaLabelStrForm} of 4`
       );
     * **/
    /**
     * console.log(matchingImgElementInLightboxLargeArr);
     * console.log(arrNotMatchingAriaLabel);
     **/
    /**
     * different approach, we will remove class from all element in lightbox large img array
     * then we will find the element in the lightbox large img array that matches
     * the large img in the desktop large img array
     * add class active-show-img to that element
     * **/
    // matching element in lightbox large img array
    const [matchingImgElementInLightboxLargeArr] =
      getElementThatMatchesAriaLabelForImgContainer(
        arrLightboxLargeImages,
        `${numOneToFourOfAriaLabelStrForm} of 4`
      );
    // run func that will loop through array and remove class active-show-img to all element
    loopThroughArrRemovingClass(arrLightboxLargeImages);
    // add clas active-show-img to large img in lightbox large img array that matches aria-label
    addClassToElement(matchingImgElementInLightboxLargeArr, "active-show-img");
    // get string "first" to "fourth" using "1" to "4"
    const strIsEitherFirstToFourth = getValueFromObjInDataElement(
      numToStr,
      numOneToFourOfAriaLabelStrForm
    );
    // use strIsEitherFirstToFourth to find element in lightbox small img arr
    const [focusElementOfSmallImgsArr] =
      getElementThatMatchesAriaLabelForImgContainer(
        arrLightboxSmallImages,
        `${strIsEitherFirstToFourth} image`
      );
    // return an obj with the element that matches ex "first image" in lightbox small img array
    // we will apply .focus() to that element in the desktopImgSliderAlgorithm func
    // when user click on large img
    return {
      focusElementOfSmallImgsArr,
    };
  }

  /**
   * desktop small img
   * **/

  function desktopSmallImgAlgorithm(event) {
    // declare element at top of func
    const { ourDataElement, arrDesktopLargeImages } = ourSelectors();
    // destructure ourDataElement
    const {
      dataElement: {
        objOfConversionsForDesktopImgSlider: { strToNum },
      },
    } = ourDataElement;
    const { targetElement: clickedBtn } = propertiesOfEventObj(event);
    // get aria label value of element clicked
    const ariaLabelStrFormOfClickedElement = getAttrValueOfElement(
      clickedBtn,
      "aria-label"
    );
    // get the first value it should be "first" to "fourth"
    const numOneToFourOfAriaLabelStrForm = getValueAtZeroIndexOfStr(
      ariaLabelStrFormOfClickedElement
    );

    // use that value as a key to get value of obj strToNum
    // using "first" to "fourth" we should return "1" to "4"
    // get first value of aria label ex this will be "1"
    const numInStrFormWillEitherBeOneToFour = getValueFromObjInDataElement(
      strToNum,
      numOneToFourOfAriaLabelStrForm
    );
    // use numInStrFormWillEitherBeOneToFour to find element in desktop large img array
    // that matches aria-label "1 of 4" etc
    const [addClassActiveImgToELement] =
      getElementThatMatchesAriaLabelForImgContainer(
        arrDesktopLargeImages,
        `${numInStrFormWillEitherBeOneToFour} of 4`
      );
    // use loopThroughArrRemovingClass to remove class active-show-img from element
    // in desktop large img array
    loopThroughArrRemovingClass(arrDesktopLargeImages);
    // add class active-show-img to addClassActiveImgToELement
    addClassToElement(addClassActiveImgToELement, "active-show-img");
  }

  /**
   * lightbox algorithm
   * we will have a property/key in our dataElement that will keep track of
   * positionNum of lightbox large imgs
   * **/

  function lightboxImgModalAlgorithm(event) {
    // declare our elements at top of function
    const {
      lightboxPreviousImgBtn,
      lightboxNextImgBtn,
      arrLightboxLargeImages,
      ourDataElement,
    } = ourSelectors();
    const { targetElement: clickedElement } = propertiesOfEventObj(event);
    /**
     * if user click on button with class lightbox-img-display__small-img
     * run lightboxSmallImgHelperFunc
     * */

    /**
     * run previousImgBtnHelperFunc or nextImgBtnHelperFunc
     * based on element clicked
     * **/

    // previous img arrow btn clicked
    if (clickedElement == lightboxPreviousImgBtn) {
      const { updatedValueOfPositionNumFormLightbox: valueIsEiterOneToFour } =
        previousImgBtnHelperFunc(
          arrLightboxLargeImages,
          ourDataElement,
          "positionNumberFormLightboxSlider",
          "active-show-img"
        );
      focusLightBoxSmallImgFunc(valueIsEiterOneToFour, ourDataElement);
    }
    // next img arrow btn clicked
    if (clickedElement == lightboxNextImgBtn) {
      const { updatedValueOfPositionNumFormLightbox: valueIsEiterOneToFour } =
        nextImgBtnHelperFunc(
          arrLightboxLargeImages,
          ourDataElement,
          "positionNumberFormLightboxSlider",
          "active-show-img"
        );
      focusLightBoxSmallImgFunc(valueIsEiterOneToFour, ourDataElement);
    }

    /**
     * if user click on button with class lightbox-img-display__small-img
     * run lightboxSmallImgHelperFunc
     * **/

    const elementClickedIsLightboxSmallImg = elementContainClass(
      clickedElement,
      "lightbox-img-display__small-img"
    );
    if (elementClickedIsLightboxSmallImg) {
      // run lightboxSmallImgHelperFunc
      lightboxSmallImgHelperFunc(event);
    }
  }

  // when user click on close btn of lightbox
  // get aria-label of element with active class
  // get first value of aria-label ex it will be "1"
  // use "1" key in numToStr obj get value ex it will be "first"
  // use value "1" to find matching element with the same aria-label in arr of elements for desktop large imgs
  // use value "first" to find element that match aria-label in the arr of elements for desktop small images
  // when user click on prev or next img arrow btn
  // find element with class active
  // get that element aria-label
  // get the first value of aria-label ex "1"
  // based on that value run decrement or increment func
  // when user click on small img(button)
  // get that element aria-label, get first value ex it will be "first"
  // use that value "first" as a key in our strToNum obj get the value that matches key "first"
  // ex it will be "1"
  // use value "1" to find matching large img in arr of large images for lightbox
  /**
   * what if user click on same button multiple times
   * then we might have to loop through arr of element and remove class active
   * **/
  // loop through arr remove class active element
  // add class active to element that match aria-label
  // convert to number form
  // use "1" update propertyNumForLightBoxImgSlider in our dataElement

  /**
   * lightbox small img helper
   * **/

  function lightboxSmallImgHelperFunc(event) {}

  /**
   * previous and next img arrow lightbox
   * **/

  /**
   * to do desktopImgModalLightbox positionNumberFormLightboxSlider
   * **/

  // great effort

  function arrowBtnLightboxAlgorithm(event) {}

  // helper func

  /**
   * loop through array removing class
   * **/

  function loopThroughArrRemovingClass(arrInput) {
    const copyOfArray = [...arrInput];

    copyOfArray.forEach(function removeClassFromEachElement(eachElement) {
      removeClassFromElement(eachElement, "active-show-img");
    });
  }

  /**
   * func to get value using "1" or "first"
   * **/

  function getValueFromObjInDataElement(dataObj, key) {
    const copyOfObj = { ...dataObj };
    return copyOfObj[key];
  }

  /**
   * func will loop through arr return an array with elements that does not match
   * element with aria-label lightbox large img
   * using filter
   * **/

  function arrOfElementNotMatchingArialabelUsingFilterMethod(
    arrInput,
    element
  ) {
    const copyArr = [...arrInput];
    return copyArr.filter(function findElementThatDoesNotMatch(eachElement) {
      return eachElement !== element;
    });
  }
  /**
   * func will loop through arr return an array with elements that does not match
   * element with aria-label lightbox large img
   * using reduce
   * **/

  function arrWithTwoSubarraysOneMatchingElementThreeNotMatching(
    arrInput,
    ariaLabelStr
  ) {
    // const copyOfArray = [].concat(arrInput);
    const copyOfArray = [...arrInput];
    return copyOfArray.reduce(
      function findMatchingElementAndNotMatchingElements(
        buildingUp,
        currentElement
      ) {
        const [elementMatchesAriaLabel, arrofElementNotMatchigAriaLabel] =
          buildingUp;
        // const strOfAriaLabel = currentElement.attributes["aria-label"].value
        const strOfAriaLabel = currentElement.getAttribute("aria-label");
        if (strOfAriaLabel == ariaLabelStr) {
          elementMatchesAriaLabel.push(currentElement);
        } else {
          arrofElementNotMatchigAriaLabel.push(currentElement);
        }
        return buildingUp;
      },
      [[], []]
    );
  }

  /**
   * helper func for previous and next img arrow btn
   * **/

  /**
   * previous img helper func
   * **/

  function previousImgBtnHelperFunc(
    arrOfImages,
    dataElement,
    positionNumFormProperty,
    classToShowImg
  ) {
    // copy of array
    const copyOfArr = [...arrOfImages];
    // get element with class active-show-img
    const [currentElementWithActiveClass] = getElementWithActiveImgClass(
      copyOfArr,
      classToShowImg
    );

    //remove class from element
    removeClassFromElement(currentElementWithActiveClass, classToShowImg);
    //get aria-label value
    const ariaLabelValue = getAttrValueOfElement(
      currentElementWithActiveClass,
      "aria-label"
    );
    debugger;
    //first value of aria label
    const numFormOfAriaLabelFirstValue =
      getFirstValueOfStrAndConvertToNum(ariaLabelValue);
    // if numFormOfAriaLabelFirstValue is 1 set positionNumFormMobileSlider to 4
    if (numFormOfAriaLabelFirstValue == 1) {
      updateValueOfPropertyOfDataObj(dataElement, positionNumFormProperty, 4);
    } else {
      // if numFormOfAriaLabelFirstValue is not 1 run decrementValueOfPropertyOfDataElement
      decrementValueOfPropertyOfDataElement(
        dataElement,
        positionNumFormProperty
      );
    }
    //get value of positionNumFormMobileSlider
    const updatedValueOfPositionNumFormLightbox = String(
      getPropertyOfDataObj(dataElement, positionNumFormProperty)
    );
    //use that value in algorithm to find element with matching value of aria-label
    const [previousImgElement] = getElementThatMatchesAriaLabelForImgContainer(
      copyOfArr,
      `${updatedValueOfPositionNumFormLightbox} of 4`
    );
    //add class active-show-img to that element
    addClassToElement(previousImgElement, classToShowImg);
    // return the value of "1" to "4" in an obj
    // pass that value to a func
    // use that value as a key in numToStr to get value of
    // either "first" to "fourth"

    return { updatedValueOfPositionNumFormLightbox };
  }

  /**
   * next img helper func
   * **/
  function nextImgBtnHelperFunc(
    arrOfImages,
    dataElement,
    positionNumFormProperty,
    classToShowImg
  ) {
    // copy of array
    const copyArray = [...arrOfImages];
    // get element with class active-show-img
    const [currentElementWithActiveClass] = getElementWithActiveImgClass(
      copyArray,
      classToShowImg
    );
    //remove class from element
    removeClassFromElement(currentElementWithActiveClass, classToShowImg);
    //get aria-label value
    const ariaLabelValue = getAttrValueOfElement(
      currentElementWithActiveClass,
      "aria-label"
    );
    //first value of aria label
    const firstValueOfAriaLabelNum =
      getFirstValueOfStrAndConvertToNum(ariaLabelValue);
    // if numFormOfAriaLabelFirstValue is 4 set positionNumFormMobileSlider to 1
    if (firstValueOfAriaLabelNum == 4) {
      updateValueOfPropertyOfDataObj(dataElement, positionNumFormProperty, 1);
    } else {
      // if numFormOfAriaLabelFirstValue is not 1 run incrementValueOfPropertyOfDataElement
      incrementValueOfPropertyOfDataElement(
        dataElement,
        positionNumFormProperty
      );
    }
    //get value of positionNumFormMobileSlider
    const updatedValueOfPositionNumFormLightbox = String(
      getPropertyOfDataObj(dataElement, positionNumFormProperty)
    );
    //use that value in algorithm to find element with matching value of aria-label
    const [nextImgElement] = getElementThatMatchesAriaLabelForImgContainer(
      copyArray,
      `${updatedValueOfPositionNumFormLightbox} of 4`
    );
    //add class active-show-img to that element
    addClassToElement(nextImgElement, classToShowImg);
    // return the value of "1" to "4" in an obj
    // pass that value to a func
    // use that value as a key in numToStr to get value of
    // either "first" to "fourth"
    return { updatedValueOfPositionNumFormLightbox };
  }

  function bottomCartDisplayTotalCalcHelperFunc(quantity, price) {
    // take price value multiply by quantity to get total
    const totalValue = quantity * price;
    return {
      totalValue,
    };
  }

  /**
   * focus on small img element of lightbox
   * **/

  function focusLightBoxSmallImgFunc(
    keyUsedToFindValueInNumToStrObj,
    {
      dataElement: {
        objOfConversionsForDesktopImgSlider: { numToStr },
      },
    }
  ) {
    // declare element at top of function
    const { arrLightboxSmallImages } = ourSelectors();
    // use keyUsedToFindValueInNumToStrObj as key to find value in numToStr obj
    const valueIsEitherFirstToFourth = getValueFromObjInDataElement(
      numToStr,
      keyUsedToFindValueInNumToStrObj
    );
    // we will get either "first" to "fourth"
    // use that value as a string(aria-label) in func that will look for
    // element in lightbox small img array that match that string
    const [smallImgOfLightboxToFocusWhenPrevOrNextImgBtnClicked] =
      getElementThatMatchesAriaLabelForImgContainer(
        arrLightboxSmallImages,
        `${valueIsEitherFirstToFourth} image`
      );
    // focus element
    focusElement(smallImgOfLightboxToFocusWhenPrevOrNextImgBtnClicked);
  }

  /**
   * decrement quantity btn
   * **/

  function decrementQuantityBtnHelperFunc(event) {
    // valueOfQuantityDisplayInput getPropertyOfDataObj
    const { quantityDisplayInput, ourDataElement } = ourSelectors();
    //get value of quantityDisplay
    const valueOfQuantityDisplayInput = getElementValue(
      quantityDisplayInput,
      "value"
    );
    //update value of valueOfQuantityDisplayInput with value of quantityDisplay
    updateValueOfPropertyOfDataObj(
      ourDataElement,
      "valueOfQuantityDisplayInput",
      Number(valueOfQuantityDisplayInput)
    );
    //decrement that value by 1
    decrementValueOfPropertyOfDataElement(
      ourDataElement,
      "valueOfQuantityDisplayInput"
    );
    //get updated value of valueOfQuantityDisplayInput from dataElement
    const updatedValueOfQuantityDisplayInput = getPropertyOfDataObj(
      ourDataElement,
      "valueOfQuantityDisplayInput"
    );
    //assign update value to value of quantityDisplayInput
    assignValueToElement(
      quantityDisplayInput,
      "value",
      String(updatedValueOfQuantityDisplayInput)
    );
    /**
     * run algorithm to show cart btn after we increment valueOfQuantityDisplayInput
     * **/
    showAddToCartBtnAlgorithm(updatedValueOfQuantityDisplayInput);
    // console.log(quantityDisplayInput.value);
  }

  /**
   * increment quantity btn
   * **/

  function incrementQuantityBtnHelperFunc(event) {
    const { quantityDisplayInput, ourDataElement } = ourSelectors();
    // get value of quantityDisplayInput
    const valueOfQuantityDisplay = getElementValue(
      quantityDisplayInput,
      "value"
    );
    //update value of valueOfQuantityDisplayInput with value of quantityDisplay
    updateValueOfPropertyOfDataObj(
      ourDataElement,
      "valueOfQuantityDisplayInput",
      Number(valueOfQuantityDisplay)
    );
    // increment that value by 1
    incrementValueOfPropertyOfDataElement(
      ourDataElement,
      "valueOfQuantityDisplayInput"
    );
    // retrive updated value of valueOfQuantityDisplayInput in dataElement
    const updateValueOfQuantityDisplay = getPropertyOfDataObj(
      ourDataElement,
      "valueOfQuantityDisplayInput"
    );
    // assign that value to quantityDisplayInput
    assignValueToElement(
      quantityDisplayInput,
      "value",
      `${updateValueOfQuantityDisplay}`
    );

    /**
     * run algorithm to show cart btn after we increment valueOfQuantityDisplayInput
     * **/
    showAddToCartBtnAlgorithm(updateValueOfQuantityDisplay);
  }

  /**
   * update value of quantity display
   * function updateValueOfElement(element, valueInput) {
   * element.value = valueInput;
   * }
   * **/

  /**
   * mobile previous btn
   * **/

  function mobilePreviousImgBtnAlgorithm(event) {
    const { arrOfMobileImgSliderContainers, ourDataElement } = ourSelectors();

    previousImgBtnHelperFunc(
      arrOfMobileImgSliderContainers,
      ourDataElement,
      "positionNumberFormLightboxSlider",
      "active-show-img"
    );

    /**
     * we moved code below into its own function so we could reuse it
     * for lightboxImgSlider
     * **/
    /*
    // get element with class active-show-img
    const [currentElementWithActiveClass] = getElementWithActiveImgClass(
      arrOfMobileImgSliderContainers,
      "active-show-img"
    );
    console.log(currentElementWithActiveClass);
    //remove class from element
    removeClassFromElement(currentElementWithActiveClass, "active-show-img");
    //get aria-label value
    const ariaLabelValue = getAttrValueOfElement(
      currentElementWithActiveClass,
      "aria-label"
    );
    //first value of aria label
    const numFormOfAriaLabelFirstValue =
      getFirstValueOfStrAndConvertToNum(ariaLabelValue);
    // if numFormOfAriaLabelFirstValue is 1 set positionNumFormMobileSlider to 4
    if (numFormOfAriaLabelFirstValue == 1) {
      updateValueOfPropertyOfDataObj(
        ourDataElement,
        "positionNumFormMobileSlider",
        4
      );
    } else {
      // if numFormOfAriaLabelFirstValue is not 1 run decrementValueOfPropertyOfDataElement
      decrementValueOfPropertyOfDataElement(
        ourDataElement,
        "positionNumFormMobileSlider"
      );
    }
    //get value of positionNumFormMobileSlider
    const updatedValueOfPositionNumFormMobileSlider = String(
      getPropertyOfDataObj(ourDataElement, "positionNumFormMobileSlider")
    );
    //use that value in algorithm to find element with matching value of aria-label
    const [previousImgContainerElement] =
      getElementThatMatchesAriaLabelForImgContainer(
        arrOfMobileImgSliderContainers,
        `${updatedValueOfPositionNumFormMobileSlider} of 4`
      );
    //add class active-show-img to that element
    addClassToElement(previousImgContainerElement, "active-show-img");
    console.log("previous");
    // console.log(arrOfMobileImgSliderContainers);*/
  }

  /**
   * mobile next btn
   * **/

  function mobileNextImgBtnAlgorithm(event) {
    console.log("next");
    const { arrOfMobileImgSliderContainers, ourDataElement } = ourSelectors();
    nextImgBtnHelperFunc(
      arrOfMobileImgSliderContainers,
      ourDataElement,
      "positionNumberFormLightboxSlider",
      "active-show-img"
    );

    /**
     * we moved code below into its own function so we could reuse it
     * for lightboxImgSlider
     * **/
    /*
    // get element with class active-show-img
    const [currentElementWithActiveClass] = getElementWithActiveImgClass(
      arrOfMobileImgSliderContainers,
      "active-show-img"
    );
    //remove class from element
    removeClassFromElement(currentElementWithActiveClass, "active-show-img");
    //get aria-label value
    const ariaLabelValue = getAttrValueOfElement(
      currentElementWithActiveClass,
      "aria-label"
    );
    //first value of aria label
    const firstValueOfAriaLabelNum =
      getFirstValueOfStrAndConvertToNum(ariaLabelValue);
    // if firstValueOfAriaLabelNum is 4 set positionNumFormMobileSlider to 1
    if (firstValueOfAriaLabelNum == 4) {
      updateValueOfPropertyOfDataObj(
        ourDataElement,
        "positionNumFormMobileSlider",
        1
      );
    } else {
      // if firstValueOfAriaLabelNum is not 1 run incrementValueOfPropertyOfDataElement
      incrementValueOfPropertyOfDataElement(
        ourDataElement,
        "positionNumFormMobileSlider"
      );
    }
    //get value of positionNumFormMobileSlider
    const updatedValueOfPositionNumFormMobileSlider = String(
      getPropertyOfDataObj(ourDataElement, "positionNumFormMobileSlider")
    );
    //use that value in algorithm to find element with matching value of aria-label
    const [nextImgContainerElement] =
      getElementThatMatchesAriaLabelForImgContainer(
        arrOfMobileImgSliderContainers,
        `${updatedValueOfPositionNumFormMobileSlider} of 4`
      );
    //add class active-show-img to that element
    addClassToElement(nextImgContainerElement, "active-show-img");*/
  }

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
   * look for class of element
   * **/

  function elementContainClass(element, classStr) {
    // use .attributes["class"].value
    const booleanValue = element.attributes["class"].value.includes(
      `${classStr}`
    );
    return booleanValue;
  }
  /**
   * get attribute value of element
   * **/

  function getAttrValueOfElement(element, attributeStr) {
    const valueOfAttr = element.attributes[`${attributeStr}`].value;
    return valueOfAttr;
  }

  /**
   * get first value of aria label
   * **/
  function getFirstValueOfStrAndConvertToNum(strInput) {
    const [firstValueOfArr] = strInput.split(" ");
    return convertToNumForm(firstValueOfArr);
  }

  function convertToNumForm(strValue) {
    return Number(strValue);
  }

  /**
   * get first value of string for aria label
   * "1 of 4"
   * or
   * "first image"
   * **/

  function getValueAtZeroIndexOfStr(strValue) {
    const [firstValue] = strValue.split(" ");
    return firstValue;
  }

  /**
   * get element with active class
   * **/
  // this func will return an array with one value/element in it
  function getElementWithActiveImgClass(arrInput, classStr) {
    return arrInput.filter(function findElementWithActiveClass(eachElement) {
      return elementContainClass(eachElement, classStr);
    });
  }

  /**
   * decrement value of positionNumFormMobileSlider
   * **/

  function decrementValueOfPropertyOfDataElement(element, propertyStr) {
    element.dataElement[propertyStr] -= 1;
  }

  /**
   * increment value of positionNumFormMobileSlider
   * **/

  function incrementValueOfPropertyOfDataElement(element, propertyStr) {
    element.dataElement[propertyStr] += 1;
  }

  /**
   * get value of property of dataElement
   * **/

  function getPropertyOfDataObj(element, propertyString) {
    return element.dataElement[propertyString];
  }

  /**
   * update value of property of dataElement
   * **/

  function updateValueOfPropertyOfDataObj(element, propertyStr, valueInput) {
    element.dataElement[propertyStr] = valueInput;
  }

  /**
   * get element that matches aria label for mobile img container
   * **/

  function getElementThatMatchesAriaLabelForImgContainer(arrInput, strInput) {
    return arrInput.filter(function findElementMatchesAriaLabel(eachElement) {
      return eachElement.attributes["aria-label"].value == strInput;
    });
  }

  /**
   * get properties of element
   * **/
  function propertiesOfEventObj(event) {
    return {
      targetElement: event.target,
      targetKeyStrForm: event.key,
      targetKeyCode: event.code,
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

  /**
   * change value of valueOfQuantityDisplayInput when user click on up or down arrow
   * of quantity display input
   * **/

  function changeValueOfQuantityDisplayInputWhenUserClickOnUpDownArrow(event) {
    const { ourDataElement } = ourSelectors();
    updateValueOfPropertyOfDataObj(
      ourDataElement,
      "valueOfQuantityDisplayInput",
      Number(this.value)
    );
    showAddToCartBtnAlgorithm(this.value);
  }

  /**
   * get element value
   * **/

  function getElementValue(element, propertyStr) {
    return element[propertyStr];
  }

  /**
   * assign value to element
   * **/

  function assignValueToElement(element, propertyStr, valueInput) {
    element[propertyStr] = valueInput;
  }

  /**
   * assign value to element using attribute
   * **/

  function assignValueUsingAttr(
    element,
    attrProperty,
    attrStr,
    propertyStr,
    value
  ) {
    element[attrProperty][attrStr][propertyStr] = value;
  }

  /**
   *
   * **/

  /**
   * show add to cart btn algorithm
   * **/

  function showAddToCartBtnAlgorithm(valueOfDisplayInput) {
    const { addToCartBtn, notFocusableAddToCartBtn } = ourSelectors();
    if (valueOfDisplayInput <= 0) {
      // if valueOfDisplayInput is <= 0, notFocusableAddToCartBtn should have class add-display-flex
      addClassToElement(notFocusableAddToCartBtn, "add-flex-display");
      // addToCartBtn element should not
      removeClassFromElement(addToCartBtn, "add-flex-display");
    } else {
      // if valueOfDisplayInput is >= 1 addToCartBtn element should have class add-display-flex
      addClassToElement(addToCartBtn, "add-flex-display");
      // notFocusableAddToCartBtn element should not
      removeClassFromElement(notFocusableAddToCartBtn, "add-flex-display");
    }
  }

  /**
   * get number value of string of price
   * **/

  function removeDecimalAndTrailingZeros(stringValue) {
    const [priceWithoutDecimal] = stringValue.split(".");
    return priceWithoutDecimal;
  }

  function getOnlyNumberOfStrUsingRegex(strInput) {
    return strInput.match(/\w/gi).join("");
  }

  /**
   * get lastElementNavMenu
   * **/
  function getLastElementOfNavMenu(arrInput) {
    const lengthOfArrInput = arrInput.length;
    const lastItemOfArr = arrInput[lengthOfArrInput - 1];
    return lastItemOfArr;
  }
})();
console.log(
  "remove active class on large img element of lightbox in html file"
);
