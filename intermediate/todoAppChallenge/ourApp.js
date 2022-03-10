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

  // value of todo input

  applyEventListener(
    document.querySelector(".todo-input-instructions-container input"),
    "keydown",
    valueOfTodoInput
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
      document.activeElement == event.target
        ? (this.parentElement.attributes["user-focused-btn"].value = "true")
        : null;
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
        todoListitemClicked(event);
        break;
      case "checked-btn":
        checkedBtnClicked(event);
        break;
      case "delete-btn":
        deleteBtnClicked(event);
        break;
      case "desktop-btn-all":
        allViewBtnClicked(event);
        break;
      case "desktop-btn-active":
        activeViewBtnClicked(event);
        break;
      case "desktop-btn-completed":
        completedViewBtnClicked(event);
        break;
      case "clear-btn":
        clearCompletedBtnClicked(event);
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
        allViewBtnClicked(event);
        break;
      case "mobile-btn-active":
        activeViewBtnClicked(event);
        break;
      case "mobile-btn-completed":
        completedViewBtnClicked(event);
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
    // if we want to always focus on todo listitem when user click on checked-btn
    event.target.parentElement.parentElement.parentElement.focus();
    // check if todo(Listitem) has "true" assigned to data-draggedSelected
    // const todoListitemDraggedSelected =
    //   event.target.parentElement.parentElement.parentElement.getAttribute(
    //     "data-draggedSelected"
    //   );
    // if (todoListitemDraggedSelected == "true") {
    //   event.target.parentElement.parentElement.parentElement.focus();
    // }
    // we will change div[data-checked], .checked-btn[aria-checked], and li[data-todoCompleted="true"]
    // based on the current value of div[data-checked], .checked-btn[aria-checked] and li[data-todoCompleted="true"]
    /**
     * if one of the three div[data-checked], .checked-btn[aria-checked], and li[data-todoCompleted="true"]
     * value is "false" or "true" then the other two will have the same value
     * **/
    /**
     * algorithm below is for when user click on checked btn.
     * click event on the checked btn will apply focus on the btn
     * which will trigger our "focus" event listener that triggered event will
     * assign "true" to user-focused-btn to parent of checked-btn
     * **/
    event.target.parentElement.getAttribute("user-focused-btn") == "true"
      ? event.target.parentElement.setAttribute("user-focused-btn", "false")
      : null;

    const checkedBtnAriaChecked = event.target.getAttribute("aria-checked");

    if (checkedBtnAriaChecked == "false") {
      event.target.setAttribute("aria-checked", "true");
      event.target.parentElement.setAttribute("data-checked", "true");
      event.target.parentElement.parentElement.parentElement.setAttribute(
        "data-todocompleted",
        "true"
      );
    } else {
      event.target.setAttribute("aria-checked", "false");
      event.target.parentElement.setAttribute("data-checked", "false");
      event.target.parentElement.parentElement.parentElement.setAttribute(
        "data-todocompleted",
        "false"
      );
    }
    console.log("checked");
  }

  // delete btn

  function deleteBtnClicked(event) {
    console.log(event.target.parentElement.parentElement);
    console.log("delete");
  }

  /**
   * views and clear btns
   * const arrayOfFunc = [];
   * **/

  // All view btn

  function allViewBtnClicked(event) {
    // current event.target assign value true to data-currentView
    const checkForCurrentViewAttrOfElement =
      event.target.getAttribute("data-currentView");
    // if element does not have data-currentView attr algorithm above will return null
    // checkBooleanValueOfCurrentViewAttr == "false"
    //   ? event.target.setAttribute("data-currentView", "true")
    //   : null;
    // // get next sibling elements assign value "false" to data-currentView
    // event.target.nextElementSibling.setAttribute("data-currentView", "false");
    // event.target.nextElementSibling.nextElementSibling.setAttribute(
    //   "data-currentView",
    //   "false"
    // );
    /**
     * another approach
     * **/
    !checkForCurrentViewAttrOfElement
      ? event.target.setAttribute("data-currentView", "")
      : null;
    switch (cachedData.currentView) {
      case "Active":
        event.target.nextElementSibling.removeAttribute("data-currentView");
        break;
      case "Completed":
        event.target.nextElementSibling.nextElementSibling.removeAttribute(
          "data-currentView"
        );
        break;
    }

    cachedData.currentView != "All" ? (cachedData.currentView = "All") : null;
    /**
     * testing out algorithm
     * **/
    // arrayOfFunc.push(function Func(outerStr) {
    //   return function innerFunc(fn, innerStr) {
    //     return fn(outerStr, innerStr);
    //   };
    // });
  }

  // Active view btn

  function activeViewBtnClicked(event) {
    /**
     * testing out algorithm
     * **/
    // const firstFunc = arrayOfFunc[0]("Hello");

    // firstFunc(function sayhi(first, second) {
    //   console.log(first, second);
    // }, " World");
    // current event.target assign value true to data-currentView

    const checkForCurrentViewAttrOfElement =
      event.target.getAttribute("data-currentView");
    // if element does not have data-currentView attr algorithm above will return null
    // checkBooleanValueOfCurrentViewAttr == "false"
    //   ? event.target.setAttribute("data-currentView", "true")
    //   : null;
    // // get previous and next sibling assign value "false" to data-currentView
    // event.target.previousElementSibling.setAttribute(
    //   "data-currentView",
    //   "false"
    // );
    // event.target.nextElementSibling.setAttribute("data-currentView", "false");
    /**
     * another approach
     * **/
    !checkForCurrentViewAttrOfElement
      ? event.target.setAttribute("data-currentView", "")
      : null;
    switch (cachedData.currentView) {
      case "All":
        event.target.previousElementSibling.removeAttribute("data-currentView");
        break;
      case "Completed":
        event.target.nextElementSibling.removeAttribute("data-currentView");
        break;
    }
    cachedData.currentView = "Active";
  }

  // Completed view btn

  function completedViewBtnClicked(event) {
    // current event.target assign value true to data-currentView
    const checkForCurrentViewAttrOfElement =
      event.target.getAttribute("data-currentView");
    // if element does not have data-currentView attr algorithm above will return null
    // checkBooleanValueOfCurrentViewAttr == "false"
    //   ? event.target.setAttribute("data-currentView", "true")
    //   : null;
    //   event.target.previousElementSibling.setAttribute(
    //     "data-currentView",
    //     "false"
    //   );
    //   event.target.previousElementSibling.previousElementSibling.setAttribute(
    //     "data-currentView",
    //     "false"
    //   );
    /**
     * another approach
     * **/
    !checkForCurrentViewAttrOfElement
      ? event.target.setAttribute("data-currentView", "")
      : null;
    switch (cachedData.currentView) {
      case "All":
        event.target.previousElementSibling.previousElementSibling.removeAttribute(
          "data-currentView"
        );
        break;
      case "Active":
        event.target.previousElementSibling.removeAttribute("data-currentView");
        break;
    }
    // get previous sibling elements assign value "false" to data-currentView
    cachedData.currentView = "Completed";
  }

  // clear completed

  function clearCompletedBtnClicked(event) {
    console.log("clear completed");
  }

  /**
   * helper func
   * **/

  /**
   * build assistive text string
   * **/

  /**
   * get grabbed element grabDragIndex
   * **/

  /**
   * get UL number of children
   * **/

  /**
   * get grabbed element TODO text
   * **/

  /**
   * get value of input for todo list
   * **/

  /**
   * working with arrays in cachedObj
   * **/

  /**
   * all view
   * **/

  /**
   * active view
   * **/

  /**
   * completed view
   * **/

  /**
   * make array for active view
   * **/

  function filterOutCompletedTodoItems(allViewList) {}

  /**
   * make array for completed view
   * **/

  function filterOutActiveTodoItems(allViewList) {}

  /**
   * building listitem element for todo item, checked btn, and delete btn
   * when we run func to create listitem then append listitems (children to UL)
   * we just want that func to create LI then append to UL
   * updating attr will be handled by other helpers
   * **/

  // todo listitem
  // div draggable element
  // draggable element children
  /* checked btn wrapper */
  /** checked btn **/
  /*** img element for checked btn ***/
  /* paragraph text content of todo */
  /* delete btn */
  /** img element for delete btn **/

  /**
   * func to update todo listitem grabdragindex
   * checked btn aria-labelledby
   * delete btn aria-labelledby and id
   * when user is on active and completed view
   * when user is on all view update todo listitem allview index
   * **/

  /**
   * algorithm below for when user drag and drop
   * on views for "All", "Active" and "Completed" views
   * **/

  function updateAttrForTodoItemCheckedAndDeleteBtn(collection) {
    // loop through array
    collection.forEach(function updateValuesToAttr(listitem, index) {
      // user is on "All" views
      cachedData.currentView == "All"
        ? (listitem.attributes["data-allViewIndex"].value = String(index))
        : null;
      // user is on "Active" or "Completed" view
      listitem.attributes["grabbedItemDataIndex"].value = String(index);
      // checked btn
      listitem.firstElementChild.children[0].firstElementChild.attributes[
        "aria-labelledby"
      ] = `todo-item-${index}`;
      // delete btn
      listitem.firstElementChild.children[2].attributes[
        "aria-labelledby"
      ].value = `delete-todo-${index} todo-item-${index}`;
      listitem.firstElementChild.children[2].attributes[
        "id"
      ].value = `delete-todo-${index}`;
    });
  }

  /**
   * assign allViewIndex to elements in "Active" or "Completed" array
   * **/

  /**
   * algorithm below for when user drag and drop
   * on views for "Active" and "Completed" views
   * **/

  function allViewIndexForReorderOfActiveOrCompletedArray(list) {
    // data-allviewindex
    // current view is active
    if (cachedData.currentView == "Active") {
      list.forEach(function allViewIndexForActive(todoItem, index) {
        const indexActiveAllView =
          cachedData.originalElementOrderInAllViewArray.activeViewOriginalOrder[
            index
          ];
        todoItem.attributes["data-allViewIndex"].value =
          String(indexActiveAllView);
      });
    }
    // current view is completed
    if (cachedData.currentView == "Completed") {
      list.forEach(function allViewIndexForCompleted(todoItem, index) {
        const indexCompletedAllView =
          cachedData.originalElementOrderInAllViewArray
            .completedViewOriginalOrder[index];
        todoItem.attributes["data-allViewIndex"].value = String(
          indexCompletedAllView
        );
      });
    }
  }

  /**
   * update allView array after user drag and drop in
   * "Active" or "Completed" views
   * **/

  /**
   * get value of todo input
   * **/

  function valueOfTodoInput(event) {
    if (event.code == "Enter" || event.code == "NumpadEnter") {
      console.log(event.target.value);
    }
  }

  /**
   * cached our data
   * **/

  function scopeOurData() {
    const dataObj = {
      arraysOfDifferentViews: {
        allViewArray: [],
        activeViewArray: [],
        completedViewArray: [],
      },
      originalElementOrderInAllViewArray: {
        activeViewOriginalOrder: [],
        completedViewOriginalOrder: [],
      },
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

functional Programming Curry

function curry(fn, arity = fn.length) {
  return (function nextCurried(prevArgs) {
    return function curried(nextArg) {
      var args = [...prevArgs, nextArg];

      if (args.length >= arity) {
        return fn(...args);
      } else {
        return nextCurried(args);
      }
    };
  })([]);
}

// or the ES6 => arrow form
var curry = (fn, arity = fn.length, nextCurried) =>
  (nextCurried = (prevArgs) => (nextArg) => {
    var args = [...prevArgs, nextArg];

    if (args.length >= arity) {
      return fn(...args);
    } else {
      return nextCurried(args);
    }
  })([]);
 */
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
