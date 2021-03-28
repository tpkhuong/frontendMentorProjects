function ourSelectors() {
  var hamburgerElement = document.querySelector(".hamburger");
  var navContainer = document.querySelector(".nav-login-container");
  var headerNav = document.querySelector(".header-nav");

  return {
    hamburgerElement,
    navContainer,
    headerNav,
  };
}

toggleNavMenu();

function toggleNavMenu({ hamburgerElement, navContainer } = ourSelectors()) {
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

function showSubmenu({ headerNav } = ourSelectors()) {
  headerNav.addEventListener("keydown", function toggleSubmenu(event) {
    console.log(event.target);
  });
}
