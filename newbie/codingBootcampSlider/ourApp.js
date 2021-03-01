function ourSelectors() {
  var sectionElementContentContainers = document.querySelectorAll(
    ".testimonial"
  );

  return {
    sectionElementContentContainers,
  };
}

clickFunctionality();

function clickFunctionality(
  { sectionElementContentContainers } = ourSelectors()
) {
  var parentElementOfProfileDisplay = document.querySelector(".testimonials");

  parentElementOfProfileDisplay.addEventListener(
    "click",
    function arrowClicked(event) {
      /***** find out which profile display is the arrow container in *****/
      var greatGrandParentElement =
        event.target.parentElement.parentElement.parentElement;
      /***** find out which profile display is the arrow container in *****/
      /***** get class of profile display element *****/
      var classToUseToFindIndex = greatGrandParentElement.className.split(
        " "
      )[1];
      /***** get class of profile display element *****/
      /***** find the index *****/
      var {
        indexToPassToAddMoveOffScreenFunc,
        convertToArrProfileDisplay,
      } = getIndexOfElementToAddClass(
        classToUseToFindIndex,
        sectionElementContentContainers
      );
      /***** find the index *****/
      /***** use index to find element we want to add class move off screen *****/
      addMoveOffScreenToElement(
        indexToPassToAddMoveOffScreenFunc,
        convertToArrProfileDisplay
      );
      /***** use index to find element we want to add class move off screen *****/
    }
  );
}

function getIndexOfElementToAddClass(
  strToMatchToFindIndex,
  arrUsedToFindIndexOfElement
) {
  var convertToArrProfileDisplay = Array.from(arrUsedToFindIndexOfElement);

  var indexToPassToAddMoveOffScreenFunc;
  convertToArrProfileDisplay.forEach(function findTheIndex(
    eachProfileDisplay,
    currentIndex
  ) {
    if (eachProfileDisplay.className.includes(strToMatchToFindIndex)) {
      indexToPassToAddMoveOffScreenFunc = currentIndex;
    }
  });
  return {
    indexToPassToAddMoveOffScreenFunc,
    convertToArrProfileDisplay,
  };
}

function addMoveOffScreenToElement(indexOfElement, arrOfProfileDisplay) {
  var [firstProfileDisplay, secondProfileDisplay] = arrOfProfileDisplay;

  switch (indexOfElement) {
    case 0:
      firstProfileDisplay.classList.add("move-off-screen");
      secondProfileDisplay.classList.remove("move-off-screen");
      break;
    case 1:
      firstProfileDisplay.classList.remove("move-off-screen");
      secondProfileDisplay.classList.add("move-off-screen");
      break;
  }
}
// touchFuntionality();

// function touchFuntionality(
//   { sectionElementContentContainers } = ourSelectors()
// ) {
//   var strOfEventListener = ["touchstart", "touchmove", "touchend"];
//   /***** look at event object key/property changedTouches(an array) access that array look at pageX and pageY. there is always clientX and clientY
//    * and screenX and screenY
//    *  *****/

//   var arrOfTestimonialsContainers = Array.from(sectionElementContentContainers);
//   arrOfTestimonialsContainers.forEach(function listenForTouch(eachTestimonial) {
//     eachTestimonial.addEventListener(
//       "touchstart",
//       function clickingOnTestimonial(event) {
//         console.dir(event.target);
//       }
//     );
//   });

//   /***** pageY clicking in higher area will have a lower number than clicking in lower area *****/
//   var strOfEventListener = ["touchstart", "touchend"];
//   strOfEventListener.forEach(function addEventListener(eachStr) {
//     sectionElementContentContainers.addEventListener(
//       `${eachStr}`,
//       function getPositionOnScreen(event) {
//         console.log(event);
//       }
//     );
//   });
// }
// height 173 left 32 top 407 width 311
