(function scopeOurVariables() {
  //   call our cached func
  // const accessData = scopeOurData();
  // const cachedData = accessData();
  // adding data obj to localStorage
  // usingLocalStorage(cachedData);

  const mobileModalElement = document.querySelector(".mobile-nav-menu");
  const carouselItemElement = document.querySelector(".carousel-item");

  // func below will set indexCounter to 0 in localStorage
  usingLocalStorage();
  // const storedData = JSON.parse(window.localStorage.getItem("dataObj"));

  // apply initial slide content when app load
  // console.log(storedData);
  initialCarouselItemContent(localStorage.getItem("dataObj"));

  // add open modal func to hamburger button
  applyEventListener(
    document.querySelector(".open-modal"),
    "click",
    openMobileModal
  );
  // add close moda func to close button
  applyEventListener(
    document.querySelector(".close-modal"),
    "click",
    closeMobileModal
  );

  // control img slider
  applyEventListener(
    document.querySelector(".btn-controller-container"),
    "click",
    sliderImgControlFunc
  );

  // apply event listener
  function applyEventListener(element, eventListener, func) {
    element.addEventListener(eventListener, func);
    //   when we want to remove event from element
    return func;
  }

  /** using local storage **/

  /** modal open/close **/

  function openMobileModal(event) {
    if (event.target.closest("BUTTON")) {
      mobileModalElement.setAttribute("data-status", "true");
    }
  }

  function closeMobileModal(event) {
    if (event.target.closest("BUTTON")) {
      mobileModalElement.setAttribute("data-status", "false");
    }
  }

  /** initial slide content **/

  function initialCarouselItemContent(storage) {
    // will be first obj in slider data array
    const obj = JSON.parse(storage);
    const copyOfObj = { ...obj };
    const { indexCounter, sliderData } = copyOfObj;
    console.log(copyOfObj.hasOwnProperty("indexCounter"));
    alert(
      "start here. figure out a way to not reset indexCounter in localstorage"
    );
    if (copyOfObj.hasOwnProperty("indexCounter")) {
      assignValuesFromCachedDataToSliderElements(sliderData[indexCounter]);
    } else {
      assignValuesFromCachedDataToSliderElements(sliderData[0]);
    }
  }

  /** slider button controls **/

  function sliderImgControlFunc(event) {
    if (event.target.closest("BUTTON")) {
      const storeDataArrowBtn = JSON.parse(localStorage.getItem("dataObj"));
      // get length of sliderData array
      const lengthOfSliderDataArrayMinusOne =
        storeDataArrowBtn.sliderData.length - 1;
      // get carousel item aria-label and convert to number type
      const carouselItemAriaLabelMinusOne =
        Number(carouselItemElement.getAttribute("aria-label").split(" ")[0]) -
        1;
      // subtract one from item aria label to access the obj with our data in an array using index. array[index]
      // value of aria label will be 1,2 or 3 from "aria-label='1 of 3'"

      const [previousOrNextBtn] = event.target
        .closest("BUTTON")
        .getAttribute("aria-label")
        .split(" ");
      /** using our storedData in closure func **/
      // switch (previousOrNextBtn) {
      //   case "previous":
      //     console.log(JSON.parse(window.localStorage.getItem("dataObj")));
      //     const prevObjData = storedData.previous(
      //       carouselItemAriaLabelMinusOne,
      //       storedData
      //     );
      //     assignValuesFromCachedDataToSliderElements(prevObjData);
      //     break;
      //   case "next":
      //     console.log(JSON.parse(window.localStorage.getItem("dataObj")));
      //     const nextObjData = storedData.next(
      //       carouselItemAriaLabelMinusOne,
      //       lengthOfSliderDataArrayMinusOne,
      //       storedData
      //     );
      //     assignValuesFromCachedDataToSliderElements(nextObjData);
      //     break;
      // }
      /** using local store **/
      switch (previousOrNextBtn) {
        case "previous":
          console.log(JSON.parse(window.localStorage.getItem("dataObj")));
          const prevObjData = prevSlide(
            carouselItemAriaLabelMinusOne,
            storeDataArrowBtn
          );
          assignValuesFromCachedDataToSliderElements(prevObjData);
          break;
        case "next":
          console.log(JSON.parse(window.localStorage.getItem("dataObj")));
          const nextObjData = nextSlide(
            carouselItemAriaLabelMinusOne,
            lengthOfSliderDataArrayMinusOne,
            storeDataArrowBtn
          );
          assignValuesFromCachedDataToSliderElements(nextObjData);
          break;
      }
    }
  }

  /** assign values to slider elements **/

  function assignValuesFromCachedDataToSliderElements(dataObj) {
    const copyOfData = { ...dataObj };
    // destructure our data
    const {
      ariaLabel: carouselItemAria,
      imgContainer: {
        sourceElementSrcset,
        imgInfo: { src: imgSrc, alt: imgAlt },
      },
      descriptionContent: { title, paragraph },
    } = copyOfData;
    // assign value to elements
    // carousel item
    const carouselItem = carouselItemElement;
    carouselItem.setAttribute("aria-label", carouselItemAria);
    const [imgContainer, descriptionContainer] = Array.prototype.slice.call(
      carouselItem.children
    );
    const [sourceElement, imgElement] = Array.prototype.slice.call(
      imgContainer.firstElementChild.children
    );
    // img container
    // source element
    sourceElement.setAttribute("srcset", sourceElementSrcset);
    // img element
    imgElement.setAttribute("src", imgSrc);
    imgElement.setAttribute("alt", imgAlt);
    // description content container
    const [h2Element, paragraphElement] = Array.prototype.slice.call(
      descriptionContainer.children
    );
    // h2
    h2Element.innerText = title;
    // p element
    paragraphElement.innerText = paragraph;
  }

  /** store our data in localStorage **/

  function nextSlide(valueOfAriaLabelMinusOne, lengthOfItemsMinusOne, dataObj) {
    // when user is at third slide, pressing next btn will take user to first slide at index 0 in array
    if (valueOfAriaLabelMinusOne == lengthOfItemsMinusOne) {
      dataObj.indexCounter = 0;
    } else {
      // add one
      dataObj.indexCounter = addOne(valueOfAriaLabelMinusOne);
    }
    localStorage.setItem("dataObj", JSON.stringify(dataObj));
    // console.log(JSON.parse(localStorage.getItem("dataObj")));
    return dataObj.sliderData[dataObj.indexCounter];
  }

  function prevSlide(valueOfAriaLabelMinusOne, dataObj) {
    console.log(dataObj.selectors.mobileModalElement);
    if (valueOfAriaLabelMinusOne == 0) {
      // when user is at first slide, pressing prev btn will take user to third slide at index 2 in array
      dataObj.indexCounter = 2;
    } else {
      // subtract one
      dataObj.indexCounter = subtractOne(valueOfAriaLabelMinusOne);
    }
    localStorage.setItem("dataObj", JSON.stringify(dataObj));
    // console.log(JSON.parse(localStorage.getItem("dataObj")));
    return dataObj.sliderData[dataObj.indexCounter];
  }

  // function usingLocalStorage(data) {
  //   window.localStorage.setItem("dataObj", JSON.stringify(data));
  // }
  function usingLocalStorage(element) {
    const data = {
      indexCounter: 0,
      sliderData: [
        {
          ariaLabel: "1 of 3",
          imgContainer: {
            sourceElementSrcset: "./images/desktop-image-hero-1.jpg",
            imgInfo: {
              src: "./images/mobile-image-hero-1.jpg",
              alt: "Two white chairs facing brown table with tree plant",
            },
          },
          descriptionContent: {
            title: "Discover innovative ways to decorate",
            paragraph:
              "We provide unmatched quality, comfort, and style for property owners across the country. Our experts combine form and function in bringing your vision to life. Create a room in your own style with our collection and make your property a reflection of you and what you love.",
          },
        },
        {
          ariaLabel: "2 of 3",
          imgContainer: {
            sourceElementSrcset: "./images/desktop-image-hero-2.jpg",
            imgInfo: {
              src: "./images/mobile-image-hero-2.jpg",
              alt: "Three chairs: one teal,one yellow, one white",
            },
          },
          descriptionContent: {
            title: "We are available all across the globe",
            paragraph:
              "With stores all over the world, it's easy for you to find furniture for your home or place of business. Locally, we’re in most major cities throughout the country. Find the branch nearest you using our store locator. Any questions? Don't hesitate to contact us today.",
          },
        },
        {
          ariaLabel: "3 of 3",
          imgContainer: {
            sourceElementSrcset: "./images/desktop-image-hero-3.jpg",
            imgInfo: {
              src: "./images/mobile-image-hero-3.jpg",
              alt: "Single black chair",
            },
          },
          descriptionContent: {
            title: "Manufactured with the best materials",
            paragraph:
              "Our modern furniture store provide a high level of quality. Our company has invested in advanced technology to ensure that every product is made as perfect and as consistent as possible. With three decades of experience in this industry, we understand what customers want for their home and office.",
          },
        },
      ],
      /** dont store funcs in local storage  **/
      // previous: function prevSlide(valueOfAriaLabelMinusOne) {
      //   if (valueOfAriaLabelMinusOne == 0) {
      //     // when user is at first slide, pressing prev btn will take user to third slide at index 2 in array
      //     this.indexCounter = 2;
      //   } else {
      //     // subtract one
      //     this.indexCounter = subtractOne(valueOfAriaLabelMinusOne);
      //   }
      //   return this.sliderData[this.indexCounter];
      // },
      // next: function nextSlide(
      //   valueOfAriaLabelMinusOne,
      //   lengthOfItemsMinusOne
      // ) {
      //   // when user is at third slide, pressing next btn will take user to first slide at index 0 in array
      //   if (valueOfAriaLabelMinusOne == lengthOfItemsMinusOne) {
      //     this.indexCounter = 0;
      //   } else {
      //     // add one
      //     this.indexCounter = addOne(valueOfAriaLabelMinusOne);
      //   }
      //   return this.sliderData[this.indexCounter];
      // },
      /** make previous and next func work with objs **/
      // previous: function prevSlide(valueOfAriaLabelMinusOne, dataObj) {
      //   if (valueOfAriaLabelMinusOne == 0) {
      //     // when user is at first slide, pressing prev btn will take user to third slide at index 2 in array
      //     dataObj.indexCounter = 2;
      //   } else {
      //     // subtract one
      //     dataObj.indexCounter = subtractOne(valueOfAriaLabelMinusOne);
      //   }
      //   return dataObj.sliderData[dataObj.indexCounter];
      // },
      // next: function nextSlide(
      //   valueOfAriaLabelMinusOne,
      //   lengthOfItemsMinusOne,
      //   dataObj
      // ) {
      //   // when user is at third slide, pressing next btn will take user to first slide at index 0 in array
      //   if (valueOfAriaLabelMinusOne == lengthOfItemsMinusOne) {
      //     dataObj.indexCounter = 0;
      //   } else {
      //     // add one
      //     dataObj.indexCounter = addOne(valueOfAriaLabelMinusOne);
      //   }
      //   return dataObj.sliderData[dataObj.indexCounter];
      // },
    };
    localStorage.setItem("dataObj", JSON.stringify(data));
  }

  /** using closure obj **/

  /** modal open/close **/

  // function openMobileModal(event) {
  //   if (event.target.closest("BUTTON")) {
  //     cachedData.selectors.mobileModalElement.setAttribute(
  //       "data-status",
  //       "true"
  //     );
  //   }
  // }

  // function closeMobileModal(event) {
  //   if (event.target.closest("BUTTON")) {
  //     cachedData.selectors.mobileModalElement.setAttribute(
  //       "data-status",
  //       "false"
  //     );
  //   }
  // }

  /** initial slide content **/

  // function initialCarouselItemContent(obj) {
  //   // will be first obj in slider data array
  //   const copyOfObj = { ...obj };
  //   assignValuesFromCachedDataToSliderElements(copyOfObj);
  // }

  /** slider button controls **/

  // function sliderImgControlFunc(event) {
  //   if (event.target.closest("BUTTON")) {
  //     // get length of sliderData array
  //     const lengthOfSliderDataArrayMinusOne = cachedData.sliderData.length - 1;
  //     // get carousel item aria-label and convert to number type
  //     const carouselItemAriaLabelMinusOne =
  //       Number(
  //         cachedData.selectors.carouselItemElement
  //           .getAttribute("aria-label")
  //           .split(" ")[0]
  //       ) - 1;
  //     // subtract one from item aria label to access the obj with our data in an array using index. array[index]
  //     // value of aria label will be 1,2 or 3 from "aria-label='1 of 3'"

  //     const [previousOrNextBtn] = event.target
  //       .closest("BUTTON")
  //       .getAttribute("aria-label")
  //       .split(" ");
  //     /** using our cachedData in closure func **/
  //     switch (previousOrNextBtn) {
  //       case "previous":
  //         console.log(JSON.parse(window.localStorage.getItem("dataObj")));
  //         const prevObjData = cachedData.previous(
  //           carouselItemAriaLabelMinusOne,
  //           cachedData
  //         );
  //         assignValuesFromCachedDataToSliderElements(prevObjData);
  //         break;
  //       case "next":
  //         console.log(JSON.parse(window.localStorage.getItem("dataObj")));
  //         const nextObjData = cachedData.next(
  //           carouselItemAriaLabelMinusOne,
  //           lengthOfSliderDataArrayMinusOne,
  //           cachedData
  //         );
  //         assignValuesFromCachedDataToSliderElements(nextObjData);
  //         break;
  //     }
  //     /** using local store **/
  //     switch (previousOrNextBtn) {
  //       case "previous":
  //         console.log(JSON.parse(window.localStorage.getItem("dataObj")));
  //         const prevObjData = cachedData.previous(
  //           carouselItemAriaLabelMinusOne,
  //           cachedData
  //         );
  //         assignValuesFromCachedDataToSliderElements(prevObjData);
  //         break;
  //       case "next":
  //         console.log(JSON.parse(window.localStorage.getItem("dataObj")));
  //         const nextObjData = cachedData.next(
  //           carouselItemAriaLabelMinusOne,
  //           lengthOfSliderDataArrayMinusOne,
  //           cachedData
  //         );
  //         assignValuesFromCachedDataToSliderElements(nextObjData);
  //         break;
  //     }
  //   }
  // }

  /** assign values to slider elements **/

  // function assignValuesFromCachedDataToSliderElements(dataObj) {
  //   const copyOfData = { ...dataObj };
  //   // destructure our data
  //   const {
  //     ariaLabel: carouselItemAria,
  //     imgContainer: {
  //       sourceElementSrcset,
  //       imgInfo: { src: imgSrc, alt: imgAlt },
  //     },
  //     descriptionContent: { title, paragraph },
  //   } = copyOfData;
  //   // assign value to elements
  //   // carousel item
  //   const carouselItem = cachedData.selectors.carouselItemElement;
  //   carouselItem.setAttribute("aria-label", carouselItemAria);
  //   const [imgContainer, descriptionContainer] = Array.prototype.slice.call(
  //     carouselItem.children
  //   );
  //   const [sourceElement, imgElement] = Array.prototype.slice.call(
  //     imgContainer.firstElementChild.children
  //   );
  //   // img container
  //   // source element
  //   sourceElement.setAttribute("srcset", sourceElementSrcset);
  //   // img element
  //   imgElement.setAttribute("src", imgSrc);
  //   imgElement.setAttribute("alt", imgAlt);
  //   // description content container
  //   const [h2Element, paragraphElement] = Array.prototype.slice.call(
  //     descriptionContainer.children
  //   );
  //   // h2
  //   h2Element.innerText = title;
  //   // p element
  //   paragraphElement.innerText = paragraph;
  // }

  // function scopeOurData() {
  //   const data = {
  //     indexCounter: 0,
  //     selectors: {
  //       mobileModalElement: document.querySelector(".mobile-nav-menu"),
  //       carouselItemElement: document.querySelector(".carousel-item"),
  //     },
  //     sliderData: [
  //       {
  //         ariaLabel: "1 of 3",
  //         imgContainer: {
  //           sourceElementSrcset: "./images/desktop-image-hero-1.jpg",
  //           imgInfo: {
  //             src: "./images/mobile-image-hero-1.jpg",
  //             alt: "Two white chairs facing brown table with tree plant",
  //           },
  //         },
  //         descriptionContent: {
  //           title: "Discover innovative ways to decorate",
  //           paragraph:
  //             "We provide unmatched quality, comfort, and style for property owners across the country. Our experts combine form and function in bringing your vision to life. Create a room in your own style with our collection and make your property a reflection of you and what you love.",
  //         },
  //       },
  //       {
  //         ariaLabel: "2 of 3",
  //         imgContainer: {
  //           sourceElementSrcset: "./images/desktop-image-hero-2.jpg",
  //           imgInfo: {
  //             src: "./images/mobile-image-hero-2.jpg",
  //             alt: "Three chairs: one teal,one yellow, one white",
  //           },
  //         },
  //         descriptionContent: {
  //           title: "We are available all across the globe",
  //           paragraph:
  //             "With stores all over the world, it's easy for you to find furniture for your home or place of business. Locally, we’re in most major cities throughout the country. Find the branch nearest you using our store locator. Any questions? Don't hesitate to contact us today.",
  //         },
  //       },
  //       {
  //         ariaLabel: "3 of 3",
  //         imgContainer: {
  //           sourceElementSrcset: "./images/desktop-image-hero-3.jpg",
  //           imgInfo: {
  //             src: "./images/mobile-image-hero-3.jpg",
  //             alt: "Single black chair",
  //           },
  //         },
  //         descriptionContent: {
  //           title: "Manufactured with the best materials",
  //           paragraph:
  //             "Our modern furniture store provide a high level of quality. Our company has invested in advanced technology to ensure that every product is made as perfect and as consistent as possible. With three decades of experience in this industry, we understand what customers want for their home and office.",
  //         },
  //       },
  //     ],
  //     // previous: function prevSlide(valueOfAriaLabelMinusOne) {
  //     //   if (valueOfAriaLabelMinusOne == 0) {
  //     //     // when user is at first slide, pressing prev btn will take user to third slide at index 2 in array
  //     //     this.indexCounter = 2;
  //     //   } else {
  //     //     // subtract one
  //     //     this.indexCounter = subtractOne(valueOfAriaLabelMinusOne);
  //     //   }
  //     //   return this.sliderData[this.indexCounter];
  //     // },
  //     // next: function nextSlide(
  //     //   valueOfAriaLabelMinusOne,
  //     //   lengthOfItemsMinusOne
  //     // ) {
  //     //   // when user is at third slide, pressing next btn will take user to first slide at index 0 in array
  //     //   if (valueOfAriaLabelMinusOne == lengthOfItemsMinusOne) {
  //     //     this.indexCounter = 0;
  //     //   } else {
  //     //     // add one
  //     //     this.indexCounter = addOne(valueOfAriaLabelMinusOne);
  //     //   }
  //     //   return this.sliderData[this.indexCounter];
  //     // },
  //     previous: function prevSlide(valueOfAriaLabelMinusOne, dataObj) {
  //       if (valueOfAriaLabelMinusOne == 0) {
  //         // when user is at first slide, pressing prev btn will take user to third slide at index 2 in array
  //         dataObj.indexCounter = 2;
  //       } else {
  //         // subtract one
  //         dataObj.indexCounter = subtractOne(valueOfAriaLabelMinusOne);
  //       }
  //       return dataObj.sliderData[dataObj.indexCounter];
  //     },
  //     next: function nextSlide(
  //       valueOfAriaLabelMinusOne,
  //       lengthOfItemsMinusOne,
  //       dataObj
  //     ) {
  //       // when user is at third slide, pressing next btn will take user to first slide at index 0 in array
  //       if (valueOfAriaLabelMinusOne == lengthOfItemsMinusOne) {
  //         dataObj.indexCounter = 0;
  //       } else {
  //         // add one
  //         dataObj.indexCounter = addOne(valueOfAriaLabelMinusOne);
  //       }
  //       return dataObj.sliderData[dataObj.indexCounter];
  //     },
  //     /** make previous and next func work with objs **/
  //   };
  //   return function closureOverOurData() {
  //     return data;
  //   };
  // }

  /** add one to indexCounter **/

  function addOne(indexValue) {
    return indexValue + 1;
  }

  /** subtract one from indexCounter **/

  function subtractOne(indexValue) {
    return indexValue - 1;
  }
})();
