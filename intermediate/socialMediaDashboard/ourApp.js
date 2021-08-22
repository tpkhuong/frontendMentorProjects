(function scopeOurVariables() {
  const { socialMediaDashboard, darkModeToggleBtn, toggleCircle } =
    ourSelectors();
  function ourSelectors() {
    //section with theme class
    var socialMediaDashboard = document.querySelector(
      ".social-media-dashboard"
    );
    //dark-mode button
    var darkModeToggleBtn = document.querySelector(".toggle-container");
    //toggle circle
    var toggleCircle = document.querySelector(".toggle-btn");
    return {
      socialMediaDashboard,
      darkModeToggleBtn,
      toggleCircle,
    };
  }
  //call our functions
  addEventListenerToElement();
  function addEventListenerToElement() {
    darkModeToggleBtn.addEventListener(
      "touchstart",
      toggleBetweenLightAndDarkModeTouchEvent
    );
    if (window.innerWidth > 415) {
      darkModeToggleBtn.addEventListener(
        "click",
        toggleBetweenLightAndDarkModeClickEvent
      );
    }
  }

  function toggleBetweenLightAndDarkModeTouchEvent(event) {
    //the this of toggleBetweenLightAndDarkModeTouchEvent func is darkModeToggleBtn
    //   darkModeLogicFunc(event);
    // since we are using keyword this in darkModeLogicFunc we have to pass in the this context of toggleBetweenLightAndDarkModeClickEvent
    //which will be the element darkModeToggleBtn into darkModeLogicFunc we will use .call
    darkModeLogicFunc.call(this, event);
    // if (event.target == this || event.target == toggleCircle) {
    //   let stringOfTheme = socialMediaDashboard
    //     .getAttribute("class")
    //     .split(" ")[1]
    //     .split("-")[0];
    //   if (stringOfTheme == "light") {
    //     socialMediaDashboard.classList.remove("light-theme");
    //     socialMediaDashboard.classList.add("dark-theme");
    //     //   this.attributes["aria-pressed"].value = "true"
    //     this.setAttribute("aria-pressed", "true");
    //   } else {
    //     socialMediaDashboard.classList.remove("dark-theme");
    //     socialMediaDashboard.classList.add("light-theme");
    //     this.setAttribute("aria-pressed", "false");
    //   }
    // }
  }
  function toggleBetweenLightAndDarkModeClickEvent(event) {
    //the this of toggleBetweenLightAndDarkModeTouchEvent func is darkModeToggleBtn
    //   darkModeLogicFunc(event);
    // since we are using keyword this in darkModeLogicFunc we have to pass in the this context of toggleBetweenLightAndDarkModeClickEvent
    //which will be the element darkModeToggleBtn into darkModeLogicFunc we will use .call
    darkModeLogicFunc.call(this, event);
  }

  function darkModeLogicFunc(passInEvent) {
    if (passInEvent.target == this || passInEvent.target == toggleCircle) {
      let stringOfTheme = socialMediaDashboard
        .getAttribute("class")
        .split(" ")[1]
        .split("-")[0];
      if (stringOfTheme == "light") {
        socialMediaDashboard.classList.remove("light-theme");
        socialMediaDashboard.classList.add("dark-theme");
        //   this.attributes["aria-pressed"].value = "true"
        this.setAttribute("aria-pressed", "true");
      } else {
        socialMediaDashboard.classList.remove("dark-theme");
        socialMediaDashboard.classList.add("light-theme");
        this.setAttribute("aria-pressed", "false");
      }
    }
  }
})();
