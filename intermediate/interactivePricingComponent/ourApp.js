function ourSelectors() {
  //article with class of pricing. container element for pageviews,slider,priceview,toggle
  var pricingContainer = document.querySelector(".pricing");
  // toggle button
  var toggleBtn = document.querySelector(".toggle-button");
  //element text month or yearly
  var spanTextEleMonthOrYear = document.querySelector(
    ".priceview span:last-of-type"
  );
  //slider container element parent of .sliderIconWrapper, .bar and .barWrapper
  var sliderContainer = document.querySelector(".slider");
  //slider icon with left and right arrow
  var sliderIconWrapper = document.querySelector(".slider-icon-wrapper");
  //.bar teal color
  var barTealElement = document.querySelector(".bar");
  //.bar-wrapper gray color
  var barWrapperElement = document.querySelector(".bar-wrapper");
  return {
    toggleBtn,
    pricingContainer,
    spanTextEleMonthOrYear,
    sliderContainer,
    sliderIconWrapper,
    barTealElement,
    barWrapperElement,
  };
}

let callFuncToGetWindowWidth;
let windowWidthOnLoad;
/***** call/invoke our functions *****/
// getWindowWidthOnLoad();
desktopMouseClickAndMouseMovementAlgor();
clickEventAddToToggleContainer();
setCssPropertyToDocument();
// callAddAndRemoveMouseMovementAlgorithm();
/***** call/invoke our functions *****/
// testingMobileDesktopAlgorithm();
// function testingMobileDesktopAlgorithm() {
//   var resizeWindowWidth;
//   window.addEventListener("resize", function getWindowWidth(event) {
//     resizeWindowWidth = window.innerWidth;
//     console.log(resizeWindowWidth);
//   });
//   function getWindowInnerWidth() {
//     return resizeWindowWidth;
//   }
//   callFuncToGetWindowWidth = getWindowInnerWidth;
// }

testingOurIdeaMobileAndDesktop();
alert(
  "let's make our algorithm work on mobile before we work on resize algorithm"
);
alert(
  "on load --desktop-slider-movement or --mobile-slider-movement will be 0"
);
alert(
  "on resize is where we want to calculate --desktop-slider-movement or --mobile-slider-movement"
);
alert(
  "our algorithm we have two variables. one to use at desktop layout and one for mobile. we just have to update these variables when our user resize the window"
);
function testingOurIdeaMobileAndDesktop() {
  // alert(
  //   "something to note: when we switch from desktop to mobile view html element will have --desktop-slider-movement"
  // );
  // alert(
  //   "which means when we switch from mobile to desktop our html element or document.documentElement will have --mobile-slider-movement"
  // );
  // alert("tested code below and it works");
  // alert(
  //   "on window resize, we want the position of sliderIconWrapper to be the same on mobile and desktop layout based on %"
  // );
  window.addEventListener("resize", function getSliderMovement(event) {
    if (window.innerWidth <= 415) {
      console.log("mobile this display", window.innerWidth);
      console.log(document.documentElement.attributes["style"]);
      // sliderIconWrapper.addEventListener("click", (event) => {
      //   console.log(
      //     document.documentElement.attributes["style"].value.split(" ")[1]
      //   );
      // });
      // document.documentElement.attributes["style"].value =
      //   "--mobile-slider-movement:" + " " + String(100) + "px";
    } else {
      console.log("desktop this display", window.innerWidth);
      // sliderIconWrapper.addEventListener("click", (event) => {
      console.log(document.documentElement.attributes["style"]);
      //   console.log(
      //     document.documentElement.attributes["style"].value.split(" ")[1]
      //   );
      // });
      // document.documentElement.attributes["style"].value =
      //   "--desktop-slider-movement:" + " " + String(100) + "px";
    }
  });
}

function testingMoreIdeas() {
  function getWindowWidthOnLoad() {
    var loadWindowWidth;
    window.addEventListener("load", function getWidth(event) {
      //when we had our if else statement in another func and we passed in a variable that was assigned the windowWidth our if else statement did not work
      //after "load" is ran loadWindowWidth is undefined outside of this func.
      if (window.innerWidth <= 415) {
        document.documentElement.style.setProperty(
          "--mobile-slider-movement",
          "0px"
        );
      } else {
        document.documentElement.style.setProperty(
          "--desktop-slider-movement",
          "0px"
          // String(totalAmtPercentage) + "%"
        );
      }
    });

    function onLoadGetWindowWidth() {
      return loadWindowWidth;
    }

    windowWidthOnLoad = onLoadGetWindowWidth;
  }
  // getTheWidthOfWindow();

  function getTheWidthOfWindow() {
    document.querySelector("body").addEventListener("click", (event) => {
      if (callFuncToGetWindowWidth instanceof Function) {
        var printWindowWidth = callFuncToGetWindowWidth();
        console.log(printWindowWidth);
      }
    });
  }

  // this works. we will get window.innerWidth every sec. our func assignWidthToVariable will have a closure over windowInnerWidth
  //then we assign the func reference of assignWidthToVariable to callFuncToGetWindowWidth then we will call callFuncToGetWindowWidth in our click handler which will give us the window.width
  var getWidthOfWindowEverySec = setInterval(function getWidth() {
    var windowInnerWidth = window.innerWidth;
    function assignWidthToVariable() {
      return windowInnerWidth;
    }

    callFuncToGetWindowWidth = assignWidthToVariable;
  }, 1000);
}
/***** declare --slider-movement CSS property to html element: we are now running  *****/
function setCssPropertyToDocument() {
  // document.documentElement.attributes["style"].value.split(" ")[1];
  // parseInt($0.attributes["style"].value.split(" ")[1])
  //code above we can use to get --desktop-slider-movement or --mobile-slider-movement value
  if (window.innerWidth <= 415) {
    document.documentElement.style.setProperty(
      "--mobile-slider-movement",
      " 0px"
    );
  } else {
    document.documentElement.style.setProperty(
      "--desktop-slider-movement",
      " 0px"
      // String(totalAmtPercentage) + "%"
    );
  }
}

// var callAddAndRemoveMouseMovementAlgorithm;
/***** declare --slider-movement CSS property to html element *****/

// var positionOfClickedEvent;
// alert(
//   "we are using another func to get the window width then we declare another func in that func. the func we declare will return the variable that will have the window width assigned to it"
// );
// alert(
//   "we will declare a variable outside of the func that has our variable with the window width assigned to it. the func that has closure of the variable that has window width assigned to it"
// );
// alert(
//   "we will pass the reference of the func that has clousure of the window width variable then we will call that func in our click or mousedown func to get the window width."
// );
function desktopMouseClickAndMouseMovementAlgor() {
  // window.addEventListener("load", function getWidth(event) {
  //   loadWindowWidth = window.innerWidth;
  //   console.log(loadWindowWidth);
  // });
  // addAndRemoveMouseMovementAlgorithm();
  // if (windowWidthOnLoad instanceof Function) {
  //   let callingWindowWidthInDesktopFunc = windowWidthOnLoad();
  //   console.log(
  //     "callingWindowWidthInDesktopFunc",
  //     callingWindowWidthInDesktopFunc
  //   );
  // }
  var { barTealElement, barWrapperElement, sliderIconWrapper } = ourSelectors();
  //layerXofClickedEle will be layerX of bar or barWrapper
  var layerXofClickedEle;
  var mobileLayerX;
  console.log("layerXofClickedEle", layerXofClickedEle);
  /***** when user click on .bar or .barWrapper we will get the layerX assign it to layerXofClickedEle variable
   * if user clicked between 0 and 40 layerX will be 0. if user clicked between 435 and 472 layerX will be 434.
   * we will use layerXofClickedELe in our mouseMovement func
   * *****/
  barWrapperElement.addEventListener(
    "click",
    function sliderMovementClickFeatureBarElement(event) {
      // console.log(callFuncToGetWindowWidth());
      // clearInterval(getWidthOfWindowEverySec);
      // // var { barTealElement, barWrapperElement } = ourSelectors();
      // if (callFuncToGetWindowWidth instanceof Function) {
      //   var printWindowWidth = callFuncToGetWindowWidth();
      //   console.log(printWindowWidth);
      // }
      // console.log("sliderMovement", event.layerX);
      console.log(event);
      if (window.innerWidth <= 415) {
        console.log("mobile this display", window.innerWidth);
      } else {
        console.log("desktop this display", window.innerWidth);
      }
      //work with layerX
      //check if event.target is .bar or .bar-wrapper
      /* we dont need to add or substract we want .sliderIconWrapper to move to the layerX based on where the user click at bar or bar-wrapper */
      if (event.target == barTealElement) {
        //if user clicked on bar and layerX is between 0 and 40 we will set --slider-movement to be 0 by setting barlayerX to be 0
        let barLayerX = event.layerX;
        if (barLayerX >= 0 && barLayerX <= 40) {
          barLayerX = 0;
          document.documentElement.attributes["style"].value =
            "--desktop-slider-movement:" + " " + String(barLayerX) + "px";
        } else {
          document.documentElement.attributes["style"].value =
            "--desktop-slider-movement:" + " " + String(barLayerX) + "px";
        }
        layerXofClickedEle = barLayerX;
        // console.log("barLayerX", barLayerX);
      } else if (event.target == barWrapperElement) {
        let barWrapperLayerX = event.layerX;
        //when we click on .barWrapper neat the edge our .sliderIconWrapper right side is too far off barWrapper edge
        //when we use transform: translateX(434px) on .sliderIconWrapper. the right edge of .sliderIconWrapper touches the right edge of .barWrapper
        //instead of subtracting layerX if the user click on barWrapper and layerX is 470: we will work with a range and if layerX
        //is within that range we will set layerX to be 434
        //range we will work with will be 435-472
        if (barWrapperLayerX >= 435 && barWrapperLayerX <= 472) {
          //if user clicked on barWrapper and layerX is between 435 and 472 we will set --slider-movement to be 434 by setting barWrapperLayerX to be 434
          barWrapperLayerX = 434;
          document.documentElement.attributes["style"].value =
            "--desktop-slider-movement:" +
            " " +
            String(barWrapperLayerX) +
            "px";
        } else {
          //set --slider-movement will be set to event.target.layerX
          document.documentElement.attributes["style"].value =
            "--desktop-slider-movement:" +
            " " +
            String(barWrapperLayerX) +
            "px";
        }
        layerXofClickedEle = barWrapperLayerX;
        // console.log("barWrapperLayerX", barWrapperLayerX);
      }
      function notes() {
        /***** instead of assigning event.layerX to layerXofClickedEle based on where the user clicked on bar or barWrapper
         * we will assign layerXofClickedEle the layerX of barLayerX or barWrapperLayerX so we dont repeat ourselves
         * *****/
        // layerXofClickedEle = event.layerX;
        // console.log("layerXofClickedEle", layerXofClickedEle);
        /***** calling mousemove func: when we have testingIdeas inside this event we're adding mousemove and mouseup event to .sliderIconWrapper *****/
        // alert("we are passing in the correct layerX that we want to use in mousemove func");
        // alert("testingIdeas is fire four times")
        // if (layerXofClickedEle >= 0 && layerXofClickedEle <= 40) {
        //   layerXofClickedEle = 0;
        // } else if (layerXofClickedEle >= 435 && layerXofClickedEle <= 472) {
        //   layerXofClickedEle = 434;
        // } else {
        //   layerXofClickedEle = event.layerX;
        // }
      }
      console.log("layerXofClickedEle", layerXofClickedEle);
      /***** calling mousemove func: when we have testingIdeas inside this event we're adding mousemove and mouseup event to .sliderIconWrapper *****/
      // testingIdeas(layerXofClickedEle);
      /***** getLayerXpositionOfbarEle func will return the value assigned to layerXofClickedEle. every time our user click on .bar or .barWrapper
       * we dont run it in this click event. we are passing the refer of getLayerXpositionOfBarEle to positionOfClickedEvent then in our mouseMoveAlgorithm or the func we have the mouseMoveAlgorithm
       * event listener we will call positionOfClickedEvent to get that value.
       *  *****/
      // function getLayerXpositionOfBarEle() {
      //   return layerXofClickedEle;
      // }
      //positionOfClickedEvent is declared outside of this click event func
      // positionOfClickedEvent = getLayerXpositionOfBarEle;
      setTimeout(function focusSliderIconWrapper() {
        sliderIconWrapper.focus();
      }, 1000);
    }
  );

  addAndRemoveMouseMovementAlgorithm();
  // callAddAndRemoveMouseMovementAlgorithm = addAndRemoveMouseMovementAlgorithm;
  /***** mouseMovementAlgorithm *****/
  // we don't need to pass in layerXOfClickedEle because our mouseMovementAlgor func is declared in the same scope as
  //the event listener that will assign the layerX to a variable that our mouseMovementAlgor func can use
  function addAndRemoveMouseMovementAlgorithm() {
    var { sliderIconWrapper, sliderContainer } = ourSelectors();
    // first time we run addAndRemoveMouseMovementAlgorithm mouseClickOfLayerX will 0
    // when we click on bar or barWrapper mouseClickOfLayerX will be the layerX of bar or barWrapper
    var movementCounter;

    /***** add event *****/
    // when user click on .sliderIconWrapper we will run mouseMovementAlgorithm
    sliderIconWrapper.addEventListener(
      "mousedown",
      function addMovementEventToSliderIcon(event) {
        // if (callFuncToGetWindowWidth instanceof Function) {
        //   var printWindowWidth = callFuncToGetWindowWidth();
        //   console.log(printWindowWidth);
        // }

        // we need a way to update/reassign movementCounter
        //every time user click on bar or barWrapper layerXofClickedEle is reassigned
        //inside addAndRemoveMouseMovementAlgorithm we are using movementCounter so we want to update that variable whenever our user click on sliderIconWrapper
        if (!layerXofClickedEle) {
          movementCounter = 0;
        } else {
          movementCounter = layerXofClickedEle;
        }
        if (event.target == this) {
          console.log(movementCounter);
          mouseMovementAlgorithm(this);
        }
      }
    );
    /***** add event *****/
    /***** remove event *****/
    //inside removeEventListenerMousemoveOnMouseUp we will remove moveSliderIconWrapper

    sliderIconWrapper.addEventListener(
      "mouseup",
      removeEventListenerMousemoveOnMouseUp
    );
    //inside removeMousemoveEventWhenOutsideSliderIconWrapper we will remove moveSliderIconWrapper
    sliderContainer.addEventListener(
      "mousemove",
      removeMousemoveEventWhenOutsideSliderIconWrapper
    );
    /***** remove event *****/
    /***** declare funcs *****/
    function mouseMovementAlgorithm(sliderIconInput) {
      sliderIconInput.addEventListener("mousemove", moveSliderIconWrapper);
    }

    function moveSliderIconWrapper(eventInput) {
      if (eventInput.movementX < 0 && movementCounter <= 0) {
        movementCounter = 0;
      } else if (eventInput.movementX > 0 && movementCounter >= 434) {
        movementCounter = 434;
      } else {
        if (eventInput.movementX < 0) {
          movementCounter += -1;
        } else {
          movementCounter += 1;
        }
      }

      document.documentElement.attributes["style"].value =
        "--desktop-slider-movement: " + String(movementCounter) + "px";
      /***** we want to update layerXofClickedEle to be movementCounter because we want to use the new position of layerXofClickedEle
       * for our keyboard feature
       *  *****/
      layerXofClickedEle = movementCounter;
    }

    // removeEvent Funcs
    function removeEventListenerMousemoveOnMouseUp(eventInput) {
      //this remove func will be run/execute by sliderIconWrapper
      if (eventInput.target == this) {
        this.removeEventListener("mousemove", moveSliderIconWrapper);
      }
    }
    function removeMousemoveEventWhenOutsideSliderIconWrapper(eventInput) {
      //this remove func will be run/execute by sliderContainer
      if (eventInput.target != sliderIconWrapper) {
        sliderIconWrapper.removeEventListener(
          "mousemove",
          moveSliderIconWrapper
        );
      }
    }
    /***** declare funcs *****/
  }
  keyboardFeatureSliderMovement();
  /***** mouseMovementAlgorithm *****/

  /***** we dont have to make a function inside click event of barElement and pass a reference to that func to a variable outside the func scope of click event
   * if we declare our mousemoveAlgorithm inside the same func scope as the click event
   * alert("look at algorithmDidnotWorkTheWayWeWant");
   function testingPositionOfClickedEle() {
     var { sliderIconWrapper } = ourSelectors();
     // if (positionOfClickedEvent instanceof Function) {u
     //   console.log(positionOfClickedEvent);
     // }
     sliderIconWrapper.addEventListener("mousedown", function (event) {
       console.log(event);
       console.log("layerXofClickedEle", layerXofClickedEle);
       // if (positionOfClickedEvent instanceof Function) {
       //   console.log(positionOfClickedEvent());
       // }
     });
   }
   *****/
  /***** keyboard feature *****/

  function keyboardFeatureSliderMovement() {
    var { pricingContainer } = ourSelectors();
    //document.activeElement will let us know which element has focus but we have to run/call/execute this func
    var focusElement = document.activeElement;
    console.log(focusElement);
    //addeventlistener("focus") does not bubble up or down
    //we can use "focusin" on pricingContainer and add or remove keypress event to .sliderIconWrapper
    pricingContainer.addEventListener("focusin", addOrRemoveKeydownSliderIcon);
  }

  function addOrRemoveKeydownSliderIcon(event) {
    var { sliderIconWrapper } = ourSelectors();

    //call func based on focus event
    if (event.target == sliderIconWrapper) {
      //add if it is sliderIcon
      addFocusEventToSliderIcon();
    } else {
      //remove if it is not sliderIcon
      removeFocusEventFromSlider();
    }
  }

  function addFocusEventToSliderIcon() {
    var { sliderIconWrapper } = ourSelectors();

    //the func that we passed into .addEventListener, in order to remove the event we need to pass that same func to .removeEventListener
    sliderIconWrapper.addEventListener("keydown", moveSliderIconOnKeydown);
  }

  function removeFocusEventFromSlider() {
    var { sliderIconWrapper } = ourSelectors();
    sliderIconWrapper.removeEventListener("keydown", moveSliderIconOnKeydown);
  }

  function moveSliderIconOnKeydown(event) {
    var keydownMoveCounter;
    /***** layerXofClickedEle will be updating the position of layerX based on mousemovement  *****/
    /***** we will declare keydownMoveCounter variable in this func. if layerXofClickedEle is undefined it means currently it holds no value,
     * the keydownMoveCounter variable we declare will be 0, if layerXofClickedEle is not != undefined we will assign the value of layerXofClickedEle
     * to keydownMoveCounter then we will either add or substract to keydownMoveCounter based on which arrow key user keydown.
     * then we will assign the value of keydownMoveCounter to layerXofClickedEle so our mousemovement will work with the correct position of .sliderIconWrapper
     * *****/

    if (layerXofClickedEle == undefined) {
      keydownMoveCounter = 0;
    } else {
      keydownMoveCounter = layerXofClickedEle;
    }
    //our switch statement will run depending on which arrow key, home,end, page up or down key is pressed(keydown)
    //we will update keydownMoveCounter
    switch (event.key) {
      case "ArrowLeft":
        //-1
        if (keydownMoveCounter === 0) {
          keydownMoveCounter = 0;
        } else {
          keydownMoveCounter -= 1;
        }
        break;
      case "ArrowDown":
        //-1
        if (keydownMoveCounter === 0) {
          keydownMoveCounter = 0;
        } else {
          keydownMoveCounter -= 1;
        }
        break;
      case "ArrowRight":
        //+1
        if (keydownMoveCounter == 434) {
          keydownMoveCounter = 434;
        } else {
          keydownMoveCounter += 1;
        }
        break;
      case "ArrowUp":
        //+1
        if (keydownMoveCounter == 434) {
          keydownMoveCounter = 434;
        } else {
          keydownMoveCounter += 1;
        }
        break;
      case "Home":
        //go to 0
        keydownMoveCounter = 0;
        break;
      case "End":
        //go to 434
        keydownMoveCounter = 434;

        break;
      case "PageUp":
        //+4
        if (keydownMoveCounter >= 431) {
          keydownMoveCounter = 434;
        } else {
          keydownMoveCounter += 4;
        }
        break;
      case "PageDown":
        //-4
        if (keydownMoveCounter <= 3) {
          keydownMoveCounter = 0;
        } else {
          keydownMoveCounter -= 4;
        }
        break;
    }
    console.log(keydownMoveCounter);
    //once we update keydownMoveCounter we will assign that value to --desktop-slider-movement
    document.documentElement.attributes["style"].value =
      "--desktop-slider-movement: " + String(keydownMoveCounter) + "px";
    //then we will update layerXofClickedEle by assigning the value of keydownMoveCounter to layerXofClickedEle
    //this way if our user decide to use the mouse to move the .sliderIconWrapper it will use the current position of X or position of layerX
    //where the keyboard user last used the keyboard to move .sliderIconWrapper
    layerXofClickedEle = keydownMoveCounter;
  }

  /*  

Right Arrow: Increase the value of the slider by one step. key = "ArrowRight"
Up Arrow: Increase the value of the slider by one step. key = "ArrowUp"
Left Arrow: Decrease the value of the slider by one step. key = "ArrowLeft"
Down Arrow: Decrease the value of the slider by one step. key = "ArrowDown"
Home: Set the slider to the first allowed value in its range. key = "Home"
End: Set the slider to the last allowed value in its range. key = "End"
Page Up (Optional): Increment the slider by an amount larger than the step change made by Up Arrow. key = "PageUp". move by 4
Page Down (Optional): Decrement the slider by an amount larger than the step change made by Down Arrow. key = "PageDown" move by 4

*/

  /***** keyboard feature *****/
}

function clickEventAddToToggleContainer() {
  var { toggleBtn } = ourSelectors();

  toggleBtn.addEventListener(
    "click",
    toggleAriaCheckedSwitchBetweenTrueAndFalse
  );
}

// function fireFuncBasedOnElementClicked(event) {
//   var useThisPositionInMousemose;
//   /***** for our toggle button between monthly and yearly billing *****/
//   toggleAriaCheckedSwitchBetweenTrueAndFalse(event);

//   /***** move .sliderIconWrapper to spot in bar based on if user click on .bar or .bar-wrapper *****/
//   var layerXfromSliderBarClickEvent =
//     sliderMovementClickFeatureBarElement(event);
//   //if user click on .sliderIconWrapper or .bar or .barWrapper
//   //if layerX is between 0 and 40 make useThisPositionInMousemose to be 0
//   //if layerX is between 435 and 472 make useThisPositionInMousemose to be 434
//   /***** we will run mousemove algorithm based on user clicking on .sliderIcon or .bar or .barWrapper *****/
//   if (
//     layerXfromSliderBarClickEvent >= 0 &&
//     layerXfromSliderBarClickEvent <= 40
//   ) {
//     useThisPositionInMousemose = 0;
//   } else if (
//     layerXfromSliderBarClickEvent >= 435 &&
//     layerXfromSliderBarClickEvent <= 472
//   ) {
//     useThisPositionInMousemose = 432;
//   } else {
//     useThisPositionInMousemose = layerXfromSliderBarClickEvent;
//   }
//   testingIdeas(useThisPositionInMousemose);
// }

/* toggle between monthly/yearly: both works */

/***** we can use keyword this since we are adding event listener to toggleBtn *****/
function toggleAriaCheckedSwitchBetweenTrueAndFalse(eventInput) {
  // var { toggleBtn } = ourSelectors();
  console.log(this);
  if (eventInput.target == this) {
    //clicking toggle button
    let toggleAriaCheckedAttr =
      eventInput.target.attributes["aria-checked"].value;
    //single ! means explicitly coerce to boolean. checking if its false
    //we shouldn't check if its true or false (a boolean) because the value of ["aria-checked"].value will be a string true or false
    //we want to check if the value is a string "true" or "false"
    /***** changing the text between month and year *****/
    changeTextOfBillingMonthOrYear(toggleAriaCheckedAttr);
    if (toggleAriaCheckedAttr == "false") {
      // if aria-checked is false turn to true
      this.attributes["aria-checked"].value = "true";
    } else {
      this.attributes["aria-checked"].value = "false";
    }
  } else if (eventInput.target.parentElement == this) {
    // clicking the span/circle element
    let parentElementAriaCheckedAttr =
      eventInput.target.parentElement.attributes["aria-checked"].value;
    /***** changing the text between month and year *****/
    changeTextOfBillingMonthOrYear(parentElementAriaCheckedAttr);
    if (parentElementAriaCheckedAttr == "false") {
      this.attributes["aria-checked"].value = "true";
    } else {
      this.attributes["aria-checked"].value = "false";
    }
  }
}

// function toggleAriaCheckedSwitchBetweenTrueAndFalse(eventInput) {
//   var { toggleBtn } = ourSelectors();
//   if (eventInput.target == toggleBtn) {
//     //clicking toggle button
//     let toggleAriaCheckedAttr =
//       eventInput.target.attributes["aria-checked"].value;
//     //single ! means explicitly coerce to boolean. checking if its false
//     //we shouldn't check if its true or false (a boolean) because the value of ["aria-checked"].value will be a string true or false
//     //we want to check if the value is a string "true" or "false"
//     /***** changing the text between month and year *****/
//     changeTextOfBillingMonthOrYear(toggleAriaCheckedAttr);
//     if (toggleAriaCheckedAttr == "false") {
//       // if aria-checked is false turn to true
//       toggleBtn.attributes["aria-checked"].value = "true";
//     } else {
//       toggleBtn.attributes["aria-checked"].value = "false";
//     }
//   } else if (eventInput.target.parentElement == toggleBtn) {
//     // clicking the span/circle element
//     let parentElementAriaCheckedAttr =
//       eventInput.target.parentElement.attributes["aria-checked"].value;
//     /***** changing the text between month and year *****/
//     changeTextOfBillingMonthOrYear(parentElementAriaCheckedAttr);
//     if (parentElementAriaCheckedAttr == "false") {
//       toggleBtn.attributes["aria-checked"].value = "true";
//     } else {
//       toggleBtn.attributes["aria-checked"].value = "false";
//     }
//   }
// }

/* toggle between monthly/yearly */

// function

/* slider feature: move .sliderIconWrapper when user clicked on .bar or .bar-wrapper */
function sliderMovementClickFeatureBarElement(eventInput) {
  // alert("worked!");
  var { barTealElement, barWrapperElement } = ourSelectors();
  console.log("sliderMovement", eventInput.layerX);
  //work with layerX
  //check if event.target is .bar or .bar-wrapper
  /* we dont need to add or substract we want .sliderIconWrapper to move to the layerX based on where the user click at bar or bar-wrapper */
  if (eventInput.target == barTealElement) {
    //if user clicked on bar and layerX is between 0 and 40 we will set --slider-movement to be 0 by setting barlayerX to be 0
    let barLayerX = eventInput.layerX;
    if (barLayerX >= 0 && barLayerX <= 40) {
      barLayerX = 0;
      document.documentElement.attributes["style"].value =
        "--desktop-slider-movement:" + " " + String(barLayerX) + "px";
    } else {
      document.documentElement.attributes["style"].value =
        "--desktop-slider-movement:" + " " + String(barLayerX) + "px";
    }
  } else if (eventInput.target == barWrapperElement) {
    let barWrapperLayerX = eventInput.layerX;
    //when we click on .barWrapper neat the edge our .sliderIconWrapper right side is too far off barWrapper edge
    //when we use transform: translateX(434px) on .sliderIconWrapper. the right edge of .sliderIconWrapper touches the right edge of .barWrapper
    //instead of subtracting layerX if the user click on barWrapper and layerX is 470: we will work with a range and if layerX
    //is within that range we will set layerX to be 434
    //range we will work with will be 435-472
    if (barWrapperLayerX >= 435 && barWrapperLayerX <= 472) {
      //if user clicked on barWrapper and layerX is between 435 and 472 we will set --slider-movement to be 434 by setting barWrapperLayerX to be 434
      barWrapperLayerX = 434;
      document.documentElement.attributes["style"].value =
        "--desktop-slider-movement:" + " " + String(barWrapperLayerX) + "px";
    } else {
      //set --slider-movement will be set to event.target.layerX
      document.documentElement.attributes["style"].value =
        "--desktop-slider-movement:" + " " + String(barWrapperLayerX) + "px";
    }
  }
  return eventInput.layerX;
}

/* slider feature: move .sliderIconWrapper when user clicked on .bar or .bar-wrapper */

/***** func will change the text between month or year based on toggle aria-checked
 * if true it will be year if it is false it will be month
 * *****/

function changeTextOfBillingMonthOrYear(valueOfAriaChecked) {
  var { spanTextEleMonthOrYear } = ourSelectors();

  if (valueOfAriaChecked == "false") {
    spanTextEleMonthOrYear.innerText = "/ year";
  } else {
    spanTextEleMonthOrYear.innerText = "/ month";
  }
}

/***** mobile functionality *****/

function scopeThisFunc() {
  function desktopMouseClickAndMouseMovementAlgor() {
    // addAndRemoveMouseMovementAlgorithm();
    var { barWrapperElement, sliderIconWrapper } = ourSelectors();
    //layerXofClickedEle will be layerX of bar or barWrapper
    var layerXofClickedEle;
    console.log("layerXofClickedEle", layerXofClickedEle);
    /***** when user click on .bar or .barWrapper we will get the layerX assign it to layerXofClickedEle variable
     * if user clicked between 0 and 40 layerX will be 0. if user clicked between 435 and 472 layerX will be 434.
     * we will use layerXofClickedELe in our mouseMovement func
     * *****/
    barWrapperElement.addEventListener(
      "click",
      function sliderMovementClickFeatureBarElement(event) {
        var { barTealElement, barWrapperElement } = ourSelectors();
        console.log("sliderMovement", event.layerX);
        //work with layerX
        //check if event.target is .bar or .bar-wrapper
        /* we dont need to add or substract we want .sliderIconWrapper to move to the layerX based on where the user click at bar or bar-wrapper */
        if (event.target == barTealElement) {
          //if user clicked on bar and layerX is between 0 and 40 we will set --slider-movement to be 0 by setting barlayerX to be 0
          let barLayerX = event.layerX;
          if (barLayerX >= 0 && barLayerX <= 40) {
            barLayerX = 0;
            document.documentElement.attributes["style"].value =
              "--desktop-slider-movement:" + " " + String(barLayerX) + "px";
          } else {
            document.documentElement.attributes["style"].value =
              "--desktop-slider-movement:" + " " + String(barLayerX) + "px";
          }
        } else if (event.target == barWrapperElement) {
          let barWrapperLayerX = event.layerX;
          //when we click on .barWrapper neat the edge our .sliderIconWrapper right side is too far off barWrapper edge
          //when we use transform: translateX(434px) on .sliderIconWrapper. the right edge of .sliderIconWrapper touches the right edge of .barWrapper
          //instead of subtracting layerX if the user click on barWrapper and layerX is 470: we will work with a range and if layerX
          //is within that range we will set layerX to be 434
          //range we will work with will be 435-472
          if (barWrapperLayerX >= 435 && barWrapperLayerX <= 472) {
            //if user clicked on barWrapper and layerX is between 435 and 472 we will set --slider-movement to be 434 by setting barWrapperLayerX to be 434
            barWrapperLayerX = 434;
            document.documentElement.attributes["style"].value =
              "--desktop-slider-movement:" +
              " " +
              String(barWrapperLayerX) +
              "px";
          } else {
            //set --slider-movement will be set to event.target.layerX
            document.documentElement.attributes["style"].value =
              "--desktop-slider-movement:" +
              " " +
              String(barWrapperLayerX) +
              "px";
          }
        }
        layerXofClickedEle = event.layerX;
        // console.log("layerXofClickedEle", layerXofClickedEle);
        /***** calling mousemove func: when we have testingIdeas inside this event we're adding mousemove and mouseup event to .sliderIconWrapper *****/
        // alert("we are passing in the correct layerX that we want to use in mousemove func");
        // alert("testingIdeas is fire four times")
        if (layerXofClickedEle >= 0 && layerXofClickedEle <= 40) {
          layerXofClickedEle = 0;
        } else if (layerXofClickedEle >= 435 && layerXofClickedEle <= 472) {
          layerXofClickedEle = 434;
        } else {
          layerXofClickedEle = event.layerX;
        }
        console.log("layerXofClickedEle", layerXofClickedEle);
        /***** calling mousemove func: when we have testingIdeas inside this event we're adding mousemove and mouseup event to .sliderIconWrapper *****/
        // testingIdeas(layerXofClickedEle);
        /***** getLayerXpositionOfbarEle func will return the value assigned to layerXofClickedEle. every time our user click on .bar or .barWrapper
         * we dont run it in this click event. we are passing the refer of getLayerXpositionOfBarEle to positionOfClickedEvent then in our mouseMoveAlgorithm or the func we have the mouseMoveAlgorithm
         * event listener we will call positionOfClickedEvent to get that value.
         *  *****/
        // function getLayerXpositionOfBarEle() {
        //   return layerXofClickedEle;
        // }
        //positionOfClickedEvent is declared outside of this click event func
        // positionOfClickedEvent = getLayerXpositionOfBarEle;
        setTimeout(function focusSliderIconWrapper() {
          sliderIconWrapper.focus();
        }, 1000);
      }
    );
    addAndRemoveMouseMovementAlgorithm();
    // callAddAndRemoveMouseMovementAlgorithm = addAndRemoveMouseMovementAlgorithm;
    /***** mouseMovementAlgorithm *****/
    // we don't need to pass in layerXOfClickedEle because our mouseMovementAlgor func is declared in the same scope as
    //the event listener that will assign the layerX to a variable that our mouseMovementAlgor func can use
    function addAndRemoveMouseMovementAlgorithm() {
      var { sliderIconWrapper, sliderContainer } = ourSelectors();
      // first time we run addAndRemoveMouseMovementAlgorithm mouseClickOfLayerX will 0
      // when we click on bar or barWrapper mouseClickOfLayerX will be the layerX of bar or barWrapper
      var movementCounter;

      /***** add event *****/
      // when user click on .sliderIconWrapper we will run mouseMovementAlgorithm
      sliderIconWrapper.addEventListener(
        "mousedown",
        function addMovementEventToSliderIcon(event) {
          // we need a way to update/reassign movementCounter
          //every time user click on bar or barWrapper layerXofClickedEle is reassigned
          //inside addAndRemoveMouseMovementAlgorithm we are using movementCounter so we want to update that variable whenever our user click on sliderIconWrapper
          if (!layerXofClickedEle) {
            movementCounter = 0;
          } else {
            movementCounter = layerXofClickedEle;
          }
          if (event.target == this) {
            console.log(movementCounter);
            mouseMovementAlgorithm(this);
          }
        }
      );
      /***** add event *****/
      /***** remove event *****/
      //inside removeEventListenerMousemoveOnMouseUp we will remove moveSliderIconWrapper

      sliderIconWrapper.addEventListener(
        "mouseup",
        removeEventListenerMousemoveOnMouseUp
      );
      //inside removeMousemoveEventWhenOutsideSliderIconWrapper we will remove moveSliderIconWrapper
      sliderContainer.addEventListener(
        "mousemove",
        removeMousemoveEventWhenOutsideSliderIconWrapper
      );
      /***** remove event *****/
      /***** declare funcs *****/
      function mouseMovementAlgorithm(sliderIconInput) {
        sliderIconInput.addEventListener("mousemove", moveSliderIconWrapper);
      }

      function moveSliderIconWrapper(eventInput) {
        if (eventInput.movementX < 0 && movementCounter <= 0) {
          movementCounter = 0;
        } else if (eventInput.movementX > 0 && movementCounter >= 434) {
          movementCounter = 434;
        } else {
          if (eventInput.movementX < 0) {
            movementCounter += -1;
          } else {
            movementCounter += 1;
          }
        }

        document.documentElement.attributes["style"].value =
          "--desktop-slider-movement: " + String(movementCounter) + "px";
        /***** we want to update layerXofClickedEle to be movementCounter because we want to use the new position of layerXofClickedEle
         * for our keyboard feature
         *  *****/
        layerXofClickedEle = movementCounter;
      }

      // removeEvent Funcs
      function removeEventListenerMousemoveOnMouseUp(eventInput) {
        //this remove func will be run/execute by sliderIconWrapper
        if (eventInput.target == this) {
          this.removeEventListener("mousemove", moveSliderIconWrapper);
        }
      }
      function removeMousemoveEventWhenOutsideSliderIconWrapper(eventInput) {
        //this remove func will be run/execute by sliderContainer
        if (eventInput.target != sliderIconWrapper) {
          sliderIconWrapper.removeEventListener(
            "mousemove",
            moveSliderIconWrapper
          );
        }
      }
      /***** declare funcs *****/
    }
    keyboardFeatureSliderMovement();
    /***** mouseMovementAlgorithm *****/

    /***** we dont have to make a function inside click event of barElement and pass a reference to that func to a variable outside the func scope of click event
   * if we declare our mousemoveAlgorithm inside the same func scope as the click event
   * alert("look at algorithmDidnotWorkTheWayWeWant");
   function testingPositionOfClickedEle() {
     var { sliderIconWrapper } = ourSelectors();
     // if (positionOfClickedEvent instanceof Function) {u
     //   console.log(positionOfClickedEvent);
     // }
     sliderIconWrapper.addEventListener("mousedown", function (event) {
       console.log(event);
       console.log("layerXofClickedEle", layerXofClickedEle);
       // if (positionOfClickedEvent instanceof Function) {
       //   console.log(positionOfClickedEvent());
       // }
     });
   }
   *****/
    /***** keyboard feature: do not need keyboard feature for mobile display *****/

    // function keyboardFeatureSliderMovement() {
    //   var { pricingContainer } = ourSelectors();
    //   //document.activeElement will let us know which element has focus but we have to run/call/execute this func
    //   var focusElement = document.activeElement;
    //   console.log(focusElement);
    //   //addeventlistener("focus") does not bubble up or down
    //   //we can use "focusin" on pricingContainer and add or remove keypress event to .sliderIconWrapper
    //   pricingContainer.addEventListener("focusin", addOrRemoveKeydownSliderIcon);
    // }

    // function addOrRemoveKeydownSliderIcon(event) {
    //   var { sliderIconWrapper } = ourSelectors();

    //   //call func based on focus event
    //   if (event.target == sliderIconWrapper) {
    //     //add if it is sliderIcon
    //     addFocusEventToSliderIcon();
    //   } else {
    //     //remove if it is not sliderIcon
    //     removeFocusEventFromSlider();
    //   }
    // }

    // function addFocusEventToSliderIcon() {
    //   var { sliderIconWrapper } = ourSelectors();

    //   //the func that we passed into .addEventListener, in order to remove the event we need to pass that same func to .removeEventListener
    //   sliderIconWrapper.addEventListener("keydown", moveSliderIconOnKeydown);
    // }

    // function removeFocusEventFromSlider() {
    //   var { sliderIconWrapper } = ourSelectors();
    //   sliderIconWrapper.removeEventListener("keydown", moveSliderIconOnKeydown);
    // }

    // function moveSliderIconOnKeydown(event) {
    //   var keydownMoveCounter;
    //   /***** layerXofClickedEle will be updating the position of layerX based on mousemovement  *****/
    //   /***** we will declare keydownMoveCounter variable in this func. if layerXofClickedEle is undefined it means currently it holds no value,
    //    * the keydownMoveCounter variable we declare will be 0, if layerXofClickedEle is not != undefined we will assign the value of layerXofClickedEle
    //    * to keydownMoveCounter then we will either add or substract to keydownMoveCounter based on which arrow key user keydown.
    //    * then we will assign the value of keydownMoveCounter to layerXofClickedEle so our mousemovement will work with the correct position of .sliderIconWrapper
    //    * *****/

    //   if (layerXofClickedEle == undefined) {
    //     keydownMoveCounter = 0;
    //   } else {
    //     keydownMoveCounter = layerXofClickedEle;
    //   }
    //   //our switch statement will run depending on which arrow key, home,end, page up or down key is pressed(keydown)
    //   //we will update keydownMoveCounter
    //   switch (event.key) {
    //     case "ArrowLeft":
    //       //-1
    //       if (keydownMoveCounter === 0) {
    //         keydownMoveCounter = 0;
    //       } else {
    //         keydownMoveCounter -= 1;
    //       }
    //       break;
    //     case "ArrowDown":
    //       //-1
    //       if (keydownMoveCounter === 0) {
    //         keydownMoveCounter = 0;
    //       } else {
    //         keydownMoveCounter -= 1;
    //       }
    //       break;
    //     case "ArrowRight":
    //       //+1
    //       if (keydownMoveCounter == 434) {
    //         keydownMoveCounter = 434;
    //       } else {
    //         keydownMoveCounter += 1;
    //       }
    //       break;
    //     case "ArrowUp":
    //       //+1
    //       if (keydownMoveCounter == 434) {
    //         keydownMoveCounter = 434;
    //       } else {
    //         keydownMoveCounter += 1;
    //       }
    //       break;
    //     case "Home":
    //       //go to 0
    //       keydownMoveCounter = 0;
    //       break;
    //     case "End":
    //       //go to 434
    //       keydownMoveCounter = 434;

    //       break;
    //     case "PageUp":
    //       //+4
    //       if (keydownMoveCounter >= 431) {
    //         keydownMoveCounter = 434;
    //       } else {
    //         keydownMoveCounter += 4;
    //       }
    //       break;
    //     case "PageDown":
    //       //-4
    //       if (keydownMoveCounter <= 3) {
    //         keydownMoveCounter = 0;
    //       } else {
    //         keydownMoveCounter -= 4;
    //       }
    //       break;
    //   }
    //   console.log(keydownMoveCounter);
    //   //once we update keydownMoveCounter we will assign that value to --desktop-slider-movement
    //   document.documentElement.attributes["style"].value =
    //     "--desktop-slider-movement: " + String(keydownMoveCounter) + "px";
    //   //then we will update layerXofClickedEle by assigning the value of keydownMoveCounter to layerXofClickedEle
    //   //this way if our user decide to use the mouse to move the .sliderIconWrapper it will use the current position of X or position of layerX
    //   //where the keyboard user last used the keyboard to move .sliderIconWrapper
    //   layerXofClickedEle = keydownMoveCounter;
    // }

    /*  

Right Arrow: Increase the value of the slider by one step. key = "ArrowRight"
Up Arrow: Increase the value of the slider by one step. key = "ArrowUp"
Left Arrow: Decrease the value of the slider by one step. key = "ArrowLeft"
Down Arrow: Decrease the value of the slider by one step. key = "ArrowDown"
Home: Set the slider to the first allowed value in its range. key = "Home"
End: Set the slider to the last allowed value in its range. key = "End"
Page Up (Optional): Increment the slider by an amount larger than the step change made by Up Arrow. key = "PageUp". move by 4
Page Down (Optional): Decrement the slider by an amount larger than the step change made by Down Arrow. key = "PageDown" move by 4

*/

    /***** keyboard feature: do not need keyboard feature for mobile display *****/
  }
}

/***** mobile functionality *****/

/***** func will change the text between month or year based on toggle aria-checked
 * if true it will be year if it is false it will be month
 * *****/

/***** keyboard feature *****/
/*  

Right Arrow: Increase the value of the slider by one step.
Up Arrow: Increase the value of the slider by one step.
Left Arrow: Decrease the value of the slider by one step.
Down Arrow: Decrease the value of the slider by one step.
Home: Set the slider to the first allowed value in its range.
End: Set the slider to the last allowed value in its range.
Page Up (Optional): Increment the slider by an amount larger than the step change made by Up Arrow.
Page Down (Optional): Decrement the slider by an amount larger than the step change made by Down Arrow.

*/

// alert("fun begins add keyboard fuctionality");
// keyboardFeatureSliderMovement();
function keyboardFeatureSliderMovement(variablePassedIn) {
  var { pricingContainer } = ourSelectors();
  //document.activeElement will let us know which element has focus but we have to run/call/execute this func
  var focusElement = document.activeElement;
  console.log(focusElement);
  //addeventlistener("focus") does not bubble up or down
  //we can use "focusin" on pricingContainer and add or remove keypress event to .sliderIconWrapper
  pricingContainer.addEventListener("focusin", addOrRemoveKeydownSliderIcon);
}

function addOrRemoveKeydownSliderIcon(event) {
  var { sliderIconWrapper } = ourSelectors();

  //call func based on focus event
  if (event.target == sliderIconWrapper) {
    //add if it is sliderIcon
    addFocusEventToSliderIcon();
  } else {
    //remove if it is not sliderIcon
    removeFocusEventFromSlider();
  }
}

function addFocusEventToSliderIcon() {
  var { sliderIconWrapper } = ourSelectors();

  //the func that we passed into .addEventListener, in order to remove the event we need to pass that same func to .removeEventListener
  sliderIconWrapper.addEventListener("keydown", moveSliderIconOnKeydown);
}

function removeFocusEventFromSlider() {
  var { sliderIconWrapper } = ourSelectors();
  sliderIconWrapper.removeEventListener("keydown", moveSliderIconOnKeydown);
}

function moveSliderIconOnKeydown(event) {
  console.log(event);
}

/***** keyboard feature *****/

/***** run our func that controls the slider/pageviews/priceview
 * based on our toggle. if aria-checked is true we want to work with year obj
 * if it is aria-checked false we want to work with month obj
 * *****/
/***** run our func that controls the slider/pageviews/priceview
 * based on our toggle. if aria-checked is true we want to work with year obj
 * if it is aria-checked false we want to work with month obj
 * *****/

/***** our func with our obj: month data and year data *****/

function selectDataBasedOnToggleMonthOrYear(strInput) {}

/***** our func with our obj: month data and year data *****/

/***** our data will be selected based on the slider position *****/

function returnMonthOrYearDataObj(sliderPosition) {
  var monthData = {
    first: {},
    second: {},
    third: {},
    fourth: {},
    fifth: {},
  };
  var yearData = {
    first: {},
    second: {},
    third: {},
    fourth: {},
    fifth: {},
  };
}

// clickingFeatureMobileAndDesktop();
/***** our data will be selected based on the slider position *****/
function clickingFeatureMobileAndDesktop() {
  // alert("clicking event will fire on mouse click and touch");
  // alert(
  //   "look into layerX when we implement clicking feature: where clicking on the .bar or .bar-wrapper will move .sliderIconWrapper to that spot."
  // );
  // alert("look at mouseMoveAlgorithm");
}

/***** refactored near the top of file. we will declare mouseMovement inside the func that we will add click event to barWrapper
 * so that we can update a variable that our mouseMovement will also use.
 * if we declare mouseMovement outside the func scope of the func that we will add click event to barWrapper then we have to declare a func inside that func scope
 * the func will return the position where our user clicked on bar or barWrapper pass that func reference to a variable outside of the
 * func that has add click event to barWrapper then that variable will have a reference to the func that will return positionX
 * then we will call that func inside of mouseMovement func to get positionX that we will use event mousemove
 * *****/

function testing_Ideas(layerXOfMouseClick = 0) {
  var { sliderIconWrapper } = ourSelectors();
  var sliderContainer = document.querySelector(".slider");

  // console.log(layerXOfMouseClick);
  // alert(
  //   "we will find a way to pass in layerCofMouseClickOnBarElement to this func"
  // );
  // use mousedown them mousemove then mouseup
  /***** currently when we move our mouse to the right, we will add one to movementCounter *****/
  var movementCounter = layerXOfMouseClick;
  /***** we want a variable to keep track of the previous pageX position/number.
   * we want a way to know when our user is moving the mouse left or right
   *  *****/
  //we want to get pageX position
  //the next time "mousemove" is call/execute if that number is greater add 1 to movementCounter
  //if that number is less than substract 1 from movementCounter
  //if the number is equal keep movementCounter or do nothing
  // console.log(sliderContainer.firstElementChild.nextElementSibling);
  // alert(
  //   "our movementCounter is incrementing when the mouse move in the vertical direction"
  // );
  /***** for our mouse users: we want our algorithm to fire when they click/hold left click on our slider-icon-wrapper *****/
  /***** on "mousedown" on our .sliderIconWrapper element we will add "mousemove" and watchMouseMovement()*****/
  sliderIconWrapper.addEventListener(
    "mousedown",
    function checkElementClicked(event) {
      console.log(layerXOfMouseClick);
      if (event.target == this) {
        console.log(event);
        // console.log(this);
        // mouseMoveAlgorithm(this, event);
        // this.addEventListener("mousedown", clickEvent);
        mouseMoveAlgorithm(this);
      }
    }
  );
  // function clickEvent(event) {
  //   console.log(event);
  //   //since this.addEventListener() will call clickEvent() and this of checkElementClicked() is .sliderIconWrapper
  //   //keyword this in clickEvent will be .sliderIconWrapper
  //   // console.log(this);
  //   // mouseMoveAlgorithm(this, event);
  // }

  /***** when our user released the left mouse click "mouseup" when was to use removeeventlistener to remove "mousemove" on .sliderIconWrapper *****/
  /***** on "mouseup" on our .sliderIconWrapper element we want to remove "mousemove" and watchMouseMovement() *****/

  sliderIconWrapper.addEventListener("mouseup", mouseUpRemoveEventListener);
  function mouseUpRemoveEventListener(event) {
    //the keyword this will be .sliderIconWrapper because we will addeventlistener "mouseup" to .sliderIconWrapper
    //we want to remove the event when the target is .sliderIconWrapper
    if (event.target == this) {
      // watchMoveMovement is being added/called in mouseMoveAlgorithm

      this.removeEventListener("mousemove", watchMouseMovement);
    }
  }
  /***** for our mouse users: we want our algorithm to fire when they click/hold left click on our slider-icon-wrapper *****/
  /***** we also want to removeEventListener "mousemove" when our cursor leaves/is not hovering over .sliderIconWrapper
   * putting the "mousemove" listener on the .sliderContainer which is the parent of .sliderIconWrapper we are able to remove the "mousemove" event
   * on .sliderIconWrapper. before we had the "mousemove" listener on .sliderIconWrapper, when we move our cursor outside of .sliderIconWrapper
   * our code didn't remove "mousemove" event on .sliderIconWrapper. we think the reason is we had "mousemove" on .sliderIconWrapper. the func will fire
   * every time the mouse moves when it is on .sliderIconWrapper but when we move the cursor outside of .sliderIconWrapper our func is not firing/executing
   * therefore it won't run removeMouseMoveEventWhenOutsideOfIconWrapper. also we have the if statement => if(event.target != sliderIconWrapper)
   * that is wrong because when we have the cursor over .sliderIconWrapper we will never enter our if statement but when we move our cursor outside of
   * .sliderIconWrapper the "mousemove" will never run/execute removeMouseMoveEventWhenOutsideOfIconWrapper.
   * *****/
  sliderContainer.addEventListener(
    "mousemove",
    removeMouseMoveEventWhenOutsideOfIconWrapper
  );
  function removeMouseMoveEventWhenOutsideOfIconWrapper(event) {
    if (event.target != sliderIconWrapper) {
      // watchMoveMovement is being added/called in mouseMoveAlgorithm
      sliderIconWrapper.removeEventListener("mousemove", watchMouseMovement);
    }
  }

  /***** we also want to removeEventListener "mousemove" when our cursor leaves/is not hovering over .sliderIconWrapper *****/

  sliderContainer.removeEventListener(
    // alert("this was a test func. our algorithm is below this .addeventlistener")
    "keydown",
    function watchMovingSlider(event) {
      console.log(event);
      // if (event.target == sliderIconWrapper) {
      //   removeMouseMovementAlgorFunc();
      // }
      // if (event.target == sliderIconWrapper) {
      //   removeMouseMovementAlgorFunc(event);
      // }
      // console.log(event);
      // console.log(event.pageX);
      // console.log(event.target);
      /***** whatever pageX is we will divide that number by itself which will give us 1 *****/
      /***** we will add or substract this number based on our user mouse direction movement *****/
      // var addThisToMovementCounter = event.pageX / event.pageX;
      /***** test out movementX instead of using .pageX *****/
      var addThisToMovementCounter = event.movementX;
      // console.log(addThisToMovementCounter);
      /***** movementCounter is a variable set to 0, it is outside the scope of this function so it won't reset everytime this event or function
       * is called
       *  *****/
      /***** only increment when pageX increase not when "mousemove" fires or we can use movementX *****/
      /***** we can use movementX it will increment our movement by 1 when user move the mouse to the right and decrement by 1 when the user move
       * the mouse to the left
       *  *****/
      /***** when we use movementX we don't have to check if the user is moving the mouse to the left or right *****/
      /***** addThisToMovementCounter will increment or decrement movementCounter based on the user mouse move (right or left) *****/

      movementCounter += addThisToMovementCounter;

      // console.log(movementCounter);
      // if (event.target == this) {
      //   this.addEventListener("mousemove", function testingAlgorithm(event) {
      //     console.log(event.pageX);
      //   });
      // }
      // var pixelMoveMnt = event.pageX;
      // console.log(`${pixelMoveMnt}`);
      // console.log(typeof pixelMoveMnt);
      // document.documentElement.attributes["style"].value =
      //   "--slider-movement: " + String(pixelMoveMnt) + "px";
      // if (event.target == sliderIconWrapper) {
      //   console.log("hello");
      // }
      // alert(
      //   "next time we build an accessible navbar use code below to check the event.target element, another way to check an element instead of using the elements"
      // );
      // alert("class name. we can put an id on the element we want to check then use event.target == document.querySelector()")
      // if (event.target == sliderIconWrapper) {
      //   console.log("hello");
      // }
    }
  );
  // alert("our slider-icon-wrapper is moving based on movement of mouse");
  // alert(
  //   "we will figure out how to add one or substract one pixel based on mouse horizontal movement"
  // );
  // alert(
  //   "get pageX divide by pageX add it to a variable use that variable to change --slider-movement"
  // );
  // sliderContainer.addEventListener(
  //   "mousemove",
  //   function watchMovingSlider(event) {
  //     console.log(event);
  //     console.log(event.pageX);
  //     var pixelMoveMnt = event.pageX;
  //     console.log(`${pixelMoveMnt}`);
  //     console.log(typeof pixelMoveMnt);
  //     document.documentElement.attributes["style"].value =
  //       "--slider-movement: " + String(pixelMoveMnt) + "px";
  //   }
  // );
  // alert("our slider-icon-wrapper is moving based on movement of mouse")
  //the slider element transform: translateX() will be based on the mousemove pageX position

  /***** adding "mousemove" event listener and removing "mousemove" event listener *****/

  function mouseMoveAlgorithm(elementPassIn) {
    // console.log(`this is mouseMoveAlgorithm:`, elementPassIn);
    //elementPassIn will be our .sliderIconWrapper
    //we add this eventlistener in our .sliderIconWrapper.addeventlistener("click")
    //when the event.target == sliderIconWrapper, when used the event.target == this
    //the keyword this will be the element we attached .addEventListener which will be .sliderIconWrapper

    elementPassIn.addEventListener("mousemove", watchMouseMovement);
  }
  // alert(
  //   "our algorithm is working when we use event.movementX. our CSS variable --slider-movement on HTML will be updating when user move the mouse to the left or right"
  // );
  // alert(
  //   "work on algorithm to stop user mouse movement when .sliderIconWrapper reaches the right edge of .slider"
  // );

  /***** we are calling watchMouseMovement inside of .slider *****/
  /***** our algorithm is working when we use event.movementX. our CSS variable --slider-movement on HTML will be updating when user move the mouse to the left or right
   * and it will move our .sliderIconWrapper
   * *****/
  function watchMouseMovement(event) {
    // console.log(event);
    /***** every time our user move the mouse to the right it will add 1 to movementCounter
     * every time our user move the mouse to the left it will substract -1 from movementCounter
     *  when our user left clicks on .sliderIconWrapper and hold down left click then move the mouse to the right
     * once monvementCounter gets to 434: the right side of the .sliderIconWrapper will touch the right edge of .slider
     * *****/
    // alert(
    //   "do we want to remove mousemove event listener when .sliderIconWrapper touches .slider righ edge or just stop updating --slider-movement"
    // );
    // alert("and stop increment movementCounter");
    //addThisToMovementCounter will be -1 or 1: -1 means mouse is moving left and 1 means mouse moving right
    /***** we will work with layerX instead of movementX so we can implement moving .sliderIconWrapper clicking on .bar or .barWrapper
     * keyboard functionality
     *  *****/
    /* alert("code in this block we were working with movementX and adding that number to movementCounter")*/

    // var addThisToMovementCounter = event.movementX;
    /***** now movementX is move left or right more than 1 or -1 *****/
    //movementCounter is declared at the top of testingIdeas func

    /***** every func is inside the testingIdeas func scope
     * movementCounter is a variable with an initial value 0
     * we are updating it every time user move mouse to the right or the left
     * *****/
    // console.log(addThisToMovementCounter);
    // console.log(movementCounter);
    /***** if movementCounter is 0 and movementX is -1 which means user moved the mouse to the left do nothing.
     * if movementCounter is 434 and movementX is 1 which means user moved the mouse to the right.
     * we want "--slider-movement" to match movementX when it is between 0 and 434
     * *****/
    //using a switch might not be the best because addThisToMovementCounter will either be -1 or 1
    // switch (addThisToMovementCounter) {
    //   case -1:
    //     //we should update movementX based on -1 moving left
    //     break;
    //   case 1:
    //     //we should update movementX based on 1 moving right
    //     break;
    // }
    // //if user is moving mouse to the left addThisToMovementCounter will -1 && movementCounter is 0, keep movementCounter 0
    var ourVariable = positionOfClickedEvent();
    console.log("ourVariable", ourVariable);
    if (event.movementX < 0 && movementCounter <= 0) {
      movementCounter = 0;
      //if user is moving mouse to the right addThisToMovementCounter will 1 && movementCounter is 434, keep movementCounter 434
    } else if (event.movementX > 0 && movementCounter >= 434) {
      movementCounter = 434;
    } else {
      if (event.movementX < 0) {
        movementCounter += -1;
      } else {
        movementCounter += 1;
      }
    }
    /* alert("code in this block we were working with movementX and adding that number to movementCounter")*/
    console.log("movementCounter", movementCounter);
    document.documentElement.attributes["style"].value =
      "--desktop-slider-movement: " + String(movementCounter) + "px";
    // document.documentElement.attributes["style"].value =
    //   "--slider-movement: " + String(movementCounter) + "px";
    // var { sliderIconWrapper } = ourSelectors();
    // var sliderContainer = document.querySelector(".slider");
    // console.log(event);
    // console.log(movementCounter);
    // when we have code below inside of watchMouseMovement it
    // does remove "mousemove" eventlistener but now everytime we call watchMouseMovement we are adding "mouseup" eventlistener
    /***** we will move .addeventlistener below outside of watchMouseMovement so we are not adding "mouseup" eventlistener to .sliderIconWrapper
     * every time our user move the mouse after they clicked on our .sliderIconWrapper which will call mouseMoveAlgorithm()
     * which will addeventlistener to "mousemove" .sliderIconWrapper which will run this watchMouseMovement funtions.
     *  *****/
    // sliderIconWrapper.addEventListener(
    //   "mouseup",
    //   function removeMouseMovement(event) {
    //     if (event.target == sliderIconWrapper) {
    //       this.removeEventListener("mousemove", watchMouseMovement);
    //     }
    //   }
    // );

    // if (event.target == sliderIconWrapper && event.which === 1) {
    //   console.log(event);
    // }
    //looks like our code is working, when our mouse cursor is not hovering over sliderIconWrapper we are not seeing console.log(event)
    //thinking our removeeventlistener is working;
    // if (event.target != sliderIconWrapper) {
    //   sliderIconWrapper.removeEventListener("mousemove", watchMouseMovement);
    // }
  }

  /***** adding "mousemove" event listener and removing "mousemove" event listener *****/
}

// function removeMouseMovementAlgorFunc(event) {
//   var sliderContainer = document.querySelector(".slider");

//   console.log("we here");
//   sliderContainer.removeEventListener("mousemove", watchMouseMovement);
// }

// var { sliderIconWrapper } = ourSelectors();
// sliderIconWrapper.addEventListener(
//   "mouseup",
//   function removeMouseMovement(event) {
//     if (event.target == sliderIconWrapper) {
//       this.removeEventListener("mousemove", watchMouseMovement);
//     }
//   }
// );

function algorithmDidnotWorkTheWayWeWant() {
  /***** reason code below didnt work is because we are updating movementX before we passed that variable into movingLeft and movingRight func
   * when movementCounter is 0,
   * var addThisToMovementCounter = event.movementX;
   * movementCounter += addThisToMovementCounter;
   * we had code above. so when user move mouse to the left event.movementX will be -1 which we assigned to addThisToMovementCounter
   * then we += -1 to movementCounter which will make movementCounter -1. when we passed movementCounter into mouseMovingLeft as moveCounter it was already assigned -1
   * so it will run the else statement
   *  *****/

  function mouseMovingLeft(moveCounter, movementX) {
    /***** if moveCounter is 0 and movementX is -1 which means user moved the mouse to the left do nothing.
     * we want "--slider-movement" to match movementX when it is between 0 and 434
     * *****/
    //we are still updating moveCounter which is movementCounter in watchMouseMovement
    debugger;
    if (moveCounter === 0) {
      let keepZeroWhenNegOne = 0;
      document.documentElement.attributes["style"].value =
        "--slider-movement: " + String(keepZeroWhenNegOne) + "px";
    } else {
      moveCounter += movementX;

      document.documentElement.attributes["style"].value =
        "--slider-movement: " + String(moveCounter) + "px";
    }
  }

  /***** reason code below didnt work is because we are updating movementX before we passed that variable into movingLeft and movingRight func
   * when movementCounter is 434,
   * var addThisToMovementCounter = event.movementX;
   * movementCounter += addThisToMovementCounter;
   * we had code above. so when user move mouse to the right event.movementX will be 1 which we assigned to addThisToMovementCounter
   * then we += 1 to movementCounter which will make 434 + 1. when we passed movementCounter into mouseMovingLeft as moveCounter it was already assigned 435
   * so it will run the else statement
   *  *****/

  function mouseMovingRight(moveCounter, movementX) {
    /***** if moveCounter is 434 and movementX is 1 which means user moved the mouse to the right.
     * we want "--slider-movement" to match movementX when it is between 0 and 434
     * *****/
    //we are still updating moveCounter which is movementCounter in watchMouseMovement
    if (moveCounter === 434) {
      let doNotMoveRightWhenAtEdge = 434;
      document.documentElement.attributes["style"].value =
        "--slider-movement: " + String(doNotMoveRightWhenAtEdge) + "px";
    } else {
      moveCounter += movementX;
      document.documentElement.attributes["style"].value =
        "--slider-movement: " + String(moveCounter) + "px";
    }
  }
  function testingIdeas(layerXOfMouseClick) {
    console.log("layerXOfMouseClick", layerXOfMouseClick);
  }

  // testingPositionOfClickedEle();

  /***** if we didnt declare mouseMovement func in the same func scope as .barWrapper event listener. we would have to declare a function the func will return the value assigned to
   * layerXpositionOfClickedEle, pass a reference to that func
   * to a variable outside the func scope of the func that house .barWrapper event listener the call that func to get use the value assigned to layerXpositionOfClickedEle
   *  *****/
  function testingPositionOfClickedEle() {
    var { sliderIconWrapper } = ourSelectors();
    if (positionOfClickedEvent instanceof Function) {
      console.log(positionOfClickedEvent);
    }
    sliderIconWrapper.addEventListener("mousedown", function (event) {
      console.log(event);
      if (positionOfClickedEvent instanceof Function) {
        console.log(positionOfClickedEvent());
      }
    });
  }
  function testingIdeasTwo() {
    var { sliderIconWrapper } = ourSelectors();
    var moveCounter;
    sliderIconWrapper.addEventListener(
      "mousedown",
      function addEventListener(event) {
        if (event.target == this) {
          moveAlgor(this);
        }
      }
    );

    function moveAlgor(sliderIcon) {
      sliderIcon.addEventListener("mousemove", moveSliderIcon);
    }

    function moveSliderIcon(eventInput) {
      if (!layerXofClickedEle) {
        moveCounter = 0;
      } else {
        moveCounter = layerXofClickedEle;
      }

      console.log(moveCounter);
    }
    // console.log("layerXOfMouseClick", layerXOfMouseClick);
  }
}

function testingMobileOrDesktopIdea() {
  // var res;
  // window.onresize = function () {
  //   if (res) {
  //     clearTimeout(res);
  //   }
  //   res = setTimeout(function () {
  //     console.log("resize triggered");
  //   }, 100);
  // };

  function printStuff() {
    console.log(window.innerWidth);
  }

  var resizeTimer = false;
  window.onresize = function () {
    if (resizeTimer) {
      clearTimeout(resizeTimer);
    }
    resizeTimer = setTimeout(printStuff, 0);
  };
  // window.addEventListener("resize", (event) => {
  //   // use setTimeout to have resie fires ones
  //   console.count();
  //   if (resizeTimer) {
  //     resizeTimer = clearTimeout(resizeTimer);
  //   }
  //   resizeTimer = setTimeout(function () {
  //     console.log(window.innerWidth);
  //   }, 50);
  //   // if (window.innerWidth < 1400) {
  //   //   console.log("here");
  //   // } else {
  //   //   console.log("there");
  //   // }
  // });
}

function notes() {
  alert(
    "keyboard, click and mousemove should use the same movementCounter variable"
  );
  alert("use layerX for both click and mousemove");
  alert(
    "get % of where .sliderIconWrapper is based on layerX. depend on desktop or mobile divide it by 434(desktop). 256(mobile)"
  );
  alert(
    "if we want .sliderIconWrapper to be in similar spot in both desktop and mobile we have to use resize listener on window obj"
  );
  alert(
    "get % layerX / 434 or $ layerX / 256 mobile then use that % multiply it by 434 for desktop or 256 for mobile"
  );
  alert("translateX(calc((.73 * 434) * 1px))");
  alert(
    "have a separate func that will run at mobile or desktop size. in our css our .sliderIconWrapper --slider-movement will be based on the screen size"
  );
  alert(
    "how can we get layerX of .bar or .barWrapper using keyboard: transform: translateX(100px) is similar to layerX: 100"
  );
  alert(
    "make two css properties. using media query to apply the correct variable to .sliderIconWrapper"
  );
  alert(
    "find a way to save the either --desktop slider and --mobile-slider position"
  );
  alert("find a way to ");
}
