function ourSelectors() {
  var hamburgerElement = document.querySelector(".hamburger");
  var navContainer = document.querySelector(".nav-login-container");
  var headerNav = document.querySelector(".header-nav");
  // var ulHeaderlist = document.querySelector(".header-list");
  var btnElementsSublist = Array.from(
    document.querySelectorAll(".header-items > a.btn-link[aria-expanded]")
  );

  return {
    hamburgerElement,
    navContainer,
    headerNav,
    btnElementsSublist,
    // ulHeaderlist,
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

function showSublistHover({ headerNav, btnElementsSublist } = ourSelectors()) {
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

function showSublistSubmenuKeydown() {}

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

showSublistSubmenu();

function showSublistSubmenu(focusElement) {
  var ulHeaderlist = document.querySelector(".header-list");

  ulHeaderlist.addEventListener(
    "keydown",
    function toggleSublistSubmenu(event) {
      var keyPressed = event.code;
      //let's select the submenu link that was clicked
      if (keyPressed == "Space") {
        event.preventDefault();
        // let tagName = event.target.tagName;
        let strUsedToFilterBtnElements =
          event.target.parentElement.parentElement.previousElementSibling
            .innerText;
        arrOfBtnElements(strUsedToFilterBtnElements);
        event.stopPropagation();
      }
    }
  );
}

function arrOfBtnElements(strInput) {
  console.log(strInput);
  var submenuBtnElements = Array.from(
    document.querySelectorAll(
      ".header-subitems a[aria-expanded][aria-haspopup]"
    )
  );
  alert("we have the array with btnElement of the ul we want to target");
  var resultArr = submenuBtnElements.filter(function btnElementMatchStrInput(
    eachBtnElement
  ) {
    var btnElementGrandParentSiblingInnerText =
      eachBtnElement.parentElement.parentElement.previousElementSibling
        .innerText;
    return strInput == btnElementGrandParentSiblingInnerText;
  });
  console.log(resultArr);
  // submenuBtnElements.forEach(function printParentELement(eachBtnElement) {
  //   console.log(
  //     eachBtnElement.parentElement.parentElement.previousElementSibling
  //       .innerText
  //   );
  // });
}

function keyboardFunctionality(
  { headerNav, btnElementsSublist } = ourSelectors()
) {}

function showSublistClickUsingMouse(
  { headerNav, btnElementsSublist } = ourSelectors()
) {
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
