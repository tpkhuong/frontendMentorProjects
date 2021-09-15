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
      console.log("Open btn");
    }
    if (event.target.parentElement == closeBtn) {
      console.log("Close btn");
    }
  }

  addEventListeners(navBarContainer);
})();
