(function scopeOurVariables() {
  // declare our selectors
  const { checkedBtn } = ourSelectors();
  // call our cached func
  const accessData = scopeOurData();
  const cachedData = accessData();
  document
    .querySelector("ul[role='listbox']")
    .addEventListener("click", function TODO(event) {
      console.log(event.target);
    });
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

  /**
   * cached our data
   * **/

  function scopeOurData() {
    const dataObj = {
      grabbedItemDataIndex: null,
      dragSourceElement: null,
      draggedItemSelected: false,
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

    // checked btn
    const checkedBtn = Array.prototype.slice.call(
      document.querySelectorAll(".checked-btn")
    );
    return {
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
