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
      totalDisplayValueForWhenEqualBtnIsLastBtnPressed: null,
      operatorSignUsedForCalcWhenTopDisplayIsEmpty: null,
      // operatorKeyPressed is false when our app loads
      //and when user click on a number btn
      /***** keep this in mind for x,/,+,- and equal btn calculations *****/
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
          equalButtonPressed(ourObjElement.dataObj.previousClickedBtn);
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
    //when we want to work with the displayTotal without the comma
    const currentTotalDisplay = utilityStrFunc();
    const arrOfDisplayValuesWithoutComma = currentTotalDisplay.match(/\d/gi);
    //the displayTotal contain decimal
    const decimalInTotalDisplay = currentTotalDisplay.includes(".");
    const operatorNotPressed = ourObjElement.dataObj.operatorKeyPressed;
    //when operatorKeyPressed is false we want to delete the last value of totalDisplayStr
    //when user click on a number btn we set ourObjElement.dataObj.operatorKeyPressed to false
    //which will take us into this if statement block
    if (!operatorNotPressed) {
      // how to deal with commas in operator
      //get length of displayStr
      //when length is 1. display is "3"
      if (arrOfDisplayValuesWithoutComma.length == 1) {
        strValueForTotalDisplayELement("0");
      }

      if (
        (arrOfDisplayValuesWithoutComma.length > 1 &&
          arrOfDisplayValuesWithoutComma.length <= 3) ||
        decimalInTotalDisplay
      ) {
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
      // displayTotal does not contain decimal and length is greater than 3
      if (
        arrOfDisplayValuesWithoutComma.length >= 4 &&
        !decimalInTotalDisplay
      ) {
        deleteButtonDealingWithLengthOfTotalDisplay(
          arrOfDisplayValuesWithoutComma
        );
      }
    }
  }

  function deleteButtonDealingWithLengthOfTotalDisplay(arrInputWithoutComma) {
    const copyOfArrInput = [...arrInputWithoutComma];
    const lengthOfArrOfValuesWithoutComma = arrInputWithoutComma.length;
    switch (lengthOfArrOfValuesWithoutComma) {
      case 4:
        copyOfArrInput.pop();
        convertArrToStrAndDisplayValueInApp(
          strValueForTotalDisplayELement,
          convertArrOfValuesToStrUsingJoinMethod,
          copyOfArrInput
        );
        break;
      case 5:
        copyOfArrInput.pop();
        //[7,8,2,3,4] remove the last value
        //[7,8,2,3] pass in an array of ["0","0"]

        workingWithOneComma(copyOfArrInput, ["0", "0"]);
        break;
      case 6:
        copyOfArrInput.pop();

        //[7,8,2,3,4,8] remove the last value
        //[7,8,2,3,4] pass in an array of ["0"]
        workingWithOneComma(copyOfArrInput, ["0"]);
        break;
      case 7:
        copyOfArrInput.pop();
        const leftSide = copyOfArrInput.slice(0, 3);
        const rightSide = copyOfArrInput.slice(3);
        const arrOfLeftAndRightWithComma = [...leftSide, ",", ...rightSide];

        convertArrToStrAndDisplayValueInApp(
          strValueForTotalDisplayELement,
          convertArrOfValuesToStrUsingJoinMethod,
          arrOfLeftAndRightWithComma
        );

        break;
      case 8:
        copyOfArrInput.pop();
        workingWithTwoCommas(copyOfArrInput, ["0", "0"]);
        break;
      case 9:
        copyOfArrInput.pop();
        workingWithTwoCommas(copyOfArrInput, ["0"]);
        break;
      case 10:
        copyOfArrInput.pop();
        const beginningOfArray = copyOfArrInput.slice(0, 3);
        const middleOfArray = copyOfArrInput.slice(3, 6);
        const endOfArray = copyOfArrInput.slice(6, 9);
        const combinedArrays = [
          ...beginningOfArray,
          ",",
          ...middleOfArray,
          ",",
          ...endOfArray,
        ];

        convertArrToStrAndDisplayValueInApp(
          strValueForTotalDisplayELement,
          convertArrOfValuesToStrUsingJoinMethod,
          combinedArrays
        );
        break;
      case 11:
        //[1,2,3,4,5,6,7,8,9,10,11].pop() becomes [1,2,3,4,5,6,7,8,9,10]
        copyOfArrInput.pop();
        workingWithThreeCommas(copyOfArrInput, ["0", "0"]);
        break;
      case 12:
        copyOfArrInput.pop();
        workingWithThreeCommas(copyOfArrInput, ["0"]);
        break;
    }
  }

  function workingWithOneComma(arrInputWithoutComma, arrOfZeros) {
    const copiedArrInput = [...arrInputWithoutComma];
    //we want to work with an array of length 6: [0,0,3,6,7,8] or [0,3,4,6,7,8]
    const arrOfValuesWithZeros = combineTwoArrays(arrOfZeros, copiedArrInput);

    const leftSideOfArrWithoutComma = arrOfValuesWithZeros.slice(0, 3);
    // remove leading 0 of leftSide
    //using filter method to remove leading 0
    // const leftSideWithoutLeadingZeros = leftSideOfArrWithoutComma.filter(function removeZeros(eachStr) {
    //   return eachStr !== "0";
    // });
    //using reduce method to remove leading 0
    const leftSideWithoutLeadingZeros = removeZeroValuesInArray(
      leftSideOfArrWithoutComma
    );
    const rightSideOfArrWithoutComma = arrOfValuesWithZeros.slice(3);
    const combineLeftAndRightSideWithComma = [
      ...leftSideWithoutLeadingZeros,
      ",",
      ...rightSideOfArrWithoutComma,
    ];
    //passing arr to display composition func
    convertArrToStrAndDisplayValueInApp(
      strValueForTotalDisplayELement,
      convertArrOfValuesToStrUsingJoinMethod,
      combineLeftAndRightSideWithComma
    );
  }

  function workingWithTwoCommas(arrInputWithoutComma, arrOfZeros) {
    const copiedArrInput = [].concat(arrInputWithoutComma);
    // code below will give us an array of [0,0,3,4,5,6,7,8,9]
    const arraysWithZerosAdded = combineTwoArrays(arrOfZeros, copiedArrInput);

    const beginningOfArray = arraysWithZerosAdded.slice(0, 3);
    const middleOfArray = arraysWithZerosAdded.slice(3, 6);
    const endOfArray = arraysWithZerosAdded.slice(6, 9);

    // remove zeros of beginning array
    const beginningOfArrayWithoutZeros =
      removeZeroValuesInArray(beginningOfArray);
    // combine our arrays
    const combineOurArraysAddingCommas = [
      ...beginningOfArrayWithoutZeros,
      ",",
      ...middleOfArray,
      ",",
      ...endOfArray,
    ];
    //passing arr to display composition func
    convertArrToStrAndDisplayValueInApp(
      strValueForTotalDisplayELement,
      convertArrOfValuesToStrUsingJoinMethod,
      combineOurArraysAddingCommas
    );
  }

  function workingWithThreeCommas(arrInputWithoutComma, arrOfZeros) {
    const copiedArrInput = arrInputWithoutComma.slice();
    const arraysWithZeros = combineTwoArrays(arrOfZeros, copiedArrInput);

    const firstFourthOfArray = arraysWithZeros.slice(0, 3);
    const secondFourthOfArray = arraysWithZeros.slice(3, 6);
    const thirdFourthOfArray = arraysWithZeros.slice(6, 9);
    const lastFourthOfArray = arraysWithZeros.slice(9, 12);

    // remove zeros of beginning array
    const beginningOfArrayWithoutZeros =
      removeZeroValuesInArray(firstFourthOfArray);

    // combine our arrays
    const combineArraysAddingCommas = [
      ...beginningOfArrayWithoutZeros,
      ",",
      ...secondFourthOfArray,
      ",",
      ...thirdFourthOfArray,
      ",",
      ...lastFourthOfArray,
    ];
    //passing arr to display composition func
    convertArrToStrAndDisplayValueInApp(
      strValueForTotalDisplayELement,
      convertArrOfValuesToStrUsingJoinMethod,
      combineArraysAddingCommas
    );
  }

  function combineTwoArrays(arrayOne, arrayTwo) {
    return [...arrayOne, ...arrayTwo];
  }

  function removeZeroValuesInArray(arrInput) {
    return arrInput.reduce(function removeZeros(buildingUp, currentValue) {
      if (currentValue !== "0") buildingUp.push(currentValue);
      return buildingUp;
    }, []);
  }

  function resetButtonPressed() {
    // set everything back to zero/default
    //set displays to 0
    operatorKeyPressedDisplay.innerText = "";
    totalDisplay.innerText = "0";
  }

  function equalButtonPressed(lastPressedBtn) {
    const innerTextTopDisplay = topDisplayStrFunc();
    const currentTotalDisplayWithoutCommas =
      operatorAndEqualBtnPressedDisplayHelperFunc();
    if (innerTextTopDisplay === "") {
      strValueForKeyPressedDisplayElement(
        `${currentTotalDisplayWithoutCommas} =`
      );
      // operatorKeyPressedDisplay.innerText = currentTotalDisplayWithoutCommas;
      // our other condition
      // when user pressed number operator then equal
      // or when user pressed number operator number then equal
      // both condition will give us a sum
      // then when user click number it will make topDisplay empty
      // we will check that too
    } else {
      // topDisplay
      const [leftValue, operatorSign] = innerTextTopDisplay.split(" ");
      // const currentTotalDisplayWithoutCommas = utilityStrFunc(); declaring a identifier with valuesOfTotalDisplayWithoutCommas
      // when top display is not empty it means user click on a number then operator or
      //use click on equal btn
      switch (lastPressedBtn) {
        case "number":
          if (!ourObjElement.dataObj.operatorButtonPressed) {
            // if user has not clicked on operator btn and last pressed btn is a number
            //update left side of = with currentTotalDisplayWithoutCommas
            strValueForKeyPressedDisplayElement(
              `${currentTotalDisplayWithoutCommas} =`
            );
            //if use click on number then operator then another number for calculation
            //that would set ourObjElement.dataObj.operatorButtonPressed to false
            //we would enter this if statement
            // topDisplay: 5 +
            //totalDisplay: 3 then user hit equal
            // operatorSign identifier is from const [leftValue, operatorSign] = innerTextTopDisplay.split(" ");
            if (operatorSign) {
              const sumValue = calculationHelperFunc(innerTextTopDisplay);
              // topDisplay
              const strConvertedFromArr = [
                leftValue,
                operatorSign,
                currentTotalDisplayWithoutCommas,
                "=",
              ].join(" ");
              strValueForKeyPressedDisplayElement(strConvertedFromArr);
              //totalDisplay
              strValueForTotalDisplayELement(String(sumValue));
              /**
               * we want to save the value in totalDisplay when user pressed number then operator than equal
               * also look at when lastPressed is number
               * **/
              ourObjElement.dataObj.totalDisplayValueForWhenEqualBtnIsLastBtnPressed =
                currentTotalDisplayWithoutCommas;
              /**
               * save operatorSign pressed to variable ourObjElement.dataObj.operatorSignUsedForCalcWhenTopDisplayIsEmpty
               * for calculation below
               * **/

              ourObjElement.dataObj.operatorSignUsedForCalcWhenTopDisplayIsEmpty =
                operatorSign;
            }
            /**
             * check if topDisplay is empty
             * if totalDisplayValueForWhenEqualBtnIsLastBtnPressed is not null or undefined
             * when we enter this if statement block it eiter means user pressed operator then number
             * in our algorithm when user pressed number btn it set ourObjElement.dataObj.operatorButtonPressed to false
             * **/
            const savedValueOfTotalDisplay =
              ourObjElement.dataObj
                .totalDisplayValueForWhenEqualBtnIsLastBtnPressed;
            if (
              innerTextTopDisplay.length === 0 &&
              savedValueOfTotalDisplay !== null
            ) {
              // when we get here topDisplay is empty
              //totalDisplay will be the number user pressed
              //take totalDisplay and pass it to calculation func
              console.log(
                "start here. working on calc when user clicked equal after processing a calc"
              );
              console.log("then clicked a number. ");
            }
          }
          break;
        case "operator":
          // if operator is last pressed btn when user click equal btn
          // take leftValue and totalDisplay value and pass those values to calculation based on
          //operator pressed
          const sumValue = calculationHelperFunc(innerTextTopDisplay);
          // topDisplay
          const strForCalcFuncUsingJoinMethod = [
            leftValue,
            operatorSign,
            currentTotalDisplayWithoutCommas,
            "=",
          ].join(" ");
          strValueForKeyPressedDisplayElement(strForCalcFuncUsingJoinMethod);
          //totalDisplay
          strValueForTotalDisplayELement(String(sumValue));
          /**
           * we want to save the value in totalDisplay when user pressed number then operator than equal
           * also look at when lastPressed is number
           * **/
          ourObjElement.dataObj.totalDisplayValueForWhenEqualBtnIsLastBtnPressed =
            currentTotalDisplayWithoutCommas;
          break;
        case "equal":
          let bottomDisplayWhenEqualIsPressed =
            ourObjElement.dataObj
              .totalDisplayValueForWhenEqualBtnIsLastBtnPressed;
          //when lastPressed is equal topDisplay will be 5 + 3 =
          // totalDisplay will be sum of 5 + 3
          if (innerTextTopDisplay.length > 3) {
            // when topDisplay length is greater than 3 it will look like: "5 + 3 ="
            // const arrOfValuesWithTwoNumbersOperatorAndEqual =
            //   innerTextTopDisplay.split(" ");
            /**
             * use destructuring
             * **/
            const [leftValue, operatorSign, rightValue, equalSign] =
              innerTextTopDisplay.split(" ");
            let sumTotal = calculationHelperFunc(
              innerTextTopDisplay,
              bottomDisplayWhenEqualIsPressed
            );
            // update displays
            // build array for topDisplay
            const strOfValuesFromArrayUsingJoinMethod = [
              currentTotalDisplayWithoutCommas,
              operatorSign,
              bottomDisplayWhenEqualIsPressed,
              equalSign,
            ].join(" ");
            strValueForKeyPressedDisplayElement(
              strOfValuesFromArrayUsingJoinMethod
            );
            // total display
            //convert sumTotal to string
            //totalDisplay
            strValueForTotalDisplayELement(String(sumTotal));
          }
          break;
      }
    }
  }

  function operatorButtonPressed(operatorInput, lastPressedBtn) {
    //   switch operatorKeyPressed from false to true when user click on operator btn this is for delete key functionality
    ourObjElement.dataObj.operatorKeyPressed = true;
    //   when user click on an operator(+,-,/,x)
    //we will display the value enter before clicking on an operator
    //with the operator clicked to operatorKeyPressedDisplay element
    // topDisplay
    const valueOfDisplayAboveTotal = operatorKeyPressedDisplay.innerText;
    // totalDisplay without commas
    const strOfNumberBtnPressed = operatorAndEqualBtnPressedDisplayHelperFunc();
    // const currentTotalDisplay = utilityStrFunc();
    console.log(ourObjElement.dataObj.clickedBtns);
    console.log(lastPressedBtn);
    if (valueOfDisplayAboveTotal === "") {
      operatorKeyPressedDisplay.innerText =
        strOfNumberBtnPressed + ` ${operatorInput}`;
    } else {
      // when we get here the display above totalDisplay is not empty
      switch (lastPressedBtn) {
        case "operator":
          //lastPressedBtn is x,/,+,-
          const arrOfValueAndOperator = valueOfDisplayAboveTotal.split(" ");

          //   replace current operator on display with operator user click
          //when user already click numbers and clicked an operator
          arrOfValueAndOperator[1] = operatorInput;
          const strForDisplayWithChangedOperator =
            arrOfValueAndOperator.join(" ");
          operatorKeyPressedDisplay.innerText =
            strForDisplayWithChangedOperator;
          break;
        case "number":
          console.log(lastPressedBtn);
          //topDisplay will look like 10 + bottom display will be another number 8
          const sumValue = calculationHelperFunc(valueOfDisplayAboveTotal);
          switch (operatorInput) {
            case "x":
              displayHelperFuncForOperatorCalculation(sumValue, "x");
              break;
            case "/":
              displayHelperFuncForOperatorCalculation(sumValue, "/");
              break;
            case "+":
              displayHelperFuncForOperatorCalculation(sumValue, "+");
              break;
            case "-":
              displayHelperFuncForOperatorCalculation(sumValue, "-");
              break;
          }
          break;
        case "equal":
          //lastPressedBtn is =
          const strPassedToTopDisplayFunc = `${strOfNumberBtnPressed} ${operatorInput}`;
          strValueForKeyPressedDisplayElement(strPassedToTopDisplayFunc);
          console.log("equal pressed");
          break;
      }
    }
  }

  function calculationHelperFunc(
    topDisplayValue,
    savedValueForEqualBtnPressed
  ) {
    console.log(
      "how do we want to handle when user click equal after a calculation is processed"
    );
    console.log("savedValueForEqualBtnPressed parameter will be a str value");
    // const currentNumInTotalDisplay = utilityStrFunc();
    // want to work with valueOfTotalDisplay without comma
    const currentTotalDisplayWithoutCommas =
      operatorAndEqualBtnPressedDisplayHelperFunc();
    let sumValue;
    //passing in str "8 +"
    //array will be ["8","+"]
    if (topDisplayValue.length <= 3) {
      const [numValue, operatorValue] = topDisplayValue.split(" ");
      sumValue = calculationFunc(
        numValue,
        currentTotalDisplayWithoutCommas,
        operatorValue
      );
    }
    if (topDisplayValue.length > 3) {
      // topDisplayValue will be "5 + 3 =".split(" "); the array will be ["5","+","3","="]
      //we just want the first two values in array
      const [, operatorSign] = topDisplayValue.split(" ");
      sumValue = calculationFunc(
        currentTotalDisplayWithoutCommas,
        savedValueForEqualBtnPressed,
        operatorSign
      );
    }
    /** 
       * first approach
       * switch (operatorValue) {
        case "x":
          sumValue = multiplyFunctionality(
            Number(numValue),
            Number(currentTotalDisplayWithoutCommas)
          );

          break;
        case "/":
          sumValue = divisionFunctionality(
            Number(numValue),
            Number(currentTotalDisplayWithoutCommas)
          );
          break;
        case "+":
          sumValue = addFunctionality(
            Number(numValue),
            Number(currentTotalDisplayWithoutCommas)
          );
          break;
        case "-":
          sumValue = minusFunctionality(
            Number(numValue),
            Number(currentTotalDisplayWithoutCommas)
          );
          break;
      }
       * 
       * **/

    return sumValue;

    //update topDisplay with sum and current operator btn pressed
    //when arithmeticOrEqualSign is an operator(x,/,+,-) topDisplay will be number operator
    //when arithmeticOrEqualSign is equal(=) topDisplay will be numValue operator currentNumInTotalDisplay =
    //totalDisplay will be the sumValue
    /***** going with different approach *****/
    /*if (arithmeticOrEqualSign === "=") {
      const arrOfEqualSumAndArithmeticStr = [
        String(sumValue),
        operatorValue,
        currentNumInTotalDisplay,
        arithmeticOrEqualSign,
      ];
      const convertArrWithEqualSignToStringForTopDisplay =
        arrOfEqualSumAndArithmeticStr.join(" ");
      //topDisplay
      strValueForKeyPressedDisplayElement(
        convertArrWithEqualSignToStringForTopDisplay
      );
      //totalDisplay
      strValueForTotalDisplayELement(String(sumValue));
    } else {
    }
    */
  }

  function calculationFunc(leftValue, rightValue, operatorSign) {
    let totalValue;

    switch (operatorSign) {
      case "x":
        totalValue = multiplyFunctionality(
          Number(leftValue),
          Number(rightValue)
        );
        break;
      case "/":
        totalValue = divisionFunctionality(
          Number(leftValue),
          Number(rightValue)
        );
        break;
      case "+":
        totalValue = addFunctionality(Number(leftValue), Number(rightValue));
        break;
      case "-":
        totalValue = minusFunctionality(Number(leftValue), Number(rightValue));
        break;
    }

    return totalValue;
  }

  function displayHelperFuncForOperatorCalculation(sumInput, arithmeticSign) {
    const arrOfSumAndArithmeticString = [String(sumInput), arithmeticSign];
    const convertArrToStringForTopDisplay =
      arrOfSumAndArithmeticString.join(" ");
    //topDisplay
    strValueForKeyPressedDisplayElement(convertArrToStringForTopDisplay);
    //totalDisplay
    strValueForTotalDisplayELement(String(sumInput));
  }

  function operatorAndEqualBtnPressedDisplayHelperFunc() {
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
      // setting ourObjElement.dataObj.operatorKeyPressed = false to make our delete btn func
      //work
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
        case lengthOfArrOfOnlyNumValues >= 9 &&
          lengthOfArrOfOnlyNumValues <= 12:
          workingWithDisplayLengthOfMoreThanNineLessThanTwelve(
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
      const currentTotalDisplay = utilityStrFunc();
      const arrForCompositionFunc = splitStrAddKeyPressedToArrForDisplay(
        currentTotalDisplay,
        buttonPressedInput
      );
      // composition func
      convertArrToStrAndDisplayValueInApp(
        strValueForTotalDisplayELement,
        convertArrOfValuesToStrUsingJoinMethod,
        arrForCompositionFunc
      );
    }
    //   user clicked on number and last clicked btn is "delete" and totalDisplay is "0"
    if (lastPressedBtn == "delete" && currentStrTotalDisplay === "0") {
      strValueForTotalDisplayELement(buttonPressedInput);
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
    // user pressed equal
    if (lastPressedBtn == "equal") {
      const ourConditionBasedOnCalculation =
        ourObjElement.dataObj.totalDisplayValueForWhenEqualBtnIsLastBtnPressed;
      // conditions
      // user pressed number btn then operator then pressed equal
      // topDisplay 5 +
      //totalDisplay 3
      /**
       * user click on equal btn
       * we will get below
       *  **/
      //topDisplay will be leftValue operator valueOfTotalDisplay equal =
      //5 + 3 =
      //totalDisplay will be sumValue
      //check our conditions
      if (ourConditionBasedOnCalculation) {
        //if ourConditionBasedOnCalculation is not null or undefined we will enter this if block
        // topDisplay will be empty string
        strValueForKeyPressedDisplayElement(buttonPressedInput);
        // totalDisplay
        strValueForTotalDisplayELement(buttonPressedInput);
      }
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

  function workingWithDisplayLengthOfMoreThanNineLessThanTwelve(
    arrInput,
    lengthInput,
    keyPressed
  ) {
    const copyArrInput = arrInput.slice();
    // const copyArrInput = [].concat(arrInput);
    // const copyArrInput = [...arrInput];

    switch (lengthInput) {
      case 10:
        //[1,2,3,4,5,6,7,8,9,10] with btn user click we will make a display of 12,345,678,978
        const [
          firstValue,
          secondValue,
          thirdValue,
          fourthValue,
          fifthValue,
          sixthValue,
          sevenValue,
          eighthValue,
          ninthValue,
          tenthValue,
        ] = copyArrInput;

        const valuesAndCommasArray = [
          firstValue,
          secondValue,
          ",",
          thirdValue,
          fourthValue,
          fifthValue,
          ",",
          sixthValue,
          sevenValue,
          eighthValue,
          ",",
          ninthValue,
          tenthValue,
          keyPressed,
        ];

        convertArrToStrAndDisplayValueInApp(
          strValueForTotalDisplayELement,
          convertArrOfValuesToStrUsingJoinMethod,
          valuesAndCommasArray
        );

        break;
      case 11:
        const [
          firstStr,
          secondStr,
          thirdStr,
          fourthStr,
          fifthStr,
          sixthStr,
          sevenStr,
          eighthStr,
          ninthStr,
          tenthStr,
          eleventhStr,
        ] = copyArrInput;

        const arrayOfValAndCommas = [
          firstStr,
          secondStr,
          thirdStr,
          ",",
          fourthStr,
          fifthStr,
          sixthStr,
          ",",
          sevenStr,
          eighthStr,
          ninthStr,
          ",",
          tenthStr,
          eleventhStr,
          keyPressed,
        ];

        convertArrToStrAndDisplayValueInApp(
          strValueForTotalDisplayELement,
          convertArrOfValuesToStrUsingJoinMethod,
          arrayOfValAndCommas
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
  // if topDisplay has number and operator and operatorKeyPressed is false
  //it means user click on number btn then one of the operator
  //then click on another number btn. that will explains why operatorKeyPressed will be false
  //because in our number btn func we set operatorKeyPressed to false when user click on btn
  function addFunctionality(leftOfOperand, rightOfOperand) {
    // values passed into this function will be number type
    const addBothOperand = leftOfOperand + rightOfOperand;
    return String(addBothOperand);
  }
  function minusFunctionality(leftOfOperand, rightOfOperand) {
    // values passed into this function will be number type
    const subtractBothOperand = leftOfOperand - rightOfOperand;
    return String(subtractBothOperand);
  }
  function multiplyFunctionality(leftOfOperand, rightOfOperand) {
    // values passed into this function will be number type
    const multiplyBothOperand = leftOfOperand * rightOfOperand;
    return String(multiplyBothOperand);
  }
  function divisionFunctionality(leftOfOperand, rightOfOperand) {
    // values passed into this function will be number type
    const divideBothOperand = leftOfOperand / rightOfOperand;
    return String(divideBothOperand);
  }

  // convert display value (string type) in to number type
  function convertDisplayNumberInputToNumberType(strType) {
    const convertedStrToNumType = Number(strType);

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

  function splitStrAddKeyPressedToArrForDisplay(strInput, keyPressed) {
    const arrOfChars = strInput.split("");
    arrOfChars.push(keyPressed);

    return arrOfChars;
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

  function strValueForKeyPressedDisplayElement(strInput) {
    operatorKeyPressedDisplay.innerText = strInput;
  }

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
