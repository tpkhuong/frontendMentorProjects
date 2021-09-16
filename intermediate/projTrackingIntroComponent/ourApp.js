(function scopeOurVariables() {
  console.log("work on hover link effect and desktop layout");
  function ourSelectors() {
    const openBtn = document.querySelector(".open-menu-btn");
    const closeBtn = document.querySelector(".close-menu-btn");
    const navBarContainer = document.querySelector(".navbar-container");

    return {
      openBtn,
      closeBtn,
      navBarContainer,
    };
  }
  //   our selectors
  const { openBtn, closeBtn, navBarContainer } = ourSelectors();
  // add event listeners
  function addEventListeners(addEventToElement) {
    addEventToElement.addEventListener("click", toggleNavBarMenu);
  }
  function toggleNavBarMenu(event) {
    if (event.target.parentElement == openBtn) {
      //using [aria-pressed]
      openBtn.attributes["aria-pressed"].value = "true";
      closeBtn.attributes["aria-pressed"].value = "false";
      // using setAttribute
    }
    if (event.target.parentElement == closeBtn) {
      closeBtn.attributes["aria-pressed"].value = "true";
      openBtn.attributes["aria-pressed"].value = "false";
    }
  }

  addEventListeners(navBarContainer);
})();
