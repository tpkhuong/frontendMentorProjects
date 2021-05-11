function ourSelectors() {
  var navBar = document.querySelector(".nav-list");
  // var quantitySelectors = Array.prototype.slice.call(
  //   document.querySelectorAll(".quantity-digit")
  // );
  var quantitySelectors = Array.from(
    document.querySelectorAll(".quantity-digit")
  );
  var selectPledgeInput = Array.prototype.slice.call(
    document.querySelectorAll(".selected-pledge input")
  );
  // var selectPledgeInput = Array.from(
  //   document.querySelectorAll(".selected-pledge input")
  // );
  return {
    navBar,
    quantitySelectors,
    selectPledgeInput,
  };
}

toggleNavMenu();
addFadedOpacity();
selectedBookmarked();
inputFunctionality();

function toggleNavMenu() {
  var { navBar } = ourSelectors();
  var toggleButton = document.querySelector(".headernav button.img-container");

  toggleButton.addEventListener("click", function showMenu(event) {
    navBar.classList.toggle("hide-off-left");
  });
}

function addFadedOpacity() {
  var { quantitySelectors } = ourSelectors();
  var arrOfStrings = ["individual-pledge", "modal-pledge"];
  var quantityIsZero = quantitySelectors.reduce(function findZeroLeft(
    buildingUp,
    currentValue
  ) {
    var converToNum = Number(currentValue.innerText);
    if (converToNum === 0) {
      return [...buildingUp, currentValue];
    }
    return buildingUp;
  },
  []);

  var arrOfArticleEleAddOpacity = quantityIsZero.reduce(function findArticleEle(
    buildingUp,
    currentValue
  ) {
    var parentEle = currentValue.parentElement;
    var articleWithMatchingClassname;
    while (parentEle) {
      if (
        parentEle.tagName == "ARTICLE" &&
        arrOfStrings.includes(parentEle.className)
      ) {
        articleWithMatchingClassname = parentEle;
        break;
      }
      parentEle = parentEle.parentElement;
    }
    if (articleWithMatchingClassname != undefined) {
      return [...buildingUp, articleWithMatchingClassname];
    }
    return buildingUp;
  },
  []);

  arrOfArticleEleAddOpacity.forEach(function addOpacity(eachArticleEle) {
    eachArticleEle.classList.add("faded-pledge");
  });
  console.log(arrOfArticleEleAddOpacity);
}

function selectedBookmarked() {
  document
    .querySelector(".bookmark-btn")
    .addEventListener("click", function selectBookmark(event) {
      this.classList.toggle("activated-bookmarked");
    });
}
alert("add submit btn class to continue btn");
function inputFunctionality() {
  var { selectPledgeInput } = ourSelectors();
  var submitBtn = document.querySelector(".submit-btn");

  submitBtn.addEventListener("click", function getInputValue(event) {
    // var getValueOfInputEle = Array.prototype.slice.call(
    //   event.target.previousElementSibling.children
    // );
    var [getValueOfInputEle] = Array.from(
      event.target.previousElementSibling.children
    ).filter(function findMatchingClass(eachChildELe) {
      return eachChildELe.className == "selected-pledge-input";
    });
    /**** we are getting the value of our inputs when we click the continue btn *****/
    console.log(Number(getValueOfInputEle.value));
  });
  // selectPledgeInput.forEach(function onlyRunWhenFocused(eachInput) {
  //   eachInput.addEventListener(
  //     "focus",
  //     function eventListenerOnInputEle(event) {
  //       console.log(this == eachInput);
  //       this.addEventListener("input", function watchInputs(event) {
  //         console.log(event.target.value);
  //       });
  //     }
  //   );
  // });
}
