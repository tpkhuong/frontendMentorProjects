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
  var strOfEventListener = ["touchstart", "touchmove", "touchend"];
  /***** look at event object key/property changedTouches(an array) access that array look at pageX and pageY. there is always clientX and clientY
   * and screenX and screenY
   *  *****/

  var arrOfTestimonialsContainers = Array.from(sectionElementContentContainers);
  arrOfTestimonialsContainers.forEach(function listenForTouch(eachTestimonial) {
    eachTestimonial.addEventListener(
      "touchstart",
      function clickingOnTestimonial(event) {
        console.dir(event.target);
      }
    );
  });

  /***** pageY clicking in higher area will have a lower number than clicking in lower area *****/
  var strOfEventListener = ["touchstart", "touchend"];
  strOfEventListener.forEach(function addEventListener(eachStr) {
    sectionElementContentContainers.addEventListener(
      `${eachStr}`,
      function getPositionOnScreen(event) {
        console.log(event);
      }
    );
  });
}
// height 173 left 32 top 407 width 311
