(function scopeOurVariables() {
  //selector elements variable top of function used destructuring
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
  var billAmtInputEntered;
  var btnPercentSelectedByUser;
  var customInputEnterBeforePercentBtnClicked;
  var numberOfPeopleInputEntered;
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
      billAmtInputEntered = event.target.value;
      /***** here: we will convert % btn the user clicked to a number then we will pass that number to calculationTipAndTotalAmtEachPerson *****/
      /* btnPercentSelectedByUser will be the element of the % btn user clicked */
      /* we dont need to convert to decimal because our calculationTipAndTotalAmtEachPerson will */

      resetBtn.classList.add("activated-reset-btn");
      resetBtn.addEventListener("click", clickedResetBtnFeature);
      //checking if user clicked on % btn
      if (!btnPercentSelectedByUser) {
        //when our user have not clicked on a % btn
        //also we enter this if statement when user clicked on the btnPercentSelectedByUser that matched the element that is assigned to btnPercentSelectedByUser
        //if user enter value for billInput and numOfPeopleInput then user clicked on btnPercentSelectedByUser that has element assigned to it
        //we will enter the else statement of if(customPercentInput.value !== "") code in that else statement will run, the code will display $0.00
        // console.log(customPercentInput.value);
        // console.log(numOfPeopleInput.value);
        // customPercentInput.value !== "" && numOfPeopleInput.value === ""
        //   ? (spanAboveNumOfPeopleInput.attributes["aria-hidden"].value =
        //       "false")
        //       : null;
        //we can clean this up a bit. we can check if
        if (customPercentInput.value !== "") {
          //user entered a value to customPercentInput
          //customInput in container with % btns is not an empty string.
          numOfPeopleInput.value === ""
            ? //since customPercentInput is not empty and numOfPeopleInput is empty show red text above numOfPeopleInput
              (spanAboveNumOfPeopleInput.setAttribute("aria-hidden", "false"),
              (spanOfTipPerPersonDisplay.innerText = "$0.00"),
              (spanOfTotalPerPersonDisplay.innerText = "$0.00"))
            : //calculate tipAmtEachPerson and totalAmtEachPerson then display it to span with class tip-amt and span with total-amt
              calculationTipAndTotalAmtEachPerson(
                event.target.value,
                customInputEnterBeforePercentBtnClicked,
                numberOfPeopleInputEntered
              );
        } else {
          //here our customPercentInput is an empty string and user have not clicked on a % btn
          //if that is the case we want our span tip-amt and span with total-amt will display $0.00;
          spanOfTipPerPersonDisplay.innerText = "$0.00";
          spanOfTotalPerPersonDisplay.innerText = "$0.00";
          //apply algorithm above when user has customInput focused.
        }
      } else {
        //if we get here it means, user is entering values in billInput because billInput length will be >= 1
        //and user clicked on a % btn
        let btnInnerText = btnPercentSelectedByUser.innerText;
        let numFormOfValueOfPercentBtnClicked = parseInt(btnInnerText);
        // if numOfPeopleInput is empty/empty string we want to show red text above numOfPeopleInput
        numOfPeopleInput.value === ""
          ? (spanAboveNumOfPeopleInput.setAttribute("aria-hidden", "false"),
            (spanOfTipPerPersonDisplay.innerText = "$0.00"),
            (spanOfTotalPerPersonDisplay.innerText = "$0.00"))
          : //we need these values (billAmt, tip % and num of people) to calculate tip amt per and total per person.
            //user clicked on % btn, use numFormOfValueOfPercentBtnClicked in our calculationTipAndTotalAmtEachPerson func
            calculationTipAndTotalAmtEachPerson(
              event.target.value,
              numFormOfValueOfPercentBtnClicked,
              numberOfPeopleInputEntered
            );
      }
      /*
        else {
        numOfPeopleInput.value === ""
          ? spanAboveNumOfPeopleInput.setAttribute("aria-hidden", "false")
          : null;
        }
        */
    }
    //checking if user is entering a % using the customInput
    else {
      //here billInput length is 0
      //we will set billAmtInputEntered to 0
      /* we won't calculateTipAndTotalAmtEachPerson unless user enter value in billInput */
      billAmtInputEntered = 0;
      //we dont want to calculate display when billInput is 0 when billInput is 0 display $0.00
      spanOfTipPerPersonDisplay.innerText = "$0.00";
      spanOfTotalPerPersonDisplay.innerText = "$0.00";
      //want to check if the other inputs are emptry
      if (!btnPercentSelectedByUser) {
        //when our user have not clicked on a % btn
        // also we enter this if statement when user clicked on the btnPercentSelectedByUser that matched the element that is assigned to btnPercentSelectedByUser
        // if (customPercentInput.value === "" && numOfPeopleInput.value === "") {
        //   resetBtn.classList.remove("activated-reset-btn");
        //   }
        //ternary operator
        customPercentInput.value === "" && numOfPeopleInput.value === ""
          ? (resetBtn.classList.remove("activated-reset-btn"),
            resetBtn.removeEventListener("click", clickedResetBtnFeature))
          : spanAboveNumOfPeopleInput.setAttribute("aria-hidden", "true");
        //
        /* we moved the spanAboveNumOfPeopleInput.setAttribute("aria-hidden", "true") into the else statement of the ternary operator above
        this line customPercentInput.value === "" && numOfPeopleInput.value === ""
        if customPercentInput.value !== "" then it will run spanAboveNumOfPeopleInput.setAttribute("aria-hidden", "true")
        it will also run if customPercentInput.value === "" and numOfPeopleInput.value !== ""
        */
        // customPercentInput.value !== ""
        //   ? spanAboveNumOfPeopleInput.setAttribute("aria-hidden", "true")
        //   : null;
        //here our billAmtInput is an empty string and user have entered value to customInput
        //if that is the case we want our span tip-amt and span with total-amt will display $0.00;
        //moving code below to the else statement, we eneter that else statement when billInput is 0
        //we dont want to calculate display when billInput is 0

        /* moved into else statement when billInput is 0
        spanOfTipPerPersonDisplay.innerText = "$0.00";
        spanOfTotalPerPersonDisplay.innerText = "$0.00";*/
      } else {
        //when bill input is empty we want to not show red text above num of people input
        //because we will show red text when both bill input and custom input are not empty strings
        // or bill input is not an empty string and btnPercentSelectedByUser is assign one of the % btn
        spanAboveNumOfPeopleInput.setAttribute("aria-hidden", "true");
        //here our billAmtInput is an empty string and user have clicked on a % btn
        //if that is the case we want our span tip-amt and span with total-amt will display $0.00;
        //moving code below to the else statement, we eneter that else statement when billInput is 0
        //we dont want to calculate display when billInput is 0
        /* moved into else statement when billInput is 0
        spanOfTipPerPersonDisplay.innerText = "$0.00";
        spanOfTotalPerPersonDisplay.innerText = "$0.00";*/
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
        if (billInput.value !== "") {
          //if we get here billInput.value is an not an empty string. user entered a value to billInput
          numOfPeopleInput.value === ""
            ? (spanAboveNumOfPeopleInput.setAttribute("aria-hidden", "false"),
              (spanOfTipPerPersonDisplay.innerText = "$0.00"),
              (spanOfTotalPerPersonDisplay.innerText = "$0.00"))
            : // if we get to : part of this ternary operator, it means both billInput and numOfPeopleInput have user entered values. they are both not empty strings.
              calculationTipAndTotalAmtEachPerson(
                billAmtInputEntered,
                event.target.value,
                numberOfPeopleInputEntered
              );
        } else {
          //if we get here billInput.value is an empty string
          //if that is the case display $0.00
          //in our ternary operator when the is value in customInput and there is no value in billInput or numOfPeopleInput
          //it will run calculation func
          spanOfTipPerPersonDisplay.innerText = "$0.00";
          spanOfTotalPerPersonDisplay.innerText = "$0.00";
        }
        //show span text above num of people input
        //if we get here billInput.value is an not an empty string. user entered a value to billInput
        // billInput.value !== "" && numOfPeopleInput.value === ""
        //   ? (spanAboveNumOfPeopleInput.setAttribute("aria-hidden", "false"),
        //     (spanOfTipPerPersonDisplay.innerText = "$0.00"),
        //     (spanOfTotalPerPersonDisplay.innerText = "$0.00")) // if we get to : part of this ternary operator, it means both billInput and numOfPeopleInput have user entered values. they are both not empty strings.
        //   : calculationTipAndTotalAmtEachPerson(
        //       billAmtInputEntered,
        //       event.target.value,
        //       numberOfPeopleInputEntered
        //     );
        /* code below was else statement to if(billInput.value !== ""){}
        we dont need code below because when user enter value to numOfPeopleInput then enter value to customInput
        and billInput.value is empty, display will already be $0.00 because we are not running/calling calculation func
        also if user enter value into customInput, numOfPeopleInput and billInput then user delete values in billInput to make it empty
        display will be $0.00
        else {
          //if we get here billInput.value is an empty string
          //if that is the case display $0.00
          spanOfTipPerPersonDisplay.innerText = "$0.00";
          spanOfTotalPerPersonDisplay.innerText = "$0.00";
        }
        */
        //we want to check look at billAmtInput
        // if (billInput.value !== "") {
        //   //here user has entered a value to billAmtInput
        //   //we need these values (billAmt, tip % and num of people) to calculate tip amt per and total per person.
        //   calculationTipAndTotalAmtEachPerson(
        //     billAmtInputEntered,
        //     event.target.value,
        //     numberOfPeopleInputEntered
        //   );
        // } else {
        //   //here user has not entered a value to billAmtInput
        //   spanOfTipPerPersonDisplay.innerText = "$0.00";
        //   spanOfTotalPerPersonDisplay.innerText = "$0.00";
        // }
      } else {
        //here customInput length is 0
        customInputEnterBeforePercentBtnClicked = 0;
        //we will set customInputEnterBeforePercentBtnClicked to 0
        //when customInput is 0 display $0.00 for both spans
        spanOfTipPerPersonDisplay.innerText = "$0.00";
        spanOfTotalPerPersonDisplay.innerText = "$0.00";
        spanAboveNumOfPeopleInput.setAttribute("aria-hidden", "true");
        //want to check if the other inputs are emptry
        // if (billInput.value === "") {
        //   numOfPeopleInput.value === ""
        //     ? (resetBtn.classList.remove("activated-reset-btn"),
        //       resetBtn.removeEventListener("click", clickedResetBtnFeature))
        //     : null;
        // }
        //ternery operator for code above
        //if both billInput and numOfPeopleInput are empty remove activated-reset-btn from reset btn and remove event listener
        billInput.value === "" && numOfPeopleInput.value === ""
          ? (resetBtn.classList.remove("activated-reset-btn"),
            resetBtn.removeEventListener("click", clickedResetBtnFeature))
          : null;
        /*
        else {
          //we want to check billAmtInput
          //if we get here billInput.value has user entered values which means it is not an empty string.
          //we are showing red text above num of people input when custom input and bill input are not empty strings
          //when custom is an empty string  or billing is an empty string do not show red text above num of people input
          spanAboveNumOfPeopleInput.setAttribute("aria-hidden", "true");
          // spanAboveNumOfPeopleInput.setAttribute("aria-hidden", "true");
        }
        */
        //ternary opearto code above
        //want to check if the other inputs are emptry
        // billInput.value === "" && numOfPeopleInput.value === ""
        //   ? (resetBtn.classList.remove("activated-reset-btn"),
        //     resetBtn.removeEventListener("click", clickedResetBtnFeature))
        //   : //we want to check billAmtInput
        //     //if we get here billInput.value has user entered values which means it is not an empty string.
        //     //we are showing red text above num of people input when custom input and bill input are not empty strings
        //     //when custom is an empty string  or billing is an empty string do not show red text above num of people input
        //     spanAboveNumOfPeopleInput.setAttribute("aria-hidden", "true");
      }
      //we want to check look at billAmtInput
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
        //we want to check look at billAmtInput
        //first checking if billAmtInput is not empty user entered a value
        //we have to check if numOfPeopleInput is empty because our previous code would run calculation func when user enter value to customInput
        //and billInput.value is not an empty string(user entered value to billInput).
        // billInput.value !== ""
        //   ? calculationTipAndTotalAmtEachPerson(
        //       billAmtInputEntered,
        //       event.target.value,
        //       numberOfPeopleInputEntered
        //     )
        //   : console.log("here");
        //code below will check both billInput and numOfPeopleInput
        if (billInput.value !== "") {
          //if we get here billInput.value is an not an empty string. user entered a value to billInput
          numOfPeopleInput.value === ""
            ? (spanAboveNumOfPeopleInput.setAttribute("aria-hidden", "false"),
              (spanOfTipPerPersonDisplay.innerText = "$0.00"),
              (spanOfTotalPerPersonDisplay.innerText = "$0.00"))
            : // if we get to : part of this ternary operator, it means both billInput and numOfPeopleInput have user entered values. they are both not empty strings.
              calculationTipAndTotalAmtEachPerson(
                billAmtInputEntered,
                event.target.value,
                numberOfPeopleInputEntered
              );
        } else {
          //if we get here billInput.value is an empty string
          //if that is the case display $0.00
          spanOfTipPerPersonDisplay.innerText = "$0.00";
          spanOfTotalPerPersonDisplay.innerText = "$0.00";
        }
      } else {
        //customInput is 0 here
        customInputEnterBeforePercentBtnClicked = 0;
        btnPercentSelectedByUser.attributes["aria-pressed"].value = "true";
        //when our user delete the value in the custom input and makes the custom input value to be "" which means its length will be 0
        //we want to select the % btn the user clicked before they decided to use the custom input by changing the bg and fg color of the btn
        //we want our spanOfTipPerPersonDisplay and spanOfTotalPerPersonDisplay to show the caluclated values using the % btn clicked by user
        let btnInnerTextDeclaredInCustomInputFunc =
          btnPercentSelectedByUser.innerText;
        let numFormOfValueOfPercentBtnClickedDeclaredInCustomInputFunc =
          parseInt(btnInnerTextDeclaredInCustomInputFunc);
        //if user clicked on a % btn, entered value to billInput and numOfPeopleInput then select customInput then change the input to numOfPeopleInput
        //if we the user delete the value in customInput, the calculation of tip amt and total amt each person will use
        //the most resent value entered to numOfPeopleInput with the % btn the user selected before the user entered value to customInput.
        // console.log("numberOfPeopleInputEntered", numberOfPeopleInputEntered);
        //we want to call calculation of display when both billInput and numOfPeopleInput are not empty strings( !== "")
        billInput.value !== "" && numOfPeopleInput.value !== ""
          ? //else we want to display $0.00 if eiter billInput or numOfPeopleInput.value is an empty string display $0.00
            calculationTipAndTotalAmtEachPerson(
              billAmtInputEntered,
              numFormOfValueOfPercentBtnClickedDeclaredInCustomInputFunc,
              numberOfPeopleInputEntered
            )
          : ((spanOfTipPerPersonDisplay.innerText = "$0.00"),
            (spanOfTotalPerPersonDisplay.innerText = "$0.00"));
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
      numberOfPeopleInputEntered = event.target.value;
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
      //if btnPercentSelectedByUser is undefined means user did not click on % btn
      if (!btnPercentSelectedByUser) {
        //if both billInput and customInput are not empty strings. !== "", run our calculation func
        //else if either billInput or customInput is an empty string we will make our spanOfTipPerPersonDisplay and spanOfTotalPerPersonDisplay display "$0.00"
        billInput.value !== "" && customPercentInput.value !== ""
          ? calculationTipAndTotalAmtEachPerson(
              billAmtInputEntered,
              customInputEnterBeforePercentBtnClicked,
              event.target.value
            )
          : ((spanOfTipPerPersonDisplay.innerText = "$0.00"),
            (spanOfTotalPerPersonDisplay.innerText = "$0.00"));
      } else {
        //user clicked on % btn

        let btnInnerTextDeclaredInCustomInputFunc =
          btnPercentSelectedByUser.innerText;
        let numFormOfValueOfPercentBtnClickedDeclaredInNumOfPeopleFunc =
          parseInt(btnInnerTextDeclaredInCustomInputFunc);
        if (billInput.value !== "") {
          console.log("customPercentInput", customPercentInput.value);
          //user entered value to billInput and user clicked on % btn (15%) need to get innerText of that % btn
          //check if customInput is empty if it is run calculcation func with numFormOfValueOfPercentBtnClickedDeclaredInNumOfPeopleFunc the value of % btn clicked
          //else if customInput is not empty and btnPercentSelectedByUser has an element assigned to it
          //we want to use the value in the customInput to calculate the tip amt and total amt each person
          customPercentInput.value === ""
            ? calculationTipAndTotalAmtEachPerson(
                billAmtInputEntered,
                numFormOfValueOfPercentBtnClickedDeclaredInNumOfPeopleFunc,
                event.target.value
              )
            : calculationTipAndTotalAmtEachPerson(
                billAmtInputEntered,
                customPercentInput.value,
                event.target.value
              );
        }
      }
    } else {
      //here lengthOfNumOfPeopleInput is 0
      //we will set numberOfPeopleInputEntered to 0
      numberOfPeopleInputEntered = 0;
      //when numOfPeopleInput is 0 display $0.00
      spanOfTipPerPersonDisplay.innerText = "$0.00";
      spanOfTotalPerPersonDisplay.innerText = "$0.00";
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
        resetBtn.addEventListener("click", clickedResetBtnFeature);
        selectPercentBtnAlgor(event);
        billInput.value !== "" && numOfPeopleInput.value === ""
          ? spanAboveNumOfPeopleInput.setAttribute("aria-hidden", "false")
          : null;
        console.log(
          "customInputEnterBeforePercentBtnClicked",
          customInputEnterBeforePercentBtnClicked
        );
        //when customInputEnterBeforePercentBtnClicked has a value assign to it, it will be truthy, if our user click on % btn set customInput to ""
        //we want our users to enter a new customInput
        customInputEnterBeforePercentBtnClicked
          ? (customPercentInput.value = "")
          : null;
        /* moved code below into a separate func since we will use it twice */
        // event.target.attributes["aria-pressed"].value = "true";
        // event.target.blur();
        // resetBtn.classList.add("activated-reset-btn");
        // btnPercentSelectedByUser = event.target;
        /* calculate display */
        let btnInnerTextDeclaredInCustomInputFunc =
          btnPercentSelectedByUser.innerText;
        let numFormOfValueOfPercentBtnClickedDeclaredInSelectPercentFunc =
          parseInt(btnInnerTextDeclaredInCustomInputFunc);
        billInput.value !== "" && numOfPeopleInput.value !== ""
          ? calculationTipAndTotalAmtEachPerson(
              billAmtInputEntered,
              numFormOfValueOfPercentBtnClickedDeclaredInSelectPercentFunc,
              numberOfPeopleInputEntered
            )
          : ((spanOfTipPerPersonDisplay.innerText = "$0.00"),
            (spanOfTotalPerPersonDisplay.innerText = "$0.00"));
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
        //when user click on the same element as btnPercentSelectedByUser, we will unselect that % btn
        //if that is the case don't calculate display, have span displaying our tip amt and total amt each person $0.00
        //set btnPercentSelectedByUser to undefined
        spanOfTipPerPersonDisplay.innerText = "$0.00";
        spanOfTotalPerPersonDisplay.innerText = "$0.00";
        // console.log(
        //   "customInputEnterBeforePercentBtnClicked",
        //   customInputEnterBeforePercentBtnClicked
        // );
        // console.log("billAmtInputEntered", billAmtInputEntered);
        // console.log("numOfPeopleInput", numOfPeopleInput);
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
        // if (customInputEnterBeforePercentBtnClicked) {
        //   customPercentInput.value = customInputEnterBeforePercentBtnClicked;
        //   customPercentInput.focus();
        //   //run display calculation with the value that we stored in customInputEnterBeforePercentBtnClicked
        //   //we want to also check the value of billInput and numOfPeopleInput
        //   billInput.value !== "" && numOfPeopleInput.value !== ""
        //     ? calculationTipAndTotalAmtEachPerson(
        //         billAmtInputEntered,
        //         customInputEnterBeforePercentBtnClicked,
        //         numberOfPeopleInputEntered
        //       )
        //     : ((spanOfTipPerPersonDisplay.innerText = "$0.00"),
        //       (spanOfTotalPerPersonDisplay.innerText = "$0.00"));
        // } else {
        // }
        //ternary operator
        //   we will have our conditional check here for custom input
        // when customInputEnterBeforePercentBtnClicked is truthy and user click on btnPercentSelectedByUser
        //   we want to focus customInput and restore value that user enter before they selected % btn
        customInputEnterBeforePercentBtnClicked
          ? ((customPercentInput.value =
              customInputEnterBeforePercentBtnClicked),
            customPercentInput.focus(),
            // run display calculation with the value that we stored in customInputEnterBeforePercentBtnClicked
            // we want to also check the value of billInput and numOfPeopleInput
            billInput.value !== "" && numOfPeopleInput.value !== ""
              ? calculationTipAndTotalAmtEachPerson(
                  billAmtInputEntered,
                  customInputEnterBeforePercentBtnClicked,
                  numberOfPeopleInputEntered
                )
              : ((spanOfTipPerPersonDisplay.innerText = "$0.00"),
                (spanOfTotalPerPersonDisplay.innerText = "$0.00")))
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
          /* user clicked on a % btn then the clicked a different % btn when that is the case we want to run calculation of display with the % btn the user clicked */
          /* it will be the element assigned to btnPercentSelectedByUser */
          let btnInnerTextDeclaredInCustomInputFunc =
            btnPercentSelectedByUser.innerText;
          let numFormOfValueOfPercentBtnClickedDeclaredWhenUserClickedDiffBtn =
            parseInt(btnInnerTextDeclaredInCustomInputFunc);
          /* we are only running calculation func when both billInput and numOfPeopleInput are not empty strings mean user entered value into those inputs */
          /* else if either one of billInput or numOfPeopleInput is an empty string means user did not enter value in either billInpur or numOfPeopleinput */
          /* we will display $0.00 */
          billInput.value !== "" && numOfPeopleInput.value !== ""
            ? calculationTipAndTotalAmtEachPerson(
                billAmtInputEntered,
                numFormOfValueOfPercentBtnClickedDeclaredWhenUserClickedDiffBtn,
                numberOfPeopleInputEntered
              )
            : ((spanOfTipPerPersonDisplay.innerText = "$0.00"),
              (spanOfTotalPerPersonDisplay.innerText = "$0.00"));
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
    console.log(btnPercentSelectedByUser);
    !btnPercentSelectedByUser
      ? (resetCustomPercentBtnInputsAndDisplays(),
        resetBtn.classList.remove("activated-reset-btn"),
        resetBtn.blur())
      : (resetInputsAndDisplaysWithPercentBtn(),
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
  function resetCustomPercentBtnInputsAndDisplays() {
    // console.log(btnPercentSelectedByUser);
    billInput.value = "";
    customPercentInput.value = "";
    numOfPeopleInput.value = "";
    spanOfTipPerPersonDisplay.innerText = "$0.00";
    spanOfTotalPerPersonDisplay.innerText = "$0.00";
    btnPercentSelectedByUser = undefined;
    resetBtn.removeEventListener("click", clickedResetBtnFeature);
  }
  function resetInputsAndDisplaysWithPercentBtn() {
    // console.log("btnPercentSelectedByUser", btnPercentSelectedByUser);
    btnPercentSelectedByUser.attributes["aria-pressed"].value = "false";
    customPercentInput.value = "";
    billInput.value = "";
    numOfPeopleInput.value = "";
    spanOfTipPerPersonDisplay.innerText = "$0.00";
    spanOfTotalPerPersonDisplay.innerText = "$0.00";
    btnPercentSelectedByUser = undefined;
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
// spanOfTipPerPersonDisplay.innerText = "$0.00",
// spanOfTotalPerPersonDisplay.innerText = "$0.00";
