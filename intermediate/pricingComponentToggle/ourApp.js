(function scopeOurVariables() {
  alert("access element innerText change its value");
  alert("make our algorithm more dynamic");
  //our selector at top of function
  const { toggleBtn, arrOfPriceElements } = ourSelectors();
  //call our functions
  addEventListeners();

  function addEventListeners() {
    toggleBtn.addEventListener("click", toggleBetweenPricePlan);
  }

  function toggleBetweenPricePlan() {
    var ariaPressedOfBtn = this.getAttribute("aria-pressed");
    console.log(arrOfPriceElements);
    if (ariaPressedOfBtn == "false") {
      //   this.setAttribute("aria-pressed", "true");
      //or
      let arrOfMonthlyPrices = ["19.99", "24.99", "39.99"];
      this.attributes["aria-pressed"].value = "true";
      //monthly price
      recursiveFunc(arrOfPriceElements, arrOfMonthlyPrices);
    } else {
      let arrOfYearlyPrices = ["199.99", "249.99", "399.99"];
      //   this.setAttribute("aria-pressed", "false");
      this.attributes["aria-pressed"].value = "false";
      //or
      //annually price
    }
  }

  function recursiveFunc(arrOfElements, arrOfPrices, index = 0) {
    var lengthOfArr = arrOfElements.length;

    if (index === lengthOfArr) {
      return;
    }
    var elementValue = arrOfElements[index];
    var priceValue = arrOfPrices[index];
    console.log(elementValue.innerText);
    console.log(priceValue);
    recursiveFunc(arrOfElements, arrOfPrices, index + 1);
  }

  function ourSelectors() {
    //btn
    var toggleBtn = document.querySelector(".toggle-container__button");
    //array of price elements
    // var arrOfPriceElements = Array.prototype.slice.call(
    //   document.querySelectorAll(".plan-card__price-wrapper__price")
    // );
    var arrOfPriceElements = Array.from(
      document.querySelectorAll(".plan-card__price-wrapper__price")
    );
    return {
      toggleBtn,
      arrOfPriceElements,
    };
  }
})();
