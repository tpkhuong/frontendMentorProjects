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
    /**
     * which properties do we want to set back to default values when reset btn is pressed
     * run this func when reset btn is clicked
     * **/
    ourObjElement.dataObj = {
      arrOfOperators: ["x", "/", "+", "-"],
      clickedBtns: [],
      previousClickedBtn: "",
      currentTotal: 0,
      totalDisplayValueForWhenEqualBtnIsLastBtnPressed: null,
      operatorSignUsedForCalcWhenTopDisplayIsEmpty: null,
      calcFuncExecutedByEqualBtn: false,
      clearTopDisplayAfterCalcFuncCalled: false,
      /**
       * saveTopDisplay for calc func when our algorithm runs calc func
       * then user click delete btn, making topDisplay an empty ""
       * **/
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

  // using arrow keys
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
      default:
        keyboardFunctionalityNumberPad(keyPressed);
    }
  }

  /** using keys on number pad **/

  function keyboardFunctionalityNumberPad(keyBtnPressed) {
    /**
     * instead of have our callback func in the addEventListener
     * run our keyboard arrow btn pressed or keys on number pad func we will call this func inside of keyboardKeyPadMovement
     * listen to see if a key on the number pad is pressed and backspace(for delete feature)
     * **/
    /**
     * we will change "*" to "x"
     * dont need to change backspace to "DEL" because we are not passing in "DEL"
     * to any func call
     * **/
    /**
     * get previous clicked element
     * **/
    lastItemClicked();
    const previousClickedBtn = ourObjElement.dataObj.previousClickedBtn;
    let numberKeyPadPressed;
    // if (keyBtnPressed == "*") {
    //   numberKeyPadPressed = "x";
    // } else {
    //   numberKeyPadPressed = keyBtnPressed;
    // }
    /**
     * figure out how to change Backspace to "delete"
     * "Enter" to "equal"
     * here or inside our equalBtnPressed we can add a case "Enter" for "equal" algorithm and
     * "Backspace" for "delete"
     * NEVERMIND we were passing in two values/arguments our equalBtn and deletebtn func only takes one value/argument
     * just need to pass in previousClickedBtn to equalBtn and deleteBtn func
     * **/
    /**
     * ternary operator
     * **/
    keyBtnPressed == "*"
      ? (numberKeyPadPressed = "x")
      : (numberKeyPadPressed = keyBtnPressed);

    switch (numberKeyPadPressed) {
      /**
       * operator
       * **/
      case "/":
      case "x":
      case "+":
      case "-":
        console.log("operator", numberKeyPadPressed);
        ourObjElement.dataObj.clickedBtns.push("operator");
        operatorButtonPressed(numberKeyPadPressed, previousClickedBtn);
        break;
      /**
       * number
       * **/
      case "9":
      case "8":
      case "7":
      case "6":
      case "5":
      case "4":
      case "3":
      case "2":
      case "1":
      case "0":
        console.log("number", numberKeyPadPressed);
        ourObjElement.dataObj.clickedBtns.push("number");
        numberKeyPressed(numberKeyPadPressed, previousClickedBtn);
        break;
      /**
       * decimal
       * **/
      case ".":
        console.log("decimal", numberKeyPadPressed);
        ourObjElement.dataObj.clickedBtns.push("decimal");
        decimalButtonPressed();
        break;
      /**
       * backspace
       * **/
      case "Backspace":
        console.log("delete/backspace", numberKeyPadPressed);
        ourObjElement.dataObj.clickedBtns.push("delete");
        deleteButtonPressed(previousClickedBtn);
        break;
      /**
       * enter/equal
       * **/
      case "Enter":
        console.log("enter", numberKeyPadPressed);
        ourObjElement.dataObj.clickedBtns.push("equal");
        equalButtonPressed(previousClickedBtn);
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
    //because we will add it back based on the length of display
    const topDisplay = topDisplayStrFunc();
    const savedTotalDisplayValueForEqualFunc =
      ourObjElement.dataObj.totalDisplayValueForWhenEqualBtnIsLastBtnPressed;
    const savedOperatorSignForEqualFunc =
      ourObjElement.dataObj.operatorSignUsedForCalcWhenTopDisplayIsEmpty;
    const booleanValueOfCleatTopDisplay =
      ourObjElement.dataObj.clearTopDisplayAfterCalcFuncCalled;
    const currentTotalDisplay = utilityStrFunc();
    const arrOfDisplayValuesWithoutComma = currentTotalDisplay.match(/\d/gi);
    //the displayTotal contain decimal
    const decimalInTotalDisplay = currentTotalDisplay.includes(".");
    const operatorNotPressed = ourObjElement.dataObj.operatorKeyPressed;
    const calcFuncExecutedInEqualBtnFunc =
      ourObjElement.dataObj.calcFuncExecutedByEqualBtn;
    /**
     * when calcFuncExecutedByEqualBtn is true and lastPressedBtn is equal set topDisplay to empty string
     * **/
    if (lastPressedBtn == "equal" && calcFuncExecutedInEqualBtnFunc) {
      /**
       * thinking about saving the topDisplay before we set it to an empty string
       * we will need a reference to the topDisplay to run calcFunc when user click delete then enter a new number for display(totalDisplay)
       * ex: 808 + 10 =
       * then user under a number to display(totalDisplay) before pressing enter or clicking on equal btn.80
       * replace 808 with 80
       * top will look like 80 + 10 =
       * after we run calc func
       * **/
      operatorKeyPressedDisplay.innerText = "";
      /**
       * keep track of when user clear topDisplay which will happen when user run calc func then hit delete btn
       * **/
      ourObjElement.dataObj.clearTopDisplayAfterCalcFuncCalled = true;
      return;
    }
    /**
     * when user clicked "equal" then delete but click "delete" again
     * we want to do nothing
     * we could check for lastPressedBtn == to "delete" && calcFuncExecutedInEqualBtnFunc is truthy
     * rethink this algorithm
     * this if statement will always run once user click equal btn because when equal btn is clicked calcFuncExecutedInEqualBtnFunc will be assign boolean true
     * if (lastPressedBtn == "delete" && calcFuncExecutedInEqualBtnFunc) {
      return;
      }
      we will check if saveTotalDisplayValueForEqualFunc && savedOperatorSignForEqualFunc is not null && topDisplay is empty string
      if that is the case do nothing
     * **/
    if (
      topDisplay === "" &&
      savedTotalDisplayValueForEqualFunc != null &&
      savedOperatorSignForEqualFunc != null &&
      booleanValueOfCleatTopDisplay
    ) {
      return;
    }
    /**
     * break
     *  **/
    //when operatorKeyPressed is false we want to delete the last value of totalDisplayStr
    //when user click on a number btn we set ourObjElement.dataObj.operatorKeyPressed to false
    //which will take us into this if statement block
    /**
     * only time we dont run this if statement is when user click on operatorBtn
     * **/
    if (!operatorNotPressed) {
      // how to deal with commas in operator
      //get length of displayStr
      //when length is 1. display is "3"
      /**
       * moving this algorithm into its own func to be reused
       * **/
      debugger;
      deleteHelperFunc(
        arrOfDisplayValuesWithoutComma,
        decimalInTotalDisplay,
        currentTotalDisplay
      );

      /*
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
      */
    }

    /**
     * could just have a return statement in an else block
     * **/
  }

  function deleteHelperFunc(
    arrOfValuesWithoutComma,
    decimalInDisplayBoolean,
    totalDisplay
  ) {
    if (arrOfValuesWithoutComma.length == 1) {
      strValueForTotalDisplayELement("0");
    }

    if (
      (arrOfValuesWithoutComma.length > 1 &&
        arrOfValuesWithoutComma.length <= 3) ||
      decimalInDisplayBoolean
    ) {
      // const arrOfStrValues = currentTotalDisplay.split("");
      const arrOfStrValues = [...totalDisplay];
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
    if (arrOfValuesWithoutComma.length >= 4 && !decimalInDisplayBoolean) {
      deleteButtonDealingWithLengthOfTotalDisplay(arrOfValuesWithoutComma);
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
    declareOurDataObj();
  }

  function equalButtonPressed(lastPressedBtn) {
    /**
     * saved values
     * **/
    const savedTotalDisplayValue =
      ourObjElement.dataObj.totalDisplayValueForWhenEqualBtnIsLastBtnPressed;
    const savedOperatorSign =
      ourObjElement.dataObj.operatorSignUsedForCalcWhenTopDisplayIsEmpty;
    console.log(ourObjElement);
    /*****
     * break
     *  *****/
    const innerTextTopDisplay = topDisplayStrFunc();
    const [currentTotalDisplayWithoutCommas, totalDisplayWithCommaAndDecimal] =
      operatorAndEqualBtnPressedDisplayHelperFunc();
    /**
     * totalDisplay will be different for equal and operator btn pressed when there is a decimal
     * **/
    const checkingForDecimal = utilityStrFunc();
    if (checkingForDecimal.includes(".")) {
      convertArrToStrAndDisplayValueInApp(
        strValueForTotalDisplayELement,
        convertArrOfValuesToStrUsingJoinMethod,
        totalDisplayWithCommaAndDecimal
      );
    }
    if (innerTextTopDisplay === "") {
      if (savedTotalDisplayValue == null && savedOperatorSign == null) {
        /**
         * display when both savedTotalDisplay and savedOperatorSign are null
         * **/
        /**
         * working with decimal
         * put in stand alone func
         * **/

        handleTopDisplayWithZerosCommasAndDecimal(
          currentTotalDisplayWithoutCommas,
          "="
        );
        // if (currentTotalDisplayWithoutCommas.includes(".")) {
        //   const arrOfNumValues =
        //     currentTotalDisplayWithoutCommas.innerText.match(/\d/gi)
        //   const arrContainAllZeros = arrOfNumValues.every(function findAllZeros(
        //     eachStr
        //   ) {
        //     return eachStr === "0";
        //   });

        //   // if arrOfNumVales contain all zeros arrContainAllZeros identifier will be true
        //   if (arrContainAllZeros) {
        //     console.log("here");
        //     strValueForKeyPressedDisplayElement("0 =");
        //   } else {
        //     strValueForKeyPressedDisplayElement(
        //       `${currentTotalDisplayWithoutCommas} =`
        //     );
        //   }
        // }
        // strValueForKeyPressedDisplayElement(
        //   `${currentTotalDisplayWithoutCommas} =`
        // );
      }

      // operatorKeyPressedDisplay.innerText = currentTotalDisplayWithoutCommas;
      // our other condition
      // when user pressed number operator then equal
      // or when user pressed number operator number then equal
      // both condition will give us a sum
      // then when user click number it will make topDisplay empty
      // we will check that too
      /**
       * best to check if these properties/keys in our object
       * have values assigned to them
       * totalDisplayValueForWhenEqualBtnIsLastBtnPressed
       * operatorSignUsedForCalcWhenTopDisplayIsEmpty
       * here.
       * when we had our algorithm in the else statement it was never going to enter the if statement block because
       * when our topDisplay is an empty "" js will enter this if statement
       * **/
      /**
       * check if topDisplay is empty
       * if totalDisplayValueForWhenEqualBtnIsLastBtnPressed is not null or undefined
       * when we enter this if statement block it eiter means user pressed operator then number
       * in our algorithm when user pressed number btn it set ourObjElement.dataObj.operatorButtonPressed to false
       * const savedValueOfTotalDisplay =
        ourObjElement.dataObj.totalDisplayValueForWhenEqualBtnIsLastBtnPressed;
       * **/
      if (savedTotalDisplayValue != null && savedOperatorSign != null) {
        /**
         * this if block will also run when user runs calc func then click delete making topDisplay empty string
         * then click a number then click equal to run calc func
         * &&
         * then click equal/enter to run calc func
         * WORKS!!!
         * **/
        debugger;
        // when we get here topDisplay is empty
        //totalDisplay will be the number(s) user pressed
        //take totalDisplay and pass it to calculation func
        //after we get sum from calculation func
        const totalValue = calculationFunc(
          currentTotalDisplayWithoutCommas,
          savedTotalDisplayValue,
          savedOperatorSign
        );
        //topDisplay will be currValue in totalDisplay operatorSign savedValueOfTotalDisplay from previous calc equal sign
        const convertArrToStrUsingJoinMethod = [
          currentTotalDisplayWithoutCommas,
          savedOperatorSign,
          savedTotalDisplayValue,
          "=",
        ].join(" ");
        strValueForKeyPressedDisplayElement(convertArrToStrUsingJoinMethod);
        //totalDisplay will be totalValue
        /**
         * run addCommaTotalDisplayWithDecimalAfterCalculation passing sumInput here
         * **/
        const commaAddedToTotalDisplayStr =
          addCommaTotalDisplayWithDecimalAfterCalculation(totalValue);
        const convertToStringForDisplay = commaAddedToTotalDisplayStr.join("");
        strValueForTotalDisplayELement(convertToStringForDisplay);
      }
    } else {
      // topDisplay
      const [leftValue, operatorOrEqualSign] = innerTextTopDisplay.split(" ");
      // const currentTotalDisplayWithoutCommas = utilityStrFunc(); declaring a identifier with valuesOfTotalDisplayWithoutCommas
      // when top display is not empty it means user click on a number then operator or
      //use click on equal btn
      switch (lastPressedBtn) {
        case "number":
          if (
            !ourObjElement.dataObj.operatorButtonPressed &&
            operatorOrEqualSign == "="
          ) {
            // if user has not clicked on operator btn and last pressed btn is a number
            //update left side of = with currentTotalDisplayWithoutCommas
            strValueForKeyPressedDisplayElement(
              `${currentTotalDisplayWithoutCommas} =`
            );
          }
          /**
           * better condition when topDisplay is 5 +
           * totalDisplay is 3
           * means user pressed 5 then + then 3
           *  **/
          //if use click on number then operator then another number for calculation
          //that would set ourObjElement.dataObj.operatorButtonPressed to false
          //we would enter this if statement
          // topDisplay: 5 +
          //totalDisplay: 3 then user hit equal
          // operatorSign identifier is from const [leftValue, operatorSign] = innerTextTopDisplay.split(" ");
          if (
            !ourObjElement.dataObj.operatorButtonPressed &&
            operatorOrEqualSign != "="
          ) {
            // when we get here operatorOrEqualSign will be an operator sign
            const operatorSign = operatorOrEqualSign;
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
            /**
             * run addCommaTotalDisplayWithDecimalAfterCalculation passing sumInput here
             * **/
            const commaAddedToSumValueForTotalDisplay =
              addCommaTotalDisplayWithDecimalAfterCalculation(sumValue);
            const convertToStringForDisplay =
              commaAddedToSumValueForTotalDisplay.join("");
            strValueForTotalDisplayELement(convertToStringForDisplay);
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
            /**
             * make a property on ourObjElement set it to true when we git equal and perform calc func
             * and equal btn is pressed. set topDisplay to empty string
             * this is for delete btn.
             * **/
            ourObjElement.dataObj.calcFuncExecutedByEqualBtn = true;
          }
          break;
        case "operator":
          const operatorSign = operatorOrEqualSign;
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
          /**
           * run addCommaTotalDisplayWithDecimalAfterCalculation passing sumInput here
           * **/
          const commaAddedForTotalDisplay =
            addCommaTotalDisplayWithDecimalAfterCalculation(sumValue);
          const convertToStringForDisplay = commaAddedForTotalDisplay.join("");
          strValueForTotalDisplayELement(convertToStringForDisplay);
          /**
           * we want to save the value in totalDisplay when user pressed number then operator than equal
           * also look at when lastPressed is number
           * **/
          ourObjElement.dataObj.totalDisplayValueForWhenEqualBtnIsLastBtnPressed =
            currentTotalDisplayWithoutCommas;
          /**
           * save operator sign pressed
           * **/
          ourObjElement.dataObj.operatorSignUsedForCalcWhenTopDisplayIsEmpty =
            operatorSign;
          break;
        case "equal":
          debugger;
          let bottomDisplayWhenEqualIsPressed =
            ourObjElement.dataObj
              .totalDisplayValueForWhenEqualBtnIsLastBtnPressed;
          //when lastPressed is equal topDisplay will be 5 + 3 =
          // totalDisplay will be sum of 5 + 3
          /**
           * lets check for the equal sign instead of length of topDisplay text
           * **/
          const arrOfValuesForConditional = innerTextTopDisplay.split(" ");
          const lengthOfarrOfValuesForConditional =
            arrOfValuesForConditional.length;
          const lastValueOfArr =
            arrOfValuesForConditional[lengthOfarrOfValuesForConditional - 1];
          if (lastValueOfArr == "=") {
            // when topDisplay length is greater than 3 it will look like: "5 + 3 ="
            // const arrOfValuesWithTwoNumbersOperatorAndEqual =
            //   innerTextTopDisplay.split(" ");
            /**
             * use destructuring
             * **/
            const [leftValue, operatorSign, rightValue, equalSign] =
              innerTextTopDisplay.split(" ");
            /**
             * save operator sign pressed
             * **/
            ourObjElement.dataObj.operatorSignUsedForCalcWhenTopDisplayIsEmpty =
              operatorSign;
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
            /**
             * run addCommaTotalDisplayWithDecimalAfterCalculation passing sumInput here
             * **/
            const commaAddedToSumTotalForTotalDisplay =
              addCommaTotalDisplayWithDecimalAfterCalculation(sumTotal);
            const convertToStringForDisplay =
              commaAddedToSumTotalForTotalDisplay.join("");
            strValueForTotalDisplayELement(convertToStringForDisplay);
          }
          /**
           * if innerTextTopDisplay.length is equal or less than 3 do nothing
           * **/
          // if (innerTextTopDisplay.length <= 3) {
          // //topDisplay
          //   strValueForKeyPressedDisplayElement;
          //   //totalDisplay
          //   strValueForTotalDisplayELement;
          // }
          /**
           * save operatorSign pressed
           * **/
          // ourObjElement.dataObj.operatorSignUsedForCalcWhenTopDisplayIsEmpty =
          //   operatorSign;
          break;
      }
    }
  }

  // func to handle when totalDisplay is 0.00000 or just zeros, commas, and decimal
  //made this func to work with equal or operator sign
  function handleTopDisplayWithZerosCommasAndDecimal(
    totalDisplayString,
    operatorOrEqualSign
  ) {
    const arrOfNumValues = totalDisplayString.match(/\d/gi);
    const arrContainAllZeros = arrOfNumValues.every(function findAllZeros(
      eachStr
    ) {
      return eachStr === "0";
    });

    // if arrOfNumVales contain all zeros arrContainAllZeros identifier will be true
    if (arrContainAllZeros) {
      console.log("here");
      strValueForKeyPressedDisplayElement(`0 ${operatorOrEqualSign}`);
    } else {
      strValueForKeyPressedDisplayElement(
        `${totalDisplayString} ${operatorOrEqualSign}`
      );
    }
  }

  /*

convertArrToStrAndDisplayValueInApp(
          strValueForTotalDisplayELement,
          convertArrOfValuesToStrUsingJoinMethod,
          arrayOfValAndCommas
        );

*/

  function operatorButtonPressed(operatorInput, lastPressedBtn) {
    // totalDisplayOperatorAndEqualBtnDecimalHelperFunc;
    //   switch operatorKeyPressed from false to true when user click on operator btn this is for delete key functionality
    ourObjElement.dataObj.operatorKeyPressed = true;
    //   when user click on an operator(+,-,/,x)
    //we will display the value enter before clicking on an operator
    //with the operator clicked to operatorKeyPressedDisplay element
    // topDisplay
    const valueOfDisplayAboveTotal = operatorKeyPressedDisplay.innerText;
    // totalDisplay without commas for calculation
    const [strOfNumberBtnPressed, totalDisplayWithCommaAndDecimal] =
      operatorAndEqualBtnPressedDisplayHelperFunc();
    // const currentTotalDisplay = utilityStrFunc();
    // totalDisplay with commas and decimal for display
    //run if totalDisplay includes decimal
    const checkForDecimalTotalDisplay = utilityStrFunc();
    if (checkForDecimalTotalDisplay.includes(".")) {
      convertArrToStrAndDisplayValueInApp(
        strValueForTotalDisplayELement,
        convertArrOfValuesToStrUsingJoinMethod,
        totalDisplayWithCommaAndDecimal
      );
    }
    console.log(ourObjElement.dataObj.clickedBtns);
    console.log(lastPressedBtn);
    if (valueOfDisplayAboveTotal === "") {
      // operatorKeyPressedDisplay.innerText =
      //   strOfNumberBtnPressed + ` ${operatorInput}`;
      handleTopDisplayWithZerosCommasAndDecimal(
        strOfNumberBtnPressed,
        operatorInput
      );
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
    // const currentNumInTotalDisplay = utilityStrFunc();
    // want to work with valueOfTotalDisplay without comma
    const [currentTotalDisplayWithoutCommas] =
      operatorAndEqualBtnPressedDisplayHelperFunc();
    let sumValue;
    /**
     * shouldn't have algorithm run based on length of topDisplayValue
     * **/
    const arrOfValuesWithEitherOperatorOrEqualSign = topDisplayValue.split(" ");
    const lengthOfArrOfValuesEitherOperatorOrEqual =
      arrOfValuesWithEitherOperatorOrEqualSign.length;
    const lastItemInArr =
      arrOfValuesWithEitherOperatorOrEqualSign[
        lengthOfArrOfValuesEitherOperatorOrEqual - 1
      ];
    /**
     * different approach
     * **/
    // topDisplayValue will be "5 + 3 =".split(" "); the array will be ["5","+","3","="]
    //we just want the first two values in array
    if (lastItemInArr == "=") {
      const [, operatorSign] = topDisplayValue.split(" ");
      sumValue = calculationFunc(
        currentTotalDisplayWithoutCommas,
        savedValueForEqualBtnPressed,
        operatorSign
      );
    } else {
      //passing in str "8 +"
      //array will be ["8","+"]
      /**
       * different approach
       * **/
      const [numValue, operatorValue] = topDisplayValue.split(" ");
      sumValue = calculationFunc(
        numValue,
        currentTotalDisplayWithoutCommas,
        operatorValue
      );
    }
    // if (topDisplayValue.length <= 3) {
    //   const [numValue, operatorValue] = topDisplayValue.split(" ");
    //   sumValue = calculationFunc(
    //     numValue,
    //     currentTotalDisplayWithoutCommas,
    //     operatorValue
    //   );
    // }
    // if (topDisplayValue.length > 3) {
    //   // topDisplayValue will be "5 + 3 =".split(" "); the array will be ["5","+","3","="]
    //   //we just want the first two values in array

    //   const [, operatorSign] = topDisplayValue.split(" ");
    //   sumValue = calculationFunc(
    //     currentTotalDisplayWithoutCommas,
    //     savedValueForEqualBtnPressed,
    //     operatorSign
    //   );
    // }
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
    /**
     * run addCommaTotalDisplayWithDecimalAfterCalculation passing sumInput here
     * **/
    const commaAddedToSumInputForDisplayHelperFunc =
      addCommaTotalDisplayWithDecimalAfterCalculation(sumInput);
    const convertToStringForDisplay =
      commaAddedToSumInputForDisplayHelperFunc.join("");
    strValueForTotalDisplayELement(convertToStringForDisplay);
  }

  /**
   * add comma to totalDisplay after running calculation func
   * **/

  function addCommaTotalDisplayWithDecimalAfterCalculation(totalValueInput) {
    /** trailing zeros will be taken cared of before we run calc func  **/
    /** totalValueInput is already in string form. our add,subtract,multiple,divide func return a string value**/
    const convertTotalValueFromNumToString = totalValueInput;
    const arrOfValuesWithDecimalOrWithoutDecimal = [
      ...convertTotalValueFromNumToString,
    ];
    /** handle when totalValueInputNumForm has not decimal **/
    const indexOfDecimal = arrOfValuesWithDecimalOrWithoutDecimal.indexOf(".");
    if (indexOfDecimal != -1) {
      /**
       * add comma to left side array
       * this array will look like [8,8,8]
       * **/
      const leftOfDecimalTotalDisplay =
        arrOfValuesWithDecimalOrWithoutDecimal.slice(0, indexOfDecimal);
      /**
       * this array will look like [.,8,8]
       * **/
      const rightOfDecimalTotalDisplay =
        arrOfValuesWithDecimalOrWithoutDecimal.slice(indexOfDecimal);
      /** we add commas to our array here. we pass in an array in number form without commas. **/
      const leftOfDecimalWithAddedCommas = addCommaHelperFunc(
        leftOfDecimalTotalDisplay
      );

      return [...leftOfDecimalWithAddedCommas, ...rightOfDecimalTotalDisplay];
    } else {
      /**
       * when we get here it means our value does not have a decimal
       * **/

      const addCommasToArrWithoutDecimal = addCommaHelperFunc(
        arrOfValuesWithDecimalOrWithoutDecimal
      );

      // return array after adding commas
      return addCommasToArrWithoutDecimal;
    }
  }

  function addCommaHelperFunc(arrayInput) {
    const lengthOfArrInput = arrayInput.length;
    let resultArr;
    switch (true) {
      case lengthOfArrInput <= 3:
        /** we had resultArr as result we were assigning [...arrayInput] to result instead of resultArr **/
        resultArr = [...arrayInput];
        break;
      case lengthOfArrInput == 4:
        const [first, second, third, fourth] = arrayInput;
        resultArr = [first, ",", second, third, fourth];
        break;
      case lengthOfArrInput == 5:
        const [firstValue, secondValue, thirdValue, fourthValue, fifth] =
          arrayInput;
        resultArr = [
          firstValue,
          secondValue,
          ",",
          thirdValue,
          fourthValue,
          fifth,
        ];
        break;
      case lengthOfArrInput == 6:
        const [firstVal, secondVal, thirdVal, fourthVal, fifthVal, sixth] =
          arrayInput;
        resultArr = [
          firstVal,
          secondVal,
          thirdVal,
          ",",
          fourthVal,
          fifthVal,
          sixth,
        ];
        break;
      case lengthOfArrInput == 7:
        const [
          firstValStr,
          secondValStr,
          thirdValStr,
          fourthValStr,
          fifthValStr,
          sixthValStr,
          seventh,
        ] = arrayInput;
        resultArr = [
          firstValStr,
          ",",
          secondValStr,
          thirdValStr,
          fourthValStr,
          ",",
          fifthValStr,
          sixthValStr,
          seventh,
        ];
        break;
      case lengthOfArrInput == 8:
        const [
          firstValueStr,
          secondValueStr,
          thirdValueStr,
          fourthValueStr,
          fifthValueStr,
          sixthValueStr,
          seventhValueStr,
          eighth,
        ] = arrayInput;

        resultArr = [
          firstValueStr,
          secondValueStr,
          ",",
          thirdValueStr,
          fourthValueStr,
          fifthValueStr,
          ",",
          sixthValueStr,
          seventhValueStr,
          eighth,
        ];

        break;
      case lengthOfArrInput == 9:
        const [
          firstValueString,
          secondValueString,
          thirdValueString,
          fourthValueString,
          fifthValueString,
          sixthValueString,
          seventhValueString,
          eighthValueString,
          ninth,
        ] = arrayInput;

        resultArr = [
          firstValueString,
          secondValueString,
          thirdValueString,
          ",",
          fourthValueString,
          fifthValueString,
          sixthValueString,
          ",",
          seventhValueString,
          eighthValueString,
          ninth,
        ];

        break;
      case lengthOfArrInput == 10:
        const [
          firstStr,
          secondStr,
          thirdStr,
          fourthStr,
          fifthStr,
          sixthStr,
          seventhStr,
          eighthStr,
          ninthStr,
          tenth,
        ] = arrayInput;

        resultArr = [
          firstStr,
          ",",
          secondStr,
          thirdStr,
          fourthStr,
          ",",
          fifthStr,
          sixthStr,
          seventhStr,
          ",",
          eighthStr,
          ninthStr,
          tenth,
        ];

        break;
      case lengthOfArrInput == 11:
        const [
          firstString,
          secondString,
          thirdString,
          fourthString,
          fifthString,
          sixthString,
          seventhString,
          eighthString,
          ninthString,
          tenthString,
          eleventh,
        ] = arrayInput;

        resultArr = [
          firstString,
          secondString,
          ",",
          thirdString,
          fourthString,
          fifthString,
          ",",
          sixthString,
          seventhString,
          eighthString,
          ",",
          ninthString,
          tenthString,
          eleventh,
        ];

        break;
      case lengthOfArrInput == 12:
        const [
          firstStringValue,
          secondStringValue,
          thirdStringValue,
          fourthStringValue,
          fifthStringValue,
          sixthStringValue,
          seventhStringValue,
          eighthStringValue,
          ninthStringValue,
          tenthStringValue,
          eleventhStringValue,
          twelfth,
        ] = arrayInput;

        resultArr = [
          firstStringValue,
          secondStringValue,
          thirdStringValue,
          ",",
          fourthStringValue,
          fifthStringValue,
          sixthStringValue,
          ",",
          seventhStringValue,
          eighthStringValue,
          ninthStringValue,
          ",",
          tenthStringValue,
          eleventhStringValue,
          twelfth,
        ];
        break;
    }

    return resultArr;
  }

  function operatorAndEqualBtnPressedDisplayHelperFunc() {
    const displayValue = utilityStrFunc();
    // make this work with decimal
    // working with decimal

    const arrOfValuesWithDecimal = topDisplayDecimalHelperFunc(displayValue);
    // totalDisplayWithCommaAndDecimal
    const totalDisplayWithCommaAndDecimal =
      totalDisplayOperatorAndEqualBtnDecimalHelperFunc(displayValue);
    //working without decimal
    const arrOfOnlyNumbersWithoutCommas =
      displayValueWithoutCommas(displayValue);
    const strValueUsedForDisplay = displayValue.includes(".")
      ? arrOfValuesWithDecimal.join("")
      : arrOfOnlyNumbersWithoutCommas.join("");
    return [strValueUsedForDisplay, totalDisplayWithCommaAndDecimal];
  }

  function totalDisplayOperatorAndEqualBtnDecimalHelperFunc(
    totalDisplayString
  ) {
    /**
     * run this when user press operator or equal before running calculation
     *  **/
    /**
     * arr of values with commas and decimal
     *  **/
    const arrOfValuesWithCommaAndDecimal = totalDisplayString.split("");

    return trailingZerosWorkingWithDecimal(arrOfValuesWithCommaAndDecimal);
  }

  function topDisplayDecimalHelperFunc(totalDisplayString) {
    //arr of values with decimal without commas
    const arrOfValuesAndDecimalWithoutCommas =
      displayValueWorkingWithDecimalWithoutCommas(totalDisplayString);

    return trailingZerosWorkingWithDecimal(arrOfValuesAndDecimalWithoutCommas);
  }

  function trailingZerosWorkingWithDecimal(arrInput) {
    /** this func will return an array that depends on the arr input that is passed into this func when it is executed,called,invoked
     * we are calling it in both totalDisplayOperatorAndEqualBtnDecimalHelperFunc where we pass in an array with comma and decimal
     * and topDisplayDecimalHelperFunc where we pass in an array with values and decimal
     * **/
    // //arr of values with decimal
    // const arrOfValuesAndDecimalWithoutCommas =
    //   displayValueWorkingWithDecimalWithoutCommas(totalDisplayString);
    /**
     * arrInput will be an array of ["1",",","2","5","4",".","5","0","0"] or
     * ["1","2","5","4",".","5","0","0"]
     * **/

    //find index of decimal
    const indexOfDecimal = arrInput.indexOf(".");
    //left side of decimal only use if values of right side of decimal is all zeros
    const arrOfLeftSideOfDecimal = arrInput.slice(0, indexOfDecimal);
    //make copy of values right to decimal
    const arrOfRightSideOfDecimal = arrInput.slice(indexOfDecimal + 1);

    //values of right side of array is all zeros
    const booleanArrContainAllZeros = checkIfValuesAreAllZeros(
      arrOfRightSideOfDecimal
    );
    //if that is the case return an array without decimal just the left side. arrOfLeftSideOfDecimal will be an array with values left of decimal
    if (booleanArrContainAllZeros) {
      return arrOfLeftSideOfDecimal;
    } else {
      //want to return an array with left side decimal right side
      const builtRightSideOfDecimal = buildArrRightOfDecimal(
        arrOfRightSideOfDecimal
      );

      //build our array left side of decimal decimal right side of decimal
      return [...arrOfLeftSideOfDecimal, ".", ...builtRightSideOfDecimal];
    }
  }

  function buildArrRightOfDecimal(arrRightSideOfDecimal) {
    // length of right side of decimal for recursive func
    const lengthOfRightSideOfDecimal = arrRightSideOfDecimal.length;

    /**
     * use this index for right side of decimal
     * **/
    let indexForRightSideOfDecimalAlgorithm;
    // if not run recursive func to find index of arr where the value is not a "0"
    //to build an array with the values right of decimal
    trailingZerosHelperFuncRecursive(
      arrRightSideOfDecimal,
      lengthOfRightSideOfDecimal - 1
    );
    //use indexForRightSideOfDecimalAlgorithm to copy arr right side of decimal from 0 index to indexForRightSideOfDecimalAlgorithm + 1
    //we dont want to copy the trailing zeros
    const rightOfDecimalWithoutZeros = arrRightSideOfDecimal.slice(
      0,
      indexForRightSideOfDecimalAlgorithm + 1
    );

    return rightOfDecimalWithoutZeros;

    /** recursive helper func **/

    function trailingZerosHelperFuncRecursive(arrInput, index) {
      // we will send in the right side of the decimal
      //and the right side does not contain all zeros
      const currentValue = arrInput[index];

      if (currentValue !== "0") {
        // each time this return statement is called it will
        //return the index of that function call
        //once currentValue is not "0" it will return that index then the index will increase for each function call return
        /**
         * assign the index to an identifier outside this recursive func
         * **/
        indexForRightSideOfDecimalAlgorithm = index;
        return;
      }

      trailingZerosHelperFuncRecursive(arrInput, index - 1);
    }
  }

  function checkIfValuesAreAllZeros(arrInput) {
    return arrInput.every(function checkForZeros(eachValue) {
      return eachValue === "0";
    });
  }

  function numberKeyPressed(buttonPressedInput, lastPressedBtn) {
    const savedTotalDisplayValueForEqualFunc =
      ourObjElement.dataObj.totalDisplayValueForWhenEqualBtnIsLastBtnPressed;
    const savedOperatorSignForEqualFunc =
      ourObjElement.dataObj.operatorSignUsedForCalcWhenTopDisplayIsEmpty;

    const calcFuncExecuted = ourObjElement.dataObj.calcFuncExecutedByEqualBtn;
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
    /**
     * we also want to assign boolean false to ourObjElement.dataObj.opeartorKeyPressed when topDisplay is empty string and saveTotalDisplayValue
     * and savedOperatorSign is not null
     * **/
    if (
      currentValueOfTopDisplay === "" &&
      savedTotalDisplayValueForEqualFunc != null &&
      savedOperatorSignForEqualFunc != null &&
      calcFuncExecuted
    ) {
      ourObjElement.dataObj.operatorKeyPressed = false;
      ourObjElement.dataObj.calcFuncExecutedByEqualBtn = false;
      /**
       * assign the boolean value of false ourObjElement.dataObj.clearTopDisplayAfterCalcFuncCalled
       * when user pressed or click on a number btn. this way we won't enter our if statement in our deleteBtn algorithm
       * if (
      topDisplay === "" &&
      savedTotalDisplayValueForEqualFunc != null &&
      savedOperatorSignForEqualFunc != null
      ourObjElement.dataObj.clearTopDisplayAfterCalcFuncCalled
      ) {
        return;
      }
      then we will enter our  if (!operatorNotPressed) {} block because the value of operatorNotPressed will be false but we negate that !false
      we will enter the if statement block
       * **/
      ourObjElement.dataObj.clearTopDisplayAfterCalcFuncCalled = false;
      strValueForTotalDisplayELement(buttonPressedInput);
      return;
      // totalDisplayHelperFunc(buttonPressedInput);
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
    if (
      lastPressedBtn == "number" ||
      lastPressedBtn === "" ||
      lastPressedBtn == "reset"
    ) {
      totalDisplayHelperFunc(buttonPressedInput);
      // const displayValue = utilityStrFunc();
      // const arrOfOnlyNumbersWithoutCommas =
      //   displayValueWithoutCommas(displayValue);
      // const lengthOfArrOfOnlyNumValues = arrOfOnlyNumbersWithoutCommas.length;

      // switch (true) {
      //   //   length of 3 or less
      //   case lengthOfArrOfOnlyNumValues <= 3:
      //     workingWithDisplayLengthOfLessThanThree(
      //       lengthOfArrOfOnlyNumValues,
      //       buttonPressedInput,
      //       arrOfOnlyNumbersWithoutCommas
      //     );
      //     break;
      //   //length of 4 to 6
      //   case lengthOfArrOfOnlyNumValues >= 4 && lengthOfArrOfOnlyNumValues <= 6:
      //     workingWithDisplayLengthMoreThanThreeLessThanSeven(
      //       arrOfOnlyNumbersWithoutCommas,
      //       lengthOfArrOfOnlyNumValues,
      //       buttonPressedInput
      //     );
      //     break;
      //   //length of 7 to 9
      //   case lengthOfArrOfOnlyNumValues >= 6 && lengthOfArrOfOnlyNumValues <= 9:
      //     workingWithDisplayLengthOfMoreThanSixLessThanTen(
      //       arrOfOnlyNumbersWithoutCommas,
      //       lengthOfArrOfOnlyNumValues,
      //       buttonPressedInput
      //     );
      //     break;
      //   case lengthOfArrOfOnlyNumValues >= 9 &&
      //     lengthOfArrOfOnlyNumValues <= 12:
      //     workingWithDisplayLengthOfMoreThanNineLessThanTwelve(
      //       arrOfOnlyNumbersWithoutCommas,
      //       lengthOfArrOfOnlyNumValues,
      //       buttonPressedInput
      //     );
      //     break;
      // }
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
    // user pressed equal then pressed number
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
        operatorKeyPressedDisplay.innerText = "";
        // strValueForKeyPressedDisplayElement("");
        // totalDisplay
        strValueForTotalDisplayELement(buttonPressedInput);
      } else {
        strValueForTotalDisplayELement(buttonPressedInput);
      }
    }
  }
  /**
   * use this func for when topDisplay is empty and when topDisplay is empty and savedOperatorSign and savedTotalDisplayValue
   * **/
  function totalDisplayHelperFunc(btnPressed) {
    const displayValue = utilityStrFunc();
    const arrOfOnlyNumbersWithoutCommas =
      displayValueWithoutCommas(displayValue);
    const lengthOfArrOfOnlyNumValues = arrOfOnlyNumbersWithoutCommas.length;

    switch (true) {
      //   length of 3 or less
      case lengthOfArrOfOnlyNumValues <= 3:
        workingWithDisplayLengthOfLessThanThree(
          lengthOfArrOfOnlyNumValues,
          btnPressed,
          arrOfOnlyNumbersWithoutCommas
        );
        break;
      //length of 4 to 6
      case lengthOfArrOfOnlyNumValues >= 4 && lengthOfArrOfOnlyNumValues <= 6:
        workingWithDisplayLengthMoreThanThreeLessThanSeven(
          arrOfOnlyNumbersWithoutCommas,
          lengthOfArrOfOnlyNumValues,
          btnPressed
        );
        break;
      //length of 7 to 9
      case lengthOfArrOfOnlyNumValues >= 6 && lengthOfArrOfOnlyNumValues <= 9:
        workingWithDisplayLengthOfMoreThanSixLessThanTen(
          arrOfOnlyNumbersWithoutCommas,
          lengthOfArrOfOnlyNumValues,
          btnPressed
        );
        break;
      case lengthOfArrOfOnlyNumValues >= 9 && lengthOfArrOfOnlyNumValues <= 12:
        workingWithDisplayLengthOfMoreThanNineLessThanTwelve(
          arrOfOnlyNumbersWithoutCommas,
          lengthOfArrOfOnlyNumValues,
          btnPressed
        );
        break;
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

  function displayValueWorkingWithDecimalWithoutCommas(displayValue) {
    //"88,800.88".match(/[^,]gi/)
    const arrOfDisplayValuesDecimalAndNumbers = displayValue.match(/[^,]/gi);

    return arrOfDisplayValuesDecimalAndNumbers;
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
