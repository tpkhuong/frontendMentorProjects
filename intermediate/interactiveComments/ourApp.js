(function scopeOurVariables() {
  // our selectors
  /** when we build content/container with reply, delete, **/
  const selectBtnModal = document.querySelector(".user-select-btns");
  const selectUserBtn = document.querySelector(".select-user-btn");
  const closeBtnModal = document.querySelector(".close-select-user-modal");
  const sendPostBtn = document.querySelector(".post-send-btn");
  const replyPostBtn = document.querySelector(".reply-post-btn");
  const commentsContainer = document.querySelector(".comments");
  // const commentTextBox = document.querySelector(".comment-textbox");
  const commentTextBoxAvatarImg = document.querySelector(
    ".comment-textbox .avatar img"
  );
  const selectUserModalWrapper = document.querySelector(
    ".select-user-modal-wrapper"
  );
  const arrayOfSelectUserBtns = Array.prototype.slice.call(
    document.querySelectorAll(".select-user-buttons-wrapper [selectuser]")
  );
  // access our cached data
  const callOurCachedFunc = useLocalStorage();
  const { data: cachedData, localStoragedata } = callOurCachedFunc();
  // call our local storage func
  //   useLocalStorage();
  // add click event to select user btns wrapper
  applyEvent(selectUserModalWrapper, "click", clickEventForUserBtnsModal);
  // add click event to comment/reply element
  applyEvent(sendPostBtn, "click", runFuncForSendOrReplyBtn);
  applyEvent(replyPostBtn, "click", runFuncForSendOrReplyBtn);
  // add click to select user button
  applyEvent(selectUserBtn, "click", showSelectUserButtons);
  // add focus and blur listen to select user btn and close modal btn
  // open modal
  //   applyEvent(selectUserBtn, "focus", changeAttrToShowOutlineRing);
  //   applyEvent(selectUserBtn, "blur", changeAttrToHideOutlineRing);
  //   // close modal
  //   applyEvent(closeBtnModal, "focus", changeAttrToShowOutlineRing);
  //   applyEvent(closeBtnModal, "blur", changeAttrToHideOutlineRing);
  // show select user buttons modal
  function showSelectUserButtons(event) {
    const statusOfSelectUserModal = selectBtnModal.getAttribute(
      "userclickselectuser"
    );
    if (statusOfSelectUserModal == "false") {
      selectBtnModal.setAttribute("userclickselectuser", "true");
      closeBtnModal.focus();
    }
  }
  // send post comment/reply post event func
  function runFuncForSendOrReplyBtn(event) {
    const classOfBtn = event.target.className;
    if (classOfBtn == "post-send-btn") {
      //   console.log(createUniqueId(cachedData.currentUser.userName));
      //   const newUniqueId = createUniqueId(cachedData.currentUser.userName);
      //   cachedData.uniqueID = newUniqueId;
      // user entered comment data/value
      const commentTextareaValue = document.querySelector(
        ".comment-textbox textarea"
      ).value;
      const commentUserDataObj = createUserDataObj(
        createUniqueId(cachedData.currentUser.userName),
        commentTextareaValue,
        undefined,
        createTimeObj(),
        cachedData.repliesLevel,
        cachedData.currentUser
      );
      document.querySelector(".comment-textbox textarea").value = "";
      commentUserDataObj[
        `${cachedData.repliesLevel[commentUserDataObj.level]}LevelReplies`
      ].push("hello react world");
      console.log(
        commentUserDataObj[
          `${cachedData.repliesLevel[commentUserDataObj.level]}LevelReplies`
        ]
      );
      //   localStoragedata.comments.push(commentUserDataObj);
      localStorage.setItem("commentDataObj", JSON.stringify(localStoragedata));
    }
    if (classOfBtn == "reply-post-btn") {
      console.log("reply");
      /**
       * use uniqueID to select reply-textbox and linerepliesbox element
       * **/
      // use .closest method to find element with attr uniqueID, get value of that attr
      // use that uniqueID, run func that will loop through array of objs
      // and find the obj that matches uniqueID
      // pass value of uniqueID
      const replyboxTextareaValue = document.querySelector(
        ".uniqueId-wrapper .reply-textbox textarea"
      ).value;
      const replyUserDataObj = createUserDataObj(
        createUniqueId(cachedData.currentUser.userName),
        replyboxTextareaValue,
        // value of uniqueID obj level will go here
        "first",
        createTimeObj(),
        cachedData.repliesLevel,
        cachedData.currentUser
      );
      // empty textarea text
      document.querySelector(
        ".uniqueId-wrapper .reply-textbox textarea"
      ).value = "";
      // once we get the obj of data we will use that obj level property along with obj replieslevel
      // to build a string that will match the value of the div element's linerepliesbox attr
      // since we have the obj that matches the uniqueID we can add the userDataObj that is created
      // when user clicked on reply post btn
      // another option we can run func that will loop through objs in array
      // find the obj with uniqueID that matches the
      // uniqueID of container of our content,reply box and replies element
      // add the userDataObj created when user clicked on reply post btn
    }
  }
  // send/reply comment
  function postCommentOrReply(container) {
    // append comment/reply to container
  }
  // listen to click event for select user btns
  function clickEventForUserBtnsModal(event) {
    if (event.target.closest("BUTTON")) {
      const btnInUserModalClicked = event.target.closest("BUTTON");
      if (
        btnInUserModalClicked.getAttribute("class") ==
          "close-select-user-modal" ||
        btnInUserModalClicked.getAttribute("selectuser") != null
      ) {
        console.log(cachedData.currentUser);
        if (
          btnInUserModalClicked.getAttribute("class") !=
          "close-select-user-modal"
        ) {
          console.log("hello");
          // get btn select name
          const userBtnSelectname =
            btnInUserModalClicked.getAttribute("selectuser");
          // get img src
          const userBtnChildImgSrc =
            btnInUserModalClicked.firstElementChild.getAttribute("src");
          console.log(userBtnSelectname, userBtnChildImgSrc);
          //   update current user info in dataobj
          updateCurrentUserInCachedObj(
            userBtnSelectname,
            userBtnChildImgSrc,
            cachedData
          );

          // array of items to assign values to
          const arrayOfObjWithValues = filterOutUserClicked(
            userBtnSelectname,
            cachedData.contentForSelectUserButtons
          );
          console.log(arrayOfObjWithValues);
          // assign values to select user btns
          assignValuesSelectUserBtns(
            arrayOfSelectUserBtns,
            arrayOfObjWithValues
          );
          // change avatar img
          commentTextBoxAvatarImg.setAttribute(
            "src",
            cachedData.currentUser.imgSrc
          );
          // select all element with user attr
          // filter out element with user attr that match current user
          // use foreach to loop through array and set value "true" to attr currentuser
          // and filter out element with user attr that does not match current user
          // use foreach to loop through array and set value "false" to attr currentuser
          const [changeValueToTrue, changeValueToFalse] = Array.prototype.slice
            .call(document.querySelectorAll("[user]"))
            .reduce(
              function makeTwoArrays(buildingUp, currentValue) {
                // get value of attr user for each elemetn
                const userAttValue = currentValue.getAttribute("user");
                userAttValue == cachedData.currentUser.userName
                  ? buildingUp[0].push(currentValue)
                  : buildingUp[1].push(currentValue);
                return buildingUp;
                // if else statement
                // if (userAttValue == cachedData.currentUser.userName) {
                //     buildingUp[0].push(currentValue);
                // } else {
                //     buildingUp[1].push(currentValue);
                // }
                // return buildingUp;
              },
              [[], []]
            );
          alert("for reply btn aria-label say reply to post made by");
          alert(
            "when use hit send or reply btn. say comment or reply posted for a11y"
          );
          // use foreach to loop through array and set value "true" to attr currentuser
          changeValueToTrue.forEach(function showDeleteAndEditBtn(element) {
            if (element.getAttribute("data-currentUser") != "true") {
              element.setAttribute("data-currentUser", "true");
            }
          });
          // use foreach to loop through array and set value "false" to attr currentuser
          changeValueToFalse.forEach(function showReplyBtn(element) {
            if (element.getAttribute("data-currentUser") != "false") {
              element.setAttribute("data-currentUser", "false");
            }
          });
          // select all all element with this selector .reply-textbox .avatar img
          // set src attr of each img element current user img file
          // use value in cachedData.currentUser
          Array.prototype.slice
            .call(document.querySelectorAll(".reply-textbox .avatar img"))
            .forEach(function changeImgSrc(eachImg) {
              eachImg.setAttribute("src", cachedData.currentUser.imgSrc);
            });
          console.log(cachedData.currentUser);
        }
        // hide user buttons modal when user click on close modal button or user btn
        hideSelectUserButtons(selectBtnModal);
        console.log(cachedData);
        //   focus select user btn when user click on close modal btn or a user btn
        selectUserBtn.focus();
      }
    }
  }
  // hide select user buttons modal
  function hideSelectUserButtons(userModal) {
    const statusOfSelectUserModalCloseBtn = userModal.getAttribute(
      "userclickselectuser"
    );
    // if (statusOfSelectUserModalCloseBtn == "true") {
    //   userModal.setAttribute("userclickselectuser", "false");
    // }
    // ternary operator
    statusOfSelectUserModalCloseBtn == "true"
      ? userModal.setAttribute("userclickselectuser", "false")
      : null;
  }

  // updateCurrentUserInCachedObj
  function updateCurrentUserInCachedObj(user, imgSrc, data) {
    data.currentUser.userName = user;
    data.currentUser.imgSrc = imgSrc;
  }
  // assign values to select user btns
  function assignValuesSelectUserBtns(btnsArray, arrayOfObj) {
    const copyOfBtns = [...btnsArray];
    const copyArrayOfObj = [...arrayOfObj];
    copyOfBtns.forEach(function assignValues(eachBtn, index) {
      const { name, src, label } = copyArrayOfObj[index];
      // img
      eachBtn.firstElementChild.setAttribute("src", src);
      // button
      eachBtn.setAttribute("selectuser", name);
      eachBtn.setAttribute("aria-label", label);
    });
  }
  // find path of element clicked. could be comment/replies
  function TODO(stuff) {
    //
  }
  // add event listener
  function applyEvent(element, eventListener, func) {
    element.addEventListener(eventListener, func);
  }
  //   filter out user of click selected user btn
  function filterOutUserClicked(username, array) {
    const copyArray = [...array];
    return copyArray.filter(function btnsNotMatchedUserClicked(eachObj) {
      const nameProperty = eachObj.name;
      return nameProperty != username;
    });
  }
  //
  // change attr to show select btn or close btn apply outline ring
  //   function changeAttrToShowOutlineRing(event) {
  //     if (this.getAttribute("buttonHasFocus") != null) {
  //       this.getAttribute("buttonHasFocus") == "false"
  //         ? this.setAttribute("buttonHasFocus", "true")
  //         : null;
  //     }
  //   }
  // change attr to hide select btn or close btn apply outline ring
  //   function changeAttrToHideOutlineRing(event) {
  //     if (this.getAttribute("buttonHasFocus") != null) {
  //       this.getAttribute("buttonHasFocus") == "true"
  //         ? this.setAttribute("buttonHasFocus", "false")
  //         : null;
  //     }
  //   }
  // create button and append to user buttons wrapper

  /**
   * create uniqueId with current username
   * **/

  function createUniqueId(user) {
    const randomNumber = `${generateRandomNumber()}`.slice(0, 5);
    return `${user}${randomNumber}`;
  }
  /**
   * generate random number using current time
   * **/

  function generateRandomNumber() {
    return Math.random() * new Date().getTime();
  }

  /**
   * time property of element obj: duration property(current time - createdAt) and createdAt property(May 2 2022 11:30)
   * **/

  /**
   * func that will return obj with difference in day,month,year
   * **/

  function calculateDifferenceInDayMonthYear(createdAtObj, currentTimeObj) {
    // calculate difference in year
    const differenceInYear =
      Number(currentTimeObj.year) - Number(createdAtObj.year);
    // calculate difference in month
    /**
     * for month we will get month in number here using month in str form
     * "May","June" and etc
     * **/
    const differenceInMonth =
      Number(cachedData.monthInNumber[currentTimeObj.month]) -
      Number(cachedData.monthInNumber[createdAtObj.month]);
    // calculate difference in day
    const differenceInDay =
      Number(currentTimeObj.day) - Number(createdAtObj.day);
    return {
      differenceInYear,
      differenceInMonth,
      differenceInDay,
    };
  }

  /**
   * run func based on conditions
   * **/

  function callFuncCalculateDurationBasedOnConditions(createdAt, currentTime) {
    /**
     * this func will return a string of "1 day" or "2 days" etc
     * which will allow us to use the returned value to assign it to createdAt duration property
     * in the uniqueId element data obj or use it to assign value to span with class digit and span with class days
     * **/
    // call func calculateDifferenceInDayMonthYear destructure values
    const { differenceInYear, differenceInMonth, differenceInDay } =
      calculateDifferenceInDayMonthYear(createdAt, currentTime);
    // if year and month equal to 0 pass diff in days to calculateDayAndWeek
    if (differenceInYear == 0 && differenceInMonth == 0) {
      return calculateDayAndWeek(differenceInDay);
    }
    /** **/
    // if year equal 0 && month >= 1
    if (differenceInYear == 0 && differenceInMonth >= 1) {
      if (differenceInDay >= 0) {
        // check diff in days
        // if diff in days >= 0 pass value of diff in month to checkifneedplural
        return checkIfNeedPluralFormOfCreatedAtDuration(
          differenceInMonth,
          "month"
        );
      } else {
        // else
        // calculate total days left in createdAt month + days of currentdate month
        // pass that value to calculateDayAndWeek
        const daysInCreatedAtMonth =
          createdAt.month == "Feb"
            ? createdAt.year % 4 == 0
              ? 29
              : 28
            : cachedData.numOfDaysOfMonths[createdAt.month];
        const totalDaysLeftInMonth = daysInCreatedAtMonth + currentTime.day;
        return checkIfNeedPluralFormOfCreatedAtDuration(totalDaysLeftInMonth);
      }
    }
    /** **/
    // if year == 1
    if (differenceInYear == 1) {
      if (differenceInMonth >= 0) {
        // check month
        // if month is >= 0 pass value of diff in year to checkifneedplural
        return checkIfNeedPluralFormOfCreatedAtDuration(differenceInMonth);
      } else {
        // else month is < 0
        // pass value of createdAt month and currentTime month in number form to monthCalcuation
        return monthCalcuation(
          cachedData.monthInNumber[createdAt.month],
          cachedData.monthInNumber[currentTime.month]
        );
      }
    }
    /** **/
    // if year > 1 pass diff in year value to checkifneedplural
    if (differenceInYear > 1) {
      return checkIfNeedPluralFormOfCreatedAtDuration(differenceInYear);
    }
  }

  /**
   * func to calculate day and week
   * **/

  function calculateDayAndWeek(differenceInDays) {
    // call day calculation or week calculation based on conditions
    if (differenceInDays <= 7) {
      // call daysCalculation
      return daysCalculation(differenceInDays);
    }
    if (differenceInDays >= 8 && differenceInDays <= 31) {
      // call weeksCalculation
      return weeksCalculation(differenceInDays);
    }
  }

  /**
   * day calculation
   * **/

  function daysCalculation(totalDays) {
    // totaldays will be number between 0 and 7
    return checkIfNeedPluralFormOfCreatedAtDuration(totalDays, "days");
  }

  /**
   * week calculation
   * **/

  function weeksCalculation(daysTotal) {
    switch (true) {
      case daysTotal >= 8 && daysTotal <= 14:
        return checkIfNeedPluralFormOfCreatedAtDuration(1, "week");
      case daysTotal >= 15 && daysTotal <= 21:
        return checkIfNeedPluralFormOfCreatedAtDuration(2, "week");
      case daysTotal >= 22 && daysTotal <= 28:
        return checkIfNeedPluralFormOfCreatedAtDuration(3, "week");
      case daysTotal >= 29 && daysTotal <= 31:
        return checkIfNeedPluralFormOfCreatedAtDuration(4, "week");
    }
  }

  /**
   * month calculation
   * **/

  function monthCalcuation(createdAtMonth, currentTimeMonth) {
    // calculate months left in createdAtYear by subtracting createdAtMonth value from 12
    const monthsLeftInCreatedAtTime = 12 - createdAtMonth;
    // take that value + currentTimeMonth value to get total months
    const totalOfMonths = monthsLeftInCreatedAtTime + currentTimeMonth;
    return checkIfNeedPluralFormOfCreatedAtDuration(totalOfMonths, "month");
  }

  /**
   * make a func that will check and return plural form of day,week,month,year
   * **/

  function checkIfNeedPluralFormOfCreatedAtDuration(digit, dayFormStr) {
    return digit > 1 ? `${digit} ${dayFormStr}s` : `${digit} ${dayFormStr}`;
  }

  /**
   * create user data obj when user click send on comment box or reply for reply box
   * **/

  function createUserDataObj(
    userUniqueID,
    usercontent,
    level = "base",
    timeObj,
    replyObj,
    usernameAngImgObj
  ) {
    //
    const userObj = {};
    userObj.uniqueID = userUniqueID;
    userObj[`${userUniqueID}content`] = usercontent;
    userObj[`${userUniqueID}score`] = 0;
    userObj[`${userUniqueID}time`] = timeObj;
    userObj.userInfo = usernameAngImgObj;
    userObj.level = level;
    userObj[`${replyObj[userObj.level]}LevelReplies`] = [];
    return userObj;
  }

  /**
   * create time obj
   * **/

  function createTimeObj(dateString = new Date().toDateString()) {
    const [month, date, year] = dateString.slice(4).split(" ");
    return {
      createdAt: dateString,
      dateObj: {
        year,
        month,
        date,
      },
    };
  }

  /**
   * create
   * **/

  function useLocalStorage() {
    // data obj
    const data = {
      objMatchingUniqueID: null,
      repliesLevel: {
        base: "first",
        first: "second",
        second: "third",
        third: "fourth",
        fourth: "fifth",
      },
      monthInNumber: {
        Jan: 1,
        Feb: 2,
        Mar: 3,
        Apr: 4,
        May: 5,
        Jun: 6,
        Jul: 7,
        Aug: 8,
        Sep: 9,
        Oct: 10,
        Nov: 11,
        Dec: 12,
      },
      numOfDaysOfMonths: {
        Jan: 31,
        Feb:
          this.currentYear % 4 === 0
            ? 29
            : 28 /** get year of current date and createdAt date **/,
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
      currentUser: {
        imgSrc: "./images/avatars/image-amyrobson.png",
        userName: "amyrobson",
      },
      uniqueID: null,
      contentForSelectUserButtons: [
        {
          name: "amyrobson",
          src: "./images/avatars/image-amyrobson.png",
          label: "click to select user amy robson",
        },
        {
          name: "juliusomo",
          src: "./images/avatars/image-juliusomo.png",
          label: "click to select user juliu somo",
        },
        {
          name: "maxblagun",
          src: "./images/avatars/image-maxblagun.png",
          label: "click to select user max blagun",
        },
        {
          name: "ramsesmiron",
          src: "./images/avatars/image-ramsesmiron.png",
          label: "click to select user ramses miron",
        },
      ],
    };
    // local storage
    const localStoragedata = {
      /**
       * we will add obj to comment property dynamically
       * **/
      comments: [],
    };
    localStorage.setItem("commentDataObj", JSON.stringify(localStoragedata));
    return function closureOurData() {
      return { data, localStoragedata };
    };
  }
  /**
   * testing our ideas
   * **/
  function testingIdeas() {
    const repliesLevel = {
      base: "first",
      first: "second",
      second: "third",
      arrOfObj: [],
    };
    function nestedLooping(list) {
      list.forEach(function printStuff(eachObj) {
        //   build element
        //   const buildingAccessPropStr = repliesLevel[eachObj.level];
        if (
          eachObj.hasOwnProperty(
            `${repliesLevel[eachObj.level]}LevelReplies`
          ) &&
          eachObj[`${repliesLevel[eachObj.level]}LevelReplies`].length > 0
        ) {
          nestedLooping(eachObj[`${repliesLevel[eachObj.level]}LevelReplies`]);
        }
        /**
         * order of console.log() print when console.log(eachObj.print); is below
         * if (eachObj.hasOwnProperty("replies") && eachObj.replies.length > 0) {
         * nestedLooping(eachObj.replies);
         * }
         * secondlevel first obj
         * firstlevel first obj
         * thirdlevel second obj
         * secondlevel second obj
         * number
         * string
         * second level
         * secondlevel
         * firstlevel second obj
         * thirdlevel
         * secondlevel third obj
         * thirdlevel
         * secondlevel third obj
         * firstlevel third obj
         * **/
        if (eachObj.hasOwnProperty("uniqueID")) {
          eachObj.uniqueID = "hello we changed the value of the string";
        }
        console.log(eachObj?.uniqueID);
        console.log(eachObj.print);
      });
    }

    function nestedLoopingReturnArray(list, repliesLevelObj) {
      const result = [];
      list.forEach(function printStuff(eachObj) {
        //   build element
        //   const buildingAccessPropStr = repliesLevelObj[eachObj.level];
        if (
          eachObj.hasOwnProperty(
            `${repliesLevelObj[eachObj.level]}LevelReplies`
          ) &&
          eachObj[`${repliesLevelObj[eachObj.level]}LevelReplies`].length > 0
        ) {
          nestedLoopingReturnArray(
            eachObj[`${repliesLevelObj[eachObj.level]}LevelReplies`],
            repliesLevelObj
          );
        }
        /**
         * order of console.log() print when console.log(eachObj.print); is below
         * if (eachObj.hasOwnProperty("replies") && eachObj.replies.length > 0) {
         * nestedLooping(eachObj.replies);
         * }
         * secondlevel first obj
         * firstlevel first obj
         * thirdlevel second obj
         * secondlevel second obj
         * number
         * string
         * second level
         * secondlevel
         * firstlevel second obj
         * thirdlevel
         * secondlevel third obj
         * thirdlevel
         * secondlevel third obj
         * firstlevel third obj
         * **/
        if (eachObj.hasOwnProperty("uniqueID") && eachObj.uniqueID == "123") {
          //   eachObj.uniqueID = "hello we changed the value of the string";
          repliesLevelObj.arrOfObj.push(eachObj);
        }
        console.log(eachObj?.uniqueID);
        console.log(eachObj.print);
      });
      //   return result;
    }

    const testArr = [
      {
        print: "firstlevel first obj",
        level: "base",
        uniqueID: "123",
        firstLevelReplies: [{ print: "secondlevel first obj" }],
      },
      {
        print: "firstlevel second obj",
        level: "base",
        firstLevelReplies: [
          {
            print: "secondlevel second obj",
            level: "first",
            uniqueID: "123",
            secondLevelReplies: [{ print: "thirdlevel second obj" }],
          },
          {
            print: "second level",
            level: "first",
            secondLevelReplies: [
              { print: "number", level: "second", thirdLevelReplies: [] },
              { print: "string", level: "second", thirdLevelReplies: [] },
            ],
          },
          {
            print: "secondlevel",
            level: "first",
            secondLevelReplies: [],
            uniqueID: "helloThis is a test",
          },
        ],
      },
      {
        print: "firstlevel third obj",
        level: "base",
        uniqueID: "123",
        firstLevelReplies: [
          {
            print: "secondlevel third obj",
            level: "first",
            uniqueID: "123",
            secondLevelReplies: [{ print: "thirdlevel" }],
          },
          {
            print: "secondlevel third obj",
            level: "first",
            uniqueID: "123",
            secondLevelReplies: [{ print: "thirdlevel" }],
          },
        ],
      },
    ];
    const findPath = (ob, key) => {
      const path = [];
      const keyExists = (obj) => {
        if (!obj || (typeof obj !== "object" && !Array.isArray(obj))) {
          return false;
        } else if (obj.hasOwnProperty(key)) {
          return true;
        } else if (Array.isArray(obj)) {
          let parentKey = path.length ? path.pop() : "";

          for (let i = 0; i < obj.length; i++) {
            path.push(`${parentKey}[${i}]`);
            const result = keyExists(obj[i], key);
            if (result) {
              return result;
            }
            path.pop();
          }
        } else {
          for (const k in obj) {
            path.push(k);
            const result = keyExists(obj[k], key);
            if (result) {
              return result;
            }
            path.pop();
          }
        }
        return false;
      };

      keyExists(ob);

      return path.join(".");
    };
    const resolvePath = (object, path, defaultValue) =>
      path
        .split(/[\.\[\]\'\"]/)
        .filter((p) => p)
        .reduce((o, p) => (o ? o[p] : defaultValue), object);

    const originalTestArr = [
      {
        print: "firstlevel first obj",
        replies: [{ print: "secondlevel first obj" }],
      },
      {
        print: "firstlevel second obj",
        replies: [
          {
            print: "secondlevel second obj",
            replies: [{ print: "thirdlevel second obj" }],
          },
          {
            print: "second level",
            replies: [
              { print: "number", replies: [] },
              { print: "string", replies: [] },
            ],
          },
          {
            print: "secondlevel",
            replies: [],
            uniqueID: "helloThis is a test",
          },
        ],
      },
      {
        print: "firstlevel third obj",
        replies: [
          {
            print: "secondlevel third obj",
            replies: [{ print: "thirdlevel" }],
          },
          {
            print: "secondlevel third obj",
            replies: [{ print: "thirdlevel" }],
          },
        ],
      },
    ];
    function originalNestedLooping(list) {
      list.forEach(function buildElements(eachObj, index) {
        //   build element

        if (eachObj.hasOwnProperty("replies") && eachObj.replies.length > 0) {
          originalNestedLooping(eachObj.replies);
        }
        /**
         * order of console.log() print when console.log(eachObj.print); is below
         * if (eachObj.hasOwnProperty("replies") && eachObj.replies.length > 0) {
         * nestedLooping(eachObj.replies);
         * }
         * secondlevel first obj
         * firstlevel first obj
         * thirdlevel second obj
         * secondlevel second obj
         * number
         * string
         * second level
         * secondlevel
         * firstlevel second obj
         * thirdlevel
         * secondlevel third obj
         * thirdlevel
         * secondlevel third obj
         * firstlevel third obj
         * **/
        if (eachObj.hasOwnProperty("uniqueID")) {
          eachObj.uniqueID = "hello we changed the value of the string";
        }
        console.log(eachObj?.uniqueID);
        console.log(eachObj.print);
      });
    }
  }
})();
