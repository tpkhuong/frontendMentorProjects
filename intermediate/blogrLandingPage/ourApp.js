function ourSelectors() {
  var hamburgerElement = document.querySelector(".hamburger");
  var navContainer = document.querySelector(".nav-login-container");
  var headerNav = document.querySelector(".header-nav");
  var ulHeaderlist = document.querySelector(".header-list");
  var btnElementsSublist = Array.from(
    document.querySelectorAll(".header-items > a.btn-link[aria-expanded]")
  );

  return {
    hamburgerElement,
    navContainer,
    headerNav,
    btnElementsSublist,
    ulHeaderlist,
  };
}

toggleNavMenu();

function toggleNavMenu(
  { hamburgerElement, navContainer, btnElementsSublist } = ourSelectors()
) {
  console.log(btnElementsSublist);
  hamburgerElement.addEventListener("click", function addClass(event) {
    this.classList.toggle("open");
    navContainer.classList.toggle("hide-off-left");
  });
  hamburgerElement.addEventListener(
    "keydown",
    function keyboardFunctionality(event) {
      console.log(event);
      var keyPressed = event.code;
      switch (keyPressed) {
        case "Space":
          event.preventDefault();
          this.classList.toggle("open");
          navContainer.classList.toggle("hide-off-left");
          break;
        case "Enter":
          this.classList.toggle("open");
          navContainer.classList.toggle("hide-off-left");
          break;
      }
    }
  );
}

// showSubmenu();
showSublistKeydown();
showSublistHover();
showSublistFocusElement();
// showSublistClickUsingMouse();
showSublistSubmenuKeydown();
keyboardFunctionality();

function showSublistKeydown(
  { ulHeaderlist, btnElementsSublist } = ourSelectors()
) {
  ulHeaderlist.addEventListener("keydown", function toggleSubmenu(event) {
    var [productBtn, companyBtn, connectBtn] = btnElementsSublist;
    var keyPressed = event.code;
    if (keyPressed == "Space") {
      event.preventDefault();
      console.log(event);
      let arrOfSubmenuElements = Array.from(
        event.target.nextElementSibling.children
      );
      var [firstLiElementSubmenu] = arrOfSubmenuElements;
      firstLiElementSubmenu.firstElementChild.focus();

      var strTextOfBtnElement = event.target.innerText;
      switch (strTextOfBtnElement) {
        case "Product":
          console.log(productBtn.attributes["aria-expanded"].value);
          productBtn.attributes["aria-expanded"].value = true;
          companyBtn.attributes["aria-expanded"].value = false;
          connectBtn.attributes["aria-expanded"].value = false;
          break;
        case "Company":
          // firstLiElementSubmenu.focus();
          productBtn.attributes["aria-expanded"].value = false;
          companyBtn.attributes["aria-expanded"].value = true;
          connectBtn.attributes["aria-expanded"].value = false;
          break;
        case "Connect":
          // firstLiElementSubmenu.focus();
          productBtn.attributes["aria-expanded"].value = false;
          companyBtn.attributes["aria-expanded"].value = false;
          connectBtn.attributes["aria-expanded"].value = true;
          break;
      }
    }
    if (keyPressed == "Enter") {
      event.preventDefault();
      let arrOfSubmenuElements = Array.from(
        event.target.nextElementSibling.children
      );
      var [firstLiElementSubmenu] = arrOfSubmenuElements;
      firstLiElementSubmenu.firstElementChild.focus();

      var strTextOfBtnElement = event.target.innerText;
      switch (strTextOfBtnElement) {
        case "Product":
          console.log(productBtn.attributes["aria-expanded"].value);
          productBtn.attributes["aria-expanded"].value = true;
          companyBtn.attributes["aria-expanded"].value = false;
          connectBtn.attributes["aria-expanded"].value = false;
          break;
        case "Company":
          productBtn.attributes["aria-expanded"].value = false;
          companyBtn.attributes["aria-expanded"].value = true;
          connectBtn.attributes["aria-expanded"].value = false;
          break;
        case "Connect":
          productBtn.attributes["aria-expanded"].value = false;
          companyBtn.attributes["aria-expanded"].value = false;
          connectBtn.attributes["aria-expanded"].value = true;
          break;
      }
    }
  });
}

function showSublistFocusElement(
  { headerNav, btnElementsSublist } = ourSelectors()
) {
  headerNav.addEventListener("focus", function toggleSubmenu(event) {
    /* using this eventListener to select the submenu */
    // var sublistSubmenuSelector = event.target.innerText;
    /* using this eventListener to select the submenu */
    var [productBtn, companyBtn, connectBtn] = btnElementsSublist;
    // console.log(event.target);
    var classOfAnchorElement = event.target.className;
    var innerTextAnchorElement = event.target.innerText;
    if (classOfAnchorElement.includes("header-sublinks")) {
      var grandParentElementInnerText =
        event.target.parentElement.parentElement.previousElementSibling
          .innerText;
      console.log(grandParentElementInnerText);
      switch (grandParentElementInnerText) {
        case "Product":
          console.log(productBtn.attributes["aria-expanded"].value);
          productBtn.attributes["aria-expanded"].value = true;
          companyBtn.attributes["aria-expanded"].value = false;
          connectBtn.attributes["aria-expanded"].value = false;
          break;
        case "Company":
          productBtn.attributes["aria-expanded"].value = false;
          companyBtn.attributes["aria-expanded"].value = true;
          connectBtn.attributes["aria-expanded"].value = false;
          break;
        case "Connect":
          productBtn.attributes["aria-expanded"].value = false;
          companyBtn.attributes["aria-expanded"].value = false;
          connectBtn.attributes["aria-expanded"].value = true;
          break;
      }
    } else if (
      classOfAnchorElement.includes("btn-link") &&
      innerTextAnchorElement == "Contact"
    ) {
      productBtn.attributes["aria-expanded"].value = false;
      companyBtn.attributes["aria-expanded"].value = false;
      connectBtn.attributes["aria-expanded"].value = true;
    } else if (
      classOfAnchorElement.includes("btn-link") &&
      innerTextAnchorElement == "Careers"
    ) {
      productBtn.attributes["aria-expanded"].value = false;
      companyBtn.attributes["aria-expanded"].value = true;
      connectBtn.attributes["aria-expanded"].value = false;
    }
    showSublistSubmenuFocus(event.target);
  });
}

function showSublistSubmenuFocus(elementInput) {
  console.log(elementInput);
  var submenuToggleElement;
  var parent = elementInput.parentElement.parentElement;
  if (parent.className.includes("header-sublist-submenu")) {
    submenuToggleElement = parent.previousElementSibling;
  }
  // while (parent) {
  //   parent = parent.parentElement;
  // }
  showSublistSubmenuToggle(submenuToggleElement);
}

/***** hover should work when on big screen, small screen we want to be able to click *****/
windowResizeEventWrapper();

function windowResizeEventWrapper() {
  window.addEventListener("load", function checkWidth(event) {
    var windowWidth = window.innerWidth;
    console.log(windowWidth);
    if (windowWidth < 770) {
      showSublistClickUsingMouse();
    } else {
      // console.log(windowWidth);
      showSublistHover();
    }
  });
  // window.addEventListener("resize", function hoverEffectOnBigScreen(event) {
  //   const smallScreenWindowWidth = event.target.innerWidth;
  //   if (smallScreenWindowWidth < 767) {
  //     console.log("resize in < 767");
  //     showSublistClickUsingMouse();
  //     return;
  //   }
  // });
  // window.addEventListener("resize", function hoverEffectOnBigScreen(event) {
  //   var windowWidth = event.target.innerWidth;
  //   if (windowWidth > 771) {
  //     console.log("resize in < 771");
  //     showSublistHover();
  //   }
  // });
}

function showSublistHover() {
  var btnElementsSublist = Array.from(
    document.querySelectorAll(".header-items > a.btn-link[aria-expanded]")
  );
  var headerNav = document.querySelector(".header-nav");
  headerNav.addEventListener("mouseover", function toggleSubmenu(event) {
    // var arrOfSubmenuElements = Array.from(
    //   event.target.nextElementSibling.children
    // );
    // var [firstSubmenuElement] = arrOfSubmenuElements;
    // firstSubmenuElement.firstElementChild.focus();
    var [productBtn, companyBtn, connectBtn] = btnElementsSublist;
    var btnElementInnerText = event.target.innerText;
    showSublistSubmenuHover(event.target);
    if (event.target.className.includes("btn-link")) {
      console.log(event.target);
      switch (btnElementInnerText) {
        case "Product":
          productBtn.attributes["aria-expanded"].value = true;
          companyBtn.attributes["aria-expanded"].value = false;
          connectBtn.attributes["aria-expanded"].value = false;
          break;
        case "Company":
          productBtn.attributes["aria-expanded"].value = false;
          companyBtn.attributes["aria-expanded"].value = true;
          connectBtn.attributes["aria-expanded"].value = false;
          break;
        case "Connect":
          productBtn.attributes["aria-expanded"].value = false;
          companyBtn.attributes["aria-expanded"].value = false;
          connectBtn.attributes["aria-expanded"].value = true;
          break;
      }
    }
  });
}

function showSublistSubmenuToggle(elementInput) {
  console.log(elementInput);
  if (
    elementInput != undefined &&
    elementInput.className.includes("btn-link")
  ) {
    var elementText = elementInput.innerText;
    var strUsedInAriaFunc;
    if (!elementText) {
      strUsedInAriaFunc = elementInput.parentElement.innerText;
    } else {
      strUsedInAriaFunc = elementInput.innerText;
    }

    var siblingOfUlElementStr = findSublistInnerText(elementInput);

    let {
      arrWithBtnWeWantToSetAriaTrue: oneOfBtnWillBeAriaTrue,
      arrWithBtnWeWantToSetAriaFalse: turnAllBtnAriaFalse,
    } = arrOfBtnElements(siblingOfUlElementStr);
    makeBtnAriaToFalse(turnAllBtnAriaFalse);
    makeBtnAriaTrueShowSubmenu(oneOfBtnWillBeAriaTrue, strUsedInAriaFunc);
  }
}

function showSublistSubmenuHover(hoveredElement) {
  if (hoveredElement.className.includes("btn-link")) {
    var hoveredElementText = hoveredElement.innerText;
    var strUsedinAriaToggleFunc;
    if (!hoveredElementText) {
      strUsedinAriaToggleFunc = hoveredElement.parentElement.innerText;
    } else {
      strUsedinAriaToggleFunc = hoveredElement.innerText;
    }

    var siblingOfUlElementStr = findSublistInnerText(hoveredElement);

    let {
      arrWithBtnWeWantToSetAriaTrue: oneOfBtnWillBeAriaTrue,
      arrWithBtnWeWantToSetAriaFalse: turnAllBtnAriaFalse,
    } = arrOfBtnElements(siblingOfUlElementStr);
    makeBtnAriaToFalse(turnAllBtnAriaFalse);
    makeBtnAriaTrueShowSubmenu(oneOfBtnWillBeAriaTrue, strUsedinAriaToggleFunc);
  }
}

/***** hover should work when on big screen, small screen we want to be able to click *****/

function showSublistSubmenuKeydown() {
  var ulHeaderlist = document.querySelector(".header-list");

  ulHeaderlist.addEventListener(
    "keydown",
    function toggleSublistSubmenu(event) {
      var keyPressed = event.code;
      //let's select the submenu link that was clicked
      if (keyPressed == "Space") {
        event.preventDefault();
        let [firstSublistSubmenuElement] = Array.from(
          event.target.nextElementSibling.children
        );
        let btnElementInnerText = event.target.innerText;
        console.log(btnElementInnerText);
        let strUsedToFilterBtnElements =
          event.target.parentElement.parentElement.previousElementSibling
            .innerText;
        let {
          arrWithBtnWeWantToSetAriaTrue: oneOfBtnWillBeAriaTrue,
          arrWithBtnWeWantToSetAriaFalse: turnAllBtnAriaFalse,
        } = arrOfBtnElements(strUsedToFilterBtnElements);
        makeBtnAriaToFalse(turnAllBtnAriaFalse);
        makeBtnAriaTrueShowSubmenu(oneOfBtnWillBeAriaTrue, btnElementInnerText);
        firstSublistSubmenuElement.firstElementChild.focus();
        event.stopPropagation();
      } else if (keyPressed == "Enter") {
        alert("work on enter key");
      }
    }
  );
}

function arrOfBtnElements(strInput) {
  var submenuBtnElements = Array.from(
    document.querySelectorAll(
      ".header-subitems a[aria-expanded][aria-haspopup]"
    )
  );
  /***** this returns one arr *****/
  var arrWithBtnWeWantToSetAriaTrue = submenuBtnElements.filter(
    function btnElementMatchStrInput(eachBtnElement) {
      var btnElementGrandParentSiblingInnerText =
        eachBtnElement.parentElement.parentElement.previousElementSibling
          .innerText;
      return strInput == btnElementGrandParentSiblingInnerText;
    }
  );

  var arrWithBtnWeWantToSetAriaFalse = submenuBtnElements.reduce(
    function btnElementDoesNotMatchStr(buildingUp, currentValue) {
      var btnElementGrandParentSiblingInnerText =
        currentValue.parentElement.parentElement.previousElementSibling
          .innerText;
      if (strInput != btnElementGrandParentSiblingInnerText) {
        return [...buildingUp, currentValue];
      }
      return buildingUp;
    },
    []
  );
  /***** use reduce *****/
  // let arrOfBtnMatched = [];
  // let arrOfBtnNotMatched = [];
  // var ourObjOfArr = submenuBtnElements.reduce(function objWithArrays(
  //   buildingUp,
  //   currentValue
  // ) {
  //   debugger;
  //   var btnElementGrandParentSiblingInnerText =
  //     currentValue.parentElement.parentElement.previousElementSibling.innerText;
  //   if (strInput == btnElementGrandParentSiblingInnerText) {
  //     arrOfBtnMatched = arrOfBtnMatched.concat([currentValue]);
  //     return Object.assign(buildingUp, { arrOfBtnMatched });
  //   } else {
  //     arrOfBtnNotMatched = arrOfBtnNotMatched.concat([currentValue]);
  //     return Object.assign(buildingUp, { arrOfBtnNotMatched });
  //   }
  // },
  // {});

  /***** use reduce *****/
  return { arrWithBtnWeWantToSetAriaTrue, arrWithBtnWeWantToSetAriaFalse };
  /***** this returns one arr *****/
  // submenuBtnElements.forEach(function printParentELement(eachBtnElement) {
  //   console.log(
  //     eachBtnElement.parentElement.parentElement.previousElementSibling
  //       .innerText
  //   );
  // });
}

function makeBtnAriaTrueShowSubmenu(arrInput, strInput) {
  arrInput.forEach(function findBtnMatchStrInputMakeAriaTrue(eachBtn) {
    if (eachBtn.innerText == strInput) {
      eachBtn.attributes["aria-expanded"].value = true;
      eachBtn.attributes["aria-haspopup"].value = true;
    } else {
      eachBtn.attributes["aria-expanded"].value = false;
      eachBtn.attributes["aria-haspopup"].value = false;
    }
  });
}

function makeBtnAriaToFalse(arrInput) {
  arrInput.forEach(function turnAriaToFalse(eachBtnElement) {
    eachBtnElement.attributes["aria-expanded"].value = false;
    eachBtnElement.attributes["aria-haspopup"].value = false;
  });
}

function showSublistClickUsingMouse(
  { headerNav, btnElementsSublist } = ourSelectors()
) {
  headerNav.addEventListener("click", function toggleSubmenu(event) {
    event.preventDefault();
    var [productBtn, companyBtn, connectBtn] = btnElementsSublist;
    var classOfClickElement = event.target.className;
    if (classOfClickElement.includes("btn-link")) {
      var strTextOfBtnElement = event.target.innerText;
      showSublistSubmenuToggle(event.target);
      switch (strTextOfBtnElement) {
        case "Product":
          console.log(productBtn.attributes["aria-expanded"].value);
          productBtn.attributes["aria-expanded"].value = true;
          companyBtn.attributes["aria-expanded"].value = false;
          connectBtn.attributes["aria-expanded"].value = false;
          break;
        case "Company":
          productBtn.attributes["aria-expanded"].value = false;
          companyBtn.attributes["aria-expanded"].value = true;
          connectBtn.attributes["aria-expanded"].value = false;
          break;
        case "Connect":
          productBtn.attributes["aria-expanded"].value = false;
          companyBtn.attributes["aria-expanded"].value = false;
          connectBtn.attributes["aria-expanded"].value = true;
          break;
      }
    } else if (classOfClickElement.includes("arrow-icon")) {
      let parentBtnElement = event.target.parentElement.innerText;
      showSublistSubmenuToggle(event.target);
      // console.log(event.target);
      switch (parentBtnElement) {
        case "Product":
          console.log(productBtn.attributes["aria-expanded"].value);
          productBtn.attributes["aria-expanded"].value = true;
          companyBtn.attributes["aria-expanded"].value = false;
          connectBtn.attributes["aria-expanded"].value = false;
          // showSublistSubmenuClick(parentBtnElement);
          break;
        case "Company":
          productBtn.attributes["aria-expanded"].value = false;
          companyBtn.attributes["aria-expanded"].value = true;
          connectBtn.attributes["aria-expanded"].value = false;
          break;
        case "Connect":
          productBtn.attributes["aria-expanded"].value = false;
          companyBtn.attributes["aria-expanded"].value = false;
          connectBtn.attributes["aria-expanded"].value = true;
          break;
        case "Pricing":
          break;
      }
    }
  });
}

function findSublistInnerText(element) {
  var siblingElementStrUseInFunc;
  console.log(element);

  var parent = element.parentElement;
  while (parent) {
    if (parent.className.includes("header-sublist")) {
      let siblingElement = parent.previousElementSibling;
      siblingElementStrUseInFunc = siblingElement.innerText;
    }
    parent = parent.parentElement;
  }
  return siblingElementStrUseInFunc;
}
// function findCulprits(elem) {
//   if (!elem) {
//     throw new Error("Could not find element with that selector");
//   }
//   let parent = elem.parentElement;
//   while (parent) {
//     const { transform, willChange } = getComputedStyle(parent);
//     if (transform !== "none" || willChange === "transform") {
//       console.warn("🚨 Found a culprit! 🚨\n", parent, {
//         transform,
//         willChange,
//       });
//     }
//     parent = parent.parentElement;
//   }
// }

// keyboardFunctionality();

function removeEventlistener() {}

function keyboardFunctionality(
  { ulHeaderlist, btnElementsSublist } = ourSelectors()
) {
  var [productBtn, companyBtn, connectBtn] = btnElementsSublist;
  ulHeaderlist.addEventListener("keydown", function toggleSubmenu(event) {
    // console.log(event);
    var keyPressed = event.key;

    switch (keyPressed) {
      case "ArrowLeft":
        leftArrow(event.target, btnElementsSublist);
        event.preventDefault();
        break;
      case "ArrowRight":
        rightArrow(event.target, btnElementsSublist);
        event.preventDefault();
        break;
      case "ArrowUp":
        upArrow(event.target, event);
        event.preventDefault();
        break;
      case "ArrowDown":
        downArrow(event.target);
        event.preventDefault();
        break;
    }
    event.stopPropagation();
  });
}

function leftArrow(elementClicked, arrOfBtn) {
  var elementInnerText = elementClicked.innerText;
  var [productBtn, companyBtn, connectBtn] = arrOfBtn;
  switch (elementInnerText) {
    case "Product":
      connectBtn.focus();
      break;
    case "Company":
      productBtn.focus();
      break;
    case "Connect":
      companyBtn.focus();
      break;
  }
  console.log(elementClicked);
}

function leftArrowSubmenu() {}

function rightArrow(elementClicked, arrOfBtn) {
  // console.log(elementClicked);
  var elementInnerText = elementClicked.innerText;
  var [productBtn, companyBtn, connectBtn] = arrOfBtn;
  switch (elementInnerText) {
    case "Product":
      companyBtn.focus();
      break;
    case "Company":
      connectBtn.focus();
      break;
    case "Connect":
      productBtn.focus();
      break;
    // case "Pricing":
    //   break;
  }
  rightArrowSubmenu(elementClicked, arrOfBtn);
}

function rightArrowSubmenu(elementInput, arrOfTopMenuBtn) {
  // console.log(elementInput);
  // console.log(arrOfTopMenuBtn);
  var arrOfStrings = ["Product", "Company", "Connect"];
  var [productBtn, companyBtn, connectBtn] = arrOfTopMenuBtn;
  var parentEleOfClickedEle = elementInput.parentElement.parentElement;
  if (
    parentEleOfClickedEle.tagName == "UL" &&
    arrOfStrings.includes(
      parentEleOfClickedEle.previousElementSibling.innerText
    )
  ) {
    // var [
    //   arrAnchorTagWithoutArrow,
    //   arrAnchorTagWithArrow,
    // ] = Array.prototype.slice.call(parentEleOfClickedEle.children);
    var [arrAnchorTagWithArrow, arrAnchorTagWithoutArrow] = Array.from(
      parentEleOfClickedEle.children
    ).reduce(
      function buildTwoArr(buildingUp, currentValue) {
        var [firstSubarray] = buildingUp;
        var [, secondSubarray] = buildingUp;
        if (currentValue.firstElementChild.firstElementChild) {
          return [
            [...firstSubarray, currentValue.firstElementChild],
            secondSubarray,
          ];
        } else {
          return [
            firstSubarray,
            [...secondSubarray, currentValue.firstElementChild],
          ];
        }
      },
      [[], []]
    );
    if (
      arrAnchorTagWithArrow.includes(elementInput) &&
      elementInput.nextElementSibling.tagName == "UL"
    ) {
      // turn aria-expanded to true for the element clicked
      arrAnchorTagWithArrow.forEach(function turnOnAria(eachAnchor) {
        if (eachAnchor == elementInput) {
          eachAnchor.attributes["aria-expanded"].value = true;
        } else {
          eachAnchor.attributes["aria-expanded"].value = false;
        }
      });
      // get the child of the ul of the element clicked, the ul will be a sibling of the element clicked
      // var [firstSubmenuAnchor] = Array.prototype.slice.call(
      //   elementInput.nextElementSibling.children
      // );
      var [firstSubmenuAnchor] = Array.from(
        elementInput.nextElementSibling.children
      ).reduce(function justAnchorTag(buildingUp, currentValue) {
        return [...buildingUp, currentValue.firstElementChild];
      }, []);
      firstSubmenuAnchor.focus();
      // if (document.activeElement == firstSubmenuAnchor) {
      //   upArrowSubmenu(elementInput);
      //   console.log(arrOfTopMenuBtn);
      // }
    } else {
    }
  }
  // while (parentEleOfClickedEle) {

  //   parentEleOfClickedEle = parentEleOfClickedEle.parentElement;
  // }
}

function upArrow(elementClicked, eventInput) {
  // var childrenOfUnorderList = Array.prototype.slice.call(
  //   elementClicked.nextElementSibling.children
  // );
  showSublistUpDownArrow(elementClicked.innerText);
  var arrOfStrings = ["Product", "Company", "Connect"];
  if (arrOfStrings.includes(elementClicked.innerText)) {
    var childrenOfUnorderList = Array.from(
      elementClicked.nextElementSibling.children
    );
    // var focusTheseElements = childrenOfUnorderList.map(
    //   function justAnchorElements(eachElement) {
    //     return eachElement.firstElementChild;
    //   }
    // );

    var focusTheseElements = childrenOfUnorderList.reduce(
      function justAnchorElements(buildingUp, currentValue) {
        // return [...buildingUp, currentValue.firstElementChild];
        return buildingUp.concat([currentValue.firstElementChild]);
      },
      []
    );
    console.log(focusTheseElements);
    var lastElement = focusTheseElements[focusTheseElements.length - 1];
    lastElement.focus();
    // console.log(lastElement);
  } else if (elementClicked.parentElement.previousElementSibling == null) {
    var arrOfSublistSubmenuAnchorUpArrow;
    console.log("Product, or Company, Connect");
    var topLevelSubmenuInnerText =
      elementClicked.parentElement.parentElement.previousElementSibling
        .innerText;
    let parentElementOfEleClicked = elementClicked.parentElement.parentElement;
    // while (parentElementOfEleClicked) {
    //   parentElementOfEleClicked = parentElementOfEleClicked.parentElement;
    // }
    let parentClassName = parentElementOfEleClicked.className.split(" ")[0];
    if (
      parentElementOfEleClicked.tagName == "UL" &&
      parentClassName == "header-sublist" &&
      arrOfStrings.includes(topLevelSubmenuInnerText)
    ) {
      // arrOfSublistSubmenuAnchorUpArrow = Array.prototype.slice
      //   .call(parentElementOfEleClicked.children)
      //   .map(function onlyAnchorTags(eachValue) {
      //     return eachValue.firstElementChild;
      //   });
      arrOfSublistSubmenuAnchorUpArrow = Array.from(
        parentElementOfEleClicked.children
      ).reduce(function onlyAnchorTags(buildingUp, currentValue) {
        return [...buildingUp, currentValue.firstElementChild];
      }, []);
      console.log(arrOfSublistSubmenuAnchorUpArrow);

      // let arrOfAnchorTagWithArrowIcon = Array.from(
      //   parentElementOfEleClicked.children
      // ).reduce(function onlyAnchorTags(buildingUp, currentValue) {
      //   if (
      //     currentValue.firstElementChild.firstElementChild &&
      //     currentValue.firstElementChild.firstElementChild.className.includes(
      //       "arrow-icon"
      //     )
      //   ) {
      //     return [...buildingUp, currentValue.firstElementChild];
      //   }
      //   return buildingUp;
      // }, []);
      let lastElementOfSublistSubmenu =
        arrOfSublistSubmenuAnchorUpArrow[
          arrOfSublistSubmenuAnchorUpArrow.length - 1
        ];
      lastElementOfSublistSubmenu.focus();
      // if (
      //   arrOfStrings.includes(
      //     parentElementOfEleClicked.previousElementSibling.innerText
      //   )
      // ) {
      // }
    } else if (
      elementClicked.parentElement.parentElement.className.includes(
        "header-sublist-submenu"
      ) &&
      elementClicked.parentElement.parentElement.previousElementSibling
        .firstElementChild.className == "arrow-icon"
    ) {
      alert("selecting submenu of sublist UL");
      console.log(elementClicked);
    }
  } else {
    // console.trace();
    // console.log(elementClicked);
    //we are going from the last item of the sublistsubmenu to the top of the list.
    //let previousSiblingAnchorElement =
    elementClicked.parentElement.previousElementSibling.firstElementChild.focus();
    // previousSiblingAnchorElement.focus();
  }
}

function showSublistUpDownArrow(strInput) {
  var { btnElementsSublist } = ourSelectors();
  var [productBtn, companyBtn, connectBtn] = btnElementsSublist;
  switch (strInput) {
    case "Product":
      productBtn.attributes["aria-expanded"].value = true;
      companyBtn.attributes["aria-expanded"].value = false;
      connectBtn.attributes["aria-expanded"].value = false;
      break;
    case "Company":
      productBtn.attributes["aria-expanded"].value = false;
      companyBtn.attributes["aria-expanded"].value = true;
      connectBtn.attributes["aria-expanded"].value = false;
      break;
    case "Connect":
      productBtn.attributes["aria-expanded"].value = false;
      companyBtn.attributes["aria-expanded"].value = false;
      connectBtn.attributes["aria-expanded"].value = true;
      break;
  }
}

function upArrowSubmenu(arrOfBtnAnchorInput) {
  console.log("we here");
  console.log(arrOfBtnAnchorInput);
}

function downArrow(elementClicked) {
  // var childrenOfUnorderList = Array.prototype.slice.call(
  //   elementClicked.nextElementSibling.children
  // );
  // console.log(elementClicked.parentElement.nextElementSibling);
  var childrenOfUnorderList;
  // var focusTheseElements = childrenOfUnorderList.map(
  //   function justAnchorElements(eachElement) {
  //     return eachElement.firstElementChild;
  //   }
  // );
  var focusTheseElements;
  var firstElement;
  showSublistUpDownArrow(elementClicked.innerText);
  var arrOfStrings = ["Product", "Company", "Connect"];
  if (arrOfStrings.includes(elementClicked.innerText)) {
    childrenOfUnorderList = Array.from(
      elementClicked.nextElementSibling.children
    );
    // console.log(focusTheseElements);
    focusTheseElements = childrenOfUnorderList.reduce(
      function justAnchorElements(buildingUp, currentValue) {
        // return [...buildingUp, currentValue.firstElementChild];
        return buildingUp.concat([currentValue.firstElementChild]);
      },
      []
    );
    firstElement = focusTheseElements[0];
    firstElement.focus();
    // console.log(
    //   firstElement.parentElement.nextElementSibling.firstElementChild
    // );
    // console.log(focusTheseElements);
  } else {
    // if (elementClicked.parentElement.nextElementSibling == null) {
    //   console.log(childrenOfUnorderList);
    // }
    var arrOfSublistSubmenuAnchorDownArrow;
    var topLevelSubmenuInnerText =
      elementClicked.parentElement.parentElement.previousElementSibling
        .innerText;
    if (elementClicked.parentElement.nextElementSibling == null) {
      let parentEleTopLevel = elementClicked.parentElement.parentElement;
      // while (parentEle) {

      //   parentEle = parentEle.parentElement;
      // }
      if (
        parentEleTopLevel.tagName == "UL" &&
        arrOfStrings.includes(topLevelSubmenuInnerText)
      ) {
        if (
          arrOfStrings.includes(
            parentEleTopLevel.previousElementSibling.innerText
          )
        ) {
          // arrOfSublistSubmenuAnchor = Array.prototype.slice.call(
          //   parentEle.children
          // );
          // arrOfSublistSubmenuAnchor = Array.from(parentEle.children).reduce(
          //   function onlyAnchorEle(buildingUp, currentValue) {
          //     return buildingUp.concat([currentValue.firstElementChild]);
          //   },
          //   []
          // );
          arrOfSublistSubmenuAnchorDownArrow = Array.from(
            parentEleTopLevel.children
          ).map(function onlyAnchorEle(eachValue) {
            return eachValue.firstElementChild;
          });
        }
      }
      // console.log(arrOfSublistSubmenuAnchor);
      let lastElement =
        arrOfSublistSubmenuAnchorDownArrow[
          arrOfSublistSubmenuAnchorDownArrow.length - 1
        ];
      let firstElement = arrOfSublistSubmenuAnchorDownArrow[0];
      if (elementClicked == lastElement) {
        firstElement.focus();
      }
    } else {
      // we are focused on the first element of the sublist submenu
      let nextSiblingAnchorElement =
        elementClicked.parentElement.nextElementSibling.firstElementChild;
      nextSiblingAnchorElement.focus();
    }
  }
}

function downArrowSubmenu() {}

/***** original code *****/

function showSublistSubmenuIndividualCodeForClickAndHover() {
  function showSublistSubmenuClick(clickElement) {
    var elementInnerText = clickElement.innerText;
    var innerTextToUseInfunc;
    if (!elementInnerText) {
      innerTextToUseInfunc = clickElement.parentElement.innerText;
    } else {
      innerTextToUseInfunc = elementInnerText;
    }
    console.log(innerTextToUseInfunc);
    // alert("got the innerText of the btn submenu clicked");
    var siblingElementStr = findSublistInnerText(clickElement);
    console.log(siblingElementStr);

    let {
      arrWithBtnWeWantToSetAriaTrue: oneOfBtnWillBeAriaTrue,
      arrWithBtnWeWantToSetAriaFalse: turnAllBtnAriaFalse,
    } = arrOfBtnElements(siblingElementStr);
    makeBtnAriaToFalse(turnAllBtnAriaFalse);
    makeBtnAriaTrueShowSubmenu(oneOfBtnWillBeAriaTrue, innerTextToUseInfunc);
  }

  function showSublistSubmenuHover(hoveredElement) {
    var hoveredElementText = hoveredElement.innerText;
    var strUsedinAriaToggleFunc;
    if (!hoveredElementText) {
      strUsedinAriaToggleFunc = hoveredElement.parentElement.innerText;
    } else {
      strUsedinAriaToggleFunc = hoveredElement.innerText;
    }

    var siblingOfUlElementStr = findSublistInnerText(hoveredElement);

    let {
      arrWithBtnWeWantToSetAriaTrue: oneOfBtnWillBeAriaTrue,
      arrWithBtnWeWantToSetAriaFalse: turnAllBtnAriaFalse,
    } = arrOfBtnElements(siblingOfUlElementStr);
    makeBtnAriaToFalse(turnAllBtnAriaFalse);
    makeBtnAriaTrueShowSubmenu(oneOfBtnWillBeAriaTrue, strUsedinAriaToggleFunc);
  }
}

function showSubmenu({ headerNav, btnElementsSublist } = ourSelectors()) {
  headerNav.addEventListener("keydown", function toggleSubmenu(event) {
    var [productBtn, companyBtn, connectBtn] = btnElementsSublist;
    var keyPressed = event.code;
    if (keyPressed == "Space") {
      event.preventDefault();
      let arrOfSubmenuElements = Array.from(
        event.target.nextElementSibling.children
      );
      var [firstLiElementSubmenu] = arrOfSubmenuElements;
      firstLiElementSubmenu.firstElementChild.focus();

      var strTextOfBtnElement = event.target.innerText;
      switch (strTextOfBtnElement) {
        case "Product":
          console.log(productBtn.attributes["aria-expanded"].value);
          productBtn.attributes["aria-expanded"].value = true;
          companyBtn.attributes["aria-expanded"].value = false;
          connectBtn.attributes["aria-expanded"].value = false;
          break;
        case "Company":
          // firstLiElementSubmenu.focus();
          productBtn.attributes["aria-expanded"].value = false;
          companyBtn.attributes["aria-expanded"].value = true;
          connectBtn.attributes["aria-expanded"].value = false;
          break;
        case "Connect":
          // firstLiElementSubmenu.focus();
          productBtn.attributes["aria-expanded"].value = false;
          companyBtn.attributes["aria-expanded"].value = false;
          connectBtn.attributes["aria-expanded"].value = true;
          break;
      }
    }
    if (keyPressed == "Enter") {
      event.preventDefault();
      let arrOfSubmenuElements = Array.from(
        event.target.nextElementSibling.children
      );
      var [firstLiElementSubmenu] = arrOfSubmenuElements;
      firstLiElementSubmenu.firstElementChild.focus();

      var strTextOfBtnElement = event.target.innerText;
      switch (strTextOfBtnElement) {
        case "Product":
          console.log(productBtn.attributes["aria-expanded"].value);
          productBtn.attributes["aria-expanded"].value = true;
          companyBtn.attributes["aria-expanded"].value = false;
          connectBtn.attributes["aria-expanded"].value = false;
          break;
        case "Company":
          productBtn.attributes["aria-expanded"].value = false;
          companyBtn.attributes["aria-expanded"].value = true;
          connectBtn.attributes["aria-expanded"].value = false;
          break;
        case "Connect":
          productBtn.attributes["aria-expanded"].value = false;
          companyBtn.attributes["aria-expanded"].value = false;
          connectBtn.attributes["aria-expanded"].value = true;
          break;
      }
    }
  });
  headerNav.addEventListener("click", function toggleSubmenu(event) {
    var [productBtn, companyBtn, connectBtn] = btnElementsSublist;
    var classOfClickElement = event.target.className;
    if (classOfClickElement.includes("btn-link")) {
      var strTextOfBtnElement = event.target.innerText;

      switch (strTextOfBtnElement) {
        case "Product":
          console.log(productBtn.attributes["aria-expanded"].value);
          productBtn.attributes["aria-expanded"].value = true;
          companyBtn.attributes["aria-expanded"].value = false;
          connectBtn.attributes["aria-expanded"].value = false;
          break;
        case "Company":
          productBtn.attributes["aria-expanded"].value = false;
          companyBtn.attributes["aria-expanded"].value = true;
          connectBtn.attributes["aria-expanded"].value = false;
          break;
        case "Connect":
          productBtn.attributes["aria-expanded"].value = false;
          companyBtn.attributes["aria-expanded"].value = false;
          connectBtn.attributes["aria-expanded"].value = true;
          break;
      }
    } else if (classOfClickElement.includes("arrow-icon")) {
      let parentBtnElement = event.target.parentElement.innerText;

      switch (parentBtnElement) {
        case "Product":
          console.log(productBtn.attributes["aria-expanded"].value);
          productBtn.attributes["aria-expanded"].value = true;
          companyBtn.attributes["aria-expanded"].value = false;
          connectBtn.attributes["aria-expanded"].value = false;
          break;
        case "Company":
          productBtn.attributes["aria-expanded"].value = false;
          companyBtn.attributes["aria-expanded"].value = true;
          connectBtn.attributes["aria-expanded"].value = false;
          break;
        case "Connect":
          productBtn.attributes["aria-expanded"].value = false;
          companyBtn.attributes["aria-expanded"].value = false;
          connectBtn.attributes["aria-expanded"].value = true;
          break;
      }
    }
  });

  headerNav.addEventListener("focus", function toggleSubmenu(event) {
    var [productBtn, companyBtn, connectBtn] = btnElementsSublist;

    var classOfAnchorElement = event.target.className;
    if (classOfAnchorElement.includes("header-sublinks")) {
      var grandParentElementInnerText =
        event.target.parentElement.parentElement.previousElementSibling
          .innerText;
      console.log(grandParentElementInnerText);
      switch (grandParentElementInnerText) {
        case "Product":
          console.log(productBtn.attributes["aria-expanded"].value);
          productBtn.attributes["aria-expanded"].value = true;
          companyBtn.attributes["aria-expanded"].value = false;
          connectBtn.attributes["aria-expanded"].value = false;
          break;
        case "Company":
          productBtn.attributes["aria-expanded"].value = false;
          companyBtn.attributes["aria-expanded"].value = true;
          connectBtn.attributes["aria-expanded"].value = false;
          break;
        case "Connect":
          productBtn.attributes["aria-expanded"].value = false;
          companyBtn.attributes["aria-expanded"].value = false;
          connectBtn.attributes["aria-expanded"].value = true;
          break;
      }
    }
  });

  headerNav.addEventListener("mouseover", function toggleSubmenu(event) {
    // var arrOfSubmenuElements = Array.from(
    //   event.target.nextElementSibling.children
    // );
    // var [firstSubmenuElement] = arrOfSubmenuElements;
    // firstSubmenuElement.firstElementChild.focus();
    var [productBtn, companyBtn, connectBtn] = btnElementsSublist;
    var btnElementInnerText = event.target.innerText;
    if (event.target.className.includes("btn-link")) {
      switch (btnElementInnerText) {
        case "Product":
          productBtn.attributes["aria-expanded"].value = true;
          companyBtn.attributes["aria-expanded"].value = false;
          connectBtn.attributes["aria-expanded"].value = false;
          break;
        case "Company":
          productBtn.attributes["aria-expanded"].value = false;
          companyBtn.attributes["aria-expanded"].value = true;
          connectBtn.attributes["aria-expanded"].value = false;
          break;
        case "Connect":
          productBtn.attributes["aria-expanded"].value = false;
          companyBtn.attributes["aria-expanded"].value = false;
          connectBtn.attributes["aria-expanded"].value = true;
          break;
      }
    }
  });
}

/*

// Replace this with a relevant selector.
// If you use a tool that auto-generates classes,
// you can temporarily add an ID and select it
// with '#id'.
const selector = '.the-fixed-child';
function findCulprits(elem) {
  if (!elem) {
    throw new Error(
      'Could not find element with that selector'
    );
  }
  let parent = elem.parentElement;
  while (parent) {
    const hasOverflow = getComputedStyle(parent).overflow;
    if (hasOverflow !== 'visible') {
      console.log(hasOverflow, parent);
    }
    parent = parent.parentElement;
  }
}
findCulprits(document.querySelector(selector));

*/

/***** check img alt text *****/
/*var imgArr = Array.from(document.querySelectorAll("img"));
console.log(imgArr);
console.log(`this is the array of imgs: ${imgArr}`);
imgArr.forEach(function printAltText(eachImg) {
  // console.dir(eachImg);
  if (eachImg.alt === "") {
    console.dir(`this is empty alt text: ${eachImg}`);
  } else {
    console.log(`this has alt text: ${eachImg.alt}`);
    console.dir(eachImg);
  }
});*/

/***** check img alt text *****/

/***** select all element in the body to check fontsize *****/

function findParaElements(classOrIdOfMainElement) {
  var allParagraph = Array.from(
    document.querySelectorAll(`#${classOrIdOfMainElement} p`)
  );
  allParagraph.forEach(function printFont(eachElement) {
    console.log(getComputedStyle(eachElement).fontSize);
  });
  console.log(allParagraph);
  console.log(`#${classOrIdOfMainElement} p`);
}

/***** get headings *****/

function getAllHeadings() {
  var resultArr = [];

  for (let i = 1; i < 7; i++) {
    let arrOfHeadings = Array.from(document.querySelectorAll(`h${i}`));
    resultArr = [...resultArr, arrOfHeadings];
  }
  console.log(resultArr);
  /***** first approach *****/
  // var headingH1 = document.querySelectorAll("h1");
  // var headingH2 = document.querySelectorAll("h2");
  // var headingH3 = document.querySelectorAll("h3");
  // var headingH4 = document.querySelectorAll("h4");
  // var headingH5 = document.querySelectorAll("h5");
  // var headingH6 = document.querySelectorAll("h6");

  // var printHeadings = [
  //   headingH1,
  //   headingH2,
  //   headingH3,
  //   headingH4,
  //   headingH5,
  //   headingH6,
  // ];
  // printHeadings.forEach(function consoleHeadings(eachHeading) {
  //   console.log(eachHeading);
  // });
  /***** first approach *****/
}

/***** get headings *****/

/*var allELementsOfBodyEle = Array.from(document.querySelectorAll("body *"));

allELementsOfBodyEle.forEach(function findFontSize(eachElement) {
  console.log(getComputedStyle(eachElement).fontSize);
  var fontSizeOfElement = Number(
    getComputedStyle(eachElement).fontSize.split("p")[0]
  );

  if (fontSizeOfElement < 16) {
    console.log(fontSizeOfElement);
  }
});

var allParagraphs = Array.from(document.querySelectorAll("body p"));

allParagraphs.forEach(function printFont(eachPara) {
  console.log(getComputedStyle(eachPara).fontSize);
});*/

/***** select all element in the body to check fontsize *****/

function code() {
  var arrOfSublistSubmenuAnchorUpArrow;
  console.log("Product, or Company, Connect");
  var topLevelSubmenuInnerText =
    elementClicked.parentElement.parentElement.previousElementSibling.innerText;
  if (elementClicked.parentElement.previousElementSibling == null) {
    let parentElementOfEleClicked = elementClicked.parentElement.parentElement;
    // while (parentElementOfEleClicked) {
    //   parentElementOfEleClicked = parentElementOfEleClicked.parentElement;
    // }
    let parentClassName = parentElementOfEleClicked.className.split(" ")[0];
    if (
      parentElementOfEleClicked.tagName == "UL" &&
      parentClassName == "header-sublist" &&
      arrOfStrings.includes(topLevelSubmenuInnerText)
    ) {
      // arrOfSublistSubmenuAnchorUpArrow = Array.prototype.slice
      //   .call(parentElementOfEleClicked.children)
      //   .map(function onlyAnchorTags(eachValue) {
      //     return eachValue.firstElementChild;
      //   });
      arrOfSublistSubmenuAnchorUpArrow = Array.from(
        parentElementOfEleClicked.children
      ).reduce(function onlyAnchorTags(buildingUp, currentValue) {
        return [...buildingUp, currentValue.firstElementChild];
      }, []);
      console.log(arrOfSublistSubmenuAnchorUpArrow);

      // let arrOfAnchorTagWithArrowIcon = Array.from(
      //   parentElementOfEleClicked.children
      // ).reduce(function onlyAnchorTags(buildingUp, currentValue) {
      //   if (
      //     currentValue.firstElementChild.firstElementChild &&
      //     currentValue.firstElementChild.firstElementChild.className.includes(
      //       "arrow-icon"
      //     )
      //   ) {
      //     return [...buildingUp, currentValue.firstElementChild];
      //   }
      //   return buildingUp;
      // }, []);
      let lastElementOfSublistSubmenu =
        arrOfSublistSubmenuAnchorUpArrow[
          arrOfSublistSubmenuAnchorUpArrow.length - 1
        ];
      lastElementOfSublistSubmenu.focus();
      // if (
      //   arrOfStrings.includes(
      //     parentElementOfEleClicked.previousElementSibling.innerText
      //   )
      // ) {
      // }
    } else if (elementClicked.innerText == "Basic") {
      console.log(eventInput);
    }
  }
}
