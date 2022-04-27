(function scopeOurVariables() {
  // our selectors
  const selectBtnModal = document.querySelector(".user-select-btns");
  const closeBtnModal = document.querySelector(".close-select-user-modal");
  const commentTextBoxAvatarImg = document.querySelector(
    ".comment-text-box .avatar-textbox img"
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
  // add click to select user button
  applyEvent(
    document.querySelector(".select-user-btn"),
    "click",
    showSelectUserButtons
  );
  // show select user buttons modal
  function showSelectUserButtons(event) {
    const statusOfSelectUserModal = selectBtnModal.getAttribute(
      "userclickselectuser"
    );
    if (statusOfSelectUserModal == "false") {
      selectBtnModal.setAttribute("userclickselectuser", "true");
    }
  }
  // listen to click event for select user btns
  function clickEventForUserBtnsModal(event) {
    const btnInUserModalClicked = event.target.closest("BUTTON");
    if (
      btnInUserModalClicked.getAttribute("class") ==
        "close-select-user-modal" ||
      btnInUserModalClicked.getAttribute("selectuser") != null
    ) {
      console.log(cachedData.currentUser);
      if (
        btnInUserModalClicked.getAttribute("class") != "close-select-user-modal"
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
        assignValuesSelectUserBtns(arrayOfSelectUserBtns, arrayOfObjWithValues);
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
      localStorage.setItem("commentDataObj", JSON.stringify(localStoragedata));
      console.log(localStorage.getItem("commentDataObj"));
      alert("localstorage is updating with select user clicked");
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
