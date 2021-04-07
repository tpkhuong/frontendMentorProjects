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
keyboardFunctionality();

function showSublistKeydown(
  { headerNav, btnElementsSublist } = ourSelectors()
) {
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
}

function showSublistFocusElement(
  { headerNav, btnElementsSublist } = ourSelectors()
) {
  headerNav.addEventListener("focusin", function toggleSubmenu(event) {
    /* using this eventListener to select the submenu */
    // var sublistSubmenuSelector = event.target.innerText;
    /* using this eventListener to select the submenu */
    var [productBtn, companyBtn, connectBtn] = btnElementsSublist;
    console.log(event.target);
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
    }
  });
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
      showSublistHover();
    }
  });
  window.addEventListener("resize", function hoverEffectOnBigScreen(event) {
    const smallScreenWindowWidth = event.target.innerWidth;
    if (smallScreenWindowWidth < 767) {
      console.log("resize in < 767");
      showSublistClickUsingMouse();
      return;
    }
  });
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
    showSublistSubmenuToggle(event.target);
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

/***** hover should work when on big screen, small screen we want to be able to click *****/

showSublistSubmenuKeydown();

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

function keyboardFunctionality(
  { headerNav, btnElementsSublist } = ourSelectors()
) {}

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

  headerNav.addEventListener("focusin", function toggleSubmenu(event) {
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
