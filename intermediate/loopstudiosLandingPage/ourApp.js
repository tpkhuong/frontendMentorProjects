(function callOurApp() {
  function ourSelectors() {
    //menu button
    var menuBtn = document.querySelector(".menu-button");
    //close button
    var closeBtn = document.querySelector(".close-button");
    //nav menu at mobile. it is a modal taking the whole screen. we used position: fixed.
    var mobileNavMenu = document.getElementById("opened-mobile-menu");
    return {
      menuBtn,
      closeBtn,
      mobileNavMenu,
    };
  }

  //call our functions
  var elementClickToOpenMenu = openMobileMenu();
  closeMobileMenu();
  modalTabFeature();
  //call our functions
  function openMobileMenu() {
    var { menuBtn, closeBtn } = ourSelectors();
    var menuBtnSvg = document.getElementById("mobile-menu-btn-img");
    menuBtn.addEventListener("click", showMobileNavbar);

    function showMobileNavbar(event) {
      if (
        event.target === menuBtn ||
        event.target === menuBtnSvg ||
        event.target.parentElement === menuBtnSvg ||
        event.target.parentElement.parentElement === menuBtnSvg
      ) {
        //when use click on menu btn change btn aria-pressed to "true"
        menuBtn.attributes["aria-pressed"].value = "true";
        setTimeout(function focusFirstElementOfModal() {
          closeBtn.focus();
        }, 300);
      }
    }
    return menuBtn;
  }

  function closeMobileMenu() {
    var { menuBtn, closeBtn } = ourSelectors();
    var closeBtnSvg = document.getElementById("mobile-menu-closed-img");

    closeBtn.addEventListener("click", hideMobileNavbar);

    // document.getElementById("opened-mobile-menu").addEventListener("click", hideMobileNavbar)
    function hideMobileNavbar(event) {
      if (
        event.target === closeBtn ||
        event.target === closeBtnSvg ||
        event.target.parentElement === closeBtnSvg ||
        event.target.parentElement.parentElement === closeBtnSvg
      ) {
        menuBtn.attributes["aria-pressed"].value = "false";
        setTimeout(function focusClickedELementOpenMenu() {
          elementClickToOpenMenu.focus();
        }, 300);
      }
      // console.log("elementClickToOpenMenu",elementClickToOpenMenu)
    }
  }

  function modalTabFeature() {
    var { mobileNavMenu, closeBtn } = ourSelectors();
    // var arrOfNavbarAnchorTags = Array.from(
    //   document.querySelectorAll("#mobile-navigation a")
    // );
    var arrOfNavbarAnchorTags = Array.prototype.slice.call(
      document.querySelectorAll("#mobile-navigation a")
    );
    var lastAnchorTagNavbar = arrOfNavbarAnchorTags.filter(
      function lookForSupportText(eachLink) {
        return eachLink.textContent === "Support";
      }
    )[0];
    mobileNavMenu.addEventListener("keydown", function tabThroughModal(event) {
      if (event.shiftKey) {
        if (event.key == "Tab" && document.activeElement == closeBtn) {
          lastAnchorTagNavbar.focus();
          event.preventDefault();
        }
      } else {
        if (
          event.key == "Tab" &&
          document.activeElement == lastAnchorTagNavbar
        ) {
          closeBtn.focus();
          event.preventDefault();
        }
      }
    });
  }
})();
