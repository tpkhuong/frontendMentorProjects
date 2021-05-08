function ourSelectors() {
  var navBar = document.querySelector(".nav-list");
  // var quantitySelectors = Array.prototype.slice.call(
  //   document.querySelectorAll(".quantity-digit")
  // );
  var quantitySelectors = Array.from(
    document.querySelectorAll(".quantity-digit")
  );
  return {
    navBar,
    quantitySelectors,
  };
}

toggleNavMenu();
addFadedOpacity();
function toggleNavMenu() {
  var { navBar } = ourSelectors();
  var toggleButton = document.querySelector(".headernav button.img-container");

  toggleButton.addEventListener("click", function showMenu(event) {
    navBar.classList.toggle("hide-off-left");
  });
}

function addFadedOpacity() {
  var { quantitySelectors } = ourSelectors();

  var quantityIsZero = quantitySelectors.reduce(function findZeroLeft(
    buildingUp,
    currentValue
  ) {
    var converToNum = Number(currentValue.innerText);
    if (converToNum === 0) {
      return [...buildingUp, currentValue];
    }
    return buildingUp;
  },
  []);
  console.log(quantityIsZero);
}
