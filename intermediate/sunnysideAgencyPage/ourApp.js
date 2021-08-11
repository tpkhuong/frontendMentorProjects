(function scopeOurVariables() {
  function ourSelectors() {
    //hamburger btn
    var openNavMenuBtn = document.getElementById("hamburger-menu-icon");
    var mobileNavbar = document.querySelector(
      "[aria-labelledby='mobile-navbar']"
    );

    var tabOrderContainer = document.querySelector(".tab-order-container");
    return {
      openNavMenuBtn,
      mobileNavbar,
      tabOrderContainer,
    };
  }

  //call our funcs
  showNavbarMenu();
  tabOrderForNavMobileMenu();
  function showNavbarMenu() {
    var { openNavMenuBtn, mobileNavbar } = ourSelectors();

    openNavMenuBtn.addEventListener("click", function showMenu(event) {
      //our this is our hamburger btn
      if (
        event.target == this ||
        event.target.parentElement == this ||
        event.target.parentElement.parentElement == this
      ) {
        this.attributes["aria-pressed"].value === "false"
          ? ((this.attributes["aria-pressed"].value = "true"),
            (mobileNavbar.attributes["aria-hidden"].value = "false"))
          : ((this.attributes["aria-pressed"].value = "false"),
            (mobileNavbar.attributes["aria-hidden"].value = "true"));
      }
    });
  }

  function tabOrderForNavMobileMenu() {
    var { openNavMenuBtn, tabOrderContainer } = ourSelectors();
    var lastAnchorElement = document.querySelector("a.btn-accent");
    // var lastAnchorElement = Array.from(
    //   document.querySelectorAll(
    //     "[aria-labelledby='mobile-navbar'] [role='menu'] a[role='menuitem']"
    //   )
    // );
    // var lastAnchorElement = Array.prototype.slice.call(
    //   document.querySelectorAll(
    //     "[aria-labelledby='mobile-navbar'] [role='menu'] a[role='menuitem']"
    //   )
    // );
    tabOrderContainer.addEventListener(
      "keydown",
      function cycleThroughLinksAndBtn(event) {
        if (event.shiftKey) {
          //   if (event.key == "Tab" && document.activeElement == openNavMenuBtn) {
          //     event.preventDefault();
          //     lastAnchorElement.focus();
          //     }

          event.key == "Tab" && document.activeElement == openNavMenuBtn
            ? (event.preventDefault(), lastAnchorElement.focus())
            : null;
        } else {
          //   if (
          //     event.key == "Tab" &&
          //     document.activeElement == lastAnchorElement
          //   ) {
          //     event.preventDefault();
          //     openNavMenuBtn.focus();
          //     }

          event.key == "Tab" && document.activeElement == lastAnchorElement
            ? (event.preventDefault(), openNavMenuBtn.focus())
            : null;
        }
      }
    );
  }
})();
