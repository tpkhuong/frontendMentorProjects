(function scopeOurVariables() {
  //declare our selectors top of func using destructuring
  var { progressBarContainer, circleInsideProgressBar } = ourSelectors();

  function ourSelectors() {
    //progress-bar-wrapper
    var progressBarContainer = document.querySelector(".progress-bar-wrapper");
    //circle of progress bar
    var circleInsideProgressBar = document.querySelector(".circle");
    return {
      progressBarContainer,
      circleInsideProgressBar,
    };
  }

  //call our funcs
  addEventToELement();

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

  function circleElementKeyboardFunctionality(event) {
    console.log(event);
  }

  function removeKeydownEventFromCircleElementAndRemoveFocusoutEventFromProgressBarWrapper(
    event
  ) {
    console.log(event);
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
})();
