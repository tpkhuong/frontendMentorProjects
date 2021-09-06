(function scopeOurVariables() {
  //declare our selectors at top
  const {
    openNavbarButton,
    closeNavbarButton,
    navbarContainer,
    navbarBtnLastItem,
  } = ourSelectors();

  function ourSelectors() {
    //open navbar menu button
    var openNavbarButton = document.querySelector(".open-button");
    //close navbar menu button
    var closeNavbarButton = document.querySelector(".close-button");
    //article navbar
    var navbarContainer = document.querySelector(".navbar");
    //last item in modal
    var navbarBtnLastItem = document.querySelector(".navbar-btn");
    return {
      openNavbarButton,
      closeNavbarButton,
      navbarContainer,
      navbarBtnLastItem,
    };
  }

  //call our funcs
  addEventListenerToElement();
  function addEventListenerToElement() {
    navbarContainer.addEventListener("touchstart", toggleNavMenu);
    navbarContainer.addEventListener("keydown", tabOrderModal);
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
    // without eventInput.preventDefault() browser did not focus closeNavbarButton
    //after 500ms of clicking on openNavbarButton
    eventInput.preventDefault();
    setTimeout(function focusCloseBtn() {
      closeNavbarButton.focus();
    }, 500);
  }

  function closeNavMenu(eventInput) {
    closeNavbarButton.attributes["aria-pressed"].value = "true";
    openNavbarButton.attributes["aria-pressed"].value = "false";
    // without eventInput.preventDefault() browser did not focus openNavbarButton
    //after 500ms of clicking on closeNavbarButton
    eventInput.preventDefault();
    setTimeout(function focusOpenBtn() {
      openNavbarButton.focus();
    }, 500);
  }

  function tabOrderModal(eventInput) {
    if (eventInput.shiftKey) {
      // if (eventInput.key == "Tab" && eventInput.target == closeNavbarButton) {
      //   navbarBtnLastItem.focus();
      //   eventInput.preventDefault();
      // }
      // if we did not have event.preventDefault() when we hit shift and
      // hit tab on closeNavbarButton in navbar the focus will be on the item before mavbarLastItem

      eventInput.key == "Tab" && eventInput.target == closeNavbarButton
        ? (navbarBtnLastItem.focus(), eventInput.preventDefault())
        : null;
    } else {
      // if we did not have event.preventDefault() when we hit tab on lastItem in navbar the focus will be on the next item after closeNavbarButton
      eventInput.target == navbarBtnLastItem
        ? (closeNavbarButton.focus(), eventInput.preventDefault())
        : null;
    }
  }
})();
