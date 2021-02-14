function ourSelectors() {
  var ourShareBtns = document.querySelectorAll(".content-author-share-btn");

  return {
    ourShareBtns,
  };
}

toggleBetweenBottomContainersMobile();

function toggleBetweenBottomContainersMobile(
  { ourShareBtns } = ourSelectors()
) {
  var arrOfShareBtns = Array.from(ourShareBtns);

  arrOfShareBtns.forEach(function addEventToEachBtn(eachValue) {
    eachValue.addEventListener(
      "click",
      function switchTheBottomContainer(event) {
        console.log(event);
        console.log("our button is clicked");
      }
    );
  });
}
