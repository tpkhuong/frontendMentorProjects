(function scopeOurVariables() {
  //declare our selectors at top
  const { openNavbarButton, closeNavbarButton, navbarContainer } =
    ourSelectors();

  function ourSelectors() {
    //open navbar menu button
    var openNavbarButton = document.querySelector(".open-button");
    //close navbar menu button
    var closeNavbarButton = document.querySelector(".close-button");
    //article navbar
    var navbarContainer = document.querySelector(".navbar");
    return {
      openNavbarButton,
      closeNavbarButton,
      navbarContainer,
    };
  }

  //call our funcs
  addEventListenerToElement();
  function addEventListenerToElement() {
    navbarContainer.addEventListener("touchstart", toggleNavMenu);
  }

  function toggleNavMenu(event) {
    var parentElementClass = event.target.parentElement.className.split("-")[0];

    if (parentElementClass == "open" || event.target == openNavMenu) {
      openNavMenu(event);
    }

    if (parentElementClass == "close" || event.target == closeNavMenu) {
      closeNavMenu(event);
    }
  }

  function openNavMenu(eventInput) {
    openNavbarButton.attributes["aria-pressed"].value = "true";
    closeNavbarButton.attributes["aria-pressed"].value = "false";
  }

  function closeNavMenu(eventInput) {
    console.log(eventInput);
  }
})();
