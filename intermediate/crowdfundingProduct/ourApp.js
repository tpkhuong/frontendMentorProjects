function ourSelectors() {
  var navBar = document.querySelector(".nav-list");

  return {
    navBar,
  };
}

toggleNavMenu();

function toggleNavMenu() {
  var { navBar } = ourSelectors();
  var toggleButton = document.querySelector(".headernav button.img-container");

  toggleButton.addEventListener("click", function showMenu(event) {
    navBar.classList.toggle("hide-off-left");
  });
}
