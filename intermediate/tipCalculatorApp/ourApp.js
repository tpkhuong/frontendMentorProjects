(function scopeOurVariables() {
  //selector elements variable top of function
  alert("when user click on % btn set custom input to empty string");
  var {
    billInput,
    customPercentInput,
    numOfPeopleInput,
    containerOfPercentBtns,
    arrOfPercentBtns,
    spanAboveNumOfPeopleInput,
    spanOfTipPerPersonDisplay,
    spanOfTotalPerPersonDisplay,
  } = ourSelectors();

  function ourSelectors() {
    //input element
    var billInput = document.querySelector("#bill-input");
    var customPercentInput = document.querySelector(
      '[type="text"][placeholder="Custom"]'
    );
    var numOfPeopleInput = document.getElementById("quantity-people");
    //   var arrOfPercentBtns = Array.prototype.slice.call(
    //     document.querySelectorAll(".tip-amt-btn")
    //   );
    //container of tip-amt-btns
    var containerOfPercentBtns = document.querySelector(".tip-amt-btns");
    var arrOfPercentBtns = Array.from(
      document.querySelectorAll(".tip-amt-btn")
    );
    //span with text "can't be zero"
    var spanAboveNumOfPeopleInput = document.getElementById(
      "empty-number-of-people"
    );
    // span element of tip and total person display
    var spanOfTipPerPersonDisplay = document.querySelector(
      ".tip-amt-person-display .tip-amt"
    );
    var spanOfTotalPerPersonDisplay = document.querySelector(
      ".total-amt-person-display .total-amt"
    );
    return {
      billInput,
      customPercentInput,
      numOfPeopleInput,
      containerOfPercentBtns,
      arrOfPercentBtns,
      spanAboveNumOfPeopleInput,
      spanOfTipPerPersonDisplay,
      spanOfTotalPerPersonDisplay,
    };
  }
  /* call our functions */

  addEventListenerToElements();
  resetInputsOnLoadOrReload();
  /* call our functions */
  function addEventListenerToElements() {
    containerOfPercentBtns.addEventListener("click", selectPercent);
    billInput.addEventListener("input", focusIsOnBillInput);
    customPercentInput.addEventListener("input", focusIsOnCustomInput);
    numOfPeopleInput.addEventListener("input", focusIsOnNumOfPeopleInput);
  }
  function focusIsOnBillInput(event) {
    //if user enter 0 we will set input to empty sting
    if (event.data === "0") {
      event.target.value = "";
    }
  }
  function focusIsOnCustomInput(event) {
    //if user enter 0 we will set input to empty sting
    if (event.data === "0") {
      event.target.value = "";
    }
  }
  function focusIsOnNumOfPeopleInput(event) {
    //if user enter 0 for number of people entry show text "can't be zero"
    var lengthOfNumOfPeopleInput = event.target.value.length;
    console.log(event.target.value.length);
    if (lengthOfNumOfPeopleInput === 1) {
      if (event.data === "0") {
        spanAboveNumOfPeopleInput.attributes["aria-hidden"].value = "false";
      }
    } else if (lengthOfNumOfPeopleInput > 1) {
      let valueOfInput = Number(event.target.value[0]);
      if (valueOfInput === 0) {
        spanAboveNumOfPeopleInput.attributes["aria-hidden"].value = "false";
      } else {
        spanAboveNumOfPeopleInput.attributes["aria-hidden"].value = "true";
      }
    } else {
      spanAboveNumOfPeopleInput.attributes["aria-hidden"].value = "true";
    }
  }
  //clicking on btns
  function selectPercent(event) {
    1;
    var percentValueOfBtn = event.target.innerText.split("").pop();
    if (percentValueOfBtn === "%") {
      event.target.attributes["aria-pressed"].value = "true";
      event.target.blur();
      //   use filter to get an array of btn with aria-pressed set to false
      // using forEach loop to change aria pressed to false
      //   let arrOfBtnsAriaPressedFalse = arrOfPercentBtns.filter(
      //     function getAriaPressedFalseBtns(btn) {
      //       return btn != event.target;
      //     }
      //   );
      //   arrOfBtnsAriaPressedFalse.forEach(function setAriaPressedToFalse(
      //     eachBtn
      //   ) {
      //     eachBtn.attributes["aria-pressed"].value = "false";
      //   });
      /* another way to set aria pressed to false */
      let [btn1, btn2, btn3, btn4] = arrOfPercentBtns.filter(
        function getAriaPressedFalseBtns(btn) {
          return btn != event.target;
        }
      );
      btn1.attributes["aria-pressed"].value = "false";
      btn2.attributes["aria-pressed"].value = "false";
      btn3.attributes["aria-pressed"].value = "false";
      btn4.attributes["aria-pressed"].value = "false";
    }
  }

  function resetInputsOnLoadOrReload() {
    billInput.value = "";
    customPercentInput.value = "";
    numOfPeopleInput.value = "";
    spanOfTipPerPersonDisplay.innerText = "$0.00";
    spanOfTotalPerPersonDisplay.innerText = "$0.00";
  }
  //     var ourBoolean;
  //     var whatIsThis = setInterval(function watchBtns() {

  //   }, 500);

  //   console.log(whatIsThis);
})();
