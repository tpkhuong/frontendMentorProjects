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
    // check if aria-pressed is false
    const toggleBtnAriaPressed = this.getAttribute("aria-pressed");
    toggleBtnAriaPressed == "false"
      ? this.setAttribute("aria-pressed", "true")
      : this.setAttribute("aria-pressed", "false");
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
    /**
     * get index of todo with tabindex = "0";
     * +1 to index for all and active view algorithm
     * for completed view index of todo item with tabindex = "0" will not change
     * we want a reference to the element that had focus/tabindex = "0" by getting the index
     * of that element before we change attr,remove listitems, and append newly created listitem
     * **/
  }

  // checked btn

  function checkedBtnClicked(event) {
    /**
     * get index of todo with tabindex = "0";
     * +1 to index for all and active view algorithm
     * for completed view index of todo item with tabindex = "0" will not change
     * we want a reference to the element that had focus/tabindex = "0" by getting the index
     * of that element before we change attr,remove listitems, and append newly created listitem
     * **/
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

    const todoListitemOfClickedCheckedBtn = event.target.closest("li");
    // get index of listitem with tabindex == "0"
    // we want to use the index because we will use it after we mutate the all view array
    // algorithm below is to switch focus on previous todo item to current clicked todo item
    const indexOfELementWithTabindexZero = getIndexOfElementWithTabindexZero(
      unorderedList.children
    );
    /**
     * since we are removing the current todo listitem of unorderedlist.children
     * then creating new todo items and appending them to unorderedlist
     * we can use the index of the todo item of the clicked checked btn which is the arrayIndex
     * focus that item/element change its tabindex to "0", its checked btn and delete btn tabindex to "0" when current view is all
     * for active and completd view run different algorithm
     * we will use indexOfELementWithTabindexZero to focus todo item in our switch statement
     * after we create the todo items and append them to unorderlist
     * **/
    // when user click on checked or delete button we want to get
    // all view index and array index of the closet li of the checked or delete btn
    const [allViewIndex, arrayIndex] = getAllViewAndCurrentArrayIndexOfTodoItem(
      todoListitemOfClickedCheckedBtn
    );
    // also want to get the todo listitem tabindex it will be either "0" or "-1"
    // for active and completed view
    // algorithm is to check if user is using a mouse or keyboard when they click on checked btn
    // if user is ONLY using keyboard tabindex of clicked checked btn will be "0"
    // if user is using keyboard and mouse, when user have a todo item focus then they clicked on checked btn
    // tabindex of todo item will be "-1"
    const todoItemTabIndex =
      todoListitemOfClickedCheckedBtn.getAttribute("tabindex");

    const checkedBtnAriaChecked = event.target.getAttribute("aria-checked");

    if (checkedBtnAriaChecked == "false") {
      // algorithm/func below will change todoCompleted of todo listitem in allView array
      changeTodoItemToCompleted(allViewIndex);
      // change digit to items left text
      increaseOrDecreaseItemsLeftCounter("minus");
    } else {
      // algorithm/func below will change todoCompleted of todo listitem in allView array
      changeTodoItemToNotCompleted(allViewIndex);
      // change digit to items left text
      increaseOrDecreaseItemsLeftCounter("add");
    }

    /***** work with allview,active and completed here *****/
    /**
     * pass a copy of the all view array when we are filtering out completed and not completed todo
     * **/

    const copiedOfAllViewArray = [].concat(
      cachedData.arraysOfDifferentViews.allViewArray
    );

    // dont have to do anything to allView array
    // just filter out completed and not completed todo

    // active
    cachedData.arraysOfDifferentViews.activeViewArray =
      filterOutActiveTodoItems(copiedOfAllViewArray);
    // completed
    cachedData.arraysOfDifferentViews.completedViewArray =
      filterOutCompletedTodoItems(copiedOfAllViewArray);
    // assign tabindex of '0' to first item
    // active
    assignTabindexZeroToFirstElement(
      cachedData.arraysOfDifferentViews.activeViewArray
    );
    // completed
    assignTabindexZeroToFirstElement(
      cachedData.arraysOfDifferentViews.completedViewArray
    );
    /**
     * based on which view user is on
     * **/

    switch (cachedData.currentView) {
      case "All":
        // clicking on checked btn in all view
        // will apply focus to that li of that checked btn that was clicked
        // update attr and create listitem
        const allView = assignAttrToArrayAndCreateListitem(
          cachedData.arraysOfDifferentViews.allViewArray,
          updateAttrForTodoItemCheckedAndDeleteBtn,
          createChildrenForUnorderedList
        );
        // remove current listitems of ul and append listitems in fragment
        removeCurrentListitemsAppendFragmentElement(unorderedList, allView);
        // check the value of views container data-unorderedhasitems attr
        document
          .querySelector("views-container")
          .getAttribute("data-unorderedhasitems") != "true"
          ? addOrRemoveTopBorderToViewsContainer("true")
          : null;
        // once we append the listitems we can run algorithm to focus listitem
        // of the checked btn that was clicked
        /**
         * might have to use unorderedList.children[arrayIndex] pass in that listitem to
         * applyFocusToSelectedTodoWhenCheckedDeleteBtnOrListitemIsClicked
         * **/
        /**
         * we are handling adding border to view container in our keydown todo input algorithm
         * **/
        // applyFocusToSelectedTodoWhenCheckedDeleteBtnOrListitemIsClicked(
        //   unorderedList.children[arrayIndex],
        //   unorderedList.children[indexOfELementWithTabindexZero]
        // );
        /**
         * for all view we will focus and assign attr to listitem of the clicked checked btn
         * **/
        // we create todo listitems and append them to unorderlist
        // pass in unorderedlist.children to funcs we will use below
        // use arrayIndex focus that element change tabindex of checked and delete btn of that todo listitem to "0"
        singleTargetChangeTabindexCheckedAndDeleteBtn(
          unorderedList.children[arrayIndex]
        );
        applyFocusChangeTabindexSingleTarget(
          unorderedList.children[arrayIndex]
        );
        // focus that element
        unorderedList.children[arrayIndex].focus();
        break;
      case "Active":
        // check length of active array to see if we have to add top border to views container
        // and which array we will render: active or allView
        if (cachedData.arraysOfDifferentViews.activeViewArray.length >= 1) {
          // update attr and create listitem
          // const activeView = assignAttrToArrayAndCreateListitem(
          //   cachedData.arraysOfDifferentViews.activeViewArray,
          //   updateAttrForTodoItemCheckedAndDeleteBtn,
          //   createChildrenForUnorderedList
          // );
          // // remove current listitems of ul and append listitems in fragment
          // // run func to create and append elements in active array
          // removeCurrentListitemsAppendFragmentElement(
          //   unorderedList,
          //   activeView
          // );
          // if (
          //   document
          //     .querySelector("views-container")
          //     .getAttribute("data-unorderedhasitems") == "false"
          // ) {
          //   addOrRemoveTopBorderToViewsContainer("true");
          //   // we will still be on active view. we dont have to go to allView
          //   // views container should have data-unorderedhasitems set to "true"
          //   // if "false" is assigned to it change it to "true"
          // }
          /**
           * move algorithm above to func. we plan to use more than one
           * **/
          dependingOnViewCreateAndAppendListitems(
            cachedData.arraysOfDifferentViews.activeViewArray,
            unorderedList,
            document.querySelector("views-container"),
            assignAttrToArrayAndCreateListitem,
            removeCurrentListitemsAppendFragmentElement,
            addOrRemoveTopBorderToViewsContainer
          );
          // check the value of views container data-unorderedhasitems attr
          document
            .querySelector("views-container")
            .getAttribute("data-unorderedhasitems") != "true"
            ? addOrRemoveTopBorderToViewsContainer("true")
            : null;
          // we also will check if the listitem of the clicked checked btn
          // tabindex = "0"
          // once we append the listitems we can run algorithm to focus listitem
          // for both active and completed the arrayIndex will never be
          // greater than length of active or complete array in cachedObj
          // if arrayIndex < length of active array, use arrayIndex to get listitem in array and focus that element
          // if arrayIndex == length of active array, focus first item in active array
          // use switch statement
          if (todoItemTabIndex == "0") {
            // if user clicked on checked btn of todo item that has drag selected "true"
            // we will reset drag selected to default
            // getting here means the todo item of the clicked checked btn has focused
            // we want to apply focus to the listitem that is lower on the todo list
            // also no listitem will have tabindex = "0" run applyFocusToSelectedTodoWhenCheckedDeleteBtnOrListitemIsClicked
            cachedData.draggedItemSelected = false;
            const firstTodoItemActiveView = unorderedList.children[0];
            // arrayIndex == unorderedList.childElementCount
            //   ? applyFocusToSelectedTodoWhenCheckedDeleteBtnOrListitemIsClicked(
            //       firstTodoItemActiveView
            //     )
            //   : applyFocusToSelectedTodoWhenCheckedDeleteBtnOrListitemIsClicked(
            //       unorderedList.children[arrayIndex]
            //   );
            // use if statement to make algorithm above more readable
            if (arrayIndex == unorderedList.childElementCount) {
              singleTargetChangeTabindexCheckedAndDeleteBtn(
                firstTodoItemActiveView
              );
              applyFocusChangeTabindexSingleTarget(firstTodoItemActiveView);
              unorderedList.children[firstTodoItemActiveView].focus();
            } else {
              singleTargetChangeTabindexCheckedAndDeleteBtn(
                unorderedList.children[arrayIndex]
              );
              applyFocusChangeTabindexSingleTarget(
                unorderedList.children[arrayIndex]
              );
              unorderedList.children[arrayIndex].focus();
            }
          } else {
            // getting here means the todo item of the clicked checked btn does not have focused
            // its tabindex will be "-1"
            // we will find the listitem with tabindex of "0" and apply focus to that
            // const [listitemHasTabindexZero] = findElementWithTabindexZero(
            //   unorderedList.children
            // );
            // listitemHasTabindexZero.focus();
            /**
             * use different algorithm outside of our switch statement
             * we save a reference to the todo item that has tabindex 0
             * we will focus that element, assign proper attr to it and change its checked btn and delete btn attr
             * **/
            /**
             * we will use indexOfELementWithTabindexZero and arrayIndex
             * arrayIndex is the index of the todo listitem the user clicked checked btn
             * indexOfELementWithTabindexZero is the reference index of the todo item that has tabindex = "0" / focus todo
             * if arrayindex is less than indexOfELementWithTabindexZero we will subtract one from indexOfELementWithTabindexZero
             * use that index to focus the current todo listitem after we create todo listitem and append listitem to unorderlist
             * if arrayindex is greater than > indexOfELementWithTabindexZero just use indexOfELementWithTabindexZero to assign tabindex = "0" to that element
             * when arrayIndex and indexOfELementWithTabindexZero equal to each other the if statement of this else statement will handle that situation
             * **/
            if (arrayIndex < indexOfELementWithTabindexZero) {
              singleTargetChangeTabindexCheckedAndDeleteBtn(
                unorderedList.children[indexOfELementWithTabindexZero - 1]
              );
              applyFocusChangeTabindexSingleTarget(
                unorderedList.children[indexOfELementWithTabindexZero - 1]
              );
              unorderedList.children[
                indexOfELementWithTabindexZero - 1
              ].focus();
            } else {
              singleTargetChangeTabindexCheckedAndDeleteBtn(
                unorderedList.children[indexOfELementWithTabindexZero]
              );
              applyFocusChangeTabindexSingleTarget(
                unorderedList.children[indexOfELementWithTabindexZero]
              );
              unorderedList.children[indexOfELementWithTabindexZero].focus();
            }
          }
        } else {
          // active view array will be empty
          // run func to create and append elements in allView array
          // const goToAllViewArray = assignAttrToArrayAndCreateListitem(
          //   cachedData.arraysOfDifferentViews.allViewArray,
          //   updateAttrForTodoItemCheckedAndDeleteBtn,
          //   createChildrenForUnorderedList
          // );
          // // remove current listitems of ul and append listitems in fragment
          // removeCurrentListitemsAppendFragmentElement(
          //   unorderedList,
          //   goToAllViewArray
          // );
          // algorithm in if statement conditional check will return string or null
          // if we wanted to keep user on active view after assign checked = true for checked btn
          // we can remove top border by assign "false" to data-unorderedhasitems
          // since we are going to all view, there will already be a top border style applied to views container
          // if (
          //   document
          //     .querySelector("views-container")
          //     .getAttribute("data-unorderedhasitems")
          // )
          //   addOrRemoveTopBorderToViewsContainer("false");
          // we want to find current views btn with attr data-currentview
          // which should be Active btn, remove it on that element / btn
          // document
          //   .querySelector("button[data-currentView]")

          //   .removeAttribute("data-currentview");
          // // apply it to its previous sibling
          // document
          //   .querySelector("button[data-currentView]")
          //   .previousElementSibling.setAttribute("data-currentview", "");
          // // assign "All" to cachedObj.currentView
          // cachedData.currentView = "All";
          /**
           * move algorithm above to func. we plan to use more than one
           * **/
          alert("check the length of all view array in cachedObj");
          const currentViewBtnActive = findCurrentViewBtn(
            "button[data-currentView]"
          );

          appendAllViewElementsAndChangeToAllView(
            cachedData.arraysOfDifferentViews.allViewArray,
            assignAttrToArrayAndCreateListitem,
            removeCurrentListitemsAppendFragmentElement,
            currentViewBtnActive,
            currentViewBtnActive.previousElementSibling,
            unorderedList
          );
          // check the value of views container data-unorderedhasitems attr
          document
            .querySelector("views-container")
            .getAttribute("data-unorderedhasitems") != "true"
            ? addOrRemoveTopBorderToViewsContainer("true")
            : null;
          // our algorithm above is focusing the first element of allview array
          // once we append the listitems we can run algorithm to focus listitem
          // focus first item in all view array
          // unorderedList.children[0].focus();
          singleTargetChangeTabindexCheckedAndDeleteBtn(
            unorderedList.children[0]
          );
          applyFocusChangeTabindexSingleTarget(unorderedList.children[0]);
          unorderedList.children[0].focus();
        }
        break;
      case "Completed":
        // check length of completed array to see if we have to add top border to views container
        // and which array we will render: completed or allView
        if (cachedData.arraysOfDifferentViews.completedViewArray.length >= 1) {
          // update attr and create listitem
          // const completedView = assignAttrToArrayAndCreateListitem(
          //   cachedData.arraysOfDifferentViews.completedViewArray,
          //   updateAttrForTodoItemCheckedAndDeleteBtn,
          //   createChildrenForUnorderedList
          // );
          // // remove current listitems of ul and append listitems in fragment
          // // run func to create and append elements in completed array
          // removeCurrentListitemsAppendFragmentElement(
          //   unorderedList,
          //   completedView
          // );
          // if (
          //   document
          //     .querySelector("views-container")
          //     .getAttribute("data-unorderedhasitems") == "false"
          // ) {
          //   addOrRemoveTopBorderToViewsContainer("true");
          //   // we will still be on completed view. we dont have to go to allView
          //   // views container should have data-unorderedhasitems set to "true"
          //   // if "false" is assigned to it change it to "true"
          // }
          /**
           * move algorithm above to func. we plan to use more than one
           * **/
          dependingOnViewCreateAndAppendListitems(
            cachedData.arraysOfDifferentViews.completedViewArray,
            unorderedList,
            document.querySelector("views-container"),
            assignAttrToArrayAndCreateListitem,
            removeCurrentListitemsAppendFragmentElement,
            addOrRemoveTopBorderToViewsContainer
          );
          // check the value of views container data-unorderedhasitems attr
          document
            .querySelector("views-container")
            .getAttribute("data-unorderedhasitems") != "true"
            ? addOrRemoveTopBorderToViewsContainer("true")
            : null;
          // we also will check if the listitem of the clicked checked btn
          // tabindex = "0"
          // once we append the listitems we can run algorithm to focus listitem
          // for both active and completed the arrayIndex will never be
          // greater than length of active or completed array in cachedObj
          // if arrayIndex < length of completed array, use arrayIndex to get listitem in array and focus that element
          // if arrayIndex == length of completed array, focus first item in completed array
          // use switch statement
          if (todoItemTabIndex == "0") {
            // if user clicked on checked btn of todo item that has drag selected "true"
            // we will reset drag selected to default
            // getting here means the todo item of the clicked checked btn has focused
            // we want to apply focus to the listitem that is lower on the todo list
            // also no listitem will have tabindex = "0" run applyFocusToSelectedTodoWhenCheckedDeleteBtnOrListitemIsClicked
            cachedData.draggedItemSelected = false;
            const [firstItemOfCompletedView] = unorderedList.children[0];
            // arrayIndex == unorderedList.childElementCount
            //   ? applyFocusToSelectedTodoWhenCheckedDeleteBtnOrListitemIsClicked(
            //       firstItemOfCompletedView
            //     )
            //   : applyFocusToSelectedTodoWhenCheckedDeleteBtnOrListitemIsClicked(
            //       unorderedList.children[arrayIndex]
            //     );
            // use if statement to make algorithm above more readable
            if (arrayIndex == unorderedList.childElementCount) {
              singleTargetChangeTabindexCheckedAndDeleteBtn(
                firstTodoItemActiveView
              );
              applyFocusChangeTabindexSingleTarget(firstItemOfCompletedView);
              unorderedList.children[firstItemOfCompletedView].focus();
            } else {
              singleTargetChangeTabindexCheckedAndDeleteBtn(
                unorderedList.children[arrayIndex]
              );
              applyFocusChangeTabindexSingleTarget(
                unorderedList.children[arrayIndex]
              );
              unorderedList.children[arrayIndex].focus();
            }
          } else {
            // getting here means the todo item of the clicked checked btn does not have focused
            // its tabindex will be "-1"
            // we will find the listitem with tabindex of "0" and apply focus to that
            // const [itemHasTabindexZero] = findElementWithTabindexZero(
            //   unorderedList.children
            // );
            // itemHasTabindexZero.focus();
            /**
             * use different algorithm outside of our switch statement
             * we save a reference to the todo item that has tabindex 0
             * we will focus that element, assign proper attr to it and change its checked btn and delete btn attr
             * **/
            /**
             * we will use indexOfELementWithTabindexZero and arrayIndex
             * arrayIndex is the index of the todo listitem the user clicked checked btn
             * indexOfELementWithTabindexZero is the reference index of the todo item that has tabindex = "0" / focus todo
             * if arrayindex is less than indexOfELementWithTabindexZero we will subtract one from indexOfELementWithTabindexZero
             * use that index to focus the current todo listitem after we create todo listitem and append listitem to unorderlist
             * if arrayindex is greater than > indexOfELementWithTabindexZero just use indexOfELementWithTabindexZero to assign tabindex = "0" to that element
             * when arrayIndex and indexOfELementWithTabindexZero equal to each other the if statement of this else statement will handle that situation
             * **/
            if (arrayIndex < indexOfELementWithTabindexZero) {
              singleTargetChangeTabindexCheckedAndDeleteBtn(
                unorderedList.children[indexOfELementWithTabindexZero - 1]
              );
              applyFocusChangeTabindexSingleTarget(
                unorderedList.children[indexOfELementWithTabindexZero - 1]
              );
              unorderedList.children[
                indexOfELementWithTabindexZero - 1
              ].focus();
            } else {
              singleTargetChangeTabindexCheckedAndDeleteBtn(
                unorderedList.children[indexOfELementWithTabindexZero]
              );
              applyFocusChangeTabindexSingleTarget(
                unorderedList.children[indexOfELementWithTabindexZero]
              );
              unorderedList.children[indexOfELementWithTabindexZero].focus();
            }
          }
        } else {
          // completed view array will be empty
          // run func to create and append elements in allView array
          // const goToAllViewArray = assignAttrToArrayAndCreateListitem(
          //   cachedData.arraysOfDifferentViews.allViewArray,
          //   updateAttrForTodoItemCheckedAndDeleteBtn,
          //   createChildrenForUnorderedList
          // );
          // // remove current listitems of ul and append listitems in fragment
          // removeCurrentListitemsAppendFragmentElement(
          //   unorderedList,
          //   goToAllViewArray
          // );
          // algorithm in if statement conditional check will return string or null
          // if we wanted to keep user on completed view after assign checked = true for checked btn
          // we can remove top border by assign "false" to data-unorderedhasitems
          // since we are going to all view, there will already be a top border style applied to views container
          // if (
          //   document
          //     .querySelector("views-container")
          //     .getAttribute("data-unorderedhasitems")
          // )
          //   addOrRemoveTopBorderToViewsContainer("false");
          // we want to find current views btn with attr data-currentview
          // which should be completed btn, remove it on that element / btn
          // document
          //   .querySelector("button[data-currentView]")
          //   .removeAttribute("data-currentview");
          // // apply it to its previous previous sibling
          // document
          //   .querySelector("button[data-currentView]")
          //   .previousElementSibling.previousElementSibling.setAttribute(
          //     "data-currentview",
          //     ""
          //   );
          // // assign "All" to cachedObj.currentView
          // cachedData.currentView = "All";
          /**
           * move algorithm above to func. we plan to use more than one
           * **/

          const currentViewBtnCompleted = findCurrentViewBtn(
            "button[data-currentView]"
          );
          appendAllViewElementsAndChangeToAllView(
            cachedData.arraysOfDifferentViews.allViewArray,
            assignAttrToArrayAndCreateListitem,
            removeCurrentListitemsAppendFragmentElement,
            currentViewBtnCompleted,
            currentViewBtnCompleted.previousElementSibling
              .previousElementSibling,
            unorderedList
          );
          // check the value of views container data-unorderedhasitems attr
          document
            .querySelector("views-container")
            .getAttribute("data-unorderedhasitems") != "true"
            ? addOrRemoveTopBorderToViewsContainer("true")
            : null;
          // once we append the listitems we can run algorithm to focus listitem
          // focus first item in all view array
          singleTargetChangeTabindexCheckedAndDeleteBtn(
            unorderedList.children[0]
          );
          applyFocusChangeTabindexSingleTarget(unorderedList.children[0]);
          unorderedList.children[0].focus();
        }
        break;
    }

    console.log("checked");
  }

  // delete btn

  function deleteBtnClicked(event) {
    /**
     * get index of todo with tabindex = "0";
     * +1 to index for all and active view algorithm
     * for completed view index of todo item with tabindex = "0" will not change
     * we want a reference to the element that had focus/tabindex = "0" by getting the index
     * of that element before we change attr,remove listitems, and append newly created listitem
     * **/
    // will effect items left if the element has todoCompleted="false"
    // delete a todo item will effect allview array
    // depend on the current view, the active or completed array in cachedObj
    // get allViewIndex todo item being deleted
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
    /**
     * work with all view array. filter out completed and not completed items
     * run our algorithm based on curent view user is on
     * **/
    /**
     * run algorithm based on current view
     * **/
    const useIndexToFocusItemForDelBtnAlgorithm =
      getIndexOfElementWithTabindexZero(unorderedList.children);
    // todo item of clicked delete btn
    const todoItemOfClickedDeleteBtn = event.target.closest("li");
    // tabindex of todo item
    const tabindexOfTodoItem =
      todoItemOfClickedDeleteBtn.getAttribute("tabindex");
    // allView and array index
    const [allViewIndex, arrayIndex] = getAllViewAndCurrentArrayIndexOfTodoItem(
      todoItemOfClickedDeleteBtn
    );
    const todoItemStatus =
      todoItemOfClickedDeleteBtn.getAttribute("data-todocompleted");
    /**
     * if user click delete btn and the todo has todocompleted false
     * we want to decrease the items left since that item will be active
     * **/
    if (todoItemStatus == "false") {
      increaseOrDecreaseItemsLeftCounter("minus");
    }
    // for all, active and completed views
    // if tabindexOfTodoItem === "0"
    // check the arrayIndex to length of unorderlist.children
    // else means user clicked(using mouse) on delete btn while focus is on another todo item
    // the todo item of the clicked delete btn could have a lower or higher index(position)
    // than current focus todo item we would still
    // find element with tabindex "0" focus that

    /***** work with allview,active and completed here *****/

    // filter out the listitem of the clicked delete btn
    cachedData.arraysOfDifferentViews.allViewArray = filterOutTodoForDelection(
      cachedData.arraysOfDifferentViews.allViewArray,
      allViewIndex
    );
    // work with copy of all view when we filter out completed and not completed listitem
    // we dont want to mutate the allview array in cachedObj
    // if we passed cachedData.arraysOfDifferentViews.allViewArray in to these function calls
    // filterOutActiveTodoItems(copiedAllView);
    // filterOutCompletedTodoItems(copiedAllView);
    // we will be remove items that are completed and not completed which will leave allview array in cachedObj empty
    const copiedAllView =
      cachedData.arraysOfDifferentViews.allViewArray.slice();
    /**
     * update tabindex of each listitem in allView array befire we filter out the listitems
     * for active and completed array
     * **/
    assignAllViewIndexElementsInAllViewArr(
      cachedData.arraysOfDifferentViews.allViewArray
    );
    // filter out todocompleted = "false", active list
    cachedData.arraysOfDifferentViews.activeViewArray =
      filterOutActiveTodoItems(copiedAllView);
    // filter out todocompleted = "true", completed lsit
    cachedData.arraysOfDifferentViews.completedViewArray =
      filterOutCompletedTodoItems(copiedAllView);
    /**
     * handle tabindex for items in active and completed array in a different algorithm
     * **/
    // assign tabindex of '0' to first item
    // active
    // assignTabindexZeroToFirstElement(
    //   cachedData.arraysOfDifferentViews.activeViewArray
    // );
    // completed
    // assignTabindexZeroToFirstElement(
    //   cachedData.arraysOfDifferentViews.completedViewArray
    // );
    // save original order of allViewIndex for active and completed
    // active view
    cachedData.originalElementOrderInAllViewArray.activeViewOriginalOrder =
      originalAllViewIndexForElementsInActiveOrCompletedArray(
        cachedData.arraysOfDifferentViews.activeViewArray,
        "activeView"
      );
    // completed view
    cachedData.originalElementOrderInAllViewArray.completedViewOriginalOrder =
      originalAllViewIndexForElementsInActiveOrCompletedArray(
        cachedData.arraysOfDifferentViews.completedViewArray,
        "completeView"
      );

    switch (cachedData.currentView) {
      case "All":
        if (cachedData.arraysOfDifferentViews.allViewArray.length >= 1) {
          // append todo items in all view array to unorderlist
          const deleteBtnAllView = assignAttrToArrayAndCreateListitem(
            cachedData.arraysOfDifferentViews.allViewArray,
            updateAttrForTodoItemCheckedAndDeleteBtn,
            createChildrenForUnorderedList
          );

          removeCurrentListitemsAppendFragmentElement(
            unorderedList,
            deleteBtnAllView
          );
          // check if the listitem of the clicked delete btn tabindex is "-1" or "0"
          if (tabindexOfTodoItem === "0") {
            // use arrayIndex
            cachedData.draggedItemSelected = false;
            const firstItemAllView = unorderedList.children[0];
            // applyFocusToSelectedTodoWhenCheckedDeleteBtnOrListitemIsClicked
            // will apply tabindex = "0"
            // arrayIndex == unorderedList.childElementCount
            //   ? applyFocusToSelectedTodoWhenCheckedDeleteBtnOrListitemIsClicked(
            //       firstItemAllView
            //     )
            //   : applyFocusToSelectedTodoWhenCheckedDeleteBtnOrListitemIsClicked(
            //       unorderedList.children[arrayIndex]
            //     );
            // use if statement to make algorithm above more readable
            if (arrayIndex == unorderedList.childElementCount) {
              singleTargetChangeTabindexCheckedAndDeleteBtn(firstItemAllView);
              applyFocusChangeTabindexSingleTarget(firstItemAllView);
              unorderedList.children[firstItemAllView].focus();
            } else {
              singleTargetChangeTabindexCheckedAndDeleteBtn(
                unorderedList.children[arrayIndex]
              );
              applyFocusChangeTabindexSingleTarget(
                unorderedList.children[arrayIndex]
              );
              unorderedList.children[arrayIndex].focus();
            }
          } else {
            // find todo item with tabindex == "0"
            // const [listitemTabIndexZero] = findElementWithTabindexZero(
            //   unorderedList.children
            // );
            // listitemTabIndexZero.focus();
            /**
             * using different algorithm
             * **/
            /**
             * we will use useIndexToFocusItemForDelBtnAlgorithm and arrayIndex
             * arrayIndex is the index of the todo listitem the user clicked checked btn
             * useIndexToFocusItemForDelBtnAlgorithm is the reference index of the todo item that has tabindex = "0" / focus todo
             * if arrayindex is less than useIndexToFocusItemForDelBtnAlgorithm we will subtract one from useIndexToFocusItemForDelBtnAlgorithm
             * use that index to focus the current todo listitem after we create todo listitem and append listitem to unorderlist
             * if arrayindex is greater than > useIndexToFocusItemForDelBtnAlgorithm just use useIndexToFocusItemForDelBtnAlgorithm to assign tabindex = "0" to that element
             * when arrayIndex and useIndexToFocusItemForDelBtnAlgorithm equal to each other the if statement of this else statement will handle that situation
             * **/
            if (arrayIndex < useIndexToFocusItemForDelBtnAlgorithm) {
              singleTargetChangeTabindexCheckedAndDeleteBtn(
                unorderedList.children[
                  useIndexToFocusItemForDelBtnAlgorithm - 1
                ]
              );
              applyFocusChangeTabindexSingleTarget(
                unorderedList.children[
                  useIndexToFocusItemForDelBtnAlgorithm - 1
                ]
              );
              unorderedList.children[
                useIndexToFocusItemForDelBtnAlgorithm - 1
              ].focus();
            } else {
              singleTargetChangeTabindexCheckedAndDeleteBtn(
                unorderedList.children[useIndexToFocusItemForDelBtnAlgorithm]
              );
              applyFocusChangeTabindexSingleTarget(
                unorderedList.children[useIndexToFocusItemForDelBtnAlgorithm]
              );
              unorderedList.children[
                useIndexToFocusItemForDelBtnAlgorithm
              ].focus();
            }
          }
        } else {
          // allview array is empty
          // else statement to this if statement. cachedData.arraysOfDifferentViews.allViewArray.length >= 1
          unorderedList.replaceChildren();

          // check attr unorderedhasitems of views container

          document
            .querySelector("views-container")
            .getAttribute("data-unorderedhasitems") != "false"
            ? addOrRemoveTopBorderToViewsContainer("false")
            : null;
        }
        break;
      case "Active":
        // append todo items in active view array to unorderlist
        if (cachedData.arraysOfDifferentViews.activeViewArray.length >= 1) {
          // change attrs
          // create elements, remove current li elements
          const deleteBtnActiveView = assignAttrToArrayAndCreateListitem(
            cachedData.arraysOfDifferentViews.activeViewArray,
            updateAttrForTodoItemCheckedAndDeleteBtn,
            createChildrenForUnorderedList
          );

          removeCurrentListitemsAppendFragmentElement(
            unorderedList,
            deleteBtnActiveView
          );
          // focus element using reference index of the clicked delete btn todo item
          if (tabindexOfTodoItem === "0") {
            // use arrayIndex
            cachedData.draggedItemSelected = false;
            const firstItemActiveView = unorderedList.children[0];

            // arrayIndex == unorderedList.childElementCount
            //   ? applyFocusToSelectedTodoWhenCheckedDeleteBtnOrListitemIsClicked(
            //       firstItemActiveView
            //     )
            //   : applyFocusToSelectedTodoWhenCheckedDeleteBtnOrListitemIsClicked(
            //       arrayIndex
            //   );
            // using if statement because it is more readable
            if (arrayIndex == unorderedList.childElementCount) {
              // focus todo at index = 0
              singleTargetChangeTabindexCheckedAndDeleteBtn(
                unorderedList.children[firstItemActiveView]
              );
              applyFocusChangeTabindexSingleTarget(
                unorderedList.children[firstItemActiveView]
              );
              unorderedList.children[firstItemActiveView].focus();
            } else {
              singleTargetChangeTabindexCheckedAndDeleteBtn(
                unorderedList.children[arrayIndex]
              );
              applyFocusChangeTabindexSingleTarget(
                unorderedList.children[arrayIndex]
              );
              unorderedList.children[arrayIndex].focus();
            }
          } else {
            // find todo item with tabindex == "0"
            // const [todoHasTabindexZero] = findElementWithTabindexZero(
            //   unorderedList.children
            // );
            // todoHasTabindexZero.focus();
            /**
             * using different algorithm
             * **/
            /**
             * we will use useIndexToFocusItemForDelBtnAlgorithm and arrayIndex
             * arrayIndex is the index of the todo listitem the user clicked checked btn
             * useIndexToFocusItemForDelBtnAlgorithm is the reference index of the todo item that has tabindex = "0" / focus todo
             * if arrayindex is less than useIndexToFocusItemForDelBtnAlgorithm we will subtract one from useIndexToFocusItemForDelBtnAlgorithm
             * use that index to focus the current todo listitem after we create todo listitem and append listitem to unorderlist
             * if arrayindex is greater than > useIndexToFocusItemForDelBtnAlgorithm just use useIndexToFocusItemForDelBtnAlgorithm to assign tabindex = "0" to that element
             * when arrayIndex and useIndexToFocusItemForDelBtnAlgorithm equal to each other the if statement of this else statement will handle that situation
             * **/
            if (arrayIndex < useIndexToFocusItemForDelBtnAlgorithm) {
              singleTargetChangeTabindexCheckedAndDeleteBtn(
                unorderedList.children[
                  useIndexToFocusItemForDelBtnAlgorithm - 1
                ]
              );
              applyFocusChangeTabindexSingleTarget(
                unorderedList.children[
                  useIndexToFocusItemForDelBtnAlgorithm - 1
                ]
              );
              unorderedList.children[
                useIndexToFocusItemForDelBtnAlgorithm - 1
              ].focus();
            } else {
              singleTargetChangeTabindexCheckedAndDeleteBtn(
                unorderedList.children[useIndexToFocusItemForDelBtnAlgorithm]
              );
              applyFocusChangeTabindexSingleTarget(
                unorderedList.children[useIndexToFocusItemForDelBtnAlgorithm]
              );
              unorderedList.children[
                useIndexToFocusItemForDelBtnAlgorithm
              ].focus();
            }
          }
        } else {
          // active array is empty create and append items in allview array
          // focus first item
          /**
           * check if cachedObj.allView array length is == 0
           * **/
          if (cachedData.arraysOfDifferentViews.allViewArray.length > 0) {
            const currViewBtnActive = findCurrentViewBtn(
              "button[data-currentView]"
            );
            if (cachedData.arraysOfDifferentViews.allViewArray.length == 0) {
              unorderedList.replaceChildren();
              currViewBtnActive.removeAttribute("data-currentView");
              currViewBtnActive.previousElementSibling.removeAttribute(
                "data-currentView"
              );
            } else {
              appendAllViewElementsAndChangeToAllView(
                cachedData.arraysOfDifferentViews.allViewArray,
                assignAttrToArrayAndCreateListitem,
                removeCurrentListitemsAppendFragmentElement,
                currViewBtnActive,
                currViewBtnActive.previousElementSibling,
                unorderedList
              );
              /**
               * assign value "0" to tabindex of first element of allview array
               * **/
              singleTargetChangeTabindexCheckedAndDeleteBtn(
                unorderedList.children[0]
              );
              applyFocusChangeTabindexSingleTarget(unorderedList.children[0]);
              unorderedList.children[0].focus();
            }
          } else {
            unorderedList.replaceChildren();
            document
              .querySelector("views-container")
              .getAttribute("data-unorderedhasitems") != "false"
              ? addOrRemoveTopBorderToViewsContainer("false")
              : null;
          }
        }

        break;
      case "Completed":
        // append todo items in completed view array to unorderlist
        if (cachedData.arraysOfDifferentViews.completedViewArray.length >= 1) {
          // change attrs
          // create li elements, remove unorderlist children, append elements
          const deleteBtnCompletedView = assignAttrToArrayAndCreateListitem(
            cachedData.arraysOfDifferentViews.completedViewArray,
            updateAttrForTodoItemCheckedAndDeleteBtn,
            createChildrenForUnorderedList
          );
          removeCurrentListitemsAppendFragmentElement(
            unorderedList,
            deleteBtnCompletedView
          );
          // focus element using reference index of the clicked delete btn todo item
          if (tabindexOfTodoItem === "0") {
            // use arrayIndex
            cachedData.draggedItemSelected = false;
            const firstItemCompletedView = unorderedList.children[0];
            // arrayIndex == unorderedList.childElementCount
            //   ? applyFocusToSelectedTodoWhenCheckedDeleteBtnOrListitemIsClicked(
            //       firstItemCompletedView
            //     )
            //   : applyFocusToSelectedTodoWhenCheckedDeleteBtnOrListitemIsClicked(
            //       arrayIndex
            //     );
            // use if statement more readable
            if (arrayIndex == unorderedList.childElementCount) {
              singleTargetChangeTabindexCheckedAndDeleteBtn(
                unorderedList.children[firstItemCompletedView]
              );
              applyFocusChangeTabindexSingleTarget(
                unorderedList.children[firstItemCompletedView]
              );
              unorderedList.children[firstItemCompletedView].focus();
            } else {
              singleTargetChangeTabindexCheckedAndDeleteBtn(
                unorderedList.children[arrayIndex]
              );
              applyFocusChangeTabindexSingleTarget(
                unorderedList.children[arrayIndex]
              );
              unorderedList.children[arrayIndex].focus();
            }
          } else {
            // find todo item with tabindex == "0"
            // const [todoItemTabindexZero] = findElementWithTabindexZero(
            //   unorderedList.children
            // );
            // todoItemTabindexZero.focus();
            /**
             * using different algorithm
             * **/
            /**
             * we will use useIndexToFocusItemForDelBtnAlgorithm and arrayIndex
             * arrayIndex is the index of the todo listitem the user clicked checked btn
             * useIndexToFocusItemForDelBtnAlgorithm is the reference index of the todo item that has tabindex = "0" / focus todo
             * if arrayindex is less than useIndexToFocusItemForDelBtnAlgorithm we will subtract one from useIndexToFocusItemForDelBtnAlgorithm
             * use that index to focus the current todo listitem after we create todo listitem and append listitem to unorderlist
             * if arrayindex is greater than > useIndexToFocusItemForDelBtnAlgorithm just use useIndexToFocusItemForDelBtnAlgorithm to assign tabindex = "0" to that element
             * when arrayIndex and useIndexToFocusItemForDelBtnAlgorithm equal to each other the if statement of this else statement will handle that situation
             * **/
            if (arrayIndex < useIndexToFocusItemForDelBtnAlgorithm) {
              singleTargetChangeTabindexCheckedAndDeleteBtn(
                unorderedList.children[
                  useIndexToFocusItemForDelBtnAlgorithm - 1
                ]
              );
              applyFocusChangeTabindexSingleTarget(
                unorderedList.children[
                  useIndexToFocusItemForDelBtnAlgorithm - 1
                ]
              );
              unorderedList.children[
                useIndexToFocusItemForDelBtnAlgorithm - 1
              ].focus();
            } else {
              singleTargetChangeTabindexCheckedAndDeleteBtn(
                unorderedList.children[useIndexToFocusItemForDelBtnAlgorithm]
              );
              applyFocusChangeTabindexSingleTarget(
                unorderedList.children[useIndexToFocusItemForDelBtnAlgorithm]
              );
              unorderedList.children[
                useIndexToFocusItemForDelBtnAlgorithm
              ].focus();
            }
          }
        } else {
          // completed array is empty create and append items in allview array
          // focus first item
          /**
           * check if cachedObj.allView array length is == 0
           * **/
          const currViewBtnCompleted = findCurrentViewBtn(
            "button[data-currentView]"
          );
          if (cachedData.arraysOfDifferentViews.allViewArray.length == 0) {
            unorderedList.replaceChildren();
            currViewBtnCompleted.removeAttribute("data-currentView");
            currViewBtnCompleted.previousElementSibling.previousElementSibling.removeAttribute(
              "data-currentView"
            );
            document
              .querySelector("views-container")
              .getAttribute("data-unorderedhasitems") != "false"
              ? addOrRemoveTopBorderToViewsContainer("false")
              : null;
          } else {
            appendAllViewElementsAndChangeToAllView(
              cachedData.arraysOfDifferentViews.allViewArray,
              assignAttrToArrayAndCreateListitem,
              removeCurrentListitemsAppendFragmentElement,
              currViewBtnCompleted,
              currViewBtnCompleted.previousElementSibling,
              unorderedList
            );
            /**
             * assign value "0" to tabindex of first element of allview array
             * **/
            singleTargetChangeTabindexCheckedAndDeleteBtn(
              unorderedList.children[0]
            );
            applyFocusChangeTabindexSingleTarget(unorderedList.children[0]);
            unorderedList.children[0].focus();
          }
        }
        break;
    }
    console.log(event.target.parentElement.parentElement);
    console.log("delete");
  }

  /**
   * views and clear btns
   * const arrayOfFunc = [];
   * **/

  // All view btn

  function allViewBtnClicked(event) {
    /**
     * get index of todo with tabindex = "0";
     * +1 to index for all and active view algorithm
     * for completed view index of todo item with tabindex = "0" will not change
     * we want a reference to the element that had focus/tabindex = "0" by getting the index
     * of that element before we change attr,remove listitems, and append newly created listitem
     * **/
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
    /**
     * we can check if an element is drag selected in ternary operator below
     * because if either all,active or completed view btn is clicked and it does not have
     * data-currentView attr, it will be it is not the current view
     * **/
    /**
     * algorithm to reset cached.draggedItemSelected
     * **/
    const valueOfDraggedItemSelectedBoolean = cachedData.draggedItemSelected;
    // !checkForCurrentViewAttrOfElement
    //   ? (event.target.setAttribute("data-currentView", ""),
    //     // if we get here it means we are switching views
    //     // check if cached.draggedItemSelected = true
    //     // if it is assign boolean false
    //     valueOfDraggedItemSelectedBoolean
    //       ? (cachedData.draggedItemSelected = false)
    //       : null)
    //   : null;
    // if statement might be more readable
    if (!checkForCurrentViewAttrOfElement) {
      // if we get here it means we are switching views
      // check if cached.draggedItemSelected = true
      // if it is assign boolean false
      event.target.setAttribute("data-currentView", "");
      if (valueOfDraggedItemSelectedBoolean) {
        cachedData.draggedItemSelected = false;
      }
      /**
       * algorithm resetting cached.draggedItemSelected is false will be for when user
       * has a todo as a draggable element and click all, active or complete view btn
       * with mouse
       * **/

      /**
       * run func to create todo element using allView array in cachedObj
       * **/
      // when we add items to list in our keyDownEventForTodoInput func
      // allviewindex and original allviewindex of active and completed items
      // will be in the array in cachedObj
      // for our all,active,completed view btn algorithm
      // we will assign the proper attrs
      // create elements, remove ul children, append element
      /**
       * append items in array based on length of array
       * run this algorithm in this if statement if (!checkForCurrentViewAttrOfElement) {}
       * we only want to run algorithm once when we switch to all view going from active or completed
       * the way we had it which was outside of this if statement if (!checkForCurrentViewAttrOfElement) {}
       * algorithm will run every time we clicked allview btn
       * **/
      if (cachedData.arraysOfDifferentViews.allViewArray.length == 0) {
        // remove items
        unorderedList.replaceChildren();
        // remove top border on views container
        document
          .querySelector("views-container")
          .getAttribute("data-unorderedhasitems") != "false"
          ? addOrRemoveTopBorderToViewsContainer("false")
          : null;
      } else {
        // we will assign the proper attrs
        // create elements, remove ul children, append element
        const allViewArray = assignAttrToArrayAndCreateListitem(
          cachedData.arraysOfDifferentViews.activeViewArray,
          updateAttrForTodoItemCheckedAndDeleteBtn,
          createChildrenForUnorderedList
        );
        removeCurrentListitemsAppendFragmentElement(
          unorderedList,
          allViewArray
        );
        singleTargetChangeTabindexCheckedAndDeleteBtn(
          unorderedList.children[0]
        );
        applyFocusChangeTabindexSingleTarget(unorderedList.children[0]);

        /**
         * our thought process of why we are choosing not to focus element at index position of 0
         * for keyboard user if they are on any of the btns that control the current view
         * we want them to have the option of not having to tab back to the view btns after they changed the current view
         * this way keyboard users can decide on the view they want then use shift tab to focus the first item of that view
         * **/
      }
    }
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
    // without the conditional check we will always assign string value "All" to cachedData.currentView
    // every time user click on "All" view btn
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
     * get index of todo with tabindex = "0";
     * +1 to index for all and active view algorithm
     * for completed view index of todo item with tabindex = "0" will not change
     * we want a reference to the element that had focus/tabindex = "0" by getting the index
     * of that element before we change attr,remove listitems, and append newly created listitem
     * **/
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
    /**
     * we can check if an element is drag selected in ternary operator below
     * because if either all,active or completed view btn is clicked and it does not have
     * data-currentView attr, it will be it is not the current view
     * **/
    /**
     * algorithm to reset cached.draggedItemSelected
     * **/
    const valueOfDraggedItemSelectedBoolean = cachedData.draggedItemSelected;
    // !checkForCurrentViewAttrOfElement
    //   ? (event.target.setAttribute("data-currentView", ""),
    //     // if we get here it means we are switching views
    //     // check if cached.draggedItemSelected = true
    //     // if it is assign boolean false
    //     valueOfDraggedItemSelectedBoolean
    //       ? (cachedData.draggedItemSelected = false)
    //       : null)
    //   : null;
    // if statement might be more readable
    if (!checkForCurrentViewAttrOfElement) {
      // if we get here it means we are switching views
      // check if cached.draggedItemSelected = true
      // if it is assign boolean false
      event.target.setAttribute("data-currentView", "");
      if (valueOfDraggedItemSelectedBoolean) {
        cachedData.draggedItemSelected = false;
      }
      /**
       * run func to create todo element using activeView array in cachedObj
       * call/execute func that will update attr of todo listitem grabDragIndex
       * checked btn aria-labelledby
       * delete btn aria-labelledby and id
       * **/
      /**
       * run func to create todo element using allView array in cachedObj
       * **/
      // when we add items to list in our keyDownEventForTodoInput func
      // allviewindex and original allviewindex of active and completed items
      // will be in the array in cachedObj
      // for our all,active,completed view btn algorithm
      // we will assign the proper attrs
      // create elements, remove ul children, append element
      /**
       * append items in array based on length of array
       * run this algorithm in this if statement if (!checkForCurrentViewAttrOfElement) {}
       * we only want to run algorithm once when we switch to all view going from active or completed
       * the way we had it which was outside of this if statement if (!checkForCurrentViewAttrOfElement) {}
       * algorithm will run every time we clicked allview btn
       * **/
      if (cachedData.arraysOfDifferentViews.activeViewArray.length == 0) {
        // remove items
        unorderedList.replaceChildren();
        // remove top border on views container
        document
          .querySelector("views-container")
          .getAttribute("data-unorderedhasitems") != "false"
          ? addOrRemoveTopBorderToViewsContainer("false")
          : null;
      } else {
        // we will assign the proper attrs
        // create elements, remove ul children, append element
        const activeViewBtnArray = assignAttrToArrayAndCreateListitem(
          cachedData.arraysOfDifferentViews.activeViewArray,
          updateAttrForTodoItemCheckedAndDeleteBtn,
          createChildrenForUnorderedList
        );

        removeCurrentListitemsAppendFragmentElement(
          unorderedList,
          activeViewBtnArray
        );
        singleTargetChangeTabindexCheckedAndDeleteBtn(
          unorderedList.children[0]
        );
        applyFocusChangeTabindexSingleTarget(unorderedList.children[0]);
        /**
         * our thought process of why we are choosing not to focus element at index position of 0
         * for keyboard user if they are on any of the btns that control the current view
         * we want them to have the option of not having to tab back to the view btns after they changed the current view
         * this way keyboard users can decide on the view they want then use shift tab to focus the first item of that view
         * **/
      }
    }

    switch (cachedData.currentView) {
      case "All":
        event.target.previousElementSibling.removeAttribute("data-currentView");
        break;
      case "Completed":
        event.target.nextElementSibling.removeAttribute("data-currentView");
        break;
    }
    // without the conditional check we will always assign string value "Active" to cachedData.currentView
    // every time user click on "Active" view btn
    cachedData.currentView != "Active"
      ? (cachedData.currentView = "Active")
      : null;
  }

  // Completed view btn

  function completedViewBtnClicked(event) {
    /**
     * get index of todo with tabindex = "0";
     * +1 to index for all and active view algorithm
     * for completed view index of todo item with tabindex = "0" will not change
     * we want a reference to the element that had focus/tabindex = "0" by getting the index
     * of that element before we change attr,remove listitems, and append newly created listitem
     * **/
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
    /**
     * we can check if an element is drag selected in ternary operator below
     * because if either all,active or completed view btn is clicked and it does not have
     * data-currentView attr, it will be it is not the current view
     * **/
    /**
     * algorithm to reset cached.draggedItemSelected
     * **/
    const valueOfDraggedItemSelectedBoolean = cachedData.draggedItemSelected;
    // !checkForCurrentViewAttrOfElement
    //   ? (event.target.setAttribute("data-currentView", ""),
    //     // if we get here it means we are switching views
    //     // check if cached.draggedItemSelected = true
    //     // if it is assign boolean false
    //     valueOfDraggedItemSelectedBoolean
    //       ? (cachedData.draggedItemSelected = false)
    //       : null)
    //   : null;
    // if statement might be more readable
    if (!checkForCurrentViewAttrOfElement) {
      // if we get here it means we are switching views
      // check if cached.draggedItemSelected = true
      // if it is assign boolean false
      event.target.setAttribute("data-currentView", "");
      if (valueOfDraggedItemSelectedBoolean) {
        cachedData.draggedItemSelected = false;
      }
      /**
       * run func to create todo element using activeView array in cachedObj
       * call/execute func that will update attr of todo listitem grabDragIndex
       * checked btn aria-labelledby
       * delete btn aria-labelledby and id
       * **/
      /**
       * run func to create todo element using allView array in cachedObj
       * **/
      // when we add items to list in our keyDownEventForTodoInput func
      // allviewindex and original allviewindex of active and completed items
      // will be in the array in cachedObj
      // for our all,active,completed view btn algorithm
      // we will assign the proper attrs
      // create elements, remove ul children, append element
      /**
       * append items in array based on length of array
       * run this algorithm in this if statement if (!checkForCurrentViewAttrOfElement) {}
       * we only want to run algorithm once when we switch to all view going from active or completed
       * the way we had it which was outside of this if statement if (!checkForCurrentViewAttrOfElement) {}
       * algorithm will run every time we clicked allview btn
       * **/
      if (cachedData.arraysOfDifferentViews.completedViewArray.length == 0) {
        // remove items
        unorderedList.replaceChildren();
        // remove top border on views container
        document
          .querySelector("views-container")
          .getAttribute("data-unorderedhasitems") != "false"
          ? addOrRemoveTopBorderToViewsContainer("false")
          : null;
      } else {
        // we will assign the proper attrs
        // create elements, remove ul children, append element
        const completedViewBtnArray = assignAttrToArrayAndCreateListitem(
          cachedData.arraysOfDifferentViews.completedViewArray,
          updateAttrForTodoItemCheckedAndDeleteBtn,
          createChildrenForUnorderedList
        );
        removeCurrentListitemsAppendFragmentElement(
          unorderedList,
          completedViewBtnArray
        );
        singleTargetChangeTabindexCheckedAndDeleteBtn(
          unorderedList.children[0]
        );
        applyFocusChangeTabindexSingleTarget(unorderedList.children[0]);
        /**
         * our thought process of why we are choosing not to focus element at index position of 0
         * for keyboard user if they are on any of the btns that control the current view
         * we want them to have the option of not having to tab back to the view btns after they changed the current view
         * this way keyboard users can decide on the view they want then use shift tab to focus the first item of that view
         * **/
      }
    }

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
    // without the conditional check we will always assign string value "Completed" to cachedData.currentView
    // every time user click on "Completed" view btn
    cachedData.currentView != "Completed"
      ? (cachedData.currentView = "Completed")
      : null;
  }

  // clear completed

  function clearCompletedBtnClicked(event) {
    /**
     * get index of todo with tabindex = "0";
     * +1 to index for all and active view algorithm
     * for completed view index of todo item with tabindex = "0" will not change
     * we want a reference to the element that had focus/tabindex = "0" by getting the index
     * of that element before we change attr,remove listitems, and append newly created listitem
     * **/
    // func will effect all and completed views array
    // if user is on all view and all todo items has todoCompleted true
    // user click this btn assign length = 0 to allView array and complete view array
    // call ul.replaceChildren to remove all li elements
    // run same algorithm when user is on completed view. assign "false" to data-unorderedhasitems
    // of element with class views-container
    // run switch algorithm of allViewBtnClicked
    /** user is eiter on all or active view **/
    // if there are items in the active array, filter out the todoCompleted "true" for all view
    // assign length = 0 to completed array in cachedObj
    /** user is on completed view **/
    // if there are items in the active array, assign length = 0 to completed array in cachedObj
    // call ul.replaceChildren() to remove li elements
    /**
     * we will want to update the allview index of each item in all view array
     * filter out active todo items. todocompleted false
     * get allview index of active items update allview index of items in originalElementOrderInAllViewArray active
     * **/
    // index of element with tabindex = "0"
    // if we are updating tabindex in our allview array we would be working with allview array
    // if not we will work with unorderedlist children
    /**
     * we can use indexOfElementTabindexIsZero because this is based on the length of unorderlist.children in all,active and completed views
     * **/
    const indexOfElementTabindexIsZero = [...unorderedList.children].reduce(
      function findTabindexZero(buildingUp, currentValue, index) {
        const elementTabindex = Number(currentValue.getAttribute("tabindex"));
        if (elementTabindex == 0) {
          buildingUp = index;
        }
        return buildingUp;
      },
      0
    );
    /**
     * in switch statement for "Active" view we will use indexOfElementTabindexIsZero to apply tabindex = "0" and other attrs
     * to element at indexOfElementTabindexIsZero
     * **/
    // find which todo item has tabindex = "0"
    // if the todo item that has tabindex = "0" is completed
    // find next active todo element with tabindex = "-1"
    // using for loop
    // get length of allview array in cachedobj
    // algorithm below is for "All" currentView of switch() statement

    const elementWithTabindexZero =
      unorderedList.children[indexOfElementTabindexIsZero];

    const elementTodoStatus =
      elementWithTabindexZero.getAttribute("data-todoCompleted");
    /**
     * we want to find the next item that is not completed when the current todo item that has tabindex = "0"
     * is completed
     * **/
    // const indexOfTodoNotCompleted = usingForLoopToFindIndexOfTodoNotCompleted(
    //   indexOfElementTabindexIsZero,
    //   unorderedList.children
    // );

    // when elementTodoStatus == "true" run usingForLoopToFindIndexOfTodoNotCompleted(
    //   indexOfElementTabindexIsZero,
    //   unorderedList.children
    // );
    /**
     * if elementTodoStatus is "true" it means the todo item is completed
     * when that is the case we want to look for the next todo item in unorderedlist.children
     * that todocompleted value is "false".
     * we start looking for that todo item at indexOfElementTabindexIsZero because this element will have its todocompleted attr value set to "true"
     **/

    /**
     * when elementTodoStatus is "false" we won't run usingForLoopToFindIndexOfTodoNotCompleted func
     * which means we can run a func that will return an array of active todos after running our conditional checks
     * for if elementTodoStatus is "true"
     * **/

    const indexOfTodoNotCompleted =
      elementTodoStatus == "true"
        ? usingForLoopToFindIndexOfTodoNotCompleted(
            indexOfElementTabindexIsZero,
            unorderedList.children
          )
        : null;

    /**
     * when above algorithm for variable indexOfTodoNotCompleted is null it means the element at indexOfElementTabindexIsZero
     * todocompleted value is "false" if that is the case we want tabindex "0" to stay on that element/todo item
     * we can assign indexOfElementTabindexIsZero to indexOfTodoNotCompleted and use indexOfTodoNotCompleted in our switch statement for "Active" view
     * to apply tabindex = "0" to the element/todo at indexOfTodoNotCompleted
     * or assign null to indexOfTodoNotCompleted if elementTodoStatus is "false" just use indexOfElementTabindexIsZero in our switch statement for "Active" view
     * to apply tabindex = "0" to the element/todo at indexOfTodoNotCompleted
     * **/

    /**
     * when indexOfTodoNotCompleted value is not null it means the element at indexOfElementTabindexIsZero todocomplete value is "true"
     * when want to assign tabindex = "0" to the element at the index that will be a return value from calling usingForLoopToFindIndexOfTodoNotCompleted
     * our reason is we will run an algorithm that will return an array of the current active todos which means the todo item that is completed
     * will not be a part of that array and only one todo item will have tabindex = "0" once we run a func that will return an array of active todos
     * **/

    /**
     * for allview algorithm we will look for the index of the todo item that has tabindex = "0" once we run a func that will return an array
     * of "Active" todo items, its todocompleted value will be "false"
     * **/

    const elementOfTodoNotCompleted = indexOfTodoNotCompleted
      ? unorderedList.children[indexOfTodoNotCompleted]
      : null;

    /**
     * we only assign tabidnex = "0" to elementOfTodoNotCompleted when indexOfTodoNotCompleted and elementOfTodoNotCompleted are truthy
     * **/

    /**
     * when indexOfTodoNotCompleted is falsy it will make elementOfTodoNotCompleted falsy which will get our algorithm to the null part of
     * the ternary operator below
     * which means the element with tabindex = "0" will be an active todo.
     * run our func to return an array of active todo items
     * **/

    elementOfTodoNotCompleted
      ? elementOfTodoNotCompleted.setAttribute("tabindex", "0")
      : null;

    const arrayOfActiveTodoItems = filterOutActiveTodoItems(
      unorderedList.children
    );

    // find index based on length of arrayOfActiveTodoItems of the todo item with tabindex = "0"
    // assign index to variable use it as a reference in all view switch statement algorithm

    const indexToUseForAllViewSwitchStatmentAlgorithm =
      getIndexOfElementWithTabindexZero(arrayOfActiveTodoItems);

    /**
     * using different algorithm
     * **/

    // if (elementTodoStatus == "true") {
    //   // getting here means the todo item with tabindex = "0" is completed
    //   // which means the element will be filtered out of allview array
    //   // assign tabindex = "0" to the first todo item that is still active
    //   // starting from the element that had tabindex = "0" last
    //   // which will be a todo listitem that is marked as completed
    //   unorderedList.children[indexOfTodoNotCompleted].attributes[
    //     "tabindex"
    //   ].value = "0";
    // }

    /**
     * either tabindex = "0" is on an element that is completed or not completed
     * after we filter out the completed todos we will look for the todo item with tabindex = "0"
     * ***** *****
     * we will use the arrayIndex as a reference to which todo item we will apply tabindex = "0"
     * once we create new listitems and append them to unorderlist because the array length after we filter out the completed todos
     * will be the same length as the allview array in our cachedObj before we run func to assign allview index and other attrs based on the array length
     * ***** better to make focus/tabindex = "0" algorithm for allview, active and completed separately
     * reason is we dont have user to lose focus if the current focus item is still active
     * ***** one approach *****
     * have a reference to the index of the todo item that has tabindex = "0"
     * **/
    // or we could assign the first element of allview array with tabindex = "0"
    // cachedData.arraysOfDifferentViews.allViewArray[
    //   0
    // ].attributes["tabindex"].value = "0";
    // assign tabindex zero to element in allview array at indexOfTodoNotCompleted
    /** 
 * // active todo
    cachedData.arraysOfDifferentViews.activeViewArray =
      filterOutActiveTodoItems(copiedAllViewArray);
    // completed todos

    cachedData.arraysOfDifferentViews.completedViewArray =
      filterOutCompletedTodoItems(copiedAllViewArray);
 * **/
    /**
     * filter out active todos from unorderedlist
     * **/
    /**
     * we can mutate the allview array in cachedobj
     * **/
    // once we clear the completed todos, both allview array and active array will have the same items and length
    // all is left will be active todos item
    // cachedData.arraysOfDifferentViews.activeViewArray =
    //   filterOutActiveTodoItems(copiedAllViewArray);
    // if filterOutActiveTodoItems(copiedAllViewArray) returns an empty array
    // all the todos are completed or its empty
    // check length of cachedData.arraysOfDifferentViews.activeViewArray
    // if length is 0 make allview, active, and completed array in cachedObj 0
    if (arrayOfActiveTodoItems.length == 0) {
      cachedData.arraysOfDifferentViews.allViewArray.length = 0;
      cachedData.arraysOfDifferentViews.activeViewArray.length = 0;
      cachedData.arraysOfDifferentViews.completedViewArray.length = 0;
    } else {
      // update items in active view array in cachedObj using assignAllViewIndexElementsInAllViewArr
      // since both all view and active view will be the same length, same item
      // we can work with active view array first then assign a copy of active view array to allview array
      // this way we will eliminate one step
      /**
       * we will run func to assign tabindex to listitem at indexToUseForAllViewSwitchStatmentAlgorithm for all view
       * and indexOfElementTabindexIsZero for active view
       * **/
      arrayOfActiveTodoItems[
        indexToUseForAllViewSwitchStatmentAlgorithm
      ].setAttribute("tabIndex", "-1");

      cachedData.arraysOfDifferentViews.activeViewArray = [
        ...arrayOfActiveTodoItems,
      ];
      assignAllViewIndexElementsInAllViewArr(
        cachedData.arraysOfDifferentViews.activeViewArray
      );
      // update original allview index of active array in cachedObj
      originalAllViewIndexForElementsInActiveOrCompletedArray(
        cachedData.arraysOfDifferentViews.activeViewArray,
        "activeView"
      );
      // copy the array of active todo to allview array in cachedObj
      cachedData.arraysOfDifferentViews.allViewArray = [
        ...cachedData.arraysOfDifferentViews.activeViewArray,
      ];
      /**
       * we have the reference to which todo item had tabindex = "0" / focus
       * outside of this if statement we could set the todo item at indexToUseForAllViewSwitchStatmentAlgorithm
       * in allview array then run singleTargetChangeTabindexCheckedAndDeleteBtn(
          unorderedList.children[indexToUseForAllViewSwitchStatmentAlgorithm]
        );
        applyFocusChangeTabindexSingleTarget(
          unorderedList.children[indexToUseForAllViewSwitchStatmentAlgorithm]
        );
        in the "All" view of the switch statement
       * **/
      // empty completed array in cachedobj
      cachedData.arraysOfDifferentViews.completedViewArray.length = 0;
      /**
       * going a different direction/algorithm
       * **/
      // allview array items will have the correct allview index
      // with a todo item that has tabindex = "0"
      // completed array will be empty
      // in switch for "Active" view we will focus first item of that array
      // find element in active array with tabindex = "0"
      // assign value of tabindex = "-1" to that element
      // const [elementInActiveArrayWithTabindexZero] =
      //   findElementWithTabindexZero(
      //     cachedData.arraysOfDifferentViews.activeViewArray
      //   );
      // elementInActiveArrayWithTabindexZero.setAttribute("tabindex", "-1");
      // // assign value of tabindex = "0" to first item in active array
      // cachedData.arraysOfDifferentViews.activeViewArray[0].setAttribute(
      //   "tabindex",
      //   "0"
      // );
    }
    //
    switch (cachedData.currentView) {
      case "All":
        if (cachedData.arraysOfDifferentViews.allViewArray.length == 0) {
          unorderedList.replaceChildren();
          addOrRemoveTopBorderToViewsContainer("false");
        } else {
          const allViewOfClearBtnFunc = assignAttrToArrayAndCreateListitem(
            cachedData.arraysOfDifferentViews.allViewArray,
            updateAttrForTodoItemCheckedAndDeleteBtn,
            createChildrenForUnorderedList
          );
          // remove current listitems of ul and append listitems in fragment
          removeCurrentListitemsAppendFragmentElement(
            unorderedList,
            allViewOfClearBtnFunc
          );

          singleTargetChangeTabindexCheckedAndDeleteBtn(
            unorderedList.children[indexToUseForAllViewSwitchStatmentAlgorithm]
          );

          applyFocusChangeTabindexSingleTarget(
            unorderedList.children[indexToUseForAllViewSwitchStatmentAlgorithm]
          );
        }
        break;
      case "Active":
        if (cachedData.arraysOfDifferentViews.activeViewArray.length == 0) {
          unorderedList.replaceChildren();
          addOrRemoveTopBorderToViewsContainer("false");
        } else {
          dependingOnViewCreateAndAppendListitems(
            cachedData.arraysOfDifferentViews.activeViewArray,
            unorderedList,
            document.querySelector("views-container"),
            assignAttrToArrayAndCreateListitem,
            removeCurrentListitemsAppendFragmentElement,
            addOrRemoveTopBorderToViewsContainer
          );

          singleTargetChangeTabindexCheckedAndDeleteBtn(
            unorderedList.children[indexOfElementTabindexIsZero]
          );

          applyFocusChangeTabindexSingleTarget(
            unorderedList.children[indexOfElementTabindexIsZero]
          );
        }
        break;
      case "Completed":
        // remove lisitems of unorderlist
        // assign "false" to data-unorderedhasitems
        // of element with class views-container to remove top border
        unorderedList.replaceChildren();
        addOrRemoveTopBorderToViewsContainer("false");
        break;
    }
    console.log("clear completed");
  }

  /**
   * return index of element that is not complete todocompleted = "false"
   * using for loop
   * **/

  function usingForLoopToFindIndexOfTodoNotCompleted(endingIndex, array) {
    const copiedArray = [...array];
    const length = copiedArray.length;
    for (
      let startIndex = endingIndex + 1;
      startIndex != endingIndex;
      startIndex++
    ) {
      const element = copiedArray[startIndex];
      const elementTodoStatus = element.getAttribute("data-todoCompleted");
      if (elementTodoStatus == "false") {
        return startingIndex;
      }
      if (startIndex == length) {
        startIndex = 0;
      }
    }
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
      /**
       * get index of todo with tabindex = "0";
       * +1 to index for all and active view algorithm
       * for completed view index of todo item with tabindex = "0" will not change
       * we want a reference to the element that had focus/tabindex = "0" by getting the index
       * of that element before we change attr,remove listitems, and append newly created listitem
       * **/
      const useIndexToFocusTodoItem = getIndexOfElementWithTabindexZero(
        unorderedList.children
      );
      // build allView array
      const buildingAllViewArray =
        buildAllViewArrayForTodoInputFunc(newTodoItem);
      /**
       * we want to work with a copied array of all view array when we filter out
       * completed todo and not completed todo
       * **/
      const copiedAllViewArray = [...buildingAllViewArray];
      // filter out completed and not completed todos
      const buildingActiveArray = filterOutActiveTodoItems(copiedAllViewArray);
      const buildingCompletedArray =
        filterOutCompletedTodoItems(copiedAllViewArray);
      // assign built arrays to array in cachedObj
      // active
      cachedData.arraysOfDifferentViews.activeViewArray = buildingActiveArray;
      // completed
      cachedData.arraysOfDifferentViews.completedViewArray =
        buildingCompletedArray;
      // assign tabindex '0' to first element in array;
      // active
      assignTabindexZeroToFirstElement(
        cachedData.arraysOfDifferentViews.activeViewArray
      );
      // completed
      assignTabindexZeroToFirstElement(
        cachedData.arraysOfDifferentViews.completedViewArray
      );
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
      /**
       * algorithm above will add new todo to allview array,update allview index of each item in allview array
       * filter out completed todos and not completed todos
       * save reference to original allview index of todos in active and completed
       * in our switch statement
       * our algorithm will create todo (li), assign proper attr to checked btn,delete btn, todo listitem
       * also we will focus the correct todo listitem based on current view
       * **/
      // run func based on currentView
      switch (cachedData.currentView) {
        /**
         * doesnt matter which view user is on
         * we will always work with allView,active and completed array
         * and active and completed allViewIndex array in cachedObj
         * **/
        case "All":
          /**
           * todo item we want to assign tabindex = "0" will be the todo item with tabindex = "0"
           * before we added item to allview array
           * we will get the index of item with tabindex = "0" then +1 to that index to
           * assign tabindex = "0" to the correct item
           * **/
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
          // we create todo listitems and append them to unorderlist
          // pass in unorderedlist.children to funcs we will use below
          // add 1 to useIndexToFocusTodoItem focus that element change tabindex of checked and delete btn of that todo listitem to "0"
          // if useIndexToFocusTodoItem is undefined or 0 focus first item
          if (useIndexToFocusTodoItem === 0 || !useIndexToFocusTodoItem) {
            singleTargetChangeTabindexCheckedAndDeleteBtn(
              unorderedList.children[0]
            );
            applyFocusChangeTabindexSingleTarget(unorderedList.children[0]);
          } else {
            singleTargetChangeTabindexCheckedAndDeleteBtn(
              unorderedList.children[useIndexToFocusTodoItem + 1]
            );
            applyFocusChangeTabindexSingleTarget(
              unorderedList.children[useIndexToFocusTodoItem + 1]
            );
          }
          // change value of data-unorderedhasitems on views-container to true
          addOrRemoveTopBorderToViewsContainer("true");
          // add one to items left text
          increaseOrDecreaseItemsLeftCounter("add");
          break;
        case "Active":
          /**
           * todo item we want to assign tabindex = "0" will be the todo item with tabindex = "0"
           * before we added item to allview array
           * we will get the index of item with tabindex = "0" then +1 to that index to
           * assign tabindex = "0" to the correct item
           * **/
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
          // we create todo listitems and append them to unorderlist
          // pass in unorderedlist.children to funcs we will use below
          // add 1 to useIndexToFocusTodoItem focus that element change tabindex of checked and delete btn of that todo listitem to "0"
          // if useIndexToFocusTodoItem is undefined or 0 focus first item
          if (useIndexToFocusTodoItem === 0 || !useIndexToFocusTodoItem) {
            singleTargetChangeTabindexCheckedAndDeleteBtn(
              unorderedList.children[0]
            );
            applyFocusChangeTabindexSingleTarget(unorderedList.children[0]);
          } else {
            singleTargetChangeTabindexCheckedAndDeleteBtn(
              unorderedList.children[useIndexToFocusTodoItem + 1]
            );
            applyFocusChangeTabindexSingleTarget(
              unorderedList.children[useIndexToFocusTodoItem + 1]
            );
          }
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
          // we create todo listitems and append them to unorderlist
          // pass in unorderedlist.children to funcs we will use below
          // useIndexToFocusTodoItem focus that element change tabindex of checked and delete btn of that todo listitem to "0"
          // if useIndexToFocusTodoItem is undefined or 0 focus first item
          if (useIndexToFocusTodoItem === 0 || !useIndexToFocusTodoItem) {
            singleTargetChangeTabindexCheckedAndDeleteBtn(
              unorderedList.children[0]
            );
            applyFocusChangeTabindexSingleTarget(unorderedList.children[0]);
          } else {
            singleTargetChangeTabindexCheckedAndDeleteBtn(
              unorderedList.children[useIndexToFocusTodoItem]
            );
            applyFocusChangeTabindexSingleTarget(
              unorderedList.children[useIndexToFocusTodoItem]
            );
          }
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
      const [firstAllViewItem] = copiedAllViewArr;
      /**
       * change first item in that array tabIndex to -1
       * since we want to handle the tabindex and focus of todo based on current view
       * we want every todo item add to list to have its tabindex = "-1"
       * firstAllViewItem.setAttribute("tabindex", "-1");
       * **/
      // assign tabindex="-1" to checked btn and delete btn to make them not focusable
      // checked btn
      /**
       * moving it to another func. we will change tabindex of checked and delete btn
       * when we change the tabindex of the listitem(its parent element)
       * after we created todo listitems and append them to unorderedlist
       * **/
      // firstAllViewItem.firstElementChild.children[0].firstElementChild.setAttribute(
      //   "tabindex",
      //   -1
      // );
      // // delete btn
      // firstAllViewItem.firstElementChild.children[2].setAttribute(
      //   "tabindex",
      //   -1
      // );
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
   * filter out todo for deletion
   * **/

  function filterOutTodoForDelection(array, listitemIndex) {
    return array.filter(function removeListitem(listitem, index) {
      const listitemAllViewIndex = Number(listitemIndex);
      return index !== listitemAllViewIndex;
    });
  }

  /**
   * assign tabindex = "0" to first element in array
   * **/

  function assignTabindexZeroToFirstElement(array) {
    array[0].attributes["tabindex"].value = "0";
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
    /**
     * let's assign tabindex = "0" to the todo listitem in the switch()statement
     * based on the current view
     * **/
    const todoItem = createElementForTodoItem("LI", {
      tabindex: "-1",
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
    // make checked btn not focusable at first
    const checkedBtn = createElementForTodoItem("BUTTON", {
      tabindex: "-1",
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
    // make delete btn not focusable at first
    const deleteBtn = createElementForTodoItem("BUTTON", {
      tabindex: "-1",
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
   * change data-dragselect to true or false
   * make this work with event.target and todo listitem
   * we will pass in the event.target or todo listitem
   * **/

  /*****
   * if we dont change or work with the tabindex of the todo items and its checked and delete btn
   * we dont have to change the previous todo listitem tabindex
   * we can just change the tabindex of the current clicked listitem or checked btn
   * also we always remove the current lisitem of the unorderlist
   * *****/

  function applyFocusToSelectedTodoWhenCheckedDeleteBtnOrListitemIsClicked(
    target,
    previousTarget
  ) {
    /**
     * at least one todo item will have tabindex = "0"
     * **/
    // assign the value of "true" to clicked todo item data-draggedSelected
    // assign value "false" to previous focus element
    // assign value '-1" to previous focus element
    // assign value "0" to clicked todo item
    // apply focus to clicked todo item
    /**
     * we want this func to work for checked and delete btn of todo item
     * **/
    // previousFocusedElement will be a listitem
    /** const clickedElementTagName = event.target.tagName;
     * (clickedElementTagName == "LI" || clickedElementTagName == "BUTTON")
     * work together code in () is for if statement
     * **/
    /**
     * making this func work with event.target and todo listitem
     const tabIndexOfTodoItemOfClickedCheckedBtnAndListitem = target
       .closest("li")
       .getAttribute("tabindex");
     * **/
    /**
     * conditional check below is for when user click on checked btn with a mouse
     * because for keyboard users when they have checked btn focused and hit enter or space key
     * the current todo item will be focused or if drag is selected is true will have larger
     * box-shadow around border
     * **/
    /**
     * tabIndexOfTodoItemOfClickedCheckedBtnAndListitem !== "0" && used in if statement
     * we could just check if the tabindex of todo item of checked btn clicked
     * does not equal !== "0" and check if there is a todo item that has tabindex = "0"
     const [previousFocusedElement] = [...target.closest("ul").children].filter(
       function findElementWithTabIndexZero(listitem) {
         const elementTabindex = listitem.getAttribute("tabindex");
         return elementTabindex === "0";
       }
     );
     * **/
    if (previousTarget) {
      /**
       * using event.target.closest("li"). when user click on checked btn or todo listitem
       * we will target the li ancestor element of clicked element
       * **/
      // we want this func to work when all listitem of unorderlist
      // has tabindex of "-1". which is the case when user click on checked btn
      // of todo item that has focus and drag selected value "true"
      /**
       * we will check if previousFocusedElement is undefined
       * which is the case when our filter method loop through unorderlist children
       * and find zero listitem with tabindex = "-1"
       * **/
      if (cachedData.draggedItemSelected) {
        // previousTarget will have tabindex "0" and data-draggedSelected = "true"
        previousTarget.setAttribute("data-draggedSelected", "false");
        target.closest("li").setAttribute("data-draggedSelected", "true");
      }
      // when user click on list item, we want to assign value "0" to that list item
      // and assign value of "-1" to the previous list item that had tabindex "0"
      previousTarget.setAttribute("tabindex", "-1");
      target.closest("li").setAttribute("tabindex", "0");
      target.closest("li").focus();
    } else {
      // when we get here user clicked on checked btn of todo item that has focus
      // or drag selected = "true"
      // drag selected should reset. we will just assign tabindex = "0" and focus to target passed in
      target.closest("li").setAttribute("tabindex", "0");
      target.closest("li").focus();
    }
  }

  /**
   * apply focus to single target
   * **/

  function applyFocusChangeTabindexSingleTarget(target) {
    if (cachedData.draggedItemSelected) {
      // previousTarget will have tabindex "0" and data-draggedSelected = "true"
      previousTarget.setAttribute("data-draggedSelected", "false");
      target.closest("li").setAttribute("data-draggedSelected", "true");
    }
    // when user click on list item, we want to assign value "0" to that list item
    // and assign value of "-1" to the previous list item that had tabindex "0"
    previousTarget.setAttribute("tabindex", "-1");
    target.closest("li").setAttribute("tabindex", "0");
    target.closest("li").focus();
  }

  /**
   * change tabindex of checked and delete btn of todo
   * **/

  function changeTabindexOfCheckedAndDeleteBtn(currentTarget, previousTarget) {
    // currentTarget or previousTarget will be the todo listitem
    if (previousTarget) {
      // we will change current and previous checked and delete btn tabindex
      previousTarget.firstElementChild.children[0].firstElementChild.attributes[
        "tabindex"
      ].value = "-1";
      // delete btn
      previousTarget.firstElementChild.children[2].attributes[
        "tabindex"
      ].value = "-1";
      // checked btn
      currentTarget.firstElementChild.children[0].firstElementChild.attributes[
        "tabindex"
      ].value = "0";
      // delete btn
      currentTarget.firstElementChild.children[2].attributes["tabindex"].value =
        "0";
    } else {
      // we will only change current target checked and delete btn
      // checked btn
      currentTarget.firstElementChild.children[0].firstElementChild.attributes[
        "tabindex"
      ].value = "0";
      // delete btn
      currentTarget.firstElementChild.children[2].attributes["tabindex"].value =
        "0";
    }
  }

  /**
   * single target change tabindex checked and delete
   * **/

  function singleTargetChangeTabindexCheckedAndDeleteBtn(target) {
    // checked btn
    currentTarget.firstElementChild.children[0].firstElementChild.attributes[
      "tabindex"
    ].value = "0";
    // delete btn
    currentTarget.firstElementChild.children[2].attributes["tabindex"].value =
      "0";
  }

  /**
   * find element with tabindex zero
   * **/

  function findElementWithTabindexZero(array) {
    const copiedArray = [...array];
    return copiedArray.children.filter(function findTabindexZero(listitem) {
      const tabindexOfTodo = listitem.getAttribute("tabindex");
      return tabindexOfTodo === "0";
    });
  }

  /**
   * get index of element with tabindex "0"
   * **/

  function getIndexOfElementWithTabindexZero(array) {
    const copiedArray = [...array];
    return copiedArray.reduce(function findElementIndex(
      buildingUp,
      currentValue,
      index
    ) {
      const elementTabindex = currentValue.getAttribute("tabindex");
      if (elementTabindex === "0") {
        buildingUp = index;
      }
      return buildingUp;
    },
    0);
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

  function changeTodoItemToCompleted(allViewArrayIndex) {
    // get todo Li element allViewIndex
    // const todoOfClickedCheckedBtnAllViewIndexInActiveView = Number(
    //   todoListItem.getAttribute("data-allViewIndex")
    // );
    // change attr to make it completed for that todo in the allView array
    // const matchingAllViewIndexItemInAllViewArray =
    //   cachedData.arraysOfDifferentViews.allViewArray[
    //     todoOfClickedCheckedBtnAllViewIndexInActiveView
    //   ];
    /**
     * another approach where we use a different func to get allViewArray index
     * of todo item that had its aria-checked attr change to true
     * **/

    const matchingAllViewIndexItemInAllViewArray =
      cachedData.arraysOfDifferentViews.allViewArray[allViewArrayIndex];

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

  function changeTodoItemToNotCompleted(allViewArrayIndex) {
    // get todo Li element allViewIndex
    // const todoOfClickedCheckedBtnAllViewIndexInActiveView = Number(
    //   todoListItem.getAttribute("data-allViewIndex")
    // );
    /**
     * another approach where we use a different func to get allViewArray index
     * of todo item that had its aria-checked attr change to false
     * **/
    // change attr to make it completed for that todo in the allView array
    const matchingAllViewIndexItemInAllViewArray =
      cachedData.arraysOfDifferentViews.allViewArray[allViewArrayIndex];
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
   * get allView index and current view array index of li
   * parent element of checked or delete btn user clicked on
   * **/

  function getAllViewAndCurrentArrayIndexOfTodoItem(listitem) {
    //target will be either checked or delete button
    // const todoListitemOfCheckedAndDeleteBtn = target.closest("li");
    // allview index
    const allViewIndex = listitem.getAttribute("data-allViewIndex");
    // current view array index
    const currentViewArrayIndex = listitem.getAttribute("data-grabDragIndex");
    // data-grabDragIndex will be based on the items in the all,active or completed array
    // in cachedObj
    return [allViewIndex, currentViewArrayIndex];
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
   * dependingOnViewCreateAndAppendListitems
   * **/

  function dependingOnViewCreateAndAppendListitems(
    array,
    listitemParent,
    viewsContainer,
    assignAttrFunc,
    removeListitemFunc,
    topBorderFunc
  ) {
    const currentViewArray = assignAttrFunc(
      array,
      updateAttrForTodoItemCheckedAndDeleteBtn,
      createChildrenForUnorderedList
    );
    removeListitemFunc(listitemParent, currentViewArray);
    if (viewsContainer.getAttribute("data-unorderedhasitems") == "false") {
      topBorderFunc("true");
    }
  }

  /**
   * appendAllViewElementsAndChangeToAllView
   * **/

  function appendAllViewElementsAndChangeToAllView(
    array,
    assignFunc,
    removeCurrentFunc,
    currentView,
    previousSibling,
    todoItemParent
  ) {
    const showAllView = assignFunc(
      array,
      updateAttrForTodoItemCheckedAndDeleteBtn,
      createChildrenForUnorderedList
    );
    removeCurrentFunc(todoItemParent, showAllView);
    currentView.removeAttribute("data-currentview");
    previousSibling.setAttribute("data-currentview", "");
    // assign "All" to cachedObj.currentView
    cachedData.currentView = "All";
    // focus first element of todo list
    todoItemParent.children[0].focus();
  }

  /**
   * find current view btn
   * **/

  function findCurrentViewBtn(element) {
    return document.querySelector(element);
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
