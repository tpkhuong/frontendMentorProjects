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

  function ourSelectors() {
    const effortTwo = document.querySelector("digit-style-wrapper-two");

    return {
      effortTwo,
    };
  }
})();
