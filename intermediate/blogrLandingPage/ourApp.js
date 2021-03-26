function ourSelectors() {
  var hamburgerElement = document.querySelector(".hamburger");

  return {
    hamburgerElement,
  };
}

toggleNavMenu();

function toggleNavMenu({ hamburgerElement } = ourSelectors()) {
  hamburgerElement.addEventListener("click", function addClass(event) {
    this.classList.toggle("open");
  });
  hamburgerElement.addEventListener(
    "keydown",
    function keyboardFunctionality(event) {
      event.preventDefault();
      console.log(event);
      var keyPressed = event.code;
      switch (keyPressed) {
        case "Space":
          this.classList.toggle("open");
          break;
        case "Enter":
          this.classList.toggle("open");
          break;
      }
    }
  );
}
