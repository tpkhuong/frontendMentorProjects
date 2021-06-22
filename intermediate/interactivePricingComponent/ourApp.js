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

/***** call/invoke our functions *****/
clickEventAddToPricingContainer();
/***** call/invoke our functions *****/

/* toggle between monthly/yearly */

function clickEventAddToPricingContainer() {
  var { pricingContainer } = ourSelectors();

  pricingContainer.addEventListener("click", fireFuncBasedOnElementClicked);
}

function fireFuncBasedOnElementClicked(event) {
  /***** for our toggle button between monthly and yearly billing *****/
  toggleAriaCheckedSwitchBetweenTrueAndFalse(event);
  /***** move .sliderIconWrapper to spot in bar based on if user click on .bar or .bar-wrapper *****/
  sliderMovementClickFeatureBarElement(event);
}

function toggleAriaCheckedSwitchBetweenTrueAndFalse(eventInput) {
  var { toggleBtn } = ourSelectors();
  if (eventInput.target == toggleBtn) {
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
      toggleBtn.attributes["aria-checked"].value = "true";
    } else {
      toggleBtn.attributes["aria-checked"].value = "false";
    }
  } else if (eventInput.target.parentElement == toggleBtn) {
    // clicking the span/circle element
    let parentElementAriaCheckedAttr =
      eventInput.target.parentElement.attributes["aria-checked"].value;
    /***** changing the text between month and year *****/
    changeTextOfBillingMonthOrYear(parentElementAriaCheckedAttr);
    if (parentElementAriaCheckedAttr == "false") {
      toggleBtn.attributes["aria-checked"].value = "true";
    } else {
      toggleBtn.attributes["aria-checked"].value = "false";
    }
  }
}

/* toggle between monthly/yearly */

/* slider feature: move .sliderIconWrapper when user clicked on .bar or .bar-wrapper */
function sliderMovementClickFeatureBarElement(eventInput) {
  // alert("worked!");
  var { barTealElement, barWrapperElement } = ourSelectors();
  console.log(eventInput.layerX);
  //work with layerX
  //check if event.target is .bar or .bar-wrapper
  /* we dont need to add or substract we want .sliderIconWrapper to move to the layerX based on where the user click at bar or bar-wrapper */
  if (eventInput.target == barTealElement) {
    document.documentElement.attributes["style"].value =
      "--slider-movement:" + " " + String(eventInput.layerX) + "px";
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
        "--slider-movement:" + " " + String(barWrapperLayerX) + "px";
    } else {
      //set --slider-movement will be set to event.target.layerX
      document.documentElement.attributes["style"].value =
        "--slider-movement:" + " " + String(barWrapperLayerX) + "px";
    }
  }
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
alert("fun begins add keyboard fuctionality");
keyboardFeatureSliderMovement();
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

testingIdeas();
function testingIdeas() {
  var { sliderIconWrapper } = ourSelectors();
  document.documentElement.style.setProperty(
    "--slider-movement",
    "0px"
    // String(totalAmtPercentage) + "%"
  );
  var sliderContainer = document.querySelector(".slider");
  // use mousedown them mousemove then mouseup
  /***** currently when we move our mouse to the right, we will add one to movementCounter *****/
  var movementCounter = 0;
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

  sliderContainer.addEventListener(
    // alert("this was a test func. our algorithm is below this .addeventlistener")
    "mouseup",
    function watchMovingSlider(event) {
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
    /***** every time our user move the mouse to the right it will add 1 to movementCounter
     * every time our user move the mouse to the left it will substract -1 from movementCounter
     *  when our user left clicks on .sliderIconWrapper and hold down left click then move the mouse to the right
     * once monvementCounter gets to 434: the right side of the .sliderIconWrapper will touch the right edge of .slider
     * *****/
    alert(
      "do we want to remove mousemove event listener when .sliderIconWrapper touches .slider righ edge or just stop updating --slider-movement"
    );
    alert("and stop increment movementCounter");
    var addThisToMovementCounter = event.movementX;
    //movementCounter is declared at the top of testingIdeas func
    movementCounter += addThisToMovementCounter;

    /***** every func is inside the testingIdeas func scope
     * movementCounter is a variable with an initial value 0
     * we are updating it every time user move mouse to the right or the left
     * *****/
    console.log(movementCounter);
    document.documentElement.attributes["style"].value =
      "--slider-movement: " + String(movementCounter) + "px";
    var { sliderIconWrapper } = ourSelectors();
    var sliderContainer = document.querySelector(".slider");
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
