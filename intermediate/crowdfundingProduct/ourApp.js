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

function ourData(arrInput, amountInput) {
  var dataObj = {};
  if (Array.isArray(arrInput)) {
    dataObj["arrOfSpanDigitElement"] = arrInput;
  }

  if (typeof amountInput == "object") {
    var [ourArr] = Object.entries(amountInput);
    var [ourKey, ourValue] = ourArr;
    // dataObj[ourKey] = ourValue;
    dataObj[ourKey] = ourValue;
  }

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
  // var submitBtn = Array.from(document.querySelectorAll(".submit-btn"));

  // submitBtn.forEach(function addEventToBtn(eachBtn) {
  //   eachBtn.addEventListener("click", function getInputValue(event) {
  //     // var getValueOfInputEle = Array.prototype.slice.call(
  //     //   event.target.previousElementSibling.children
  //     // );
  //     var [getValueOfInputEle] = Array.from(
  //       event.target.previousElementSibling.children
  //     ).filter(function findMatchingClass(eachChildELe) {
  //       return eachChildELe.className == "selected-pledge-input";
  //     });
  //     /**** we are getting the value of our inputs when we click the continue btn *****/
  //     ourData(ourAmount(Number(getValueOfInputEle.value)));
  //     // console.log(ourAmount(Number(getValueOfInputEle.value)));
  //   });
  // });

  // better approach, we're not looping and adding the event to each submit-btn
  var addListenerToDialog1 = document.querySelector('[id="dialog1"]');
  var arrOfRadioBtn = Array.prototype.slice.call(
    document.querySelectorAll('[type="radio"]')
  );

  addListenerToDialog1.addEventListener("click", function getAmount(event) {
    if (
      event.target.className.includes("submit-btn") &&
      event.target.innerText == "Continue"
    ) {
      var [getValueOfInputEle] = Array.from(
        event.target.previousElementSibling.children
      ).filter(function findMatchingClass(eachChildELe) {
        return eachChildELe.className == "selected-pledge-input";
      });
      /**** we are getting the value of our inputs when we click the continue btn *****/
      var [radioBtnCheckedTrue] = arrOfRadioBtn.filter(function findRadioBtn(
        eachBtn
      ) {
        return eachBtn.checked;
      });

      var amountData = ourAmount(Number(getValueOfInputEle.value));
      findTheQuantityOfPledge(radioBtnCheckedTrue, amountData);
    }
  });
  // better approach, we're not looping and adding the event to each submit-btn
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

  var containerOfInputRadioChecked;
  addListenerToDialog1.addEventListener(
    "change",
    function watchForChange(event) {
      var radioBtnHasCheckedTrue = event.target;
      console.log(radioBtnHasCheckedTrue);
      /* turn the radio btn we clicked aria checked to true*/
      containerOfInputRadioChecked =
        event.target.parentElement.parentElement.children;
      event.target.attributes["aria-checked"].value = "true";
      toggleAriaChecked(radioBtnHasCheckedTrue, inputRadioBtnArray);
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

function findTheQuantityOfPledge(selectedRadioBtn, amountInput) {
  var selectedRadioLabelText = selectedRadioBtn.nextElementSibling.innerText;
  console.log(selectedRadioLabelText);

  // find the container with the quantity text and put them in an array. so we can loop them and change the quantity
  var childrenOfParentOfRadioBtn = Array.prototype.slice.call(
    selectedRadioBtn.parentElement.children
  );

  var [parentContainerOfQuantityText] = childrenOfParentOfRadioBtn.filter(
    function findQuantityParentELe(eachElement) {
      var tagNameOfElement = eachElement.tagName;
      return tagNameOfElement == "DIV";
    }
  );

  var textContainerOfRadioBtnChecked =
    parentContainerOfQuantityText.firstElementChild;
  // var childrenOfParentOfRadioBtn = Array.from(
  //   selectedRadioBtn.parentElement.children
  // );
  var containerForOurText;
  if (!selectedRadioLabelText.includes("Pledge")) {
    let arrOfIndividualPledgeEle = Array.prototype.slice.call(
      document.querySelectorAll(".individual-pledge")
    );

    console.log(arrOfIndividualPledgeEle);

    let [articleEleQuantityToChange] = arrOfIndividualPledgeEle.filter(
      function printInnerText(eachArticle) {
        var titleEleInnerText =
          eachArticle.firstElementChild.firstElementChild.innerText;

        return selectedRadioLabelText == titleEleInnerText;
      }
    );
    // amount-pledges-left-select
    let childrenOfArticleEle = Array.prototype.slice.call(
      articleEleQuantityToChange.children
    );
    // var childrenOfArticleEle = Array.from(articleEleQuantityToChange);

    let [containerOfQuantityDigit] = childrenOfArticleEle.filter(
      function findTheContainer(eachElement) {
        return eachElement.className == "amount-pledges-left-select";
      }
    );

    containerForOurText =
      containerOfQuantityDigit.firstElementChild.firstElementChild;
    console.log(containerForOurText);
  }

  var arrOfTextContainerToChange = [
    textContainerOfRadioBtnChecked,
    containerForOurText,
  ];
  ourData(arrOfTextContainerToChange, amountInput);
  // find the container with the quantity text and put them in an array. so we can loop them and change the quantity
}

alert(
  "we have our amount and our array of quantity-digit an in obj, we can work with those data"
);
// function changeTheQuantityOfTextElement(...textElements) {

// }
