(function scopeOurVariables() {
  // our selectors
  /** when we build content/container with reply, delete, **/
  const selectBtnModal = document.querySelector(".user-select-btns");
  const selectUserBtn = document.querySelector(".select-user-btn");
  const closeBtnModal = document.querySelector(".close-select-user-modal");
  const sendPostBtn = document.querySelector(".post-send-btn");
  const replyPostBtn = document.querySelector(".reply-post-btn");
  const commentsContainer = document.querySelector(".comments");
  const assistiveTextContainer = document.querySelector(".assistive-text");
  const deleteModal = document.querySelector(
    ".delete-comment-replay-container"
  );
  const deleteModalText = document.querySelector(".dynamic-text");
  const deleteModalWrapper = document.querySelector("[deletebtnclick]");
  const cancelBtnInDeleteModal = document.querySelector(".cancel-btn");
  const deleteBtnInDeleteModal = document.querySelector(".delete-btn");
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

  /**
   * check the length of comments array in local storage
   * we will call JSON.parse(localStorage.getItem("commentDataObj"))
   * assign the return value to a variable/identifer
   * then if length of comments array is > 0 we will run nestedLooping building element func
   * else do nothing
   * **/

  const contentOfLocalStorage = JSON.parse(
    localStorage.getItem("commentDataObj")
  );

  contentOfLocalStorage.comments.length > 0
    ? loopThroughDataInLocalStorageAndCreateElements(
        contentOfLocalStorage.comments,
        cachedData.repliesLevel
      )
    : null;

  console.log(contentOfLocalStorage);

  /**
   * change hasReplies attr of div with hasReplies and linerepliesbox attr
   * use .querySelectorAll("[hasReplies]") then loop through array checking lastchild length if its greater than 0
   * if it is greater change assign value "true" to attr hasReplies
   * **/

  Array.prototype.slice
    .call(document.querySelectorAll("[hasreplies]"))
    .forEach(function findOutLength(eachElement) {
      if (eachElement.lastElementChild.childElementCount > 0) {
        eachElement.getAttribute("hasReplies") == "false"
          ? eachElement.setAttribute("hasReplies", "true")
          : null;
      }
    });

  /**
   * when there is values in comments array of local storage, we will update currentUser info in cachedData with the data from localStorage
   * run our changeCommentUserImgSelectBtnsReplyTextboxImg
   * we will just have to pass in the current userName to func changeCommentUserImgSelectBtnsReplyTextboxImg
   * **/

  contentOfLocalStorage.comments.length > 0 && contentOfLocalStorage.currUser
    ? ((cachedData.currentUser = contentOfLocalStorage.currUser),
      changeCommentUserImgSelectBtnsReplyTextboxImg(
        contentOfLocalStorage.currUser.userName
      ))
    : null;

  // call our local storage func
  //   useLocalStorage();
  // add click event to select user btns wrapper
  applyEvent(selectUserModalWrapper, "click", clickEventForUserBtnsModal);
  // add click event to comment/reply element
  applyEvent(sendPostBtn, "click", sendBtnCommentTextBox);
  // add event below to reply post btn when we create the reply post btn
  /**
   * moved event listener algorithm for reply post btn to
   * replyTextboxContainer function algorithm
   * **/
  // applyEvent(replyPostBtn, "click", runFuncForSendOrReplyBtn);
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
  // function runFuncForSendOrReplyBtn(event) {
  //   const classOfBtn = event.target.className;
  //   if (classOfBtn == "post-send-btn") {
  //     //   console.log(createUniqueId(cachedData.currentUser.userName));
  //     //   const newUniqueId = createUniqueId(cachedData.currentUser.userName);
  //     //   cachedData.uniqueID = newUniqueId;
  //     // user entered comment data/value
  //     const commentTextareaValue = document.querySelector(
  //       ".comment-textbox textarea"
  //     ).value;
  //     const commentUserDataObj = createUserDataObj(
  //       createUniqueId(cachedData.currentUser.userName),
  //       commentTextareaValue,
  //       undefined,
  //       createTimeObj(),
  //       cachedData.repliesLevel,
  //       cachedData.currentUser
  //     );
  //     document.querySelector(".comment-textbox textarea").value = "";
  //     commentUserDataObj[
  //       `${cachedData.repliesLevel[commentUserDataObj.level]}LevelReplies`
  //     ].push("hello react world");
  //     console.log(
  //       commentUserDataObj[
  //         `${cachedData.repliesLevel[commentUserDataObj.level]}LevelReplies`
  //       ]
  //     );
  //     console.log(commentUserDataObj);
  //     //   localStoragedata.comments.push(commentUserDataObj);
  //     localStorage.setItem("commentDataObj", JSON.stringify(localStoragedata));
  //   }
  //   if (classOfBtn == "reply-post-btn") {
  //     console.log("reply");
  //     /**
  //      * use uniqueID to select reply-textbox and linerepliesbox element
  //      * **/
  //     /**
  //      *
  //      * **/
  //     // use .closest method to find element with attr uniqueID, get value of that attr
  //     // use that uniqueID, run func that will loop through array of objs
  //     // and find the obj that matches uniqueID
  //     // assign that obj to property objMatchingUniqueID in cachedObj
  //     // pass value of uniqueID
  //     const replyboxTextareaValue = document.querySelector(
  //       ".uniqueId-wrapper .reply-textbox textarea"
  //     ).value;
  //     const replyUserDataObj = createUserDataObj(
  //       createUniqueId(cachedData.currentUser.userName),
  //       replyboxTextareaValue,
  //       // value of uniqueID obj level will go here
  //       "first",
  //       createTimeObj(),
  //       cachedData.repliesLevel,
  //       cachedData.currentUser
  //     );
  //     // empty textarea text
  //     document.querySelector(
  //       ".uniqueId-wrapper .reply-textbox textarea"
  //     ).value = "";
  //     // once we get the obj of data we will use that obj level property along with obj replieslevel
  //     // to build a string that will match the value of the div element's linerepliesbox attr
  //     // since we have the obj that matches the uniqueID we can add the userDataObj that is created
  //     // when user clicked on reply post btn
  //     // another option we can run func that will loop through objs in array
  //     // find the obj with uniqueID that matches the
  //     // uniqueID of container of our content,reply box and replies element
  //     // add the userDataObj created when user clicked on reply post btn
  //     /**
  //      * working with uniqueID obj for push reply content obj to array
  //      * select element with class uniqueID-level-replies to append reply content element to it
  //      * use uniqueID obj with repliesLevel obj to select element with linerepliesbox
  //      * then build our class string to target element with class uniqueID-level-replies
  //      * **/
  //   }
  // }

  /**
   * send btn algorithm
   * **/

  function sendBtnCommentTextBox(event) {
    /**
     * comment/reply content we are passing in the user info to the reply post
     * to be use for aria-label: delete,edit etc
     * **/
    const dataInLocalStorage =
      localStorage.getItem("commentDataObj") != null
        ? JSON.parse(localStorage.getItem("commentDataObj"))
        : null;
    console.log(dataInLocalStorage);
    //   console.log(createUniqueId(cachedData.currentUser.userName));
    //   const newUniqueId = createUniqueId(cachedData.currentUser.userName);
    //   cachedData.uniqueID = newUniqueId;
    // user entered comment data/value
    const commentTextareaValue = document.querySelector(
      ".comment-textbox textarea"
    ).value;
    /**
     * data obj created from comment textbox
     * **/
    const commentUserDataObj = createUserDataObj(
      createUniqueId(cachedData.currentUser.userName),
      commentTextareaValue,
      undefined,
      createTimeObj(),
      cachedData.repliesLevel,
      cachedData.currentUser
    );

    document.querySelector(".comment-textbox textarea").value = "";

    // add userDataObj to comment array in localStorage
    // commentUserDataObj[
    //   `${cachedData.repliesLevel[commentUserDataObj.level]}LevelReplies`
    // ].push("hello react world");
    // console.log(
    //   commentUserDataObj[
    //     `${cachedData.repliesLevel[commentUserDataObj.level]}LevelReplies`
    //   ]
    // );

    /**
     * create our three children for div with atr uniqueID element
     * **/

    const uniqueIdWrapper = createElementForCommentOrReply("DIV", {
      uniqueID: commentUserDataObj.uniqueID,
    });
    // three children
    // content container for the comments obj we dont need to know who the user is replying to since
    // comment elements are the top level content
    const contentWrapper = contentContainer(
      commentUserDataObj,
      cachedData.repliesLevel
    );
    const replyBoxWrapper = replyTextboxContainer(
      commentUserDataObj,
      cachedData.repliesLevel
    );
    const verticalLineRepliesWrapper = lineAndRepliesContainer(
      commentUserDataObj,
      cachedData.repliesLevel
    );
    // append childen to uniqueID wrapper
    appendChildrenToParent(uniqueIdWrapper, [
      contentWrapper,
      replyBoxWrapper,
      verticalLineRepliesWrapper,
    ]);
    // append uniqueId wrapper to div .comment element
    document.querySelector(".comments").append(uniqueIdWrapper);
    console.log(commentUserDataObj);
    console.log(document.querySelector(".comment"));

    /**
     * comment by username added
     * **/

    assistiveTextContainer.innerText = `comment by ${commentUserDataObj.userInfo.name} added`;

    dataInLocalStorage.comments.push(commentUserDataObj);
    // localStoragedata.comments.push(commentUserDataObj);
    localStorage.setItem("commentDataObj", JSON.stringify(dataInLocalStorage));
    console.log(contentWrapper);
  }

  /**
   * bind for reply post btn
   * **/

  function bindUniqueObjForReplyPostBtn(event) {
    // we want to get data from our local storage commentDataObj key
    /**
     * "this" obj will have three properties
     * uniqueObj,repliesLevelObj parent content username
     * **/
    /**
     * ***** reason for binding user data obj to comment content and reply content element *****
     * ***** we want to use the uniqueID to select the array to push reply user data to local storage *****
     * ***** and the element to append the replies. using repliesLevel obj and uniqueObj.level value *****
     * we call bindUniqueObjForReplyPostBtn when we create our replyTextboxContainer
     * we want the username of the element assign to user attr of element with class content
     * **/
    console.log(this);
    const dataFromLocalStorage = JSON.parse(
      localStorage.getItem("commentDataObj")
    );

    /**
     * reply text box wrapper
     * **/

    const replyTextboxWrapper = document.querySelector(
      `[uniqueID=${this.uniqueObj.uniqueID}] .reply-textbox`
    );

    /**
     * reply textbox textarea
     *  **/

    const replyTextarea = document.querySelector(
      `[uniqueID=${this.uniqueObj.uniqueID}] .reply-textbox textarea`
    );
    console.log(event.target.closest("[uniqueID]"));

    /**
     * append it to the correct element class "uniqueID-firstlevel-replies"
     * the "firstlevel" string will be dynamic
     * use this selector document.querySelector(`.${this.uniqueObj.uniqueID}-${this.repliesLevelObj[this.uniqueObj.uniqueID]}-replies`)
     * or we can select the parent element of div with class "uniqueID-firstlevel-replies"
     * use element.firstChildElement.nextElementSibling
     * to select element with class "uniqueID-firstlevel-replies"
     * since we want to change the value of attr hasreplies to "true"
     * to display the replies content
     * **/

    const verticalLineRepliesWrapper = document.querySelector(
      `[uniqueID=${this.uniqueObj.uniqueID}] [linerepliesbox=${
        this.repliesLevelObj[this.uniqueObj.level]
      }level]`
    );

    /**
     * select element to append replies content
     * **/

    /**
     * another way to select element to append replies
     * content verticalLineRepliesWrapper.firstElementChild.nextElementSibling;
     * **/

    const repliesContentWrapper =
      verticalLineRepliesWrapper.firstElementChild.nextElementSibling;

    /**
     * create data obj from user entered text in reply textbox
     * **/

    /**
     * pass in only content into createUserDataObj
     * without @userName for reply content replyTextarea value
     * **/
    console.log(replyTextarea.value);
    const { restOfTextContent, atUserName } = postReplyAndUpdateHelper(
      replyTextarea.value
    );

    /**
     * we could pass in atUserName from the return obj we get for calling postReplyAndUpdateHelper
     * to contentContainer() to be used for aria-label for delete,edit btn
     * ***** instead of doing this *****
     * const parentContentElementUniqueID = event.target
      .closest("[uniqueID]")
      .getAttribute("uniqueID");
    
      const elementWithUserAttr = document.querySelector(
      `[uniqueID=${parentContentElementUniqueID}] [user]`
    );
    *****CANT DO THIS because it will be @amyrobson so we would have to remove @ and add space between first and last name *****
     * **/
    console.log(restOfTextContent);
    console.log(atUserName);

    const replytextUserDataObj = createUserDataObj(
      createUniqueId(cachedData.currentUser.userName),
      restOfTextContent,
      // need to pass in level of
      this.repliesLevelObj[this.uniqueObj.level],
      createTimeObj(),
      this.repliesLevelObj,
      cachedData.currentUser
    );
    console.log(this);
    console.log(replytextUserDataObj);

    /**
     * create elements for reply content
     * **/

    /**
     * create our three children for div with attr uniqueID element
     * **/

    // div with attr uniqueID element parent to three children elements

    const replyUserUniqueIdWrapper = createElementForCommentOrReply("DIV", {
      uniqueID: replytextUserDataObj.uniqueID,
    });
    // three children
    // content wrapper
    /**
     * ***** *****
     * when this.uniqueObj.level == "base" we want to pass in this.parentContentUserName to content container
     * else get value of attr user of replyContentWrapper
     * ***** *****
     * **/
    // const parentUserNameBasedOnLevel = this.uniqueIdObj.level == "base" ?
    /**
     * binding the "this" obj of reply post btn so we can use the parent content user name
     * for delete and edit btn
     * for aria-label we want the user to know who they replied to
     * **/
    /**
     * we can use this console.log(event.target.closest("[uniqueID]")) to target parent element with matching uniqueID
     * selector the element with user attr, get that value pass it into contentContainer to be used for delete,edit,reply etc
     * **/

    const parentContentElementUniqueID = event.target
      .closest("[uniqueID]")
      .getAttribute("uniqueID");
    const elementWithUserAttr = document.querySelector(
      `[uniqueID=${parentContentElementUniqueID}] [user]`
    );

    const usernameUseForBtnsInReplyContentElement =
      elementWithUserAttr.getAttribute("user");

    /**
     * usernameUseForBtnsInReplyContentElement will be used for the delete,edit and atUser element
     * in contentContainer func
     * **/

    /**
     * creating the content element when user click on reply post btn, we want access to the parent obj data
     * and the data obj created in bindUniqueObjForReplyPostBtn on line 336
     * **/

    const replyContentWrapper = contentContainer(
      replytextUserDataObj,
      this.repliesLevelObj,
      usernameUseForBtnsInReplyContentElement,
      this.uniqueObj
    );
    console.log("this.parentContentUserName", this.parentContentUserName);
    console.log("replyContentWrapper", replyContentWrapper);
    // reply box wrapper
    /**
     * we want to use the data in the "this" obj for the @username value for the reply textbox
     * passing it to our bind
     * **/
    /**
     * then inside contentContainer of bindUniqueObjForReplyPostBtn
     * **/
    const replyContentTextareaWrapper = replyTextboxContainer(
      replytextUserDataObj,
      this.repliesLevelObj
    );

    // vertical line/replies wrapper

    const userReplyContentVerticalRepliesWrapper = lineAndRepliesContainer(
      replytextUserDataObj,
      this.repliesLevelObj
    );

    // append childen to uniqueID wrapper
    appendChildrenToParent(replyUserUniqueIdWrapper, [
      replyContentWrapper,
      replyContentTextareaWrapper,
      userReplyContentVerticalRepliesWrapper,
    ]);

    /**
     * append element with uniqueID to repliy level element
     * **/

    repliesContentWrapper.append(replyUserUniqueIdWrapper);

    /**
     * we will use replytextUserDataObj.userInfo and usernameUseForBtnsInReplyContentElement
     * text could be "your reply post to usernameUseForBtnsInReplyContentElement posted"
     * **/

    assistiveTextContainer.innerText = `your reply post to user ${usernameUseForBtnsInReplyContentElement} posted`;

    // const repliesContentWrapper = document.querySelector(
    //   `.${this.uniqueObj.uniqueID}-${
    //     this.repliesLevelObj[this.uniqueObj.level]
    //   }level-replies`
    // );

    /**
     * set textbox value to empty string
     * **/

    replyTextarea.value = "";

    /**
     * show replies
     * **/

    verticalLineRepliesWrapper.getAttribute("hasReplies") == "false"
      ? verticalLineRepliesWrapper.setAttribute("hasReplies", "true")
      : null;

    /**
     * hide reply textbox
     * **/

    replyTextboxWrapper.getAttribute("replyBtnClick") == "true"
      ? replyTextboxWrapper.setAttribute("replyBtnClick", "false")
      : null;

    /**
     * focus reply btn. the btn that show/hide textbox
     * **/

    document
      .querySelector(`[uniqueID=${this.uniqueObj.uniqueID}] .reply-btn`)
      .focus();

    /**
     * doing this last because it will be the backend of our app
     * we will push/add user data obj to correct array in dataFromLocalStroage obj
     * it will be the property "base" or "firstLevelReplies"
     * check the value of this.uniqueObj.level if it == "base" pass in dataFromLocalStorage.comments
     * find the obj that match this.uniqueObj.uniqueID then push replytextUserDataObj in to levelReplies array
     * we will use the [key selector] this.uniqueObj[`${this.repliesLevelObj[${this.uniqueObj.level}]}LevelReplies`]
     * if this.uniqueObj.level != "base" run nestedLooping func
     * **/

    if (this.uniqueObj.level == "base") {
      // loop through objs in comments array
      // the ID we want to match will be in the this.uniqueObj.uniqueID
      // if we want to use "this" in the foreach we will use an arrow func
      // or else "this" in the foreach func will be undefined
      dataFromLocalStorage.comments.forEach((eachObj) => {
        if (eachObj.uniqueID == this.uniqueObj.uniqueID) {
          eachObj[
            `${this.repliesLevelObj[this.uniqueObj.level]}LevelReplies`
          ].push(replytextUserDataObj);
        }
      });
    } else {
      // find obj in data storage that match this.uniqueObj.uniqueID

      nestedLoopingThroughData(
        dataFromLocalStorage.comments,
        this.repliesLevelObj,
        this.uniqueObj.uniqueID,
        undefined,
        replytextUserDataObj,
        undefined
      );
    }

    /**
     * update values in local storage
     * **/

    localStorage.setItem(
      "commentDataObj",
      JSON.stringify(dataFromLocalStorage)
    );
    console.log();
    // console.log(this);
    // console.log(
    //   document.querySelector(
    //     `[uniqueID=${this.uniqueObj.uniqueID}] [linerepliesbox=${
    //       this.repliesLevelObj[this.uniqueObj.level]
    //     }level]`
    //   )
    // );
    // console.log(event);
    // console.log(dataFromLocalStorage);

    /**
     * push dataobj for user reply last after we create the user data obj
     * create the elements to append to element with uniqueID-"level"-replies
     * not show reply textbox
     * set text box to empty string
     * pushing the obj to the right array in a nested obj
     * **/

    // check if level property of obj == "base"
    // if it is we wont have to call our nestedLoop func
    // pushing the obj to the right array in a nested obj
    // since the "this" obj will have the uniqueID and repliesLevel obj
    // call our func that will recursive loop through our obj and array
    // if the obj has matching uniqueID take that obj[`${repliesLevelObj[uniqueIdObj.level]}LevelReplies`]
    // which will be an array push userDataObj to that array
  }

  /**
   * bind unique Obj for content container
   * **/

  function bindUniqueObjForContentContainer(event) {
    // const classOfElementClick = event.target
    //   .closest("[class]")
    //   .getAttribute("class");
    /**
     * the values we pass into this func when we call/execute/invoke
     * for reply post content are
     * uniqueIdObj,
     * contentForReplyAtUsernameTextbox,
     * parentUsername,
     * levelObj,
     * parentDataObj,
     * **/
    /** 
     * testing out our algorithm of adding the deleted comment/reply content element back to the correct 
     * comment if the delete post is a reply element/content
     * 
     if (cachedData.savedDeleteContentElement) {
       console.log("hello");
       document
         .querySelector(".testing-container")
         .append(cachedData.savedDeleteContentElement);
     }
     * **/
    console.log(this);
    const elementWithClassAttrClicked = event.target.closest("[class]");
    switch (elementWithClassAttrClicked.getAttribute("class")) {
      case "plus":
        plusCounterBtn(this, elementWithClassAttrClicked);
        break;
      case "minus":
        minusCounterBtn(this, elementWithClassAttrClicked);
        break;
      case "reply-btn":
        showReplyBoxBtn(this, elementWithClassAttrClicked);
        break;
      case "delete-trash-btn":
        deleteCommentOrReplyBtn(this, elementWithClassAttrClicked);
        break;
      case "edit-btn":
        showEditBoxBtn(this, elementWithClassAttrClicked);
        break;
      case "update-post-btn":
        updateCommentOrReplyContentBtn(this, elementWithClassAttrClicked);
        break;
    }
  }

  /**
   * plusBtn
   * **/

  function plusCounterBtn(obj, eventTarget) {
    /**
     * get current state of data in localStorage
     * **/
    const dataOfLocalStoragePlusBtn = JSON.parse(
      localStorage.getItem("commentDataObj")
    );
    console.log(obj);
    console.log("plus");
    console.log(eventTarget.nextElementSibling);
    /**
     * update score for like counter
     * **/

    const currentLikeCounter = Number(eventTarget.nextElementSibling.innerText);
    const addOneToLikeCounter = currentLikeCounter + 1;
    // update element with number class, the element keeping score of likes
    eventTarget.nextElementSibling.innerText = String(addOneToLikeCounter);

    // assistive text
    assistiveTextContainer.innerText = `${obj.uniqueIdObj.userInfo.name} increase likes counter of ${obj.contentForReplyAtUsernameTextbox} to ${addOneToLikeCounter} likes.`;
    /**
     * if obj.level == "base" we want to pass in top level/first array of data object
     * else run nestedlooping algorithm
     * **/

    if (obj.uniqueIdObj.level == "base") {
      // using filter method
      const [objWithMatchingID] = filterOutObjOfMatchingUniqueID(
        dataOfLocalStoragePlusBtn.comments,
        obj.uniqueIdObj.uniqueID
      );
      // instead of adding one to score property of obj
      // we can add 1 to number element between plus and minus btn
      // get that value of the number element convert it to a number and assign it to score
      // property of obj
      objWithMatchingID[`${obj.uniqueIdObj.uniqueID}score`] =
        addOneToLikeCounter;
      // using foreach method
      // dataOfLocalStoragePlusBtn.comments.forEach(function updateValueInDataObj(eachObj) {
      //   // looping through each obj in comments array
      //   // once we encounter the obj that match obj.uniqueID
      //   // update score value
      //   if (eachObj.uniqueID == obj.uniqueID) {
      //     // using uniqueID to build the string to select our property
      //     eachObj[`${obj.uniqueID}score`] = addOneToLikeCounter;
      //   }
      // });
    } else {
      // loop through nested data obj and find matching uniqueID
      nestedLoopingThroughData(
        dataOfLocalStoragePlusBtn.comments,
        obj.levelObj,
        obj.uniqueIdObj.uniqueID,
        "score",
        addOneToLikeCounter,
        undefined
      );
    }
    console.log(dataOfLocalStoragePlusBtn);
    /**
     * after updating value of data obj we want to saving updates to localStorage
     * **/
    localStorage.setItem(
      "commentDataObj",
      JSON.stringify(dataOfLocalStoragePlusBtn)
    );
  }

  /**
   * minusBtn
   * **/

  function minusCounterBtn(obj, eventTarget) {
    /**
     * get current state of data in localStorage
     * **/
    const dataOfLocalStorageMinusBtn = JSON.parse(
      localStorage.getItem("commentDataObj")
    );
    console.log(eventTarget.previousElementSibling);
    console.log("minus");
    /**
     * update score for like counter
     * **/

    const currentLikes = Number(eventTarget.previousElementSibling.innerText);
    const subtractOneFromLikes = currentLikes - 1;
    eventTarget.previousElementSibling.innerText = String(subtractOneFromLikes);

    // assistive text

    assistiveTextContainer.innerText = `${obj.uniqueIdObj.userInfo.name} decrease likes counter of ${obj.contentForReplyAtUsernameTextbox} to ${subtractOneFromLikes} likes.`;

    /**
     * if obj.level == "base" we want to pass in top level/first array of data object
     * else run nestedlooping algorithm
     * **/
    if (obj.uniqueIdObj.level == "base") {
      //
      const [objWithMatchingID] = filterOutObjOfMatchingUniqueID(
        dataOfLocalStorageMinusBtn.comments,
        obj.uniqueIdObj.uniqueID
      );
      // instead of subtracting one to score property of obj
      // we can subtract 1 to number element between plus and minus btn
      // get that value of the number element convert it to a number and assign it to score
      // property of obj
      objWithMatchingID[`${obj.uniqueIdObj.uniqueID}score`] =
        subtractOneFromLikes;
      // using foreach
      // dataOfLocalStorageMinusBtn.comments.forEach(function minusOneToScore(eachObj) {
      //   if (eachObj.uniqueID == obj.uniqueID) {
      //     eachObj[`${obj.uniqueID}score`] = subtractOneFromLikes;
      //   }
      // });
    } else {
      // loop through nested data obj and find matching uniqueID
      nestedLoopingThroughData(
        dataOfLocalStorageMinusBtn.comments,
        obj.levelObj,
        obj.uniqueIdObj.uniqueID,
        "score",
        subtractOneFromLikes,
        undefined
      );
    }
    console.log(dataOfLocalStorageMinusBtn);
    /**
     * after updating value of data obj we want to saving updates to localStorage
     * **/
    localStorage.setItem(
      "commentDataObj",
      JSON.stringify(dataOfLocalStorageMinusBtn)
    );
  }

  /**
   * replyBtn
   * **/

  function showReplyBoxBtn(obj, eventTarget) {
    /**
     * get current state of data in localStorage
     * **/
    const dataOfLocalStorageShowReplyBtn = JSON.parse(
      localStorage.getItem("commentDataObj")
    );
    // console.log(eventTarget);
    // console.log("reply");
    // console.log(obj);
    /**
     * if obj.level == "base" we want to pass in top level/first array of data object
     * else run nestedlooping algorithm
     * **/
    // get username from obj.userInfo.userName
    // select textarea. [uniqueID] .reply-textbox textarea
    // assign value of @username
    const textareaElement = document.querySelector(
      `[uniqueID=${obj.uniqueIdObj.uniqueID}] .reply-textbox textarea`
    );
    const replyBox = document.querySelector(
      `[uniqueID=${obj.uniqueIdObj.uniqueID}] .reply-textbox`
    );

    /**
     * remove the space of username
     * **/

    // contentForReplyAtUsernameTextbox is parentUsername that we pass in as a value to contentContainer in bindUniqueObjForReplyPostBtn
    const userNameWithoutSpace = obj.contentForReplyAtUsernameTextbox
      .split(" ")
      .join("");

    replyBtnBoxHelper(
      replyBox,
      textareaElement,
      "replyBtnClick",
      `@${userNameWithoutSpace}, `
    );
    // if (replyBox.getAttribute("replyBtnClick") == "false") {
    //   if (textareaElement.value === "") {
    //     // if textarea is empty or empty string we want to add @username to textarea value
    //     textareaElement.value = `@${obj.userInfo.userName}, `;
    //     // show reply box
    //     replyBox.setAttribute("replybtnclick", "true");
    //     textareaElement.focus();
    //   } else {
    //     replyBox.setAttribute("replybtnclick", "true");
    //   }
    // } else {
    //   // if element with replybtnclick is "true" set value to "false"
    //   replyBox.setAttribute("replybtnclick", "false");
    // }
    // setTimeout(function focusTextarea() {
    //   textareaElement.focus();
    // }, 500);
    /**
     * after updating value of data obj we want to saving updates to localStorage
     * dont have to updating any data in localstorage we user click reply to shoe reply textbox
     * **/
  }

  /**
   * deletebtn
   * **/

  function deleteCommentOrReplyBtn(obj, eventTarget) {
    /**
     * get current state of data in localStorage
     * **/
    const dataOfLocalStorageDeleteBtn = JSON.parse(
      localStorage.getItem("commentDataObj")
    );
    console.log(eventTarget);
    console.log("delete");

    // dynamic text for modal

    const fullnameUppercased =
      obj.uniqueIdObj.level != "base"
        ? uppercaseFirstChar(obj.parentUsername)
        : null;

    deleteModalText.innerText =
      obj.uniqueIdObj.level == "base"
        ? `Are you sure you want to delete your comment? This will remove the comment and can't be undone.`
        : `Are you sure you want to delete your reply post to ${fullnameUppercased}? This will remove the comment and can't be undone.`;

    // show delete modal

    // document
    //   .querySelector(".delete-comment-reply-modal-wrapper")
    //   .classList.add("show");

    deleteModalWrapper.getAttribute("deletebtnclick") == "false"
      ? deleteModalWrapper.setAttribute("deletebtnclick", "true")
      : null;

    // focus cancel btn in delete modal

    deleteModal.focus();

    // select div with .comment if obj.uniqueIdObj.level == "base"
    // select element div with class uniqueID- "levelObj"level - replies using values / data in obj.parentDataObj
    const parentElementOfChildElementToRemove =
      obj.uniqueIdObj.level == "base"
        ? document.querySelector(".comments")
        : document.querySelector(
            `.${obj.parentDataObj.uniqueID}-${
              obj.levelObj[obj.parentDataObj.level]
            }level-replies`
          );
    // select the child element of the above element that we want to remove using data/value in obj.uniqueIdObj
    // the parent element will be different but can select the children for both obj.level == "base" || obj.level != "base"
    // the child element will be div [`uniqueID=${obj.uniqueIdObj.uniqueID}`]
    const childElementWeWantRemoved = document.querySelector(
      `[uniqueID=${obj.uniqueIdObj.uniqueID}]`
    );

    obj.uniqueIdObj.level != "base"
      ? nestedLoopingThroughData(
          dataOfLocalStorageDeleteBtn.comments,
          obj.levelObj,
          obj.parentDataObj.uniqueID,
          undefined,
          undefined,
          undefined
        )
      : null;

    const newArrayWithoutMatchedUniqueIDObj =
      obj.uniqueIdObj.level == "base"
        ? dataOfLocalStorageDeleteBtn.comments.filter(function removeObjItem(
            eachObj
          ) {
            return eachObj.uniqueID != obj.uniqueIdObj.uniqueID;
          })
        : cachedData.objMatchingUniqueID[
            `${obj.levelObj[obj.parentDataObj.level]}LevelReplies`
          ].filter(function removeItem(eachObj) {
            /**
             * since we are using "this" inside another func, we want the obj bind to "this"
             * of the parent scope which is the func bindDataObjToDeleteModal we want to use arrow func
             * **/
            return eachObj.uniqueID != obj.uniqueIdObj.uniqueID;
          });

    const deleteModalListener = bindDataObjToDeleteModal.bind({
      obj,
      eventTarget,
      dataOfLocalStorageDeleteBtn,
      parentElementOfChildElementToRemove,
      childElementWeWantRemoved,
      newArrayWithoutMatchedUniqueIDObj,
    });

    console.log(obj);

    console.log(
      // reply or comment content element
      document.querySelector(`[uniqueID=${obj.uniqueIdObj.uniqueID}]`)
    );

    /**
     * algorithm below allows undo of deleting the comment/reply
     * we are saving a reference to the comment/reply content element that the current user wanted to delete
     cachedData.savedDeleteContentElement = document.querySelector(
       `[uniqueID=${obj.uniqueIdObj.uniqueID}]`
     );
     * the reference will be saved to cachedData
     * if we want to add back the delete comment/reply content element, we can save a reference to the parent data obj too
     * we will need to know the parent of the deleted reply so we can use the parent's uniqueID and levelObj to select
     * div with class uniqueID-"levelObj"level-replies
     * selector if we want to save reference to element with class uniqueID-"levelObj"level-replies
     * document.querySelector(`.${obj.parentDataObj}-${obj.levelObj[obj.parentDataObj.level]}level-replies`)
     * **/

    // save a reference to deleteModalListener in our cached obj
    // use it in our delete modal bind func to remove listener
    // every time we click on delete btn next to edit btn
    // we will add click listener to delete modal
    cachedData.removeClickListenerOnDeleteModal = [
      deleteModalListener,
      tabOrderDeleteModal,
    ];
    cachedData.focusElementForEscapeKey = eventTarget;
    /**
     * adding click event listener to delete modal when user click on delete btn
     * is making NVDA announce "clickable"
     * **/
    setTimeout(function addClick() {
      applyEvent(deleteModal, "click", deleteModalListener);
      applyEvent(deleteModal, "keydown", tabOrderDeleteModal);
    }, 80);
    /**
     * we will bind the obj pass into deleteCommentOrReplyBtn
     * to the click event callback attached to the delete btn of the modal with class
     * delete-comment-reply-modal-wrapper
     * we will add the click listener to that modal
     * **/

    /**
     * letting user undo a deleted comment/reply
     * since our obj parameter will have the reference to the parent data obj(obj.parentDataObj)
     * which will have the parent uniqueID and the parent level property
     * we can build this selector to select the element that our reply content element is appended to
     * document.querySelector(`.${obj.parentDataObj.uniqueID}-${obj.levelObj[obj.parentDataObj.level]}level-replies`)
     * we have a way to select the element that our reply content element appends to or we want to append to
     * **/

    /**
     * if obj.uniqueIdObj.level == "base" we will target element div with class comments
     * document.querySelector(".comments")
     * else look for element with class uniqueId-"levelObj"level-replies
     console.log(
       document.querySelector(
         `.${obj.parentDataObj.uniqueID}-${
           obj.levelObj[obj.parentDataObj.level]
         }level-replies`
       )
     );
     * **/

    /**
     * if obj.level == "base" we want to pass in top level/first array of data object
     * else run nestedlooping algorithm
     if (obj.uniqueIdObj.level == "base") {
       //
       const objWithMatchingID = filterOutObjOfMatchingUniqueID(
         dataOfLocalStorageDeleteBtn.comments,
         obj.uniqueIdObj.uniqueID
       );
     } else {
       //
     }
     * **/
    /**
     * after updating value of data obj we want to save the updates to localStorage
     * we will handle the update of assigning the new array without the obj that matched the uniqueID
     * of the comment/reply content element of the delete btn the user click in bindDataObjToDeleteModal
     * we will make the new array in this func
     * **/
    // if (obj.uniqueIdObj.level == "base") {
    //   // when we get here we are looping through the data/obj/values in the comments array
    //   // not nestedLooping
    //   /**
    //    * we dont need to change any data/value of the objWithMatchingID which will be the obj that matched the uniqueID
    //    * of the comment content element (parent wrapper of the delete btn that was clicked). we want to remove it from
    //    * dataOfLocalStorageDeleteBtn.comments
    //    const [objWithMatchingID] = filterOutObjOfMatchingUniqueID(
    //      dataOfLocalStorageDeleteBtn.comments,
    //      obj.uniqueIdObj.uniqueID
    //    );
    //    * **/
    //   // access the array assigned to "levelObj"LevelReplies of objWithMatchingID
    //   // we dont have to access the array, since this is the base level we will loop through comments array
    //   // and remove obj that match uniqueID
    //   dataOfLocalStorageDeleteBtn.comments =
    //     dataOfLocalStorageDeleteBtn.comments.filter(function removeObjItem(
    //       eachObj
    //     ) {
    //       return eachObj.uniqueID != obj.uniqueIdObj.uniqueID;
    //     });
    //   // another way to write above algorithm
    //   // dataOfLocalStorageDeleteBtn.comments =
    //   //   dataOfLocalStorageDeleteBtn.comments.filter(
    //   //     (eachObj) => eachObj.uniqueID != obj.uniqueIdObj.uniqueID
    //   //   );
    // } else {
    //   /**
    //    * ***** *****
    //    * since we are passing in the parentObj into deleteCommentOrReplyBtn then passing that
    //    * obj to bindDataObjToDeleteModal(this func)
    //    * we can use data/value in that parentObj to access the array in that parentObj
    //    * to remove the obj with the uniqueID that matched
    //    * the uniqueID of the reply content element(where the user clicked delete btn)
    //    * we do have to run nestedLoopingThroughData to get access to the obj that matched the parentID
    //    * because we want to assign an array without the obj that matched the uniqueID of the comment/reply content.
    //    * the uniqueID that we can access using obj.uniqueIdObj.uniqueID of this func or
    //    * obj.uniqueIdObj.uniqueID in deleteCommentOrReplyBtn
    //    * ***** *****
    //    * **/
    //   /**
    //    * *******
    //    * running nestedLoopingThroughData will assign the correct
    //    * uniqueID to cachedData.parentIdForDeleteAlgorithm
    //    * that we will use to find the obj in our local storage that match
    //    * cachedData.parentIdForDeleteAlgorithm so we can run filter on the array assigned to
    //    * "levelObj"LevelReplies property to remove the obj with matching uniqueID
    //    * in obj.uniqueIdObj
    //    * ********
    //    * **/
    //   nestedLoopingThroughData(
    //     dataOfLocalStorageDeleteBtn.comments,
    //     obj.levelObj,
    //     obj.parentDataObj.uniqueID,
    //     undefined,
    //     undefined,
    //     undefined
    //   );
    //   // cachedData.objMatchingUniqueID is the obj we want to work on
    //   // it will have the array assigned to "levelObj"LevelReplies that we want to mutate
    //   // we want to build an array without the obj with the uniqueID that matched the uniqueID
    //   // of the userDataObj that is bind to comment/reply content element. the userDataObj that these
    //   // element has access to: delete, edit, reply, like plus and minus, update post btn
    //   // we want to get the array assigned
    //   // remove the obj
    //   // then assign new array to "levelObj"LevelReplies
    //   // using obj.parentDataObj to access the array
    //   // build property using uniqueID and levelObj
    //   cachedData.objMatchingUniqueID[
    //     `${obj.levelObj[obj.parentDataObj.level]}LevelReplies`
    //   ] = cachedData.objMatchingUniqueID[
    //     `${obj.levelObj[obj.parentDataObj.level]}LevelReplies`
    //   ].filter(function removeItem(eachObj) {
    //     /**
    //      * since we are using "this" inside another func, we want the obj bind to "this"
    //      * of the parent scope which is the func bindDataObjToDeleteModal we want to use arrow func
    //      * **/
    //     return eachObj.uniqueID != obj.uniqueIdObj.uniqueID;
    //   });
    //   // update local storage
    //   // localStorage.setItem(
    //   //   "commentDataObj",
    //   //   JSON.stringify(this.dataOfLocalStorageDeleteBtn)
    //   // );
    // }
  }

  function bindDataObjToDeleteModal(event) {
    /**
     * inside deleteCommentOrReplyBtn we are passing a reference to dataOfLocalStorageDeleteBtn
     * when we mutate data/value of that obj in this func it will affect the original obj assigned to dataOfLocalStorageDeleteBtn
     * **/

    console.log(this.obj.parentUsername);
    // the obj bind to "this" will be obj with properties uniqueIdObj
    console.log(this.obj.uniqueIdObj);
    // console.log(this.dataOfLocalStorageDeleteBtn);
    // levelObj, contentForReplyAtUsernameTextbox(username bind to comment/reply content element)
    // parentUsername(username of the parent comment/reply content element)
    // check if data obj level is "base"
    /**
     * Are you sure you want to delete this comment?
     * This will remove the comment and can't be undone.
     * **/
    // if it is have modal text be Are you sure you want to delete this comment? This will remove the
    // comment and can't be undone.
    // else have text be Are you sure you want to delete your reply to username? This will remove the
    // comment and can't be undone.
    //will be the delete-trash-btn that display modal
    // it is the delete btn next to the edit btn
    console.log(this.eventTarget);
    if (event.target.tagName == "BUTTON") {
      if (event.target.getAttribute("class") == "cancel-btn") {
      }
      if (event.target.getAttribute("class") == "delete-btn") {
        // console.log(
        //   document.querySelector(`[uniqueID=${this.obj.uniqueIdObj.uniqueID}]`)
        // );
        // document
        //   .querySelector(`[uniqueID=${this.obj.uniqueIdObj.uniqueID}]`)
        //   .remove();
        /**
         * level == "base" "your comment deleted"
         * else "your reply post to username deleted"
         * **/

        assistiveTextContainer.innerText =
          this.obj.uniqueIdObj.level == "base"
            ? `your comment deleted`
            : `your reply post to user ${this.obj.parentUsername} deleted`;
        /**
         * we will handle selecting the parentElement and child element in deleteCommentOrReplyBtn where we bind this func
         * to the delete modal element click event listener
         * **/
        // to remove the comment/reply content element when user click "Yes,DELETE"

        this.parentElementOfChildElementToRemove.removeChild(
          this.childElementWeWantRemoved
        );

        /**
         * does not effect UI, update the array of the uniqueID obj
         * **/

        this.obj.uniqueIdObj.level == "base"
          ? (this.dataOfLocalStorageDeleteBtn.comments =
              this.newArrayWithoutMatchedUniqueIDObj)
          : (cachedData.objMatchingUniqueID[
              `${this.obj.levelObj[this.obj.parentDataObj.level]}LevelReplies`
            ] = this.newArrayWithoutMatchedUniqueIDObj);
        // update local storage outside of the if else statement. make our code less DRY

        localStorage.setItem(
          "commentDataObj",
          JSON.stringify(this.dataOfLocalStorageDeleteBtn)
        );
        console.log(this.dataOfLocalStorageDeleteBtn);
        //   if (this.obj.uniqueIdObj.level == "base") {
        //     // when we get here we are looping through the data/obj/values in the comments array
        //     // not nestedLooping
        //     /**
        //  * we dont need to change any data/value of the objWithMatchingID which will be the obj that matched the uniqueID
        //  * of the comment content element (parent wrapper of the delete btn that was clicked). we want to remove it from
        //  * this.dataOfLocalStorageDeleteBtn.comments
        //  const [objWithMatchingID] = filterOutObjOfMatchingUniqueID(
        //    this.dataOfLocalStorageDeleteBtn.comments,
        //    this.obj.uniqueIdObj.uniqueID
        //  );
        //  * **/
        //     // access the array assigned to "levelObj"LevelReplies of objWithMatchingID
        //     // we dont have to access the array, since this is the base level we will loop through comments array
        //     // and remove obj that match uniqueID
        //     this.dataOfLocalStorageDeleteBtn.comments =
        //       this.dataOfLocalStorageDeleteBtn.comments.filter((eachObj) => {
        //         return eachObj.uniqueID != this.obj.uniqueIdObj.uniqueID;
        //       });
        //     // another way to write above algorithm
        //     // this.dataOfLocalStorageDeleteBtn.comments =
        //     //   this.dataOfLocalStorageDeleteBtn.comments.filter(
        //     //     (eachObj) => eachObj.uniqueID != this.obj.uniqueIdObj.uniqueID
        //     //   );
        //   } else {
        //     /**
        //      * ***** *****
        //      * since we are passing in the parentObj into deleteCommentOrReplyBtn then passing that
        //      * obj to bindDataObjToDeleteModal(this func)
        //      * we can use data/value in that parentObj to access the array in that parentObj
        //      * to remove the obj with the uniqueID that matched
        //      * the uniqueID of the reply content element(where the user clicked delete btn)
        //      * we do have to run nestedLoopingThroughData to get access to the obj that matched the parentID
        //      * because we want to assign an array without the obj that matched the uniqueID of the comment/reply content.
        //      * the uniqueID that we can access using this.obj.uniqueIdObj.uniqueID of this func or
        //      * obj.uniqueIdObj.uniqueID in deleteCommentOrReplyBtn
        //      * ***** *****
        //      * **/
        //     /**
        //      * *******
        //      * running nestedLoopingThroughData will assign the correct
        //      * uniqueID to cachedData.parentIdForDeleteAlgorithm
        //      * that we will use to find the obj in our local storage that match
        //      * cachedData.parentIdForDeleteAlgorithm so we can run filter on the array assigned to
        //      * "levelObj"LevelReplies property to remove the obj with matching uniqueID
        //      * in this.obj.uniqueIdObj
        //      * ********
        //      * **/
        //     nestedLoopingThroughData(
        //       this.dataOfLocalStorageDeleteBtn.comments,
        //       this.obj.levelObj,
        //       this.obj.parentDataObj.uniqueID,
        //       undefined,
        //       undefined,
        //       undefined
        //     );
        //     // cachedData.objMatchingUniqueID is the obj we want to work on
        //     // it will have the array assigned to "levelObj"LevelReplies that we want to mutate
        //     // we want to build an array without the obj with the uniqueID that matched the uniqueID
        //     // of the userDataObj that is bind to comment/reply content element. the userDataObj that these
        //     // element has access to: delete, edit, reply, like plus and minus, update post btn
        //     // we want to get the array assigned
        //     // remove the obj
        //     // then assign new array to "levelObj"LevelReplies
        //     // using this.obj.parentDataObj to access the array
        //     // build property using uniqueID and levelObj
        //     cachedData.objMatchingUniqueID[
        //       `${this.obj.levelObj[this.obj.parentDataObj.level]}LevelReplies`
        //     ] = cachedData.objMatchingUniqueID[
        //       `${this.obj.levelObj[this.obj.parentDataObj.level]}LevelReplies`
        //     ].filter((eachObj) => {
        //       /**
        //        * since we are using "this" inside another func, we want the obj bind to "this"
        //        * of the parent scope which is the func bindDataObjToDeleteModal we want to use arrow func
        //        * **/
        //       return eachObj.uniqueID != this.obj.uniqueIdObj.uniqueID;
        //     });
        //     // update local storage
        //     localStorage.setItem(
        //       "commentDataObj",
        //       JSON.stringify(this.dataOfLocalStorageDeleteBtn)
        //     );
        //   }
      }
      // hide delete modal
      // document
      //   .querySelector(".delete-comment-reply-modal-wrapper")
      //   .classList.remove("show");
      deleteModalWrapper.getAttribute("deletebtnclick") == "true"
        ? deleteModalWrapper.setAttribute("deletebtnclick", "false")
        : null;
      // remove click listener from delete modal
      // console.log(cachedData.testing);
      const [removeClick, removeKeydown] =
        cachedData.removeClickListenerOnDeleteModal;
      deleteModal.removeEventListener("click", removeClick);
      deleteModal.removeEventListener("keydown", removeKeydown);
      // focus the delete btn that launch delete modal
      this.eventTarget.focus();
    }
  }

  /**
   * tabbing order for delete modal
   * **/

  function tabOrderDeleteModal(event) {
    // hitting escape key
    if (event.code == "Escape") {
      deleteModalWrapper.getAttribute("deletebtnclick") == "true"
        ? deleteModalWrapper.setAttribute("deletebtnclick", "false")
        : null;
      const [removeClick, removeKeydown] =
        cachedData.removeClickListenerOnDeleteModal;
      deleteModal.removeEventListener("click", removeClick);
      deleteModal.removeEventListener("keydown", removeKeydown);
      // focus delete btn next to edit btn
      cachedData.focusElementForEscapeKey.focus();
    }
    // use holding shift key
    if (event.shiftKey) {
      // user is holding down shift key

      event.code == "Tab" && document.activeElement == cancelBtnInDeleteModal
        ? (deleteBtnInDeleteModal.focus(), event.preventDefault())
        : null;
    } else {
      // user not holding down shift key
      event.code == "Tab" && document.activeElement == deleteBtnInDeleteModal
        ? (cancelBtnInDeleteModal.focus(), event.preventDefault())
        : null;
    }
    console.log(event);
  }

  /**
   * editBtn
   * **/

  function showEditBoxBtn(obj, eventTarget) {
    /**
     * get current state of data in localStorage
     * **/
    const dataOfLocalStorageShowEditBtn = JSON.parse(
      localStorage.getItem("commentDataObj")
    );
    // console.log(eventTarget);
    // console.log("edit");
    /**
     * if obj.level == "base" we want to pass in top level/first array of data object
     * else run nestedlooping algorithm
     * **/
    // target uniqueID attr editbtnclick
    const editBoxContainer = document.querySelector(
      `[uniqueID=${obj.uniqueIdObj.uniqueID}] [editbtnclick]`
    );
    // we can use value/element assigned to editBoxContainer to change value of attr editbtnclick
    // and apply value to textarea
    // assign value @username to textarea
    const textareaEditBox = document.querySelector(
      `[uniqueID=${obj.uniqueIdObj.uniqueID}] [editbtnclick] textarea`
    );

    // we want to use the data in localStorage not the
    // uniqueIdObj that is bind to the content container(the obj that is created when user click on send/reply post btn)
    // since we dont update that obj, we will access the data in the localStorage
    /**
     * instead of getting the content value in data obj which we might have to perform nested loops
     * find a way to return the content value or assign that value to a property in our cachedobj
     * we will get the innerText of the span with class text
     * **/
    const userTextContent = document.querySelector(
      `[uniqueID=${obj.uniqueIdObj.uniqueID}] [editbtnclick] .text`
    ).innerText;

    /**
     * no @ for edit textbox for comment content
     * add @ sign for edit textboxfor reply content
     * **/

    console.log(obj);

    // const removeSpaceForUsername = obj.uniqueIdObj.level == "base" ? obj.parentUsername
    //   .split(" ")
    //   .join("") : null;

    obj.uniqueIdObj.level == "base"
      ? (textareaEditBox.value = userTextContent)
      : (textareaEditBox.value = `@${obj.parentUsername
          .split(" ")
          .join("")} ${userTextContent}`);

    /**
     * obj will be {uniqueIdObj, contentForReplyAtUsernameTextbox} for comment content element
     * obj will be {uniqueIdObj, contentForReplyAtUsernameTextbox: used for show reply func where we add @username to reply textarea,
     * parentUsername: will be used for show edit btn to build update textarea using data obj instead of selecting element using uniqueID then user attr
     * or select the <p> and get its innerText
     * we can build the textbox content by using parentUsername and value of property uniqueIDcontent in the user data obj
     * bind to the content container element which is passed to this func and other funcs
     * }
     * **/
    // console.log("showeditbtn", obj);
    // console.log(obj.uniqueIdObj.userInfo.userName);
    // console.log(obj.uniqueIdObj[`${obj.uniqueIdObj.uniqueID}content`]);
    /**
     * the textarea for edit btn should never be empty
     * we want to get the innerText of <p> inside div .paragraph-edit-box-container
     * **/

    // console.log(textareaEditBox);

    /**
     * show or hide edit textarea
     * **/

    editBoxContainer.getAttribute("editBtnClick") == "false"
      ? editBoxContainer.setAttribute("editBtnClick", "true")
      : editBoxContainer.setAttribute("editBtnClick", "false");

    /**
     * focus edit textarea
     * **/

    textareaEditBox.focus();

    /**
     * ***** *****
     * content of edit textbox will be different for comment content and reply content
     * comment content will not have @username while reply content will
     * ***** *****
     * **/

    /**
     * the textarea for edit btn should never be empty
     * two options: for edit text content
     * we can get the content of the <p> of div .paragraph-edit-box-container
     * or get value of uniqueIDcontent in the user content data obj and the user info of parent content element
     * to build edit textarea content
     * **/
    // replyBtnBoxHelper(
    //   editBoxContainer,
    //   textareaEditBox,
    //   "editBtnClick",
    //   `@${obj.userInfo.userName}, `
    // );
    /**
     * moved algorithm below into replyBtnBoxHelper
     * **/
    // textareaEditBox.value = `@${obj.userInfo.userName}, `;
    // // focus textarea elemetn
    // editBoxContainer.setAttribute("editBtnClick", "true");
    // textareaEditBox.focus();
    /**
     * after updating value of data obj we want to saving updates to localStorage
     * **/
  }

  /**
   * updateBtn
   * **/

  function updateCommentOrReplyContentBtn(obj, eventTarget) {
    /**
     * get current state of data in localStorage
     * **/
    const dataOfLocalStorageUpdateBtn = JSON.parse(
      localStorage.getItem("commentDataObj")
    );
    console.log(eventTarget);
    console.log("update");
    // select div with class paragraph-edit-box-container
    const contentAndTextboxWrapper = document.querySelector(
      `[uniqueID=${obj.uniqueIdObj.uniqueID}] [editbtnclick]`
    );

    // get value of textarea

    const updateTextareaBoxValue =
      obj.uniqueIdObj.level == "base"
        ? contentAndTextboxWrapper.firstElementChild.nextElementSibling
            .firstElementChild.value
        : postReplyAndUpdateHelper(
            contentAndTextboxWrapper.firstElementChild.nextElementSibling
              .firstElementChild.value
          );

    // select the span with class text
    // to assign user enter data to content element

    const paragraphTextContentContainer =
      obj.uniqueIdObj.level == "base"
        ? contentAndTextboxWrapper.firstElementChild.firstElementChild
        : contentAndTextboxWrapper.firstElementChild.firstElementChild
            .nextElementSibling;

    console.log(paragraphTextContentContainer);

    paragraphTextContentContainer.innerText =
      obj.uniqueIdObj.level == "base"
        ? updateTextareaBoxValue
        : updateTextareaBoxValue.restOfTextContent;

    /**
     * based on obj.level == "base" text will be "edit to your post updated"
     * else "edit your reply to username updated"
     * **/

    assistiveTextContainer.innerText =
      obj.uniqueIdObj.level == "base"
        ? `changes to your comment updated`
        : `changes to your reply post to user ${obj.parentUsername} updated`;

    // change editbtnclick value to false to hide update textbox

    contentAndTextboxWrapper.setAttribute("editBtnClick", "false");

    // focus edit btn
    document
      .querySelector(`[uniqueID=${obj.uniqueIdObj.uniqueID}] .edit-btn`)
      .focus();

    /**
     * we want to call postReplyAndUpdateHelper
     * get the restofcontent,remove @amyrobson etc
     * select element with attr editbtnclick which is the element with .paragraph-edit-box-container
     * then select span with class .text use element.lastElementChild or element.firstElementChild.nextElementSibling
     * reason we want to target element with attr editbtnclick is we want to change value of editbtnclick to false
     * to hide update textbox
     * after we update the content to span element with .text
     * change value of editbtnclick to false
     * then handle back end
     * **/

    /**
     * if obj.level == "base" we want to pass in top level/first array of data object
     * else run nestedlooping algorithm
     * **/
    if (obj.uniqueIdObj.level == "base") {
      //
      const [objWithMatchingID] = filterOutObjOfMatchingUniqueID(
        dataOfLocalStorageUpdateBtn.comments,
        obj.uniqueIdObj.uniqueID
      );

      objWithMatchingID[`${obj.uniqueIdObj.uniqueID}content`] =
        updateTextareaBoxValue;

      localStorage.setItem(
        "commentDataObj",
        JSON.stringify(dataOfLocalStorageUpdateBtn)
      );
    } else {
      // here we will use updateTextareaBoxValue.restOfTextContent to update
      // user content property in data obj
      nestedLoopingThroughData(
        dataOfLocalStorageUpdateBtn.comments,
        obj.levelObj,
        obj.uniqueIdObj.uniqueID,
        "content",
        updateTextareaBoxValue.restOfTextContent,
        undefined
      );
      localStorage.setItem(
        "commentDataObj",
        JSON.stringify(dataOfLocalStorageUpdateBtn)
      );
    }
    /**
     * after updating value of data obj we want to saving updates to localStorage
     * comprehensive & collision
     * **/
  }

  /**
   * reply and edit select btn helper
   * **/

  function replyBtnForSelectBtn(element, selector) {
    // have to account for when user click on multiple reply or edit btn
    // then change current user
    // call this func in a foreach
    if (element.getAttribute(selector) == "true") {
      element.setAttribute(selector, "false");
      element.firstElementChild.nextElementSibling.firstElementChild.value = "";
    }
  }

  /**
   * reply edit btn box helper
   * **/

  function replyBtnBoxHelper(replyOrEdit, textarea, attrSelector, textValue) {
    if (replyOrEdit.getAttribute(attrSelector) == "false") {
      if (textarea.value === "") {
        // if textarea is empty or empty string we want to add @username to textarea value
        // edit btn algorithm should never be an empty string for textarea.value
        textarea.value = textValue;
        // show reply box
        replyOrEdit.setAttribute(attrSelector, "true");
        textarea.focus();
      } else {
        replyOrEdit.setAttribute(attrSelector, "true");
      }
    } else {
      // if element with replybtnclick is "true" set value to "false"
      replyOrEdit.setAttribute(attrSelector, "false");
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
          const dataOfLocalStorageForSelectBtns = JSON.parse(
            localStorage.getItem("commentDataObj")
          );
          console.log("hello", cachedData.currentUser);
          /**
           * previous user algorithm works
           * **/
          // const [previousSelectedUser] =
          //   cachedData.contentForSelectUserButtons.filter(
          //     function findMatchingUserName(eachObj) {
          //       return eachObj.name == cachedData.currentUser.userName;
          //     }
          //   );
          // get btn select name
          const userBtnSelectname =
            btnInUserModalClicked.getAttribute("selectuser");
          // get img src
          const userBtnChildImgSrc =
            btnInUserModalClicked.firstElementChild.getAttribute("src");
          // get full name from aria-label
          const [firstName, lastName] = btnInUserModalClicked
            .getAttribute("aria-label")
            .split(" ")
            .slice(4);
          const userFullname = `${firstName} ${lastName}`;
          console.log(userBtnSelectname, userBtnChildImgSrc, userFullname);
          //   update current user info in dataobj
          updateCurrentUserInCachedObj(
            userBtnSelectname,
            userBtnChildImgSrc,
            userFullname,
            cachedData
          );
          /**
           * ***** *****
           * we can update the currUser property in local storage here
           * ***** *****
           * **/

          dataOfLocalStorageForSelectBtns.currUser = cachedData.currentUser;

          localStorage.setItem(
            "commentDataObj",
            JSON.stringify(dataOfLocalStorageForSelectBtns)
          );

          changeCommentUserImgSelectBtnsReplyTextboxImg(userBtnSelectname);
          /**
           * ***** *****
           * code in this bracket moved to changeCommentUserImgSelectBtnsReplyTextboxImg
           * ***** *****
           **/
          // array of items to assign values to
          // const arrayOfObjWithValues = filterOutUserClicked(
          //   userBtnSelectname,
          //   cachedData.contentForSelectUserButtons
          // );
          // console.log(userBtnSelectname);

          // // console.log(previousSelectedUser);
          // console.log(arrayOfObjWithValues);
          // // assign values to select user btns
          // assignValuesSelectUserBtns(
          //   arrayOfSelectUserBtns,
          //   arrayOfObjWithValues
          // );
          // // change avatar img
          // commentTextBoxAvatarImg.setAttribute(
          //   "src",
          //   cachedData.currentUser.imgSrc
          // );
          // // select all element with user attr
          // // filter out element with user attr that match current user
          // // use foreach to loop through array and set value "true" to attr currentuser
          // // and filter out element with user attr that does not match current user
          // // use foreach to loop through array and set value "false" to attr currentuser
          // const [changeValueToTrue, changeValueToFalse] = Array.prototype.slice
          //   .call(document.querySelectorAll("[user]"))
          //   .reduce(
          //     function makeTwoArrays(buildingUp, currentValue) {
          //       // get value of attr user for each element
          //       const userAttrValue = currentValue.getAttribute("user");
          //       userAttrValue == cachedData.currentUser.name
          //         ? buildingUp[0].push(currentValue)
          //         : buildingUp[1].push(currentValue);
          //       return buildingUp;
          //       // if else statement
          //       // if (userAttrValue == cachedData.currentUser.userName) {
          //       //     buildingUp[0].push(currentValue);
          //       // } else {
          //       //     buildingUp[1].push(currentValue);
          //       // }
          //       // return buildingUp;
          //     },
          //     [[], []]
          //   );
          // // use foreach to loop through array and set value "true" to attr currentuser
          // changeValueToTrue.forEach(function showDeleteAndEditBtn(element) {
          //   if (element.getAttribute("data-currentUser") != "true") {
          //     element.setAttribute("data-currentUser", "true");
          //   }
          // });
          // // use foreach to loop through array and set value "false" to attr currentuser
          // changeValueToFalse.forEach(function showReplyBtn(element) {
          //   if (element.getAttribute("data-currentUser") != "false") {
          //     element.setAttribute("data-currentUser", "false");
          //   }
          // });
          // // select all all element with this selector .reply-textbox .avatar img
          // // set src attr of each img element current user img file
          // // use value in cachedData.currentUser
          // Array.prototype.slice
          //   .call(document.querySelectorAll(".reply-textbox .avatar img"))
          //   .forEach(function changeImgSrc(eachImg) {
          //     eachImg.setAttribute("src", cachedData.currentUser.imgSrc);
          //   });
          /**
           * ***** *****
           * code in this bracket moved to changeCommentUserImgSelectBtnsReplyTextboxImg
           * ***** *****
           **/
          console.log(cachedData.currentUser);
          // we want to reset the reply box value to empty str and
          // not show the reply box textarea
          // target element with replybtnclick "true"
          const arrayOfReplyTextboxWrapper = Array.from(
            document.querySelectorAll("[replybtnclick='true']")
          );
          if (arrayOfReplyTextboxWrapper.length > 0) {
            arrayOfReplyTextboxWrapper.forEach(function changeAttrValueReplyBtn(
              eachWrapper
            ) {
              replyBtnForSelectBtn(eachWrapper, "replybtnclick");
              // if (replyTextboxWrapper.getAttribute("replybtnclick") == "true") {
              //   replyTextboxWrapper.setAttribute("replybtnclick", "false");
              //   replyTextboxWrapper.firstElementChild.nextElementSibling.firstElementChild.value =
              //     "";
              // }
            });
          }
          // we want to reset the edit box value to empty str and
          // not show the edit box textarea
          // target element with editbtnclick "true"
          const arrayOfEditTextboxWrapper = Array.prototype.slice.call(
            document.querySelectorAll("[editBtnClick='true']")
          );
          if (arrayOfEditTextboxWrapper.length > 0) {
            arrayOfEditTextboxWrapper.forEach(function changeAttrEditBtn(
              eachWrapper
            ) {
              eachWrapper.setAttribute("editBtnClick", "false");
            });
          }
        }
        // hide user buttons modal when user click on close modal button or user btn
        hideSelectUserButtons(selectBtnModal);
        console.log("after", cachedData);
        //   focus select user btn when user click on close modal btn or a user btn
        selectUserBtn.focus();
      }
    }
  }
  /**
   * changing comment textbox userImg, values in select user btns wrapper, img of reply textbox
   * **/

  function changeCommentUserImgSelectBtnsReplyTextboxImg(currUser) {
    // array of items to assign values to
    /**
     * when app starts/loads we will update the currentUser value in cachedData from localStorage
     * before running this func
     * **/
    const arrayOfObjWithValues = filterOutUserClicked(
      currUser,
      cachedData.contentForSelectUserButtons
    );
    console.log(currUser);

    // console.log(previousSelectedUser);
    console.log(arrayOfObjWithValues);
    // assign values to select user btns
    assignValuesSelectUserBtns(arrayOfSelectUserBtns, arrayOfObjWithValues);
    // change avatar img
    commentTextBoxAvatarImg.setAttribute("src", cachedData.currentUser.imgSrc);
    // select all element with user attr
    // filter out element with user attr that match current user
    // use foreach to loop through array and set value "true" to attr currentuser
    // and filter out element with user attr that does not match current user
    // use foreach to loop through array and set value "false" to attr currentuser
    const [changeValueToTrue, changeValueToFalse] = Array.prototype.slice
      .call(document.querySelectorAll("[user]"))
      .reduce(
        function makeTwoArrays(buildingUp, currentValue) {
          // get value of attr user for each element
          const userAttrValue = currentValue.getAttribute("user");
          userAttrValue == cachedData.currentUser.name
            ? buildingUp[0].push(currentValue)
            : buildingUp[1].push(currentValue);
          return buildingUp;
          // if else statement
          // if (userAttrValue == cachedData.currentUser.userName) {
          //     buildingUp[0].push(currentValue);
          // } else {
          //     buildingUp[1].push(currentValue);
          // }
          // return buildingUp;
        },
        [[], []]
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
  function updateCurrentUserInCachedObj(user, imgSrc, name, data) {
    data.currentUser.userName = user;
    data.currentUser.imgSrc = imgSrc;
    data.currentUser.name = name;
  }
  // assign values to select user btns
  /**
   * as long as we dont update property userInfo in localStorage when user click on a profile to select a user
   * each userDataObj in comments array or "leveObj"LevelReplies array will have the username. name and img we can use
   * **/
  function assignValuesSelectUserBtns(btnsArray, arrayOfObj) {
    // items/length of both array both are the same
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
      Number(currentTimeObj.date) - Number(createdAtObj.date);
    return {
      differenceInYear,
      differenceInMonth,
      differenceInDay,
    };
  }

  /**
   * run func based on conditions
   * **/

  function calculateDurationBasedOnConditions(createdAt, currentTime) {
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
        const daysLeftInCreatedAtMonth =
          daysInCreatedAtMonth - Number(createdAt.date);
        const totalDaysLeft =
          daysLeftInCreatedAtMonth + Number(currentTime.date);
        return calculateDayAndWeek(totalDaysLeft);
      }
    }
    /** **/
    // if year == 1
    if (differenceInYear == 1) {
      if (differenceInMonth >= 0) {
        // check month
        // if month is >= 0 pass value of diff in year to checkifneedplural
        // if both year and month is "2022" "May" and the other is "2021" "May"
        // that will be one year since content was created
        return checkIfNeedPluralFormOfCreatedAtDuration(
          differenceInYear,
          "year"
        );
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
      return checkIfNeedPluralFormOfCreatedAtDuration(differenceInYear, "year");
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
    return checkIfNeedPluralFormOfCreatedAtDuration(totalDays, "day");
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
   * create elements
   * **/

  function createElementForCommentOrReply(
    tag,
    objectOfAttr,
    contentValue,
    xmlnsValue
  ) {
    // create element
    const elementForCommentOrReply = !xmlnsValue
      ? document.createElement(tag)
      : document.createElementNS(xmlnsValue, tag);
    /**
     * or check if xmlnsValue is truthy then we will call document.createELementNS else if its falsy we will call document.createElement
     * **/
    // turn obj of attr into an array of subarrays with [attr,attrValue]
    const arrayOfSubarrayOfAttrAndAttrValue = Object.entries(objectOfAttr);
    // use forEach to assign attr to element
    arrayOfSubarrayOfAttrAndAttrValue.forEach(function assignAttr(subarray) {
      const [attr, attrValue] = subarray;
      elementForCommentOrReply.setAttribute(attr, attrValue);
    });
    elementForCommentOrReply.innerText = contentValue ? contentValue : "";
    return elementForCommentOrReply;
  }

  /**
   * create div with uniqueID attr
   * **/

  /**
   * children of div with uniqueID
   * **/

  /**
   * div with class content
   *
   * **/

  function contentContainer(
    uniqueIdObj,
    levelObj,
    parentUsername,
    parentDataObj
  ) {
    /**
     * the value of parentUsername is being passed in when we call contentContainer
     * in our bindUniqueObjForReplyPostBtn to create our element for the reply content
     * **/
    // content container
    /**
     * add click event listener to content container parent element to our
     * like counter btns, reply, edit, delete btn and post update btn
     * **/

    /**
     * when user click on "send" or "reply" btn, the user is the currentUser
     * but when we run func to create elements from data in local storage we want to check the current user in cachedData
     **/
    const contentContainerElement = createElementForCommentOrReply("DIV", {
      class: "content",
      "data-currentUser": "true",
      user: `${uniqueIdObj.userInfo.name}`,
    });
    // div .like-counter
    const likeCounter = createElementForCommentOrReply("DIV", {
      class: "like-counter",
    });
    // button .plus > img plus
    const plusBtn = createElementForCommentOrReply("BUTTON", {
      class: "plus",
      "aria-label": "increase score",
    });
    // const plusImg = createElementForCommentOrReply("IMG", {
    //   src: "./images/icon-plus.svg",
    //   alt: "",
    // });
    /**
     *  add svg element to change cover on hover
     *  **/
    // svg element
    const svgFormOfPlusImg = createElementForCommentOrReply(
      "svg",
      {
        width: "11",
        height: "11",
      },
      undefined,
      "http://www.w3.org/2000/svg"
    );
    const pathOfSvgPlugImg = createElementForCommentOrReply(
      "path",
      {
        d: "M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z",
        fill: "#C5C6EF",
      },
      undefined,
      "http://www.w3.org/2000/svg"
    );
    // append path element to svg
    svgFormOfPlusImg.append(pathOfSvgPlugImg);
    // append plus img to button
    plusBtn.append(svgFormOfPlusImg);
    // span .number

    const contentOfCounter = createElementForCommentOrReply(
      "SPAN",
      { class: "number" },
      `${uniqueIdObj[`${uniqueIdObj.uniqueID}score`]}`
    );
    // button .minus > img minus
    const minusBtn = createElementForCommentOrReply("BUTTON", {
      class: "minus",
      "aria-label": "decrease score",
    });
    // const minusImg = createElementForCommentOrReply("IMG", {
    //   src: "./images/icon-minus.svg",
    //   alt: "",
    // });
    /**
     *  add svg element to change cover on hover
     *  **/

    // svg element
    const svgFormOfMinusImg = createElementForCommentOrReply(
      "svg",
      {
        width: "11",
        height: "3",
      },
      undefined,
      "http://www.w3.org/2000/svg"
    );

    const pathOfSvgMinusImg = createElementForCommentOrReply(
      "path",
      {
        d: "M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z",
        fill: "#C5C6EF",
      },
      undefined,
      "http://www.w3.org/2000/svg"
    );
    // append path element to svg
    svgFormOfMinusImg.append(pathOfSvgMinusImg);
    // append minus img to button
    minusBtn.append(svgFormOfMinusImg);
    // append children to likeCounter
    appendChildrenToParent(likeCounter, [plusBtn, contentOfCounter, minusBtn]);
    // div .user-info
    const userInfoContainer = createElementForCommentOrReply("DIV", {
      class: "user-info",
    });
    // > img
    const userImg = createElementForCommentOrReply("IMG", {
      src: `${uniqueIdObj.userInfo.imgSrc}`,
      alt: "",
    });
    console.log("contentContainer", contentContainerElement);
    // > span .name
    const nameElement = createElementForCommentOrReply(
      "SPAN",
      { class: "name" },
      uniqueIdObj.userInfo.userName
    );
    // > div .status
    const statusWrapper = createElementForCommentOrReply("DIV", {
      class: "status",
    });
    // > > span content you
    const statusContent = createElementForCommentOrReply("SPAN", {}, "you");
    // append status text to wrapper
    statusWrapper.append(statusContent);
    // > div .createdAt

    /**
     * we will handle calculating user's createdAt here.
     * our duration func takes the createdAt value and currentTime value
     * calculateDurationBasedOnConditions
     * when we call contentContainer func when user click on "send" or "reply" btn the time will be 0 days because the data obj passed into this contentContainer
     * func will have the date/time of when the user clicked on "send" or "reply" btn
     * when we call contentContainer in our func that will build elements based on data in local storage
     * the date/time unchanged since the user clicked on "send" or "reply" btn
     * **/
    /**
     * pass in obj of createAt obj and currentTime obj
     * we will use createTimeObj func to get currentTime obj
     * uniqueIdObj[`${uniqueIdObj.uniqueId}time`].dateObj
     * **/

    const createAtObj = uniqueIdObj[`${uniqueIdObj.uniqueID}time`].dateObj;
    const currentTimeObj = createTimeObj();

    /**
     * pass in obj {year: "2021", month: "August", date: "8"}
     * to test our calculateDurationBasedOnConditions func
     * **/

    const durationValue = calculateDurationBasedOnConditions(
      { year: "2022", month: "Apr", date: "20" },
      currentTimeObj.dateObj
    );
    const createdWrapper = createElementForCommentOrReply("DIV", {
      class: "createdat",
    });
    // > > span .duration + span content ago
    const durationElement = createElementForCommentOrReply(
      "SPAN",
      { class: "duration" },
      durationValue
    );
    const durationTextContent = createElementForCommentOrReply(
      "SPAN",
      {},
      " ago"
    );
    // append children to createdWrapper
    appendChildrenToParent(createdWrapper, [
      durationElement,
      durationTextContent,
    ]);
    // append children to user-info
    appendChildrenToParent(userInfoContainer, [
      userImg,
      nameElement,
      statusWrapper,
      createdWrapper,
    ]);

    /**
     * for reply,edit,delete when level != "base"
     * we want the vale of attr user of the element with class content
     * button .reply-btn use teneray operator for aria label value
     * contentForReplyAtUsernameTextbox is to be used by edit,delete reply textbox show btn
     * for the aria-label to let user know which user comment/reply they are responding to
     * **/

    console.log("parentUsername", parentUsername);

    const contentForReplyAtUsernameTextbox =
      contentContainerElement.getAttribute("user");
    console.log(
      "contentForReplyAtUsernameTextbox",
      contentForReplyAtUsernameTextbox
    );

    const replyBtn = createElementForCommentOrReply("BUTTON", {
      class: "reply-btn",
      "aria-label":
        uniqueIdObj.level == "base"
          ? `reply to ${uniqueIdObj.userInfo.name} comment post`
          : `reply to ${uniqueIdObj.userInfo.name} reply post`,
    });
    const replyBtnImg = createElementForCommentOrReply("IMG", {
      src: "./images/icon-reply.svg",
    });
    const replyBtnText = createElementForCommentOrReply("SPAN", {}, "Reply");
    // append children to reply btn
    appendChildrenToParent(replyBtn, [replyBtnImg, replyBtnText]);
    // div .delete-edit-img-container
    const deleteEditBtnContainer = createElementForCommentOrReply("DIV", {
      class: "delete-edit-img-container",
    });
    // > button .delete-trash-btn use teneray operator for aria label value
    // > > img + span content DELETE
    const deleteBtn = createElementForCommentOrReply("BUTTON", {
      class: "delete-trash-btn",
      "aria-label":
        uniqueIdObj.level == "base"
          ? `delete your comment post`
          : `delete your reply post to ${parentUsername}`,
    });
    const deleteBtnImg = createElementForCommentOrReply("IMG", {
      src: "./images/icon-delete.svg",
    });
    const deleteBtnText = createElementForCommentOrReply("SPAN", {}, "Delete");
    // append children to deleteBtn
    appendChildrenToParent(deleteBtn, [deleteBtnImg, deleteBtnText]);
    // > button .edit-btn use teneray operator for aria label value
    // > > img + span content EDIT
    const editBtn = createElementForCommentOrReply("BUTTON", {
      class: "edit-btn",
      "aria-label":
        uniqueIdObj.level == "base"
          ? `edit your comment post`
          : `edit your reply post to ${parentUsername}`,
    });
    const editBtnImg = createElementForCommentOrReply("IMG", {
      src: "./images/icon-edit.svg",
    });
    const editBtnText = createElementForCommentOrReply("SPAN", {}, "Edit");
    // append children to editBtn
    appendChildrenToParent(editBtn, [editBtnImg, editBtnText]);
    // append children to deleteEditBtnContainer
    appendChildrenToParent(deleteEditBtnContainer, [deleteBtn, editBtn]);
    // div .paragraph-edit-box-container attr editbtnclick
    const paragraphEditBoxContainer = createElementForCommentOrReply("DIV", {
      class: "paragraph-edit-box-container",
      editbtnclick: "false",
    });
    // > p .text-content
    const paragraphWrapper = createElementForCommentOrReply("P", {
      class: "text-content",
    });
    // > > span .atUser + span .text
    // the atUser needs to be the parent content username
    const spanAtUser = createElementForCommentOrReply(
      "SPAN",
      { class: "atUser" },
      uniqueIdObj.level != "base"
        ? `@${parentUsername.split(" ").join("")} `
        : null
    );
    const commentReplyContent = createElementForCommentOrReply(
      "SPAN",
      { class: "text" },
      uniqueIdObj[`${uniqueIdObj.uniqueID}content`]
    );
    // use teneray operator to append span with class .atUser to p .text-content or not
    uniqueIdObj.level == "base"
      ? paragraphWrapper.append(commentReplyContent)
      : (paragraphWrapper.append(spanAtUser),
        paragraphWrapper.append(commentReplyContent));
    // > div .textarea-wrapper
    const textareaContainer = createElementForCommentOrReply("DIV", {
      class: "textarea-wrapper",
    });
    // > > textarea
    const textareaElement = createElementForCommentOrReply("TEXTAREA", {
      name: "enter-edit",
      cols: "30",
      rows: "3",
    });
    // append textarea element to wrapper
    textareaContainer.append(textareaElement);
    // append children to paragraphEditBoxContainer
    appendChildrenToParent(paragraphEditBoxContainer, [
      paragraphWrapper,
      textareaContainer,
    ]);
    // button .update-post-btn cotent UPDATE
    const updateBtn = createElementForCommentOrReply(
      "BUTTON",
      {
        class: "update-post-btn",
      },
      "UPDATE"
    );
    // append children to content wrapper
    appendChildrenToParent(contentContainerElement, [
      likeCounter,
      userInfoContainer,
      replyBtn,
      deleteEditBtnContainer,
      paragraphEditBoxContainer,
      updateBtn,
    ]);
    /**
     * calling .bind() passing the obj we want "this" to reference here
     * **/
    // add event listener here after we append children to contentContainerElement element
    /**
     * contentForReplyAtUsernameTextbox will always be the username of the comment/reply content element
     * passing contentForReplyAtUsernameTextbox into bindUniqueObjForContentContainer which is attached to our click listener
     * for the element with class content
     * so when we click on edit,delete, reply etc we have access to that data obj
     * this is used for aria-label text for delete, edit btns
     * **/
    /**
     * contentForReplyAtUsernameTextbox: is used for the reply textbox for the atusername text content
     *
     * **/
    /**
     * parentUsername: different for comment content and reply content
     * for comment content it will be undefined we are not passing an value when we call contentContainer func
     * in send btn click algorithm
     * when we call contentcontainer in bind to reply post btn algorithm
     * we pass in the value we get using event.target.closest("[uniqueID]")
     * getting the value of user attr of div .content to assign that username to reply textarea textbox
     * **/
    /**
     * note: we create user data obj using func createUserDataObj then pass that obj into contentContainer
     * **/
    const contentContainerElementListener =
      uniqueIdObj.level == "base"
        ? bindUniqueObjForContentContainer.bind({
            uniqueIdObj,
            contentForReplyAtUsernameTextbox,
            levelObj,
          })
        : bindUniqueObjForContentContainer.bind({
            uniqueIdObj,
            contentForReplyAtUsernameTextbox,
            parentUsername,
            levelObj,
            parentDataObj,
          });

    applyEvent(
      contentContainerElement,
      "click",
      contentContainerElementListener
    );
    return contentContainerElement;
  }

  /**
   * div with class reply-textbox
   * **/

  function replyTextboxContainer(uniqueObj, repliesLevelObj) {
    // console.log("testing", testing);
    // parent element with attr .reply-textbox and replybtnclick="false"
    // at first avatar img will be the user that submitted the comment/reply content
    // then we let our user change the current user by click on select user btn
    const textboxParent = createElementForCommentOrReply("DIV", {
      class: "reply-textbox",
      replybtnclick: "false",
    });
    // div .avatar with img as child
    const avatarWrapper = createElementForCommentOrReply("DIV", {
      class: "avatar",
    });
    const avatarImg = createElementForCommentOrReply("IMG", {
      alt: "",
      src: uniqueObj.userInfo.imgSrc,
    });
    avatarWrapper.append(avatarImg);
    // div .textarea-wrapper with textarea as child
    const textareaContainer = createElementForCommentOrReply("DIV", {
      class: "textarea-wrapper",
    });
    const textareaElement = createElementForCommentOrReply("TEXTAREA", {
      name: "enter-reply",
      cols: "30",
      rows: "3",
    });
    textareaContainer.append(textareaElement);
    // button .reply-post-btn content REPLY
    const replyPostBtn = createElementForCommentOrReply(
      "BUTTON",
      { class: "reply-post-btn" },
      "REPLY"
    );
    // add click event listener to reply btn here: we want to pass in the uniqueID obj and repliesLevel obj
    // calling .bind() passing the obj we want "this" to reference here
    /**
     * parentContentUserName will be the username of the comment/reply the use is replying to
     * we will use to for the reply post content container edit,delete etc btn
     * **/
    const replyBtnListener = bindUniqueObjForReplyPostBtn.bind({
      uniqueObj,
      repliesLevelObj,
    });
    applyEvent(replyPostBtn, "click", replyBtnListener);
    // append children to parent
    appendChildrenToParent(textboxParent, [
      avatarWrapper,
      textareaContainer,
      replyPostBtn,
    ]);
    return textboxParent;
  }

  /**
   * children of reply-textbox element
   * **/

  /**
   * div with attr hasreplies and linerepliesbox
   * **/

  function lineAndRepliesContainer(uniqueIdObj, repliesLevelObj) {
    // div parent element attr hasreplies and linerepliesbox
    const lineRepliesParent = createElementForCommentOrReply("DIV", {
      hasreplies: "false",
      linerepliesbox: `${repliesLevelObj[uniqueIdObj.level]}level`,
    });
    // div .line-container
    const lineParent = createElementForCommentOrReply("DIV", {
      class: "line-container",
    });
    const lineElement = createElementForCommentOrReply("SPAN", {
      class: "line",
    });
    lineParent.append(lineElement);
    // div .uniqueId-level-replies
    const levelRepliesContainer = createElementForCommentOrReply("DIV", {
      class: `${uniqueIdObj.uniqueID}-${
        repliesLevelObj[uniqueIdObj.level]
      }level-replies`,
    });
    // append children to parent
    appendChildrenToParent(lineRepliesParent, [
      lineParent,
      levelRepliesContainer,
    ]);
    return lineRepliesParent;
  }

  /**
   * children of hasreplies element
   * **/

  /**
   * append elements to parent element
   * **/

  function appendChildrenToParent(parentElement, childrenArray) {
    childrenArray.forEach(function addChildToParent(child) {
      parentElement.append(child);
    });
  }

  /**
   * postReplyAndUpdateHelper
   * **/

  function postReplyAndUpdateHelper(textareaValue) {
    // make copy of username string and text content
    const textString = textareaValue.split(" ");
    const atUserNameBeforeRemovingLastChar = textString.slice(0, 1);
    // get content for element with class text
    // join into string
    const restOfTextContent = textString.slice(1).join(" ");
    // get @username and remove last char of string
    const atUserName = atUserNameBeforeRemovingLastChar[0].slice(
      0,
      atUserNameBeforeRemovingLastChar[0].length - 1
    );
    return {
      restOfTextContent,
      atUserName,
    };
  }

  /**
   * loop through local storage data
   * **/

  function nestedLoopingThroughData(
    list,
    levelsObj,
    matchID,
    endOfObjProp,
    updateValue,
    parentID = 0
  ) {
    // var result;
    /**
     * reason result is undefined is this func scope resets everytime we call it recursively
     * if we want the obj with that matching parentUniqueID, we would
     * want to declare a func(we will call recursively) in this nestloopingthoughdata func
     * once we find the obj with that matching uniqueID assign that obj to result variable
     * have nestedLoopingThroughData func return it
     * **/
    list.forEach(function findObjWithMatchingID(eachObj) {
      // for delete btn we want to pass the uniqueID into each recursive func call of
      // nestedLoopingThroughData
      if (
        eachObj.hasOwnProperty(`${levelsObj[eachObj.level]}LevelReplies`) &&
        eachObj[`${levelsObj[eachObj.level]}LevelReplies`].length > 0
      ) {
        // recursive loop
        nestedLoopingThroughData(
          eachObj[`${levelsObj[eachObj.level]}LevelReplies`],
          levelsObj,
          matchID,
          endOfObjProp,
          updateValue,
          eachObj.uniqueID
        );
      }
      /**
       * moving conditional checks outside of this if statement
       * because when the levelReplies array is empty/length == 0 whic is not greater than 0
       * we dont enter this if statement
       * **/
      /**
       * with the conditionals outside of the if statement of checking the LevelReplies
       * and the length of the LevelReplies array we still loop if there is objs in the array
       * still update the objs based on matching uniqueID
       * **/
      // for delete btn we wont pass argument/value for updateValue parameter
      if (eachObj.hasOwnProperty("uniqueID") && eachObj.uniqueID == matchID) {
        // if update value is undefined assign value of parentId to parentIdForDeleteAlgorithm
        // in cachedObj
        if (!updateValue) {
          cachedData.objMatchingUniqueID = eachObj;
        } else {
          // when we want to push/add data obj to array
          // we can check if endOfObjProp == undefined or
          // when we want to push the data obj into the array of LevelReplies
          // we will pass in undefined for parameter endOfObjProp
          // we pass in a value for endOfObjProp when we want to update score and content
          // if typeof is object, it is not an array and its not a function
          if (!endOfObjProp) {
            eachObj[`${levelsObj[eachObj.level]}LevelReplies`].push(
              updateValue
            );
          } else {
            // if (typeof updateValue == "object" && !Array.isArray(updateValue) && typeof updateValue != "function") {
            //   eachObj[`${levelsObj[eachObj.level]}LevelReplies`].push(updateValue);
            // }
            // need uniqueID of obj to select obj property we want to update
            eachObj[`${eachObj.uniqueID}${endOfObjProp}`] = updateValue;
          }
        }
        // cachedData.objMatchingUniqueID = eachObj;
        // or
        // updateValue == undefined
        //   ? (cachedData.parentIdForDeleteAlgorithm = parentID)
        //   : (eachObj[`${eachObj.uniqueID}${endOfObjProp}`] = updateValue);
        /**
         * once we find the obj with the matching uniqueID we can return
         * **/
      }
    });
  }

  /**
   * filter func algorithm for delete btn
   * deleting comment or reply post will require different algorithm
   * the array we pass in will be different
   * **/

  /**
   * when we call filterOutObjOfMatchingUniqueID if parentIdForDeleteAlgorithm is 0
   * or the default value we assign to parentID of nestedLoopingThroughData func
   * **/

  function makeArrayOfObjsNotMatchingUniqueID(list, matchingID) {
    //
    return list.filter(function removeObj(eachObj) {
      return eachObj.uniqueID != matchingID;
    });
  }

  /**
   * use filter method to get obj in array that matches uniqueID
   * when obj.level == "base" we know it is the array assigned to comment property of dataobj
   * ***** might want to use foreach loop through array and update value *****
   * ***** instead of using filter since filter method will return a new array *****
   * ***** could eliminate one step *****
   * **/

  function filterOutObjOfMatchingUniqueID(list, matchingID) {
    return list.filter(function findObjThatMatchUniqueID(eachObj) {
      return eachObj.uniqueID == matchingID;
    });
  }

  /**
   * uppercase first char helper
   * **/

  function uppercaseFirstChar(str) {
    const arrOfNames = str.split(" ");
    const firstCharOfFirstname = arrOfNames[0].slice(0, 1).toUpperCase();
    const restOfFirstname = arrOfNames[0].slice(1);
    const firstCharOfLastname = arrOfNames[1].slice(0, 1).toUpperCase();
    const restOfLastname = arrOfNames[1].slice(1);
    const firstName = [firstCharOfFirstname, restOfFirstname].join("");
    const lastName = [firstCharOfLastname, restOfLastname].join("");
    const fullName = [firstName, lastName].join(" ");
    return fullName;
  }

  /**
   * func to build element based on data in localstorage
   * **/

  function loopThroughDataInLocalStorageAndCreateElements(
    list,
    repliesLevel,
    parentObj = {}
  ) {
    /**
     * comment content element
     * we want div with uniqueID attr
     * content element
     * reply textbox
     * vertical line replies wrapper
     * append these elements to div with uniqueID attr
     * we pass in dataObj and repliesLevelObj to all three funcs that create the three elements
     * **/
    list.forEach(function createElementFromDataStorage(eachObj) {
      console.log(cachedData.currentUser);
      // create elements before we loop recursively
      // check if level is base or not here
      // uniqueId element
      const uniqueIdElement = createElementForCommentOrReply("DIV", {
        uniqueID: eachObj.uniqueID,
      });
      // content element
      const contentELement =
        eachObj.level == "base"
          ? contentContainer(eachObj, cachedData.repliesLevel)
          : contentContainer(
              eachObj,
              cachedData.repliesLevel,
              parentObj.userInfo.name,
              parentObj
            );
      // reply textbox
      const replyTextbox = replyTextboxContainer(
        eachObj,
        cachedData.repliesLevel
      );
      // vertical and replies
      const verticalLineAndReplies = lineAndRepliesContainer(
        eachObj,
        cachedData.repliesLevel
      );
      // uniqueIdElementParent
      const uniqueIdElementParent =
        eachObj.level == "base"
          ? document.querySelector(".comments")
          : document.querySelector(
              `.${parentObj.uniqueID}-${
                repliesLevel[parentObj.level]
              }level-replies`
            );
      // append children to uniqueIdElement
      uniqueIdElement.append(contentELement);
      uniqueIdElement.append(replyTextbox);
      uniqueIdElement.append(verticalLineAndReplies);
      // append uniqueIdElement to correct parent element
      /**
       * we are appending the correct reply content element to uniqueIdElementParent
       * but the parent element of uniqueIdElementParent has a attr hasreplies="false" which has display none
       * we change it to "true" when user click on "reply" post btn
       * find a way to assign value "true" to hasReplies attr
       **/
      uniqueIdElementParent.append(uniqueIdElement);
      // element to append uniqueID element, either element with .comments or .uniqueID-levelObjLevel-replies
      if (
        eachObj.hasOwnProperty([
          `${repliesLevel[eachObj.level]}LevelReplies`,
        ]) &&
        eachObj[`${repliesLevel[eachObj.level]}LevelReplies`].length > 0
      ) {
        loopThroughDataInLocalStorageAndCreateElements(
          eachObj[`${repliesLevel[eachObj.level]}LevelReplies`],
          repliesLevel,
          eachObj
        );
      }
    });
    /**
     * reply content elements
     * we want div with uniqueID attr
     * content element
     * reply textbox
     * vertical line replies wrapper
     * append these elements to div with uniqueID attr
     * for func that create content element we will pass in dataobj currentuser, repliesLevelObj,parentUserName,parent data obj
     * for func that create reply textbox and vertical line replies wrapper elements
     * we will pass in dataObj and repliesLevelObj
     * we will append content element, reply textbox, vertical line replies wrapper to div with uniqueID attr element
     * append the uniqueID attr element to element with this selector
     * document.querySelector(`.${parentUniqueID}-${levelObj[parentLevel]}level-repies`)
     * first level replies will have a parentLevel of base then we can use that value to access the value in levelObj
     * which is will give us first
     * base > first
     * first > second etc
     * **/
    // check if level of obj base or not
    // if base create comment content
    // else create reply content
  }

  function useLocalStorage() {
    // data obj
    const data = {
      focusElementForEscapeKey: null,
      savedDeleteContentElement: null,
      removeClickListenerOnDeleteModal: null,
      parentIdForDeleteAlgorithm: null,
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
        name: "amy robson",
      },
      uniqueID: null,
      contentForSelectUserButtons: [
        {
          name: "amyrobson",
          src: "./images/avatars/image-amyrobson.png",
          label: "click to select user amy robson",
          fullName: "Amy Robson",
        },
        {
          name: "juliusomo",
          src: "./images/avatars/image-juliusomo.png",
          label: "click to select user juliu somo",
          fullName: "Julius Somo",
        },
        {
          name: "maxblagun",
          src: "./images/avatars/image-maxblagun.png",
          label: "click to select user max blagun",
          fullName: "Max Blagun",
        },
        {
          name: "ramsesmiron",
          src: "./images/avatars/image-ramsesmiron.png",
          label: "click to select user ramses miron",
          fullName: "Ramses Miron",
        },
      ],
    };
    // local storage
    const localStoragedata = {
      /**
       * we will add obj to comment property dynamically
       * **/
      currUser: null,
      comments: [],
    };
    if (localStorage.getItem("commentDataObj") == null) {
      localStorage.setItem("commentDataObj", JSON.stringify(localStoragedata));
    }
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

    /**
     * passing data obj to event listener of our element using .bind()
     * **/

    function bindObjForContentContainer(event) {
      console.log(this);
      console.log(this.uniqueID);
      console.log(event.target);
    }

    function bindObjForReplyBtn(event) {
      console.log(this);
      console.log(this.base);
      console.log(event.target);
    }

    const contentListener = bindObjForContentContainer.bind({
      ...repliesLevel,
      uniqueID: "12345678",
    });

    const replyBtnListener = bindObjForReplyBtn.bind({
      base: "first",
      first: "second",
      second: "third",
    });

    document
      .querySelector(".content")
      .addEventListener("click", contentListener);

    document
      .querySelector(".reply-post-btn")
      .addEventListener("click", replyBtnListener);

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

    function nestedLoopingReturnArray(
      list,
      repliesLevelObj,
      matchUniqueID,
      parentID = 0
    ) {
      // const result = [];
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
            repliesLevelObj,
            matchUniqueID,
            eachObj.uniqueID
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
        if (
          eachObj.hasOwnProperty("uniqueID") &&
          eachObj.uniqueID == matchUniqueID
        ) {
          //   eachObj.uniqueID = "hello we changed the value of the string";
          repliesLevelObj.arrOfObj.push(parentID);
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
            uniqueID: "323",
            secondLevelReplies: [
              { uniqueID: "213", print: "thirdlevel second obj" },
            ],
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
