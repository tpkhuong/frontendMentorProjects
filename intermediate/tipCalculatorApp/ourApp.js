(function scopeOurVariables() {
  //selector elements variable top of function used destructuring
  // alert("use parseInt for % btn")
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
  var billAmtEnter;
  var btnPercentSelectedByUser;
  var customInputEnterBeforePercentBtnClicked;
  var numberOfPeopleEnter;
  function ourSelectors() {
    //input element
    var billInput = document.querySelector("#bill-input");
    var customPercentInput = document.querySelector(
      '[type="number"][placeholder="Custom"]'
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
    // resetBtn.addEventListener("click", clickedResetBtnFeature);
  }
  function focusIsOnBillInput(event) {
    var lengthOfBillInput = event.target.value.length;
    //if user enter 0 we will set input to empty sting
    if (event.data === "0" && lengthOfBillInput === 1) {
      event.target.value = "";
    } else if (lengthOfBillInput >= 1) {
      //get bill amt entered
      billAmtEnter = event.target.value;
      //   console.log("btnPercentSelectedByUser", btnPercentSelectedByUser);
      resetBtn.classList.add("activated-reset-btn");
      resetBtn.addEventListener("click", clickedResetBtnFeature);
      //checking if user clicked on % btn
      if (!btnPercentSelectedByUser) {
        //when our user have not clicked on a % btn
        // console.log(customPercentInput.value);
        // console.log(numOfPeopleInput.value);
        // customPercentInput.value !== "" && numOfPeopleInput.value === ""
        //   ? (spanAboveNumOfPeopleInput.attributes["aria-hidden"].value =
        //       "false")
        //       : null;
        if (customPercentInput.value !== "") {
          //user entered a value to customPercentInput
          //customInput in container with % btns is not an empty string.
          numOfPeopleInput.value === ""
            ? spanAboveNumOfPeopleInput.setAttribute("aria-hidden", "false")
            : null;
          //calculate tipAmtEachPerson and totalAmtEachPerson then display it to span with class tip-amt and span with total-amt
          calculationTipAndTotalAmtEachPerson(
            event.target.value,
            customInputEnterBeforePercentBtnClicked,
            numberOfPeopleEnter
          );
        } else {
          //here our customPercentInput is an empty string
          //if that is the case we want our span tip-amt and span with total-amt will display $0.00;
          //we need these values (billAmt, tip % and num of people) to calculate tip amt per and total per person.
        }
      } else {
        numOfPeopleInput.value === ""
          ? spanAboveNumOfPeopleInput.setAttribute("aria-hidden", "false")
          : null;
      }
      //checking if user is entering a % using the customInput
    } else {
      //here billInput length is 0
      //want to check if the other inputs are emptry
      if (!btnPercentSelectedByUser) {
        //when our user have not clicked on a % btn
        // if (customPercentInput.value === "" && numOfPeopleInput.value === "") {
        //   resetBtn.classList.remove("activated-reset-btn");
        //   }
        //ternary operator
        customPercentInput.value === "" && numOfPeopleInput.value === ""
          ? (resetBtn.classList.remove("activated-reset-btn"),
            resetBtn.removeEventListener("click", clickedResetBtnFeature))
          : null;

        customPercentInput.value !== ""
          ? spanAboveNumOfPeopleInput.setAttribute("aria-hidden", "true")
          : null;
      } else {
        //when bill input is empty we want to not show red text above num of people input
        //because we will show red text when both bill input and custom input are not empty strings
        // or bill input is not an empty string and btnPercentSelectedByUser is assign one of the % btn
        spanAboveNumOfPeopleInput.setAttribute("aria-hidden", "true");
      }
    }
  }
  function focusIsOnCustomInput(event) {
    let lengthOfCustomInput = event.target.value.length;
    // console.log(lengthOfCustomInput);
    //if user enter 0 we will set input to empty sting
    if (!btnPercentSelectedByUser) {
      //when our user have not clicked on a % btn
      if (event.data === "0" && lengthOfCustomInput === 1) {
        event.target.value = "";
      } else if (lengthOfCustomInput >= 1) {
        //get the value of customInput
        customInputEnterBeforePercentBtnClicked = event.target.value;
        //when length of value is 1 or greater we want to apply class activated-reset-btn to reset btn
        // console.log("btnPercentSelectedByUser", btnPercentSelectedByUser);
        resetBtn.classList.add("activated-reset-btn");
        resetBtn.addEventListener("click", clickedResetBtnFeature);
        //we don't want to give our user the ability to add 0 to the beginning of their inputs
        let valueOfCustomInput = event.target.value[0];
        //check if spanAboveNumInput has aria-hidden false

        if (valueOfCustomInput === "0") {
          //copy the input starting at index 1 to the end of the input
          let copyInputFromIndexOne = event.target.value.slice(1);
          event.target.value = copyInputFromIndexOne;
        }
        //show span text above num of people input
        billInput.value !== "" && numOfPeopleInput.value === ""
          ? spanAboveNumOfPeopleInput.setAttribute("aria-hidden", "false")
          : null;
      } else {
        //here customInput length is 0
        //want to check if the other inputs are emptry
        if (billInput.value === "" && numOfPeopleInput.value === "") {
          resetBtn.classList.remove("activated-reset-btn");
          resetBtn.removeEventListener("click", clickedResetBtnFeature);
        }
        //we are showing red text above num of people input when custom input and bill input are not empty strings
        //when custom is an empty string  or billing is an empty string do not show red text above num of people input
        billInput.value !== ""
          ? spanAboveNumOfPeopleInput.setAttribute("aria-hidden", "true")
          : null;
      }
      // ternary operator
      //   event.data === "0" && lengthOfCustomInput === 1
      //     ? (event.target.value = "")
      //     : lengthOfCustomInput >= 1
      //     ? (resetBtn.classList.add("activated-reset-btn"),
      //       resetBtn.addEventListener("click", clickedResetBtnFeature))
      //     : billInput.value === "" && numOfPeopleInput.value === ""
      //     ? (resetBtn.classList.remove("activated-reset-btn"),
      //       resetBtn.removeEventListener("click", clickedResetBtnFeature))
      //     : null;
    } else {
      //when btnPercentSelectedByUser is not undefined means our user clicked on a % btn
      //also means we add activated-reset-btn to our reset btn making it look like it is clickable
      //so we dont have to add the class activated-reset-btn in this part of the code
      //when user enter an input for custom input we want to change the bg and fg of the selected % btn by setting aria-pressed to false
      if (event.data === "0" && lengthOfCustomInput === 1) {
        event.target.value = "";
      } else if (lengthOfCustomInput >= 1) {
        //get the value of customInput
        customInputEnterBeforePercentBtnClicked = event.target.value;
        // resetBtn.classList.add("activated-reset-btn");
        btnPercentSelectedByUser.attributes["aria-pressed"].value = "false";
      } else {
        btnPercentSelectedByUser.attributes["aria-pressed"].value = "true";
        //when our user delete the value in the custom input and makes the custom input value to be "" which means its length will be 0
        //we want to select the % btn the user clicked before they decided to use the custom input by changing the bg and fg color of the btn
      }
      // ternary operator
      //   event.data === "0" && lengthOfCustomInput === 1
      //     ? (event.target.value = "")
      //     : lengthOfCustomInput >= 1
      //     ? (btnPercentSelectedByUser.attributes["aria-pressed"].value = "false")
      //     : (btnPercentSelectedByUser.attributes["aria-pressed"].value = "true");
    }
  }
  function focusIsOnNumOfPeopleInput(event) {
    //if user enter 0 for number of people entry show text "can't be zero"
    var lengthOfNumOfPeopleInput = event.target.value.length;
    // console.log(event.target.value.length);
    if (event.data === "0" && lengthOfNumOfPeopleInput === 1) {
      event.target.value = "";
    } else if (lengthOfNumOfPeopleInput >= 1) {
      //get number of people entered
      numberOfPeopleEnter = event.target.value;
      //add activated-reset-btn css to reset button and add click listener to reset btn
      resetBtn.classList.add("activated-reset-btn");
      resetBtn.addEventListener("click", clickedResetBtnFeature);
      //we don't want to give our user the ability to add 0 to the beginning of their inputs
      let valueOfNumOfPeopleInput = event.target.value[0];
      //check if spanAboveNumInput has aria-hidden false
      let ariaHiddenOfSpanAbovePeopleInput =
        spanAboveNumOfPeopleInput.getAttribute("aria-hidden");
      if (ariaHiddenOfSpanAbovePeopleInput === "false") {
        spanAboveNumOfPeopleInput.setAttribute("aria-hidden", "true");
      }

      if (valueOfNumOfPeopleInput === "0") {
        //copy the input starting at index 1 to the end of the input
        let copyInputFromIndexOne = event.target.value.slice(1);
        event.target.value = copyInputFromIndexOne;
      }
    } else {
      //here lengthOfNumOfPeopleInput is 0
      if (!btnPercentSelectedByUser) {
        //when our user have not clicked on a % btn
        billInput.value === "" && customPercentInput.value === ""
          ? (resetBtn.classList.remove("activated-reset-btn"),
            resetBtn.removeEventListener("click", clickedResetBtnFeature))
          : null;
        //when numOfPeopleInput length is 0 we want to check if billOnput and customInput != "" we will make aria-hidden to false to show red text above numPeopleInput
        //we dont need to check if bill input is not empty or num of people input is not empty because we are showing red text when
        //both billinput and custom input is not empty stings
        // billInput.value !== ""
        //   ? spanAboveNumOfPeopleInput.setAttribute("aria-hidden", "true")
        //   : null;
        billInput.value !== "" && customPercentInput.value !== ""
          ? spanAboveNumOfPeopleInput.setAttribute("aria-hidden", "false")
          : spanAboveNumOfPeopleInput.setAttribute("aria-hidden", "true");
      } else {
        //our user clicked on a % btn
        billInput.value === "" && !btnPercentSelectedByUser
          ? (resetBtn.classList.remove("activated-reset-btn"),
            resetBtn.removeEventListener("click", clickedResetBtnFeature))
          : null;

        billInput.value !== ""
          ? spanAboveNumOfPeopleInput.setAttribute("aria-hidden", "false")
          : null;
        // billInput.value !== "" && btnPercentSelectedByUser
        //   ? spanAboveNumOfPeopleInput.setAttribute("aria-hidden", "false")
        //   : null;
      }
    }
    //   event.data === "0" && lengthOfNumOfPeopleInput === 1
    //       ? (event.target.value = "")
    //       : lengthOfNumOfPeopleInput >= 1
    //           ? (resetBtn.classList.add("activated-reset-btn"),
    //               resetBtn.addEventListener("click", clickedResetBtnFeature),
    //               (spanAboveNumOfPeopleInput.attributes["aria-hidden"].value = "true"))
    //           : !btnPercentSelectedByUser ? billInput.value === "" && customPercentInput.value === "" ? (resetBtn.classList.remove("activated-reset-btn"),
    //               resetBtn.removeEventListener("click", clickedResetBtnFeature)
    //           ) : null;
    // if (lengthOfNumOfPeopleInput === 1) {
    //   //   console.log("btnPercentSelectedByUser", btnPercentSelectedByUser);
    //   resetBtn.classList.add("activated-reset-btn");
    //   resetBtn.addEventListener("click", clickedResetBtnFeature);
    //   //when there is value in our number of people input we want to apply class to reset btn
    //   if (event.data === "0") {
    //     spanAboveNumOfPeopleInput.attributes["aria-hidden"].value = "false";
    //   } else {
    //     spanAboveNumOfPeopleInput.attributes["aria-hidden"].value = "true";
    //   }
    //   // ternary operator
    // } else if (lengthOfNumOfPeopleInput > 1) {
    //   //   spanAboveNumOfPeopleInput.attributes["aria-hidden"].value = "true";
    //   //   console.log("btnPercentSelectedByUser", btnPercentSelectedByUser);
    //   let valueOfInput = Number(event.target.value[0]);
    //   //   //   if (valueOfInput === 0) {
    //   //   //     spanAboveNumOfPeopleInput.attributes["aria-hidden"].value = "false";
    //   //   // } else {
    //   //   //     spanAboveNumOfPeopleInput.attributes["aria-hidden"].value = "true";
    //   //   // }
    //   //   // ternary operator
    //   valueOfInput === 0
    //     ? (spanAboveNumOfPeopleInput.attributes["aria-hidden"].value = "false")
    //     : (spanAboveNumOfPeopleInput.attributes["aria-hidden"].value = "true");
    // } else {
    //   //when length of number of people input is 0 we want to remove class from reset btn
    //   //want to check if the other inputs are emptry
    //   if (!btnPercentSelectedByUser) {
    //     //when our user have not clicked on a % btn
    //     billInput.value === "" && customPercentInput.value === ""
    //       ? (resetBtn.classList.remove("activated-reset-btn"),
    //         resetBtn.removeEventListener("click", clickedResetBtnFeature))
    //       : null;
    //   }
    //   spanAboveNumOfPeopleInput.attributes["aria-hidden"].value = "true";
    // }
  }
  //clicking on btns
  function selectPercent(event) {
    var percentValueOfBtn = event.target.innerText.split("").pop();
    // console.log(event.target);
    if (!btnPercentSelectedByUser) {
      //when our user have not clicked on a % btn
      if (percentValueOfBtn === "%") {
        selectPercentBtnAlgor(event);
        billInput.value !== "" && numOfPeopleInput.value === ""
          ? spanAboveNumOfPeopleInput.setAttribute("aria-hidden", "false")
          : null;
        console.log(
          "customInputEnterBeforePercentBtnClicked",
          customInputEnterBeforePercentBtnClicked
        );
        //when customInputEnterBeforePercentBtnClicked has a value assign to it, it will be truthy, if our user click on % btn set customInput to ""
        customInputEnterBeforePercentBtnClicked
          ? (customPercentInput.value = "")
          : null;
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
        console.log(
          "customInputEnterBeforePercentBtnClicked",
          customInputEnterBeforePercentBtnClicked
        );
        event.target.attributes["aria-pressed"].value = "false";
        event.target.blur();
        btnPercentSelectedByUser = undefined;
        //   conditional check here
        // if (billInput.value === "" && numOfPeopleInput.value === "") {
        //   resetBtn.classList.remove("activated-reset-btn");
        // }
        // ternary operator
        billInput.value === "" && numOfPeopleInput.value === ""
          ? (resetBtn.classList.remove("activated-reset-btn"),
            resetBtn.removeEventListener("click", clickedResetBtnFeature))
          : null;

        //when user click on the % btn with the highlighted css code
        billInput.value !== ""
          ? spanAboveNumOfPeopleInput.setAttribute("aria-hidden", "true")
          : null;
        //   we will have our conditional check here for custom input
        //when customInputEnterBeforePercentBtnClicked is truthy and user click on btnPercentSelectedByUser
        //   we want to focus customInput and restore value that user enter before they selected % btn
        customInputEnterBeforePercentBtnClicked
          ? ((customPercentInput.value =
              customInputEnterBeforePercentBtnClicked),
            customPercentInput.focus())
          : null;
      } else {
        //when we get here, our user clicked on a % btn which means btnPercentSelectedByUser is not undefined. it will have a value of the element of the btn clicked
        //if this is the case, we want to check if the element the user clicked is one of the % btn
        //if it is we want to make the event.target element aria pressed to true it will change the bg and fg to a clicked btn
        if (percentValueOfBtn === "%") {
          //
          selectPercentBtnAlgor(event);
          billInput.value !== "" && numOfPeopleInput.value === ""
            ? spanAboveNumOfPeopleInput.setAttribute("aria-hidden", "false")
            : null;
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
          console.log(
            "customInputEnterBeforePercentBtnClicked",
            customInputEnterBeforePercentBtnClicked
          );
          //when customInputEnterBeforePercentBtnClicked has a value assign to it, it will be truthy, if our user click on % btn set customInput to ""
          customInputEnterBeforePercentBtnClicked
            ? (customPercentInput.value = "")
            : null;
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
        return btn !== eventInput.target;
      }
    );
    btn1.attributes["aria-pressed"].value = "false";
    btn2.attributes["aria-pressed"].value = "false";
    btn3.attributes["aria-pressed"].value = "false";
    btn4.attributes["aria-pressed"].value = "false";
  }
  function clickedResetBtnFeature() {
    !btnPercentSelectedByUser
      ? (resetPercentBtnInputsAndDisplays(),
        resetBtn.classList.remove("activated-reset-btn"),
        resetBtn.blur())
      : (resetInputsAndDisplaysWithoutPercentBtn(),
        resetBtn.classList.remove("activated-reset-btn"),
        resetBtn.blur());
  }
  function resetInputsOnLoadOrReloadOrResetBtnClicked() {
    billInput.value = "";
    customPercentInput.value = "";
    numOfPeopleInput.value = "";
    spanOfTipPerPersonDisplay.innerText = "$0.00";
    spanOfTotalPerPersonDisplay.innerText = "$0.00";
  }
  function resetPercentBtnInputsAndDisplays() {
    billInput.value = "";
    customPercentInput.value = "";
    numOfPeopleInput.value = "";
    spanOfTipPerPersonDisplay.innerText = "$0.00";
    spanOfTotalPerPersonDisplay.innerText = "$0.00";
    resetBtn.removeEventListener("click", clickedResetBtnFeature);
  }
  function resetInputsAndDisplaysWithoutPercentBtn() {
    btnPercentSelectedByUser.attributes["aria-pressed"].value = "false";
    billInput.value = "";
    numOfPeopleInput.value = "";
    spanOfTipPerPersonDisplay.innerText = "$0.00";
    spanOfTotalPerPersonDisplay.innerText = "$0.00";
    resetBtn.removeEventListener("click", clickedResetBtnFeature);
  }
  function calculationTipAndTotalAmtEachPerson(
    billAmtValue = 0,
    percentValue = 0,
    numOfPeopleValue = 0
  ) {
    //declare variable top of functions
    var convertToDecimalValue = percentValue / 100;
    var tipTotalNotEachPerson = billAmtValue * convertToDecimalValue;
    var billTotalEachPersonWithoutTip = billAmtValue / numOfPeopleValue;
    console.log("billTotalEachPersonWithoutTip", billTotalEachPersonWithoutTip);
    //tip amt person
    //billAmtValue * percentValue = percentTotal then use percentTotal / numOfPeopleValue to get tip amt per/person
    // we will use 102.20.toFixed(2) which will return a string then we will pass that string returned
    // from.toFixed() to span with class tip- amt or span with class total-amt to display it
    // using .toFixed() like this .888.toFixed(2) will return "0.89"
    var tipAmtEachPerson = tipTotalNotEachPerson / numOfPeopleValue;
    //total amt person without tip will be billAmtValue / numOfPeopleValue = totalAmtPerWithoutTip
    //total per person will be. we take totalAmtPerWithoutTip + tipAmtPer
    //total per person
    // we will use 102.20.toFixed(2) which will return a string then we will pass that string returned
    // from.toFixed() to span with class tip- amt or span with class total-amt to display it
    var totalAmtWithTipAmtEachPerson =
      billTotalEachPersonWithoutTip + tipAmtEachPerson;
    /* display of span with class total-amt and span with class of tip-amt will be changed here in this func */
    spanOfTipPerPersonDisplay.innerText = "$" + tipAmtEachPerson.toFixed(2);
    spanOfTotalPerPersonDisplay.innerText =
      "$" + totalAmtWithTipAmtEachPerson.toFixed(2);
    //using template literal
    // spanOfTipPerPersonDisplay.innerText = `$${tipAmtEachPerson.toFixed(2)}`;
    // spanOfTotalPerPersonDisplay.innerText = `$${totalAmtWithTipAmtEachPerson.toFixed(
    //   2
    // )}`;
  }
})();
