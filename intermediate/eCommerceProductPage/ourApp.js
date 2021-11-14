(function scopeOurVariables() {
  //   our selectors
  const { mobileCloseBtn, lastItemOfMobileNav } = ourSelectors();

  console.log(lastItemOfMobileNav);

  function ourSelectors() {
    const mobileCloseBtn = document.querySelector(
      "#mobile-modal-style-wrapper .close-menu-btn"
    );
    /** select the anchor tag of mobile nav menu **/
    const lastItemOfMobileNav = document.querySelectorAll(
      ".mobile-menu-navigation .navlink"
    );
    return {
      mobileCloseBtn,
      lastItemOfMobileNav,
    };
  }

  alert("start here get last item of array");
  function getLastElementOfMobileNav(arrInput) {}
})();
