(function scoprOurVariables() {
  //   declare selector at top of func

  const {
    monthSelectElement,
    userInputModalDiv,
    formElement,
    daysDigitBottom,
    hoursDigitBottom,
    minutesDigitBottom,
    secondDigitBottom,
    arrayOfDaysDivElement,
    arrayOfHoursDivElement,
    arrayOfMinutesDivElement,
    arrayOfSecondsDivElement,
  } = ourSelectors();
  const dateObj = new Date();
  // since we will be working with current Date in most of our algorithm
  // declare date obj at top of App. just year, month and day
  // for the hour and minute we will use a different func
  const currentDateObj = getCurrentYearMonthDate(dateObj);
  const currentTimeObj = getCurrentHourMinutes(dateObj);
  // execute/call/invoke our data obj func
  const accessOurData = scopeOurData();
  const dataObj = accessOurData(12, 0, 0);
  console.log(dataObj);
  // declare/define our days, hours, and minutes func
  // const handleDaysChange = daysHoursMinutesHelper();
  const handleHoursChange = daysHoursMinutesHelper();
  const handleMinutesChange = daysHoursMinutesHelper();
  // declare/define our updateDays, updateHours, updateMinutes, updateSeconds
  // call using .call() method
  const updateDaysElements = updateElementFactoryFunc();
  const updateHoursElements = updateElementFactoryFunc();
  const updateMinutesElements = updateElementFactoryFunc();
  const updateSecondElements = updateElementFactoryFunc();
  // declare/define changeObjProp for days, hours, minutes
  // call using .call() method
  const changeDaysFlipProperty = changeObjProperty();
  const changeHoursFlipProperty = changeObjProperty();
  const changeMinutesFlipProperty = changeObjProperty();
  // declare/define adding flip css to days, hours or minute digit element
  // call using .call() method

  /**
   * testing
   * **/

  getNextUpcomingHolidayValues.call(currentDateObj);

  /**
   *  add flip transition
   * add flip animation
   * **/

  const addFlipClassToDaysBottomElement = addClass();
  const addFlipClassToHoursBottomElement = addClass();
  const addFlipClassToMinutesBottomElement = addClass();
  /**
   * declare/define removing flip css to days, hours or minute digit element
   * call using .call() method
   * remove flip transition
   * remove flip animation
   * **/

  const removeFlipClassToDaysBottomElement = removeClass();
  const removeFlipClassToHoursBottomElement = removeClass();
  const removeFlipClassToMinutesBottomElement = removeClass();

  /**
   * declare/define funcs that will return beginning, between or ending values of array
   * begin returns [1,2,3,4]
   * between return [2, 3, 4]
   * end returns [2,3,4,5]
   * **/

  const beginningValuesOfArray = beginBetweenOrEndOfArrayFactoryFunc("begin");
  const valuesBetweenFirstAndLastValue =
    beginBetweenOrEndOfArrayFactoryFunc("between");
  const endingValuesOfArray = beginBetweenOrEndOfArrayFactoryFunc("end");

  /**
   * declare/define add or remove class flip to digit bottom
   * **/

  // add

  const addFlipClassToDigitElement =
    addOrRemoveFlipClassToDigitBottomElement("add");
  // remove

  const removeFlipClassToDigitElement =
    addOrRemoveFlipClassToDigitBottomElement("remove");

  /**
   * declare/define our arithmetic funcs
   * **/

  const addition = arithmeticFactoryFunc("add");
  const subtraction = arithmeticFactoryFunc("subtract");
  const multiply = arithmeticFactoryFunc("multiply");
  const divide = arithmeticFactoryFunc("divide");

  // add event listeners
  addEventListener.call(userInputModalDiv, "change", function TODO(event) {
    if (event.target.value == "Mar") {
      console.log("Hello");
    }
  });
  // get user input
  addEventListener.call(
    formElement,
    "submit",
    getUserDateFromInputsAndAssignValuesToDataObj
  );

  // new Date("January 18, 2022, 0:00"); 12am
  // 23:00 is 11pm
  // 24:00 is 12am
  /**
   * currentDate: "Dec 28 2021 11:27"
   * min: 27
   * add 33 to make it 12:00
   * 12 hours to reach Dec 29
   **/
  // countDown();
  // dataObj.stopTimer = countDown();
  function countDown() {
    /**
     * seconds element will update outside switch statement
     * **/
    return setInterval(() => {
      const currentDate = new Date();
      let currentSecond = 60 - currentDate.getSeconds();
      // call our handleDays, handleHours, handleMinutesChange func
      // when currentSecound is 59
      // if (currentSecond == 60) {
      // // call checkMinute and checkHour here
      // handleDaysChange("daysDigit");
      // handleHoursChange("hoursDigit");
      // handleMinutesChange("minutesDigit");
      // // checkMinute();
      // // checkHour();
      // //   minutesDigit: 2,
      // // hoursDigit: 8,
      // // daysDigit
      //   currentSecond = 0;
      // }
      const {
        daysDigit: days,
        hoursDigit: hours,
        minutesDigit: minutes,
        stopTimer: happyHoliday,
        flipDigitObj,
      } = dataObj;

      /**
       * check if daysFlip, hoursFlip and minutesFlip are true
       * assign value false if daysFlip, hoursFlip and minutesFlip are true
       * **/

      changeDaysFlipHoursFlipMinutesFlipPropToFalse(flipDigitObj);

      /**
       * if daysFlip, hoursFlip and minutesFlip is false remove class flip-bottom-transition
       * **/

      removeFlipClassToDigitElement(dataObj.flipDigitObj);

      switch (currentSecond) {
        case 60:
          currentSecond = 0;
          // check if days, hours, minutes are 0
          // if all properties in dataObj are 0, we have reached the holiday date or
          // userDateInput
          // console.log("days", days);
          // console.log("hours", hours);
          // console.log("minutes", minutes);
          if (days === 0 && hours === 0 && minutes === 0) {
            // call countDown assign the return value of setInterval which will be
            // the value to stop setInterval to the identifer something stopTimer,etc
            // we will use that value assign to stopTimer as an argument to clearInterval(stopTimer)
            clearInterval(happyHoliday);
          }
          break;
        case 59:
          handleMinutesChange("minutesDigit");
          handleHoursChange("hoursDigit");
          // console.log(dataObj);
          break;
      }
      /** 
      // if we call our func that will update digit element here
      // with the variables/identifiers we declared using destructuring
      // before the switch, the values of the variables
      // will be before we called handleMinutesChange, handleHoursChange;
      console.log("days", days);
      console.log("hours", hours);
      console.log("minutes", minutes); **/
      // console.log(dataObj);
      const updateData = prepDigitValueForUpdate(dataObj, currentSecond);
      // const { daysStrForm, hoursStrForm, minutesStrForm, secondsStrForm } =
      //   updateData;
      // console.log(updateData);
      /**
       * use switch to see which updateElementFunc will run
       * we dont want to execute/call/invoke all four updateElementFunc
       * minDigit: update when second is 59
       * hourDigit: update when minute is 59
       * dayDigit: update when hour is 23
       * ** come up with better approach to updating digit element ***
       * thinking about calling func that will update digit element and add flip class
       * in handleDaysChange,handleHoursChange,handleMinuteChange
       * ** thinking it will be better to call func outside of handle Funcs **
       * **/

      invokeOurUpdateElementFuncs(updateData);
      /**
       * if daysFlip, hoursFlip and minutesFlip is true remove class flip-bottom-transition
       * **/

      addFlipClassToDigitElement(dataObj.flipDigitObj);

      console.log(currentSecond);
    }, 1000);
  }

  /**
   * handleTime
   * **/

  /**
   * days, hours, minutes helper/factory func
   * **/

  function daysHoursMinutesHelper() {
    return function innerFunc(daysHoursOrMin) {
      // this func runs when currentSecond is 59
      const {
        daysDigit: days,
        hoursDigit: hours,
        minutesDigit: minutes,
        flipDigitObj,
      } = dataObj;
      // use switch
      switch (daysHoursOrMin) {
        case "daysDigit":
          console.log("daysDigit", daysHoursOrMin);
          // algorithm below moved to handleDays func
          if (hours == 23) {
            dataObj[daysHoursOrMin]--;
          }
          break;
        case "hoursDigit":
          console.log("hoursDigit", daysHoursOrMin);
          // check if hours is 0 inside of a condition
          // where we check if minute value is 59
          // if (minutes == 59) {
          //   if (hours === 0) {
          //     dataObj[daysHoursOrMin] = 23;
          //     // we could substract 1 from daysDigit
          //     // in this if statement
          //     handleDays();
          //   } else {
          //     dataObj[daysHoursOrMin]--;
          //   }
          // }
          // what is tenary operator version
          // null is met if minutes is not 59
          /**
           * first effort
           * **/
          // minutes == 59
          //   ? hours === 0
          //     ? ((dataObj[daysHoursOrMin] = 23), handleDays())
          //     : dataObj[daysHoursOrMin]--
          //   : null;
          // another effort
          minutes == 59
            ? hours === 0 && days === 0
              ? null
              : hours === 0
              ? ((dataObj[daysHoursOrMin] = 23),
                changeHoursFlipProperty.call(flipDigitObj, "hoursFlip", true),
                handleDays())
              : (dataObj[daysHoursOrMin]--,
                changeHoursFlipProperty.call(flipDigitObj, "hoursFlip", true))
            : null;
          break;
        case "minutesDigit":
          console.log("minutesDigit", daysHoursOrMin);
          // when currentSecond is 59
          // we want to subtract 1 off minute
          // if statement
          // if (minutes === 0) {
          //   dataObj[daysHoursOrMin] = 59;
          // } else {
          //   dataObj[daysHoursOrMin]--
          // }
          // ternary operator
          minutes === 0
            ? ((dataObj[daysHoursOrMin] = 59),
              changeMinutesFlipProperty.call(flipDigitObj, "minutesFlip", true))
            : (dataObj[daysHoursOrMin]--,
              changeMinutesFlipProperty.call(
                flipDigitObj,
                "minutesFlip",
                true
              ));
          break;
      }
      console.log("here", dataObj[daysHoursOrMin]);
    };
  }

  /**
   * handlesDays countdown digit
   * **/

  function handleDays() {
    // access daysDigit value in dataObj
    const { daysDigit: days, flipDigitObj } = dataObj;
    // minuteDigit will be the value 23
    // we are calling this func inside of a switch statement when
    // string passed in is "hoursDigit"
    /**
     * when minuteDigit is 23 and daysDigit is > 0 we will subtract 1 from daysDigit
     * **/
    // if (days > 0) {
    //   dataObj["daysDigit"]--;
    // }
    // using ternary operator
    days > 0
      ? (dataObj["daysDigit"]--,
        changeDaysFlipProperty.call(flipDigitObj, "daysFlip", true))
      : null;
  }

  /**
   * cached our data variables using closure
   * **/

  function scopeOurData() {
    const innerDataObj = {
      stopTimer: null,
      minutesDigit: 1,
      hoursDigit: 1,
      daysDigit: 8,
      flipDigitObj: {
        daysFlip: false,
        hoursFlip: false,
        minutesFlip: false,
      },
      /**
       * we might not need obj currentDate
       * **/
      currentDate: {
        month: currentDateObj.currentMonth,
        day: currentDateObj.currentDay,
        year: currentDateObj.currentYear,
        time: {
          hours: currentTimeObj.currentHour,
          minutes: currentTimeObj.currentMinute,
        },
      },
      userDateInput: {
        month: null,
        day: null,
        year: null,
        hours: null,
        minutes: null,
      },
      defaultEndingDate: null,
      endYear: null,
      currentYear: currentDateObj.currentYear,
      numOfDaysOfMonths: {
        Jan: 31,
        Feb: this.currentYear % 4 === 0 ? 29 : 28,
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
      /**
       * idea: since we will be working with the method .toDateString() on the Date obj
       * calling .split(" ") on that string which will return an array of day month date year
       * we will have an obj with properties by year each obj will have properties by month
       * each month property will have properties by date of the holidays for that month
       * each date properties will have obj of title, hour and minute of that holiday
       * ex:
       * datesOfHoliday:{
       * "2022":{
       * "Jan":{
       * "17":{
       * title: "Martin Luther King Jr Day",
       * hours:"0",
       * minutes: "00"
       * }
       * }
       * }
       * }
       * **/
      datesOfHoliday: {
        2022: {
          Jan: {
            17: {
              title: "Martin Luther King Jr Day",
              hours: 0,
              minutes: 00,
            },
            20: {
              title: "Martin Luther King Jr Day",
              hours: 0,
              minutes: 00,
            },
            26: {
              title: "Martin Luther King Jr Day",
              hours: 0,
              minutes: 00,
            },
          },
          Feb: {
            1: {
              title: "Tet: Vietnamese New Year",
              hours: 0,
              minutes: 00,
            },
            14: {
              title: "Valentine's Day",
              hours: 0,
              minutes: 00,
            },
          },
          Mar: {
            17: {
              title: "Saint Patrick's Day",
              hours: 0,
              minutes: 00,
            },
          },
          Apr: {
            17: {
              title: "Easter Sunday",
              hours: 0,
              minutes: 00,
            },
          },
          May: {
            30: {
              title: "Memorial Day",
              hours: 0,
              minutes: 00,
            },
          },
          Jul: {
            4: {
              title: "Independence Day",
              hours: 0,
              minutes: 00,
            },
          },
          Sep: {
            5: {
              title: "Labor Day",
              hours: 0,
              minutes: 00,
            },
          },
          Oct: {
            31: {
              title: "Halloween",
              hours: 0,
              minutes: 00,
            },
          },
          Nov: {
            24: {
              title: "Thanksgiving",
              hours: 0,
              minutes: 00,
            },
          },
          Dec: {
            25: {
              title: "Christmas",
              hours: 0,
              minutes: 00,
            },
          },
        },
      },
      arrOfDays: [3, 5, 9],
      sumOfValuesInArray() {
        return this.arrOfDays.reduce((buildingUp, currentValue) => {
          return buildingUp + currentValue;
        }, 0);
      },
      // name: "Deadpool",
      // sayHi() {
      //   console.log(`${this.name} hello`);
      // },
    };

    return function closureOverOurVariables(days, hours, minutes) {
      // testing only
      innerDataObj["daysDigit"] = days;
      innerDataObj["hoursDigit"] = hours;
      innerDataObj["minutesDigit"] = minutes;
      return innerDataObj;
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
  const endingMonth = findIndexMonthUsingIndexOf(arrOfMonths, "Mar");
  const currentYear = 2021;
  const endingYear = 2023;

  /**
   * same year
   * **/
  // const currentMonth = findIndexMonthUsingIndexOf(arrOfMonths, "Feb");
  // const endingMonth = findIndexMonthUsingIndexOf(arrOfMonths, "Dec");
  // arrayOfNumUsingTwoIndices(
  //   currentMonth,
  //   endingMonth + 1,
  //   arrayOfSubarrays,
  //   "current"
  // );

  /**
   * Days, Hours, Minutes Digit Calculations
   * **/
  digitsElementsCalculation(dataObj.currentDate, dataObj.defaultEndingDate);
  function digitsElementsCalculation(currentDateObj, endDateObj) {
    // figure out days
    // figure out hours
    // figure out minutes
    // get values from our calculation helper to this func
    // then we will assign those values to daysDigit,hoursDigit and minuteDigit
    // in our dataObj
    const testDayCalc = handleDaysDigitCalculations(currentDateObj, endDateObj);
    console.log("digitELementsCalc", testDayCalc);
  }

  /**
   * handle days calculations
   * *** previous efforts notes are in notes func at bottom of app ***
   * **/
  // go to getNextUpcomingHolidayValues func to test our algorithm
  // handleDaysDigitCalculations(dataObj.currentDate, dataObj.defaultEndingDate);
  function handleDaysDigitCalculations(...rest) {
    // we want the year, month, and date
    // destructure both current and end obj
    const [currentDateObj, endDateObj] = rest;

    const {
      year: currentYear,
      month: currentMonth,
      day: currentDay,
      time: { hours: currentHour, minutes: currentMinute },
    } = currentDateObj;

    const {
      year: endYear,
      month: endMonth,
      day: endDay,
      hours: endHour,
      minutes: endMinute,
    } = endDateObj;

    // create array of year between current and end
    const arrayOfYearBetweenCurrentAndEndDate =
      makeArrayOfValuesFromCurrentToEnd(currentYear, endYear + 1);
    // length of array
    // console.log(arrayOfYearBetweenCurrentAndEndDate);
    // const lengthOfArrayOfYears = arrayOfYearBetweenCurrentAndEndDate.length;
    // if year, month and day === each other return days = 0
    if (
      currentYear == endYear &&
      currentMonth === endMonth &&
      currentDay === endDay
    ) {
      return 0;
    } else {
      //
      return dayDigitsWorkingWithYear(
        arrayOfYearBetweenCurrentAndEndDate,
        currentDateObj,
        endDateObj
      );
    }
  }

  /**
   * day digit working with year func
   * **/

  function dayDigitsWorkingWithYear(...rest) {
    const [arrayOfYears, firstObj, secondObj] = rest;
    const lengthOfArray = arrayOfYears.length;
    const {
      year: currentYear,
      month: currentMonth,
      day: currentDay,
      time: { hours: currentHour, minutes: currentMinute },
    } = firstObj;
    // console.log(
    //   currentYear,
    //   currentMonth,
    //   currentDay,
    //   currentHour,
    //   currentMinute
    // );
    const {
      year: endYear,
      month: endMonth,
      day: endDay,
      hours: endHour,
      minutes: endMinute,
    } = secondObj;
    // console.log(endYear, endMonth, endDay, endHour, endMinute);
    console.log(arrayOfYears);
    // const [] = rest;
    switch (true) {
      case lengthOfArray == 1:
        console.log("1");
        // current year and end year are the same
        if (currentMonth == endMonth) {
          return dayDigitsWorkingWithDaysInSingleMonth(
            currentDay,
            endDay,
            currentMinute,
            endMinute
          );
        }
        // pass arrayOfYears to dayDigitsWorkingWithMonth
        //get first and last value of array returned by dayDigitsWorkingWithMonth
        dayDigitsWorkingWithMonth(arrayOfYears, currentMonth, endMonth);
        break;
      case lengthOfArray == 2:
        // current year is one less than end year
        //arrayOfYears will have [start,end] pass it to dayDigitsWorkingWithMonth
        //get first and last value of array returned by dayDigitsWorkingWithMonth
        dayDigitsWorkingWithMonth(arrayOfYears, currentMonth, endMonth);
        console.log("2");
        break;
      case lengthOfArray >= 3:
        // there is year/s between current and end
        // we want to get first value
        // value/s between first and last value
        // we want to get last value
        // [2022,2023,2024]
        // pass 2023 to arrOfNumOfDaysInYear func
        //pass array [2022,2024] to dayDigitsWorkingWithMonth
        //get first and last value of array returned by dayDigitsWorkingWithMonth
        const arrayOfYearsBetweenStartingAndEndingYear =
          valuesBetweenFirstAndLastValue(arrayOfYears);
        console.log(
          "arrayOfYearsBetweenStartingAndEndingYear",
          arrayOfYearsBetweenStartingAndEndingYear
        );
        /***** *****/
        const startingYear = valueAtFirstIndexOfArray(arrayOfYears);
        const endingYear = valueAtLastIndexOfArray(arrayOfYears);
        const arrayOfStartingAndEndingYear = [startingYear, endingYear];
        dayDigitsWorkingWithMonth(
          arrayOfStartingAndEndingYear,
          currentMonth,
          endMonth
        );
        console.log("3");
        break;
    }
  }

  /**
   * day digit working with month
   * **/

  function dayDigitsWorkingWithMonth(...rest) {
    const [arrayOfYear, currentMonthString, endMonthString] = rest;
    const lengthOfArray = arrayOfYear.length;
    const arrOfMonths = Object.keys(dataObj.numOfDaysOfMonths);
    const arrayOfSubarrays = Object.entries(dataObj.numOfDaysOfMonths);
    const startMonthIndex = findIndexMonthUsingIndexOf(
      arrOfMonths,
      currentMonthString
    );
    const endingMonthIndex = findIndexMonthUsingIndexOf(
      arrOfMonths,
      endMonthString
    );
    // we will be working with array of months ["Jan","Feb" etc] and array with subarray
    // [["Jan", 31]]
    /**
     * same year: "Feb" to "Nov"
     * arrayOfDaysInMonthUsingTwoIndices(indexOfFeb, indexOfNov + 1, [["Jan", 31]], "current")
     * when length of array passed in is 1 return the array func above returns
     * **/
    if (lengthOfArray > 1) {
      console.log(arrayOfYear);
      //array will be [2022,2024] etc
      const [startingYear, endingYear] = arrayOfYear;
      const arrOfValuesStartingMonthAndYear = arrayOfDaysInMonthUsingTwoIndices(
        startMonthIndex,
        11 + 1,
        arrayOfSubarrays,
        "current"
      );
      const arrOfValuesEndingMonthAndYear = arrayOfDaysInMonthUsingTwoIndices(
        0,
        endingMonthIndex + 1,
        arrayOfSubarrays,
        "end",
        endingYear
      );
      console.log([
        ...arrOfValuesStartingMonthAndYear,
        ...arrOfValuesEndingMonthAndYear,
      ]);
    } else {
      // array will have one value [2022] etc
    }
    /**
     * array passed in has two values [2022,2024] "Feb" to "Nov"
     * 2022: "Feb" to "Dec"
     * arrayOfDaysInMonthUsingTwoIndices(indexOfFeb, 11, [["Jan", 31]], "current")
     * [daysOfFeb first value]
     * 2024: "Jan" to "Nov"
     * arrayOfDaysInMonthUsingTwoIndices(0, indexOfNov + 1, [["Jan", 31]], "end", 2024)
     * [,daysOfNov last value]
     * when length of array passed in is > 1 take array return by func above merge them
     * [...currentArray, ...endArray]
     * **/
    // we want to return an array of num of day for each month
    // where we call this func we will want to get first value and last value of that array
    // use those values in our dayDigitsWorkingWithDaysInSingleMonth
  }

  /**
   * figure out days
   * **/

  function dayDigitsWorkingWithDaysInSingleMonth(...rest) {
    //
    let [startDay, endDay, currentDateMinutes, endDateMinutes] = rest;

    console.log(startDay, endDay, currentDateMinutes, endDateMinutes);
    console.log("figureout func same month");
    // another approach
    if (currentDateMinutes > 0) {
      startDay++;
    }
    if (endDateMinutes > 0) {
      endDay--;
    }
    console.log(startDay, endDay);
    return subtraction(endDay, startDay);
    // another approach
    // let afterConditionCheckStartingDay = startDay,
    //   afterConditionCheckEndingDay = endDay;
    // if (currentDateMinutes > 0) {
    //   afterConditionCheckStartingDay = startDay + 1;
    // }
    // if (endDateMinutes > 0) {
    //   afterConditionCheckEndingDay = endDay - 1;
    // }
    // console.log(afterConditionCheckStartingDay, afterConditionCheckEndingDay);
  }

  /**
   *
   * **/

  /**
   * makeArrayOfYearsFromCurrentToEnd(startingYear, endingYear + 1);
   * will return an array of years
   * when length is one means startYear and endYear equal each other
   * when length is equal or greater 2 startYear and endYear do not equal each other
   * **/

  /**
   * calculating days when both currentYear and endingYear equal each other
   * **/

  /**
   * calculating days when both currentYear and endingYear and currentMonth and endingMonth
   * eqaul to each other
   * **/

  /**
   * calculating days when both currentYear and endingYear do not equal each other
   * **/

  /**
   * handle hours calculations and handle minutes calculations
   * *** previous efforts notes are in notes func at bottom of app ***
   * console.log(handleHoursDigitCalculations(dataObj.currentDate));
   * **/
  function handleHoursAndMinutesDigitCalculations(currentDateObj, endDateObj) {}

  /**
   * handle minutes calculations
   function handleMinutesDigitCalculations(currentDateObj, endDateObj) {
     // we will be working with hr and min
     // get hr from currentDateObj and minute by calling new Date()
     // then using method .getMinutes()
   }
   * **/

  /**
   * Days, Hours, Minutes Digit Calculations
   * **/

  /**
   * make array of years/values
   * how to use func below: makeArrayOfValuessFromCurrentToEnd(startingNum, endingNum + 1);
   * **/

  function makeArrayOfValuesFromCurrentToEnd(startingNum, endingNum) {
    const result = [];
    while (startingNum !== endingNum) {
      result.push(startingNum);
      startingNum++;
    }
    return result;
  }

  /**
   * helper funcs
   * **/

  /**
   * call our update element func
   * **/

  function invokeOurUpdateElementFuncs({
    daysStrForm,
    hoursStrForm,
    minutesStrForm,
    secondsStrForm,
  }) {
    const {
      flipDigitObj: { daysFlip, hoursFlip, minutesFlip },
    } = dataObj;
    console.log(daysStrForm, hoursStrForm, minutesStrForm, secondsStrForm);
    console.log(daysFlip, hoursFlip, minutesFlip);
    // update days
    // update hours
    // update minutes
  }

  /**
   * update element factory func
   * **/

  function updateElementFactoryFunc() {
    return function innerFunc(arrayOfElements, digitString) {
      // foreach
      // arrayOfElements.forEach(function updateText(element) {
      //   element.innerText = digitString
      // });
      // for of
      for (let element of arrayOfElements) {
        element.innerText = digitString;
      }
      // for loop
      // for (let index = 0; index < arrayOfElements.length; index++) {
      //   let element = arrayOfElements[index];
      //   element.innerText = digitString;
      // }
    };
  }

  /**
   * we will change flip property in dataObj to true
   * inside handleDays,handleHours, handleMinute
   * when days, hours, minuteFlip property is true
   * we want to add flip class to digit-bottom
   * change innerText/textContent of digit-bottom element
   * when will we change it to false
   * **/

  /**
   * change daysFlip, hoursFlip, minutesFlip to false
   * **/

  function changeDaysFlipHoursFlipMinutesFlipPropToFalse(flipValuesObj) {
    const { daysFlip, hoursFlip, minutesFlip } = flipValuesObj;
    // conse[daysFlip, hoursFlip, minutesFlip] = flipValues;
    // console.log("***** checking if flip value is true *****");
    // console.log(daysFlip, hoursFlip, minutesFlip);
    // days
    if (daysFlip) {
      changeDaysFlipProperty.call(flipValuesObj, "daysFlip", false);
    }
    // hours
    if (hoursFlip) {
      changeHoursFlipProperty.call(flipValuesObj, "hoursFlip", false);
    }
    // minutes
    if (minutesFlip) {
      changeMinutesFlipProperty.call(flipValuesObj, "minutesFlip", false);
    }
  }

  /**
   * add/remove class factory func
   * **/

  // const firstTime = new Date().getSeconds();
  // console.log(firstTime);
  // function timer() {
  //   return setInterval(() => {
  //     const secondTime = new Date().getSeconds();
  //     console.log(secondTime);
  //   }, 1000);
  // }
  // const stop = timer();

  function addOrRemoveFlipClassToDigitBottomElement(addOrRemoveStr) {
    const { daysDigitBottom, hoursDigitBottom, minutesDigitBottom } =
      ourSelectors();
    // if statement
    // if (addOrRemoveStr == "add") {
    //   return function innerFunc({ daysFlip, hoursFlip, minutesFlip }) {
    //     // check days
    //     if (daysFlip) {
    //       addFlipClassToDaysBottomElement.call(
    //         daysDigitBottom,
    //         "flip-bottom-transition"
    //       );
    //     }
    //     // check hours
    //     if (hoursFlip) {
    //       addFlipClassToHoursBottomElement.call(
    //         hoursDigitBottom,
    //         "flip-bottom-transition"
    //       );
    //     }
    //     // check minutes
    //     if (minutesFlip) {
    //       addFlipClassToMinutesBottomElement.call(
    //         minutesDigitBottom,
    //         "flip-bottom-transition"
    //       );
    //     }
    //   };
    // } else {
    //   // remove
    //   return function innerFunc({ daysFlip, hoursFlip, minutesFlip }) {
    //     // check days
    //     if (!daysFlip) {
    //       removeFlipClassToDaysBottomElement.call(
    //         daysDigitBottom,
    //         "flip-bottom-transition"
    //       );
    //     }
    //     // check hours
    //     if (!hoursFlip) {
    //       removeFlipClassToHoursBottomElement.call(
    //         hoursDigitBottom,
    //         "flip-bottom-transition"
    //       );
    //     }
    //     // check minutes
    //     if (!minutesFlip) {
    //       removeFlipClassToMinutesBottomElement.call(
    //         minutesDigitBottom,
    //         "flip-bottom-transition"
    //       );
    //     }
    //   };
    // }
    // switch statement
    switch (addOrRemoveStr) {
      // add
      case "add":
        // console.log("add");
        return function innerFunc({ daysFlip, hoursFlip, minutesFlip }) {
          // check days
          console.log(daysFlip, hoursFlip, minutesFlip);
          if (daysFlip) {
            addFlipClassToDaysBottomElement.call(
              daysDigitBottom,
              "flip-bottom-transition"
            );
          }
          // check hours
          if (hoursFlip) {
            addFlipClassToHoursBottomElement.call(
              hoursDigitBottom,
              "flip-bottom-transition"
            );
          }
          // check minutes
          if (minutesFlip) {
            addFlipClassToMinutesBottomElement.call(
              minutesDigitBottom,
              "flip-bottom-transition"
            );
          }
        };

      // remove
      case "remove":
        console.log("remove");
        return function innerFunc({ daysFlip, hoursFlip, minutesFlip }) {
          // check days
          console.log(daysFlip, hoursFlip, minutesFlip);
          if (!daysFlip) {
            removeFlipClassToDaysBottomElement.call(
              daysDigitBottom,
              "flip-bottom-transition"
            );
          }
          // check hours
          if (!hoursFlip) {
            removeFlipClassToHoursBottomElement.call(
              hoursDigitBottom,
              "flip-bottom-transition"
            );
          }
          // check minutes
          if (!minutesFlip) {
            removeFlipClassToMinutesBottomElement.call(
              minutesDigitBottom,
              "flip-bottom-transition"
            );
          }
        };
    }
  }

  /**
   * TODO
   function defaultTimerDaysHoursMinutesSecondsDigit() {
     //
   }
   * **/

  /**
   * func below will get upcoming hoilday obj in datesOfHoliday obj in dataObj
   * **/

  /**
   * get date, time and title of upcoming holiday helper
   * *** call this before we call/execute/invoke calculation funcs ***
   * **/

  function getNextUpcomingHolidayValues() {
    const { currentYear: year, currentMonth: month, currentDay: day } = this;
    const objOfMonthHolidayDates = dataObj.datesOfHoliday[`${year}`][month];
    // using filter
    const arrOfHolidayDates = Object.keys(objOfMonthHolidayDates);
    const [nextHolidayDate] = findDatesGreaterThanCurrentDateUsingFilter(
      arrOfHolidayDates,
      day
    );
    const { title, hours, minutes } =
      dataObj.datesOfHoliday[`${year}`][month][nextHolidayDate];
    // console.log(dataObj.datesOfHoliday[`${year}`][month][nextHolidayDate]);
    // using reduce
    /**const arrWithArrayOfDatesAndObj = Object.entries(objOfMonthHolidayDates);
    const arrOfObjs = findDatesGreaterThanCurrentDateUsingReduce(
      arrWithArrayOfDatesAndObj,
      day
    );
    console.log(arrOfObjs[0]);**/
    dataObj.defaultEndingDate = {
      title,
      year: 2024,
      month: "Feb",
      day: 10,
      // day: Number(nextHolidayDate),
      hours,
      minutes,
    };
    // dataObj.defaultEndingDate.title = title;
    // dataObj.defaultEndingDate.year = year;
    // dataObj.defaultEndingDate.month = month;
    // dataObj.defaultEndingDate.day = day;
    // dataObj.defaultEndingDate.hours = hours;
    // dataObj.defaultEndingDate.minutes = minutes;
  }

  /**
   * filter dates greater than currentDate using filter
   * **/

  function findDatesGreaterThanCurrentDateUsingFilter(arrOfDates, dateValue) {
    // arrofDates will be an array of dates ["8","17","26"]
    return arrOfDates.filter(function getDatesGreaterThanCurrentDate(
      dateString
    ) {
      const dateInNumForm = convertStrToNum(dateString);
      return dateInNumForm > dateValue;
    });
  }

  /**
   * filter dates greater than currentDate using reduce
   * **/

  function findDatesGreaterThanCurrentDateUsingReduce(arrOfDates, dateValue) {
    // arrOfDates will be array of subarrays [[date,obj]]
    // this func will find next date and return obj of title,hours, minutes
    return arrOfDates.reduce(function getObj(buildingUp, currentValue) {
      const [dateString, holidayObj] = currentValue;
      const convertToNum = convertStrToNum(dateString);
      if (convertToNum > dateValue) {
        buildingUp.push(holidayObj);
      }
      return buildingUp;
    }, []);
  }

  /**
   * get current year, month and date
   * **/

  function getCurrentYearMonthDate(dateInput) {
    const [day, month, date, year] = dateInput.toDateString().split(" ");
    return {
      currentYear: dateInput.getFullYear(),
      currentMonth: month,
      currentDay: dateInput.getDate(),
    };
  }

  /**
   * get current time: hour and minutes
   * **/

  function getCurrentHourMinutes() {
    const currentTime = new Date();
    return {
      currentHour: currentTime.getHours(),
      currentMinute: currentTime.getMinutes(),
    };
  }

  /**
   * callback to event listeners
   * **/

  /**
   * get userDate: assign values to userDateInput obj in dataObj
   * *** submit button in form submit ***
   * **/

  function getUserDateFromInputsAndAssignValuesToDataObj(event) {
    // copy obj
    // const copyOfDataObj = { ...dataObj.userDateInput };
    // console.log(copyOfDataObj);
    // event.preventDefault();
    // dataObj.userDateInput
    /**
     * event.preventDefault() will keep our form with user input element
     * on screen when submit button is clicked
     * **/
    // event.preventDefault();
    console.log(monthSelectElement.value);
    const userInputObj = Array.prototype.slice
      .call(event.target.children[1].children)
      .reduce(function makeObjWithPropertiesBasedOnElementID(
        buildingUp,
        currentElement
      ) {
        if (currentElement.tagName == "SELECT") {
          const elementID = currentElement.getAttribute("id");
          const elementValue = currentElement.value;
          buildingUp[elementID] = elementValue;
        }
        return buildingUp;
      },
      {});
    console.log(dataObj);
    const hourConvertedToTwentyFourFormat =
      convertTwelveToTwentyFourHourFormat.call(userInputObj);
    console.log(
      "hourConvertedToTwentyFourFormat",
      hourConvertedToTwentyFourFormat
    );
    // update userDateInput hour to 24hr format
    dataObj.userDateInput = {
      year: Number(userInputObj.year),
      month: userInputObj.month,
      day: Number(userInputObj.day),
      hours: Number(userInputObj.hours),
      minutes: Number(userInputObj.minutes),
      meridiem: userInputObj.meridiem,
    };
    console.log(dataObj);
    // this.reset();
  }

  /**
   * handle feb number of days when its leap year
   * Feb index is 1 when we call method .getMonth() on Date() obj
   * **/

  function addOneToYearNumDaysOrMonthNumDaysForLeapYear(
    yearTotalOrMonthTotal,
    year
  ) {
    // use modolo operator %
    return year % 4 === 0 ? yearTotalOrMonthTotal + 1 : yearTotalOrMonthTotal;
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
   * our algorithms for our timer func
   * counting down, converting 12hr format to 24h format
   * converting number to string for updating elements
   * **/

  /**
   * convert 12 hour time(AM/PM) format to 24 hour format
   * **/

  function convertTwelveToTwentyFourHourFormat(userDateInput) {
    const { hours, minutes, meridiem } = this;
    // if hour is 12 and meridiem is AM subtract 12 from 12 to get 0 by return String(0)
    // if hour is 12 and meridiem is PM return hrInput because we want the value to be 12
    let hrInTwentyFourFormat;
    switch (meridiem) {
      case "AM":
        hrInTwentyFourFormat = handleMeridiemAM(hours);
        break;
      case "PM":
        hrInTwentyFourFormat = handleMeridiemPM(hours);
        break;
    }
    console.log(hours, minutes, typeof meridiem);
    console.log(userDateInput);
    console.log(hrInTwentyFourFormat);
    return hrInTwentyFourFormat;
  }

  /**
   * handle AM meridiem
   * **/

  function handleMeridiemAM(hrInput) {
    // convert to number form
    const hourNumForm = Number(hrInput);
    // if (hourNumForm == 12) {
    //   return String(0);
    // } else {
    //   return hrInput
    // }
    // ternary operator
    return hourNumForm == 12 ? String(0) : hrInput;
  }

  /**
   * handle PM meridiem
   * **/

  function handleMeridiemPM(hrInput) {
    // convert to number form
    const hourNumForm = Number(hrInput);
    if (hourNumForm == 12) {
      return hrInput;
    } else {
      // when user input is 1 to 11
      // take hrInput add 12
      const hrConvertedToTwentyFourFormat = hourNumForm + 12;
      return String(hrConvertedToTwentyFourFormat);
    }
    // ternary operator
    // let hrConvertedToTwentyFourFormat;
    // return hourNumForm == 12
    //   ? hrInput
    //   : (hrConvertedToTwentyFourFormat = hourNumForm + 12);
  }

  /**
   * check length of digit
   * if digit >= 0 && digit < 10
   * add prepend 0 to digit
   * result will be 00 - 09
   * we could check for length of digit after we convert number to string
   * if length is 2 dont prepend 0 to digit
   * if length is 1 prepend 0 to digit
   * **

  /**
   * we want to call this func before we update/change digit element
   * days, hours, minutes, seconds
   * the value type of the daysDigit, hoursDigit, minutesDigit
   * in our dataObj will be number
   * **/
  function handlePrependExtraZeroOrNot(digit) {
    // convert to str form
    const digitNumForm = convertNumToStr(digit);
    const lengthOfDigit = digitNumForm.length;
    // if (lengthOfDigit == 1) {
    //   return `0${digitNumForm}`;
    // } else {
    //   return digitNumForm
    // }
    // ternary opertor
    return lengthOfDigit == 1 ? `0${digitNumForm}` : digitNumForm;
  }

  /**
   * prep digit value for element update
   * **/

  function prepDigitValueForUpdate(
    { daysDigit: days, hoursDigit: hours, minutesDigit: minutes },
    digitSeconds
  ) {
    return {
      daysStrForm: handlePrependExtraZeroOrNot(days),
      hoursStrForm: handlePrependExtraZeroOrNot(hours),
      minutesStrForm: handlePrependExtraZeroOrNot(minutes),
      secondsStrForm: handlePrependExtraZeroOrNot(digitSeconds),
    };
  }

  /**
   * funcs below will give us first or last value or values of an array excluding last value
   * or values of an array excluding first value
   * or values between first and last value
   * **/

  /**
   * array of nums using two indices
   * *** how to use func below:
   * arrayOfDaysInMonthUsingTwoIndices(startingIndex, endingIndex + 1, [], "current" or "end", year) ***
   * arrayOfDaysInMonthUsingTwoIndices will return an array with values of the days in a month
   * **/

  /**
   * we plan to use to func when arrayOfYears is >= 2
   * we will pass in the index of the current month and end month
   * into this func, adding one to endIndex and an array of subarrays
   * subarrays will be ["Dec", 31]
   * **/

  function arrayOfDaysInMonthUsingTwoIndices(...rest) {
    let [startingIndex, endingIndex, arrayInput, currentOrEnd, yearValue] =
      rest;
    // copy array
    const copyOfArray = [...arrayInput];
    // const copyOfArray = [].concat(arrayInput);
    // const copyOfArray = arrayInput.slice();
    const result = [];
    while (startingIndex !== endingIndex) {
      //
      const eachSubarray = copyOfArray[startingIndex];
      const [month, numOfDays] = eachSubarray;
      if (startingIndex == 1 && currentOrEnd == "end") {
        // we will handle adding 1 to feb for leap year
        // when user enter inputs here
        // func addOneToYearNumDaysOrMonthNumDaysForLeapYear
        // will return value of days for feb either 28 or 29(for leap year)
        const valueOfFebBasedOnYear =
          addOneToYearNumDaysOrMonthNumDaysForLeapYear(numOfDays, yearValue);
        result.push(valueOfFebBasedOnYear);
      } else {
        // we are handling adding 1 to leap year for current year in our data obj
        result.push(numOfDays);
      }
      startingIndex++;
    }
    console.log(result);
    return result;
  }

  /**
   * get first value in array
   * array: [1,2,3,4,5];
   * return 1
   * **/

  function valueAtFirstIndexOfArray(array) {
    const copyArray = [...array];
    return copyArray[0];
  }

  /**
   * get values between first and last value in array
   * begin returns [1,2,3,4]
   * between return [2, 3, 4]
   * end returns [2,3,4,5]
   * we declare/defined our funcs at top of app
   * **/

  function beginBetweenOrEndOfArrayFactoryFunc(beginBetweenOrEnd) {
    switch (beginBetweenOrEnd) {
      case "begin":
        return function innerFunc(array) {
          const copyArray = [...array];
          const lengthOfArray = copyArray.length;
          return copyArray.slice(0, lengthOfArray - 1);
        };
      case "between":
        return function innerFunc(array) {
          const copyArray = [...array];
          const lengthOfArray = copyArray.length;
          return copyArray.slice(0 + 1, lengthOfArray - 1);
        };
      case "end":
        return function innerFunc(array) {
          const copyArray = [...array];
          const lengthOfArray = copyArray.length;
          return copyArray.slice(0 + 1);
        };
    }
  }

  /**
   * get last value of array
   * return 5 use array.length - 1
   * **/

  function valueAtLastIndexOfArray(array) {
    const copyArray = [...array];
    const lengthOfArr = copyArray.length;
    return copyArray[lengthOfArr - 1];
  }

  /**
   * utilities func
   * **/

  /**
   * how to use addEventListener below
   * addEventListener.call(effortTwo, "keydown", testingCallback);
   * **/

  // consoleElement(
  //   arrayOfDaysDivElement,
  //   arrayOfHoursDivElement,
  //   arrayOfMinutesDivElement,
  //   arrayOfSecondsDivElement
  // );

  // function consoleElement(...element) {
  //   console.log(element);
  // }

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

  /**
   * convert to str to num
   * **/

  function convertStrToNum(str) {
    return Number(str);
  }

  /**
   * convert to num to str
   * **/

  function convertNumToStr(num) {
    return String(num);
  }

  /**
   * add class
   * **/

  function addClass() {
    return function innerFunc(classString) {
      this.classList.add(classString);
    };
  }

  /**
   * remove class
   * **/

  function removeClass() {
    return function innerFunc(classString) {
      this.classList.remove(classString);
    };
  }

  /**
   * change obj property
   * **/

  function changeObjProperty() {
    return function innerFunc(propStr, booleanValue) {
      this[propStr] = booleanValue;
    };
  }

  /**
   * arithmetic factory
   * **/

  function arithmeticFactoryFunc(arithmeticOperator) {
    switch (arithmeticOperator) {
      case "add":
        return function innerFunc(firstNum, secondNum) {
          return firstNum + secondNum;
        };
      case "subtract":
        return function innerFunc(firstNum, secondNum) {
          return firstNum - secondNum;
        };
      case "multiply":
        return function innerFunc(firstValue, secondValue = 60) {
          return firstValue * secondValue;
        };
      case "divide":
        return function innerFunc(firstValue, secondValue = 60) {
          return firstValue / secondValue;
        };
    }
  }

  /**
   * modulo func to get minutes for digit minutes element
   * we will use this func after getting ending date/day minutes
   * and current date/day minutes. adding to get total of ending and current date/day minutes
   * when we get this number, subtract this number from total minutes of both current and ending
   * date/day minutes
   * **/

  function useModuloToGetMinutesForMinuteDigitElement(numInput) {
    return numInput % 60;
  }

  /**
   * add one to year if its leap year
   * **/

  function arrOfNumOfDaysInYear(daysValue, arrInput) {
    const copyOfArray = [...arrInput];
    return copyOfArray.map(function addOneToDaysInYearOrNot(value) {
      return addOneToYearNumDaysOrMonthNumDaysForLeapYear(daysValue, value);
    });
  }

  /**
   * get sum from values of array
   * **/

  function sumCalculation(array) {
    // copy of array
    const copyOfArr = [].concat(array);
    return copyOfArr.reduce(function getTotalOfValues(
      buildingUp,
      currentValue
    ) {
      return buildingUp + currentValue;
    },
    0);
  }

  /**
   * selecting our elements
   * **/

  function ourSelectors() {
    const monthSelectElement = document.querySelector("select[id='month']");
    // form
    const formElement = document.querySelector("form");
    const userInputModalDiv = document.getElementById("modal-one");
    // days, hours, minutes, seconds digit-bottom
    const daysDigitBottom = document.querySelector(
      "div[id='days'] .digit-bottom"
    );
    const hoursDigitBottom = document.querySelector(
      "div[id='hours'] .digit-bottom"
    );
    const minutesDigitBottom = document.querySelector(
      "div[id='minutes'] .digit-bottom"
    );
    const secondDigitBottom = document.querySelector(
      "div[id='seconds'] .digit-bottom"
    );
    // array of back, top, bottom elements for days, hours, minutes, seconds
    const arrayOfDaysDivElement = Array.from(
      document.querySelectorAll("div[id='days'] > div")
    );
    const arrayOfHoursDivElement = Array.prototype.slice.call(
      document.querySelectorAll("div[id='hours'] > div")
    );
    const arrayOfMinutesDivElement = Array.from(
      document.querySelectorAll("div[id='minutes'] > div")
    );
    const arrayOfSecondsDivElement = Array.prototype.slice.call(
      document.querySelectorAll("div[id='seconds'] > div")
    );
    // const effortTwo = document.querySelector("digit-style-wrapper-two");

    return {
      monthSelectElement,
      formElement,
      userInputModalDiv,
      daysDigitBottom,
      hoursDigitBottom,
      minutesDigitBottom,
      secondDigitBottom,
      arrayOfDaysDivElement,
      arrayOfHoursDivElement,
      arrayOfMinutesDivElement,
      arrayOfSecondsDivElement,
    };
  }

  /**
   * code below this learning efforts/process
   * **/

  /**
   * if time is 14:17 use .getHours() 14 use .getMinutes() give us 17
   * 14:00 is 2pm take 14 times 60 is 840mins
   * 1440 - 840 will give us 600mins / 60 will give us 10hr
   * 10 hr left in the day digit will be 10hr
   * take 17 subtract it from 60 give us 43min left digit will be 43min
   * testing: time is 13:25 which is 1:25pm
   * call .getHours() will give us 13. take 13 times 60 will give us 780
   * call .getMinutes() will give 25
   * take 780 + 25 will give us 805
   * there are 1440 min in a day
   * 1440 - 805 gives us 635 min left
   * **/

  /**
   * if times it 0:00 digit will be 1day 0hr 0min
   * if times is 0:26 call .getMinutes() to get 26 min
   * take 26 subtract it from 60 which will give us 34
   * we can use modulo operator
   * total min % 60 will give us the reminding mins
   * take that value subtract it from total min
   * then take value of subtracting reminder from total min divide by 60
   * to give us hrs
   * **/

  /**
   * example user input:
   * may 3 2024 15:20
   * current jan 6 2022
   * **/

  /**
   * user input: jan 7 2022 7:10
   * current jan 6 2022
   * **/

  /**
   * using fetch to get holiday API
   * **/

  /** 
   * fetch("https://holidays.abstractapi.com/v1/?api_key=223c83a9028a45629d4d7634eac45bb5&country=US&year=2020&month=12&day=25").then((response)=>{
return response.json();
}).then((data)=>{

console.log(data);
});
   * **/

  // fetch(
  //   "https://holidays.abstractapi.com/v1/?api_key=223c83a9028a45629d4d7634eac45bb5&country=US&year=2020&month=12&day=25"
  // )
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((data) => {
  //     console.log(data);
  //   });

  /**
   * reason we pass in endingMonth + 1
   * our while loop will loop as long as startingIndex !== endingIndex
   * we want to include the value at the last index of the array. array.length - 1
   * if we didnt add 1 to endingMonthIndex while loop will stop when startingIndex == endingIndex
   * and will not add last value of array to result array
   * starting: 0,
   * ending: 4
   * while(0 !== 4) true enter while loop push value at arr[0]
   * while(4 !== 4) false not enter while loop we dont push value at arr[4]
   * **/

  arrayNumsOfDaysInMonth(currentMonth, endingMonth + 1, arrayOfSubarrays);

  /**
   * have func that loop starting at currentMonth index and ends at endingMonth index
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
    // let counter = 0;
    while (startingIndex !== endingIndex) {
      console.log(copyOfArray[startingIndex]);
      // console.log(startingIndex);
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
    const [endingMonthValue, resultArrWithoutLastValue] =
      getEndingDateNumOfDays(result);
    console.log(endingMonthValue);
    console.log(resultArrWithoutLastValue);
    // const [currentMonthDaysValue, ...rest] = resultArrWithoutLastValue;
    // console.log(currentMonthDaysValue);
    // console.log(rest);
    const currentMonthDaysValue = getCurrentMonthNumOfDays(
      resultArrWithoutLastValue
    );
    console.log(currentMonthDaysValue);
    const daysBetweenCurrentAndEndingMonth = numOfDaysBetweenCurrAndEndingMonth(
      resultArrWithoutLastValue
    );
    console.log(daysBetweenCurrentAndEndingMonth);
    console.log(
      "total days",
      totalDaysOfMonthsBetweenCurrentAndEndingDate(
        daysBetweenCurrentAndEndingMonth
      )
    );
  }

  /**
   * starting month num of days
   * **/

  function getEndingDateNumOfDays(arrInput) {
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
  function numOfDaysBetweenCurrAndEndingMonth(array) {
    const copyOfArr = [...array];
    const [, ...rest] = copyOfArr;
    return rest;
  }
  /**
   * get total days months between current and starting date
   * **/

  function totalDaysOfMonthsBetweenCurrentAndEndingDate(array) {
    const copyOfArr = [...array];
    return copyOfArr.reduce(function addValues(buildingUp, currentDays) {
      return buildingUp + currentDays;
    }, 0);
  }

  /**
   * get year, month, date(number), hours and minute of date
   * **/

  function getCurrentYearMonthAndTimeOfDate(currentDateInput) {
    const [currentDay, currentMonth, currentDate, currentYear] =
      currentDateInput.toDateString().split(" ");
    return {
      year: currentYear,
      month: currentMonth,
      day: currentDateInput.getDate(),
      hours: currentDateInput.getHours(),
      minutes: currentDateInput.getMinutes(),
    };
  }

  /**
   * get currentDate: assign values to currentDate obj in dataObj
   * getCurrentDateAndAssignValuesToDataObj();
   * *** might not need this func because we always want to work with the
   * most current time
   * *** different approach we will split date and time into two func
   * one for date and one for time ***
   * **/

  function getCurrentDateAndAssignValuesToDataObj() {
    // create currDate variable
    const newCurrentDate = new Date();
    // destructure obj
    const { year, month, day, hours, minutes } =
      getCurrentYearMonthAndTimeOfDate(newCurrentDate);
    // assign current date values to data obj
    dataObj.currentDate.year = Number(year);
    dataObj.currentDate.month = month;
    dataObj.currentDate.day = day;
    dataObj.currentDate.time.hours = hours;
    dataObj.currentDate.time.minutes = minutes;
  }

  /**
   * notes
   * **/
  const notes = function () {
    /**
     * handle days calculations
     * **/

    function handleDaysDigitCalculations(currentDateObj, endDateObj) {
      // we will be working with hr and min
      // get hr from currentDateObj and minute by calling new Date()
      // then using method .getMinutes()
      // when time is 0:00 take endDate - currentDate
      // when time is 0:01 subtract 1 from the sum of endDate - currentDate
    }

    /**
     * makeArrayOfYearsFromCurrentToEnd(startingYear, endingYear + 1);
     * will return an array of years
     * when length is one means startYear and endYear equal each other
     * when length is equal or greater 2 startYear and endYear do not equal each other
     * **/

    /**
     * calculating days when both currentYear and endingYear equal each other
     * **/

    /**
     * calculating days when both currentYear and endingYear and currentMonth and endingMonth
     * eqaul to each other
     * **/

    /**
     * calculating days when both currentYear and endingYear do not equal each other
     * **/

    /**
     * handle hours calculations and handle minutes calculations
     * **/
    console.log(handleHoursDigitCalculations(dataObj.currentDate));
    function handleHoursAndMinutesDigitCalculations(
      currentDateObj,
      endDateObj
    ) {
      // we will be working with hr and min
      // get hr from currentDateObj and minute by calling new Date()
      // then using method .getMinutes()
      // if currentDate and endDate, year, month and day equal each
      // take currentDateHour subtract it from endDateHour
      // we will be working with 24hr format
      // when time is 0:00 which is 12am
      // our digit display will be 1day 0hr 0min
      // when time is 0:01 which is 12:01am
      // our digit display will be 0day 23hr 59min
      // const {
      //   time: { hours: currentHr },
      // } = currentDateObj;
      // const currentMin = new Date().getMinutes();
      // console.log(`${currentHr} ${currentMin}`);
      /**
       * testing
       * const currentHr = 23;
       * const currentMin = 1;
       * **/

      /**
       * when time is 0:00 hr is 0
       * when minutes is :00 & hr is greater than 0
       * 1:00 take substract currentHr from 24
       * when minutes is greater than :00 subtract currentHr from 23
       *
       * **/
      if (currentHr === 0 && currentMin === 0) {
        // when time is 0:00 enter this if statement
        return 0;
      } else {
        // when time is not 0:00 enter this else
        // if (currentMin > 0) {
        //   // take currentHr subtract it from 23
        //   return 23 - currentHr;
        // } else {
        //   // take currentHr subtract it from 24
        //   return 24 - currentHr;
        // }
        // ternary operator
        return currentMin > 0 ? 23 - currentHr : 24 - currentHr;
      }
    }

    /**
   * handle minutes calculations
   function handleMinutesDigitCalculations(currentDateObj, endDateObj) {
     // we will be working with hr and min
     // get hr from currentDateObj and minute by calling new Date()
     // then using method .getMinutes()
   }
   * **/
    // const obj = {
    //   2022: {
    //     Jan: {
    //       17: {
    //         title: "Martin Luther King Jr Day",
    //         hours: "0",
    //         minutes: "00",
    //       },
    //     },
    //     Feb: {
    //       1: {
    //         title: "Tet: Vietnamese New Year",
    //         hours: "0",
    //         minutes: "00",
    //       },
    //       14: {
    //         title: "Valentine's Day",
    //         hours: "0",
    //         minutes: "00",
    //       },
    //     },
    //     Mar: {
    //       17: {
    //         title: "Saint Patrick's Day",
    //         hours: "0",
    //         minutes: "00",
    //       },
    //     },
    //     Apr: {
    //       17: {
    //         title: "Easter Sunday",
    //         hours: "0",
    //         minutes: "00",
    //       },
    //     },
    //     May: {
    //       30: {
    //         title: "Memorial Day",
    //         hours: "0",
    //         minutes: "00",
    //       },
    //     },
    //     Jul: {
    //       4: {
    //         title: "Independence Day",
    //         hours: "0",
    //         minutes: "00",
    //       },
    //     },
    //     Sep: {
    //       5: {
    //         title: "Labor Day",
    //         hours: "0",
    //         minutes: "00",
    //       },
    //     },
    //     Oct: {
    //       31: {
    //         title: "Halloween",
    //         hours: "0",
    //         minutes: "00",
    //       },
    //     },
    //     Nov: {
    //       24: {
    //         title: "Thanksgiving",
    //         hours: "0",
    //         minutes: "00",
    //       },
    //     },
    //     Dec: {
    //       25: {
    //         title: "Christmas",
    //         hours: "0",
    //         minutes: "00",
    //       },
    //     },
    //   },
    //   datesOfHoliday2022: {
    //     MLKjrDay: {
    //       month: "January",
    //       day: "17",
    //       year: "2022",
    //       hours: "0",
    //       minutes: "00",
    //     },
    //     VNtet: {
    //       month: "February",
    //       day: "1",
    //       year: "2022",
    //       hours: "0",
    //       minutes: "00",
    //     },
    //     MemorialDay: {
    //       month: "May",
    //       day: "30",
    //       year: "2022",
    //       hours: "0",
    //       minutes: "00",
    //     },
    //     IndependenceDay: {
    //       month: "July",
    //       day: "4",
    //       year: "2022",
    //       hours: "0",
    //       minutes: "00",
    //     },
    //     LaborDay: {
    //       month: "September",
    //       day: "5",
    //       year: "2022",
    //       hours: "0",
    //       minutes: "00",
    //     },
    //     Thanksgiving: {
    //       month: "November",
    //       day: "24",
    //       year: "2022",
    //       hours: "0",
    //       minutes: "00",
    //     },
    //     Christmas: {
    //       month: "December",
    //       day: "25",
    //       year: "2022",
    //       hours: "0",
    //       minutes: "00",
    //     },
    //     NewYear: {
    //       month: "January",
    //       day: "1",
    //       year: "2023",
    //       hours: "0",
    //       minutes: "00",
    //     },
    //   },
    // };
    console.log(document.querySelectorAll("div[id='seconds'] > div"));

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
    function TODO(event) {
      // copy obj
      // const copyOfDataObj = { ...dataObj.userDateInput };
      // console.log(copyOfDataObj);
      // event.preventDefault();
      console.log(monthSelectElement.value);
      dataObj.userDateInput = Array.prototype.slice
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
      convertTwelveToTwentyFourHourFormat.call(dataObj.userDateInput);
      // this.reset();
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

    const obj = {
      2022: {
        Jan: {
          17: {
            title: "Martin Luther King Jr Day",
            hours: "0",
            minutes: "00",
          },
        },
        Feb: {
          1: {
            title: "Tet: Vietnamese New Year",
            hours: "0",
            minutes: "00",
          },
          14: {
            title: "Valentine's Day",
            hours: "0",
            minutes: "00",
          },
        },
        Mar: {
          17: {
            title: "Saint Patrick's Day",
            hours: "0",
            minutes: "00",
          },
        },
        Apr: {
          17: {
            title: "Easter Sunday",
            hours: "0",
            minutes: "00",
          },
        },
        May: {
          30: {
            title: "Memorial Day",
            hours: "0",
            minutes: "00",
          },
        },
        Jul: {
          4: {
            title: "Independence Day",
            hours: "0",
            minutes: "00",
          },
        },
        Sep: {
          5: {
            title: "Labor Day",
            hours: "0",
            minutes: "00",
          },
        },
        Oct: {
          31: {
            title: "Halloween",
            hours: "0",
            minutes: "00",
          },
        },
        Nov: {
          24: {
            title: "Thanksgiving",
            hours: "0",
            minutes: "00",
          },
        },
        Dec: {
          25: {
            title: "Christmas",
            hours: "0",
            minutes: "00",
          },
        },
      },
      datesOfHoliday2022: {
        MLKjrDay: {
          month: "January",
          day: "17",
          year: "2022",
          hours: "0",
          minutes: "00",
        },
        VNtet: {
          month: "February",
          day: "1",
          year: "2022",
          hours: "0",
          minutes: "00",
        },
        MemorialDay: {
          month: "May",
          day: "30",
          year: "2022",
          hours: "0",
          minutes: "00",
        },
        IndependenceDay: {
          month: "July",
          day: "4",
          year: "2022",
          hours: "0",
          minutes: "00",
        },
        LaborDay: {
          month: "September",
          day: "5",
          year: "2022",
          hours: "0",
          minutes: "00",
        },
        Thanksgiving: {
          month: "November",
          day: "24",
          year: "2022",
          hours: "0",
          minutes: "00",
        },
        Christmas: {
          month: "December",
          day: "25",
          year: "2022",
          hours: "0",
          minutes: "00",
        },
        NewYear: {
          month: "January",
          day: "1",
          year: "2023",
          hours: "0",
          minutes: "00",
        },
      },
    };
  };
})();
