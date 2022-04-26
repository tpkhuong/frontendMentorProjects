(function scopeOurVariables() {
  // our selectors
  const selectBtnModal = document.querySelector(".user-select-btns");
  const closeBtnModal = document.querySelector(".close-select-user-modal");
  // add click to select user button
  applyEvent(
    document.querySelector(".select-user-btn"),
    "click",
    showSelectUserButtons
  );
  // add click to close user modal button
  applyEvent(
    document.querySelector(".close-select-user-modal"),
    "click",
    hideSelectUserButtons
  );
  // show select user buttons modal
  function showSelectUserButtons(event) {
    const statusOfSelectUserModal = selectBtnModal.getAttribute(
      "userclickselectuser"
    );
    if (statusOfSelectUserModal == "false") {
      selectBtnModal.setAttribute("userclickselectuser", "true");
    }
  }
  // hise select user buttons modal
  function hideSelectUserButtons(event) {
    const statusOfSelectUserModalCloseBtn = selectBtnModal.getAttribute(
      "userclickselectuser"
    );
    if (statusOfSelectUserModalCloseBtn == "true") {
      selectBtnModal.setAttribute("userclickselectuser", "false");
    }
    // ternary operator
    statusOfSelectUserModalCloseBtn == "true"
      ? selectBtnModal.setAttribute("userclickselectuser", "false")
      : null;
  }
  document.addEventListener;
  // add event listener
  function applyEvent(element, eventListener, func) {
    element.addEventListener(eventListener, func);
  }
  function useLocalStorage() {}
})();
