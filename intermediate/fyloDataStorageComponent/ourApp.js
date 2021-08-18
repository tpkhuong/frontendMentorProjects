(function scopeOurVariables() {
  //declare our selectors top of func using destructuring
  var {
    progressBarContainer,
    circleInsideProgressBar,
    dataUsedDisplay,
    desktopDataLeftDisplay,
    progressBarElement,
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
    return {
      progressBarContainer,
      circleInsideProgressBar,
      dataUsedDisplay,
      desktopDataLeftDisplay,
      progressBarElement,
    };
  }

  //call our funcs
  addEventToELement();
  setPropertyOnProgressBarWrapperAndProgressBarElement();
  //set property on progressBar element
  function setPropertyOnProgressBarWrapperAndProgressBarElement() {
    progressBarContainer.style.setProperty("--progress-bar-value", " 0%");
    circleInsideProgressBar.style.setProperty("--circle-movement", " 0px");
  }

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

  function circleElementKeyboardFunctionality(event) {
    switch (event.key) {
      case "ArrowLeft":
        //-1
        subtractPercentFromProgressBarAndCircleMovement();
        // var useValueInCircleMovementLeftKey = calculateCircleMovementValue();
        // updateValueOfCircleMovementProperty(useValueInCircleMovementLeftKey);
        break;
      case "ArrowDown":
        //-1
        subtractPercentFromProgressBarAndCircleMovement();
        // var useValueInCircleMovementDownKey = calculateCircleMovementValue();
        // updateValueOfCircleMovementProperty(useValueInCircleMovementDownKey);
        break;
      case "ArrowRight":
        //+1
        addPercentToProgressBarAndCircleMovement();
        // var useValueInCircleMovementRightKey = calculateCircleMovementValue();
        // updateValueOfCircleMovementProperty(useValueInCircleMovementRightKey);
        break;
      case "ArrowUp":
        //+1
        addPercentToProgressBarAndCircleMovement();
        // var useValueInCircleMovementUpKey = calculateCircleMovementValue();
        // updateValueOfCircleMovementProperty(useValueInCircleMovementUpKey);
        break;
      case "PageUp":
        //+5
        addLargerAmtToProgressBar();
        // var useValueInCircleMovementPageUpKey = calculateCircleMovementValue();
        // updateValueOfCircleMovementProperty(useValueInCircleMovementPageUpKey);
        break;
      case "PageDown":
        //-5
        subtractLargerAmtFromProgressBar();
        // var useValueInCircleMovementPageDownKey =
        //   calculateCircleMovementValue();
        // updateValueOfCircleMovementProperty(
        //   useValueInCircleMovementPageDownKey
        // );
        break;
      case "Home":
        // set to 0%
        updateValueOfProgressBarProperty(0);
        break;
      case "End":
        //set to 100%
        updateValueOfProgressBarProperty(100);

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
      let convertedNumberFromPercentageSubtractFunc = convertPercentageToNumber(
        valueOfProgressBarSubtractFunc
      );
      let subtractOne = convertedNumberFromPercentageSubtractFunc - 1;
      let convertedPercentageFromNumSubtractFunc =
        convertNumberToPercentage(subtractOne);
      updateValueOfProgressBarProperty(convertedPercentageFromNumSubtractFunc);
      //circle movement
      var useValueInCircleMovementSubtractFunc = calculateCircleMovementValue();
      updateValueOfCircleMovementProperty(useValueInCircleMovementSubtractFunc);
    }
  }

  function addPercentToProgressBarAndCircleMovement() {
    //+1
    var valueOfProgressBarAddFunc = getValueOfProgressBarProperty();
    if (valueOfProgressBarAddFunc === 100) {
      console.log(valueOfProgressBarAddFunc);
      updateValueOfProgressBarProperty(100);
      updateValueOfCircleMovementProperty(445);
    } else {
      let convertedNumberFromPercentageAddFunc = convertPercentageToNumber(
        valueOfProgressBarAddFunc
      );
      let addOne = convertedNumberFromPercentageAddFunc + 1;
      let convertedPercentageFromNumAddFunc = convertNumberToPercentage(addOne);
      updateValueOfProgressBarProperty(convertedPercentageFromNumAddFunc);
      //circle movement
      var useValueInCircleMovementAddFunc = calculateCircleMovementValue();
      updateValueOfCircleMovementProperty(useValueInCircleMovementAddFunc);
    }
  }

  function addLargerAmtToProgressBar() {
    //+5
    var valueOfProgressBarAddLargerAmtFunc = getValueOfProgressBarProperty();

    // updateValueOfProgressBarProperty();
  }

  function subtractLargerAmtFromProgressBar() {
    //-5
    var valueOfProgressBarSubtractLargerAmtFunc =
      getValueOfProgressBarProperty();

    // updateValueOfProgressBarProperty();
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

  function changeDisplayDataCapacityUsed() {}

  function changeDisplayOfDataCapacityLeft() {}
})();
