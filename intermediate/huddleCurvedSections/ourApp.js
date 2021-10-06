(function scoprOurVariables() {
  const { footLogoIcon } = ourSelectors();

  function ourSelectors() {
    const footLogoIcon = document.querySelector(
      ".footer-contact-info__style-wrapper svg"
    );

    return {
      footLogoIcon,
    };
  }

  if (window.innerWidth > 1425) {
    footLogoIcon.attributes["viewBox"].value = "0 0 320 39";
  }
})();
