(function scopeOurVaribles() {
  const {
    ourObjElement,
    sectionAppWrapper,
    sliderCircle,
    themeLabelBtnContainer,
    arrOfRadioButtons,
    keysContainer,
    arrofKeyPadButtons,
    totalDisplay,
    operatorKeyPressedDisplay,
  } = ourSelectors();
  // calling our functions
  declareOurDataObj();
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

  function declareOurDataObj() {
    //   instantiate our obj
    ourObjElement.dataObj = {
      arrOfOperators: ["x", "/", "+", "-"],
      clickedBtns: [],
      previousClickedBtn: "",
      currentTotal: 0,
      operatorKeyPressed: false,
    };
  }

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

    if (event.target.tagName == "BUTTON") {
      const buttonPressedValue = event.target.firstElementChild.innerText;

      // if (ourObjElement.dataObj.clickedBtns.length == 2) {
      //   const elementIndex = ourObjElement.dataObj.clickedBtns.length - 1;
      //   const prevClickedBtn = ourObjElement.dataObj.clickedBtns[elementIndex];
      //   ourObjElement.dataObj.previousClickedBtn = prevClickedBtn;
      //   ourObjElement.dataObj.clickedBtns.length = 0;
      // }
      //   another approach
      lastItemClicked();
      switch (true) {
        case buttonPressedValue == "+" ||
          buttonPressedValue == "-" ||
          buttonPressedValue == "/" ||
          buttonPressedValue == "x":
          ourObjElement.dataObj.clickedBtns.push("operator");
          // ourObjElement.dataObj.clickedBtns.push(buttonPressedValue);
          operatorButtonPressed(
            buttonPressedValue,
            ourObjElement.dataObj.previousClickedBtn
          );
          break;
        case buttonPressedValue == "RESET":
          resetButtonPressed();
          ourObjElement.dataObj.clickedBtns.push("reset");
          console.log("reset button pressed");
          break;
        case buttonPressedValue == "DEL":
          console.log("delete key pressed");
          ourObjElement.dataObj.clickedBtns.push("delete");
          deleteButtonPressed(ourObjElement.dataObj.previousClickedBtn);
          break;
        case buttonPressedValue == "=":
          console.log("equal key pressed");
          ourObjElement.dataObj.clickedBtns.push("equal");
          break;
        case buttonPressedValue == ".":
          console.log("decimal pressed");
          ourObjElement.dataObj.clickedBtns.push("decimal");
          decimalButtonPressed(buttonPressedValue);
          break;
        default:
          ourObjElement.dataObj.clickedBtns.push("number");
          // ourObjElement.dataObj.clickedBtns.push(buttonPressedValue);

          numberKeyPressed(
            buttonPressedValue,
            ourObjElement.dataObj.previousClickedBtn
          );
          console.log("number key pressed", buttonPressedValue);
      }
    }
  }

  function lastItemClicked() {
    if (ourObjElement.dataObj.clickedBtns.length == 1) {
      const prevItem = ourObjElement.dataObj.clickedBtns.pop();
      ourObjElement.dataObj.previousClickedBtn = prevItem;
      ourObjElement.dataObj.clickedBtns.length = 0;
      console.log(
        "previousClickedBtn",
        ourObjElement.dataObj.previousClickedBtn
      );
    }
  }

  // calculation helper functions

  function decimalButtonPressed(decimalBtnInput) {
    /***** when user click on decimal button  *****/
    const currentTotalDisplay = utilityStrFunc();
    const arrOfValuesWithComma = currentTotalDisplay.split("");
    const arrDoesNotIncludeDecimal = arrOfValuesWithComma.includes(".");
    //before we hit decimal key our displayTotal does not include a decimal
    //arrDoesNotIncludeDecimal will return false we will negate that !
    //to enter if block
    if (!arrDoesNotIncludeDecimal) {
      //add "." to our array
      arrOfValuesWithComma.push(".");
      convertArrToStrAndDisplayValueInApp(
        strValueForTotalDisplayELement,
        convertArrOfValuesToStrUsingJoinMethod,
        arrOfValuesWithComma
      );
    }
    /*****
         * "42.00030".slice(2 + 1).split("").every((val)=>{
            return val === "0"
            });
         *  *****/
    // if our displayTotal str has a decimal we dont want to add another decimal to displayTotal
    //string
  }

  // decimal helper functions

  function findIndexOfDecimal(totalDisplayStrOrArr) {
    const indexOfDecimal = totalDisplayStrOrArr.indexOf(".");

    return indexOfDecimal;
  }

  function leftSideOfDecimal(strInput) {
    const arrOfValuesLeftSideFunc = strInput.split("");
    const indexInArrLeftSideFunc = findIndexOfDecimal(arrOfValuesLeftSideFunc);
    const leftSide = arrOfValuesLeftSideFunc.slice(0, indexInArrLeftSideFunc);
    //will return an array
    return leftSide;
  }

  function rightSideOfDecimal(strInput) {
    const arrOfValuesRightSideFunc = strInput.split("");
    const indexInArrRightSideFunc = findIndexOfDecimal(
      arrOfValuesRightSideFunc
    );
    const rightSide = arrOfValuesRightSideFunc.slice(indexInArrRightSideFunc);
    //will return an array with the decimal at the 0 index
    return rightSide;
  }

  function combineLeftAndRightSideWithNumberPressed(
    leftSideArr,
    rightSideArr,
    numberBtnPressed
  ) {
    //add numberBtnPressed to rightSide array

    /*const rightSideArrWithNumBtnPressedAdded =
      rightSideArr.push(numberBtnPressed); //this will return the index the value was added and assign it to rightSideArrWithNumBtnPressedAdded */
    rightSideArr.push(numberBtnPressed);
    //return an array with values of leftside and rightside array
    const combinedLeftAndRightSideArr = [...leftSideArr, ...rightSideArr];
    return combinedLeftAndRightSideArr;
  }

  function deleteButtonPressed(lastPressedBtn) {
    const operatorNotPressed = ourObjElement.dataObj.operatorKeyPressed;
    //when operatorKeyPressed is false we want to delete the last value of totalDisplayStr
    if (!operatorNotPressed) {
      const currentTotalDisplay = utilityStrFunc();
      // const arrOfStrValues = currentTotalDisplay.split("");
      const arrOfStrValues = [...currentTotalDisplay];
      //remove last value in displayStr
      arrOfStrValues.pop();
      //passing arr to display composition func
      convertArrToStrAndDisplayValueInApp(
        strValueForTotalDisplayELement,
        convertArrOfValuesToStrUsingJoinMethod,
        arrOfStrValues
      );
    }
  }

  function resetButtonPressed() {
    // set everything back to zero/default
    //set displays to 0
    operatorKeyPressedDisplay.innerText = "";
    totalDisplay.innerText = "0";
  }

  function equalButtonPressed() {}

  function operatorButtonPressed(operatorInput, lastPressedBtn) {
    //   switch operatorKeyPressed from false to true when user click on operator btn this is for delete key functionality
    ourObjElement.dataObj.operatorKeyPressed = true;
    //   when user click on an operator(+,-,/,x)
    //we will display the value enter before clicking on an operator
    //with the operator clicked to operatorKeyPressedDisplay element
    const valueOfDisplayAboveTotal = operatorKeyPressedDisplay.innerText;
    console.log(ourObjElement.dataObj.clickedBtns);
    console.log(lastPressedBtn);
    if (valueOfDisplayAboveTotal === "") {
      const strOfNumberBtnPressed = operatorPressedDisplayHelperFunc();
      operatorKeyPressedDisplay.innerText =
        strOfNumberBtnPressed + ` ${operatorInput}`;
    } else {
      const arrOfValueAndOperator = valueOfDisplayAboveTotal.split(" ");

      //   replace current operator on display with operator user click
      //when user already click numbers and clicked an operator
      arrOfValueAndOperator[1] = operatorInput;
      const strForDisplayWithChnagedOperator = arrOfValueAndOperator.join(" ");
      operatorKeyPressedDisplay.innerText = strForDisplayWithChnagedOperator;
    }
  }

  function operatorPressedDisplayHelperFunc() {
    const displayValue = utilityStrFunc();
    const arrOfOnlyNumbersWithoutCommas =
      displayValueWithoutCommas(displayValue);

    const strValueUsedForDisplay = arrOfOnlyNumbersWithoutCommas.join("");
    return strValueUsedForDisplay;
  }

  function numberKeyPressed(buttonPressedInput, lastPressedBtn) {
    //we want to switch operatorKeyPressed to false when user click on operator btn
    //then click on number btn
    //   switch operatorKeyPressed to false when user click on number key. this is for delete key functionality
    const currentValueOfTopDisplay = topDisplayStrFunc();
    if (currentValueOfTopDisplay !== "") {
      console.log("currentValueOfTopDisplay", currentValueOfTopDisplay);
      ourObjElement.dataObj.operatorKeyPressed = false;
    }

    //buttonPressedInput type is string
    // console.log(ourObjElement.dataObj.clickedBtns);
    console.log(lastPressedBtn);
    /***** if user click on an operator btn: /,x,+,- then click a number btn
     * displayTotal will be the number btn pressed
     *  *****/
    //   we can use Array.prototype.some or .includes() to check if lastItemClicked is an operator
    /***** using includes *****/
    // const lastBtnPressedIsOperator =
    //   ourObjElement.dataObj.arrOfOperators.includes(lastPressedBtn);
    /***** using Array.prototype.some() *****/
    // const lastBtnPressedIsOperator = ourObjElement.dataObj.arrOfOperators.some(
    //   function lastItemPressedIsAnOperator(eachStr) {
    //     return eachStr == lastPressedBtn;
    //   }
    // );
    //   lastBtn clicked is an x,/,+,-
    // if (lastBtnPressedIsOperator) {
    //   strValueForTotalDisplayELement(buttonPressedInput);
    // }
    // //   lastBtn clicked is not an x,/,+,-
    //   //this will run when lastPressedBtn is an "" (empty string)
    //   //because "" is falsy !"" will be true so we enter if block below
    // if (!lastBtnPressedIsOperator) {
    //   const displayValue = utilityStrFunc();
    //   const arrOfOnlyNumbersWithoutCommas =
    //     displayValueWithoutCommas(displayValue);
    //   const lengthOfArrOfOnlyNumValues = arrOfOnlyNumbersWithoutCommas.length;

    //   switch (true) {
    //     //   length of 3 or less
    //     case lengthOfArrOfOnlyNumValues <= 3:
    //       workingWithDisplayLengthOfLessThanThree(
    //         lengthOfArrOfOnlyNumValues,
    //         buttonPressedInput,
    //         arrOfOnlyNumbersWithoutCommas
    //       );
    //       break;
    //     //length of 4 to 6
    //     case lengthOfArrOfOnlyNumValues >= 4 && lengthOfArrOfOnlyNumValues <= 6:
    //       workingWithDisplayLengthMoreThanThreeLessThanSeven(
    //         arrOfOnlyNumbersWithoutCommas,
    //         lengthOfArrOfOnlyNumValues,
    //         buttonPressedInput
    //       );
    //       break;
    //     //length of 7 to 9
    //     case lengthOfArrOfOnlyNumValues >= 6 && lengthOfArrOfOnlyNumValues <= 9:
    //       workingWithDisplayLengthOfMoreThanSixLessThanTen(
    //         arrOfOnlyNumbersWithoutCommas,
    //         lengthOfArrOfOnlyNumValues,
    //         buttonPressedInput
    //       );
    //       break;
    //   }
    //   //length of 10 to 12
    // }
    const currentStrTotalDisplay = utilityStrFunc();
    const totalDisplayStrContainDecimal = findIndexOfDecimal(
      currentStrTotalDisplay
    );
    /***** better approach: check for "operator", "number", "decimal", etc *****/
    // lastBtn is x,/,+,-
    if (lastPressedBtn == "operator") {
      strValueForTotalDisplayELement(buttonPressedInput);
    }
    //lastBtn is a number
    if (lastPressedBtn == "number" || lastPressedBtn === "") {
      const displayValue = utilityStrFunc();
      const arrOfOnlyNumbersWithoutCommas =
        displayValueWithoutCommas(displayValue);
      const lengthOfArrOfOnlyNumValues = arrOfOnlyNumbersWithoutCommas.length;

      switch (true) {
        //   length of 3 or less
        case lengthOfArrOfOnlyNumValues <= 3:
          workingWithDisplayLengthOfLessThanThree(
            lengthOfArrOfOnlyNumValues,
            buttonPressedInput,
            arrOfOnlyNumbersWithoutCommas
          );
          break;
        //length of 4 to 6
        case lengthOfArrOfOnlyNumValues >= 4 && lengthOfArrOfOnlyNumValues <= 6:
          workingWithDisplayLengthMoreThanThreeLessThanSeven(
            arrOfOnlyNumbersWithoutCommas,
            lengthOfArrOfOnlyNumValues,
            buttonPressedInput
          );
          break;
        //length of 7 to 9
        case lengthOfArrOfOnlyNumValues >= 6 && lengthOfArrOfOnlyNumValues <= 9:
          workingWithDisplayLengthOfMoreThanSixLessThanTen(
            arrOfOnlyNumbersWithoutCommas,
            lengthOfArrOfOnlyNumValues,
            buttonPressedInput
          );
          break;
      }
    }
    //lastBtn is a number and display str includes decimal
    if (lastPressedBtn == "number" && totalDisplayStrContainDecimal !== -1) {
      const leftSide = leftSideOfDecimal(currentStrTotalDisplay);
      const rightSide = rightSideOfDecimal(currentStrTotalDisplay);
      const arrUsedInCompositionFunc = combineLeftAndRightSideWithNumberPressed(
        leftSide,
        rightSide,
        buttonPressedInput
      );

      convertArrToStrAndDisplayValueInApp(
        strValueForTotalDisplayELement,
        convertArrOfValuesToStrUsingJoinMethod,
        arrUsedInCompositionFunc
      );
    }
    //   user clicked on number and last clicked btn is "delete"
    if (lastPressedBtn == "delete") {
      console.log("delete clicked then number", lastPressedBtn);
    }
    if (lastPressedBtn == "decimal") {
      //lastBtn is a decimal
      console.log("numberKeyPressed decimal pressed");
      //when user click on decimal then number we want to add number to display
      const currentTotalDisplayWithDecimal = utilityStrFunc();
      const arrOfValuesWithDecimal = currentTotalDisplayWithDecimal.split("");
      //add number pressed to arr
      arrOfValuesWithDecimal.push(buttonPressedInput);
      //pass arr to our composition func
      convertArrToStrAndDisplayValueInApp(
        strValueForTotalDisplayELement,
        convertArrOfValuesToStrUsingJoinMethod,
        arrOfValuesWithDecimal
      );
    }
  }
  //   length of 3 or less
  function workingWithDisplayLengthOfLessThanThree(
    lengthInput,
    keyBtnPressed,
    arrOfValuesWithoutCommas
  ) {
    //   this function is being called when a number button is pressed
    const totalDisplayValue = utilityStrFunc();
    if (lengthInput == 1 && keyBtnPressed === "0") {
      //display is 0 and user pressed 0
      strValueForTotalDisplayELement(keyBtnPressed);
    }
    if (lengthInput == 1 && keyBtnPressed !== "0") {
      //display is 0 and user pressed any number button that is not 0
      strValueForTotalDisplayELement(keyBtnPressed);
    }
    if (lengthInput >= 1 && lengthInput != 3 && totalDisplayValue !== "0") {
      // when js gets here we want to add to the totalDisplayValue
      //display is 1 or any value that is not 0 and the user pressed a number key
      addKeyBtnPressedToStrLengthLessThanThree(
        totalDisplayValue,
        keyBtnPressed
      );
    }
    if (lengthInput == 3 && totalDisplay !== "0") {
      addingCommaToDisplayWhenLengthIsThreeInputIsNumber(
        arrOfValuesWithoutCommas,
        keyBtnPressed
      );
    }
  }
  //length of 4 to 6
  function workingWithDisplayLengthMoreThanThreeLessThanSeven(
    arrInput,
    lengthInput,
    keyPressed
  ) {
    const copyArrInput = [].concat(arrInput);
    switch (lengthInput) {
      case 4:
        const [firstStr, secondStr, thirdStr, fourthStr] = copyArrInput;
        const arrOfValuesWithComma = [
          firstStr,
          secondStr,
          ",",
          thirdStr,
          fourthStr,
          keyPressed,
        ];
        convertArrToStrAndDisplayValueInApp(
          strValueForTotalDisplayELement,
          convertArrOfValuesToStrUsingJoinMethod,
          arrOfValuesWithComma
        );
        break;
      case 5:
        const [
          firstString,
          secondString,
          thirdString,
          fourthString,
          fifthString,
        ] = copyArrInput;
        const arrOfValuesAndComma = [
          firstString,
          secondString,
          thirdString,
          ",",
          fourthString,
          fifthString,
          keyPressed,
        ];
        convertArrToStrAndDisplayValueInApp(
          strValueForTotalDisplayELement,
          convertArrOfValuesToStrUsingJoinMethod,
          arrOfValuesAndComma
        );
        break;
      case 6:
        const [
          firstValue,
          secondValue,
          thirdValue,
          fourthValue,
          fifthValue,
          sixthValue,
        ] = copyArrInput;
        const arrOfStrValuesAndComma = [
          firstValue,
          ",",
          secondValue,
          thirdValue,
          fourthValue,
          ",",
          fifthValue,
          sixthValue,
          keyPressed,
        ];
        convertArrToStrAndDisplayValueInApp(
          strValueForTotalDisplayELement,
          convertArrOfValuesToStrUsingJoinMethod,
          arrOfStrValuesAndComma
        );
        break;
    }
  }
  //length of 7 to 9
  function workingWithDisplayLengthOfMoreThanSixLessThanTen(
    arrInput,
    lengthInput,
    keyPressed
  ) {
    const copyArrInput = arrInput.slice();
    switch (lengthInput) {
      case 7:
        const [
          firstVal,
          secondVal,
          thirdVal,
          fourthVal,
          fifthVal,
          sixthVal,
          sevenVal,
        ] = copyArrInput;
        const arrOfStrValsAndComma = [
          firstVal,
          secondVal,
          ",",
          thirdVal,
          fourthVal,
          fifthVal,
          ",",
          sixthVal,
          sevenVal,
          keyPressed,
        ];
        convertArrToStrAndDisplayValueInApp(
          strValueForTotalDisplayELement,
          convertArrOfValuesToStrUsingJoinMethod,
          arrOfStrValsAndComma
        );
        break;
      case 8:
        const [
          firstStrVal,
          secondStrVal,
          thirdStrVal,
          fourthStrVal,
          fifthStrVal,
          sixthStrVal,
          sevenStrVal,
          eighthStrVal,
        ] = copyArrInput;
        const arrOfValsAndCommas = [
          firstStrVal,
          secondStrVal,
          thirdStrVal,
          ",",
          fourthStrVal,
          fifthStrVal,
          sixthStrVal,
          ",",
          sevenStrVal,
          eighthStrVal,
          keyPressed,
        ];
        convertArrToStrAndDisplayValueInApp(
          strValueForTotalDisplayELement,
          convertArrOfValuesToStrUsingJoinMethod,
          arrOfValsAndCommas
        );
        break;
      case 9:
        const [
          firstStrValue,
          secondStrValue,
          thirdStrValue,
          fourthStrValue,
          fifthStrValue,
          sixthStrValue,
          sevenStrValue,
          eighthStrValue,
          ninthStrValue,
        ] = copyArrInput;
        const arrOfValuesAndCommas = [
          firstStrValue,
          ",",
          secondStrValue,
          thirdStrValue,
          fourthStrValue,
          ",",
          fifthStrValue,
          sixthStrValue,
          sevenStrValue,
          ",",
          eighthStrValue,
          ninthStrValue,
          keyPressed,
        ];
        convertArrToStrAndDisplayValueInApp(
          strValueForTotalDisplayELement,
          convertArrOfValuesToStrUsingJoinMethod,
          arrOfValuesAndCommas
        );
        break;
    }
  }

  function addingCommaToDisplayWhenLengthIsThreeInputIsNumber(
    arrInputWithoutComma,
    keypadBtnPressed
  ) {
    // arrInputWithoutComma will be an array of length 3 [4,5,2]
    const [firstStr, secondStr, thirdStr] = arrInputWithoutComma;
    const arrOfValuesWithOneComma = [
      firstStr,
      ",",
      secondStr,
      thirdStr,
      keypadBtnPressed,
    ];
    hundredsValueDisplayFunc(arrOfValuesWithOneComma);
  }

  function resetToDefaultOnReload() {
    //set displays to 0
    operatorKeyPressedDisplay.innerText = "";
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

  function addKeyBtnPressedToStrLengthLessThanThree(
    displayString,
    keypadValuePressed
  ) {
    const arrOfStrChars = displayString.split("");
    /*****add value to arr using push method *****/
    arrOfStrChars.push(keypadValuePressed);

    hundredsValueDisplayFunc(arrOfStrChars);
  }

  function hundredsValueDisplayFunc(arrInput) {
    const copyArrPassedIn = [...arrInput];
    convertArrToStrAndDisplayValueInApp(
      strValueForTotalDisplayELement,
      convertArrOfValuesToStrUsingJoinMethod,
      copyArrPassedIn
    );
    // strValueForTotalDisplayELement(
    //   convertArrOfValuesToStrUsingJoinMethod(copyArrPassedIn)
    // );
  }

  function utilityStrFunc() {
    const currentDisplayValue = totalDisplay.innerText;

    return currentDisplayValue;
  }

  function topDisplayStrFunc() {
    const currentTopDisplayValue = operatorKeyPressedDisplay.innerText;

    return currentTopDisplayValue;
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

  function convertArrToStrAndDisplayValueInApp(func1, func2, arrInput) {
    func1(func2(arrInput));
  }

  function strValueForKeyPressedDisplayElement(valueInput) {}

  function topDisplayMatchOperators(strInput) {
    // "145 -".match(/[+-/x]/ig)
    const arrOfOperatorsInTopDisplay = strInput.match(/[+-/x]/gi);
  }

  function displayValueWithoutCommas(displayValue) {
    // "166,245".match(/\d/ig)
    const arrOfDisplayValuesOnlyNumbers = displayValue.match(/\d/gi);

    return arrOfDisplayValuesOnlyNumbers;
  }

  // selector our elements

  function ourSelectors() {
    const ourObjElement = document.getElementById("hidden-span");
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
    const operatorKeyPressedDisplay = document.querySelector(
      ".top-display-keys-pressed"
    );
    const totalDisplay = document.querySelector(".current-total-number");

    //   const arrofKeyPadButtons = Array.prototype.slice.call(
    //     document.querySelectorAll("button")
    //   );
    return {
      ourObjElement,
      sectionAppWrapper,
      sliderCircle,
      themeLabelBtnContainer,
      arrOfRadioButtons,
      keysContainer,
      arrofKeyPadButtons,
      totalDisplay,
      operatorKeyPressedDisplay,
    };
  }

  function firstAttemptCodes() {
    // switch (true) {
    //   case lengthOfArr <= 3:
    //     hundredsValueDisplayFunc(arrOfStrChars, lengthOfArr);
    //     break;
    //   case lengthOfArr >= 4 && lengthOfArr <= 6:
    //     break;
    //   case lengthOfArr >= 7 && lengthOfArr <= 9:
    //     break;
    //   case lengthOfArr >= 10 && lengthOfArr <= 12:
    //     break;
    // }
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
  }
})();
