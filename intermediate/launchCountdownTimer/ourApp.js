(function scoprOurVariables() {
  //   declare selector at top of func
  const { effortTwo, monthSelectElement, userInputModalDiv, formElement } =
    ourSelectors();
  // execute/call/invoke our data obj func
  const accessOurData = scopeOurData();
  const dataObj = accessOurData();
  // add event listeners
  addEventListener.call(userInputModalDiv, "change", function TODO(event) {
    if (event.target.value == "Mar") {
      console.log("Hello");
    }
  });

  addEventListener.call(formElement, "submit", function TODO(event) {
    // copy obj
    // const copyOfDataObj = { ...dataObj.userStartingDateInput };
    // console.log(copyOfDataObj);
    event.preventDefault();
    console.log(monthSelectElement.value);
    dataObj.userStartingDateInput = Array.prototype.slice
      .call(event.target.children[1].children)
      .reduce((buildingUp, currentElement) => {
        if (currentElement.tagName == "SELECT") {
          const elementID = currentElement.getAttribute("id");
          const elementValue = currentElement.value;
          buildingUp[elementID] = elementValue;
        }
        return buildingUp;
      }, {});
    console.log(dataObj);
  });

  /**
   * how to use addEventListener below
   * addEventListener.call(effortTwo, "keydown", testingCallback);
   * **/

  function addEventListener(eventStr, eventCallback) {
    this.addEventListener(eventStr, eventCallback);
    // console.log(eventStr);
    // console.log(eventCallback);
  }

  function propertiesOfEventObj() {
    return {
      targetElement: this.target,
      targetKeyStrForm: this.key,
      targetKeyCodeStr: this.code,
      booleanShiftKeyPressed: this.shiftKey,
    };
  }
  // countDown();
  function countDown() {
    return setInterval(() => {
      const currentDate = new Date();
      let currentSecond = 60 - currentDate.getSeconds();
      if (currentSecond == 60) {
        // call checkMinute and checkHour here
        checkMinute();
        checkHour();
        currentSecond = 0;
      }
      console.log(dataObj);
      console.log(currentSecond);
    }, 1000);
  }

  function checkMinute() {
    console.log("minute");
    console.log(dataObj.minutesDigit);
    let minuteValue = dataObj.minutesDigit;
    // if dataObj.minutesDigit is 0 we want to assign 59 to
    // dataObj.minutesDigit AND NOT subtract 1 from it
    // that will make dataObj.minutesDigit 58
    if (minuteValue === 0) {
      dataObj.minutesDigit = 59;
    } else {
      // else
      // subtract 1 from minuteDigit
      dataObj.minutesDigit--;
    }
  }

  function checkHour() {
    const { minutesDigit: minute } = dataObj;
    if (minute == 59) {
      dataObj.hoursDigit--;
    }
    console.log("hour");
    console.log(dataObj.hoursDigit);
  }

  // day checker

  function scopeOurData() {
    const innerDataObj = {
      numOfDaysOfMonths: {
        Jan: 31,
        Feb: 28,
        Mar: 31,
        Apr: 30,
        May: 31,
        Jun: 30,
        Jul: 31,
        Aug: 31,
        Sep: 30,
        Oct: 31,
        Nov: 30,
        Dec: 31,
      },
      userStartingDateInput: {},
      minutesDigit: 2,
      hoursDigit: 8,
      daysDigit: 8,
      // name: "Deadpool",
      // sayHi() {
      //   console.log(`${this.name} hello`);
      // },
    };

    return function closureOverOurVariables() {
      return innerDataObj;
    };
  }

  function ourSelectors() {
    const monthSelectElement = document.querySelector("select[id='month']");
    const formElement = document.querySelector("form");
    const userInputModalDiv = document.getElementById("modal-one");
    const effortTwo = document.querySelector("digit-style-wrapper-two");

    return {
      monthSelectElement,
      formElement,
      userInputModalDiv,
      effortTwo,
    };
  }

  /**
   * using Object.keys to just get keys which will be "Mar", "Apr" etc
   * since we will be working with the same array the length will be the same
   * we can use indexOf
   * **/
  function findIndexMonthUsingIndexOf(array, strFormMonth) {
    return array.indexOf(strFormMonth);
  }
  /**
   * Using Object.entries to get an arrays of subarray with [key,value]
   * finding index using reduce where we pass in an array of subarrays
   * each subarray will have month, numOfDays
   *  ["Mar", 31]
   * **/
  function findIndexMonthInArrayUsingReduce(arrInput, strFormOfMonth) {
    // passing in an array with just the month without the
    // number of days
    return arrInput.reduce(function findIndex(buildingUp, currentArray, index) {
      // currentArray will be [month, numDays]
      const [month, numOfDays] = currentArray;
      if (month == strFormOfMonth) {
        buildingUp.push(index);
      }
      return buildingUp;
    }, []);
  }

  /***
   * ex: Dec 20, 2021 starting date March 23,2022
   * get num of days of current month which will be 31
   * call getDate() on currentDate which will be 20
   * subtract date of currentDate 20 from num of day of current month 31
   * we will get 11
   * ***/
  /***
   * months between starting date month and current date month
   * work with the index. have a starting index and ending index
   * we will get index of current month(starting index) and index of starting date month(ending index)
   * december is 11(starting) march is 2(ending)
   * first effort
   * let index = 0;
   * let counter = 0;
   * 
   * while (true) {
    console.log(arrayOfSubarrays[index]);
    if (index == 11) {
      index = 0;
      counter++
    } else {
      index++;
    }
    if (counter == 2) return;
  }
  const arrayOfSubarrays = Object.entries(dataObj.numOfDaysOfMonths);
    let startingIndex = 9;
    let endingIndex = 3;
    let counter = 0;
    while (startingIndex !== endingIndex) {
      console.log(arrayOfSubarrays[startingIndex]);
      if (startingIndex == 11) {
        startingIndex = 0;
        counter++;
      } else {
        startingIndex++;
      }
      if (counter == 2) break;
    }
   * ***/
  const arrOfMonths = Object.keys(dataObj.numOfDaysOfMonths);
  const arrayOfSubarrays = Object.entries(dataObj.numOfDaysOfMonths);
  const currentMonth = findIndexMonthUsingIndexOf(arrOfMonths, "Dec");
  const startingMonth = findIndexMonthUsingIndexOf(arrOfMonths, "Mar");

  arrayNumsOfDaysInMonth(currentMonth, startingMonth + 1, arrayOfSubarrays);
  /**
   * have func that loop starting at currentMonth index and ends at startingMonth index
   * while loop add the daysOfMonth of that month into array
   * we will use first and last month values in array to calculate
   * days in current month and days in starting month without have to access that value
   * from dataObj
   * **/
  function arrayNumsOfDaysInMonth(startingIndex, endingIndex, arrOfSubarrays) {
    // copy array
    // const copyOfArray = arrOfSubarrays.slice();
    // const copyOfArray = [].concat(arrOfSubarrays);
    const copyOfArray = [...arrOfSubarrays];
    const result = [];
    let counter = 0;
    while (startingIndex !== endingIndex) {
      console.log(copyOfArray[startingIndex]);
      const eachSubarray = copyOfArray[startingIndex];
      const [month, daysOfMonth] = eachSubarray;
      result.push(daysOfMonth);
      if (startingIndex >= 11) {
        startingIndex = 0;
      } else {
        startingIndex++;
      }
    }
    console.log(result);
    // const startingDateNumOfDays = result.pop();
    const [lastValue, resultArrWithoutLastValue] =
      getStartingDateNumOfDays(result);
    console.log(lastValue);
    console.log(resultArrWithoutLastValue);
    // const [firstValue, ...rest] = resultArrWithoutLastValue;
    // console.log(firstValue);
    // console.log(rest);
    const firstValue = getCurrentMonthNumOfDays(resultArrWithoutLastValue);
    console.log(firstValue);
    const daysBetweenCurrentAndStartingMonth =
      numOfDaysBetweenCurrAndStartingMonth(resultArrWithoutLastValue);
    console.log(daysBetweenCurrentAndStartingMonth);
    console.log(
      "total days",
      totalDaysOfMonthsBetweenCurrentAndStartingDate(
        daysBetweenCurrentAndStartingMonth
      )
    );
  }
  /**
   * helper funcs
   * **/

  /**
   * starting month num of days
   * **/

  function getStartingDateNumOfDays(arrInput) {
    const copyOfArr = [...arrInput];
    const lastValueOfArr = copyOfArr.pop();
    return [lastValueOfArr, copyOfArr];
  }
  /**
   * get current month num of days
   * **/

  function getCurrentMonthNumOfDays(array) {
    const copyOfArr = [...array];
    const [firstValue] = copyOfArr;
    return firstValue;
  }

  /**
   * num of days between current and start month
   * **/
  function numOfDaysBetweenCurrAndStartingMonth(array) {
    const copyOfArr = [...array];
    const [, ...rest] = copyOfArr;
    return rest;
  }
  /**
   * get total days months between current and starting date
   * **/

  function totalDaysOfMonthsBetweenCurrentAndStartingDate(array) {
    const copyOfArr = [...array];
    return copyOfArr.reduce(function addValues(buildingUp, currentDays) {
      return buildingUp + currentDays;
    }, 0);
  }

  /**
   * using slice
   * 
   function usingSliceToGetNumOfDays(array) {
     const copyOfArray = [...array];
     const lengthOfArr = copyOfArray.length;
     const [firstValue] = copyOfArray.slice(0, 0 + 1);
     const [betweenValues] = copyOfArray.slice(0 + 1, lengthOfArr - 1);
     const [lastValue] = copyOfArray.slice(lengthOfArr - 1);
     return [firstValue, betweenValues, lastValue];
   }
   * **/
  /**
   * notes
   * **/
  const notes = function () {
    const dataObj = accessOurData();
    const testObj = {
      name: "Spider-Man",
    };
    console.log(dataObj.sayHi.call(testObj));
    /*****/
    console.log(userInputModalDiv);
    function testingCallback(event) {
      console.log(event);
      const eventObjProperties = propertiesOfEventObj.call(event);
      console.log(eventObjProperties);
    }
  };
})();
