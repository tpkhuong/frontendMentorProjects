function ourSelectors() {
  var sectionElementContentContainer = document.querySelector(".testimonial");

  return {
    sectionElementContentContainer,
  };
}

touchFuntionality();

function touchFuntionality(
  { sectionElementContentContainer } = ourSelectors()
) {
  var strOfEventListern = ["touchstart", "touchmove", "touchend"];
  /***** look at event object key/property changedTouches(an array) access that array look at pageX and pageY. there is always clientX and clientY
   * and screenX and screenY
   *  *****/

  /***** pageY clicking in higher area will have a lower number than clicking in lower area *****/
  var strOfEventListern = ["touchstart", "touchend"];
  strOfEventListern.forEach(function addEventListener(eachStr) {
    sectionElementContentContainer.addEventListener(
      `${eachStr}`,
      function getPositionOnScreen(event) {
        console.log(event);
      }
    );
  });
}
// height 173 left 32 top 407 width 311
