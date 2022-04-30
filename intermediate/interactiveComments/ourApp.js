(function scopeOurVariables() {
  // our selectors
  /** when we build content/container with reply, delete, **/
  const selectBtnModal = document.querySelector(".user-select-btns");
  const selectUserBtn = document.querySelector(".select-user-btn");
  const closeBtnModal = document.querySelector(".close-select-user-modal");
  const sendPostBtn = document.querySelector(".post-send-btn");
  const replyPostBtn = document.querySelector(".reply-post-btn");
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
  useLocalStorage();
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
      console.log("send");
    }
    if (classOfBtn == "reply-post-btn") {
      console.log("reply");
    }
  }
  // send/reply comment
  function postCommentOrReply(container) {
    // append coment/reply to container
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
          console.log(cachedData.currentUser);
        }
        // hide user buttons modal when user click on close modal button or user btn
        hideSelectUserButtons(selectBtnModal);
        localStoragedata.comments[0].commentUser =
          cachedData.currentUser.userName;
        console.log(localStoragedata);
        localStorage.setItem(
          "commentDataObj",
          JSON.stringify(localStoragedata)
        );
        //   focus select user btn when user click on close modal btn or a user btn
        selectUserBtn.focus();
        console.log(localStorage.getItem("commentDataObj"));
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
  function useLocalStorage() {
    // data obj
    const data = {
      currentUser: {
        imgSrc: "./images/avatars/image-amyrobson.png",
        userName: "amyrobson",
      },
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
      comments: [
        {
          commentUser: data.currentUser.userName,
        },
      ],
    };
    localStorage.setItem("commentDataObj", JSON.stringify(localStoragedata));
    return function closureOurData() {
      return { data, localStoragedata };
    };
  }
})();
