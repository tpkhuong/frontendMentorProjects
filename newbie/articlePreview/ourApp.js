function ourSelectors() {
  var ourShareBtns = document.querySelectorAll(".content-author-share-btn");
  var darkBackgroundContainer = document.querySelector(
    ".author-dark-container.bg-dark"
  );

  var checkWidthOfThisElement = document.querySelector(".content");
  return {
    ourShareBtns,
    darkBackgroundContainer,
    checkWidthOfThisElement,
  };
}

toggleBetweenBottomContainersMobile();

function toggleBetweenBottomContainersMobile(
  { ourShareBtns, darkBackgroundContainer } = ourSelectors()
) {
  var arrOfShareBtns = Array.from(ourShareBtns);

  arrOfShareBtns.forEach(function addEventToEachBtn(eachValue) {
    eachValue.addEventListener(
      "click",
      function switchTheBottomContainer(event) {
        /*we can use localName: "img" || nodeName:"IMG" || tagName: "IMG" we see what element it is*/
        console.log(event.target);
        var parentElementClassName = event.target.parentElement.className;

        var { checkWidthOfThisElement } = ourSelectors();
        /* we will apply our class based on the width of the element with the class content*/
        if (checkWidthOfThisElement.scrollWidth > 900) {
          console.log("content is over 900");
        } else {
          console.log("content less than 900");
        }

        if (parentElementClassName.includes("dark")) {
          //the btn we clicked its parent has a dark background
          changeToLightBackground(event, darkBackgroundContainer);
        } else {
          //the btn we clicked its parent has a light
          changeToDarkBackground(event, darkBackgroundContainer);
        }
      }
    );
  });
}

function changeToDarkBackground(clickEvent, addClassToThisElement) {
  if (clickEvent.target.nodeName == "IMG") {
    //  this will work but what if we add an element later and there is more that two elements in our container?
    //   let parentOfParentElementSibling =
    //  clickEvent.target.parentElement.parentElement.nextElementSibling;
    // parentOfParentElementSibling.classList.add("show");
    addClassToThisElement.classList.add("show");
  } else {
    //   //  this will work but what if we add an element later and there is more that two elements in our container?
    // var parentElementSibling =
    //   clickEvent.target.parentElement.nextElementSibling;
    // parentElementSibling.classList.add("show");
    addClassToThisElement.classList.add("show");
  }
}

function changeToLightBackground(clickEvent, addClassToThisElement) {
  if (clickEvent.target.nodeName == "IMG") {
    // let parentOfParentElementClassname =
    //   clickEvent.target.parentElement.parentElement.className;
    addClassToThisElement.classList.remove("show");
  } else {
    // var parentElementClassName = clickEvent.target.parentElement.className;
    addClassToThisElement.classList.remove("show");
  }
}

function floatingEffectOfBottomContainerDesktop() {}
