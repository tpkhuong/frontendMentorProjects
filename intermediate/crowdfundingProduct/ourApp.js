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
// ourData();
// onlyRunInputFuncWhenBtnClicked();

function ourData(dataInput = {}) {
  var dataObj = {};
  var [ourArr] = Object.entries(dataInput);
  var [ourKey, ourValue] = ourArr;
  // dataObj[ourKey] = ourValue;
  dataObj[ourKey] = ourValue;
  console.log(dataObj);
}

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

/* just add btn functionality when the submit button is clicked*/

function inputFunctionality() {
  var { selectPledgeInput } = ourSelectors();
  // var submitBtn = Array.prototype.slice.call( document.querySelectorAll(".submit-btn"));
  var submitBtn = Array.from(document.querySelectorAll(".submit-btn"));

  submitBtn.forEach(function addEventToBtn(eachBtn) {
    eachBtn.addEventListener("click", function getInputValue(event) {
      // var getValueOfInputEle = Array.prototype.slice.call(
      //   event.target.previousElementSibling.children
      // );
      var [getValueOfInputEle] = Array.from(
        event.target.previousElementSibling.children
      ).filter(function findMatchingClass(eachChildELe) {
        return eachChildELe.className == "selected-pledge-input";
      });
      /**** we are getting the value of our inputs when we click the continue btn *****/
      ourData(ourAmount(Number(getValueOfInputEle.value)));
      // console.log(ourAmount(Number(getValueOfInputEle.value)));
    });
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

function ourAmount(amountInput) {
  return { amountInput };
}
/* just add btn functionality when the submit button is clicked*/

function testedCode() {
  function onlyRunInputFuncWhenBtnClicked() {
    var arrOfSubmitBtn = Array.from(document.querySelectorAll(".submit-btn"));

    arrOfSubmitBtn.forEach(function addClickEvent(eachBtn) {
      eachBtn.addEventListener("click", inputFunctionality);
    });
  }
}

findRadioBtnChangeEvent();
function findRadioBtnChangeEvent() {
  // var inputRadioBtn = Array.from(
  //   document.querySelectorAll("input[type='radio']")
  // );
  var inputRadioBtnArray = Array.prototype.slice.call(
    document.querySelectorAll("input[type='radio']")
  );

  var addListenerToDialog1 = document.querySelector('[id="dialog1"]');

  addListenerToDialog1.addEventListener(
    "change",
    function watchForChange(event) {
      var radioBtnHasCheckedTrue = event.target;
      console.log(radioBtnHasCheckedTrue);
      /* turn the radio btn we clicked aria checked to true*/
      event.target.attributes["aria-checked"].value = "true";
      toggleAriaChecked(radioBtnHasCheckedTrue, inputRadioBtnArray);
      findTheQuantityOfPledge(radioBtnHasCheckedTrue);
    }
  );
  // inputRadioBtnArray.forEach(function addChangeListener(eachRadioBtn) {
  //   eachRadioBtn.addEventListener("change", function watchForChange(event) {
  //     var radioBtnHasCheckedTrue = event.target;
  //     /* turn the radio btn we clicked aria checked to true*/
  //     event.target.attributes["aria-checked"].value = "true";
  //     toggleAriaChecked(radioBtnHasCheckedTrue, inputRadioBtnArray);
  //     findTheQuantityOfPledge(radioBtnHasCheckedTrue);
  //   });
  // });
  // inputRadioBtn.forEach(function printStuff(eachRadioBtn) {
  //   console.log(eachRadioBtn.checked);
  // });
}

function toggleAriaChecked(radioBtnInput, arrRadioBtn) {
  var notCheckedTurnAriaToFalse = arrRadioBtn.filter(function findFalse(
    eachBtn
  ) {
    return eachBtn != radioBtnInput;
  });

  notCheckedTurnAriaToFalse.forEach(function turnAriaCheckedFalse(
    eachRadioBtn
  ) {
    eachRadioBtn.attributes["aria-checked"].value = "false";
  });
}
alert(
  "we are selecting the text of the quantity-digit element. might be better to put unique identifier for our quantity-digit element"
);
function findTheQuantityOfPledge(selectedRadioBtn) {
  var selectedRadioLabelText = selectedRadioBtn.nextElementSibling.innerText;
  console.log(selectedRadioLabelText);

  if (!selectedRadioLabelText.includes("Pledge")) {
    var arrOfIndividualPledgeEle = Array.prototype.slice.call(
      document.querySelectorAll(".individual-pledge")
    );

    console.log(arrOfIndividualPledgeEle);

    var [articleEleQuantityToChange] = arrOfIndividualPledgeEle.filter(
      function printInnerText(eachArticle) {
        var titleEleInnerText =
          eachArticle.firstElementChild.firstElementChild.innerText;

        return selectedRadioLabelText == titleEleInnerText;
      }
    );
    // amount-pledges-left-select
    var childrenOfArticleEle = Array.prototype.slice.call(
      articleEleQuantityToChange.children
    );
    // var childrenOfArticleEle = Array.from(articleEleQuantityToChange);

    var [containerOfQuantityDigit] = childrenOfArticleEle.filter(
      function findTheContainer(eachElement) {
        return eachElement.className == "amount-pledges-left-select";
      }
    );

    console.log(
      containerOfQuantityDigit.firstElementChild.firstElementChild.innerText
    );
  }
}
