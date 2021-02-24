function ourSelectors() {
  var sectionElementContentContainers = document.querySelectorAll(
    ".testimonial"
  );

  return {
    sectionElementContentContainers,
  };
}

touchFuntionality();

function touchFuntionality(
  { sectionElementContentContainers } = ourSelectors()
) {
  /***** array of profile display containers *****/
  var arrOfTestimonialsContainers = Array.from(sectionElementContentContainers);
  /***** array of profile display containers *****/

  /***** figure out which profile display has the class move-off-screen *****/
  var testimonialContainerWithClassMoveOff = elementWithClassMoveOff(
    arrOfTestimonialsContainers
  );

  /***** figure out which profile display has the class move-off-screen *****/
  var strOfEventListener = ["touchstart", "touchmove", "touchend"];
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

  var arrOfTestimonialsContainers = Array.from(sectionElementContentContainers);
  var parentElement,
    grandParentElement,
    greatGrandParentElement,
    greatGreatGrandParent;
  arrOfTestimonialsContainers.forEach(function listenForTouch(eachTestimonial) {
    eachTestimonial.addEventListener(
      "touchstart",
      function clickingOnTestimonial(event) {
        parentElement = event.target.parentElement;
        grandParentElement = event.target.parentElement.parentElement;
        greatGrandParentElement =
          event.target.parentElement.parentElement.parentElement;
        greatGreatGrandParent =
          event.target.parentElement.parentElement.parentElement.parentElement;

        console.dir(parentElement);
        console.dir(grandParentElement);
        console.dir(greatGrandParentElement);
        console.dir(greatGreatGrandParent);
      }
    );
  });
}
// height 173 left 32 top 407 width 311

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
