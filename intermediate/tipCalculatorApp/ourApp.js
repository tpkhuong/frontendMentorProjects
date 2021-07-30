(function scopeOurVariables() {
  alert(
    "check if other inputs is empty before we remove activated-reset-btn on reset btn"
  );
  //selector elements variable top of function
  var {
    billInput,
    customPercentInput,
    numOfPeopleInput,
    containerOfPercentBtns,
    arrOfPercentBtns,
    spanAboveNumOfPeopleInput,
    spanOfTipPerPersonDisplay,
    spanOfTotalPerPersonDisplay,
    resetBtn,
  } = ourSelectors();
  // variable will hold the value of which %btn is clicked/selected
  var btnPercentSelectedByUser;
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

    //reset btn
    var resetBtn = document.getElementById("reset-btn");
    return {
      billInput,
      customPercentInput,
      numOfPeopleInput,
      containerOfPercentBtns,
      arrOfPercentBtns,
      spanAboveNumOfPeopleInput,
      spanOfTipPerPersonDisplay,
      spanOfTotalPerPersonDisplay,
      resetBtn,
    };
  }
  /* call our functions */

  addEventListenerToElements();
  resetInputsOnLoadOrReloadOrResetBtnClicked();
  /* call our functions */
  function addEventListenerToElements() {
    containerOfPercentBtns.addEventListener("click", selectPercent);
    billInput.addEventListener("input", focusIsOnBillInput);
    customPercentInput.addEventListener("input", focusIsOnCustomInput);
    numOfPeopleInput.addEventListener("input", focusIsOnNumOfPeopleInput);
    resetBtn.addEventListener("click", clickedResetBtnFeature);
  }
  function focusIsOnBillInput(event) {
    var lengthOfBillInput = event.target.value.length;
    //if user enter 0 we will set input to empty sting
    if (event.data === "0" && lengthOfBillInput === 1) {
      event.target.value = "";
    } else if (lengthOfBillInput >= 1) {
      console.log("btnPercentSelectedByUser", btnPercentSelectedByUser);
      resetBtn.classList.add("activated-reset-btn");
    } else {
      //want to check if the other inputs are emptry

      resetBtn.classList.remove("activated-reset-btn");
    }
  }
  function focusIsOnCustomInput(event) {
    let lengthOfCustomInput = event.target.value.length;
    console.log(lengthOfCustomInput);
    //if user enter 0 we will set input to empty sting
    if (!btnPercentSelectedByUser) {
      if (event.data === "0" && lengthOfCustomInput === 1) {
        event.target.value = "";
      } else if (lengthOfCustomInput >= 1) {
        //when length of value is 1 or greater we want to apply class activated-reset-btn to reset btn
        console.log("btnPercentSelectedByUser", btnPercentSelectedByUser);
        resetBtn.classList.add("activated-reset-btn");
      } else {
        //want to check if the other inputs are emptry
        resetBtn.classList.remove("activated-reset-btn");
      }
    } else {
      //when btnPercentSelectedByUser is not undefined means our user clicked on a % btn
      //also means we add activated-reset-btn to our reset btn making it look like it is clickable
      //so we dont have to add the class activated-reset-btn in this part of the code
      //when user enter an input for custom input we want to change the bg and fg of the selected % btn by setting aria-pressed to false
      if (event.data === "0" && lengthOfCustomInput === 1) {
        event.target.value = "";
      } else if (lengthOfCustomInput >= 1) {
        // resetBtn.classList.add("activated-reset-btn");
        btnPercentSelectedByUser.attributes["aria-pressed"].value = "false";
      } else {
        btnPercentSelectedByUser.attributes["aria-pressed"].value = "true";
        //when our user delete the value in the custom input and makes the custom input value to be "" which means its length will be 0
        //we want to select the % btn the user clicked before they decided to use the custom input by changing the bg and fg color of the btn
      }
    }
  }
  function focusIsOnNumOfPeopleInput(event) {
    //if user enter 0 for number of people entry show text "can't be zero"
    var lengthOfNumOfPeopleInput = event.target.value.length;
    console.log(event.target.value.length);
    if (lengthOfNumOfPeopleInput === 1) {
      console.log("btnPercentSelectedByUser", btnPercentSelectedByUser);
      resetBtn.classList.add("activated-reset-btn");
      //when there is value in our number of people input we want to apply class to reset btn
      if (event.data === "0") {
        spanAboveNumOfPeopleInput.attributes["aria-hidden"].value = "false";
      }
    } else if (lengthOfNumOfPeopleInput > 1) {
      console.log("btnPercentSelectedByUser", btnPercentSelectedByUser);
      let valueOfInput = Number(event.target.value[0]);
      if (valueOfInput === 0) {
        spanAboveNumOfPeopleInput.attributes["aria-hidden"].value = "false";
      } else {
        spanAboveNumOfPeopleInput.attributes["aria-hidden"].value = "true";
      }
    } else {
      //when length of number of people input is 0 we want to remove class from reset btn
      //want to check if the other inputs are emptry
      resetBtn.classList.remove("activated-reset-btn");
      spanAboveNumOfPeopleInput.attributes["aria-hidden"].value = "true";
    }
  }
  //clicking on btns
  function selectPercent(event) {
    var percentValueOfBtn = event.target.innerText.split("").pop();
    // console.log(event.target);
    if (!btnPercentSelectedByUser) {
      //when our user have not clicked on a % btn
      if (percentValueOfBtn === "%") {
        selectPercentBtnAlgor(event);
        /* moved code below into a separate func since we will use it twice */
        // event.target.attributes["aria-pressed"].value = "true";
        // event.target.blur();
        // resetBtn.classList.add("activated-reset-btn");
        // btnPercentSelectedByUser = event.target;

        // //   use filter to get an array of btn with aria-pressed set to false
        // // using forEach loop to change aria pressed to false
        // //   let arrOfBtnsAriaPressedFalse = arrOfPercentBtns.filter(
        // //     function getAriaPressedFalseBtns(btn) {
        // //       return btn != event.target;
        // //     }
        // //   );
        // //   arrOfBtnsAriaPressedFalse.forEach(function setAriaPressedToFalse(
        // //     eachBtn
        // //   ) {
        // //     eachBtn.attributes["aria-pressed"].value = "false";
        // //   });
        // /* another way to set aria pressed to false */
        // let [btn1, btn2, btn3, btn4] = arrOfPercentBtns.filter(
        //   function getAriaPressedFalseBtns(btn) {
        //     return btn != event.target;
        //   }
        // );
        // btn1.attributes["aria-pressed"].value = "false";
        // btn2.attributes["aria-pressed"].value = "false";
        // btn3.attributes["aria-pressed"].value = "false";
        // btn4.attributes["aria-pressed"].value = "false";
      }
    } else {
      //our user clicked on a % btn
      if (
        //our user clicked on the % btn that has aria-presssed value set to true. it will have bg primary cyan and color of dark cyan
        event.target === btnPercentSelectedByUser &&
        event.target.attributes["aria-pressed"].value === "true"
      ) {
        //we want to set aria-pressed to false, unfocus on the clicked btn and remove .activated-reset-btn on resetBtn
        //to set resetBtn bg to --color-reset-bg and fg to --color-reset-fg
        event.target.attributes["aria-pressed"].value = "false";
        event.target.blur();
        resetBtn.classList.remove("activated-reset-btn");
        btnPercentSelectedByUser = undefined;
      } else {
        //when we get here, our user clicked on a % btn which means btnPercentSelectedByUser is not undefined. it will have a value of the element of the btn clicked
        //if this is the case, we want to check if the element the user clicked is one of the % btn
        //if it is we want to make the event.target element aria pressed to true it will change the bg and fg to a clicked btn
        if (percentValueOfBtn === "%") {
          //
          selectPercentBtnAlgor(event);
          /* moved code below into a separate func since we will use it twice */
          //   event.target.attributes["aria-pressed"].value = "true";
          //   event.target.blur();
          //   resetBtn.classList.add("activated-reset-btn");
          //   btnPercentSelectedByUser = event.target;

          //   //   use filter to get an array of btn with aria-pressed set to false
          //   // using forEach loop to change aria pressed to false
          //   //   let arrOfBtnsAriaPressedFalse = arrOfPercentBtns.filter(
          //   //     function getAriaPressedFalseBtns(btn) {
          //   //       return btn != event.target;
          //   //     }
          //   //   );
          //   //   arrOfBtnsAriaPressedFalse.forEach(function setAriaPressedToFalse(
          //   //     eachBtn
          //   //   ) {
          //   //     eachBtn.attributes["aria-pressed"].value = "false";
          //   //   });
          //   /* another way to set aria pressed to false */
          //   let [btn1, btn2, btn3, btn4] = arrOfPercentBtns.filter(
          //     function getAriaPressedFalseBtns(btn) {
          //       return btn != event.target;
          //     }
          //   );
          //   btn1.attributes["aria-pressed"].value = "false";
          //   btn2.attributes["aria-pressed"].value = "false";
          //   btn3.attributes["aria-pressed"].value = "false";
          //   btn4.attributes["aria-pressed"].value = "false";
        }
      }
    }
  }
  function selectPercentBtnAlgor(eventInput) {
    eventInput.target.attributes["aria-pressed"].value = "true";
    eventInput.target.blur();
    resetBtn.classList.add("activated-reset-btn");
    btnPercentSelectedByUser = eventInput.target;

    //   use filter to get an array of btn with aria-pressed set to false
    // using forEach loop to change aria pressed to false
    //   let arrOfBtnsAriaPressedFalse = arrOfPercentBtns.filter(
    //     function getAriaPressedFalseBtns(btn) {
    //       return btn != eventInput.target;
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
        return btn != eventInput.target;
      }
    );
    btn1.attributes["aria-pressed"].value = "false";
    btn2.attributes["aria-pressed"].value = "false";
    btn3.attributes["aria-pressed"].value = "false";
    btn4.attributes["aria-pressed"].value = "false";
  }
  function clickedResetBtnFeature(event) {}
  function resetInputsOnLoadOrReloadOrResetBtnClicked() {
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

function code() {}
