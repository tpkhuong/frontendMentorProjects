// alert("click event on a button will activate on enter and space key")
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
  var rewardContainerElement = document.querySelector(".reward-container");
  var arrOfLabelsOfPledgeTitleAmtQuanContainer = Array.from(
    document.querySelectorAll(
      ".modal-pledge .pledge-title-amount-quantity label"
    )
  );
  var arrOfRadioBtn = Array.prototype.slice.call(
    document.querySelectorAll('[type="radio"]')
  );

  var fundriserSectionElement = document.querySelector(".fundriser-name");

  var dialog2Element = document.querySelector("#dialog2");

  return {
    navBar,
    quantitySelectors,
    selectPledgeInput,
    totalAmountDisplay,
    rewardContainerElement,
    arrOfLabelsOfPledgeTitleAmtQuanContainer,
    arrOfRadioBtn,
    fundriserSectionElement,
    dialog2Element,
  };
}

initialLoad();
toggleNavMenu();
addFadedOpacity();
addClickEventToFundriserElement();
inputFunctionality();
setProgressBarProp();
selectCorrespondingPledge();
focusClickedElementModalFeature();
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

function notes() {
  alert(
    "we probably don't need to keep track of the elements click in an array because when esc key is pressed or when the close btn is click"
  );
  alert(
    "we just need to know which btn was clicked the btn in fundriser or pledge section"
  );
  alert(
    "from the modal pledge section, we just want to know which of the 'continue' btn was clicked"
  );
  alert(
    "when we activate the completed modal, we just need to keep track of which 'continue' btn was clicked"
  );
}

function initialLoad() {
  var { arrOfRadioBtn } = ourSelectors();
  // select first pledge and set our pledge checked attribute to false
  arrOfRadioBtn.forEach(function setFirstPledgeCheckedTrueRestFalse(eachRadio) {
    if (eachRadio.attributes["id"].value === "no-reward") {
      eachRadio.checked = true;
      eachRadio.attributes["aria-checked"].value = "true";
    } else {
      eachRadio.checked = false;
      eachRadio.attributes["aria-checked"].value = "false";
    }
  });
}

function setProgressBarProp() {
  var { totalAmountDisplay } = ourSelectors();
  var totalAmtWithoutPunc = totalAmountDisplay.innerText.match(/\d/gi).join("");

  var totalAmtPercentage = (totalAmtWithoutPunc / 100000) * 100;

  console.log(totalAmtPercentage);
  document.documentElement.style.setProperty(
    "--progress-width",
    String(totalAmtPercentage) + "%"
  );
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

function addClickEventToFundriserElement() {
  var { fundriserSectionElement } = ourSelectors();

  fundriserSectionElement.addEventListener("click", selectBookmark);

  fundriserSectionElement.addEventListener(
    "click",
    focusClickedEleToExitModalFundriser
  );
}

// bookmark - btn;

function selectBookmark(event) {
  if (event.target.parentElement.className == "bookmark-btn") {
    this.classList.toggle("activated-bookmarked");
  }
  if (event.target.attributes["class"]) {
    switch (event.target.attributes["class"].value) {
      case "bookmark-wrapper":
        this.classList.toggle("activated-bookmarked");
        break;
      case "bookmark-circle":
        this.classList.toggle("activated-bookmarked");
        break;
      case "bookmark-logo":
        this.classList.toggle("activated-bookmarked");
        break;
    }
  }
}

var clickedElement;

/***** click on "back this project btn" *****/

function focusClickedEleToExitModalFundriser(event) {
  if (event.target.tagName == "BUTTON") {
    addClickedBtnToArr(event.target);
  }
}

/***** click on "back this project btn" *****/
function addClickedBtnToArr(elementInput) {
  // console.trace();
  var arrOfClickedBtn = [];
  var backThisProjectBtnClicked = elementInput.className.split(" ")[1];
  var selectRewardBtnClicked = elementInput.className.split(" ")[2];

  if (backThisProjectBtnClicked == "back-project-btn") {
    arrOfClickedBtn.push(elementInput);
  } else if (selectRewardBtnClicked == "Select-Reward") {
    arrOfClickedBtn.push(elementInput);
  }

  function returnArrOfFirstClickedBtn() {
    // console.log(arrInput);
    var copyOfArr = [...arrOfClickedBtn];

    return copyOfArr;
  }
  /***** assigning the func reference of returnAff to clickedElement then we run clickedELement in event feature func *****/
  clickedElement = returnArrOfFirstClickedBtn;
  /***** assigning the func reference of returnAff to clickedElement then we run clickedELement in event feature func *****/
}

/***** modal keyboard function. focus on clicked element when we exit the modal *****/

function focusClickedElementModalFeature() {
  var { fundriserSectionElement } = ourSelectors();

  console.log(fundriserSectionElement);
}

/***** modal keyboard function. focus on clicked element when we exit the modal *****/

function activatePledgeModal() {}

/***** modal tab focus cycle  *****/

focusTabbingModal();

function focusTabbingModal() {
  var arrOfFocusable = ["A", "BUTTON", "INPUT"];
  var addKeypressListenerToDialog1 = document.querySelector('[id="dialog1"]');

  var result = arrOfFocusable.reduce(function getFocusableElement(
    buildingUp,
    currentValue
  ) {
    var addArrayToResult = Array.from(
      document.querySelectorAll(`[id="dialog1"] ${currentValue}`)
    );
    // var addArrayToResult = Array.prototype.slice.call(
    //   document.querySelectorAll(`[id]="dialog1" ${currentValue}`)
    // );

    buildingUp = [...buildingUp, addArrayToResult];
    return buildingUp;
  },
  []);
  var [, arrOfBtnModalElement] = result;
  var [firstElement, , , lastElement] = arrOfBtnModalElement;

  console.log(arrOfBtnModalElement);
  console.log(firstElement);
  console.log(lastElement);
  /* add event listener to dialog */

  addKeypressListenerToDialog1.addEventListener(
    "keydown",
    function modalCycle(event) {
      switch (event.code) {
        case "Tab":
          if (event.shiftKey === true) {
            if (document.activeElement == firstElement) {
              lastElement.focus();
              event.preventDefault();
            }
          } else {
            if (document.activeElement == lastElement) {
              firstElement.focus();
              event.preventDefault();
            }
          }
          break;
      }
    }
  );

  /* add event listener to dialog */
}

/***** modal tab focus cycle  *****/

/* click on select reward btn will display modal and set focus on the corresponding pledge container*/

function selectCorrespondingPledge() {
  var { rewardContainerElement } = ourSelectors();
  /***** when we had both of these code running, it cause both event to fire when we use the space or enter key to activate the modal *****/
  rewardContainerElement.addEventListener(
    "click",
    showModalAndSelectCorrectPlege
  );
  // rewardContainerElement.addEventListener(
  //   "keydown",
  //   showModalAndSelectCorrectPlege
  // );
}

/***** use this function for keyboard *****/

function showModalAndSelectCorrectPlege(event) {
  var { arrOfLabelsOfPledgeTitleAmtQuanContainer } = ourSelectors();
  if (event.target.tagName == "BUTTON") {
    let matchThisString = event.target.className.split(" ")[1].split("-")[0];

    // var [matchingPledgeLabel] =
    //   arrOfLabelsOfPledgeTitleAmtQuanContainer.filter(
    //     function findMatchingLabel(eachLabel) {
    //       var labelInnerText = eachLabel.innerText.split(" ")[0];
    //       return matchThisString === labelInnerText;
    //     }
    //   );

    var arrOfSubarrays = arrOfLabelsOfPledgeTitleAmtQuanContainer.reduce(
      function makeTwoArrays(buildingUp, currentValue) {
        var [firstSubarray, secondSubarray] = buildingUp;
        var labelInnerText = currentValue.innerText.split(" ")[0];
        if (labelInnerText === matchThisString) {
          //use spread operator
          // firstSubarray = [...firstSubarray, currentValue];
          // return [firstSubarray, secondSubarray];
          firstSubarray.push(currentValue);
          return [firstSubarray, secondSubarray];
        } else {
          //use spread operator
          // secondSubarray = [...secondSubarray, currentValue];
          // return [firstSubarray, secondSubarray];
          secondSubarray.push(currentValue);
          return [firstSubarray, secondSubarray];
        }
      },
      [[], []]
    );
    //arrOfSubarrays have two subarrays. when we use destructuring the variable we use will be arrays. we can use nested destructuring to get the value of that array
    var [[matchingPledgeLabel] = addClassToElement, removeClassToElements] =
      arrOfSubarrays;

    let focusThisRadioBtn = matchingPledgeLabel.previousElementSibling;
    let addClassWithTealBorderToElement =
      matchingPledgeLabel.parentElement.parentElement.parentElement;
    focusThisRadioBtn.checked = true;
    addClassWithTealBorderToElement.classList.add("selected-pledge-border");
    putFocusOnAmtInputBasedOnPledgeSelected(matchingPledgeLabel);
    //loop through element in array and remove class. select the article container that we want to remove the class. it is the element that has
    //border declaration declared on it in css
    removeClassToElements.forEach(function removeClass(element) {
      element.parentElement.parentElement.parentElement.classList.remove(
        "selected-pledge-border"
      );
    });
    focusClickedEleToExitModalRewardContainer(event.target);
  }
  event.stopPropagation();
}

function focusClickedEleToExitModalRewardContainer(elementInput) {
  // console.trace();
  addClickedBtnToArr(elementInput);
}

/***** use this function for keyboard *****/

function putFocusOnAmtInputBasedOnPledgeSelected(element) {
  let [, focusThisElement] = Array.from(
    element.parentElement.nextElementSibling.nextElementSibling
      .firstElementChild.nextElementSibling.firstElementChild.children
  );
  // let [, focusThisElement] = Array.prototype.slice.call(
  //   matchingPledgeLabel.parentElement.nextElementSibling
  //     .nextElementSibling.firstElementChild.nextElementSibling.children
  // );
  focusThisElement.focus();
}
/* click on select reward btn will display modal and set focus on the corresponding pledge container*/

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

  addListenerToDialog1.addEventListener("click", eventFeaturesOnModalDialogOne);
  // addListenerToDialog1.addEventListener("keydown", getAmount);
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

/***** run function based on event/feature *****/
var secondClickedElement;
function eventFeaturesOnModalDialogOne(eventInput) {
  var btnClickedClassname = eventInput.target.className.split(" ")[1];
  var ourArray;
  var arrOfElementClicked;
  if (
    eventInput.target.tagName == "BUTTON" &&
    btnClickedClassname == "starter-submit-btn"
  ) {
    if (clickedElement != undefined) {
      ourArray = clickedElement();
    }
    getAmount(eventInput);
    arrOfElementClicked = addFirstAndSecondClickedELementIntoArr(
      ourArray,
      eventInput
    );
  } else if (
    eventInput.target.tagName == "BUTTON" &&
    eventInput.target.className.includes("close-dialog1")
  ) {
    /* idea: when close btn clicked or escape btn is pressed we access to the arr with the first clicked element from fundriser or pledge selected */
  }

  function passedArrOfClickedELementToDialogTwo() {
    var copyArrOfFirstSecondClickedELe = [...arrOfElementClicked];
    // var copyArrOfFirstSecondClickedELe = [].concat(arrOfElementClicked);
    // var copyArrOfFirstSecondClickedELe = arrOfElementClicked.slice();
    return copyArrOfFirstSecondClickedELe;
  }
  secondClickedElement = passedArrOfClickedELementToDialogTwo;
}

/***** run function based on event/feature *****/

function addFirstAndSecondClickedELementIntoArr(arrInput, eventInput) {
  var copyOfArrInput = arrInput.slice();
  // var copyOfArrInput = [].concat(arrInput);
  // var copyOfArrInput = [...arrInput];
  copyOfArrInput = [...copyOfArrInput, eventInput.target];
  return copyOfArrInput;
}

/***** escape key and closed btn clicked on dialog 1 *****/

function escapeBtnKeydownDialogOne() {
  /***** make a class that will toggle show or hiding modal *****/
}

function btnOfDialogOneClicked(arrInput) {
  /***** make a class that will toggle show or hiding modal *****/
  /***** we want to toggle the show class and focus the element that clicked in fundriser or pledge section *****/
}

/***** escape key and closed btn clicked on dialog 1 *****/

/***** second modal will launch after we click the 'continue' btn *****/

function activateCompletedModal() {}

/***** second modal will launch after we click the 'continue' btn *****/
/***** escape key and closed btn clicked on dialog 2 *****/

function eventListenerOnModalDialogTwo(eventInput) {
  var { dialog2Element } = ourSelectors();
  dialog2Element.addEventListener("click", btnOfDialogTwoClicked);
  dialog2Element.addEventListener("keydown", escapeBtnKeydownDialogTwo);
}

function escapeBtnKeydownDialogTwo(event) {
  var arrOfTwoClickedElements = secondClickedElement();
  /* we want to passed the arr with the btn clicked from fundriser or select-btn to these funcs*/
  /* when we hit the escape key we want to close the modal and focus on the "continue" btn that was clicked to submit the pledge*/
}

function btnOfDialogTwoClicked(event) {
  var arrOfTwoClickedElements = secondClickedElement();
  /* we want to passed the arr with the btn clicked from fundriser or select-btn to these funcs*/
  /* when we hit the "got it" btn we want to close the modal and focus on the "continue" btn that was clicked to submit the pledge*/
}

/***** escape key and closed btn clicked on dialog 2 *****/

/***** second modal will launch after we click the 'continue' btn *****/

/***** use this function in click and keydown event *****/

function getAmount(event) {
  var { arrOfRadioBtn } = ourSelectors();
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
}

/***** use this function in click and keydown event *****/

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
        event.target.parentElement.parentElement.parentElement.classList.add(
          "selected-pledge-border"
        );
        // event.target.parentElement.parentElement.parentElement.style.setProperty(
        //   "--selected-pledge",
        //   "var(--clr-primary-dark-cyan)"
        // );
        // --clr-primary-dark-cyan
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
  var removeClassTurnAriaFalse = arrRadioBtn.filter(function findFalse(
    eachBtn
  ) {
    return eachBtn != radioBtnInput;
  });

  removeClassTurnAriaFalse.forEach(function removeClassAndAriaFlase(
    eachRadioBtn
  ) {
    eachRadioBtn.attributes["aria-checked"].value = "false";
    eachRadioBtn.parentElement.parentElement.parentElement.classList.remove(
      "selected-pledge-border"
    );
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
  substractOneOffPledgesLeft(arrOfSpanDigitElement);
  //update total number of pledges
  addOneToTotalBackers(totalBackersAmountContainer);
  //update total amount based on pledges
  var strFormNewTotal = increaseTotalBackedBasedOnPledge(
    amountInput,
    currTotalAmount
  );
  updateTotalAmtDisplay(strFormNewTotal);
  //update the progress bar based on calculation
  updateProgressBar(strFormNewTotal);
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
  var newTotal = totalBackedAmtInput + pledgeAmtInput;
  var strFormNewTotal = String(newTotal);
  return strFormNewTotal;
}

function addCommasToStrFormTotal(strInput) {
  var lengthOfStr = strInput.length;
  var addCommas;
  switch (lengthOfStr) {
    case 4:
      console.log("length is 4");
      var leftSide = strInput.slice(0, 1);
      var rightSide = strInput.slice(1);
      addCommas = [...leftSide, ...[","], ...rightSide];

      break;
    case 5:
      console.log("length is 5");
      var leftSide = strInput.slice(0, 2);
      var rightSide = strInput.slice(2);
      addCommas = [...leftSide, ...[","], ...rightSide];

      break;
    case 6:
      console.log("length is 6");
      var leftSide = strInput.slice(0, 3);
      var rightSide = strInput.slice(3);
      addCommas = [...leftSide, ...[","], ...rightSide];

      break;

    case 7:
      console.log("length is 7");
      var leftSide = strInput.slice(0, 1);
      var middle = strInput.slice(1, 4);
      var rightSide = strInput.slice(4);
      addCommas = [...leftSide, ...[","], ...middle, ...[","], ...rightSide];
      console.log(addCommas);
      break;
  }

  return addCommas.join("");
}

function updateTotalAmtDisplay(strInput) {
  var { totalAmountDisplay } = ourSelectors();
  if (strInput.length < 4) {
    totalAmountDisplay.innerText = "$" + `${strInput}`;
  } else {
    let useStrInTotalAmtDisplay = addCommasToStrFormTotal(strInput);
    totalAmountDisplay.innerText = "$" + `${useStrInTotalAmtDisplay}`;
  }
}

function updateProgressBar(strInput) {
  var convertStrToNum = Number(strInput);
  var calculatedPercentForProgressBar = (convertStrToNum / 100000) * 100;
  document.documentElement.attributes["style"].value =
    "--progress-width:" + String(calculatedPercentForProgressBar) + "%";
  // document.documentElement.style.setProperty(
  //   "--progress-width",
  //   calculatedPercentForProgressBar + "%"
  // );
}
