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
}
