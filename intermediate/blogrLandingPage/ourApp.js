function ourSelectors() {
  var hamburgerElement = document.querySelector(".hamburger");
  var navContainer = document.querySelector(".nav-login-container");
  var headerNav = document.querySelector(".header-nav");
  var btnElements = Array.from(
    document.querySelectorAll("button.btn-link[aria-expanded]")
  );

  return {
    hamburgerElement,
    navContainer,
    headerNav,
    btnElements,
  };
}

toggleNavMenu();

function toggleNavMenu(
  { hamburgerElement, navContainer, btnElements } = ourSelectors()
) {
  console.log(btnElements);
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

showSubmenu();

function showSubmenu({ headerNav, btnElements } = ourSelectors()) {
  headerNav.addEventListener("keydown", function toggleSubmenu(event) {
    var [productBtn, companyBtn, connectBtn] = btnElements;
    var keyPressed = event.code;
    if (keyPressed == "Space") {
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
    if (keyPressed == "Enter") {
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
    var [productBtn, companyBtn, connectBtn] = btnElements;
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
    var [productBtn, companyBtn, connectBtn] = btnElements;

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
}
