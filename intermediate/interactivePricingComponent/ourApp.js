function ourSelectors() {
  //span of our pageview text.
  var pageViewText = document.querySelector("#number-pageviews");
  //article with class of pricing. container element for pageviews,slider,priceview,toggle
  var pricingContainer = document.querySelector(".pricing");
  // toggle button
  var toggleBtn = document.querySelector(".toggle-button");
  //price view container
  var priceViewText = document.querySelector(".price");
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
    pageViewText,
    toggleBtn,
    priceViewText,
    pricingContainer,
    spanTextEleMonthOrYear,
    sliderContainer,
    sliderIconWrapper,
    barTealElement,
    barWrapperElement,
  };
}

// let callFuncToGetWindowWidth;
// let windowWidthOnLoad;
/***** call/invoke our functions *****/
// getWindowWidthOnLoad();
desktopMouseClickAndMouseMovementAlgor();
clickEventAddToToggleContainer();
setCssPropertyToDocument();
setSliderAriaAttrOnLoadEitherMobileOrDesktop();
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

// testingOurIdeaMobileAndDesktop();

function testingOurIdeaMobileAndDesktop() {
  alert(
    "make algorithm work on mobile for mousemove. make keyboard feature only work on desktop"
  );
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
      // });resize
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

/***** set slider aria attr on load for mobile and desktop *****/
/*
set aria-valuemin aria-valuemax aria-valuenow using js. the value will be different between mobile and desktop 
mobile: aria-valuemin="0" aria-valuemax="255" aria-valuenow="0"
desktop: aria-valuemin="0" aria-valuemax="434" aria-valuenow="0"
*/
function setSliderAriaAttrOnLoadEitherMobileOrDesktop() {
  var { sliderIconWrapper } = ourSelectors();
  if (window.innerWidth <= 415) {
    //aria-valuemax will be 255
    sliderIconWrapper.setAttribute("aria-valuemax", "255");
  } else {
    //aria-valuemax will be 434
    sliderIconWrapper.setAttribute("aria-valuemax", "434");
  }
}

/***** set slider aria attr on load for mobile and desktop *****/

/***** declare --slider-movement CSS property to html element: we are now running  *****/
function setCssPropertyToDocument() {
  // document.documentElement.attributes["style"].value.split(" ")[1];
  // parseInt($0.attributes["style"].value.split(" ")[1])
  //code above we can use to get --desktop-slider-movement or --mobile-slider-movement value
  if (window.innerWidth <= 415) {
    //for our slider movement
    document.documentElement.style.setProperty(
      "--mobile-slider-movement",
      " 0px"
    );
    //for our progress bar
    document.documentElement.style.setProperty("--mobile-progressbar", " 0%");
  } else {
    //for our slider movement
    document.documentElement.style.setProperty(
      "--desktop-slider-movement",
      " 0px"
      // String(totalAmtPercentage) + "%"
    );
    //for our progress bar
    document.documentElement.style.setProperty("--desktop-progressbar", " 0%");
    // callThisKeyBoardAtDesktopSize();
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
  var valueOfToggleElementAriaChecked;
  var { barTealElement, barWrapperElement, sliderIconWrapper, toggleBtn } =
    ourSelectors();
  //layerXofClickedEle will be layerX of bar or barWrapper
  //we are assigning layerXofClickedEle/mobileLayerX in our barWrapperElement eventListener
  var layerXofClickedEle;
  var mobileLayerX;
  var ariaPercentForProgressbar;
  console.log("layerXofClickedEle", layerXofClickedEle);
  /***** when user click on .bar or .barWrapper we will get the layerX assign it to layerXofClickedEle variable
   * if user clicked between 0 and 40 layerX will be 0. if user clicked between 435 and 472 layerX will be 434.
   * we will use layerXofClickedELe in our mouseMovement func
   * *****/
  barWrapperElement.addEventListener(
    "click",
    function sliderMovementClickFeatureBarElement(event) {
      valueOfToggleElementAriaChecked =
        toggleBtn.attributes["aria-checked"].value;
      // console.log(callFuncToGetWindowWidth());
      // clearInterval(getWidthOfWindowEverySec);
      // // var { barTealElement, barWrapperElement } = ourSelectors();
      // if (callFuncToGetWindowWidth instanceof Function) {
      //   var printWindowWidth = callFuncToGetWindowWidth();
      //   console.log(printWindowWidth);
      // }
      // console.log("sliderMovement", event.layerX);
      // console.log(event);
      // if (window.innerWidth <= 415) {
      //   console.log("mobile this display", window.innerWidth);
      // } else {
      //   console.log("desktop this display", window.innerWidth);
      // }
      //work with layerX
      //check if event.target is .bar or .bar-wrapper
      /***** mobile *****/
      if (window.innerWidth <= 415) {
        /***** mobile *****/
        if (event.target == barTealElement) {
          let mobileBarLayerX = event.layerX;
          if (mobileBarLayerX >= 0 && mobileBarLayerX <= 40) {
            mobileBarLayerX = 0;
            document.documentElement.attributes["style"].value =
              "--mobile-slider-movement: " +
              String(mobileBarLayerX) +
              "px" +
              "; " +
              //progressbar
              "--mobile-progressbar: " +
              "0%";
          } else {
            //since strFormMobileBarLayerX is a string we can pass it into document.documentElement.attribute["style"] without converting it to string
            let strFormMobileBarLayerX = (
              (mobileBarLayerX / 255) *
              100
            ).toFixed(2);

            //assign slider-movement and progressbar to html
            document.documentElement.attributes["style"].value =
              "--mobile-slider-movement: " +
              String(mobileBarLayerX) +
              "px" +
              "; " +
              //progressbar
              "--mobile-progressbar: " +
              strFormMobileBarLayerX +
              "%";
          }
          mobileLayerX = mobileBarLayerX;
        } else if (event.target == barWrapperElement) {
          let mobileBarWrapperLayerX = event.layerX;
          if (mobileBarWrapperLayerX >= 253 && mobileBarWrapperLayerX <= 294) {
            mobileBarWrapperLayerX = 255;
            document.documentElement.attributes["style"].value =
              "--mobile-slider-movement: " +
              String(mobileBarWrapperLayerX) +
              "px" +
              "; " +
              //progressbar
              "--mobile-progressbar: " +
              "100%";
          } else {
            // console.log(event.layerX);
            //since percentStrFormMobileBarWrapperLayerX is a string we can pass it into document.documentElement.attribute["style"] without converting it to string
            let percentStrFormMobileBarWrapperLayerX = (
              (mobileBarWrapperLayerX / 255) *
              100
            ).toFixed(2);
            //assign slider-movement and progressbar to html

            document.documentElement.attributes["style"].value =
              "--mobile-slider-movement: " +
              String(mobileBarWrapperLayerX) +
              "px" +
              "; " +
              //progressbar
              "--mobile-progressbar: " +
              percentStrFormMobileBarWrapperLayerX +
              "%";
          }
          mobileLayerX = mobileBarWrapperLayerX;
        }
        //set sliderIcon aria attr for mobile
      } else {
        /***** desktop *****/
        /* we dont need to add or substract we want .sliderIconWrapper to move to the layerX based on where the user click at bar or bar-wrapper */
        if (event.target == barTealElement) {
          //if user clicked on bar and layerX is between 0 and 40 we will set --slider-movement to be 0 by setting barlayerX to be 0
          let barLayerX = event.layerX;
          if (barLayerX >= 0 && barLayerX <= 40) {
            barLayerX = 0;
            document.documentElement.attributes["style"].value =
              "--desktop-slider-movement:" +
              " " +
              String(barLayerX) +
              "px" +
              "; " +
              //progressbar
              "--desktop-progressbar: " +
              "0%";
          } else {
            //since percentOfbarLayerXStrForm is a string we can pass it into document.documentElement.attribute["style"] without convert it to string
            let percentOfbarLayerXStrForm = ((barLayerX / 434) * 100).toFixed(
              2
            );
            //assign slider-movement and progressbar to html

            document.documentElement.attributes["style"].value =
              "--desktop-slider-movement:" +
              " " +
              String(barLayerX) +
              "px" +
              "; " +
              "--desktop-progressbar: " +
              percentOfbarLayerXStrForm +
              "%";
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
              "px" +
              "; " +
              //progressbar
              "--desktop-progressbar: " +
              "100%";
          } else {
            //set --slider-movement will be set to event.target.layerX
            //since strFormPercentOfBarWrapperLayerX is a string we can pass it into document.documentElement.attribute["style"] without convert it to string
            let strFormPercentOfBarWrapperLayerX = (
              (barWrapperLayerX / 434) *
              100
            ).toFixed(2);
            //assign slider-movement and progressbar to html

            document.documentElement.attributes["style"].value =
              "--desktop-slider-movement:" +
              " " +
              String(barWrapperLayerX) +
              "px" +
              "; " +
              "--desktop-progressbar: " +
              strFormPercentOfBarWrapperLayerX +
              "%";
          }
          layerXofClickedEle = barWrapperLayerX;
          // console.log("barWrapperLayerX", barWrapperLayerX);
        }
        /***** desktop *****/
      }
      //get --progressbar value
      //setting aria-valuenow for sliderIconWrapper our progressbar
      var barOrBarWrapperClickprogressbarValueUsedForAriaAttr =
        document.documentElement.attributes["style"].value.split(" ")[3];

      setAriaAttrsForProgressBar(
        barOrBarWrapperClickprogressbarValueUsedForAriaAttr
      );
      /***** call yearly or monthly func for display based on valueOfToggleElementAriaChecked. the value of valueOfToggleElementAriaChecked is a string "true" or "false"
       * we had if (valueOfToggleElementAriaChecked) => if("true") or if("false") which is truthy because it is a string
       *  *****/
      toggleBetweenYearlyAndMonthyDisplayPriceAndPage(
        valueOfToggleElementAriaChecked
      );
      //set sliderIcon aria attr on bar or barWrapper click
      var clickBarOrBarWrapperAriaValuenowAttrSlider = parseInt(
        document.documentElement.attributes["style"].value.split(" ")[1]
      );
      sliderIconWrapper.attributes["aria-valuenow"].value = String(
        clickBarOrBarWrapperAriaValuenowAttrSlider
      );
      // if (valueOfToggleElementAriaChecked == "true") {
      //   yearlyDisplayOfPriceAndPageviews();
      // } else {
      //   monthlyDisplayOfPriceAndPageviews();
      // }
      // if valueOfToggleElementAriaChecked is false it will be monthly
      // if valueOfToggleElementAriaChecked is true it will be yearly

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
  addAndRemoveMouseAndTouchMovementAlgorithm();
  // callAddAndRemoveMouseMovementAlgorithm = addAndRemoveMouseMovementAlgorithm;
  /***** mouseMovementAlgorithm *****/
  // we don't need to pass in layerXOfClickedEle because our mouseMovementAlgor func is declared in the same scope as
  //the event listener that will assign the layerX to a variable that our mouseMovementAlgor func can use
  function addAndRemoveMouseAndTouchMovementAlgorithm() {
    var { sliderIconWrapper, sliderContainer } = ourSelectors();
    // first time we run addAndRemoveMouseMovementAlgorithm mouseClickOfLayerX will 0
    // when we click on bar or barWrapper mouseClickOfLayerX will be the layerX of bar or barWrapper
    var movementCounter;
    var mobileMovementCounter;
    /***** add event *****/
    // when user click on .sliderIconWrapper we will run mouseMovementAlgorithm
    /***** mouse event *****/
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
    /***** touch event *****/

    sliderIconWrapper.addEventListener(
      "touchstart",
      function addTouchEventToSliderIconWrapper(event) {
        // .preventDefault() called below is so we do fire a mouse event because touch event can fire both touch and mouse event.
        event.preventDefault();
        console.log(event);
        if (!mobileLayerX) {
          mobileMovementCounter = 0;
        } else {
          mobileMovementCounter = mobileLayerX;
        }

        if (event.target == this) {
          console.log(mobileMovementCounter);
          touchMovementAlgorithm(this);
        }
      }
    );
    /***** add event *****/
    /***** remove event *****/
    /***** mouse event *****/

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
    /***** touch event *****/
    sliderIconWrapper.addEventListener("touchend", touchEndRemoveEvent);
    sliderContainer.addEventListener(
      "touchmove",
      removeTouchmoveEventWhenPointerOutsideOfSliderIcon
    );
    /***** remove event *****/
    /***** declare funcs *****/
    /***** mouse event *****/

    function mouseMovementAlgorithm(sliderIconInput) {
      sliderIconInput.addEventListener("mousemove", moveSliderIconWrapper);
    }

    function moveSliderIconWrapper(eventInput) {
      var progressBarMouseMovement;
      valueOfToggleElementAriaChecked =
        toggleBtn.attributes["aria-checked"].value;
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
      //our progressbar should be based off desktop movementCounter
      progressBarMouseMovement = ((movementCounter / 434) * 100).toFixed(2);
      document.documentElement.attributes["style"].value =
        "--desktop-slider-movement: " +
        String(movementCounter) +
        "px" +
        "; " +
        "--desktop-progressbar: " +
        progressBarMouseMovement +
        "%";
      /***** call yearly or monthly func for display based on valueOfToggleElementAriaChecked. the value of valueOfToggleElementAriaChecked is a string "true" or "false"
       * we had if (valueOfToggleElementAriaChecked) => if("true") or if("false") which is truthy because it is a string
       *  *****/
      toggleBetweenYearlyAndMonthyDisplayPriceAndPage(
        valueOfToggleElementAriaChecked
      );

      //get --progressbar value
      var sliderMousemovementAriaValuenowAttrProgressbar =
        document.documentElement.attributes["style"].value.split(" ")[3];
      //setting aria-valuenow for sliderIconWrapper our progressbar
      setAriaAttrsForProgressBar(
        sliderMousemovementAriaValuenowAttrProgressbar
      );
      //set sliderIcon aria attr on mousemovement
      var mousemovementSliderIconAriaValuenowAttrSlider = parseInt(
        document.documentElement.attributes["style"].value.split(" ")[1]
      );

      sliderIconWrapper.attributes["aria-valuenow"].value = String(
        mousemovementSliderIconAriaValuenowAttrSlider
      );
      // if (valueOfToggleElementAriaChecked == "true") {
      //   yearlyDisplayOfPriceAndPageviews();
      // } else {
      //   monthlyDisplayOfPriceAndPageviews();
      // }
      // if valueOfToggleElementAriaChecked is false it will be monthly
      // if valueOfToggleElementAriaChecked is true it will be yearly
      /***** we want to update layerXofClickedEle to be movementCounter because we want to use the new position of layerXofClickedEle
       * for our keyboard feature
       *  *****/
      layerXofClickedEle = movementCounter;
    }

    /***** touch event *****/
    function touchMovementAlgorithm(sliderIcon) {
      sliderIcon.addEventListener("touchmove", touchEventMoveSliderIcon);
    }
    var previousTouch;
    function touchEventMoveSliderIcon(eventInput) {
      var touch = eventInput.changedTouches[0];
      valueOfToggleElementAriaChecked =
        toggleBtn.attributes["aria-checked"].value;
      // eventInput.touches[0].pageX;
      //first time we run this func, previousTouch will be undefined
      //second time we run this func, previousTouch will not be undefined it will be the eventInput.changedTouches[0]
      //from the previous run of this func so we will enter the if statement
      if (previousTouch) {
        //first time we run this func, we will not enter this if statement
        //second time we run this func, we will enter this if statement
        //since we are in this if statement, touch will be the current value of eventInput.changedTouches[0] from the execution of this func
        //previousTouch.pageX will be the previous value of eventInput.changedTouches[0]. the previous execution of this func
        let mobileMovementX = touch.pageX - previousTouch.pageX;
        let progressbarMobileTouchMovement;
        //touch.pageX will be the current value of eventInput.changedTouches[0] and previousTouch.pageX will be the previous value of eventInput.changedTouches[0]
        // console.log("previousTouch inside if statement", previousTouch);
        // console.log("movementX", movementX);
        //since movementX will either be negative number when it is less than 0 or positive number when it is greater than 0
        if (mobileMovementX < 0 && mobileMovementCounter <= 0) {
          mobileMovementCounter = 0;
        } else if (mobileMovementX > 0 && mobileMovementCounter >= 255) {
          mobileMovementCounter = 255;
        } else {
          if (mobileMovementX < 0) {
            mobileMovementCounter -= 1;
          } else {
            mobileMovementCounter += 1;
          }
        }
        //our progressbar should be based off mobile mobileMovementX
        progressbarMobileTouchMovement = (
          (mobileMovementCounter / 255) *
          100
        ).toFixed(2);
        document.documentElement.attributes["style"].value =
          "--mobile-slider-movement: " +
          String(mobileMovementCounter) +
          "px" +
          "; " +
          "--mobile-progressbar: " +
          progressbarMobileTouchMovement +
          "%";
        mobileLayerX = mobileMovementCounter;
        /***** call yearly or monthly func for display based on valueOfToggleElementAriaChecked. the value of valueOfToggleElementAriaChecked is a string "true" or "false"
         * we had if (valueOfToggleElementAriaChecked) => if("true") or if("false") which is truthy because it is a string
         *  *****/
        toggleBetweenYearlyAndMonthyDisplayPriceAndPage(
          valueOfToggleElementAriaChecked
        );

        //get --progressbar value
        var sliderTouchMovementAriaValuenowAttrProgressbar =
          document.documentElement.attributes["style"].value.split(" ")[3];
        //setting aria-valuenow for sliderIconWrapper our progressbar
        setAriaAttrsForProgressBar(
          sliderTouchMovementAriaValuenowAttrProgressbar
        );
        //set sliderIcon aria attr on touchmovement
        var touchmovementSliderIconAriaValuenowAttrSlider = parseInt(
          document.documentElement.attributes["style"].value.split(" ")[1]
        );

        sliderIconWrapper.attributes["aria-valuenow"].value = String(
          touchmovementSliderIconAriaValuenowAttrSlider
        );
        // if (valueOfToggleElementAriaChecked == "true") {
        //   yearlyDisplayOfPriceAndPageviews();
        // } else {
        //   monthlyDisplayOfPriceAndPageviews();
        // }
        // if valueOfToggleElementAriaChecked is false it will be monthly
        // if valueOfToggleElementAriaChecked is true it will be yearly
      }

      // console.log("previousTouch before", previousTouch);
      //first time we run this func, previousTouch the value of eventInput.changedTouches[0]
      previousTouch = touch;

      // console.log("previousTouch after", previousTouch);
    }
    // removeEvent Funcs

    /***** mouse event *****/
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

    /***** touch event *****/
    function touchEndRemoveEvent(eventInput) {
      if (eventInput.target == this) {
        this.removeEventListener("touchmove", touchEventMoveSliderIcon);
      }
    }

    function removeTouchmoveEventWhenPointerOutsideOfSliderIcon(eventInput) {
      if (eventInput.target != sliderIconWrapper) {
        sliderIconWrapper.removeEventListener(
          "touchmove",
          touchEventMoveSliderIcon
        );
      }
    }
    /***** touch event *****/
    /***** declare funcs *****/
  }
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
  // we declared callThisKeyBoardAtDesktopSize outside the scope of this func desktopMouseClickAndMouseMovementAlgor then we assigned the keyboardFeatureSliderMovement func reference to that variable
  //then we call callThisKeyBoardAtDesktopSize inside setCssPropertyToDocument func
  if (window.innerWidth >= 415) {
    keyboardFeatureSliderMovement();
  }
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
    var { sliderIconWrapper } = ourSelectors();
    var keydownMoveCounter;
    var progressbarKeydownMoveCounter;
    valueOfToggleElementAriaChecked =
      toggleBtn.attributes["aria-checked"].value;
    /***** layerXofClickedEle will be updating the position of layerX based on mousemovement  *****/
    /***** we will declare keydownMoveCounter variable in this func. if layerXofClickedEle is undefined it means currently it holds no value,
     * the keydownMoveCounter variable we declare will be 0, if layerXofClickedEle is not != undefined we will assign the value of layerXofClickedEle
     * to keydownMoveCounter then we will either add or substract to keydownMoveCounter based on which arrow key user keydown.
     * then we will assign the value of keydownMoveCounter to layerXofClickedEle so our mousemovement will work with the correct position of .sliderIconWrapper
     * *****/
    console.log(event);
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
    //our progressbar should be based off desktop keydownMoveCounter
    progressbarKeydownMoveCounter = ((keydownMoveCounter / 434) * 100).toFixed(
      2
    );
    //once we update keydownMoveCounter we will assign that value to --desktop-slider-movement
    document.documentElement.attributes["style"].value =
      "--desktop-slider-movement: " +
      String(keydownMoveCounter) +
      "px" +
      "; " +
      "--desktop-progressbar: " +
      progressbarKeydownMoveCounter +
      "%";
    /***** call yearly or monthly func for display based on valueOfToggleElementAriaChecked. the value of valueOfToggleElementAriaChecked is a string "true" or "false"
     * we had if (valueOfToggleElementAriaChecked) => if("true") or if("false") which is truthy because it is a string
     *  *****/
    toggleBetweenYearlyAndMonthyDisplayPriceAndPage(
      valueOfToggleElementAriaChecked
    );

    //get --progressbar value
    var sliderKeyboardMovementAriaValuenowAttrProgressbar =
      document.documentElement.attributes["style"].value.split(" ")[3];
    //setting aria-valuenow for sliderIconWrapper our progressbar
    setAriaAttrsForProgressBar(
      sliderKeyboardMovementAriaValuenowAttrProgressbar
    );
    //set sliderIcon aria attr on touchmovement
    var keyboardAriaValuenowAttrSlider = parseInt(
      document.documentElement.attributes["style"].value.split(" ")[1]
    );

    sliderIconWrapper.attributes["aria-valuenow"].value = String(
      keyboardAriaValuenowAttrSlider
    );
    // if (valueOfToggleElementAriaChecked == "true") {
    //   yearlyDisplayOfPriceAndPageviews();
    // } else {
    //   monthlyDisplayOfPriceAndPageviews();
    // }
    // if valueOfToggleElementAriaChecked is false it will be monthly
    // if valueOfToggleElementAriaChecked is true it will be yearly
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
  resizeCalculationForMobileAndDesktop();
  /***** keyboard feature *****/
  /***** resize feature *****/
  // when our user resizes the window from desktop to mobile, we will get the value of --desktop-slider-movement divide that by 435 to get the %
  //then take the % times it by 255 the max value that we want to use on mobile-slider-movement.
  // when our user resizes the window from mobile to desktop, we will get the value of --mobile-slider-movement divide that by 255 to get the %
  //then take the % times it by 435 the max value that we want to use on desktop-slider-movement.
  let resizeTimer = null;
  function resizeCalculationForMobileAndDesktop() {
    var { sliderIconWrapper } = ourSelectors();
    window.addEventListener("resize", function doStuff() {
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }
      resizeTimer = setTimeout(function () {
        console.log("window has changed");
        if (window.innerWidth <= 415) {
          // debugger;
          /***** set slider aria attr on load for mobile *****/
          sliderIconWrapper.setAttribute("aria-valuemax", "255");

          //getting --desktop-slider-movement
          let desktopSliderMovement = parseInt(
            document.documentElement.attributes["style"].value.split(" ")[1]
          );
          // console.log(
          //   "this is mobile. get desktop-slider without px",
          //   desktopSliderMovement
          // );
          // let calculatedMobileSlider = calculateSliderMovementSetProgressBar(
          //   window.innerWidth,
          //   desktopSliderMovement
          // );
          //we are getting desktop slider so we need to divide by 435
          console.log("desktopSliderMovement", desktopSliderMovement);
          let percentageOfDesktopSlider = desktopSliderMovement / 435;
          //we can use this percentage as a value for our progress bar variable
          //take percentage multiply it by mobile slider max num 255
          //since we are using .toFixed() below we will get the string form of the calculated number then assign that value to mobileSliderResize
          //we can just pass in mobileSliderResize into --mobile-slider-movement
          console.log("percentageOfDesktopSlider", percentageOfDesktopSlider);
          let mobileSliderResize = (percentageOfDesktopSlider * 255).toFixed();
          console.log("convertToMobile", mobileSliderResize);
          //make sure we get the correct % we can take mobileSliderResize * 435 then calculate the progressbar % with that number
          let resizeProgresbarMobile = (
            (Number(mobileSliderResize) / 255) *
            100
          ).toFixed(2);
          document.documentElement.attributes["style"].value =
            "--mobile-slider-movement: " +
            mobileSliderResize +
            "px" +
            "; " +
            "--mobile-progressbar: " +
            resizeProgresbarMobile +
            "%";
          //need to convert mobileSliderResize back to number
          mobileLayerX = Number(mobileSliderResize);
          console.log("mobileLayerX", mobileLayerX);
        } else {
          /***** set slider aria attr on load for desktop *****/
          sliderIconWrapper.setAttribute("aria-valuemax", "434");

          //getting --mobile-slider-movement
          let mobileSliderMovement = parseInt(
            document.documentElement.attributes["style"].value.split(" ")[1]
          );
          // console.log(
          //   "this is desktop. get mobile-slider without px",
          //   mobileSliderMovement
          // );
          // let calculatedDesktopSlider = calculateSliderMovementSetProgressBar(
          //   window.innerWidth,
          //   mobileSliderMovement
          // );
          //we are getting mobile slider so we need to divide by 255
          console.log("mobileSliderMovement", mobileSliderMovement);
          let percentageOfMobileSlider = mobileSliderMovement / 255;
          //we can use this percentage as a value for our progress bar variable
          //take percentage multiply it by desktop slider max num 435
          //since we are using .toFixed() below we will get the string form of the calculated number then assign that value to desktopSliderResize
          //we can just pass in desktopSliderResize into --desktop-slider-movement
          console.log("percentageOfMobileSlider", percentageOfMobileSlider);
          let desktopSliderResize = (percentageOfMobileSlider * 435).toFixed();
          //make sure we get the correct % we can take desktopSliderResize * 435 then calculate the progressbar % with that number
          let progressbarResizeDesktop = (
            (Number(desktopSliderResize) / 435) *
            100
          ).toFixed(2);
          console.log("converToDesktop", desktopSliderResize);
          document.documentElement.attributes["style"].value =
            "--desktop-slider-movement: " +
            desktopSliderResize +
            "px" +
            "; " +
            "--desktop-progressbar: " +
            progressbarResizeDesktop +
            "%";
          //need to convert desktopSliderResize back to number
          layerXofClickedEle = Number(desktopSliderResize);
          console.log("layerXofClickedEle", layerXofClickedEle);
          //execute keyboardFeatureSliderMovement when we resize our window because if we dont call keyboardFeatureSliderMovement in resize
          //when we load our app in mobile then resize to desktop, our keyboardFeatureSliderMovement is not running.
          keyboardFeatureSliderMovement();
        }
      }, 300);
    });
  }

  /***** resize feature *****/
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
      //yearly
      this.attributes["aria-checked"].value = "true";
      yearlyDisplayOfPriceAndPageviews();
    } else {
      //monthly
      this.attributes["aria-checked"].value = "false";
      monthlyDisplayOfPriceAndPageviews();
    }
  } else if (eventInput.target.parentElement == this) {
    // clicking the span/circle element
    let parentElementAriaCheckedAttr =
      eventInput.target.parentElement.attributes["aria-checked"].value;
    /***** changing the text between month and year *****/
    changeTextOfBillingMonthOrYear(parentElementAriaCheckedAttr);
    if (parentElementAriaCheckedAttr == "false") {
      //yearly
      this.attributes["aria-checked"].value = "true";
      yearlyDisplayOfPriceAndPageviews();
    } else {
      //monthly
      this.attributes["aria-checked"].value = "false";
      monthlyDisplayOfPriceAndPageviews();
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

/***** func will change the text between month or year based on toggle aria-checked
 * if true it will be year if it is false it will be month
 * *****/

/***** run our func that controls the slider/pageviews/priceview
 * based on our toggle. if aria-checked is true we want to work with year obj
 * if it is aria-checked false we want to work with month obj
 * *****/

/*
 
 
- 10K pageviews / $8 per => $72
- 50K pageviews / $12 per month => $108
- 100K pageviews / $16 per month => $144
- 500k pageviews / $24 per month => $216
- 1M pageviews / $36 per month => $324
 
 */

function yearlyDisplayOfPriceAndPageviews() {
  var { pageViewText, priceViewText } = ourSelectors();
  priceViewText.classList.add("discount-toggle");

  //we will display pagview and price based on the % of our --progressbar mobile or desktop
  //we will use parseInt(document.documentElement.attributes["style"].value.split(" ")[3]) it will take a string like "62.30%" gives us 62 in number form
  var percentOfProgressbar = parseInt(
    document.documentElement.attributes["style"].value.split(" ")[3]
  );
  switch (true) {
    case percentOfProgressbar >= 0 && percentOfProgressbar <= 20:
      pageViewText.innerText = "10k Pageviews";
      priceViewText.innerText = "$72.00";
      break;
    case percentOfProgressbar >= 21 && percentOfProgressbar <= 40:
      pageViewText.innerText = "50k Pageviews";
      priceViewText.innerText = "$108.00";

      break;
    case percentOfProgressbar >= 41 && percentOfProgressbar <= 60:
      pageViewText.innerText = "100k Pageviews";
      priceViewText.innerText = "$144.00";

      break;
    case percentOfProgressbar >= 61 && percentOfProgressbar <= 80:
      pageViewText.innerText = "500k Pageviews";
      priceViewText.innerText = "$216.00";

      break;
    case percentOfProgressbar >= 81 && percentOfProgressbar <= 100:
      pageViewText.innerText = "1M Pageviews";
      priceViewText.innerText = "$324.00";

      break;
  }
  // console.log(
  //   "yearly price",
  //   "document.attributes",
  //   document.documentElement.attributes["style"].value.split(" ")[3]
  // );
}

function monthlyDisplayOfPriceAndPageviews() {
  var { pageViewText, priceViewText } = ourSelectors();
  priceViewText.classList.remove("discount-toggle");
  //we will display pagview and price based on the % of our --progressbar mobile or desktop
  //we will use parseInt(document.documentElement.attributes["style"].value.split(" ")[3]) it will take a string like "62.30%" gives us 62 in number form

  var percentOfProgressbar = parseInt(
    document.documentElement.attributes["style"].value.split(" ")[3]
  );
  switch (true) {
    case percentOfProgressbar >= 0 && percentOfProgressbar <= 20:
      pageViewText.innerText = "10k Pageviews";
      priceViewText.innerText = "$8.00";
      break;
    case percentOfProgressbar >= 21 && percentOfProgressbar <= 40:
      pageViewText.innerText = "50k Pageviews";
      priceViewText.innerText = "$12.00";

      break;
    case percentOfProgressbar >= 41 && percentOfProgressbar <= 60:
      pageViewText.innerText = "100k Pageviews";
      priceViewText.innerText = "$16.00";

      break;
    case percentOfProgressbar >= 61 && percentOfProgressbar <= 80:
      pageViewText.innerText = "500k Pageviews";
      priceViewText.innerText = "$24.00";

      break;
    case percentOfProgressbar >= 81 && percentOfProgressbar <= 100:
      pageViewText.innerText = "1M Pageviews";
      priceViewText.innerText = "$36.00";

      break;
  }
  // console.log(
  //   "monthly price",
  //   "document.attributes",
  //   document.documentElement.attributes["style"].value.split(" ")[3]
  // );
}

function toggleBetweenYearlyAndMonthyDisplayPriceAndPage(
  valueOfToggleAriaChecked
) {
  valueOfToggleAriaChecked == "true"
    ? yearlyDisplayOfPriceAndPageviews()
    : monthlyDisplayOfPriceAndPageviews();
}

/***** run our func that controls the slider/pageviews/priceview
 * based on our toggle. if aria-checked is true we want to work with year obj
 * if it is aria-checked false we want to work with month obj
 * *****/

/***** change the value of aria attrs for slider and progres bar *****/
/***** progressbar % will be the same at mobile and desktop *****/

function setAriaAttrsForProgressBar(percentInput) {
  var { barWrapperElement } = ourSelectors();
  var ariaValueNowOfBarWrapper = barWrapperElement.attributes["aria-valuenow"];
  //set aria-valuenow to percentInput;
  ariaValueNowOfBarWrapper.value = percentInput;
}

/***** slider aria attrs will be different on mobile and desktop *****/
function mobileSetSliderAttrs(movementCounterInput) {
  var { sliderIconWrapper } = ourSelectors();
}

function desktopSetSliderAttrs(movementCounterInput) {
  var { sliderIconWrapper } = ourSelectors();
  console.log("movementCounterInput", movementCounterInput);
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
        if (window.innerWidth <= 415) {
          console.log("we are heere");
        } else {
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
        }

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
}

/***** mobile functionality *****/

/***** refactored near the top of file. we will declare mouseMovement inside the func that we will add click event to barWrapper
 * so that we can update a variable that our mouseMovement will also use.
 * if we declare mouseMovement outside the func scope of the func that we will add click event to barWrapper then we have to declare a func inside that func scope
 * the func will return the position where our user clicked on bar or barWrapper pass that func reference to a variable outside of the
 * func that has add click event to barWrapper then that variable will have a reference to the func that will return positionX
 * then we will call that func inside of mouseMovement func to get positionX that we will use event mousemove
 * *****/

function testing_Ideas(layerXOfMouseClick = 0) {
  function scopeKeyboardFeature() {
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
    // keyboardFeatureSliderMovementTwo();
    function keyboardFeatureSliderMovementTwo(variablePassedIn) {
      var { pricingContainer } = ourSelectors();
      //document.activeElement will let us know which element has focus but we have to run/call/execute this func
      var focusElement = document.activeElement;
      console.log(focusElement);
      //addeventlistener("focus") does not bubble up or down
      //we can use "focusin" on pricingContainer and add or remove keypress event to .sliderIconWrapper
      pricingContainer.addEventListener(
        "focusin",
        addOrRemoveKeydownSliderIcon
      );
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
  }
  /***** first attempt *****/
  function getSliderMovement(eventInput) {
    console.count();
    if (window.innerWidth <= 415) {
      // debugger;
      let desktopSliderMovement = parseInt(
        document.documentElement.attributes["style"].value.split(" ").pop()
      );
      // console.log(
      //   "this is mobile. get desktop-slider without px",
      //   desktopSliderMovement
      // );
      // let calculatedMobileSlider = calculateSliderMovementSetProgressBar(
      //   window.innerWidth,
      //   desktopSliderMovement
      // );
      //we are getting desktop slider so we need to divide by 435
      console.log("desktopSliderMovement", desktopSliderMovement);
      let percentageOfDesktopSlider = desktopSliderMovement / 435;
      //we can use this percentage as a value for our progress bar variable
      //take percentage multiply it by mobile slider max num 255
      let mobileSliderResize = Math.floor(percentageOfDesktopSlider * 255);
      console.log("convertToMobile", mobileSliderResize);
      document.documentElement.attributes["style"].value =
        "--mobile-slider-movement: " + String(mobileSliderResize) + "px";
      // mobileLayerX = mobileSliderResize;
    } else {
      let mobileSliderMovement = parseInt(
        document.documentElement.attributes["style"].value.split(" ").pop()
      );
      // console.log(
      //   "this is desktop. get mobile-slider without px",
      //   mobileSliderMovement
      // );
      // let calculatedDesktopSlider = calculateSliderMovementSetProgressBar(
      //   window.innerWidth,
      //   mobileSliderMovement
      // );
      //we are getting mobile slider so we need to divide by 255
      console.log("mobileSliderMovement", mobileSliderMovement);
      let percentageOfMobileSlider = mobileSliderMovement / 255;
      //we can use this percentage as a value for our progress bar variable
      //take percentage multiply it by desktop slider max num 435
      let desktopSliderResize = Math.floor(percentageOfMobileSlider * 435);
      console.log("converToDesktop", desktopSliderResize);
      document.documentElement.attributes["style"].value =
        "--desktop-slider-movement: " + String(desktopSliderResize) + "px";
      // layerXofClickedEle = desktopSliderResize;
    }
  }
  /***** first attempt *****/
  // clickingFeatureMobileAndDesktop();
  /***** our data will be selected based on the slider position *****/
  function clickingFeatureMobileAndDesktop() {
    // alert("clicking event will fire on mouse click and touch");
    // alert(
    //   "look into layerX when we implement clicking feature: where clicking on the .bar or .bar-wrapper will move .sliderIconWrapper to that spot."
    // );
    // alert("look at mouseMoveAlgorithm");
  }

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
  class Popular extends React.Component {
    constructor(props) {
      super();
      this.state = {
        repos: null,
      };

      this.updateLanguage = this.updateLanguage.bind(this);
    }
    componentDidMount() {
      this.updateLanguage("javascript");
    }
    updateLanguage(lang) {
      api.fetchPopularRepos(lang).then(
        function (repos) {
          this.setState(function () {
            return {
              repos: repos,
            };
          });
        }.bind(this)
      );
    }
    render() {
      // Stuff
    }
  }
}
