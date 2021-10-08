(function scopeOurVaribles() {
  const {
    sectionAppWrapper,
    sliderCircle,
    themeLabelBtnContainer,
    arrOfRadioButtons,
    keysContainer,
    arrofKeyPadButtons,
  } = ourSelectors();
  addEventListenersToElements();
  changeThemeBasedOnSystemThemeChange();

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

  console.log(arrofKeyPadButtons);
  function addEventListenersToElements() {
    window.addEventListener("load", addDarkOrLightThemeClassBasedOnSystemTheme);
    themeLabelBtnContainer.addEventListener(
      "change",
      togleBetweenThemeBasedOnUserInput
    );
    keysContainer.addEventListener("keydown", keyboardKeypadMovement);
    keysContainer.addEventListener("click", TODO);
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

  function togleBetweenThemeBasedOnUserInput(event) {
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
    const arrowKeyPressed = event.key;
    const eventTarget = event.target;

    switch (arrowKeyPressed) {
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
        console.log("here");
        break;
      //   eightKey
      // case:
      // break;
      //   nineKey
      // case:
      // break;
      //   deleteKey
      // case:
      // break;
      //   fourKey
      // case:
      // break;
      //   fiveKey
      // case:
      // break;
      //   sixKey
      // case:
      // break;
      //   addKey
      // case:
      // break;
      //   oneKey
      // case:
      // break;
      //   twoKey
      // case:
      // break;
      //   threeKey
      // case:
      // break;
      //   minusKey
      // case:
      // break;
      //   decimalKey
      // case:
      // break;
      //   zeroKey
      // case:
      // break;
      //   divideKey
      // case:
      // break;
      //   timesKey
      // case:
      // break;
      //   resetKey
      // case:
      // break;
      //   equalKey
      // case:
      // break;
    }
  }
  function arrowRightKeyDown(target) {
    // console.log(target);
    // console.log(document.activeElement);
    switch (target) {
    }
  }
  function arrowDownKeyDown(target) {
    // console.log(target);
    // console.log(document.activeElement);
    switch (target) {
    }
  }
  function arrowUpKeyDown(target) {
    // console.log(target);
    // console.log(document.activeElement);
    switch (target) {
    }
  }

  function TODO(event) {
    console.log(event.target.firstElementChild.textContent);
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
    };
  }
})();
