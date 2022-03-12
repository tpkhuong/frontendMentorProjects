(function scopeOurVariables() {
  // apply attr data-currentView
  applyDataCurrentViewAttrToBtn();
  // declare our selectors
  const { mainElement, unorderedList, toggleThemeBtn, checkedBtn } =
    ourSelectors();
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

  // keydown for todo input element

  applyEventListener(
    document.querySelector(".todo-input-instructions-container input"),
    "keydown",
    keyDownEventForTodoInput
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
    // target li(todo listitem)
    if (event.target.parentElement.tagName == "LI") {
      todoListitemClicked(event);
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
    // assign the value of "true" to clicked todo item data-draggedSelected
    // assign value "false" to previous focus element
    // assign value '-1" to previous focus element
    // assign value "0" to clicked todo item
    // apply focus to clicked todo item
    const [previousFocusedElement] = [
      ...event.target.closest("ul").children,
    ].filter(function findElementWithTabIndexZero(listitem) {
      const elementTabindex = listitem.getAttribute("tabindex");
      return elementTabindex === "0";
    });
    if (cachedData.draggedItemSelected) {
      // previousFocusedElement will have tabindex "0" and data-draggedSelected = "true"
      previousFocusedElement.setAttribute("data-draggedSelected", "false");
      event.target.parentElement.setAttribute("data-draggedSelected", "true");
    }
    // when user click on list item, we want to assign value "0" to that list item
    // and assign value of "-1" to the previous list item that had tabindex "0"
    previousFocusedElement.setAttribute("tabindex", "-1");
    event.target.parentElement.setAttribute("tabindex", "0");
    event.target.parentElement.focus();
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

    /**
     * check/uncheck will effect allView, active and completed array
     * in all active and completed views
     * click checked btn in active or completed views
     * find element in allView array, update that element/allView array
     * filter out completed or not completed todo, put them in separate array in cachedObj
     * use forEach loop through each active and completed array push allViewIndex to separate arrays
     * depending on current view, run func to assign values to todo item grabDrag
     * checked btn aria-labelledby
     * delete btn aria-labelledby and id
     * **/
    /** the allViewIndex of the todo item in "Active" or "Completed" view will match
     * the index of the value in the allView array we can use the allViewIndex of item being delete
     * to find its position in the allView array like allViewArray[indexOfCheckedTodoItem]
     *  **/
    /**
     * user is on active view, one todo left
     * user click checked to change todoCompleted to true
     * we will check the length of the array
     * create and append listitem for the active array
     * assign "All" to cachedObj.currentView
     * **/
    /**
     * user is on completed view, one todo item left
     * user click on checked btn to change todoCompleted to false
     * we will check the length of the array
     * create and append listitem for the completed array
     * **/

    /***** get todo listitem for un/checked btn  *****/

    const todoListitemForActiveAndCompletedView = event.target.closest("li");

    const checkedBtnAriaChecked = event.target.getAttribute("aria-checked");

    if (checkedBtnAriaChecked == "false") {
      // algorithm/func below will change todoCompleted of todo listitem in allView array
      changeTodoItemToCompleted(todoListitemForActiveAndCompletedView);
      // change digit to items left text
      increaseOrDecreaseItemsLeftCounter("minus");
    } else {
      // algorithm/func below will change todoCompleted of todo listitem in allView array
      changeTodoItemToNotCompleted(todoListitemForActiveAndCompletedView);
      // change digit to items left text
      increaseOrDecreaseItemsLeftCounter("add");
    }

    /***** work with allview,active and completed here *****/

    // dont have to do anything to allView array
    // just filter out completed and not completed todo

    // active
    cachedData.arraysOfDifferentViews.activeViewArray =
      filterOutActiveTodoItems(cachedData.arraysOfDifferentViews.allViewArray);
    // completed
    cachedData.arraysOfDifferentViews.completedViewArray =
      filterOutCompletedTodoItems(
        cachedData.arraysOfDifferentViews.allViewArray
      );

    /**
     * based on which view user is on
     * **/

    switch (cachedData.currentView) {
      case "All":
        // update attr and create listitem
        const allView = assignAttrToArrayAndCreateListitem(
          cachedData.arraysOfDifferentViews.allViewArray,
          updateAttrForTodoItemCheckedAndDeleteBtn,
          createChildrenForUnorderedList
        );
        // remove current listitems of ul and append listitems in fragment
        removeCurrentListitemsAppendFragmentElement(unorderedList, allView);
        break;
      case "Active":
        // update attr and create listitem
        const activeView = assignAttrToArrayAndCreateListitem(
          cachedData.arraysOfDifferentViews.activeViewArray,
          updateAttrForTodoItemCheckedAndDeleteBtn,
          createChildrenForUnorderedList
        );
        // remove current listitems of ul and append listitems in fragment
        removeCurrentListitemsAppendFragmentElement(unorderedList, activeView);
        // check length of active array to see if we have to add top border to views container
        if (cachedData.arraysOfDifferentViews.activeViewArray.length >= 1) {
          // run func to create and append elements in active array
          addOrRemoveTopBorderToViewsContainer("true");
        } else {
          // run func to create and append elements in allView array

          addOrRemoveTopBorderToViewsContainer("false");
          switch (cachedData.currentView) {
            case "Active":
              event.target.nextElementSibling.removeAttribute(
                "data-currentView"
              );
              break;
            case "Completed":
              event.target.nextElementSibling.nextElementSibling.removeAttribute(
                "data-currentView"
              );
              break;
          }
        }

        break;
      case "Completed":
        // update attr and create listitem
        const completedView = assignAttrToArrayAndCreateListitem(
          cachedData.arraysOfDifferentViews.completedViewArray,
          updateAttrForTodoItemCheckedAndDeleteBtn,
          createChildrenForUnorderedList
        );
        // remove current listitems of ul and append listitems in fragment
        removeCurrentListitemsAppendFragmentElement(
          unorderedList,
          completedView
        );
        // check length of completed array to see if we have to add top border to views container
        cachedData.arraysOfDifferentViews.completedViewArray >= 1
          ? addOrRemoveTopBorderToViewsContainer("true")
          : addOrRemoveTopBorderToViewsContainer("false");
        break;
    }

    console.log("checked");
  }

  // delete btn

  function deleteBtnClicked(event) {
    // will effect items left if the element has todoCompleted="false"
    // delete a todo item will effect allview array
    // depend on the current view, the active or completed array in cachedObj
    // get for allViewIndex todo item being delete
    // filter out the todo item being delete fron allView array using delete item allViewIndex
    /** the allViewIndex of the todo item in "Active" or "Completed" view will match
     * the index of the value in the allView array we can use the allViewIndex of item being delete
     * to find its position in the allView array like allViewArray[indexOfDeleteItem]
     *  **/
    // update attr of todo items in allView array
    // filter out items based on todoCompleted value true or false
    // get allView values for todoCompleted items and not completed items
    /**
     * user is on active or completed view, one todo item
     * user click delete to remove item
     * run switch algorithm in allViewBtnClick func
     * run func to create Li elements in allView array in cachedObj
     * **/
    /**
     * we will check if there is only one todo item left
     * and user is either one active or completed view
     * we assign length = 0 to allView,active,completed, active allViewIndex, completed allViewIndex
     * arrays in cachedObj to make arrays empty
     * **/
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
     * run func to create todo element using allView array in cachedObj
     * **/
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

    /**
     * run func to create todo element using activeView array in cachedObj
     * call/execute func that will update attr of todo listitem grabDragIndex
     * checked btn aria-labelledby
     * delete btn aria-labelledby and id
     * **/
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
    /**
     * run func to create todo element using completed array in cachedObj
     * call/execute func that will update attr of todo listitem grabDragIndex
     * checked btn aria-labelledby
     * delete btn aria-labelledby and id
     * **/
    // get previous sibling elements assign value "false" to data-currentView
    cachedData.currentView = "Completed";
  }

  // clear completed

  function clearCompletedBtnClicked(event) {
    // func will effect all and completed views array
    // if user is on all view and all todo items has todoCompleted true
    // user click this btn assign length = 0 to allView array and complete view array
    // call ul.replaceChildren to remove all li elements
    // run same algorithm when user is on completed view. assign "false" to data-unorderedhasitems
    // run switch algorithm of allViewBtnClicked
    /** user is eiter on all or active view **/
    // if there are items in the active array, filter out the todoCompleted "true" for all view
    // assign length = 0 to completed array in cachedObj
    /** user is on completed view **/
    // if there are items in the active array, assign length = 0 to completed array in cachedObj
    // call ul.replaceChildren() to remove li elements
    // run switch algorithm of allViewBtnClicked
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
   * building listitem element for todo item, checked btn, and delete btn
   * when we run func to create listitem then append listitems (children to UL)
   * we just want that func to create LI then append to UL
   * updating attr will be handled by other helpers
   * **/

  /**
   * user hit enter key to create new todo
   * **/

  function keyDownEventForTodoInput(event) {
    // check if all view array is empty if it is we will create todo item then push that item to allview and active view array
    // else we copy allView array then create a new array
    // create todo item. combine newly created todo item to copied array
    // [newTodoItem, ...copiedArray];
    // run func to update attr to li elements in allView array
    // filter out completed or not completed todo, assign those arrays to properties in our cachedObj
    // get allView index for completed or not completed todo items
    if (event.code == "Enter" || event.code == "NumpadEnter") {
      const newTodoItem = createTodoItem(event);
      // build allView array
      const buildingAllViewArray =
        buildAllViewArrayForTodoInputFunc(newTodoItem);
      // filter out completed and not completed todos
      const buildingActiveArray =
        filterOutActiveTodoItems(buildingAllViewArray);
      const buildingCompletedArray =
        filterOutCompletedTodoItems(buildingAllViewArray);
      // assign built arrays to array in cachedObj
      // active
      cachedData.arraysOfDifferentViews.activeViewArray = buildingActiveArray;
      // completed
      cachedData.arraysOfDifferentViews.completedViewArray =
        buildingCompletedArray;
      // save original order of allViewIndex for active and completed
      // active view
      originalAllViewIndexForElementsInActiveOrCompletedArray(
        buildingActiveArray,
        "activeView"
      );
      // completed view
      originalAllViewIndexForElementsInActiveOrCompletedArray(
        buildingCompletedArray,
        "completedView"
      );
      // run func based on currentView
      switch (cachedData.currentView) {
        /**
         * doesnt matter which view user is on
         * we will always work with allView,active and completed array
         * and active and completed allViewIndex array in cachedObj
         * **/
        case "All":
          // call func that will add attr to elements based on length of array
          // then run func to create element
          const allViewListitems = assignAttrToArrayAndCreateListitem(
            cachedData.arraysOfDifferentViews.allViewArray,
            updateAttrForTodoItemCheckedAndDeleteBtn,
            createChildrenForUnorderedList,
            true
          );
          // remove children of UL
          // append listitems in fragment to UL
          removeCurrentListitemsAppendFragmentElement(
            unorderedList,
            allViewListitems
          );
          // change value of data-unorderedhasitems on views-container to true
          addOrRemoveTopBorderToViewsContainer("true");
          // add one to items left text
          increaseOrDecreaseItemsLeftCounter("add");
          break;
        case "Active":
          // call func that will add attr to elements based on length of array
          // then run func to create element
          const activeListitems = assignAttrToArrayAndCreateListitem(
            cachedData.arraysOfDifferentViews.activeViewArray,
            updateAttrForTodoItemCheckedAndDeleteBtn,
            createChildrenForUnorderedList
          );
          // remove children of UL
          // append listitems in fragment to UL
          removeCurrentListitemsAppendFragmentElement(
            unorderedList,
            activeListitems
          );
          // change value of data-unorderedhasitems on views-container to true
          addOrRemoveTopBorderToViewsContainer("true");
          // add one to items left text
          increaseOrDecreaseItemsLeftCounter("add");
          break;
        case "Completed":
          // call func that will add attr to elements based on length of array
          // then run func to create element
          const completedViewListitems = assignAttrToArrayAndCreateListitem(
            cachedData.arraysOfDifferentViews.completedViewArray,
            updateAttrForTodoItemCheckedAndDeleteBtn,
            createChildrenForUnorderedList
          );
          // remove children of UL
          // append listitems in fragment to UL
          removeCurrentListitemsAppendFragmentElement(
            unorderedList,
            completedViewListitems
          );
          break;
      }
      console.log(cachedData);
    }
  }

  /**
   * build allView array
   * **/

  function buildAllViewArrayForTodoInputFunc(todoItem) {
    if (cachedData.arraysOfDifferentViews.allViewArray.length === 0) {
      cachedData.arraysOfDifferentViews.allViewArray.push(todoItem);
      return cachedData.arraysOfDifferentViews.allViewArray;
    } else {
      // copy allViewArray in cachedObj
      const copiedAllViewArr = [
        ...cachedData.arraysOfDifferentViews.allViewArray,
      ];
      // change first item in that array tabIndex to -1
      const [firstAllViewItem] = copiedAllViewArr;
      firstAllViewItem.setAttribute("tabindex", "-1");
      // add newly todo item to allView array;
      // more than one item in allView array assign allviewindex and grabdragindex
      cachedData.arraysOfDifferentViews.allViewArray = [
        todoItem,
        ...copiedAllViewArr,
      ];
      assignAllViewIndexElementsInAllViewArr(
        cachedData.arraysOfDifferentViews.allViewArray
      );
      return cachedData.arraysOfDifferentViews.allViewArray;
    }
  }

  /**
   * working with allView array in todo input func
   * **/

  function workingWithAllViewInTodoInputFunc(todoItem) {}

  /**
   * working with active array in todo input func
   * **/

  function workingWithActiveInTodoInputFunc(todoItem) {}

  /**
   * working with completed array in todo input func
   * **/

  function workingWithCompletedInTodoInputFunc(todoItem) {}

  /**
   * make array for active view
   * **/

  function filterOutActiveTodoItems(allViewList) {
    return allViewList.filter(function getCompleted(listitem) {
      const todoCompleteValue = listitem.getAttribute("data-todocompleted");
      return todoCompleteValue === "false";
    });
  }

  /**
   * make array for completed view
   * **/

  function filterOutCompletedTodoItems(allViewList) {
    return allViewList.filter(function getCompleted(listitem) {
      const todoCompleteValue = listitem.getAttribute("data-todocompleted");
      return todoCompleteValue === "true";
    });
  }

  /**
   * create todo item
   * **/

  function createTodoItem(event) {
    const todoItemTextContent = valueOfTodoInput(event);
    /***** todo listitem *****/
    /**
     * we will always add the newly created todo to the front of the allView array
     * its allViewIndex and grabDragIndex will always be 0
     * **/
    const todoItem = createElementForTodoItem("LI", {
      tabindex: "0",
      role: "option",
      class: "todo-item",
      "data-draggedSelected": "false",
      "data-todoCompleted": "false",
      "data-allViewIndex": "0",
      "data-grabDragIndex": "0",
    });
    // div draggable element
    const draggableDiv = createElementForTodoItem("DIV", {
      draggable: "true",
    });
    // draggable element children
    /* checked btn wrapper */
    const checkedBtnBackgroundWrapper = createElementForTodoItem("DIV", {
      "user-focused-btn": "false",
      "data-checked": "false",
      class: "circle-testing",
    });
    /** checked btn **/
    const checkedBtn = createElementForTodoItem("BUTTON", {
      role: "checkbox",
      "aria-labelledby": "",
      "aria-checked": "false",
      class: "checked-btn",
    });
    /*** img element for checked btn ***/
    const imageForCheckedBtn = createElementForTodoItem("IMG", {
      src: "./images/icon-check.svg",
      alt: "",
    });
    /* paragraph text content of todo */
    const paragraphTextContent = createElementForTodoItem("P", { id: "" });
    /* delete btn */
    const deleteBtn = createElementForTodoItem("BUTTON", {
      id: "",
      class: "delete-btn",
      "aria-labelledby": "",
      "aria-label": "delete to do item",
    });
    /** img element for delete btn **/
    const imageForDeleteBtn = createElementForTodoItem("IMG", {
      src: "./images/icon-cross.svg",
      alt: "",
    });
    // append element to its parent element
    /** work our way up the parent tree **/
    // image to delete btn
    deleteBtn.append(imageForDeleteBtn);
    // image to checked btn
    checkedBtn.append(imageForCheckedBtn);
    // checked btn to its wrapper parent
    checkedBtnBackgroundWrapper.append(checkedBtn);
    // assign text to paragraph element
    paragraphTextContent.innerText = todoItemTextContent;
    const childrenOfDraggableElement = [
      checkedBtnBackgroundWrapper,
      paragraphTextContent,
      deleteBtn,
    ];
    // use foreach to append elements to draggable div
    childrenOfDraggableElement.forEach(function appendToDivParent(element) {
      draggableDiv.append(element);
    });
    // append draggable div to Li
    todoItem.append(draggableDiv);
    return todoItem;
  }

  /**
   * get value of todo input
   * **/

  function valueOfTodoInput(event) {
    return event.target.value;
  }

  /**
   * algorithm below will create element and set attrs to the element
   * based on the obj we pass to the func
   * **/

  function createElementForTodoItem(tag, objectOfAttr) {
    // create element
    const elementForTodoItem = document.createElement(tag);
    // turn obj of attr into an array of subarrays with [attr,attrValue]
    const arrayOfSubarrayOfAttrAndAttrValue = Object.entries(objectOfAttr);
    // use forEach to assign attr to element
    arrayOfSubarrayOfAttrAndAttrValue.forEach(function assignAttr(subarray) {
      const [attr, attrValue] = subarray;
      elementForTodoItem.setAttribute(attr, attrValue);
    });
    return elementForTodoItem;
  }

  /**
   * keyboard drag and drop
   * **/

  keyboardDragAndDrop(
    document.querySelector(".list-style-wrapper ul"),
    "keydown",
    accessibilityDragAndDrop
  );

  function keyboardDragAndDrop(unorderedList, keydown, func) {
    applyEventListener(unorderedList, keydown, func);
  }

  // accessibilityDragAndDrop

  function accessibilityDragAndDrop(event) {
    if (document.activeElement.tagName == "LI") {
      // when we get here the focus element will be the todo listitem
      // target the UL and its children count
      const unorderedChildren = Array.prototype.slice.call(
        document.activeElement.parentElement.children
      );
      // for "ArrowDown" algorithm
      const lengthOfUnorderedListMinusOne = unorderedChildren.length - 1;
      switch (event.code) {
        case "Space":
        case "Enter":
          event.preventDefault();
          console.log(getGrabDragIndexAttr(document.activeElement));
          if (!cachedData.draggedItemSelected) {
            document.activeElement.setAttribute("data-draggedselected", "true");
            cachedData.draggedItemSelected = true;
          } else {
            document.activeElement.setAttribute(
              "data-draggedselected",
              "false"
            );
            cachedData.draggedItemSelected = false;
          }
          break;
      }
    }
  }

  /**
   * more helper func
   * **/

  function getGrabDragIndexAttr(element) {
    return element.getAttribute("data-grabDragIndex");
  }

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
   * call this func before we run func to create element and append to fragment element
   * **/

  function updateAttrForTodoItemCheckedAndDeleteBtn(
    collection,
    updateAllViewIndex
  ) {
    // loop through array
    collection.forEach(function updateValuesToAttr(listitem, index) {
      // user is on "All" views and we want to update allViewIndex
      // updateAllViewIndex will be boolean value true or undefined
      // if (updateAllViewIndex) {
      //   cachedData.currentView == "All"
      //     ? (listitem.attributes["data-allViewIndex"].value = String(index))
      //     : null;
      // }
      /*** we want to update allViewIndex
       * instead of checking views we will let this algorithm know if we want to
       * update allViewIndex
       * ***/
      updateAllViewIndex
        ? (listitem.attributes["data-allViewIndex"].value = String(index))
        : null;
      // user is on "Active" or "Completed" view
      listitem.attributes["data-grabDragIndex"].value = String(index);
      // checked btn
      listitem.firstElementChild.children[0].firstElementChild.attributes[
        "aria-labelledby"
      ] = `todo-item-${index}`;
      // todo item text content
      listitem.firstElementChild.children[1].attributes[
        "id"
      ].value = `todo-item-${index}`;
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
   * assign data-allviewindex and data-grabdragindex for elements in allView array
   * when we create a todo item
   * **/

  function assignAllViewIndexElementsInAllViewArr(list) {
    list.forEach(function assignValueToAttr(listitem, index) {
      listitem.setAttribute("data-allviewindex", String(index));
      // listitem.setAttribute("data-grabdragindex", String(index));
    });
  }

  /**
   * get original allViewIndex for elements in active and completed array
   * **/

  function originalAllViewIndexForElementsInActiveOrCompletedArray(
    list,
    stringForObjAccess
  ) {
    list.forEach(function addAllViewIndexToArray(listitem) {
      const itemAllViewIndex = listitem.getAttribute("data-allviewindex");
      // algorithm below will get array in cachedObj of obj originalElementOrderInAllViewArray
      // based on string we pass in
      cachedData.originalElementOrderInAllViewArray[
        `${stringForObjAccess}OriginalOrder`
      ].push(itemAllViewIndex);
    });
  }

  /**
   * assign allViewIndex to elements in "Active" or "Completed" array
   * **/

  /**
   * algorithm below for when user drag and drop
   * on views for "Active" and "Completed" views
   * call this func before we run func to create element and append to fragment element
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
   * in dragdrop element check cachedObj.currectView property
   * **/

  function updateAllViewArrayWithCorrectOrderAfterDragDropInActiveOrCompletedView(
    firstArray,
    SecondArray
  ) {
    /** when user is on active or completed view **/
    // spread active array and completed array in cachedObj into one array
    // run sort method on array. we will sort by allView index of items in array
    const copiedActive = firstArray;
    const copiedCompleted = SecondArray;
    const combineBothArrays = [...copiedActive, ...copiedCompleted];
    const correctOrderOfTodoItems = combineBothArrays.sort(
      function correcrTheOrderOfTodo(firstItem, secondItem) {
        if (firstItem < secondItem) return -1;
        if (secondItem < firstItem) return 1;
        return 0;
      }
    );
    return correctOrderOfTodoItems;
  }

  /**
   * func will loop through list/array, create li element, append to fragment
   * return an element with li elements as children
   * **/

  function createChildrenForUnorderedList(list) {
    var fragment = new DocumentFragment();
    // append listitems to fragment;
    list.forEach(function appendItems(element) {
      fragment.appendChild(element);
      // element.attributes["data-index"].value = String(index);
    });
    return fragment;
  }

  /**
   * assignAttrToArrayAndCreateListitem
   * **/

  function assignAttrToArrayAndCreateListitem(
    array,
    firstFunc,
    secondFunc,
    ...rest
  ) {
    const copiedArray = [...array];
    // assign attr
    firstFunc(copiedArray, ...rest);
    console.log(rest);
    // create listitem element
    // algorithm below returns a fragment element with listitem as children
    return secondFunc(copiedArray);
  }

  /**
   * removeCurrentListitemsAppendFragmentElement
   * **/

  function removeCurrentListitemsAppendFragmentElement(element, array) {
    // remove children
    element.replaceChildren();
    // append fragment
    element.append(array);
  }

  /**
   * change items left
   * **/

  function increaseOrDecreaseItemsLeftCounter(strInput) {
    const digitElementForItemsLeft = document.querySelector(".views-counter");
    const counterTextContent = digitElementForItemsLeft.innerText;
    var convertToNumber = Number(counterTextContent);
    switch (strInput) {
      case "add":
        convertToNumber++;
        break;
      case "minus":
        counterTextContent === "" || counterTextContent === "0"
          ? (counterTextContent.innerText = "0")
          : convertToNumber--;
        break;
    }
    // assign value to item left element
    digitElementForItemsLeft.innerText = String(convertToNumber);
  }

  /**
   * add or remove top border
   * **/

  function addOrRemoveTopBorderToViewsContainer(strInput) {
    document
      .querySelector("views-container")
      .setAttribute("data-unorderedhasitems", strInput);
  }

  /**
   * change attr to show todo is completed
   * checked btn aria-checked to true
   * div with class circle-testing to true
   * li todo item data-todocompleted to true
   * **/

  function changeTodoItemToCompleted(todoListItem) {
    // get todo Li element allViewIndex
    const todoOfClickedCheckedBtnAllViewIndexInActiveView = Number(
      todoListItem.getAttribute("data-allViewIndex")
    );
    // change attr to make it completed for that todo in the allView array
    const matchingAllViewIndexItemInAllViewArray =
      cachedData.arraysOfDifferentViews.allViewArray[
        todoOfClickedCheckedBtnAllViewIndexInActiveView
      ];
    // todo item with todoCompleted
    matchingAllViewIndexItemInAllViewArray.setAttribute(
      "data-todocompleted",
      "true"
    );
    // div with circle-testing
    matchingAllViewIndexItemInAllViewArray.firstElementChild.setAttribute(
      "data-checked",
      "true"
    );
    // checked btn
    matchingAllViewIndexItemInAllViewArray.firstElementChild.children[0].setAttribute(
      "aria-checked",
      "true"
    );
  }

  /**
   * change attr to show todo is not completed
   * checked btn aria-checked to false
   * div with class circle-testing to false
   * li todo item data-todocompleted to false
   * **/

  function changeTodoItemToNotCompleted(todoListItem) {
    // get todo Li element allViewIndex
    const todoOfClickedCheckedBtnAllViewIndexInActiveView = Number(
      todoListItem.getAttribute("data-allViewIndex")
    );
    // change attr to make it completed for that todo in the allView array
    const matchingAllViewIndexItemInAllViewArray =
      cachedData.arraysOfDifferentViews.allViewArray[
        todoOfClickedCheckedBtnAllViewIndexInActiveView
      ];
    // todo item with todoCompleted
    matchingAllViewIndexItemInAllViewArray.setAttribute(
      "data-todocompleted",
      "false"
    );
    // div with circle-testing
    matchingAllViewIndexItemInAllViewArray.firstElementChild.setAttribute(
      "data-checked",
      "false"
    );
    // checked btn
    matchingAllViewIndexItemInAllViewArray.firstElementChild.children[0].setAttribute(
      "aria-checked",
      "false"
    );
  }

  /**
   * apply attr data-currentView to all view btn element depending on the
   * width of app
   * algorithm is for when we want to go to "All" view after used clicked on
   * un/checked btn and delete btn
   * we want to find btn with data-currentView work from there
   * **/

  function applyDataCurrentViewAttrToBtn() {
    const windowWidth = window.innerWidth;
    if (windowWidth > 385) {
      // desktop
      document
        .querySelector(".desktop-btn-all")
        .setAttribute("data-currentView", "");
    } else {
      // mobile
      document
        .querySelector(".mobile-btn-all")
        .setAttribute("data-currentView", "");
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
    // unorderedList
    const unorderedList = document.querySelector(".list-style-wrapper > ul");
    // toggle button
    const toggleThemeBtn = document.querySelector(".toggle-btn");
    // checked btn
    const checkedBtn = Array.prototype.slice.call(
      document.querySelectorAll(".checked-btn")
    );
    return {
      mainElement,
      unorderedList,
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
