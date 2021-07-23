(function callOurApp() {
  function ourSelectors() {
    //menu button
    var menuBtn = document.querySelector(".menu-button");
    //close button
    var closeBtn = document.querySelector(".close-button");
    return {
      menuBtn,
      closeBtn,
    };
  }

  //call our functions
  var elementClickToOpenMenu = openMobileMenu();
  closeMobileMenu();
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
  alert("use opacity on images");
})();
