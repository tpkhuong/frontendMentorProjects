(function scopeOurVariables() {
  /**
   * ********
   * alert("use aria-activedescendant for 3d with HTML canvas or arrow keys");
   * ********
   * **/
  // reset todo input to empty on load
  document.querySelector(".todo-input-instructions-container input").value = "";
  // apply attr data-currentView
  applyDataCurrentViewAttrToBtn();
  // declare our selectors
  const {
    mainElement,
    unorderedList,
    toggleThemeBtn,
    checkedBtn,
    assistiveTextContainer,
  } = ourSelectors();
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
  /**
   * we have to add this event listen after we create this element in our createTodoItem algorithm
   * **/
  // checkedBtn.forEach(function addFocus(eachButton) {
  //   applyEventListener(eachButton, "focus", function buttonHasFocus(event) {
  //     // change attr on parent element of checked btn. div with attr we want to change
  //     document.activeElement == event.target
  //       ? (this.parentElement.attributes["user-focused-btn"].value = "true")
  //       : null;
  //   });
  //   applyEventListener(eachButton, "blur", function buttonIsNotFocus(event) {
  //     // change attr on parent element of checked btn. div with attr we want to change
  //     this.parentElement.attributes["user-focused-btn"].value = "false";
  //   });
  // });

  // add event listener helper

  function applyEventListener(element, listener, func, dragBoolean) {
    element.addEventListener(listener, func, dragBoolean);
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
    // switch (targetClass) {
    //   case "checked-btn":
    //     checkedBtnClicked(event);
    //     break;
    //   case "delete-btn":
    //     deleteBtnClicked(event);
    //     break;
    //   case "desktop-btn-all":
    //     allViewBtnClicked(event);
    //     break;
    //   case "desktop-btn-active":
    //     activeViewBtnClicked(event);
    //     break;
    //   case "desktop-btn-completed":
    //     completedViewBtnClicked(event);
    //     break;
    //   case "clear-btn":
    //     clearCompletedBtnClicked(event);
    //     break;
    // }
    // target li(todo listitem)
    // the event.target will be the div element with attr draggable="true"
    // its parent is the li todo item
    // if (event.target.parentElement.tagName == "LI") {
    //   todoListitemClicked(event);
    // }

    /**
     * another approach
     * the way we had it the if statement with this condition
     * event.target.parentElement.tagName == "LI" always ran
     * **/

    switch (true) {
      case targetClass == "checked-btn":
        checkedBtnClicked(event);
        break;
      case targetClass == "delete-btn":
        deleteBtnClicked(event);
        break;
      case targetClass == "desktop-btn-all":
        allViewBtnClicked(event);
        break;
      case targetClass == "desktop-btn-active":
        activeViewBtnClicked(event);
        break;
      case targetClass == "desktop-btn-completed":
        completedViewBtnClicked(event);
        break;
      case targetClass == "clear-btn":
        clearCompletedBtnClicked(event);
        break;
      case event.target.parentElement.tagName == "LI":
        todoListitemClicked(event);
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
   * checkbtn has focus
   * **/

  function checkedBtnHasFocus(event) {
    // change attr on parent element of checked btn. div with attr we want to change
    document.activeElement == event.target
      ? (this.parentElement.attributes["user-focused-btn"].value = "true")
      : null;
  }

  /**
   * checkbtn does not have focus
   * **/

  function checkedBtnIsNotFocus(event) {
    // change attr on parent element of checked btn. div with attr we want to change
    this.parentElement.attributes["user-focused-btn"].value = "false";
  }

  /**
   * click event helper
   * **/

  // todo list item

  function todoListitemClicked(event) {
    console.log(event.target);
    /**
     * get index of todo with tabindex = "0";
     * +1 to index for all and active view algorithm
     * for completed view index of todo item with tabindex = "0" will not change
     * **/

    /**
     * we want a reference to the element that had focus/tabindex = "0" by getting the index
     * of that element before we change attr,remove listitems, and append newly created listitem
     * **/

    /**
     * when user click on li we want to change that li todo item tabindex attr and the checked and delete btn of that
     * todo li tabindexat trs to "0"
     * **/

    // console.log(event.target.parentElement);

    const currentTodoWithTabinexZero = getIndexOfElementWithTabindexZero(
      unorderedList.children
    );

    const todoListitemParentOfEventTarget = event.target.parentElement;

    // console.log(
    //   unorderedList.children[currentTodoWithTabinexZero] ==
    //     event.target.parentElement
    // );

    if (currentTodoWithTabinexZero != null) {
      // when we get here it means there will be more than one todo item on the current view
      // we want to look for the todo item with tabindex = "0",
      // get its index in an array this case unorderedlist.children
      // check if the clicked todo item is the current todo item with tabindex = "0"
      // if they are the same do nothing
      // if the clicked todo item tabindex is not "0" change it
      // change the element at currentTodoWithTabinexZero of unorderedlist.children tabindex = "-1"
      // unorderedList.children[currentTodoWithTabinexZero] != todoListitemParentOfEventTarget
      //   ? (singleTargetChangeTabindexCheckedAndDeleteBtn(
      //     todoListitemParentOfEventTarget,
      //     "0"
      //   ), applyFocusChangeTabindexSingleTarget(
      //     todoListitemParentOfEventTarget,
      //     "0"
      //   ), (singleTargetChangeTabindexCheckedAndDeleteBtn(
      //     unorderedList.children[currentTodoWithTabinexZero],
      //     "-1"
      //   ), applyFocusChangeTabindexSingleTarget(
      //     unorderedList.children[currentTodoWithTabinexZero],
      //     "-1"
      //       ))) : null;
      // regular if statement
      if (
        unorderedList.children[currentTodoWithTabinexZero] !=
        todoListitemParentOfEventTarget
      ) {
        // change element clicked tabindex to "0"
        singleTargetChangeTabindexCheckedAndDeleteBtn(
          todoListitemParentOfEventTarget,
          "0"
        );
        applyFocusChangeTabindexSingleTarget(
          todoListitemParentOfEventTarget,
          "0"
        );

        // change current element with tabindex "0" to "-1"
        singleTargetChangeTabindexCheckedAndDeleteBtn(
          unorderedList.children[currentTodoWithTabinexZero],
          "-1"
        );
        applyFocusChangeTabindexSingleTarget(
          unorderedList.children[currentTodoWithTabinexZero],
          "-1"
        );
      }
      // change dragSelected to false for current element with dragSelected true
      // change dragSelected to true to clicked div with draggable true parent element that todo listitem
      keyboardAndMouseChangeDraggedClass(
        unorderedList.children[currentTodoWithTabinexZero],
        todoListitemParentOfEventTarget
      );
    } else {
      // when currentTodoWithTabinexZero is null we want to assign "0" to attr tabindex of
      // the li todo item that was clicked
      // which should be the event.target.parentElement
      singleTargetChangeTabindexCheckedAndDeleteBtn(
        todoListitemParentOfEventTarget,
        "0"
      );
      applyFocusChangeTabindexSingleTarget(
        todoListitemParentOfEventTarget,
        "0"
      );
    }
    console.log(cachedData);
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
    // event.target.parentElement.parentElement.parentElement.focus();
    // check if todo(Listitem) has "true" assigned to data-dragSelected
    // const todoListitemDragSelected =
    //   event.target.parentElement.parentElement.parentElement.getAttribute(
    //     "data-dragSelected"
    //   );
    // if (todoListitemDragSelected == "true") {
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
    /**
     * handling assigning tabindex to items in active and completed array in our switch statement
     * **/
    // assign tabindex of '0' to first item
    // active
    // assignTabindexZeroToFirstElement(
    //   cachedData.arraysOfDifferentViews.activeViewArray
    // );
    // // completed
    // assignTabindexZeroToFirstElement(
    //   cachedData.arraysOfDifferentViews.completedViewArray
    // );
    // save original order of allViewIndex for active and completed
    // active view
    cachedData.originalElementOrderInAllViewArray.activeViewOriginalOrder =
      originalAllViewIndexForElementsInActiveOrCompletedArray(
        cachedData.arraysOfDifferentViews.activeViewArray
      );
    // completed view
    cachedData.originalElementOrderInAllViewArray.completedViewOriginalOrder =
      originalAllViewIndexForElementsInActiveOrCompletedArray(
        cachedData.arraysOfDifferentViews.completedViewArray
      );
    /**
     * based on which view user is on
     * **/
    console.log(cachedData);
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
          .querySelector(".views-container")
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
        // singleTargetChangeTabindexCheckedAndDeleteBtn(
        //   unorderedList.children[arrayIndex],
        //   "0"
        // );
        // applyFocusChangeTabindexSingleTarget(
        //   unorderedList.children[arrayIndex],
        //   "0"
        // );
        /**
         * even through we are assign tabindex = "0" to the element in the array of unorderedlist.children
         * the items in unorderedlist.children are created using items in our cachedObj arrays
         * looks like our algorithm still hold a reference to those items in cachedObj array
         * when we make changes to items in unorderedlist.children it will effect that item in cachedObj array
         * **/

        if (indexOfELementWithTabindexZero != null) {
          if (
            unorderedList.children[indexOfELementWithTabindexZero] !=
            todoListitemOfClickedCheckedBtn
          ) {
            // change element clicked tabindex to "0"
            singleTargetChangeTabindexCheckedAndDeleteBtn(
              todoListitemOfClickedCheckedBtn,
              "0"
            );
            applyFocusChangeTabindexSingleTarget(
              todoListitemOfClickedCheckedBtn,
              "0"
            );

            // change current element with tabindex "0" to "-1"
            singleTargetChangeTabindexCheckedAndDeleteBtn(
              unorderedList.children[indexOfELementWithTabindexZero],
              "-1"
            );
            applyFocusChangeTabindexSingleTarget(
              unorderedList.children[indexOfELementWithTabindexZero],
              "-1"
            );
          }
          // assign correct value to drag selected attr
          keyboardAndMouseChangeDraggedClass(
            unorderedList.children[indexOfELementWithTabindexZero],
            todoListitemOfClickedCheckedBtn
          );
        } else {
          // when indexOfELementWithTabindexZero is null we want to assign "0" to attr tabindex of
          // the li todo item of the clicked checked btn
          // which should be the todoListitemOfClickedCheckedBtn
          singleTargetChangeTabindexCheckedAndDeleteBtn(
            todoListitemOfClickedCheckedBtn,
            "0"
          );
          applyFocusChangeTabindexSingleTarget(
            todoListitemOfClickedCheckedBtn,
            "0"
          );
        }

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
          //     .querySelector(".views-container")
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
            document.querySelector(".views-container"),
            assignAttrToArrayAndCreateListitem,
            removeCurrentListitemsAppendFragmentElement,
            addOrRemoveTopBorderToViewsContainer
          );
          // check the value of views container data-unorderedhasitems attr
          document
            .querySelector(".views-container")
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
            cachedData.dragItemSelected
              ? (cachedData.dragItemSelected = false)
              : null;
            // assign string "false" to attr dragged selected to the todo listitem of clicked checked btn
            todoListitemOfClickedCheckedBtn.setAttribute(
              "data-dragSelected",
              "false"
            );
            const firstTodoItemActiveView = unorderedList.children[0];
            // arrayIndex == unorderedList.childElementCount
            //   ? applyFocusToSelectedTodoWhenCheckedDeleteBtnOrListitemIsClicked(
            //       firstTodoItemActiveView
            //     )
            //   : applyFocusToSelectedTodoWhenCheckedDeleteBtnOrListitemIsClicked(
            //       unorderedList.children[arrayIndex]
            //   );
            // use if statement to make algorithm above more readable
            // assign tabindex = "-1" to listitem of the clicked checked btn

            singleTargetChangeTabindexCheckedAndDeleteBtn(
              todoListitemOfClickedCheckedBtn,
              "-1"
            );
            applyFocusChangeTabindexSingleTarget(
              todoListitemOfClickedCheckedBtn,
              "-1"
            );

            if (arrayIndex == unorderedList.childElementCount) {
              singleTargetChangeTabindexCheckedAndDeleteBtn(
                firstTodoItemActiveView,
                "0"
              );
              applyFocusChangeTabindexSingleTarget(
                firstTodoItemActiveView,
                "0"
              );
              firstTodoItemActiveView.focus();
            } else {
              singleTargetChangeTabindexCheckedAndDeleteBtn(
                unorderedList.children[arrayIndex],
                "0"
              );
              applyFocusChangeTabindexSingleTarget(
                unorderedList.children[arrayIndex],
                "0"
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
            // assign tabindex = "-1" to element at indexOfELementWithTabindexZero
            // singleTargetChangeTabindexCheckedAndDeleteBtn(
            //   unorderedList.children[indexOfELementWithTabindexZero],
            //   "-1"
            // );
            // applyFocusChangeTabindexSingleTarget(
            //   unorderedList.children[indexOfELementWithTabindexZero],
            //   "-1"
            // );
            if (arrayIndex < indexOfELementWithTabindexZero) {
              singleTargetChangeTabindexCheckedAndDeleteBtn(
                unorderedList.children[indexOfELementWithTabindexZero - 1],
                "0"
              );
              applyFocusChangeTabindexSingleTarget(
                unorderedList.children[indexOfELementWithTabindexZero - 1],
                "0"
              );

              cachedData.dragItemSelected
                ? unorderedList.children[
                    indexOfELementWithTabindexZero - 1
                  ].setAttribute("data-dragSelected", "true")
                : null;

              unorderedList.children[
                indexOfELementWithTabindexZero - 1
              ].focus();
            } else {
              singleTargetChangeTabindexCheckedAndDeleteBtn(
                unorderedList.children[indexOfELementWithTabindexZero],
                "0"
              );
              applyFocusChangeTabindexSingleTarget(
                unorderedList.children[indexOfELementWithTabindexZero],
                "0"
              );

              cachedData.dragItemSelected
                ? unorderedList.children[
                    indexOfELementWithTabindexZero
                  ].setAttribute("data-dragSelected", "true")
                : null;

              unorderedList.children[indexOfELementWithTabindexZero].focus();
            }
          }
        } else {
          /**
           * we dont have to work with cached.dragItemSelected or change
           * value of the attr dragSelected because when user click on the checked btn
           * of the last item in active array in active view
           * the algorithm that handle when user click on checked btn the attr of tabindex of
           * that todo item will be "0"
           * we handle drag selected etc in that algorithm
           * **/
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
          //     .querySelector(".views-container")
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
           * when user click on the checked btn of the last active item in the active view
           * we want to reset dragged selected to default
           * cached.dragItemSelected to false
           * **/
          /**
           * move algorithm above to func. we plan to use more than one
           * **/
          if (cachedData.arraysOfDifferentViews.allViewArray.length == 0) {
            // remove items
            unorderedList.replaceChildren();
            // check the value of views container data-unorderedhasitems attr
            document
              .querySelector(".views-container")
              .getAttribute("data-unorderedhasitems") != "false"
              ? addOrRemoveTopBorderToViewsContainer("false")
              : null;
          } else {
            const currentViewBtnActive = findCurrentViewBtn(
              "button[data-currentView]"
            );

            appendAllViewElementsAndChangeToAllView(
              cachedData.arraysOfDifferentViews.allViewArray,
              assignAttrToArrayAndCreateListitem,
              removeCurrentListitemsAppendFragmentElement,
              unorderedList
            );
            // current should be "active" we want to remove data-currentView
            currentViewBtnActive.removeAttribute("data-currentView");
            // apply data-currentView to "allview" btn
            currentViewBtnActive.previousElementSibling.setAttribute(
              "data-currentView",
              ""
            );
            // check the value of views container data-unorderedhasitems attr
            document
              .querySelector(".views-container")
              .getAttribute("data-unorderedhasitems") != "true"
              ? addOrRemoveTopBorderToViewsContainer("true")
              : null;
            // our algorithm above is focusing the first element of allview array
            // once we append the listitems we can run algorithm to focus listitem
            // focus first item in all view array
            // unorderedList.children[0].focus();
            singleTargetChangeTabindexCheckedAndDeleteBtn(
              unorderedList.children[0],
              "0"
            );
            applyFocusChangeTabindexSingleTarget(
              unorderedList.children[0],
              "0"
            );
            unorderedList.children[0].focus();
          }
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
          //     .querySelector(".views-container")
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
            document.querySelector(".views-container"),
            assignAttrToArrayAndCreateListitem,
            removeCurrentListitemsAppendFragmentElement,
            addOrRemoveTopBorderToViewsContainer
          );
          // check the value of views container data-unorderedhasitems attr
          document
            .querySelector(".views-container")
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
            cachedData.dragItemSelected
              ? (cachedData.dragItemSelected = false)
              : null;
            // assign string "false" to attr dragged selected to the todo listitem of clicked checked btn
            todoListitemOfClickedCheckedBtn.setAttribute(
              "data-dragSelected",
              "false"
            );
            const firstItemOfCompletedView = unorderedList.children[0];
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
                firstItemOfCompletedView,
                "0"
              );
              applyFocusChangeTabindexSingleTarget(
                firstItemOfCompletedView,
                "0"
              );
              firstItemOfCompletedView.focus();
            } else {
              singleTargetChangeTabindexCheckedAndDeleteBtn(
                unorderedList.children[arrayIndex],
                "0"
              );
              applyFocusChangeTabindexSingleTarget(
                unorderedList.children[arrayIndex],
                "0"
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
                unorderedList.children[indexOfELementWithTabindexZero - 1],
                "0"
              );
              applyFocusChangeTabindexSingleTarget(
                unorderedList.children[indexOfELementWithTabindexZero - 1],
                "0"
              );

              cachedData.dragItemSelected
                ? unorderedList.children[
                    indexOfELementWithTabindexZero - 1
                  ].setAttribute("data-dragSelected", "true")
                : null;

              unorderedList.children[
                indexOfELementWithTabindexZero - 1
              ].focus();
            } else {
              singleTargetChangeTabindexCheckedAndDeleteBtn(
                unorderedList.children[indexOfELementWithTabindexZero],
                "0"
              );
              applyFocusChangeTabindexSingleTarget(
                unorderedList.children[indexOfELementWithTabindexZero],
                "0"
              );

              cachedData.dragItemSelected
                ? unorderedList.children[
                    indexOfELementWithTabindexZero
                  ].setAttribute("data-dragSelected", "true")
                : null;

              unorderedList.children[indexOfELementWithTabindexZero].focus();
            }
          }
        } else {
          /**
           * we dont have to work with cached.dragItemSelected or change
           * value of the attr dragSelected because when user click on the checked btn
           * of the last item in completed array in completed view
           * the algorithm that handle when user click on checked btn the attr of tabindex of
           * that todo item will be "0"
           * we handle drag selected etc in that algorithm
           * **/

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
          //     .querySelector(".views-container")
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

          if (cachedData.arraysOfDifferentViews.allViewArray.length == 0) {
            // remove items
            unorderedList.replaceChildren();
            // check the value of views container data-unorderedhasitems attr
            document
              .querySelector(".views-container")
              .getAttribute("data-unorderedhasitems") != "false"
              ? addOrRemoveTopBorderToViewsContainer("false")
              : null;
          } else {
            const currentViewBtnCompleted = findCurrentViewBtn(
              "button[data-currentView]"
            );
            appendAllViewElementsAndChangeToAllView(
              cachedData.arraysOfDifferentViews.allViewArray,
              assignAttrToArrayAndCreateListitem,
              removeCurrentListitemsAppendFragmentElement,
              unorderedList
            );
            // current should be "completed" we want to remove data-currentView
            currentViewBtnCompleted.removeAttribute("data-currentView");
            // apply data-currentView to "allview" btn
            currentViewBtnCompleted.previousElementSibling.previousElementSibling.setAttribute(
              "data-currentView",
              ""
            );
            // check the value of views container data-unorderedhasitems attr
            document
              .querySelector(".views-container")
              .getAttribute("data-unorderedhasitems") != "true"
              ? addOrRemoveTopBorderToViewsContainer("true")
              : null;
            // once we append the listitems we can run algorithm to focus listitem
            // focus first item in all view array
            singleTargetChangeTabindexCheckedAndDeleteBtn(
              unorderedList.children[0],
              "0"
            );
            applyFocusChangeTabindexSingleTarget(
              unorderedList.children[0],
              "0"
            );
            unorderedList.children[0].focus();
          }
        }
        break;
    }
    console.log(cachedData);
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
     * update tabindex of each listitem in allView array before we filter out the listitems
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
        cachedData.arraysOfDifferentViews.activeViewArray
      );
    // completed view
    cachedData.originalElementOrderInAllViewArray.completedViewOriginalOrder =
      originalAllViewIndexForElementsInActiveOrCompletedArray(
        cachedData.arraysOfDifferentViews.completedViewArray
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
            cachedData.dragItemSelected
              ? (cachedData.dragItemSelected = false)
              : null;
            /**
             * we dont have to search a todo item and assign string "true" to attr dragSelected
             * of a todo item because when the todo item of the clicked delete btn
             * has tabindex = "0", our algorithm will remove that todo item/element along with its children
             * and its attrs
             * **/
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
            /**
             * we dont have to remove/search for previous todo item with tabindex = "0"
             * because when user click on delete btn our algorithm will remove it from allview,active and completed array
             * there should be no reference and any attr on that todo item will be remove with that todo item
             * **/
            if (arrayIndex == unorderedList.childElementCount) {
              singleTargetChangeTabindexCheckedAndDeleteBtn(
                firstItemAllView,
                "0"
              );
              applyFocusChangeTabindexSingleTarget(firstItemAllView, "0");
              firstItemAllView.focus();
            } else {
              singleTargetChangeTabindexCheckedAndDeleteBtn(
                unorderedList.children[arrayIndex],
                "0"
              );
              applyFocusChangeTabindexSingleTarget(
                unorderedList.children[arrayIndex],
                "0"
              );
              unorderedList.children[arrayIndex].focus();
            }
          } else {
            /**
             * if cachedData.dragItemSelected is true, we want to assign "true" to dragSelected attr
             * of that todo item
             * **/
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
            /**
             * we dont have to remove/search for previous todo item with tabindex = "0"
             * because when user click on delete btn our algorithm will remove it from allview,active and completed array
             * there should be no reference and any attr on that todo item will be remove with that todo item
             * **/
            if (arrayIndex < useIndexToFocusItemForDelBtnAlgorithm) {
              singleTargetChangeTabindexCheckedAndDeleteBtn(
                unorderedList.children[
                  useIndexToFocusItemForDelBtnAlgorithm - 1
                ],
                "0"
              );
              applyFocusChangeTabindexSingleTarget(
                unorderedList.children[
                  useIndexToFocusItemForDelBtnAlgorithm - 1
                ],
                "0"
              );

              cachedData.dragItemSelected
                ? unorderedList.children[
                    useIndexToFocusItemForDelBtnAlgorithm - 1
                  ].setAttribute("data-dragSelected", "true")
                : null;

              unorderedList.children[
                useIndexToFocusItemForDelBtnAlgorithm - 1
              ].focus();
            } else {
              singleTargetChangeTabindexCheckedAndDeleteBtn(
                unorderedList.children[useIndexToFocusItemForDelBtnAlgorithm],
                "0"
              );
              applyFocusChangeTabindexSingleTarget(
                unorderedList.children[useIndexToFocusItemForDelBtnAlgorithm],
                "0"
              );

              cachedData.dragItemSelected
                ? unorderedList.children[
                    useIndexToFocusItemForDelBtnAlgorithm
                  ].setAttribute("data-dragSelected", "true")
                : null;

              unorderedList.children[
                useIndexToFocusItemForDelBtnAlgorithm
              ].focus();
            }
          }
        } else {
          /**
           * we dont have to work with cached.dragItemSelected or change
           * value of the attr dragSelected because when user click on the checked btn
           * of the last item in allview array in all view
           * the algorithm that handle when user click on checked btn the attr of tabindex of
           * that todo item will be "0"
           * we handle drag selected etc in that algorithm
           * **/
          // allview array is empty
          // else statement to this if statement. cachedData.arraysOfDifferentViews.allViewArray.length >= 1
          unorderedList.replaceChildren();

          // check attr unorderedhasitems of views container

          document
            .querySelector(".views-container")
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
            cachedData.dragItemSelected
              ? (cachedData.dragItemSelected = false)
              : null;

            const firstItemActiveView = unorderedList.children[0];

            // arrayIndex == unorderedList.childElementCount
            //   ? applyFocusToSelectedTodoWhenCheckedDeleteBtnOrListitemIsClicked(
            //       firstItemActiveView
            //     )
            //   : applyFocusToSelectedTodoWhenCheckedDeleteBtnOrListitemIsClicked(
            //       arrayIndex
            //   );
            // using if statement because it is more readable
            /**
             * we dont have to remove/search for previous todo item with tabindex = "0"
             * because when user click on delete btn our algorithm will remove it from allview,active and completed array
             * there should be no reference and any attr on that todo item will be remove with that todo item
             * **/
            if (arrayIndex == unorderedList.childElementCount) {
              // focus todo at index = 0
              singleTargetChangeTabindexCheckedAndDeleteBtn(
                firstItemActiveView,
                "0"
              );
              applyFocusChangeTabindexSingleTarget(firstItemActiveView, "0");
              firstItemActiveView.focus();
            } else {
              singleTargetChangeTabindexCheckedAndDeleteBtn(
                unorderedList.children[arrayIndex],
                "0"
              );
              applyFocusChangeTabindexSingleTarget(
                unorderedList.children[arrayIndex],
                "0"
              );
              unorderedList.children[arrayIndex].focus();
            }
          } else {
            /**
             * if cachedData.dragItemSelected is true, we want to assign "true" to dragSelected attr
             * of that todo item
             * **/
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
                ],
                "0"
              );
              applyFocusChangeTabindexSingleTarget(
                unorderedList.children[
                  useIndexToFocusItemForDelBtnAlgorithm - 1
                ],
                "0"
              );

              cachedData.dragItemSelected
                ? unorderedList.children[
                    useIndexToFocusItemForDelBtnAlgorithm - 1
                  ].setAttribute("data-dragSelected", "true")
                : null;

              unorderedList.children[
                useIndexToFocusItemForDelBtnAlgorithm - 1
              ].focus();
            } else {
              singleTargetChangeTabindexCheckedAndDeleteBtn(
                unorderedList.children[useIndexToFocusItemForDelBtnAlgorithm],
                "0"
              );
              applyFocusChangeTabindexSingleTarget(
                unorderedList.children[useIndexToFocusItemForDelBtnAlgorithm],
                "0"
              );

              cachedData.dragItemSelected
                ? unorderedList.children[
                    useIndexToFocusItemForDelBtnAlgorithm
                  ].setAttribute("data-dragSelected", "true")
                : null;

              unorderedList.children[
                useIndexToFocusItemForDelBtnAlgorithm
              ].focus();
            }
          }
        } else {
          /**
           * we dont have to work with cached.dragItemSelected or change
           * value of the attr dragSelected because when user click on the checked btn
           * of the last item in active array in active view
           * the algorithm that handle when user click on checked btn the attr of tabindex of
           * that todo item will be "0"
           * we handle drag selected etc in that algorithm
           * **/
          // active array is empty create and append items in allview array
          // focus first item
          /**
           * check if cachedObj.allView array length is == 0
           * **/
          const currViewBtnActive = findCurrentViewBtn(
            "button[data-currentView]"
          );
          if (cachedData.arraysOfDifferentViews.allViewArray.length == 0) {
            unorderedList.replaceChildren();
            // current should be "active" we want to remove data-currentView
            currViewBtnActive.removeAttribute("data-currentView");
            // apply data-currentView to "allview" btn
            currViewBtnActive.previousElementSibling.setAttribute(
              "data-currentView",
              ""
            );
            // assign "All" to cachedObj.currentView
            cachedData.currentView = "All";

            document
              .querySelector(".views-container")
              .getAttribute("data-unorderedhasitems") != "false"
              ? addOrRemoveTopBorderToViewsContainer("false")
              : null;
          } else {
            appendAllViewElementsAndChangeToAllView(
              cachedData.arraysOfDifferentViews.allViewArray,
              assignAttrToArrayAndCreateListitem,
              removeCurrentListitemsAppendFragmentElement,
              unorderedList
            );
            /**
             * assign value "0" to tabindex of first element of allview array
             * **/
            // current should be "active" we want to remove data-currentView
            currViewBtnActive.removeAttribute("data-currentView");
            // apply data-currentView to "allview" btn
            currViewBtnActive.previousElementSibling.setAttribute(
              "data-currentView",
              ""
            );
            singleTargetChangeTabindexCheckedAndDeleteBtn(
              unorderedList.children[0],
              "0"
            );
            applyFocusChangeTabindexSingleTarget(
              unorderedList.children[0],
              "0"
            );
            unorderedList.children[0].focus();
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
            cachedData.dragItemSelected
              ? (cachedData.dragItemSelected = false)
              : null;

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
                firstItemCompletedView,
                "0"
              );
              applyFocusChangeTabindexSingleTarget(firstItemCompletedView, "0");
              firstItemCompletedView.focus();
            } else {
              singleTargetChangeTabindexCheckedAndDeleteBtn(
                unorderedList.children[arrayIndex],
                "0"
              );
              applyFocusChangeTabindexSingleTarget(
                unorderedList.children[arrayIndex],
                "0"
              );
              unorderedList.children[arrayIndex].focus();
            }
          } else {
            /**
             * if cachedData.dragItemSelected is true, we want to assign "true" to dragSelected attr
             * of that todo item
             * **/
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
                ],
                "0"
              );
              applyFocusChangeTabindexSingleTarget(
                unorderedList.children[
                  useIndexToFocusItemForDelBtnAlgorithm - 1
                ],
                "0"
              );

              cachedData.dragItemSelected
                ? unorderedList.children[
                    useIndexToFocusItemForDelBtnAlgorithm - 1
                  ].setAttribute("data-dragSelected", "true")
                : null;

              unorderedList.children[
                useIndexToFocusItemForDelBtnAlgorithm - 1
              ].focus();
            } else {
              singleTargetChangeTabindexCheckedAndDeleteBtn(
                unorderedList.children[useIndexToFocusItemForDelBtnAlgorithm],
                "0"
              );
              applyFocusChangeTabindexSingleTarget(
                unorderedList.children[useIndexToFocusItemForDelBtnAlgorithm],
                "0"
              );

              cachedData.dragItemSelected
                ? unorderedList.children[
                    useIndexToFocusItemForDelBtnAlgorithm
                  ].setAttribute("data-dragSelected", "true")
                : null;

              unorderedList.children[
                useIndexToFocusItemForDelBtnAlgorithm
              ].focus();
            }
          }
        } else {
          /**
           * we dont have to work with cached.dragItemSelected or change
           * value of the attr dragSelected because when user click on the checked btn
           * of the last item in completed array in completed view
           * the algorithm that handle when user click on checked btn the attr of tabindex of
           * that todo item will be "0"
           * we handle drag selected etc in that algorithm
           * **/
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
            // current should be "completed" we want to remove data-currentView
            currViewBtnCompleted.removeAttribute("data-currentView");
            // apply data-currentView to "allview" btn
            currViewBtnCompleted.previousElementSibling.previousElementSibling.setAttribute(
              "data-currentView",
              ""
            );
            // assign "All" to cachedObj.currentView
            cachedData.currentView = "All";
            document
              .querySelector(".views-container")
              .getAttribute("data-unorderedhasitems") != "false"
              ? addOrRemoveTopBorderToViewsContainer("false")
              : null;
          } else {
            appendAllViewElementsAndChangeToAllView(
              cachedData.arraysOfDifferentViews.allViewArray,
              assignAttrToArrayAndCreateListitem,
              removeCurrentListitemsAppendFragmentElement,
              unorderedList
            );
            /**
             * assign value "0" to tabindex of first element of allview array
             * **/
            // current should be "completed" we want to remove data-currentView
            currViewBtnCompleted.removeAttribute("data-currentView");
            // apply data-currentView to "allview" btn
            currViewBtnCompleted.previousElementSibling.previousElementSibling.setAttribute(
              "data-currentView",
              ""
            );
            singleTargetChangeTabindexCheckedAndDeleteBtn(
              unorderedList.children[0],
              "0"
            );
            applyFocusChangeTabindexSingleTarget(
              unorderedList.children[0],
              "0"
            );
            unorderedList.children[0].focus();
          }
        }
        break;
    }
    console.log(cachedData);
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
     * algorithm to reset cached.dragItemSelected
     * **/
    const valueOfDragItemSelectedBoolean = cachedData.dragItemSelected;
    // !checkForCurrentViewAttrOfElement
    //   ? (event.target.setAttribute("data-currentView", ""),
    //     // if we get here it means we are switching views
    //     // check if cached.dragItemSelected = true
    //     // if it is assign boolean false
    //     valueOfDragItemSelectedBoolean
    //       ? (cachedData.dragItemSelected = false)
    //       : null)
    //   : null;
    // if statement might be more readable
    if (!checkForCurrentViewAttrOfElement) {
      // if we get here it means we are switching views
      // check if cached.dragItemSelected = true
      // if it is assign boolean false
      event.target.setAttribute("data-currentView", "");
      if (valueOfDragItemSelectedBoolean) {
        cachedData.dragItemSelected = false;
      }
      /**
       * algorithm resetting cached.dragItemSelected is false will be for when user
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
      console.log("before", cachedData);

      if (cachedData.arraysOfDifferentViews.allViewArray.length == 0) {
        // remove items
        unorderedList.replaceChildren();
        // remove top border on views container
        document
          .querySelector(".views-container")
          .getAttribute("data-unorderedhasitems") != "false"
          ? addOrRemoveTopBorderToViewsContainer("false")
          : null;
      } else {
        // we will assign the proper attrs
        // create elements, remove ul children, append element
        const allViewArray = assignAttrToArrayAndCreateListitem(
          cachedData.arraysOfDifferentViews.allViewArray,
          updateAttrForTodoItemCheckedAndDeleteBtn,
          createChildrenForUnorderedList
        );
        removeCurrentListitemsAppendFragmentElement(
          unorderedList,
          allViewArray
        );
        /**
         * before we assign tabindex = "0" to the first item of the allview, active
         * or completed view array. find the elements with tabindex = "0" and change it to tabindex "-1"
         * also change tabindex to "-1" for checked and delete btn of that todo item
         * **/

        /**
         * we are looping through the current view array and looking to change any todo item
         * that has tabindex = "0" to tabindex = "-1"
         * WE ARE NOT CHANGING ANY OF THE TODO ITEMS IN THE OTHER ARRAYS IN OUR CACHEDOBJ`N
         * **/

        const todosWithTabindexZeroAllView = arrayOfItemsWithTabindexZero(
          cachedData.arraysOfDifferentViews.allViewArray
        );
        changeListitemTabindexToNegativeOne(todosWithTabindexZeroAllView, "-1");

        /**
         * we can make an array with todo items that have attr dragged selected "true"
         * and assign string "false" to the items in that array
         * like we did with tabindex = "0". we will use the array in cached obj
         * of the view btn the user clicked
         * **/

        const todoItemsWithDragSelectedTrueAllView =
          arrayOfItemsWithDragSelectedTrue(
            cachedData.arraysOfDifferentViews.allViewArray
          );

        changeAllItemDragSelected(
          todoItemsWithDragSelectedTrueAllView,
          "false"
        );

        singleTargetChangeTabindexCheckedAndDeleteBtn(
          unorderedList.children[0],
          "0"
        );
        applyFocusChangeTabindexSingleTarget(unorderedList.children[0], "0");

        /**
         * our thought process of why we are choosing not to focus element at index position of 0
         * for keyboard user if they are on any of the btns that control the current view
         * we want them to have the option of not having to tab back to the view btns after they changed the current view
         * this way keyboard users can decide on the view they want then use shift tab to focus the first item of that view
         * **/
        // add top border on views container
        document
          .querySelector(".views-container")
          .getAttribute("data-unorderedhasitems") != "true"
          ? addOrRemoveTopBorderToViewsContainer("true")
          : null;
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
    console.log("after", cachedData);
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
     * algorithm to reset cached.dragItemSelected
     * **/
    const valueOfDragItemSelectedBoolean = cachedData.dragItemSelected;
    // !checkForCurrentViewAttrOfElement
    //   ? (event.target.setAttribute("data-currentView", ""),
    //     // if we get here it means we are switching views
    //     // check if cached.dragItemSelected = true
    //     // if it is assign boolean false
    //     valueOfDragItemSelectedBoolean
    //       ? (cachedData.dragItemSelected = false)
    //       : null)
    //   : null;
    // if statement might be more readable
    if (!checkForCurrentViewAttrOfElement) {
      // if we get here it means we are switching views
      // check if cached.dragItemSelected = true
      // if it is assign boolean false
      event.target.setAttribute("data-currentView", "");
      if (valueOfDragItemSelectedBoolean) {
        cachedData.dragItemSelected = false;
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
      console.log("before", cachedData);
      if (cachedData.arraysOfDifferentViews.activeViewArray.length == 0) {
        // remove items
        unorderedList.replaceChildren();
        // remove top border on views container
        document
          .querySelector(".views-container")
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

        /**
         * before we assign tabindex = "0" to the first item of the allview, active
         * or completed view array. find the elements with tabindex = "0" and change it to tabindex "-1"
         * also change tabindex to "-1" for checked and delete btn of that todo item
         * **/

        /**
         * we are looping through the current view array and looking to change any todo item
         * that has tabindex = "0" to tabindex = "-1"
         * WE ARE NOT CHANGING ANY OF THE TODO ITEMS IN THE OTHER ARRAYS IN OUR CACHEDOBJ`N
         * **/

        const itemsWithTabindexZeroActiveView = arrayOfItemsWithTabindexZero(
          cachedData.arraysOfDifferentViews.activeViewArray
        );
        changeListitemTabindexToNegativeOne(
          itemsWithTabindexZeroActiveView,
          "-1"
        );

        /**
         * we can make an array with todo items that have attr dragged selected "true"
         * and assign string "false" to the items in that array
         * like we did with tabindex = "0". we will use the array in cached obj
         * of the view btn the user clicked
         * **/

        const itemsWithDragSelectedTrueActiveView =
          arrayOfItemsWithDragSelectedTrue(
            cachedData.arraysOfDifferentViews.activeViewArray
          );

        changeAllItemDragSelected(itemsWithDragSelectedTrueActiveView, "false");

        singleTargetChangeTabindexCheckedAndDeleteBtn(
          unorderedList.children[0],
          "0"
        );
        applyFocusChangeTabindexSingleTarget(unorderedList.children[0], "0");
        /**
         * our thought process of why we are choosing not to focus element at index position of 0
         * for keyboard user if they are on any of the btns that control the current view
         * we want them to have the option of not having to tab back to the view btns after they changed the current view
         * this way keyboard users can decide on the view they want then use shift tab to focus the first item of that view
         * **/
        // add top border on views container
        document
          .querySelector(".views-container")
          .getAttribute("data-unorderedhasitems") != "true"
          ? addOrRemoveTopBorderToViewsContainer("true")
          : null;
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
    console.log("after", cachedData);
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
     * algorithm to reset cached.dragItemSelected
     * **/
    const valueOfDragItemSelectedBoolean = cachedData.dragItemSelected;
    // !checkForCurrentViewAttrOfElement
    //   ? (event.target.setAttribute("data-currentView", ""),
    //     // if we get here it means we are switching views
    //     // check if cached.dragItemSelected = true
    //     // if it is assign boolean false
    //     valueOfDragItemSelectedBoolean
    //       ? (cachedData.dragItemSelected = false)
    //       : null)
    //   : null;
    // if statement might be more readable
    if (!checkForCurrentViewAttrOfElement) {
      // if we get here it means we are switching views
      // check if cached.dragItemSelected = true
      // if it is assign boolean false
      event.target.setAttribute("data-currentView", "");
      if (valueOfDragItemSelectedBoolean) {
        cachedData.dragItemSelected = false;
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
      console.log("before", cachedData);
      if (cachedData.arraysOfDifferentViews.completedViewArray.length == 0) {
        // remove items
        unorderedList.replaceChildren();
        // remove top border on views container
        document
          .querySelector(".views-container")
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

        /**
         * before we assign tabindex = "0" to the first item of the allview, active
         * or completed view array. find the elements with tabindex = "0" and change it to tabindex "-1"
         * also change tabindex to "-1" for checked and delete btn of that todo item
         * **/

        /**
         * we are looping through the current view array and looking to change any todo item
         * that has tabindex = "0" to tabindex = "-1"
         * WE ARE NOT CHANGING ANY OF THE TODO ITEMS IN THE OTHER ARRAYS IN OUR CACHEDOBJ`N
         * **/

        const todosWithTabindexZeroCompletedView = arrayOfItemsWithTabindexZero(
          cachedData.arraysOfDifferentViews.completedViewArray
        );
        changeListitemTabindexToNegativeOne(
          todosWithTabindexZeroCompletedView,
          "-1"
        );

        /**
         * we can make an array with todo items that have attr dragged selected "true"
         * and assign string "false" to the items in that array
         * like we did with tabindex = "0". we will use the array in cached obj
         * of the view btn the user clicked
         * **/

        const itemsWithDragSelectedTrueCompletedView =
          arrayOfItemsWithDragSelectedTrue(
            cachedData.arraysOfDifferentViews.completedViewArray
          );

        changeAllItemDragSelected(
          itemsWithDragSelectedTrueCompletedView,
          "false"
        );

        singleTargetChangeTabindexCheckedAndDeleteBtn(
          unorderedList.children[0],
          "0"
        );
        applyFocusChangeTabindexSingleTarget(unorderedList.children[0], "0");
        /**
         * our thought process of why we are choosing not to focus element at index position of 0
         * for keyboard user if they are on any of the btns that control the current view
         * we want them to have the option of not having to tab back to the view btns after they changed the current view
         * this way keyboard users can decide on the view they want then use shift tab to focus the first item of that view
         * **/
        // add top border on views container
        document
          .querySelector(".views-container")
          .getAttribute("data-unorderedhasitems") != "true"
          ? addOrRemoveTopBorderToViewsContainer("true")
          : null;
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
    console.log("after", cachedData);
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
    // of element with class .views-container
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
      null
    );

    /**
     * loop through allview or unorderedlist.children check if there is at least
     * one item with data-todocompleted "false"
     * **/

    const atLeastOneActiveTodoItem =
      cachedData.arraysOfDifferentViews.allViewArray.some(function findActive(
        listitem
      ) {
        const todoItemStatus = listitem.getAttribute("data-todoCompleted");
        return todoItemStatus == "false";
      });

    /**
     * loop through allview or unorderedlist.children check if there is at least
     * one item with data-todocompleted "true"
     * **/

    const atLeastOneCompletedTodoItem =
      cachedData.arraysOfDifferentViews.allViewArray.some(
        function findCompleted(listitem) {
          const todoStatus = listitem.getAttribute("data-todoCompleted");
          return todoStatus == "true";
        }
      );

    if (atLeastOneCompletedTodoItem && atLeastOneActiveTodoItem) {
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
       * ********
       * we want to find the next item that has attr data-todoCompleted "false"
       * when there is at least one item in the allview array in our cachedObj that has
       * data-todoCompleted set to "false" and there is at least one completed todo
       * ********
       * **/
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

      /**
       * we can pass in allview array in cachedObj
       * since the items in the allview array will have updated todoCompleted value
       * instead of passing in unorderedlist.children
       * **/

      const indexOfTodoNotCompleted =
        elementTodoStatus == "true"
          ? usingForLoopToFindIndexOfTodoNotCompleted(
              indexOfElementTabindexIsZero,
              cachedData.arraysOfDifferentViews.allViewArray
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
        ? cachedData.arraysOfDifferentViews.allViewArray[
            indexOfTodoNotCompleted
          ]
        : null;

      /**
       * assign tabindex = "-1" to all items in element before we assign tabindex = "0"
       * to element of this identifier/variable elementOfTodoNotCompleted
       * **/

      /**
       * we are looping through the current view array and looking to change any todo item
       * that has tabindex = "0" to tabindex = "-1"
       * WE ARE NOT CHANGING ANY OF THE TODO ITEMS IN THE OTHER ARRAYS IN OUR CACHEDOBJ`N
       * **/

      const todosWithTabindexZeroAllView = arrayOfItemsWithTabindexZero(
        cachedData.arraysOfDifferentViews.allViewArray
      );

      changeListitemTabindexToNegativeOne(todosWithTabindexZeroAllView, "-1");

      /**
       * we only assign tabidnex = "0" to elementOfTodoNotCompleted when indexOfTodoNotCompleted and elementOfTodoNotCompleted are truthy
       * **/

      /**
       * when indexOfTodoNotCompleted is falsy it will make elementOfTodoNotCompleted falsy which will get our algorithm to the null part of
       * the ternary operator below
       * which means the element with tabindex = "0" will be an active todo.
       * run our func to return an array of active todo items
       * **/

      /**
       * elementOfTodoNotCompleted is an element a part of allview array
       * **/
      elementOfTodoNotCompleted
        ? elementOfTodoNotCompleted.setAttribute("tabindex", "0")
        : null;

      /**
       * we can pass in allview array in cachedObj
       * since the items in the allview array will have updated todoCompleted value
       * instead of passing in unorderedlist.children
       * **/
    }

    const arrayOfActiveTodoItems = filterOutActiveTodoItems(
      cachedData.arraysOfDifferentViews.allViewArray
    );

    // find index based on length of arrayOfActiveTodoItems of the todo item with tabindex = "0"
    // assign index to variable use it as a reference in all view switch statement algorithm
    /**
     * there is chance value of indexToUseForAllViewSwitchStatmentAlgorithm will be null
     * when arrayOfActiveTodoItems is empty.
     * if arrayOfActiveTodoItems is empty getIndexOfElementWithTabindexZero will return null
     * **/
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
      /**
       * we are handling the display of the elements to unorderlist in our switch statement algorithm
       * **/
      // remove top border to views container element
      // document
      //   .querySelector(".views-container")
      //   .getAttribute("data-unorderedhasitems") != "false"
      //   ? addOrRemoveTopBorderToViewsContainer("false")
      //   : null;
    } else {
      // update items in active view array in cachedObj using assignAllViewIndexElementsInAllViewArr
      // since both all view and active view will be the same length, same item
      // we can work with active view array first then assign a copy of active view array to allview array
      // this way we will eliminate one step
      /**
       * we will run func to assign tabindex to listitem at indexToUseForAllViewSwitchStatmentAlgorithm for all view
       * and indexOfElementTabindexIsZero for active view
       * **/
      /**
       * what algorithm to run when indexToUseForAllViewSwitchStatmentAlgorithm is null
       arrayOfActiveTodoItems[
         indexToUseForAllViewSwitchStatmentAlgorithm
       ].setAttribute("tabIndex", "-1")
       * **/

      /**
       * we will assign tabindex to element at indexToUseForAllViewSwitchStatmentAlgorithm of
       * arrayOfActiveTodoItems when indexToUseForAllViewSwitchStatmentAlgorithm is truthy
       * **/

      indexToUseForAllViewSwitchStatmentAlgorithm
        ? arrayOfActiveTodoItems[
            indexToUseForAllViewSwitchStatmentAlgorithm
          ].setAttribute("tabIndex", "0")
        : null;

      cachedData.arraysOfDifferentViews.activeViewArray = [
        ...arrayOfActiveTodoItems,
      ];
      assignAllViewIndexElementsInAllViewArr(
        cachedData.arraysOfDifferentViews.activeViewArray
      );
      // update original allview index of active array in cachedObj
      cachedData.originalElementOrderInAllViewArray.activeViewOriginalOrder =
        originalAllViewIndexForElementsInActiveOrCompletedArray(
          cachedData.arraysOfDifferentViews.activeViewArray
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
          // remove items
          unorderedList.replaceChildren();
          // remove top border on views container
          document
            .querySelector(".views-container")
            .getAttribute("data-unorderedhasitems") != "false"
            ? addOrRemoveTopBorderToViewsContainer("false")
            : null;
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
          /**
           * our algorithm outside the switch statement, we are removing the items
           * in completedview array in cachedObj by making array length equal 0
           * that should remove the reference
           * the algorithm is also checking if the current todo/focus item has tabindex = "0" or "-1"
           * and if its todocompleted = "true"
           * when the todocompleted = "true" that item will be removed from both allview and completed array
           * when user click clear completed btn
           * *******
           * we won't have to search previous todo with tabindex = "0" and assign "-1" to it
           * *******
           * **/

          singleTargetChangeTabindexCheckedAndDeleteBtn(
            unorderedList.children[indexToUseForAllViewSwitchStatmentAlgorithm],
            "0"
          );

          applyFocusChangeTabindexSingleTarget(
            unorderedList.children[indexToUseForAllViewSwitchStatmentAlgorithm],
            "0"
          );

          // if cached.dragItemSelected is truthy assign string "true" to unorderedList.children[indexToUseForAllViewSwitchStatmentAlgorithm]
          cachedData.dragItemSelected
            ? unorderedList.children[
                indexToUseForAllViewSwitchStatmentAlgorithm
              ].setAttribute("data-dragSelected", "true")
            : null;
        }
        break;
      case "Active":
        if (cachedData.arraysOfDifferentViews.activeViewArray.length == 0) {
          // remove items
          unorderedList.replaceChildren();
          // remove top border on views container
          document
            .querySelector(".views-container")
            .getAttribute("data-unorderedhasitems") != "false"
            ? addOrRemoveTopBorderToViewsContainer("false")
            : null;
        } else {
          dependingOnViewCreateAndAppendListitems(
            cachedData.arraysOfDifferentViews.activeViewArray,
            unorderedList,
            document.querySelector(".views-container"),
            assignAttrToArrayAndCreateListitem,
            removeCurrentListitemsAppendFragmentElement,
            addOrRemoveTopBorderToViewsContainer
          );
          /**
           * our algorithm outside the switch statement, we are removing the items
           * in completedview array in cachedObj by making array length equal 0
           * that should remove the reference
           * the algorithm is also checking if the current todo/focus item has tabindex = "0" or "-1"
           * and if its todocompleted = "true"
           * when the todocompleted = "true" that item will be removed from both allview and completed array
           * when user click clear completed btn
           * *******
           * we won't have to search previous todo with tabindex = "0" and assign "-1" to it
           * *******
           * **/

          singleTargetChangeTabindexCheckedAndDeleteBtn(
            unorderedList.children[indexOfElementTabindexIsZero],
            "0"
          );

          applyFocusChangeTabindexSingleTarget(
            unorderedList.children[indexOfElementTabindexIsZero],
            "0"
          );
          // if cached.dragItemSelected is truthy assign string "true" to unorderedList.children[indexOfElementTabindexIsZero]
          cachedData.dragItemSelected
            ? unorderedList.children[indexOfElementTabindexIsZero].setAttribute(
                "data-dragSelected",
                "true"
              )
            : null;
        }
        break;
      case "Completed":
        // remove lisitems of unorderlist
        // assign "false" to data-unorderedhasitems
        // of element with class views-container to remove top border
        // remove items
        unorderedList.replaceChildren();
        // remove top border on views container
        document
          .querySelector(".views-container")
          .getAttribute("data-unorderedhasitems") != "false"
          ? addOrRemoveTopBorderToViewsContainer("false")
          : null;

        // change dragSelected in cachedObj to false
        cachedData.dragItemSelected
          ? (cachedData.dragItemSelected = false)
          : null;
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
        return startIndex;
      }
      if (startIndex == length) {
        startIndex = 0;
      }
    }
    /**
     * in completed view with two items all data-todoCompleted will have "true"
     * first item of unorderedlist.children in completed view will have tabindex = "0"
     * first iteration
     * endingIndex of this func will be 0
     * startIndex will be 1
     * second iteration
     * endingIndex of this func will be 0
     * startIndex will be 2
     * startIndex = 0
     * third iteration
     * startIndex = 0
     * startIndex != endingIndex will be false we break out of for loop
     * return null
     * **/
    return null;
  }

  /**
   * helper func
   * **/

  /**
   * build assistive text string
   * run func that build assistive text in accessibilityDragAndDrop
   * when user hit space or enter key to select a item to drap and drop
   * when user hit space or enter key to select new position where they want the todo item to be
   * **/

  function buildingAssistiveTextString(
    todoTextContent,
    selectedGrabItem,
    todoItemIndex,
    lengthOfTodoList
  ) {
    // "todo item text content"
    // "grabbed, current" or "dropped, final"
    // "position"
    // "of" or "to"
    // unorderedlist.children length
    /**
     * two text content is dependent on whether user hit space/enter to select todo to start drag process
     * "grabbed, current" or "dropped, final" and "of" or "to"
     * **/
    /**
     * parameters we want to pass into this func will be:
     * todo item text content
     * value of cachedData.dragItemSelected: which we will use to assign string to two of our variables/identifiers
     * length of current view. we can use unorderlist.childElementCount
     * **/
    // add one to todoItemIndex;
    const addOneToItemIndex = todoItemIndex + 1;
    // when dragItemSelected is true build text with "grabbed, current" and "of"
    // when dragItemSelected is falsy build text with "dropped, final" and "to"

    const grabbedOrDropped = selectedGrabItem
      ? "grabbed, current"
      : "dropped, final";
    // const ofOrToTextString = selectedGrabItem ? "of" : "to";

    return `${todoTextContent} ${grabbedOrDropped} position ${addOneToItemIndex} of ${lengthOfTodoList}`;
  }

  /**
   * get grabbed element grabDragIndex
   * **/

  /**
   * get UL number of children
   * **/

  /**
   * get grabbed element TODO text
   * **/

  function grabbedElementTextContent(todoItem) {
    return todoItem.firstElementChild.children[1].innerText;
  }

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
      /**
       * getIndexOfElementWithTabindexZero will always return 0 because we passed in 0
       * as the initial value of our reduce func
       * **/
      const useIndexToFocusTodoItem = getIndexOfElementWithTabindexZero(
        unorderedList.children
      );

      /**
       * when useIndexToFocusTodoItem is null and allview array in cachedObj has items in it
       * we will check if an item in allview array in cachedObj has tabindex = "0"
       * **/

      // build allView array
      /**
       * algorithm in our buildAllViewArrayForTodoInputFunc we are making a copy of elements in
       * cached.arraysOfDifferentViews.allViwsArray which will always have a todo with tabindex = "0"
       * since we will have a reference of the index of which todo that has tabindex = "0"
       * before we run algorithm that will work with arrays in cachedObj
       * we can change every item tabindex to "-1" in arrays that are in cachedObj
       * **/
      const buildingAllViewArray = buildAllViewArrayForTodoInputFunc(
        newTodoItem,
        useIndexToFocusTodoItem
      );
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
      /**
       * handling assigning tabindex to items in active and completed array in our switch statement
       * **/
      // assign tabindex '0' to first element in array;
      // active
      // assignTabindexZeroToFirstElement(
      //   cachedData.arraysOfDifferentViews.activeViewArray
      // );
      // assignTabindexZeroToFirstElement(
      //   cachedData.arraysOfDifferentViews.completedViewArray
      // );
      // save original order of allViewIndex for active and completed
      // active view
      cachedData.originalElementOrderInAllViewArray.activeViewOriginalOrder =
        originalAllViewIndexForElementsInActiveOrCompletedArray(
          buildingActiveArray
        );
      // completed view
      cachedData.originalElementOrderInAllViewArray.completedViewOriginalOrder =
        originalAllViewIndexForElementsInActiveOrCompletedArray(
          buildingCompletedArray
        );
      // add one to items left text
      increaseOrDecreaseItemsLeftCounter("add");
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
              unorderedList.children[0],
              "0"
            );
            applyFocusChangeTabindexSingleTarget(
              unorderedList.children[0],
              "0"
            );
          } else {
            singleTargetChangeTabindexCheckedAndDeleteBtn(
              unorderedList.children[useIndexToFocusTodoItem + 1],
              "0"
            );
            applyFocusChangeTabindexSingleTarget(
              unorderedList.children[useIndexToFocusTodoItem + 1],
              "0"
            );
          }
          // change value of data-unorderedhasitems on views-container to true
          // check the value of views container data-unorderedhasitems attr
          document
            .querySelector(".views-container")
            .getAttribute("data-unorderedhasitems") != "true"
            ? addOrRemoveTopBorderToViewsContainer("true")
            : null;
          // add one to items left text
          /**
           * since we are always adding item when user enter todo and hits enter
           * we could move increaseOrDecreaseItemsLeftCounter("add"); outside of this switch statement
           * increaseOrDecreaseItemsLeftCounter("add");
           * **/
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
              unorderedList.children[0],
              "0"
            );
            applyFocusChangeTabindexSingleTarget(
              unorderedList.children[0],
              "0"
            );
          } else {
            singleTargetChangeTabindexCheckedAndDeleteBtn(
              unorderedList.children[useIndexToFocusTodoItem + 1],
              "0"
            );
            applyFocusChangeTabindexSingleTarget(
              unorderedList.children[useIndexToFocusTodoItem + 1],
              "0"
            );
          }
          // change value of data-unorderedhasitems on .views-container to true
          // check the value of views container data-unorderedhasitems attr
          document
            .querySelector(".views-container")
            .getAttribute("data-unorderedhasitems") != "true"
            ? addOrRemoveTopBorderToViewsContainer("true")
            : null;
          // add one to items left text
          /**
           * since we are always adding item when user enter todo and hits enter
           * we could move increaseOrDecreaseItemsLeftCounter("add"); outside of this switch statement
           * increaseOrDecreaseItemsLeftCounter("add");
           * **/
          break;
        case "Completed":
          // call func that will add attr to elements based on length of array
          // then run func to create element
          /**
           * run algorithm for completed view if there are items in completed array in cachedObj
           * **/

          if (cachedData.arraysOfDifferentViews.completedViewArray.length > 0) {
            /**
             * handle creating, appending and tabindex for completed view and completed array
             * **/
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
                unorderedList.children[0],
                "0"
              );
              applyFocusChangeTabindexSingleTarget(
                unorderedList.children[0],
                "0"
              );
            } else {
              singleTargetChangeTabindexCheckedAndDeleteBtn(
                unorderedList.children[useIndexToFocusTodoItem],
                "0"
              );
              applyFocusChangeTabindexSingleTarget(
                unorderedList.children[useIndexToFocusTodoItem],
                "0"
              );
            }
          } else {
            /**
             * we thought we had to assign tabindex to first element in all view array in caachedObj
             * but every time the user switches views we reset tabindex/dragSelected to default
             * which means the first item will have tabindex = "0" for the view(all,active,completed) the user clicked
             * we dont else statement
             * **/
          }
          break;
      }
      console.log(cachedData);
    }
  }

  /**
   * build allView array
   * **/

  function buildAllViewArrayForTodoInputFunc(
    todoItem,
    indexOfPreviousItemWithTabindexZero
  ) {
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
       * we could reset tabindex of all todo items to "-1" in this function
       * instead of loop through cachedData.arraysOfDifferentViews.allViewArray
       * change every item tabindex = "-1"
       * pass in the value of useIndexToFocusTodoItem which will be the index of the todo with tabindex = "0"
       * before we run this func
       * change tabindex of li, checked btn and delete btn of item at useIndexToFocusTodoItem to "-1"
       * if useIndexToFocusTodoItem is null do nothing
       * useIndexToFocusTodoItem is the variable/identifer we passed into this func buildAllViewArrayForTodoInputFunc
       * it is the paremeter indexOfPreviousItemWithTabindexZero for buildAllViewArrayForTodoInputFunc
       * **/
      // the number value 0 is falsy we didnt eneter this if statement
      // change condition to indexOfPreviousItemWithTabindexZero != null
      if (indexOfPreviousItemWithTabindexZero != null) {
        singleTargetChangeTabindexCheckedAndDeleteBtn(
          cachedData.arraysOfDifferentViews.allViewArray[
            indexOfPreviousItemWithTabindexZero
          ],
          "-1"
        );
        applyFocusChangeTabindexSingleTarget(
          cachedData.arraysOfDifferentViews.allViewArray[
            indexOfPreviousItemWithTabindexZero
          ],
          "-1"
        );
      } else {
        /**
         * we want to check when indexOfPreviousItemWithTabindexZero and
         * cachedData.arraysOfDifferentViews.allViewArray.length greater than 0
         * there will be an item with tabindex = "0" if we switch from completed to all or active view
         * there will be more than one iten with tabindex = "0"
         * when is indexOfPreviousItemWithTabindexZero case that will happen when completed array is empty
         * that will make getIndexOfElementWithTabindexZero(unorderedlist.children) return null
         * look for the item in allview array with tabindex = "0"
         * **/
        const itemWithTabindexInAllviewArray =
          getIndexOfElementWithTabindexZero(
            cachedData.arraysOfDifferentViews.allViewArray
          );
        // itemWithTabindexInAllviewArray has a chance to be null
        // when user is on completed view and enter todo items
        if (itemWithTabindexInAllviewArray != null) {
          singleTargetChangeTabindexCheckedAndDeleteBtn(
            cachedData.arraysOfDifferentViews.allViewArray[
              itemWithTabindexInAllviewArray
            ],
            "-1"
          );
          applyFocusChangeTabindexSingleTarget(
            cachedData.arraysOfDifferentViews.allViewArray[
              itemWithTabindexInAllviewArray
            ],
            "-1"
          );
        }
      }

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
    array[0].setAttribute("tabindex", "0");
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
      "data-dragSelected": "false",
      "data-todoCompleted": "false",
      "data-allViewIndex": "0",
      "data-grabDragIndex": "0",
      "data-dragOver": "false",
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
    // add event listeners to button, listitem and div with draggable "true"
    applyEventListener(checkedBtn, "focus", checkedBtnHasFocus);
    applyEventListener(checkedBtn, "blur", checkedBtnIsNotFocus);
    // drag events
    applyDragStartEventToDiv(draggableDiv);
    applyDragDropEventToListitem(todoItem);
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
    // event.preventDefault();
    // target the UL and its children count
    // current todoItem
    const todoElement = event.target.closest("li");

    const beforeSwapUnorderedChildren = Array.prototype.slice.call(
      unorderedList.children
    );
    const beforeSwapUnorderedChildrenCount = unorderedList.childElementCount;
    // for "ArrowDown" algorithm
    const lengthOfUnorderedListMinusOne =
      beforeSwapUnorderedChildren.length - 1;
    /**
     * we will separate the algorithm for space/enter key from arrow down and arrow up key
     * **/

    // if (event.target.tagName == "LI") {
    //   // when we get here the focus element will be the todo listitem

    //   switch (event.code) {
    //     case "Space":
    //     case "Enter":
    //       event.preventDefault();
    //       console.log(getGrabDragIndexAttr(event.target));
    //       const grabbedElement = event.target;
    //       console.log(grabbedElement);
    //       if (!cachedData.dragItemSelected) {
    //         event.target.setAttribute("data-dragselected", "true");
    //         cachedData.dragItemSelected = true;
    //         // "grabbed, Current" because users hit space or enter on a todo item
    //         // grabbed position
    //       } else {
    //         event.target.setAttribute("data-dragselected", "false");
    //         cachedData.dragItemSelected = false;
    //         // "dropped, final"
    //       }
    //       break;
    //     case "ArrowDown":
    //       // use event.target.closest("li")
    //       // to get parent and next sibling
    //       console.log(event.target);
    //       break;
    //     case "ArrowUp":
    //       console.log(event.target);
    //       // use event.target.closest("li")
    //       // get parent and previous sibling
    //       break;
    //   }
    // }
    /**
     * another approach
     * **/

    if (event.target.tagName == "LI") {
      if (event.code == "Space" || event.code == "Enter") {
        console.log(getGrabDragIndexAttr(event.target));
        const grabbedElement = event.target;
        const todoItemText =
          grabbedElement.firstElementChild.children[1].innerText;
        console.log(grabbedElement);
        if (!cachedData.dragItemSelected) {
          event.target.setAttribute("data-dragselected", "true");
          cachedData.dragItemSelected = true;
          // grabbed item index
          const grabbedItemIndex = Number(
            grabbedElement.getAttribute("data-grabDragIndex")
          );
          // "grabbed, Current" because users hit space or enter on a todo item
          // grabbed position
          const keyboardDragDropStartText = buildingAssistiveTextString(
            todoItemText,
            cachedData.dragItemSelected,
            grabbedItemIndex,
            beforeSwapUnorderedChildrenCount
          );
          assistiveTextContainer.innerText = keyboardDragDropStartText;
        } else {
          event.target.setAttribute("data-dragselected", "false");
          cachedData.dragItemSelected = false;
          // dropped item index
          const droppedItemIndex = Number(
            grabbedElement.getAttribute("data-grabDragIndex")
          );
          // "dropped, final"
          const keyboardDragDropFinalText = buildingAssistiveTextString(
            todoItemText,
            cachedData.dragItemSelected,
            droppedItemIndex,
            beforeSwapUnorderedChildrenCount
          );
          assistiveTextContainer.innerText = keyboardDragDropFinalText;
        }
      }
    }

    /**
     * for arrow up and arrow down we want to target closet("li") of focus item
     * since we have three elements that can be focus the li, checked btn and delete btn
     * this way when user has checked or delete btn focus we will run algorithm to focus item/drag drop element
     * **/

    if (todoElement) {
      const indexOfCurrentTodoItem = [...unorderedList.children].indexOf(
        todoElement
      );
      const eventTargetClassName = event.target.className;
      switch (event.code) {
        case "ArrowDown":
          console.log(indexOfCurrentTodoItem);
          event.preventDefault();
          // use event.target.closest("li")
          // to get parent and next sibling
          const nextSibling = todoElement.nextElementSibling;
          // swap todo items
          // make copy of ul children
          // apply original tabindex to items in the copy array of ul children
          // combine copied array of ul children with original tabindex applied with array in cachedObj based on current view
          // sort items in array to correct order basded on original tabindex

          const ulChildrenArrayAfterSwappingTodoItems =
            cachedData.dragItemSelected
              ? Number(
                  getGrabDragIndexAttr(todoElement) ==
                    beforeSwapUnorderedChildrenCount - 1
                )
                ? keyboardMoveBottomItemToTopOfList([...unorderedList.children])
                : keyboardSwapTodoItemChild(
                    [...unorderedList.children],
                    indexOfCurrentTodoItem,
                    event.code
                  )
              : null;
          /**
           * will use switch run algorithm based on current view since
           * all view algorithm will be different from active and completed view algorithm
           * **/
          if (cachedData.dragItemSelected) {
            // empty assistive text content
            assistiveTextContainer.innerText = "";
            // arrowUpAndDownSwappingItemsHelper(view, array) pass in view as
            // first argument and array as second argument
            arrowUpAndDownSwappingItemsHelper(
              cachedData.currentView,
              ulChildrenArrayAfterSwappingTodoItems
            );
          }

          // change tabindex of todo item and its children checked and delete btn
          if (nextSibling == null) {
            const firstTodoItem = [...unorderedList.children][0];
            const lastItem = [...unorderedList.children][
              lengthOfUnorderedListMinusOne
            ];
            // change tabindex of checked and delete btn
            singleTargetChangeTabindexCheckedAndDeleteBtn(lastItem, "-1");
            singleTargetChangeTabindexCheckedAndDeleteBtn(firstTodoItem, "0");
            // change tabindex of todo listitem
            lastItem.setAttribute("tabindex", "-1");
            firstTodoItem.setAttribute("tabindex", "0");
            // focus first todo item
            const focusTodoArrowDown = keyboardFocusDragAndDropHelper(
              eventTargetClassName,
              firstTodoItem
            );
            focusTodoArrowDown.focus();
            // keyboardChangeTabindexDraggedClassFocusElementAndCheckedDeleteBtnChildren(
            //   event.target.closest("li"),
            //   firstTodoItem,
            //   event.target
            // );
          } else {
            // focus next sibling
            keyboardChangeTabindexDraggedClassFocusElementAndCheckedDeleteBtnChildren(
              [...unorderedList.children],
              indexOfCurrentTodoItem,
              event.code,
              eventTargetClassName
            );
          }
          // console.log(event.target);
          // focus element here
          // console.log(event.target);
          // event.target.focus();
          // check for border top on views container
          document
            .querySelector(".views-container")
            .getAttribute("data-unorderedhasitems") != "true"
            ? addOrRemoveTopBorderToViewsContainer("true")
            : null;
          break;
        case "ArrowUp":
          event.preventDefault();
          // use event.target.closest("li")
          // to get parent and previous sibling
          const previousSibling = todoElement.previousElementSibling;
          const unorderedListChildrenAfterSwappingTodoItems =
            cachedData.dragItemSelected
              ? Number(getGrabDragIndexAttr(todoElement) == 0)
                ? keyboardMoveTopItemToBottomOfList([...unorderedList.children])
                : keyboardSwapTodoItemChild(
                    [...unorderedList.children],
                    indexOfCurrentTodoItem,
                    event.code
                  )
              : null;
          if (cachedData.dragItemSelected) {
            // empty assistive text content
            assistiveTextContainer.innerText = "";
            arrowUpAndDownSwappingItemsHelper(
              cachedData.currentView,
              unorderedListChildrenAfterSwappingTodoItems
            );
          }

          // change tabindex of todo item and its children checked and delete btn
          if (previousSibling == null) {
            // first todo item
            const firstTodo = [...unorderedList.children][0];
            // last todo item
            const lastTodoItem = [...unorderedList.children][
              lengthOfUnorderedListMinusOne
            ];
            // change tabindex of checked and delete btn
            singleTargetChangeTabindexCheckedAndDeleteBtn(firstTodo, "-1");
            singleTargetChangeTabindexCheckedAndDeleteBtn(lastTodoItem, "0");
            // change tabindx of todo item
            firstTodo.setAttribute("tabindex", "-1");
            lastTodoItem.setAttribute("tabindex", "0");
            // focus last todo item
            // lastTodoItem.focus();
            const focusTodoArrowUp = keyboardFocusDragAndDropHelper(
              eventTargetClassName,
              lastTodoItem
            );
            focusTodoArrowUp.focus();
            // keyboardChangeTabindexDraggedClassFocusElementAndCheckedDeleteBtnChildren(
            //   event.target.closest("li"),
            //   lastTodoItem,
            //   event.target
            // );
          } else {
            // focus previous sibling
            keyboardChangeTabindexDraggedClassFocusElementAndCheckedDeleteBtnChildren(
              [...unorderedList.children],
              indexOfCurrentTodoItem,
              event.code,
              eventTargetClassName
            );
          }
          // focus element here
          // console.log(event.target);
          // event.target.focus();
          // check for border top on views container
          document
            .querySelector(".views-container")
            .getAttribute("data-unorderedhasitems") != "true"
            ? addOrRemoveTopBorderToViewsContainer("true")
            : null;
          break;
      }
    }
  }

  /**
   * mouse drag and drop
   * **/

  /**
   * add drag start event
   * **/

  function applyDragStartEventToDiv(divElement) {
    //
    applyEventListener(divElement, "dragstart", mouseDragStart, false);
  }

  /**
   * add drag drop
   * **/

  function applyDragDropEventToListitem(listitem) {
    //
    applyEventListener(listitem, "dragenter", mouseDragEnter, false);
    applyEventListener(listitem, "drop", mouseDragDrop, false);
    applyEventListener(listitem, "dragleave", mouseDragLeave, false);
    applyEventListener(listitem, "dragover", mouseDragOver, false);
  }

  /**
   * more helper func
   * **/

  /**
   * mouse drag helper
   * **/

  /**
   * mouse drag start
   * **/

  function mouseDragStart(event) {
    // saving reference of todo item in cachedObj
    cachedData.dragSourceElement = event.target.parentElement;
    // getting grabbedItemDataIndex for swapping algorithm
    cachedData.grabbedItemDataIndex =
      event.target.parentElement.getAttribute("data-grabDragIndex");
    // unorderedlist children
    const currentUnorderedListChildren = [...unorderedList.children];
    // find todo item that has tabindex 0
    // todo item with tabindex = "0"
    console.log(currentUnorderedListChildren);
    const [todoWithTabindexZero] = currentUnorderedListChildren.filter(
      function findItemWithTabindexZero(listitem, index) {
        const listitemTabindex = Number(listitem.getAttribute("tabindex"));
        return listitemTabindex == 0;
      }
    );
    // parent listitem of draggable div
    const parentOfDraggableDiv = event.target.closest("li");
    console.log(todoWithTabindexZero);
    console.log(parentOfDraggableDiv);
    // check to see if draggable div parent listitem does not equal != to item with tabindex 0
    if (todoWithTabindexZero != parentOfDraggableDiv) {
      // when todo item with tabindex = "0" and draggable div element parent listitem
      // not equal to each swap attrs: tabindex, dragselected
      // checked and delete btn tabindex
      // drag selected of todo item
      keyboardAndMouseChangeDraggedClass(
        todoWithTabindexZero,
        parentOfDraggableDiv
      );
      // tabindex of todo item
      todoWithTabindexZero.setAttribute("tabindex", "-1");
      parentOfDraggableDiv.setAttribute("tabindex", "0");
      // tabindex of checked and delete btns
      // current todo with tabindex 0 change it to -1
      singleTargetChangeTabindexCheckedAndDeleteBtn(todoWithTabindexZero, "-1");
      // parent todo item of draggable div change assign "0" to attr tabindex
      singleTargetChangeTabindexCheckedAndDeleteBtn(parentOfDraggableDiv, "0");
      // focus parent todo item
      parentOfDraggableDiv.focus();
    }
  }

  /**
   * mouse drag enter
   * **/

  function mouseDragEnter(event) {
    event.target.closest("li").setAttribute("data-dragOver", "true");
  }

  /**
   * mouse drag drop
   * **/

  function mouseDragDrop(event) {
    /**
     * we could use keyword this because only the todo listitem should have the event drop
     * applied to it
     * **/
    event.target.closest("li").setAttribute("data-dragOver", "false");
    // copy unorderedlist children
    const copyOfUnorderedListChildren = [...unorderedList.children];
    // grabbed todo item
    const grabbedTodoElement = cachedData.dragSourceElement;
    // dropped todo item
    const droppedEventTodoElement = event.target.closest("li");
    /**
     * run algorithm below when grabbed todo element does not equal (!=)
     * to dropped todo element
     **/
    if (grabbedTodoElement != droppedEventTodoElement) {
      // access grabbed item grabdragindex from cachedData obj
      const grabbedTodoElementGrabDragIndex = cachedData.grabbedItemDataIndex;
      // get data-grabdragindex of dropped todo item
      const droppedEventElementGrabDragIndex = Number(
        droppedEventTodoElement.getAttribute("data-grabDragIndex")
      );
      // array of items above dropped element index
      const itemsAboveDroppedEventTodo = itemsAboveDroppedArea(
        copyOfUnorderedListChildren,
        droppedEventElementGrabDragIndex
      );
      // array of items below dropped element index
      const itemsBelowDroppedEventTodo = itemsBelowDroppedArea(
        copyOfUnorderedListChildren,
        droppedEventElementGrabDragIndex
      );
      /**
       * filter out grabbed todo item from array above
       * **/

      // array of items above dropped element index without grabbed todo item
      const listitemsAboveDroppedWithOutGrabbedTodo = filterOutGrabbedTodoItem(
        itemsAboveDroppedEventTodo,
        grabbedTodoElement
      );
      // array of items below dropped element index without grabbed todo item
      const listitemBelowDroppedWithoutGrabbedTodo = filterOutGrabbedTodoItem(
        itemsBelowDroppedEventTodo,
        grabbedTodoElement
      );
      // use ternary operator to run func that will return an array with grabbed item above dropped item
      // and array with grabbed item below dropped item
      // dropped element data-index less then < grabbed data index, grabbed element goes above dropped element
      // dropped element data-index greater than > grabbed data index, grabbed element goes below dropped element
      const arrayOfItemsAfterRearrangeTodos =
        droppedEventElementGrabDragIndex < grabbedTodoElementGrabDragIndex
          ? grabbedElementGoesAbove(
              listitemsAboveDroppedWithOutGrabbedTodo,
              listitemBelowDroppedWithoutGrabbedTodo,
              grabbedTodoElement,
              droppedEventTodoElement
            )
          : grabbedElementGoesBelow(
              listitemsAboveDroppedWithOutGrabbedTodo,
              listitemBelowDroppedWithoutGrabbedTodo,
              grabbedTodoElement,
              droppedEventTodoElement
            );
      // use array in switch algorithm where we will run algorithm based on current view
      arrowUpAndDownSwappingItemsHelper(
        cachedData.currentView,
        arrayOfItemsAfterRearrangeTodos
      );
    }
    // since we saved a reference to grabbed todo item we can call/execute/run .focus() method
    // on that reference
    grabbedTodoElement.focus();
  }

  /**
   * mouse drag leave
   * **/

  function mouseDragLeave(event) {
    //
    event.target.closest("li").setAttribute("data-dragOver", "false");
  }

  /**
   * mouse drag over
   * **/

  function mouseDragOver(event) {
    //
    event.preventDefault();

    event.target.closest("li").setAttribute("data-dragOver", "true");
  }

  /**
   * mouse drag helper
   * **/

  /**
   * items above dropped area element
   * **/

  function itemsAboveDroppedArea(array, droppedElementIndex) {
    // [0,1,2,3,4]
    //dropppedIndex is 2
    // func will return [0,1]
    const copiedArray = [...array];
    return copiedArray.slice(0, droppedElementIndex);
  }

  /**
   * items below dropped area element
   * **/

  function itemsBelowDroppedArea(array, droppedElementIndex) {
    // [0,1,2,3,4]
    //dropppedIndex is 2
    // func will return [3,4]
    const copyOfArray = [].concat(array);
    return copyOfArray.slice(droppedElementIndex + 1);
  }

  /**
   * filter out grabbed element
   * **/

  function filterOutGrabbedTodoItem(array, grabbedTodoItem) {
    // filter method will eiter return an array without listitem that matches dataIndex
    // instead of passing the grabbed todo item index saved as a reference in cachedData
    // we will use saved reference of the actually grabbed todo item
    // or original array;

    return array.filter(function removeTodoItem(listItem) {
      // const elementgrabbedIndex = listItem.getAttribute("data-grabDragIndex");
      return listItem != grabbedTodoItem;
    });
  }

  /**
   * making array of reordered todo items
   * **/

  /**
   * grabbed element goes above
   * **/

  function grabbedElementGoesAbove(
    itemsAbove,
    itemsBelow,
    grabbedElement,
    droppedElement
  ) {
    return [...itemsAbove, grabbedElement, droppedElement, ...itemsBelow];
  }

  /**
   * grabbed element goes below
   * **/

  function grabbedElementGoesBelow(
    itemsAbove,
    itemsBelow,
    grabbedElement,
    droppedElement
  ) {
    return [...itemsAbove, droppedElement, grabbedElement, ...itemsBelow];
  }

  /**
   * keyboard drag helper
   * **/

  /**
   * get drag index attr
   * **/

  function getGrabDragIndexAttr(element) {
    return element.getAttribute("data-grabDragIndex");
  }

  /**
   * swap items child element
   * **/

  function keyboardSwapTodoItemChild(
    array,
    todoItemIndex,
    arrowUpOrDownKeyCode
  ) {
    /**
     * working with swapping value of data-todoCompleted
     * another approach copy unorderlist children array
     * make copy of an array with item(s) before current element index
     * get current element item
     * get next sibling item to current item
     * make copy of array with item(s) after next sibling of current item
     * make this array [beforeItems, nextSibling, currentItem, afteritems]
     * **/
    const beforeItems =
      arrowUpOrDownKeyCode == "ArrowDown"
        ? array.slice(0, todoItemIndex)
        : array.slice(0, todoItemIndex - 1);
    /**
     * index is 2
     * **/
    // [0,1,2,3,4,5].slice(0,2) => [0,1]
    // [0,1,2,3,4,5].slice(0,2-1) => [0]
    const currentTodoItem = array[todoItemIndex];
    // currentitem => [2]
    const prevOrNextSibling =
      arrowUpOrDownKeyCode == "ArrowDown"
        ? array[todoItemIndex + 1]
        : array[todoItemIndex - 1];
    // arrowdown => [3]
    // arrowup => [1]
    const arrayOfSiblingAndCurrentTodoItem =
      arrowUpOrDownKeyCode == "ArrowDown"
        ? [prevOrNextSibling, currentTodoItem]
        : [currentTodoItem, prevOrNextSibling];

    const afterItems =
      arrowUpOrDownKeyCode == "ArrowDown"
        ? array.slice(todoItemIndex + 2)
        : array.slice(todoItemIndex + 1);
    // arrowdown
    // [0,1,2,3,4,5].slice(2+2) => [4,5]
    // arrowup
    // [0,1,2,3,4,5].slice(2+1) => [3,4,5]
    return [...beforeItems, ...arrayOfSiblingAndCurrentTodoItem, ...afterItems];
    /**
     * algorithm below we swapped todo listitem firstChildElement
     * the div container of text,checked and delete btn
     * **/
    // get current list item child
    // const currentTodoItemChild = currentFocusElement.firstElementChild;
    // // get replaceElement item child
    // const replaceElementTodoItemChild = replaceElement.firstElementChild;
    // // remove current list item child
    // currentFocusElement.removeChild(currentTodoItemChild);
    // // append replaceElement item child to current list item element
    // currentFocusElement.append(replaceElementTodoItemChild);
    // // append current list item child to replaceElement list item element
    // replaceElement.append(currentTodoItemChild);

    // return Array.prototype.slice.call(
    //   currentFocusElement.parentElement.children
    // );
  }

  /**
   * change tabindex dragged class and focus
   * **/

  function keyboardChangeTabindexDraggedClassFocusElementAndCheckedDeleteBtnChildren(
    ulChildren,
    elementIndex,
    arrowUpOrDownKeyPressed,
    targetClassName
  ) {
    /**
     * elementIndex will by number type
     * **/
    const prevElement = ulChildren[elementIndex];
    // when arrowUpOrDownKeyPressed is ArrowDown take elementIndex subtract 1
    // when it is ArrowUp take elementIndex add 1
    const focusElementIndex =
      arrowUpOrDownKeyPressed == "ArrowDown"
        ? elementIndex + 1
        : elementIndex - 1;
    const focusTodoElement = ulChildren[focusElementIndex];
    // const focusElement
    // if (cachedData.dragItemSelected) {
    //   // assign "true" focusElement
    //   previousElement.setAttribute("data-dragselected", "true");
    //   // assign "false" previousElement
    //   focusElement.setAttribute("data-dragselected", "false");
    // }
    if (cachedData.dragItemSelected) {
      const focusThisElement = keyboardFocusDragAndDropHelper(
        targetClassName,
        focusTodoElement
      );
      focusThisElement.focus();
    } else {
      // keyboardAndMouseChangeDraggedClass(prevElement, focusTodoElement);
      // change checked and delete btn tabindex to -1
      singleTargetChangeTabindexCheckedAndDeleteBtn(prevElement, "-1");
      // change checked and delete btn tabindex to 0
      singleTargetChangeTabindexCheckedAndDeleteBtn(focusTodoElement, "0");
      // call method .focus on focusTarget
      // focusTarget could be todoListItem, checkedBtn, and deleteBtn
      // focusTarget.focus();
      // apply tabindex = "-1" to current todo item
      prevElement.setAttribute("tabindex", "-1");
      // apply tabindex = "0" to focus todo item
      focusTodoElement.setAttribute("tabindex", "0");
      const focusTarget = keyboardFocusDragAndDropHelper(
        targetClassName,
        focusTodoElement
      );
      focusTarget.focus();
    }
  }

  /**
   * focus drag and drop helper
   * **/

  function keyboardFocusDragAndDropHelper(elementClass, focusListitem) {
    // const targetTagName = keydownTarget.tagName;
    /**
     * algorithm when we were using tagName
     **/
    // if (tagName == "LI") {
    //   return focusListitem;
    // }
    // if (tagName == "BUTTON") {
    //   const classOfBtn = keydownTarget.getAttribute("class");
    //   if (classOfBtn == "checked-btn") {
    //     return focusListitem.firstElementChild.children[0].firstElementChild;
    //   }
    //   if (classOfBtn == "delete-btn") {
    //     return focusListitem.firstElementChild.children[2];
    //   }
    // }
    /**
     * since our todo item class will always be todo-item we will use
     * element class name instead of element tagName
     * **/
    switch (elementClass) {
      case "todo-item":
        return focusListitem;
      case "checked-btn":
        return focusListitem.firstElementChild.children[0].firstElementChild;
      case "delete-btn":
        return focusListitem.firstElementChild.children[2];
    }
  }

  /**
   * keyboard swapping todo items helper
   * **/

  function arrowUpAndDownSwappingItemsHelper(view, array) {
    switch (view) {
      case "All":
        cachedData.arraysOfDifferentViews.allViewArray = [...array];
        const arrowCopiedAllViewArray =
          cachedData.arraysOfDifferentViews.allViewArray;
        /**
         * update tabindex of each listitem in allView array before we filter out the listitems
         * for active and completed array
         * **/
        assignAllViewIndexElementsInAllViewArr(arrowCopiedAllViewArray);
        // filter out todocompleted = "false", active list
        cachedData.arraysOfDifferentViews.activeViewArray =
          filterOutActiveTodoItems(arrowCopiedAllViewArray);
        // filter out todocompleted = "true", completed lsit
        cachedData.arraysOfDifferentViews.completedViewArray =
          filterOutCompletedTodoItems(arrowCopiedAllViewArray);
        // save original order of allViewIndex for active and completed
        // active view
        cachedData.originalElementOrderInAllViewArray.activeViewOriginalOrder =
          originalAllViewIndexForElementsInActiveOrCompletedArray(
            cachedData.arraysOfDifferentViews.activeViewArray
          );
        // completed view
        cachedData.originalElementOrderInAllViewArray.completedViewOriginalOrder =
          originalAllViewIndexForElementsInActiveOrCompletedArray(
            cachedData.arraysOfDifferentViews.completedViewArray
          );
        // append todo items in all view array to unorderlist
        const arrowAllView = assignAttrToArrayAndCreateListitem(
          arrowCopiedAllViewArray,
          updateAttrForTodoItemCheckedAndDeleteBtn,
          createChildrenForUnorderedList
        );
        removeCurrentListitemsAppendFragmentElement(
          unorderedList,
          arrowAllView
        );
        break;
      // const ;
      case "Active":
        const arrowCopiedUnorderChildrenActiveView = [...array];
        allViewIndexForReorderOfActiveOrCompletedArray(
          arrowCopiedUnorderChildrenActiveView
        );
        const correctOrderOfTodo =
          updateAllViewArrayWithCorrectOrderAfterDragDropInActiveOrCompletedView(
            arrowCopiedUnorderChildrenActiveView,
            cachedData.arraysOfDifferentViews.completedViewArray
          );
        cachedData.arraysOfDifferentViews.allViewArray = [
          ...correctOrderOfTodo,
        ];
        const copiedAllViewArrowActive = Array.prototype.slice.call(
          cachedData.arraysOfDifferentViews.allViewArray
        );
        // filter out todocompleted = "false", active list
        cachedData.arraysOfDifferentViews.activeViewArray =
          filterOutActiveTodoItems(copiedAllViewArrowActive);
        // filter out todocompleted = "true", completed lsit
        cachedData.arraysOfDifferentViews.completedViewArray =
          filterOutCompletedTodoItems(copiedAllViewArrowActive);
        const arrowActiveView = assignAttrToArrayAndCreateListitem(
          cachedData.arraysOfDifferentViews.activeViewArray,
          updateAttrForTodoItemCheckedAndDeleteBtn,
          createChildrenForUnorderedList
        );
        removeCurrentListitemsAppendFragmentElement(
          unorderedList,
          arrowActiveView
        );
        break;
      case "Completed":
        const arrowCopiedUnorderChildrenCompletedView = [...array];
        allViewIndexForReorderOfActiveOrCompletedArray(
          arrowCopiedUnorderChildrenCompletedView
        );

        const correctOrderOfItems =
          updateAllViewArrayWithCorrectOrderAfterDragDropInActiveOrCompletedView(
            arrowCopiedUnorderChildrenCompletedView,
            cachedData.arraysOfDifferentViews.activeViewArray
          );
        cachedData.arraysOfDifferentViews.allViewArray = [
          ...correctOrderOfItems,
        ];
        const copiedAllViewArrowCompleted = Array.prototype.slice.call(
          cachedData.arraysOfDifferentViews.allViewArray
        );
        // filter out todocompleted = "false", active list
        cachedData.arraysOfDifferentViews.activeViewArray =
          filterOutActiveTodoItems(copiedAllViewArrowCompleted);
        // filter out todocompleted = "true", completed lsit
        cachedData.arraysOfDifferentViews.completedViewArray =
          filterOutCompletedTodoItems(copiedAllViewArrowCompleted);
        const arrowCompletedView = assignAttrToArrayAndCreateListitem(
          cachedData.arraysOfDifferentViews.completedViewArray,
          updateAttrForTodoItemCheckedAndDeleteBtn,
          createChildrenForUnorderedList
        );
        removeCurrentListitemsAppendFragmentElement(
          unorderedList,
          arrowCompletedView
        );
        break;
    }
  }

  /**
   * keyboardMoveBottomItemToTopOfList
   * **/

  function keyboardMoveBottomItemToTopOfList(unorderedList) {
    // calling keyboardChangeTabindexDraggedClassFocusElementAndCheckedDeleteBtnChildren
    // after running algorithm that will move top item to bottom of list
    /**
     * dont have to call func above because we are swapping the li and not the div that is a child of the todo item
     * the todo item(li) will keep its tabindex value either "0" or "-1"
     * **/
    // const arrayOfItems = Array.prototype.slice.call(unorderedList);
    const arrayOfItems = unorderedList;
    const lengthOfArray = arrayOfItems.length;
    const lastItem = arrayOfItems[lengthOfArray - 1];
    const topOfList = arrayOfItems.slice(0, lengthOfArray - 1);
    return [lastItem, ...topOfList];
  }

  /**
   * keyboardMoveTopItemToBottomOfList
   * **/

  function keyboardMoveTopItemToBottomOfList(unorderedList) {
    // calling keyboardChangeTabindexDraggedClassFocusElementAndCheckedDeleteBtnChildren
    // after running algorithm that will move bottom item to top of list
    /**
     * dont have to call func above because we are swapping the li and not the div that is a child of the todo item
     * the todo item(li) will keep its tabindex value either "0" or "-1"
     * **/
    // const lengthOfTodoItems = unorderedList.length;
    // const [firstItem, ...bottomOfTodoItemsList] = Array.prototype.slice.call(unorderedList);
    const [firstItem, ...bottomOfTodoItemsList] = unorderedList;
    return [...bottomOfTodoItemsList, firstItem];
  }

  /**
   * changeDraggedClass
   * **/

  function keyboardAndMouseChangeDraggedClass(previousElement, currentTarget) {
    if (cachedData.dragItemSelected) {
      // both previous element and current target have to be the todo listitem
      // change dragSelected to false for previousElement with dragSelected true
      previousElement.setAttribute("data-dragSelected", "false");
      // change dragSelected to true to currentTarget which is clicked div with draggable true parent element that todo listitem
      currentTarget.setAttribute("data-dragSelected", "true");
      /**
       * we can swap data-todocomplete attr here
       * our swap algorithm will swap todo listitem instead of the div that holds the todo item content
       * we dont have to swap the todo item completed status
       * **/
      // get todoCompleted value
      // const pervElementStatus =
      //   previousElement.getAttribute("data-todoCompleted");
      // const currentElementStatus =
      //   currentTarget.getAttribute("data-todoCompleted");
      // // set todoCompleted value
      // previousElement.setAttribute("data-todoCompleted", currentElementStatus);
      // currentTarget.setAttribute("data-todoCompleted", pervElementStatus);
    }
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
      ].value = `todo-item-${index}`;
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

  /**
   * ************
   * looks like there is a live link to the items in our allview, active and completed array
   * in our cachedObj so when we change current view our algorithm is assigning tabindex = "0"
   * to the top item of that view (its array) which is the item at index = 0
   * but it is also assign tabindex = "0" to that item in allview array
   * ************
   * one solution is to loop through allview array change tabindex of all items to "-1"
   * also change tabindex of the todo item checked and delete btn to "-1"
   * ************
   *
   * ************
   * **/

  function applyFocusToSelectedTodoWhenCheckedDeleteBtnOrListitemIsClicked(
    target,
    previousTarget
  ) {
    /**
     * at least one todo item will have tabindex = "0"
     * **/
    // assign the value of "true" to clicked todo item data-dragSelected
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
      if (cachedData.dragItemSelected) {
        // previousTarget will have tabindex "0" and data-dragSelected = "true"
        previousTarget.setAttribute("data-dragSelected", "false");
        target.closest("li").setAttribute("data-dragSelected", "true");
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

  function applyFocusChangeTabindexSingleTarget(target, tabindexValue) {
    if (cachedData.dragItemSelected) {
      // previousTarget will have tabindex "0" and data-dragSelected = "true"
      // previousTarget.setAttribute("data-dragSelected", "false");
      target.closest("li").setAttribute("data-dragSelected", "true");
    }
    // when user click on list item, we want to assign value "0" to that list item
    // and assign value of "-1" to the previous list item that had tabindex "0"
    // previousTarget.setAttribute("tabindex", "-1");
    target.closest("li").setAttribute("tabindex", tabindexValue);
    // target.closest("li").focus();
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

  function singleTargetChangeTabindexCheckedAndDeleteBtn(
    target,
    tabindexValue
  ) {
    // checked btn
    target.firstElementChild.children[0].firstElementChild.attributes[
      "tabindex"
    ].value = tabindexValue;
    // delete btn
    target.firstElementChild.children[2].attributes["tabindex"].value =
      tabindexValue;
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
    /**
     * instead of looping through array of items looking for element with tabindex = "0"
     * we can use document.querySelector("li[tabindex='0']");
     * since there should only be one element/todo item with attr
     * tabindex = "0"
     * **/
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
    null);
  }

  /**
   * filter out element with tabindex = "0"
   * **/

  function arrayOfItemsWithTabindexZero(array) {
    // using filter method
    return array.filter(function findElementWithTabindexZero(listitem) {
      const elementTabindex = Number(listitem.getAttribute("tabindex"));
      return elementTabindex == 0;
    });
    // usin reduce method
    // return array.reduce(function findElementWithTabindexZero(buildingUp, currentListitem) {
    //   const elementTabindex = Number(currentListitem.getAttribute("tabindex"));
    //   if (elementTabindex == 0) {
    //     buildingUp.push(currentListitem);
    //   }
    //   return buildingUp;
    // }, []);
  }

  /**
   * loop through array change tabindex to "-1"
   * **/

  function changeListitemTabindexToNegativeOne(array, stringValue) {
    array.forEach(function changeTabindexValue(listitem) {
      singleTargetChangeTabindexCheckedAndDeleteBtn(listitem, stringValue);
      applyFocusChangeTabindexSingleTarget(listitem, stringValue);
    });
  }

  /**
   * filter out element with attr dragged selected value "true"
   * **/

  function arrayOfItemsWithDragSelectedTrue(array) {
    return array.filter(function findDragSelectedTrue(listitem) {
      const dragSelectedValue = listitem.getAttribute("data-dragSelected");
      return dragSelectedValue == "true";
    });
  }

  /**
   * change drag selected to string "false"
   * **/

  function changeAllItemDragSelected(array, strValue) {
    array.forEach(function changeDragSelected(listitem) {
      listitem.setAttribute("data-dragSelected", strValue);
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
    // list.forEach(function addAllViewIndexToArray(listitem) {
    //   const itemAllViewIndex = listitem.getAttribute("data-allviewindex");
    //   // algorithm below will get array in cachedObj of obj originalElementOrderInAllViewArray
    //   // based on string we pass in
    //   cachedData.originalElementOrderInAllViewArray[
    //     `${stringForObjAccess}OriginalOrder`
    //   ].push(itemAllViewIndex);
    // });
    // use reduce to return an array of original allview index
    return list.reduce(function addAllViewIndexToArray(
      buildingUp,
      currentValue
    ) {
      const itemAllViewIndex = currentValue.getAttribute("data-allviewindex");
      buildingUp.push(itemAllViewIndex);
      return buildingUp;
    },
    []);
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
    secondArray
  ) {
    /** when user is on active or completed view **/
    // spread active array and completed array in cachedObj into one array
    // run sort method on array. we will sort by allView index of items in array
    const copiedActive = firstArray;
    const copiedCompleted = secondArray;
    const combineBothArrays = [...copiedActive, ...copiedCompleted];
    const correctOrderOfTodoItems = combineBothArrays.sort(
      // sort based on item data-allviewindex
      function correcrTheOrderOfTodo(firstItem, secondItem) {
        // firstItem allviewindex
        const firstItemAllViewIndex = Number(
          firstItem.getAttribute("data-allviewindex")
        );
        // secondItem allviewindex
        const secondItemAllViewIndex = Number(
          secondItem.getAttribute("data-allviewindex")
        );
        if (firstItemAllViewIndex < secondItemAllViewIndex) return -1;
        if (secondItemAllViewIndex < firstItemAllViewIndex) return 1;
        return 0;
      }
    );
    /**
     * different approach since we will be working with ul children instead
     * of arrays in cachedObj
     * sticking with original algorithm for now
     * **/
    // const copiedArray = [...array];
    // let combinedArrays = [];
    // const copiedArray = [].concat(array);
    // const copiedArray = array.slice();

    return correctOrderOfTodoItems;
  }

  /**
   * combine arrays based on current view
   * **/

  function combineArraysBasedOnCurrentView(array) {
    const copiedArray = [...array];
    switch (cachedData.currentView) {
      case "Active":
        return;
      case "Completed":
        return;
    }
  }

  /**
   * correct order of todo items after swapping
   * **/

  function correctOrderOfTodoItemsAfterSwapping(combinedArray) {}

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
    const digitElementForItemsLeft = document.querySelector("#views-counter");
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
      .querySelector(".views-container")
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
    matchingAllViewIndexItemInAllViewArray.firstElementChild.children[0].setAttribute(
      "data-checked",
      "true"
    );
    // checked btn
    matchingAllViewIndexItemInAllViewArray.firstElementChild.children[0].firstElementChild.setAttribute(
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
    matchingAllViewIndexItemInAllViewArray.firstElementChild.children[0].setAttribute(
      "data-checked",
      "false"
    );
    // checked btn
    matchingAllViewIndexItemInAllViewArray.firstElementChild.children[0].firstElementChild.setAttribute(
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
    const allViewIndex = Number(listitem.getAttribute("data-allViewIndex"));
    // current view array index
    const currentViewArrayIndex = Number(
      listitem.getAttribute("data-grabDragIndex")
    );
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
    todoItemParent
  ) {
    const showAllView = assignFunc(
      array,
      updateAttrForTodoItemCheckedAndDeleteBtn,
      createChildrenForUnorderedList
    );
    removeCurrentFunc(todoItemParent, showAllView);
    // currentView.removeAttribute("data-currentview");
    // previousSibling.setAttribute("data-currentview", "");
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
      dragItemSelected: false,
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
    // assistive-text element
    const assistiveTextContainer = document.querySelector(".assistive-text");
    return {
      mainElement,
      unorderedList,
      toggleThemeBtn,
      checkedBtn,
      assistiveTextContainer,
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
  {
    // Read for 1 hour
    // Jog around block
    // Complete Challenges
    // Walk dog
    // Learn more a11y
  }
})();
