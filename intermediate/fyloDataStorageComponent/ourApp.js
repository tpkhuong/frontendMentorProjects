(function scopeOurVariables() {
  console.log("change values in display in html");
  //declare our selectors top of func using destructuring
  var {
    progressBarContainer,
    circleInsideProgressBar,
    dataUsedDisplay,
    desktopDataLeftDisplay,
    progressBarElement,
    desktopGigaLeftDisplay,
    mobileGigaLeftDisplay,
  } = ourSelectors();

  function ourSelectors() {
    //progress-bar-wrapper
    var progressBarContainer = document.querySelector(".progress-bar-wrapper");
    //circle of progress bar
    var circleInsideProgressBar = document.querySelector(".circle");
    //data-used-display
    var dataUsedDisplay = document.getElementById("data-used-display");
    //desktop-data-left-display
    var desktopDataLeftDisplay = document.getElementById(
      "desktop-data-left-display"
    );
    //progress bar. we want the width of this element
    var progressBarElement = document.querySelector(".progress-bar");
    //desktop-gb-left-display
    var desktopGigaLeftDisplay = document.getElementById(
      "desktop-data-left-display"
    );
    //mobile-gb-left-display
    var mobileGigaLeftDisplay = document.getElementById(
      "mobile-data-left-display"
    );
    return {
      progressBarContainer,
      circleInsideProgressBar,
      dataUsedDisplay,
      desktopDataLeftDisplay,
      progressBarElement,
      desktopGigaLeftDisplay,
      mobileGigaLeftDisplay,
    };
  }

  //call our funcs
  addEventToELement();
  addEventListenerToProgressBarOnCircleElementMousedown();
  setPropertyOnProgressBarWrapperAndProgressBarElement();
  mobileAddEventListenerToProgressBarOnCircleElementMousedown();
  //set property on progressBar element
  function setPropertyOnProgressBarWrapperAndProgressBarElement() {
    progressBarContainer.style.setProperty("--progress-bar-value", " 0%");
    circleInsideProgressBar.style.setProperty("--circle-movement", " 0px");
  }

  /* keyboard */

  function addEventToELement() {
    //adding both focusin and focusout to progressbar wrapper but here we called it a container
    //because both focusin and focusout will bubble
    progressBarContainer.addEventListener(
      //when circle element target is focusd we will add keydown event and add "focusout" event to progressbarwrapper
      "focusin",
      listenToTabOnProgressBarContainer
    );
  }

  function listenToTabOnProgressBarContainer(event) {
    if (event.target == circleInsideProgressBar) {
      circleInsideProgressBar.addEventListener(
        "keydown",
        circleElementKeyboardFunctionality
      );
      progressBarContainer.addEventListener(
        //when circle element is focusout we will remove keydown event and remove "focusout" event listener on progressBarContainer
        //both our removeEvent is being checked in removeKeydownEventFromCircleElementAndRemoveFocusoutEventFromProgressBarWrapper func
        "focusout",
        removeKeydownEventFromCircleElementAndRemoveFocusoutEventFromProgressBarWrapper
      );
    }
  }

  function removeKeydownEventFromCircleElementAndRemoveFocusoutEventFromProgressBarWrapper(
    event
  ) {
    if (event.target == circleInsideProgressBar) {
      circleInsideProgressBar.removeEventListener(
        "keydown",
        circleElementKeyboardFunctionality
      );
      progressBarContainer.removeEventListener(
        "focusout",
        removeKeydownEventFromCircleElementAndRemoveFocusoutEventFromProgressBarWrapper
      );
    }
  }

  /* mousedown,mouseup,mousemove */

  function addEventListenerToProgressBarOnCircleElementMousedown() {
    //we want to add event listener when circle element is clicked on using mousedown
    //we want to remove event listener when mouseup is on circle element
    progressBarElement.addEventListener(
      "mousedown",
      listenToMouseEventOnProgressBarWrapperElement
    );
    progressBarElement.addEventListener(
      "mouseup",
      removeEventFromProgressBarAndCircleElementMouseUp
    );
  }

  function listenToMouseEventOnProgressBarWrapperElement(event) {
    if (event.target == circleInsideProgressBar) {
      circleInsideProgressBar.addEventListener(
        "mousemove",
        circleElementMousemovement
      );
      progressBarContainer.addEventListener(
        "mousemove",
        circleElementRemoveEventListener
      );
    }
  }

  function removeEventFromProgressBarAndCircleElementMouseUp(event) {
    if (event.target == circleInsideProgressBar) {
      circleInsideProgressBar.removeEventListener(
        "mousemove",
        circleElementMousemovement
      );
      progressBarContainer.removeEventListener(
        "mousemove",
        circleElementRemoveEventListener
      );
      //   progressBarElement.removeEventListener(
      //     "mousedown",
      //     listenToMouseEventOnProgressBarWrapperElement
      //   );
      //   progressBarElement.removeEventListener(
      //     "mouseup",
      //     removeEventFromProgressBarAndCircleElement
      //   );
    }
  }

  function circleElementRemoveEventListener(event) {
    if (event.target != circleInsideProgressBar) {
      // console.log("here");
      circleInsideProgressBar.removeEventListener(
        "mousemove",
        circleElementMousemovement
      );
      progressBarContainer.removeEventListener(
        "mousemove",
        circleElementRemoveEventListener
      );
    }
  }

  function circleElementMousemovement(event) {
    /***** subtract or add based on movementX. movementX value will be negative or positive *****/
    var valueOfProgressBarCircleMovementFunc = getValueOfProgressBarProperty();
    // console.log(valueOfProgressBarCircleMovementFunc);
    if (event.movementX > 0) {
      //handle if mousemovement is positive number
      if (valueOfProgressBarCircleMovementFunc > 99.7) {
        //   console.log(valueOfProgressBarAddFunc);
        // console.log(valueOfProgressBarCircleMovementFunc);
        updateValueOfProgressBarProperty(100);
        updateValueOfCircleMovementProperty(445);
      } else {
        if (valueOfProgressBarCircleMovementFunc === 0) {
          increaseByOneOrFiveBasedOnKeyPressed(
            valueOfProgressBarCircleMovementFunc,
            30
          );
        } else {
          increaseByOneOrFiveBasedOnKeyPressed(
            valueOfProgressBarCircleMovementFunc,
            3
          );
        }

        /* before refactor into function */

        //   let convertedNumberFromPercentageAddFunc = convertPercentageToNumber(
        //     valueOfProgressBarAddFunc
        //   );
        //   let addOne = convertedNumberFromPercentageAddFunc + 1;
        //   let convertedPercentageFromNumAddFunc = convertNumberToPercentage(addOne);
        //   updateValueOfProgressBarProperty(convertedPercentageFromNumAddFunc);
        //   //circle movement
        //   var useValueInCircleMovementAddFunc = calculateCircleMovementValue();
        //   updateValueOfCircleMovementProperty(useValueInCircleMovementAddFunc);
      }
    } else {
      //handle if mousemovement is negative number
      if (valueOfProgressBarCircleMovementFunc === 0) {
        updateValueOfProgressBarProperty(0);
        updateValueOfCircleMovementProperty(0);
      } else {
        decreaseByOneOrFiveBasedOnKeyPressed(
          valueOfProgressBarCircleMovementFunc,
          3
        );
      }
    }
    /* reason we can't remove mousemove event from circleInsideProgressbar when the event.target is not circleElement 
    using the mousemove on circleElement is the circleElement can't know if the mousemove event.target is not itself
    we could have mousemove on its parent then remove event on circleElement when the mousemove target is not the circle element
    */
    // if (event.target != circleInsideProgressBar) {
    //   circleInsideProgressBar.removeEventListener(
    //     "mousemove",
    //     circleElementMousemove
    //   );
    // }
    var valueWeWillUseInDisplayGigaLeftDisplayDesktopMousemovementFunc =
      changeDisplayDataCapacityUsed(valueOfProgressBarCircleMovementFunc);

    desktopChangeDisplayOfDataCapacityLeft(
      valueWeWillUseInDisplayGigaLeftDisplayDesktopMousemovementFunc
    );
  }

  /* touchstart, touchend, touchmove*/

  function mobileAddEventListenerToProgressBarOnCircleElementMousedown() {
    //we want to add event listener when circle element is clicked on using mousedown
    //we want to remove event listener when mouseup is on circle element
    progressBarElement.addEventListener(
      "touchstart",
      listenToTouchEventOnProgressBarWrapperElement
    );
    progressBarElement.addEventListener(
      "touchend",
      removeEventFromProgressBarAndCircleElementTouchend
    );
  }

  function listenToTouchEventOnProgressBarWrapperElement(event) {
    if (event.target == circleInsideProgressBar) {
      circleInsideProgressBar.addEventListener(
        "touchmove",
        circleELementTouchMovement
      );
      progressBarContainer.addEventListener(
        "touchmove",
        circleElementTouchMovementAndRemoveEventListener
      );
    }
  }

  function removeEventFromProgressBarAndCircleElementTouchend(event) {
    if (event.target == circleInsideProgressBar) {
      circleInsideProgressBar.removeEventListener(
        "touchmove",
        circleELementTouchMovement
      );
      progressBarContainer.removeEventListener(
        "touchmove",
        circleElementTouchMovementAndRemoveEventListener
      );
      //   progressBarElement.removeEventListener(
      //     "mousedown",
      //     listenToMouseEventOnProgressBarWrapperElement
      //   );
      //   progressBarElement.removeEventListener(
      //     "mouseup",
      //     removeEventFromProgressBarAndCircleElement
      //   );
    }
  }

  function circleElementTouchMovementAndRemoveEventListener(event) {
    if (event.target != circleInsideProgressBar) {
      // console.log("here");
      circleInsideProgressBar.removeEventListener(
        "touchmove",
        circleELementTouchMovement
      );
      progressBarContainer.removeEventListener(
        "touchmove",
        circleElementTouchMovementAndRemoveEventListener
      );
    }
  }

  let previousTouch;
  function circleELementTouchMovement(event) {
    /***** subtract or add based on mobileMovementX. mobileMovementX value will be negative or positive *****/
    var valueOfProgressBarCircleMovementMobile =
      getValueOfProgressBarProperty();

    var touch = event.changedTouches[0];

    if (previousTouch) {
      //first time we run this func, we will not enter this if statement
      //second time we run this func, we will enter this if statement
      //since we are in this if statement, touch will be the current value of eventInput.changedTouches[0] from the execution of this func
      //previousTouch.pageX will be the previous value of eventInput.changedTouches[0]. the previous execution of this func
      let mobileMovementX = touch.pageX - previousTouch.pageX;
      //   console.log("inside if statement", mobileMovementX);
      if (mobileMovementX > 0) {
        //working with positive number of mobileMovementX
        if (valueOfProgressBarCircleMovementMobile > 99.7) {
          //   if the container of our progress bar change in size, we have to adjust the value we passed into updateValueOfCircleMovementProperty
          updateValueOfProgressBarProperty(100);
          updateValueOfCircleMovementProperty(229);
        } else {
          if (valueOfProgressBarCircleMovementMobile === 0) {
            increaseByOneOrFiveBasedOnKeyPressed(
              valueOfProgressBarCircleMovementMobile,
              50
            );
          } else {
            increaseByOneOrFiveBasedOnKeyPressed(
              valueOfProgressBarCircleMovementMobile,
              5
            );
          }
        }
      } else {
        //working with negative number of mobileMovementX
        if (valueOfProgressBarCircleMovementMobile === 0) {
          updateValueOfProgressBarProperty(0);
          updateValueOfCircleMovementProperty(0);
        } else {
          decreaseByOneOrFiveBasedOnKeyPressed(
            valueOfProgressBarCircleMovementMobile,
            5
          );
        }
      }
    }
    previousTouch = touch;
    var valueWeWillUseInDisplayGigaLeftDisplayMobileTouchmovementFunc =
      changeDisplayDataCapacityUsed(valueOfProgressBarCircleMovementMobile);

    mobileChangeDisplayOfDataCapacityLeft(
      valueWeWillUseInDisplayGigaLeftDisplayMobileTouchmovementFunc
    );
  }

  /* keyboard */
  function circleElementKeyboardFunctionality(event) {
    switch (event.key) {
      case "ArrowLeft":
        //-1
        subtractPercentFromProgressBarAndCircleMovement();
        break;
      case "ArrowDown":
        //-1
        subtractPercentFromProgressBarAndCircleMovement();
        break;
      case "ArrowRight":
        //+1
        addPercentToProgressBarAndCircleMovement(445);
        break;
      case "ArrowUp":
        //+1
        addPercentToProgressBarAndCircleMovement(445);
        break;
      case "PageUp":
        //+5
        addLargerAmtToProgressBar();
        break;
      case "PageDown":
        //-5
        subtractLargerAmtFromProgressBar();
        break;
      case "Home":
        // set to 0%
        updateValueOfProgressBarProperty(0);
        updateValueOfCircleMovementProperty(0);
        changeDisplayDataCapacityUsed(0);
        desktopChangeDisplayOfDataCapacityLeft(0);
        break;
      case "End":
        //set to 100%
        updateValueOfProgressBarProperty(100);
        updateValueOfCircleMovementProperty(445);
        changeDisplayDataCapacityUsed(100);
        desktopChangeDisplayOfDataCapacityLeft(1000);
        break;
    }
  }

  function getValueOfProgressBarProperty() {
    var getNumOfProgresBarUsingSplit = Number(
      progressBarContainer.attributes["style"].value.split(" ")[1].split("%")[0]
    );
    //   progressBarContainer.attributes["style"].value.match(/\d/gi).join("");
    // console.log(getNumOfProgresBarUsingRegexThenConcatUsingJoin);
    return getNumOfProgresBarUsingSplit;
  }

  function updateValueOfProgressBarProperty(valueInput) {
    progressBarContainer.attributes[
      "style"
    ].value = `--progress-bar-value: ${valueInput}%`;
  }

  function updateValueOfCircleMovementProperty(value) {
    circleInsideProgressBar.attributes[
      "style"
    ].value = `--circle-movement: ${value}px`;
  }

  function subtractPercentFromProgressBarAndCircleMovement() {
    //-1
    var valueOfProgressBarSubtractFunc = getValueOfProgressBarProperty();

    if (valueOfProgressBarSubtractFunc === 0) {
      updateValueOfProgressBarProperty(0);
      updateValueOfCircleMovementProperty(0);
    } else {
      decreaseByOneOrFiveBasedOnKeyPressed(valueOfProgressBarSubtractFunc, 1);
      /* before refactor into function */
      //   let convertedNumberFromPercentageSubtractFunc = convertPercentageToNumber(
      //     valueOfProgressBarSubtractFunc
      //   );
      //   let subtractOne = convertedNumberFromPercentageSubtractFunc - 1;
      //   let convertedPercentageFromNumSubtractFunc =
      //     convertNumberToPercentage(subtractOne);
      //   updateValueOfProgressBarProperty(convertedPercentageFromNumSubtractFunc);
      //   //circle movement
      //   var useValueInCircleMovementSubtractFunc = calculateCircleMovementValue();
      //   updateValueOfCircleMovementProperty(useValueInCircleMovementSubtractFunc);
    }
    var valueWeWillUseInDisplayGigaLeftDisplaySubtractPercentFunc =
      changeDisplayDataCapacityUsed(valueOfProgressBarSubtractFunc);

    desktopChangeDisplayOfDataCapacityLeft(
      valueWeWillUseInDisplayGigaLeftDisplaySubtractPercentFunc
    );
  }

  // refactor this code to work with mobile and desktop
  function addPercentToProgressBarAndCircleMovement(maxScreenWidth) {
    //+1
    var valueOfProgressBarAddFunc = getValueOfProgressBarProperty();
    if (valueOfProgressBarAddFunc === 100) {
      //   console.log(valueOfProgressBarAddFunc);
      updateValueOfProgressBarProperty(100);
      updateValueOfCircleMovementProperty(maxScreenWidth);
    } else {
      increaseByOneOrFiveBasedOnKeyPressed(valueOfProgressBarAddFunc, 1);
      /* before refactor into function */

      //   let convertedNumberFromPercentageAddFunc = convertPercentageToNumber(
      //     valueOfProgressBarAddFunc
      //   );
      //   let addOne = convertedNumberFromPercentageAddFunc + 1;
      //   let convertedPercentageFromNumAddFunc = convertNumberToPercentage(addOne);
      //   updateValueOfProgressBarProperty(convertedPercentageFromNumAddFunc);
      //   //circle movement
      //   var useValueInCircleMovementAddFunc = calculateCircleMovementValue();
      //   updateValueOfCircleMovementProperty(useValueInCircleMovementAddFunc);
    }
    var valueWeWillUseInDisplayGigaLeftDisplayAddPercentFunc =
      changeDisplayDataCapacityUsed(valueOfProgressBarAddFunc);
    desktopChangeDisplayOfDataCapacityLeft(
      valueWeWillUseInDisplayGigaLeftDisplayAddPercentFunc
    );
  }

  function addLargerAmtToProgressBar() {
    //+5
    var valueOfProgressBarAddLargerAmtFunc = getValueOfProgressBarProperty();
    if (valueOfProgressBarAddLargerAmtFunc > 99.5) {
      updateValueOfProgressBarProperty(100);
      updateValueOfCircleMovementProperty(445);
    } else {
      increaseByOneOrFiveBasedOnKeyPressed(
        valueOfProgressBarAddLargerAmtFunc,
        5
      );
    }
    // updateValueOfProgressBarProperty();
    var valueWeWillUseInDisplayGigaLeftDisplayAddLargerFunc =
      changeDisplayDataCapacityUsed(valueOfProgressBarAddLargerAmtFunc);
    desktopChangeDisplayOfDataCapacityLeft(
      valueWeWillUseInDisplayGigaLeftDisplayAddLargerFunc
    );
  }

  function subtractLargerAmtFromProgressBar() {
    //-5
    var valueOfProgressBarSubtractLargerAmtFunc =
      getValueOfProgressBarProperty();

    if (valueOfProgressBarSubtractLargerAmtFunc < 0.5) {
      updateValueOfProgressBarProperty(0);
      updateValueOfCircleMovementProperty(0);
    } else {
      decreaseByOneOrFiveBasedOnKeyPressed(
        valueOfProgressBarSubtractLargerAmtFunc,
        5
      );
    }
    var valueWeWillUseInDisplayGigaLeftDisplaySubtractLargerFunc =
      changeDisplayDataCapacityUsed(valueOfProgressBarSubtractLargerAmtFunc);
    desktopChangeDisplayOfDataCapacityLeft(
      valueWeWillUseInDisplayGigaLeftDisplaySubtractLargerFunc
    );
  }

  function decreaseByOneOrFiveBasedOnKeyPressed(
    valueOfProgressBar,
    valueBasedOnKey
  ) {
    let convertedNumberFromPercentage =
      convertPercentageToNumber(valueOfProgressBar);
    let subtractValueOfKeyPressed =
      convertedNumberFromPercentage - valueBasedOnKey;
    let convertedPercentageFromNum = convertNumberToPercentage(
      subtractValueOfKeyPressed
    );
    updateValueOfProgressBarProperty(convertedPercentageFromNum);
    //circle movement
    var useValueInCircleMovement = calculateCircleMovementValue();
    updateValueOfCircleMovementProperty(useValueInCircleMovement);
  }

  function increaseByOneOrFiveBasedOnKeyPressed(
    valueOfProgressBar,
    valueBasedOnKey
  ) {
    let convertedNumberFromPercentage =
      convertPercentageToNumber(valueOfProgressBar);
    let addValueOfKeyPressed = convertedNumberFromPercentage + valueBasedOnKey;
    let convertedPercentageFromNum =
      convertNumberToPercentage(addValueOfKeyPressed);

    updateValueOfProgressBarProperty(convertedPercentageFromNum);
    //circle movement
    var useValueInCircleMovement = calculateCircleMovementValue();
    updateValueOfCircleMovementProperty(useValueInCircleMovement);
  }

  function convertPercentageToNumber(value) {
    var divideByOneHundred = value / 100;
    var multiplyByOneThousand = divideByOneHundred * 1000;
    return multiplyByOneThousand;
  }

  function convertNumberToPercentage(value) {
    var divideByOneThousand = value / 1000;
    var multiplyByOneHundred = divideByOneThousand * 100;
    return Number(multiplyByOneHundred.toFixed(1));
  }

  function calculateCircleMovementValue() {
    //   getting dimensions of our progressbar wrapper. color bg not the dark bg progress bar
    var dimensionsAndLocationOfProgressbar =
      progressBarElement.getBoundingClientRect();
    var widthOfProgressBar = Number(
      dimensionsAndLocationOfProgressbar.width.toFixed(2)
    );
    //get width of progress bar substract 12 from that value
    //then use that value for --circle-movement property of circle element
    if (widthOfProgressBar <= 12) {
      return 0;
    } else {
      var valueToUseForCircleMovementProperty = widthOfProgressBar - 12;
      return valueToUseForCircleMovementProperty;
    }
  }

  function changeDisplayDataCapacityUsed(valueOfPercentage) {
    //take percentage and convert to number based off 1000
    var usedValueFromFuncToChangeDataCapacityDisplay =
      convertPercentageToNumber(valueOfPercentage).toFixed();

    dataUsedDisplay.innerText = `${usedValueFromFuncToChangeDataCapacityDisplay}`;
    return usedValueFromFuncToChangeDataCapacityDisplay;
  }

  function desktopChangeDisplayOfDataCapacityLeft(gigabyteUsedValue) {
    //substract value of GB used from 1000
    var valueToUseForGigaByteLeftDesktopDisplay =
      1000 - Number(gigabyteUsedValue);
    desktopGigaLeftDisplay.innerText = String(
      valueToUseForGigaByteLeftDesktopDisplay
    );
  }
  function mobileChangeDisplayOfDataCapacityLeft(gigabyteUsedValue) {
    var valueToUseForGigaByteLeftMobileDisplay =
      1000 - Number(gigabyteUsedValue);
    mobileGigaLeftDisplay.innerText = String(
      valueToUseForGigaByteLeftMobileDisplay
    );
  }

  function executeFuncBasedOnScreenSize() {}

  function executeMobileTouchFeature() {}

  progressBarContainer.addEventListener("click", (event) => {
    console.log(event);
  });
  function activateDesktopMousemovementAndKeyboardPressedFeature() {}
  // function learningNotes() {
  //   function Foo(name) {
  //     this.name = name;
  //   }

  //   Foo.prototype.myName = function () {
  //     //keyword this is Bar because of
  //     //   var a = new Bar("a", "obj a");

  //     return this.name;
  //   };

  //   function Bar(name, label) {
  //     Foo.call(this, name);
  //     this.label = label;
  //   }

  //   // here, we make a new `Bar.prototype`
  //   // linked to `Foo.prototype`
  //   Bar.prototype = Object.create(Foo.prototype);

  //   // Beware! Now `Bar.prototype.constructor` is gone,
  //   // and might need to be manually "fixed" if you're
  //   // in the habit of relying on such properties!

  //   Bar.prototype.myLabel = function () {
  //     //keyword this is Bar because of
  //     //   var a = new Bar("a", "obj a");
  //     return this.label;
  //   };
  //   //keyword new takes precedence over object literal
  //   var a = new Bar("a", "obj a");

  //   //   a.myName(); // "a"
  //   //   a.myLabel(); // "obj a"
  // }
})();
