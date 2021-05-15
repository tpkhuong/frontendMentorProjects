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
  var totalAmountDisplay = document.querySelector(".amount-display");
  // var selectPledgeInput = Array.from(
  //   document.querySelectorAll(".selected-pledge input")
  // );
  return {
    navBar,
    quantitySelectors,
    selectPledgeInput,
    totalAmountDisplay,
  };
}

toggleNavMenu();
addFadedOpacity();
selectedBookmarked();
inputFunctionality();
// ourData();
// onlyRunInputFuncWhenBtnClicked();

// function ourData(arrInput, amountInput) {
//   var dataObj = {};
//   if (Array.isArray(arrInput)) {
//     dataObj["arrOfSpanDigitElement"] = arrInput;
//   }

//   if (typeof amountInput == "object") {
//     var [ourArr] = Object.entries(amountInput);
//     var [ourKey, ourValue] = ourArr;
//     // dataObj[ourKey] = ourValue;
//     dataObj[ourKey] = ourValue;
//   }

//   console.log(dataObj);
// }

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
      if (radioBtnCheckedTrue.attributes["id"].value != "no-reward") {
        var amountData = Number(getValueOfInputEle.value);
        findTheQuantityOfPledge(radioBtnCheckedTrue, amountData);
      }
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

// function ourAmount(amountInput) {
//   return { amountInput };
// }
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
    function watchForRadioBtnChange(event) {
      if (event.target.attributes["type"].value == "radio") {
        var radioBtnHasCheckedTrue = event.target;
        console.log(radioBtnHasCheckedTrue);
        /* turn the radio btn we clicked aria checked to true*/
        containerOfInputRadioChecked =
          event.target.parentElement.parentElement.children;
        event.target.attributes["aria-checked"].value = "true";
        toggleAriaChecked(radioBtnHasCheckedTrue, inputRadioBtnArray);
      }
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
  var totalAmountContainer = document.querySelector(".amount-display");
  var totalPledgesContainer = document.querySelector(".backers-display");
  var currTotalAmount = totalAmountContainer.innerText;
  // currTotalInNumType(currTotalAmount);
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
  var dataObj = {
    amountInput,
    arrOfSpanDigitElement: arrOfTextContainerToChange,
    currTotalAmount: currTotalInNumType(currTotalAmount),
    totalBackersAmountContainer: [totalAmountContainer, totalPledgesContainer],
  };
  updatePledgesAndAmount(dataObj);
  // ourData(arrOfTextContainerToChange, amountInput);

  // find the container with the quantity text and put them in an array. so we can loop them and change the quantity
}

function currTotalInNumType(strInput) {
  // var arrOfValues = strInput.split("");
  // var arrOfValues = [...strInput]
  // var numRegex = /\d/gi;
  // var arrOfValues = strInput.match(numRegex);
  var strOfTotalInNumType = Number(strInput.match(/\d/gi).join(""));
  return strOfTotalInNumType;
}

function updatePledgesAndAmount(objInput) {
  var {
    amountInput,
    arrOfSpanDigitElement,
    currTotalAmount,
    totalBackersAmountContainer,
  } = objInput;

  //update number of pledges left
  // substractOneOffPledgesLeft(arrOfSpanDigitElement);
  //update total number of pledges
  // addOneToTotalBackers(totalBackersAmountContainer);
  //update total amount based on pledges
  increaseTotalBackedBasedOnPledge(amountInput, currTotalAmount);
  /* document.documentElement.style.setProperty */
  //
}

function substractOneOffPledgesLeft(arrInput) {
  arrInput.forEach(function calculateNewPledges(eachPledge) {
    var pledgeInnerText = eachPledge.innerText;
    // turn to num
    var pledgeNumForm = Number(pledgeInnerText);
    pledgeNumForm--;
    // turn back to str
    var pledgeStringForm = String(pledgeNumForm);
    eachPledge.innerText = pledgeStringForm;
  });
}

function addOneToTotalBackers(arrInput) {
  var [backersTotalContainer] = arrInput.reduce(function findBackDisplayWrapper(
    buildingUp,
    currentValue
  ) {
    var classNameOfEle = currentValue.className.split(" ")[1];
    if (classNameOfEle == "backers-display") {
      return [...buildingUp, currentValue];
    }
    return buildingUp;
  },
  []);
  // use regex to get just numbers
  var backersTotalJustNums = backersTotalContainer.innerText
    .match(/\d/gi)
    .join("");
  // turn to number
  var backerTotalNumForm = Number(backersTotalJustNums);
  backerTotalNumForm++;
  // turn to string
  var backerTotalStrForm = String(backerTotalNumForm);
  backersTotalContainer.innerText = backerTotalStrForm;
}

function increaseTotalBackedBasedOnPledge(pledgeAmtInput, totalBackedAmtInput) {
  var { totalAmountDisplay } = ourSelectors();
  var newTotal = totalBackedAmtInput + pledgeAmtInput;
  var strFormNewTotal = String(newTotal);
  addCommasBySplitThreeValues(strFormNewTotal);
}

alert("finish add commas algorithm. we will make it work with good BigO");
function addCommasBySplitThreeValues(strInput) {
  var lengthOfStr = strInput.length;
  switch (lengthOfStr) {
    case 3:
      console.log("length is 3");
      break;
    case 4:
      console.log("length is 4");
      var leftSide = strInput.slice(0, 1);
      console.log(leftSide);
      break;
    case 5:
      console.log("length is 5");
      var leftSide = strInput.slice(0, 2);
      console.log(leftSide);
      break;
    case 6:
      console.log("length is 6");
      var leftSide = strInput.slice(0, 3);
      console.log(leftSide);
      break;
    case 7:
      console.log("length is 7");
      var leftSide = strInput.slice(0, 1);
      var middle = strInput.slice(1, 4);
      var rightSide = strInput.slice(4);
      console.log(leftSide);
      console.log(middle);
      console.log(rightSide);
      var addCommas = [
        ...leftSide,
        ...[","],
        ...middle,
        ...[","],
        ...rightSide,
      ].join("");
      console.log(addCommas);
      break;
  }
}
