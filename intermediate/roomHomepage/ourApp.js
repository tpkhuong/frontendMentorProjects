(function scopeOurVariables() {
  //   call our cached func
  const accessData = scopeOurData();
  const cachedData = accessData();

  // apply event listener
  function applyEventListener(element, eventListener, func) {
    element.addEventListener(eventListener, func);
    //   when we want to remove event from element
    return func;
  }

  function scopeOurData() {
    const data = {
      selectors: {
        bodyElement: document.querySelector("body"),
      },
      sliderData: [
        {
          ariaLabel: "1 of 3",
          imgContainer: {
            pictureSrcset: "./images/desktop-image-hero-1.jpg",
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
            pictureSrcset: "./images/desktop-image-hero-2.jpg",
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
            pictureSrcset: "./images/desktop-image-hero-3.jpg",
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
    };
    return function closureOverOurData() {
      return data;
    };
  }
})();
