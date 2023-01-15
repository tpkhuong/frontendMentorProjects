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

  var progressbarValueNow = document.querySelector("[role='progressbar'");

  var radioBtnNoReward = document.querySelector("#no-reward");
  var dialog1HeadingTitle = document.querySelector("#dialog1-label");

  var dialog1Element = document.querySelector("#dialog1");

  var fundriserSectionElement = document.querySelector(".fundriser-name");

  var dialog2Element = document.querySelector("#dialog2");

  var dialog2HeadingTitle = document.querySelector("#dialog2-label");

  var dialog2ModalCloseModalbtn = document.querySelector(
    "[aria-label='close support modal']"
  );

  var textMatchingPercentage = document.querySelector("#text-for-percentage");

  return {
    navBar,
    quantitySelectors,
    selectPledgeInput,
    totalAmountDisplay,
    rewardContainerElement,
    arrOfLabelsOfPledgeTitleAmtQuanContainer,
    arrOfRadioBtn,
    fundriserSectionElement,
    radioBtnNoReward,
    dialog1HeadingTitle,
    dialog1Element,
    dialog2Element,
    dialog2HeadingTitle,
    dialog2ModalCloseModalbtn,
    progressbarValueNow,
    textMatchingPercentage,
  };
}

initialLoad();
// addClassFadedPledgeBasedOnPledgesQuantityDialogOne();
toggleNavMenu();
// addFadedOpacity();
addClickEventToFundriserElement();
inputFunctionality();
focusTabbingModal();
eventListenerOnModalDialogTwo();
setProgressBarProp();
selectCorrespondingPledge();
focusClickedElementModalFeature();
findRadioBtnChangeEvent();
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
    "we probably don't need to keep track of the btn click to activate modal one and activate modal 2 in one single array"
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
  addFadedPledgeClassBasedOnQuantityMainPledgeContent();
  // buildClassOfElement();
  changeBtnClassAndTextBasedOnQuantity();
}

/*****
 * func below: we want to added faded-pledge to article with class of individual-pledge. For the btn of each pledge we want to change the text from Select Reward or Out of Stock
 * and the class btn-light or btn-faded based on the quantity.
 * we want to run it on initial load and when user click on contine btn
 * *****/

// changeBtnClassAndTextBasedOnQuantity();

// function buildClassOfElement() {
//   alert(
//     "learned how to build the element.className so that our select pledge based on reward selected didn't throw an error. had to add btn-light or btn-faded to the beginning of the classname string"
//   );
//   var arrOfQuantityDigit = Array.prototype.slice.call(
//     document.querySelectorAll(".individual-pledge .quantity-digit")
//   );

//   //loop though our array of digit element. select the button of the pledge remove or add class and change innerText based on quantity digit
//   arrOfQuantityDigit.forEach(function addOrRemoveClassChangeInnerText(element) {
//     var btnOfpledgeMainContainer = element.parentElement.nextElementSibling;

//     console.log("btn-testing" + " " + btnOfpledgeMainContainer.className);
//   });
// }

function changeBtnClassAndTextBasedOnQuantity() {
  // select the quanity digit elements
  var arrOfQuantityDigit = Array.prototype.slice.call(
    document.querySelectorAll(".individual-pledge .quantity-digit")
  );

  //loop though our array of digit element. select the button of the pledge remove or add class and change innerText based on quantity digit
  arrOfQuantityDigit.forEach(function addOrRemoveClassChangeInnerText(element) {
    var btnOfpledgeMainContainer = element.parentElement.nextElementSibling;
    var btnClassNameInStrForm = btnOfpledgeMainContainer.className;
    var convertStrToNum = Number(element.innerText);
    //our condition: add or remove class and changed innerText based on quantity digit
    if (convertStrToNum <= 0) {
      //when we use element.classList.add("class") it will append to the end of the className string
      // btnOfpledgeMainContainer.classList.add("btn-faded");
      /***** we want to build the class string added btn-faded or btn-light to the beginning of the string *****/
      btnOfpledgeMainContainer.className =
        "btn-faded" + " " + btnClassNameInStrForm;
      /***** we want to build the class string added btn-faded or btn-light to the beginning of the string *****/
      btnOfpledgeMainContainer.innerText = "Out of Stock";
    } else {
      //when we use element.classList.add("class") it will append to the end of the className string
      // btnOfpledgeMainContainer.classList.add("btn-light");
      /***** we want to build the class string added btn-faded or btn-light to the beginning of the string *****/
      btnOfpledgeMainContainer.className =
        "btn-light" + " " + btnClassNameInStrForm;
      /***** we want to build the class string added btn-faded or btn-light to the beginning of the string *****/
      btnOfpledgeMainContainer.innerText = "Select Reward";
    }
  });
}

function addFadedPledgeClassBasedOnQuantityMainPledgeContent() {
  var arrOfQuantityDigit = Array.prototype.slice.call(
    document.querySelectorAll(".individual-pledge .quantity-digit")
  );

  arrOfQuantityDigit.forEach(function addFadedPledgeClassBasedOnQuanDigit(
    eachQuantityDigit
  ) {
    var articleElementWeWantToAddClassFadedPledge =
      eachQuantityDigit.parentElement.parentElement.parentElement;
    var convertInnerTextToNum = Number(eachQuantityDigit.innerText);

    if (convertInnerTextToNum <= 0) {
      articleElementWeWantToAddClassFadedPledge.classList.add("faded-pledge");
    } else {
      articleElementWeWantToAddClassFadedPledge.classList.remove(
        "faded-pledge"
      );
    }
  });
}

/*****
 * func below: we want to added faded-pledge to article with class of individual-pledge. For the btn of each pledge we want to change the text from Select Reward or Out of Stock
 * and the class btn-light or btn-faded based on the quantity.
 * we want to run it on initial load and when user click on contine btn
 * *****/

/***** we want this func to run when we activate dialog1modal: when back this project btn is clicked, pledge is select reward is clicked
 * since our quantity will decrement when we submit the reward: we want to check the quantity when submit our reward
 *  *****/

function addClassFadedPledgeBasedOnPledgesQuantityDialogOne() {
  var arrOfQuantityDigit = Array.prototype.slice.call(
    document.querySelectorAll(".pledge-quantity .quantity-digit")
  );

  /* loop through array of quantity digit array, get the digit use innerText then based on quantity we will add class faded-pledge */

  arrOfQuantityDigit.forEach(function addFadedPledgeBasedOnQuantity(element) {
    var articleElementTopLevelContainerOfQuantityDigit =
      element.parentElement.parentElement.parentElement.parentElement;
    // console.log(articleElementTopLevelContainerOfQuantityDigit);
    var convertToNumType = Number(element.innerText);
    if (convertToNumType <= 0) {
      articleElementTopLevelContainerOfQuantityDigit.classList.add(
        "faded-pledge"
      );
    } else {
      articleElementTopLevelContainerOfQuantityDigit.classList.remove(
        "faded-pledge"
      );
    }
  });

  /* loop through array of quantity digit array, get the digit use innerText then based on quantity we will add class faded-pledge */
  // var arrOfQuantityDigit = Array.from(document.querySelectorAll(".pledge-quantity .quantity-digit"));
}

/***** we want this func to run when we activate dialog1modal: when back this project btn is clicked, pledge is select reward is clicked
 * since our quantity will decrement when we submit the reward: we want to check the quantity when submit our reward
 *  *****/

function setProgressBarProp() {
  var { totalAmountDisplay } = ourSelectors();
  var totalAmtWithoutPunc = totalAmountDisplay.innerText.match(/\d/gi).join("");

  var totalAmtPercentage = (totalAmtWithoutPunc / 100000) * 100;

  /***** func below will change the attribute aria-valuenow of the element with role="progressbar" *****/

  updateARIAvalueNowProgressBar(totalAmtPercentage);

  /***** func below will change the attribute aria-valuenow of the element with role="progressbar" *****/

  /***** func below will convert totalAmtPercentage to a string then we will use that value as the innerText for the span element *****/

  updateARIAtextToMatchPercentage(totalAmtPercentage);

  /***** func below will convert totalAmtPercentage to a string then we will use that value as the innerText for the span element *****/
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
    addClickedBtnToArrShowDialogModalOne(event.target);
  }
}

/***** click on "back this project btn" *****/
function addClickedBtnToArrShowDialogModalOne(elementInput) {
  var { dialog1Element, dialog1HeadingTitle, radioBtnNoReward } =
    ourSelectors();
  // console.trace();
  var arrOfClickedBtn = [];
  var backThisProjectBtnClicked = elementInput.className.split(" ")[1];

  var selectRewardBtnClicked = elementInput.className.split(" ")[2];

  if (backThisProjectBtnClicked == "back-project-btn") {
    arrOfClickedBtn.push(elementInput);
    dialog1Element.parentElement.classList.toggle("activate");
    setTimeout(function focusHeading() {
      /* run line below when we want to focus on the radio btn of no-reward */
      radioBtnNoReward.focus();
      /* call line below when we want to put focus on the h2 title of dialog1 */
      // dialog1HeadingTitle.focus();
    }, 1000);
    /***** func below will add faded-pledge class based on the quantity of our pledges *****/
    addClassFadedPledgeBasedOnPledgesQuantityDialogOne();
    /***** func below will add faded-pledge class based on the quantity of our pledges *****/
  } else if (selectRewardBtnClicked == "Select-Reward") {
    arrOfClickedBtn.push(elementInput);
    dialog1Element.parentElement.classList.toggle("activate");
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

// function activatePledgeModal() {}

/***** modal tab focus cycle  *****/

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
  var { arrOfRadioBtn, arrOfLabelsOfPledgeTitleAmtQuanContainer } =
    ourSelectors();
  if (event.target.tagName == "BUTTON") {
    //we changed this from [1] to [0]
    let matchThisString = event.target.className.split(" ")[1].split("-")[0];
    console.log("matchthisstring", matchThisString);
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
    /***** when we didnt use setTimeout our input didnt receive focus *****/
    setTimeout(function runAfterClick() {
      focusThisRadioBtn.focus();
      // putFocusOnAmtInputBasedOnPledgeSelected(matchingPledgeLabel);
    }, 500);
    /***** when we didnt use setTimeout our input didnt receive focus *****/
    // putFocusOnAmtInputBasedOnPledgeSelected(matchingPledgeLabel);
    //loop through element in array and remove class. select the article container that we want to remove the class. it is the element that has
    //border declaration declared on it in css
    removeClassToElements.forEach(function removeClass(element) {
      element.parentElement.parentElement.parentElement.classList.remove(
        "selected-pledge-border"
      );
    });
    var radioBtnOfMatchingLabel = matchingPledgeLabel.previousElementSibling;
    var childrenOfContainerOfMatchingLabel = Array.prototype.slice.call(
      radioBtnOfMatchingLabel.parentElement.parentElement.children
    );
    // var childrenOfContainerOfMatchingLabel = Array.from(
    //   radioBtnOfMatchingLabel.parentElement.parentElement.children
    // );
    /***** funcs below will remove hide-display class to separator and select pledge based on selected radio input *****/
    removeShowClassOnSeparatorAndSelectedPledge(
      radioBtnOfMatchingLabel,
      arrOfRadioBtn
    );
    showInputAndContinueBtnBasedOnRadioChecked(
      childrenOfContainerOfMatchingLabel
    );
    /***** funcs below will remove hide-display class to separator and select pledge based on selected radio input *****/
    focusClickedEleToExitModalRewardContainer(event.target);
    /***** func below will add faded-pledge class based on the quantity of our pledges *****/
    addClassFadedPledgeBasedOnPledgesQuantityDialogOne();
    /***** func below will add faded-pledge class based on the quantity of our pledges *****/
    /***** func below will add class faded-pledge to pledge container in main page and btn-light or btn-faded to button of that pledge *****/

    changeBtnClassAndTextBasedOnQuantity();

    /***** func below will add class faded-pledge to pledge container in main page and btn-light or btn-faded to button of that pledge *****/
  }
  event.stopPropagation();
}

// function showDialogOneModal() {}

function focusClickedEleToExitModalRewardContainer(elementInput) {
  // console.trace();
  addClickedBtnToArrShowDialogModalOne(elementInput);
}

/***** use this function for keyboard *****/

/***** func below will focus the amount input of the dialog1 which is activated when user click on select btn *****/
function putFocusOnAmtInputBasedOnPledgeSelected(element) {
  let [, focusThisElement] = Array.from(
    element.parentElement.nextElementSibling.nextElementSibling
      .firstElementChild.nextElementSibling.firstElementChild.children
  );
  // let [, focusThisElement] = Array.prototype.slice.call(
  //   matchingPledgeLabel.parentElement.nextElementSibling
  //     .nextElementSibling.firstElementChild.nextElementSibling.children
  // );
  // console.log("this is putFocusOnAmtInput", focusThisElement);
  focusThisElement.focus();
}

/***** func below will focus the amount input of the dialog1 which is activated when user click on select btn *****/

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
  addListenerToDialog1.addEventListener("keydown", escapeBtnKeydownDialogOne);
}

/***** run function based on event/feature *****/
var secondClickedElement;
function eventFeaturesOnModalDialogOne(eventInput) {
  var { dialog2Element } = ourSelectors();
  // eventInput.preventDefault();
  // var btnOfDialogOneClicked = (arrInput) => {
  //   /***** make a class that will toggle show or hiding modal *****/
  //   /***** we want to toggle the show class and focus the element that clicked in fundriser or pledge section *****/
  //   let focusThisElement = arrInput[0];
  //   console.log(this);
  //   // console.log(thisInput);
  //   // thisInput.parentElement.classList.toggle("show-for-now");
  //   focusThisElement.focus();
  // };
  console.log(eventInput);
  // var btnClickedClassname = eventInput.target.className.split(" ")[1];
  var ourArray;
  var arrOfElementClicked;
  if (
    eventInput.target.tagName == "BUTTON" &&
    eventInput.target.className.includes("submit-btn")
    // btnClickedClassname == "starter-submit-btn"
  ) {
    if (clickedElement != undefined) {
      ourArray = clickedElement();
    }
    getAmount(eventInput);
    arrOfElementClicked = addFirstAndSecondClickedELementIntoArr(
      ourArray,
      eventInput
    );
    activateCompletedModal();
    /***** func below will add faded-pledge class based on the quantity of our pledges dialog1 modal*****/
    addClassFadedPledgeBasedOnPledgesQuantityDialogOne();
    /***** func below will add faded-pledge class based on the quantity of our pledges dialog1 modal*****/
    /***** func below will add faded-pledge class based on the quantity of our pledges main pledge content section*****/
    addFadedPledgeClassBasedOnQuantityMainPledgeContent();
    /***** func below will add faded-pledge class based on the quantity of our pledges main pledge content section*****/
  } else if (
    (eventInput.target.tagName == "BUTTON" &&
      eventInput.target.className.includes("close-dialog1")) ||
    eventInput.target.parentElement.className.includes("close-dialog1")
  ) {
    /* idea: when close btn clicked or escape btn is pressed we access to the arr with the first clicked element from fundriser or pledge selected */
    if (clickedElement != undefined) {
      ourArray = clickedElement();
      // console.log(this);
      /**** when we declared the btnOfDialogOne func outside of eventFeaturesOnModal func, the this of btnOfDialogOne func is the window,
       * even when we declared btnOfDialogOne func as an arrow function outside of eventFeaturesOnModal, the this keyword was still the window object.
       * we could have used the this keyword in btnOfDialogOne func by passing the reference of this of eventFeaturesOnModal as an argument in to
       * btnOfDialongOne func call.
       * if we want to declare btnOfDialogOne func outside of eventFeaturesOnModal func and use the this keyword of eventFeaturesOnModal
       * we can use execute btnOfDialogOne with the call() pass in the this of eventFeaturesOnModal as the first argument to call() method
       * or
       *  *****/
      /***** we can declare btnOfDialogOne as an arrow function inside of eventFeatureOnModal func by doing this the this keyword of btnOfDialogOne
       * will be the this keyword of its parent function scope which will be eventFeaturesOnModal whatever call eventFeaturesOnModal func.
       * btnOfDialogOneClicked(ourArray);
       * if
       * we declare btnOfDialogOne as a func outside of eventFeaturesOnModal func the this keyword of btnOfDialogOneClicked will be the window because
       * we have to look at where it is called it is called not using new keyword or explicitly with call, apply or bind or implicit with object literal
       * therefore it is the window. even though the func is inside eventFeaturesOnModal func, our btnOfDialogOne func doesnt run until eventFeaturesOnModal
       * is called. focusBtnThatActivateDialog1AndResetDialog1ToInitialState
       *  *****/
      focusBtnThatActivateDialog1AndResetDialog1ToInitialState.call(
        this,
        ourArray
      );
      /***** add class hide-display for separator and select pledge section *****/
      loopThroughArrOfRadioBtnAddHideDisplay();
      /***** add class hide-display for separator and select pledge section *****/
    }
  }

  function passedArrOfClickedELementToDialogTwo() {
    var copyArrOfFirstSecondClickedELe = [...arrOfElementClicked];
    // var copyArrOfFirstSecondClickedELe = [].concat(arrOfElementClicked);
    // var copyArrOfFirstSecondClickedELe = arrOfElementClicked.slice();
    return copyArrOfFirstSecondClickedELe;
  }
  secondClickedElement = passedArrOfClickedELementToDialogTwo;
}

function focusBtnThatActivateDialog1AndResetDialog1ToInitialState(arrInput) {
  /***** make a class that will toggle show or hiding modal *****/
  /***** we want to toggle the show class and focus the element that clicked in fundriser or pledge section *****/
  let focusThisElement = arrInput[0];
  // console.log(focusThisElement);
  // console.log(this);
  // console.log(thisInput);
  this.parentElement.classList.toggle("activate");
  focusThisElement.focus();
  setNoRewardInputTrueRestInputFalse();
}

// function btnOfDialogOneClicked(arrInput, event) {
//   /***** make a class that will toggle show or hiding modal *****/
//   /***** we want to toggle the show class and focus the element that clicked in fundriser or pledge section *****/
//   let focusThisElement = arrInput[0];
//   console.log(event);
//   // console.log(this);
//   // console.log(thisInput);
//   this.parentElement.classList.toggle("show-for-now");
//   focusThisElement.focus();
//   event.preventDefault();
// }

/***** run function based on event/feature *****/

function addFirstAndSecondClickedELementIntoArr(arrInput, eventInput) {
  var copyOfArrInput = arrInput.slice();
  // var copyOfArrInput = [].concat(arrInput);
  // var copyOfArrInput = [...arrInput];
  copyOfArrInput = [...copyOfArrInput, eventInput.target];
  return copyOfArrInput;
}

/***** escape key and closed btn clicked on dialog 1 *****/

function escapeBtnKeydownDialogOne(event) {
  /***** make a class that will toggle show or hiding modal *****/
  console.log(event);
  var ourArrayOfClickedELementFundriserOrPledge;
  if (clickedElement != undefined) {
    ourArrayOfClickedELementFundriserOrPledge = clickedElement();
    let focusOnThisElement = ourArrayOfClickedELementFundriserOrPledge[0];
    if (event.key == "Escape") {
      /***** the this keyword of escapeBtnKeydown is the dialog1 modal because we pass this func as a callback argument in to addListenerToDialog1.addEventListener
       * which means we are not calling it. addEventListener is calling it then we have to look at what is calling addEventListener. addListenerToDialog1 is calling
       * addEventListener
       *  *****/
      this.parentElement.classList.toggle("activate");
      focusOnThisElement.focus();
      setNoRewardInputTrueRestInputFalse();
      loopThroughArrOfRadioBtnAddHideDisplay();
      // event.preventDefault();
    }
  }
}
// alert("run func below when the close modal btn is clicked too");
/***** add class hide-display for separator and select pledge section *****/
function loopThroughArrOfRadioBtnAddHideDisplay() {
  var { arrOfRadioBtn } = ourSelectors();
  var arrOfRadioBtnExceptNoRewardRadio = arrOfRadioBtn.filter(
    function doNotAddNoRewardBtn(radioBtn) {
      var idOfRadioBtn = radioBtn.attributes["id"].value;
      return idOfRadioBtn != "no-reward";
    }
  );
  /* loop through arr: select the separator element and select pledge element add hide-display class */
  arrOfRadioBtnExceptNoRewardRadio.forEach(
    function addHideDisplayToSeparatorAndSelectPledge(radioBtn) {
      var separatorElement = radioBtn.parentElement.nextElementSibling;
      var selectPledgeElement =
        radioBtn.parentElement.parentElement.lastElementChild;
      separatorElement.classList.add("hide-display");
      selectPledgeElement.classList.add("hide-display");
    }
  );
  /* loop through arr: select the separator element and select pledge element add hide-display class */
}

/***** add class hide-display for separator and select pledge section *****/

function setNoRewardInputTrueRestInputFalse() {
  var { arrOfRadioBtn } = ourSelectors();
  // select first pledge and set our pledge checked attribute to false
  arrOfRadioBtn.forEach(function setFirstPledgeCheckedTrueRestFalse(eachRadio) {
    if (eachRadio.attributes["id"].value === "no-reward") {
      eachRadio.parentElement.parentElement.parentElement.classList.add(
        "selected-pledge-border"
      );
      eachRadio.checked = true;
      eachRadio.attributes["aria-checked"].value = "true";
    } else {
      eachRadio.parentElement.parentElement.parentElement.classList.remove(
        "selected-pledge-border"
      );
      eachRadio.checked = false;
      eachRadio.attributes["aria-checked"].value = "false";
    }
  });
}

/***** second modal will launch after we click the 'continue' btn *****/

function activateCompletedModal() {
  var { dialog2Element, dialog2HeadingTitle } = ourSelectors();
  dialog2Element.parentElement.classList.toggle("activate");
  setTimeout(function focusheadingDialogTwo() {
    dialog2HeadingTitle.focus();
  }, 1000);
}

/***** second modal will launch after we click the 'continue' btn *****/

/***** func below we are calling btnOfDialogOneClicked using .call() inside of eventFeaturesOnModal, passing the this keyword of eventFeaturesOnModal into the func
 * call of btnOfDialogOneClicked
 *  *****/

// function btnOfDialogOneClicked(arrInput) {
//   /***** make a class that will toggle show or hiding modal *****/
//   /***** we want to toggle the show class and focus the element that clicked in fundriser or pledge section *****/
//   let focusThisElement = arrInput[0];
//   console.log(focusThisElement);
//   // console.log(this);
//   // console.log(thisInput);
//   this.parentElement.classList.toggle("show-for-now");
//   focusThisElement.focus();

// }

/***** func below we are calling btnOfDialogOneClicked using .call() inside of eventFeaturesOnModal, passing the this keyword of eventFeaturesOnModal into the func
 * call of btnOfDialogOneClicked
 *  *****/

/***** func below is when we call btnOfDialogOneClicked inside of eventFeaturesOnModal we pass the array and this of eventFeatureOnModal into the func call of
 * btnOfDialogOneClicked
 *  *****/

// function btnOfDialogOneClicked(arrInput, thisInput) {
//   /***** make a class that will toggle show or hiding modal *****/
//   /***** we want to toggle the show class and focus the element that clicked in fundriser or pledge section *****/
//   let focusThisElement = arrInput[0];
//   console.log(this);
//   // console.log(thisInput);
//   // thisInput.parentElement.classList.toggle("show-for-now");
//   focusThisElement.focus();
// }

/***** func below is when we call btnOfDialogOneClicked inside of eventFeaturesOnModal we pass the array and this of eventFeatureOnModal into the func call of
 * btnOfDialogOneClicked
 *  *****/
/***** escape key and closed btn clicked on dialog 1 *****/

/***** escape key and closed btn clicked on dialog 2: using different approach for dialog 2
 * the func eventListenerOnModalDialogOne is called on dialog1 when the click is use. mouse click or hitting space/enter key when
 * focus is on button
 * *****/

function eventListenerOnModalDialogTwo() {
  var { dialog2Element, dialog2ModalCloseModalbtn } = ourSelectors();
  dialog2ModalCloseModalbtn.addEventListener(
    "click",
    focusBtnOfPledgeThatActivatedDialogTwo
  );
  dialog2Element.addEventListener("keydown", escapeBtnKeydownDialogTwo);
}

function escapeBtnKeydownDialogTwo(event) {
  if (secondClickedElement != undefined) {
    let arrOfTwoClickedElements = secondClickedElement();
    if (event.key == "Escape") {
      let focusThisBtnElement = arrOfTwoClickedElements[1];
      this.parentElement.classList.toggle("activate");
      focusThisBtnElement.focus();
    }
  }
  /* we want to passed the arr with the btn clicked from fundriser or select-btn to these funcs*/
  /* when we hit the escape key we want to close the modal and focus on the "continue" btn that was clicked to submit the pledge*/
}

function focusBtnOfPledgeThatActivatedDialogTwo(event) {
  if (secondClickedElement != undefined) {
    let arrOfTwoClickedElements = secondClickedElement();
    let tagName = event.target.tagName;
    let ariaLabelValue = event.target.attributes["aria-label"].value;
    if (tagName == "BUTTON" && ariaLabelValue == "close support modal") {
      let focusBtnElement = arrOfTwoClickedElements[1];
      this.parentElement.parentElement.classList.toggle("activate");
      focusBtnElement.focus();
    }
  }
  /* we want to passed the arr with the btn clicked from fundriser or select-btn to these funcs*/
  /* when we hit the "got it" btn we want to close the modal and focus on the "continue" btn that was clicked to submit the pledge*/
}

/***** escape key and closed btn clicked on dialog 2: using different approach for dialog 2 *****/

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

function findRadioBtnChangeEvent() {
  // var inputRadioBtn = Array.from(
  //   document.querySelectorAll("input[type='radio']")
  // );
  var inputRadioBtnArray = Array.prototype.slice.call(
    document.querySelectorAll("input[type='radio']")
  );

  var addListenerToDialog1 = document.querySelector('[id="dialog1"]');

  var containerOfInputRadioCheckedChildren;
  addListenerToDialog1.addEventListener(
    "change",
    function watchForRadioBtnChange(event) {
      if (event.target.attributes["type"].value == "radio") {
        var radioBtnHasCheckedTrue = event.target;
        console.log(radioBtnHasCheckedTrue);
        /* turn the radio btn we clicked aria checked to true*/
        containerOfInputRadioCheckedChildren =
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
        /***** funcs below will remove hide-display class to separator and select pledge based on selected radio input *****/

        removeShowClassOnSeparatorAndSelectedPledge(
          radioBtnHasCheckedTrue,
          inputRadioBtnArray
        );
        showInputAndContinueBtnBasedOnRadioChecked(
          containerOfInputRadioCheckedChildren
        );
        /***** funcs below will remove hide-display class to separator and select pledge based on selected radio input *****/
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

function showInputAndContinueBtnBasedOnRadioChecked(arrOfInputRadioChecked) {
  var [, separatorElement, selectedPledgeElement] = Array.from(
    arrOfInputRadioChecked
  );

  // var [, separatorElement, selectedPledgeElement] = Array.prototype.slice.call(
  //   radioBtn.parentElement.parentElement.children
  // );
  // console.log("seprator element", separatorElement);
  // console.log("selectPledgeElement", selectedPledgeElement);
  separatorElement.classList.remove("hide-display");
  selectedPledgeElement.classList.remove("hide-display");
}

function removeShowClassOnSeparatorAndSelectedPledge(radioInput, arrRadioBtn) {
  var arrOfRadioBtnRemoveClassOnSeparatorSelectedPledge = arrRadioBtn.filter(
    function notCheckRadioBtn(eachRadio) {
      return (
        eachRadio != radioInput &&
        eachRadio.attributes["id"].value != "no-reward"
      );
    }
  );

  arrOfRadioBtnRemoveClassOnSeparatorSelectedPledge.forEach(
    function removeClassFromSeparatorSelectedPledge(radioBtn) {
      var pledgeSeparatorElement = radioBtn.parentElement.nextElementSibling;
      var pledgeSelectedEleOfInputSubmitBtn =
        radioBtn.parentElement.parentElement.lastElementChild;
      pledgeSeparatorElement.classList.add("hide-display");
      pledgeSelectedEleOfInputSubmitBtn.classList.add("hide-display");
    }
  );
  // console.log(
  //   "removeClassOnSeparatorSelectedPledge",
  //   removeClassOnSeparatorSelectedPledge
  // );
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
  /***** setting CSS variable in another func setProgressBarProp *****/
  document.documentElement.attributes["style"].value =
    "--progress-width:" + String(calculatedPercentForProgressBar) + "%";
  // document.documentElement.style.setProperty(
  //   "--progress-width",
  //   calculatedPercentForProgressBar + "%"
  // );

  /***** func below will change the attribute aria-valuenow of the element with role="progressbar" *****/

  updateARIAvalueNowProgressBar(calculatedPercentForProgressBar);

  /***** func below will change the attribute aria-valuenow of the element with role="progressbar" *****/

  /***** func below will convert calculatedPercentForProgressBar to a string then we will use that value as the innerText for the span element *****/

  updateARIAtextToMatchPercentage(calculatedPercentForProgressBar);

  /***** func below will convert calculatedPercentForProgressBar to a string then we will use that value as the innerText for the span element *****/
}

/***** we want to run these aria value and aria text func when our page load and when we update the progress bar % *****/

/***** ARIA progress bar: we want to update the aria-valuenow to reflect the % of the progress bar *****/

function updateARIAvalueNowProgressBar(percentageInput) {
  var { progressbarValueNow } = ourSelectors();

  //change the valuenow attribute of progressbarValueNow
  progressbarValueNow.attributes["aria-valuenow"].value =
    String(percentageInput);
}

/***** ARIA progress bar: we want to update the aria-valuenow to reflect the % of the progress bar *****/

/***** ARIA progress bar: we want to update text content of the span element to match the percentage of the progress bar *****/

function updateARIAtextToMatchPercentage(percentageInput) {
  var { textMatchingPercentage } = ourSelectors();
  // console.log(object);
  textMatchingPercentage.innerText = String(percentageInput);
}

/***** ARIA progress bar: we want to update text content of the span element to match the percentage of the progress bar *****/

/***** we want to run these aria value and aria text func when our page load and when we update the progress bar % *****/
