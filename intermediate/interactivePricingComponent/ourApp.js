function ourSelectors() {
  //article with class of pricing. container element for pageviews,slider,priceview,toggle
  var pricingContainer = document.querySelector(".pricing");
  // toggle button
  var toggleBtn = document.querySelector(".toggle-button");
  //element text month or yearly
  var spanTextEleMonthOrYear = document.querySelector(
    ".priceview span:last-of-type"
  );

  return {
    toggleBtn,
    pricingContainer,
    spanTextEleMonthOrYear,
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
  document.documentElement.style.setProperty(
    "--slider-movement",
    "0px"
    // String(totalAmtPercentage) + "%"
  );
  var sliderContainer = document.querySelector(".slider");
  // use mousedown them mousemove then mouseup
  console.log(sliderContainer.firstElementChild.nextElementSibling);
  sliderContainer.addEventListener(
    "mousedown",
    function watchMovingSlider(event) {
      console.log(event);
      console.log(event.pageX);
      console.log(event.target);
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
    }
  );
  alert("our slider-icon-wrapper is moving based on movement of mouse");
  alert(
    "we will figure out how to add one or substract one pixel based on mouse horizontal movement"
  );
  alert(
    "get pageX divide by pageX add it to a variable use that variable to change --slider-movement"
  );
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
