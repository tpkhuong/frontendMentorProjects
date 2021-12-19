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
})();
