function ourSelectors() {
  var parentElementOfProfileDisplay = document.querySelector(".testimonials");
  var sectionElementContentContainers = document.querySelectorAll(
    ".testimonial"
  );

  return {
    sectionElementContentContainers,
    parentElementOfProfileDisplay,
  };
}

keyboardSwitchProfile();

function keyboardSwitchProfile(
  {
    parentElementOfProfileDisplay,
    sectionElementContentContainers,
  } = ourSelectors()
) {
  parentElementOfProfileDisplay.addEventListener(
    "keydown",
    function switchingProfileArrowKeys(event) {
      /***** ArrowDown: code = "ArrowDown" key: "ArrowDown" keyCode: 40 *****/
      /***** ArrowUp: code = "ArrowUp" key: "ArrowUp" keyCode: 38 *****/
      /***** ArrowLeft: code = "ArrowLeft" key: "ArrowLeft" keyCode: 37 *****/
      /***** ArrowRight: code = "ArrowRight" key: "ArrowRight" keyCode: 39 *****/

      // var classOfProfileDisplay = event.target.parentElement.parentElement.parentElement.className.split(
      //   " "
      // )[1];
      console.log(event);
      if (
        event.code == "ArrowDown" ||
        event.key == "ArrowDown" ||
        event.keyCode == 40
      ) {
        findIndexAndApplyMoveOffScreen(sectionElementContentContainers);
      } else if (
        event.code == "ArrowUp" ||
        event.key == "ArrowUp" ||
        event.keyCode == 38
      ) {
        findIndexAndApplyMoveOffScreen(sectionElementContentContainers);
      } else if (
        event.code == "ArrowLeft" ||
        event.key == "ArrowLeft" ||
        event.keyCode == 37
      ) {
        findIndexAndApplyMoveOffScreen(sectionElementContentContainers);
      } else if (
        event.code == "ArrowRight" ||
        event.key == "ArrowRight" ||
        event.keyCode == 39
      ) {
        findIndexAndApplyMoveOffScreen(sectionElementContentContainers);
      }
    }
  );
}

function findIndexAndApplyMoveOffScreen(arrOfProfileContainers) {
  var strToPassToIndexFunc = "move-off-screen";
  var convertToArrProfileElements = Array.from(arrOfProfileContainers);
  var indexOfElementWithMoveOffScreen = findIndexOfElement(
    convertToArrProfileElements,
    strToPassToIndexFunc
  );

  applyClassMoveOffScreen(
    convertToArrProfileElements,
    indexOfElementWithMoveOffScreen
  );
  console.log(indexOfElementWithMoveOffScreen);
}

// touchFuntionality();

function touchFuntionality(
  { sectionElementContentContainers } = ourSelectors()
) {
  /***** array of profile display containers *****/
  var arrOfTestimonialsContainers = Array.from(sectionElementContentContainers);
  /***** array of profile display containers *****/

  /***** figure out which profile display has the class move-off-screen *****/
  // var testimonialContainerWithClassMoveOff = elementWithClassMoveOff(
  //   arrOfTestimonialsContainers
  // );

  /***** figure out which profile display has the class move-off-screen *****/
  // var strOfEventListener = ["touchstart", "touchmove", "touchend"];
  /***** look at event object key/property changedTouches(an array) access that array look at pageX and pageY. there is always clientX and clientY
   * and screenX and screenY
   *  *****/

  /***** pageY clicking in higher area will have a lower number than clicking in lower area *****/
  // var strOfEventListener = ["touchstart", "touchend"];
  // strOfEventListener.forEach(function addEventListener(eachStr) {
  //   sectionElementContentContainers.addEventListener(
  //     `${eachStr}`,
  //     function getPositionOnScreen(event) {
  //       console.log(event);
  //     }
  //   );
  // });

  var strToMatchInArrOfProfileContainer;
  var indexToUseInTouchMove;
  /***** get the pageX of touchState and touchEnd *****/
  var objOfPageXCoords = {};

  /***** have event listener on parent element of both testimonial profile display *****/
  document
    .querySelector(".testimonials")
    .addEventListener("touchstart", function elementClickedPageXStart(event) {
      var touchObj = event.changedTouches[0];

      objOfPageXCoords = Object.assign(objOfPageXCoords, {
        pageX: touchObj.pageX,
      });
      // console.log(objOfPageXCoords);
      var parentElement = event.target.parentElement;
      var grandParentElement = event.target.parentElement.parentElement;
      var greatGrandParentElement =
        event.target.parentElement.parentElement.parentElement;
      var greatGreatGrandParent =
        event.target.parentElement.parentElement.parentElement.parentElement;
      // console.log(parentElement);
      // console.log(grandParentElement);
      // console.log(greatGrandParentElement);
      // console.log(greatGreatGrandParent);
      var arrOfParentElements = [
        parentElement,
        grandParentElement,
        greatGrandParentElement,
        greatGreatGrandParent,
      ];
      arrOfParentElements.forEach(function printParentElement(eachElement) {
        if (eachElement.className.includes("profile-display")) {
          strToMatchInArrOfProfileContainer = eachElement.className.split(
            " "
          )[1];
        }
      });
      console.log(strToMatchInArrOfProfileContainer);
      indexToUseInTouchMove = findIndexOfElement(
        sectionElementContentContainers,
        strToMatchInArrOfProfileContainer
      );
    });

  document
    .querySelector(".testimonials")
    .addEventListener("touchmove", function getPagexEnd(event) {
      var touchMoveObj = event.changedTouches[0];
      var pageXOfTouchMove = touchMoveObj.pageX;
      var calculateSwipeDistance = objOfPageXCoords.pageX - pageXOfTouchMove;
      // console.log(calculateSwipeDistance);
      console.log(indexToUseInTouchMove);
      if (calculateSwipeDistance > 20 || calculateSwipeDistance < 20) {
        applyClassMoveOffScreen(
          arrOfTestimonialsContainers,
          indexToUseInTouchMove
        );
        console.log("apply our class");
      }
    });

  /***** have event listener on parent element of both testimonial profile display *****/
}
// height 173 left 32 top 407 width 311

function findIndexOfElement(arrOfElements, findThisStr) {
  var indexOfElementWitoutClass;
  arrOfElements.forEach(function findIndex(eachElement, currentIndex) {
    if (eachElement.className.includes(findThisStr)) {
      indexOfElementWitoutClass = currentIndex;
    }
  });
  return indexOfElementWitoutClass;
}

function applyClassMoveOffScreen(
  arrOfProfileElements,
  indexOfElementWithClass
) {
  var [firstProfile, secondProfile] = arrOfProfileElements;

  switch (indexOfElementWithClass) {
    case 0:
      firstProfile.classList.remove("move-off-screen");
      secondProfile.classList.add("move-off-screen");
      break;
    case 1:
      firstProfile.classList.add("move-off-screen");
      secondProfile.classList.remove("move-off-screen");
  }
}

function elementWithClassMoveOff(arrOfProfileContainers) {
  var foundElementWithClassMoveOff;
  arrOfProfileContainers.forEach(function findElementWithClass(eachContainer) {
    var classOfContainer = eachContainer.className;
    if (classOfContainer.includes("move-off-screen")) {
      foundElementWithClassMoveOff = eachContainer;
    }
  });

  return foundElementWithClassMoveOff;
}

function notesAndTestingAlgorithm() {
  // arrOfTestimonialsContainers.forEach(function listenForTouch(eachTestimonial) {
  //   eachTestimonial.addEventListener(
  //     "touchstart",
  //     function clickingOnTestimonial(event) {
  //       parentElement = event.target.parentElement;
  //       grandParentElement = event.target.parentElement.parentElement;
  //       greatGrandParentElement =
  //         event.target.parentElement.parentElement.parentElement;
  //       greatGreatGrandParent =
  //         event.target.parentElement.parentElement.parentElement.parentElement;
  //       console.dir(arrOfTestimonialsContainers);
  //       // console.dir(parentElement);
  //       // console.dir(grandParentElement);
  //       // console.dir(greatGrandParentElement);
  //       // console.dir(greatGreatGrandParent);
  //     }
  //   );
  // });
}
