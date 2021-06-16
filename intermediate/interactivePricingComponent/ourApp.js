function ourSelectors() {
  //article with class of pricing. container element for pageviews,slider,priceview,toggle
  var pricingContainer = document.querySelector(".pricing");
  // toggle button
  var toggleBtn = document.querySelector(".toggle-button");
  //element text month or yearly
  var spanTextEleMonthOrYear = document.querySelector(
    ".priceview span:last-of-type"
  );
  //slider icon with left and right arrow
  var sliderIconWrapper = document.querySelector(".slider-icon-wrapper");

  return {
    toggleBtn,
    pricingContainer,
    spanTextEleMonthOrYear,
    sliderIconWrapper,
  };
}

/***** call/invoke our functions *****/
toggleAriaChecked();
/***** call/invoke our functions *****/

/* toggle between monthly/yearly */

function toggleAriaChecked() {
  var { pricingContainer, toggleBtn } = ourSelectors();

  pricingContainer.addEventListener(
    "click",
    function switchBetweenTrueAndFalse(event) {
      if (event.target == toggleBtn) {
        //clicking toggle button
        let toggleAriaCheckedAttr =
          event.target.attributes["aria-checked"].value;
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
      } else if (event.target.parentElement == toggleBtn) {
        // clicking the span/circle element
        let parentElementAriaCheckedAttr =
          event.target.parentElement.attributes["aria-checked"].value;
        /***** changing the text between month and year *****/
        changeTextOfBillingMonthOrYear(parentElementAriaCheckedAttr);
        if (parentElementAriaCheckedAttr == "false") {
          toggleBtn.attributes["aria-checked"].value = "true";
        } else {
          toggleBtn.attributes["aria-checked"].value = "false";
        }
      }
    }
  );
}

/* toggle between monthly/yearly */

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

/***** our data will be selected based on the slider position *****/
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
  console.log(sliderContainer.firstElementChild.nextElementSibling);
  // alert(
  //   "our movementCounter is incrementing when the mouse move in the vertical direction"
  // );
  /***** for our mouse users: we want our algorithm to fire when they click/hold left click on our slider-icon-wrapper *****/

  sliderContainer.addEventListener("click", function checkElementClickd(event) {
    console.log(this);
  });
  alert("start here");
  /***** for our mouse users: we want our algorithm to fire when they click/hold left click on our slider-icon-wrapper *****/

  sliderContainer.addEventListener(
    "mouseup",
    function watchMovingSlider(event) {
      // console.log(event);
      // console.log(event.pageX);
      // console.log(event.target);
      /***** whatever pageX is we will divide that number by itself which will give us 1 *****/
      /***** we will add or substract this number based on our user mouse direction movement *****/
      var addThisToMovementCounter = event.pageX / event.pageX;
      // console.log(addThisToMovementCounter);
      /***** movementCounter is a variable set to 0, it is outside the scope of this function so it won't reset everytime this event or function
       * is called
       *  *****/
      /***** only increment when pageX increase not when "mousemove" fires *****/
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
      if (event.target == sliderIconWrapper) {
        console.log("hello");
      }
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
}
