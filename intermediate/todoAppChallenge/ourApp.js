(function scopeOurVariables() {
  document
    .querySelector("ul[role='listbox']")
    .addEventListener("click", function TODO(event) {
      console.log(event.target);
    });
})();
