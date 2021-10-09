(function scopeOurVaribles() {
  const {
    sectionAppWrapper,
    sliderCircle,
    themeLabelBtnContainer,
    arrOfRadioButtons,
    keysContainer,
    arrofKeyPadButtons,
    totalDisplay,
    keysPressedDisplay,
  } = ourSelectors();
  // calling our functions

  addEventListenersToElements();
  changeThemeBasedOnSystemThemeChange();
  resetToDefaultOnReload();

  // destructure our array of buttons for each keys
  const [
    sevenKey,
    eightKey,
    nineKey,
    deleteKey,
    fourKey,
    fiveKey,
    sixKey,
    addKey,
    oneKey,
    twoKey,
    threeKey,
    minusKey,
    decimalKey,
    zeroKey,
    divideKey,
    timesKey,
    resetKey,
    equalKey,
  ] = arrofKeyPadButtons;

  function addEventListenersToElements() {
    window.addEventListener("load", addDarkOrLightThemeClassBasedOnSystemTheme);
    themeLabelBtnContainer.addEventListener(
      "change",
      toggleBetweenThemeBasedOnUserInput
    );
    keysContainer.addEventListener("keydown", keyboardKeypadMovement);
    keysContainer.addEventListener("click", identifyButtonPressed);
  }

  // control theme

  function addDarkOrLightThemeClassBasedOnSystemTheme() {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    if (systemTheme.matches) {
      sectionAppWrapper.classList.add("dark-theme");
    } else {
      sectionAppWrapper.classList.add("light-theme");
      sliderCircle.classList.add("light-theme-movement-onLoad");
    }
  }

  // set dark-theme or light-theme on system theme change

  function changeThemeBasedOnSystemThemeChange() {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

    systemTheme.addEventListener("change", function changeTheme(event) {
      if (event.matches) {
        sectionAppWrapper.classList.add("dark-theme");
        sectionAppWrapper.classList.remove("light-theme");
        sliderCircle.classList.remove("light-theme-movement-onLoad");
      } else {
        sectionAppWrapper.classList.remove("dark-theme");
        sectionAppWrapper.classList.add("light-theme");
        sliderCircle.classList.add("light-theme-movement-onLoad");
      }
    });
  }

  // toggle between dark, light, accent on input change

  function toggleBetweenThemeBasedOnUserInput(event) {
    const themeSelected = event.target.attributes["id"].value;
    switch (themeSelected) {
      case "dark-theme":
        console.log("dark-theme");
        darkThemeSelected();
        break;
      case "light-theme":
        console.log("light-theme");
        lightThemeSelected();
        break;
      case "accent-theme":
        console.log("accent-theme");
        accentThemeSelected();
        break;
    }
    console.log(arrOfRadioButtons);
  }

  function darkThemeSelected() {
    //   remove the theme class
    removeThemeClassAppWrapper();
    // add the theme class based on input selected
    addDarkThemeToAppWrapper();
    //   toggle-cirlce will have the default class of "toggle-circle"
    //when dark-theme is selected. we will set toggle-circle class to "toggle-circle"
    //which will move circle back to default position
    setToggleCircleClassToDefaultDarkTheme();
  }
  function lightThemeSelected() {
    //   remove the theme class
    removeThemeClassAppWrapper();
    removeThemeClassToggleCircle();
    // add the theme class based on input selected
    addLightThemeToAppWrapper();
    addLightMovementClassToToggleCircle();
  }
  function accentThemeSelected() {
    //   remove the theme class
    removeThemeClassAppWrapper();
    removeThemeClassToggleCircle();
    // add the theme class based on input selected
    addAccentThemeToAppWrapper();
    addAccentMovementClassToToggleCircle();
  }

  // helper function
  // working with App Wrapper
  function addDarkThemeToAppWrapper() {
    sectionAppWrapper.classList.add("dark-theme");
  }
  function addLightThemeToAppWrapper() {
    sectionAppWrapper.classList.add("light-theme");
  }
  function addAccentThemeToAppWrapper() {
    sectionAppWrapper.classList.add("accent-theme");
  }

  function removeThemeClassAppWrapper() {
    //find out which theme class is set on calculator-app-bg
    const classListThemeOnAppWrapper = sectionAppWrapper.classList[1];
    sectionAppWrapper.classList.remove(`${classListThemeOnAppWrapper}`);
  }

  // working with toggle circle
  function addLightMovementClassToToggleCircle() {
    sliderCircle.classList.add("light-movement");
  }
  function addAccentMovementClassToToggleCircle() {
    sliderCircle.classList.add("accent-movement");
  }

  function setToggleCircleClassToDefaultDarkTheme() {
    sliderCircle.classList.value = "toggle-circle";
  }

  function removeThemeClassToggleCircle() {
    const classListThemeOnSliderElement = sliderCircle.classList[1];
    // if typeof classListThemeOnSliderElement == "string" remove the class
    if (typeof classListThemeOnSliderElement == "string") {
      sliderCircle.classList.remove(`${classListThemeOnSliderElement}`);
    }
    //else its the default class which is dark theme
  }

  // keyboard functionality

  function keyboardKeypadMovement(event) {
    const keyPressed = event.key;
    const eventTarget = event.target;
    switch (keyPressed) {
      case "ArrowLeft":
        arrowLeftKeyDown(eventTarget);
        break;
      case "ArrowRight":
        arrowRightKeyDown(eventTarget);
        break;
      case "ArrowDown":
        arrowDownKeyDown(eventTarget);
        break;
      case "ArrowUp":
        arrowUpKeyDown(eventTarget);
        break;
    }
  }
  //   keyboard functionality helper functions

  function arrowLeftKeyDown(target) {
    // console.log(target);
    // console.log(document.activeElement);
    switch (true) {
      //   sevenKey
      case target == sevenKey && document.activeElement == sevenKey:
        deleteKey.focus();
        break;
      //   eightKey
      case target == eightKey && document.activeElement == eightKey:
        sevenKey.focus();
        break;
      //   nineKey
      case target == nineKey && document.activeElement == nineKey:
        eightKey.focus();
        break;
      //   deleteKey
      case target == deleteKey && document.activeElement == deleteKey:
        nineKey.focus();
        break;
      //   fourKey
      case target == fourKey && document.activeElement == fourKey:
        addKey.focus();
        break;
      //   fiveKey
      case target == fiveKey && document.activeElement == fiveKey:
        fourKey.focus();
        break;
      //   sixKey
      case target == sixKey && document.activeElement == sixKey:
        fiveKey.focus();
        break;
      //   addKey
      case target == addKey && document.activeElement == addKey:
        sixKey.focus();
        break;
      //   oneKey
      case target == oneKey && document.activeElement == oneKey:
        minusKey.focus();
        break;
      //   twoKey
      case target == twoKey && document.activeElement == twoKey:
        oneKey.focus();
        break;
      //   threeKey
      case target == threeKey && document.activeElement == threeKey:
        twoKey.focus();
        break;
      //   minusKey
      case target == minusKey && document.activeElement == minusKey:
        threeKey.focus();
        break;
      //   decimalKey
      case target == decimalKey && document.activeElement == decimalKey:
        timesKey.focus();
        break;
      //   zeroKey
      case target == zeroKey && document.activeElement == zeroKey:
        decimalKey.focus();
        break;
      //   divideKey
      case target == divideKey && document.activeElement == divideKey:
        zeroKey.focus();
        break;
      //   timesKey
      case target == timesKey && document.activeElement == timesKey:
        divideKey.focus();
        break;
      //   resetKey
      case target == resetKey && document.activeElement == resetKey:
        equalKey.focus();
        break;
      //   equalKey
      case target == equalKey && document.activeElement == equalKey:
        resetKey.focus();
        break;
    }
  }
  function arrowRightKeyDown(target) {
    // console.log(target);
    // console.log(document.activeElement);
    switch (true) {
      //   sevenKey
      case target == sevenKey && document.activeElement == sevenKey:
        eightKey.focus();
        break;
      //   eightKey
      case target == eightKey && document.activeElement == eightKey:
        nineKey.focus();
        break;
      //   nineKey
      case target == nineKey && document.activeElement == nineKey:
        deleteKey.focus();
        break;
      //   deleteKey
      case target == deleteKey && document.activeElement == deleteKey:
        sevenKey.focus();
        break;
      //   fourKey
      case target == fourKey && document.activeElement == fourKey:
        fiveKey.focus();
        break;
      //   fiveKey
      case target == fiveKey && document.activeElement == fiveKey:
        sixKey.focus();
        break;
      //   sixKey
      case target == sixKey && document.activeElement == sixKey:
        addKey.focus();
        break;
      //   addKey
      case target == addKey && document.activeElement == addKey:
        fourKey.focus();
        break;
      //   oneKey
      case target == oneKey && document.activeElement == oneKey:
        twoKey.focus();
        break;
      //   twoKey
      case target == twoKey && document.activeElement == twoKey:
        threeKey.focus();
        break;
      //   threeKey
      case target == threeKey && document.activeElement == threeKey:
        minusKey.focus();
        break;
      //   minusKey
      case target == minusKey && document.activeElement == minusKey:
        oneKey.focus();
        break;
      //   decimalKey
      case target == decimalKey && document.activeElement == decimalKey:
        zeroKey.focus();
        break;
      //   zeroKey
      case target == zeroKey && document.activeElement == zeroKey:
        divideKey.focus();
        break;
      //   divideKey
      case target == divideKey && document.activeElement == divideKey:
        timesKey.focus();
        break;
      //   timesKey
      case target == timesKey && document.activeElement == timesKey:
        decimalKey.focus();
        break;
      //   resetKey
      case target == resetKey && document.activeElement == resetKey:
        equalKey.focus();
        break;
      //   equalKey
      case target == equalKey && document.activeElement == equalKey:
        resetKey.focus();
        break;
    }
  }
  function arrowDownKeyDown(target) {
    // console.log(target);
    // console.log(document.activeElement);
    switch (true) {
      //   sevenKey
      case target == sevenKey && document.activeElement == sevenKey:
        fourKey.focus();
        break;
      //   eightKey
      case target == eightKey && document.activeElement == eightKey:
        fiveKey.focus();
        break;
      //   nineKey
      case target == nineKey && document.activeElement == nineKey:
        sixKey.focus();
        break;
      //   deleteKey
      case target == deleteKey && document.activeElement == deleteKey:
        addKey.focus();
        break;
      //   fourKey
      case target == fourKey && document.activeElement == fourKey:
        oneKey.focus();
        break;
      //   fiveKey
      case target == fiveKey && document.activeElement == fiveKey:
        twoKey.focus();
        break;
      //   sixKey
      case target == sixKey && document.activeElement == sixKey:
        threeKey.focus();
        break;
      //   addKey
      case target == addKey && document.activeElement == addKey:
        minusKey.focus();
        break;
      //   oneKey
      case target == oneKey && document.activeElement == oneKey:
        decimalKey.focus();
        break;
      //   twoKey
      case target == twoKey && document.activeElement == twoKey:
        zeroKey.focus();
        break;
      //   threeKey
      case target == threeKey && document.activeElement == threeKey:
        divideKey.focus();
        break;
      //   minusKey
      case target == minusKey && document.activeElement == minusKey:
        timesKey.focus();
        break;
      //   decimalKey
      case target == decimalKey && document.activeElement == decimalKey:
        resetKey.focus();
        break;
      //   zeroKey
      case target == zeroKey && document.activeElement == zeroKey:
        resetKey.focus();
        break;
      //   divideKey
      case target == divideKey && document.activeElement == divideKey:
        resetKey.focus();
        break;
      //   timesKey
      case target == timesKey && document.activeElement == timesKey:
        resetKey.focus();
        break;
      //   resetKey
      case target == resetKey && document.activeElement == resetKey:
        sevenKey.focus();
        break;
      //   equalKey
      case target == equalKey && document.activeElement == equalKey:
        sevenKey.focus();
        break;
    }
  }
  function arrowUpKeyDown(target) {
    // console.log(target);
    // console.log(document.activeElement);
    switch (true) {
      //   sevenKey
      case target == sevenKey && document.activeElement == sevenKey:
        resetKey.focus();
        break;
      //   eightKey
      case target == eightKey && document.activeElement == eightKey:
        resetKey.focus();
        break;
      //   nineKey
      case target == nineKey && document.activeElement == nineKey:
        resetKey.focus();
        break;
      //   deleteKey
      case target == deleteKey && document.activeElement == deleteKey:
        resetKey.focus();
        break;
      //   fourKey
      case target == fourKey && document.activeElement == fourKey:
        sevenKey.focus();
        break;
      //   fiveKey
      case target == fiveKey && document.activeElement == fiveKey:
        eightKey.focus();
        break;
      //   sixKey
      case target == sixKey && document.activeElement == sixKey:
        nineKey.focus();
        break;
      //   addKey
      case target == addKey && document.activeElement == addKey:
        deleteKey.focus();
        break;
      //   oneKey
      case target == oneKey && document.activeElement == oneKey:
        fourKey.focus();
        break;
      //   twoKey
      case target == twoKey && document.activeElement == twoKey:
        fiveKey.focus();
        break;
      //   threeKey
      case target == threeKey && document.activeElement == threeKey:
        sixKey.focus();
        break;
      //   minusKey
      case target == minusKey && document.activeElement == minusKey:
        addKey.focus();
        break;
      //   decimalKey
      case target == decimalKey && document.activeElement == decimalKey:
        oneKey.focus();
        break;
      //   zeroKey
      case target == zeroKey && document.activeElement == zeroKey:
        twoKey.focus();
        break;
      //   divideKey
      case target == divideKey && document.activeElement == divideKey:
        threeKey.focus();
        break;
      //   timesKey
      case target == timesKey && document.activeElement == timesKey:
        minusKey.focus();
        break;
      //   resetKey
      case target == resetKey && document.activeElement == resetKey:
        decimalKey.focus();
        break;
      //   equalKey
      case target == equalKey && document.activeElement == equalKey:
        decimalKey.focus();
        break;
    }
  }

  // calculator functionality

  function identifyButtonPressed(event) {
    // console.log("work with length of 53 for keys press display");
    // console.log(event.target.firstElementChild.textContent);
    console.log(event.target);
    const buttonPressedValue = event.target.firstElementChild.innerText;
    switch (true) {
      case buttonPressedValue == "+" ||
        buttonPressedValue == "-" ||
        buttonPressedValue == "/" ||
        buttonPressedValue == "x":
        operatorButtonPressed(buttonPressedValue);
        break;
      case buttonPressedValue == "RESET":
        console.log("reset button pressed");
        break;
      case buttonPressedValue == "DEL":
        console.log("delete key pressed");
        break;
      case buttonPressedValue == "=":
        console.log("equal key pressed");
        break;
      case buttonPressedValue == ".":
        console.log("equal decimal pressed");
        break;
      default:
        numberKeyPressed(buttonPressedValue);
        console.log("number key pressed", buttonPressedValue);
    }
  }

  // calculation helper functions

  function deleteButtonPressed() {}

  function resetButtonPressed() {
    // set everything back to zero/default
    //set displays to 0
    keysPressedDisplay.innerText = "0";
    totalDisplay.innerText = "0";
  }

  function equalButtonPressed() {}

  function operatorButtonPressed(input) {}

  function numberKeyPressed(buttonPressedInput) {
    const displayValue = utilityStrFunc();
    const arrOfOnlyNumbersWithoutCommas =
      displayValueWithoutCommas(displayValue);
    const lengthOfArrOfOnlyNumValues = arrOfOnlyNumbersWithoutCommas.length;
    //   length of 3 or less
    workingWithDisplayLengthOfLessThanThree(
      lengthOfArrOfOnlyNumValues,
      buttonPressedInput
    );
    //length of 4 to 6
    //length of 7 to 9
    //length of 10 to 12
  }

  function workingWithDisplayLengthOfLessThanThree(lengthInput, keyBtnPressed) {
    if (lengthInput == 1 && keyBtnPressed === "0") {
      //display is 0 and user pressed 0
      strValueForTotalDisplayELement(keyBtnPressed);
    }
    if (lengthInput == 1 && keyBtnPressed !== "0") {
      //display is 0 and user pressed any number button that is not 0
      strValueForTotalDisplayELement(keyBtnPressed);
    }
    if (lengthInput >= 1 && displayValue !== "0") {
      // when js gets here we want to add to the displayValue
      //display is 1 or any value that is not 0 and the user pressed a number key
      convertDisplayValueToArr(displayValue, buttonPressedInput);
    }
  }

  function resetToDefaultOnReload() {
    //set displays to 0
    keysPressedDisplay.innerText = "0";
    totalDisplay.innerText = "0";
  }
  // operation function add,minus,times and divide
  function addFunctionality() {}
  function minusFunctionality() {}
  function multiplyFunctionality() {}
  function divisionFunctionality() {}

  // convert display value (string type) in to number type
  function convertDisplayNumberInputToNumberType(strType) {
    const convertedStrToNumType = Number(strInput);

    return convertedStrToNumType;
  }
  // keep a history of all the totals

  // utility functions

  function convertDisplayValueToArr(displayString, keypadValuePressed) {
    const arrOfStrChars = displayString.split("");
    /*****add value to arr using push method *****/
    arrOfStrChars.push(keypadValuePressed);
    const lengthOfArr = arrOfStrChars.length;

    switch (true) {
      case lengthOfArr <= 3:
        hundredsValueDisplayFunc(arrOfStrChars, lengthOfArr);
        break;
      case lengthOfArr >= 4 && lengthOfArr <= 6:
        break;
      case lengthOfArr >= 7 && lengthOfArr <= 9:
        break;
      case lengthOfArr >= 10 && lengthOfArr <= 12:
        break;
    }
  }

  function hundredsValueDisplayFunc(arrInput) {
    const copyArrPassedIn = [...arrInput];
    strValueForTotalDisplayELement(
      convertArrOfValuesToStrUsingJoinMethod(copyArrPassedIn)
    );
  }
  function thousandsValueDisplayFunc(arrInput, lengthInput) {
    const copyArrPassedIn = [...arrInput];
    switch (lengthInput) {
      case 4:
        const [first, second, third, fourth] = copyArrPassedIn;
        const arrPassedToJoinHelperFunc = [first, ",", second, third, fourth];
        console.log(arrPassedToJoinHelperFunc);
        break;
      case 5:
        // const [first, second, third, fourth, fifth] = copyArrPassedIn;
        // const arrPassedToJoinHelperFunc = [first, second, third, fourth];
        console.log(arrPassedToJoinHelperFunc);
        break;
      case 6:
        // const [first, second, third, fourth, fifth, sixth] = copyArrPassedIn;
        break;
    }
  }
  function millionsValueDisplayFunc(arrInput, lengthInput) {}
  function billionsValueDisplayFunc(arrInput, lengthInput) {}

  function utilityStrFunc() {
    const currentDisplayValue = totalDisplay.innerText;

    return currentDisplayValue;
  }

  //   function getLengthOfStrValueOfDisplayElement(strInput) {
  //     const strLength = strInput.length;

  //     return strLength;
  //   }

  function strValueForTotalDisplayELement(valueInput) {
    totalDisplay.innerText = valueInput;
  }

  function convertArrOfValuesToStrUsingJoinMethod(arrInput) {
    const strValue = arrInput.join("");
    return strValue;
  }

  function strValueForKeyPressedDisplayElement(valueInput) {}

  function displayValueWithoutCommas(displayValue) {
    // "166,245".match(/\d/ig)
    const arrOfDisplayValuesOnlyNumbers = displayValue.match(/\d/gi);

    return arrOfDisplayValuesOnlyNumbers;
  }

  // selector our elements

  function ourSelectors() {
    const sectionAppWrapper = document.querySelector(".calculator-app-bg");
    const sliderCircle = document.querySelector(".toggle-circle");
    const themeLabelBtnContainer = document.querySelector(
      ".theme-label-btn-wrapper"
    );
    //   const arrOfRadioButtons = Array.from(document.querySelectorAll("INPUT"));
    const arrOfRadioButtons = Array.prototype.slice.call(
      document.querySelectorAll("INPUT")
    );

    const keysContainer = document.querySelector(".keys-container");
    const arrofKeyPadButtons = Array.from(document.querySelectorAll("button"));

    //   display
    const keysPressedDisplay = document.querySelector(
      ".top-display-keys-pressed"
    );
    const totalDisplay = document.querySelector(".current-total-number");

    //   const arrofKeyPadButtons = Array.prototype.slice.call(
    //     document.querySelectorAll("button")
    //   );
    return {
      sectionAppWrapper,
      sliderCircle,
      themeLabelBtnContainer,
      arrOfRadioButtons,
      keysContainer,
      arrofKeyPadButtons,
      totalDisplay,
      keysPressedDisplay,
    };
  }
})();
