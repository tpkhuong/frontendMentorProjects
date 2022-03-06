(function scopeOurVariables() {
  // declare our selectors
  const { mainElement, toggleThemeBtn, checkedBtn } = ourSelectors();

  // call our cached func
  const accessData = scopeOurData();
  const cachedData = accessData();
  // theme switcher
  addDarkOrLightThemeClassBasedOnSystemTheme();
  changeThemeBasedOnSystemThemeChange();
  // theme switcher using toggle button
  applyEventListener(toggleThemeBtn, "click", toggleBetweenDarkAndLightTheme);
  // desktop click
  applyEventListener(
    document.querySelector(".list-style-wrapper"),
    "click",
    todoListitemsWithAttachedViewsBtnsClick
  );
  // mobile click
  applyEventListener(
    document.querySelector(".mobile-views-container"),
    "click",
    separateViewsBtnsClickEvent
  );

  // for checked focus event
  checkedBtn.forEach(function addFocus(eachButton) {
    applyEventListener(eachButton, "focus", function buttonHasFocus(event) {
      // change attr on parent element of checked btn. div with attr we want to change
      this.parentElement.attributes["user-focused-btn"].value = "true";
    });
    applyEventListener(eachButton, "blur", function buttonIsNotFocus(event) {
      // change attr on parent element of checked btn. div with attr we want to change
      this.parentElement.attributes["user-focused-btn"].value = "false";
    });
  });

  // add event listener helper

  function applyEventListener(element, listener, func) {
    element.addEventListener(listener, func);
  }

  // control theme

  /**
   * based on system
   * **/

  function addDarkOrLightThemeClassBasedOnSystemTheme() {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    // ./images/icon-moon.svg
    if (systemTheme.matches) {
      // if dark theme we want the sun
      // document.body.classList.remove("light-theme");
      // document.body.classList.add("dark-theme");
      // document.body.classList.add("dark-theme");
      document.body.className = "dark-theme";
      toggleThemeBtn.firstElementChild.attributes["src"].value =
        "./images/icon-sun.svg";
    } else {
      // if light theme we want the moon
      // document.body.classList.remove("dark-theme");
      // document.body.classList.add("light-theme");
      // document.body.classList.remove("dark-theme");
      document.body.className = "light-theme";
      toggleThemeBtn.firstElementChild.attributes["src"].value =
        "./images/icon-moon.svg";
    }
  }

  // set dark-theme or light-theme on system theme change

  function changeThemeBasedOnSystemThemeChange() {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

    systemTheme.addEventListener("change", function changeTheme(event) {
      if (event.matches) {
        // if dark theme we want the sun
        // document.body.classList.remove("light-theme");
        // document.body.classList.add("dark-theme");
        // document.body.classList.add("dark-theme");
        document.body.className = "dark-theme";
        toggleThemeBtn.firstElementChild.attributes["src"].value =
          "./images/icon-sun.svg";
      } else {
        // if light theme we want the moon
        // document.body.classList.remove("dark-theme");
        // document.body.classList.add("light-theme");
        // document.body.classList.remove("dark-theme");
        document.body.className = "light-theme";
        toggleThemeBtn.firstElementChild.attributes["src"].value =
          "./images/icon-moon.svg";
      }
    });
  }

  /**
   * clicking on toggle button to change theme
   * **/

  function toggleBetweenDarkAndLightTheme(event) {
    const mainElementClass = document.body.getAttribute("class");
    changeClassThemeOnMainElement(mainElementClass);
    toggleDarkAndLightThemeImage(mainElementClass);
  }

  // change main element theme class on toggle btn clicks

  function changeClassThemeOnMainElement(classAttr) {
    // if dark theme we want to change class to light-theme
    if (classAttr == "dark-theme") {
      document.body.classList = "light-theme";
      // document.body.classList.remove("dark-theme");
    } else {
      // if light theme we want to change class to dark-theme
      document.body.classList = "dark-theme";
      // document.body.classList.add("dark-theme");
    }
  }

  // change toggle image

  function toggleDarkAndLightThemeImage(classAttr) {
    // if dark theme we want to change image to moon
    if (classAttr == "dark-theme") {
      toggleThemeBtn.firstElementChild.attributes["src"].value =
        "./images/icon-moon.svg";
    } else {
      // if light theme we want to change image to sun
      toggleThemeBtn.firstElementChild.attributes["src"].value =
        "./images/icon-sun.svg";
    }
  }

  /**
   * desktop click event callback
   * **/

  function todoListitemsWithAttachedViewsBtnsClick(event) {
    const targetClass = event.target.getAttribute("class");
    switch (targetClass) {
      case "todo-item":
        todoListitemClicked();
        break;
      case "checked-btn":
        checkedBtnClicked();
        break;
      case "delete-btn":
        deleteBtnClicked();
        break;
      case "desktop-btn-all":
        allViewBtnClicked();
        break;
      case "desktop-btn-active":
        activeViewBtnClicked();
        break;
      case "desktop-btn-completed":
        completedViewBtnClicked();
        break;
      case "clear-btn":
        clearCompletedBtnClicked();
        break;
    }
  }

  /**
   * mobile click event callback
   * **/

  function separateViewsBtnsClickEvent(event) {
    const targetClass = event.target.getAttribute("class");
    switch (targetClass) {
      case "mobile-btn-all":
        allViewBtnClicked();
        break;
      case "mobile-btn-active":
        activeViewBtnClicked();
        break;
      case "mobile-btn-completed":
        completedViewBtnClicked();
        break;
    }
  }

  /**
   * click event helper
   * **/

  // todo list item

  function todoListitemClicked(event) {
    console.log("listitem");
  }

  // checked btn

  function checkedBtnClicked(event) {
    console.log("checked");
  }

  // delete btn

  function deleteBtnClicked(event) {
    console.log("delete");
  }

  /**
   * views and clear btns
   * **/

  // All view btn

  function allViewBtnClicked(event) {
    cachedData.currentView != "All" ? (cachedData.currentView = "All") : null;
  }

  // Active view btn

  function activeViewBtnClicked(event) {
    cachedData.currentView = "Active";
  }

  // Completed view btn

  function completedViewBtnClicked(event) {
    cachedData.currentView = "Completed";
  }

  // clear completed

  function clearCompletedBtnClicked(event) {
    console.log("clear completed");
  }

  /**
   * cached our data
   * **/

  function scopeOurData() {
    const dataObj = {
      grabbedItemDataIndex: null,
      dragSourceElement: null,
      draggedItemSelected: false,
      currentView: "All",
    };

    return function closureOverCachedObj() {
      return dataObj;
    };
  }
  /**
   * our selectors
   * **/

  function ourSelectors() {
    // main element
    const mainElement = document.querySelector("[role='main']");
    // toglle button
    const toggleThemeBtn = document.querySelector(".toggle-btn");
    // checked btn
    const checkedBtn = Array.prototype.slice.call(
      document.querySelectorAll(".checked-btn")
    );
    return {
      mainElement,
      toggleThemeBtn,
      checkedBtn,
    };
  }
  /**
   * Notes
   * **/
  /**
   * keep track of current view (all, active,completed) in cached data obj
   * **/
  // li
  // div
  /** children of div **/
  /* div */
  /* checked button */
  /* img check */
  /* checked button */
  /* div */
  /* <p></p> */
  /* delete button */
  /* img cross */
  /* delete button */
  // div
})();
