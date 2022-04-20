(function scopeOurVariables() {
  //   call our cached func
  const accessData = scopeOurData();
  const cachedData = accessData();

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

  /** modal open/close **/

  function openMobileModal(event) {
    if (event.target.closest("BUTTON")) {
      cachedData.selectors.mobileModalElement.setAttribute(
        "data-status",
        "true"
      );
    }
  }

  function closeMobileModal(event) {
    if (event.target.closest("BUTTON")) {
      cachedData.selectors.mobileModalElement.setAttribute(
        "data-status",
        "false"
      );
    }
  }

  /** slider button controls **/

  function sliderImgControlFunc(event) {
    if (event.target.closest("BUTTON")) {
      // get carousel item aria-label and convert to number type
      const carouselItemAriaLabel = Number(
        cachedData.selectors.carouselItemElement
          .getAttribute("aria-label")
          .split(" ")[0]
      );
      console.log(carouselItemAriaLabel);
      const [previousOrNextBtn] = event.target
        .closest("BUTTON")
        .getAttribute("aria-label")
        .split(" ");
      switch (previousOrNextBtn) {
        case "previous":
          console.log(cachedData[previousOrNextBtn]());
          break;
        case "next":
          console.log(cachedData[previousOrNextBtn]);
          break;
      }
    }
  }

  function scopeOurData() {
    const data = {
      indexCounter: 0,
      selectors: {
        mobileModalElement: document.querySelector(".mobile-nav-menu"),
        carouselItemElement: document.querySelector(".carousel-item"),
      },
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
      previous: function prevSlide() {
        console.log(this.sliderData);
      },
      next: function nextSlide() {
        console.log(this.sliderData);
      },
    };
    return function closureOverOurData() {
      return data;
    };
  }
})();
