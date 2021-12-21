(function scoprOurVariables() {
  //   declare selector at top of func
  const { effortTwo } = ourSelectors();

  //   addEventListener.call(effortTwo, "keydown", testingCallback);

  function testingCallback(event) {
    console.log(event);
    const eventObjProperties = propertiesOfEventObj.call(event);
    console.log(eventObjProperties);
  }

  function addEventListener(eventStr, eventCallback) {
    this.addEventListener(eventStr, eventCallback);
    console.log(eventStr);
    console.log(eventCallback);
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
    setInterval(() => {
      const currentDate = new Date();
      let currentSecond = 60 - currentDate.getSeconds();
      if (currentSecond == 60) {
        currentSecond = 0;
      }
      console.log(currentSecond);
    }, 1000);
  }

  const accessOurData = scopedOurData();

  function scopedOurData() {
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
      name: "Deadpool",
      sayHi() {
        console.log(`${this.name} hello`);
      },
    };

    return function closureOverOurVariables() {
      return innerDataObj;
    };
  }

  const dataObj = accessOurData();
  const testObj = {
    name: "Spider-Man",
  };
  console.log(dataObj.sayHi.call(testObj));

  function ourSelectors() {
    const effortTwo = document.querySelector("digit-style-wrapper-two");

    return {
      effortTwo,
    };
  }

  function findIndexOfSubarray(arrInput, strFormOfMonth) {}

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
   * ***/
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
})();
