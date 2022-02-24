(function scopeOurVariables() {
  // in order to get css style :focus to work with .focus() method
  // element's tabindex we want to apply focus style to needs to be "0"

  // mouse drag and drop

  mouseDragAndDrop();

  function mouseDragAndDrop(fn) {
    /**
     * best to add dragstart and dragend to li of button element of to do list
     * when we create the element and append to <ul>
     * if we want to add/remove event listeners on dragStart and dragEnd
     * we will need to cached the list of <li> elements on our cachedData obj
     * **/
    // identify which item is the target of dragstart
    // other items will have dragenter event add to them. they will be valid drop zones
    var dragSourceElement;
    Array.prototype.slice
      .call(document.querySelectorAll(".drop-zone ul li div[id]"))
      .forEach(function addDragStart(divItem) {
        divItem.addEventListener("dragstart", elementDragStart, false);
        // btnItem.addEventListener("click", elementDragStart);
      });

    Array.prototype.slice
      .call(document.querySelectorAll(".drop-zone ul li"))
      .forEach(function addDragEnd(listItem) {
        listItem.addEventListener("dragenter", elementDragEnter, false);
        listItem.addEventListener("drop", elementDragDrop, false);
        listItem.addEventListener("dragleave", elementDragLeave, false);
        listItem.addEventListener("dragover", elementDragOver, false);
      });

    function elementClickEvent(event) {}

    function elementDragStart(event) {
      event.stopPropagation();
      console.log("dragstart");

      dragSourceElement = event.target;

      // event.dataTransfer.effectAllowed = "copy";
      // event.dataTransfer.setData("text/plain", dragSourceElement);
    }

    function elementDragEnter(event) {
      event.target.classList.add("drag-over");
    }

    function elementDragLeave(event) {
      event.target.classList.remove("drag-over");
    }

    function elementDragOver(event) {
      event.preventDefault();
      event.stopPropagation();

      // console.log(dragSourceElement);
    }

    function elementDragDrop(event) {
      // update tabindex of sounce item parent and
      // drop zone item parent
      event.stopPropagation();
      console.log("hello");
      event.target.classList.remove("drag-over");
      console.log(event.target.parentElement);
      let parent = event.target.parentElement;
      while (parent.tagName != "LI") {
        parent = parent.parentElement;
      }
      // console.log(parent.firstElementChild);
      // let parent = event.target.closest("li");
      // source li
      // get parent of sourceElement
      // remove child of sourceElement parent element
      // append the child element of li. the child element will have the text, div with btns and btn element
      // drop zone li
      // parent variable will be the li of the drop zone element
      // drop zone elements could be any descendant of drop zone li
      const dropZoneItem = parent.firstElementChild; //div
      const dragItemParent = dragSourceElement.parentElement; //li
      console.log(dropZoneItem);
      console.log(parent);
      console.log(dragSourceElement);
      console.log(dragItemParent);
      dragItemParent.removeChild(dragSourceElement);
      dragItemParent.append(dropZoneItem);
      /**
       * drop zone
       * **/
      parent.append(dragSourceElement);
      // parent.remove(dropZoneItem);
      /**
       * original sounce of drag item
       * **/
      // remove source drag element

      // append drop zone div element(child of li element)

      // if (dragSourceElement !== event.target) {
      //   dragSourceElement.innerHTML = event.target.innerHTML;
      //   event.target.innerHTML = event.dataTransfer.getData("text/plain");
      // }
      // return false;
    }
  }

  keyboardDragAndDrop();

  function keyboardDragAndDrop() {
    /**
     * both mouse and keyboard work with data-index attr
     * **/
    // two funcs for arrowdown and arrowup
    // one to cycle through li element before selecting an item
    // moving focus will be the default functionality of keydown of ArrowDown and ArrowUp
    // but when user select an item the up and down arrow key will also
    // change position of selected item
    const [first, , , , last] = Array.prototype.slice.call(
      document.querySelectorAll(".drop-zone ul li")
    );
    console.log(first);
    console.log(last);
    // add keydown event
    document
      .querySelector(".drop-zone ul")
      .addEventListener("keydown", function accessibilityDragAndDrop(event) {
        switch (event.code) {
          case "ArrowDown":
            // get next sibling
            const nextSibling = document.activeElement.nextElementSibling;
            // check data-index of current focus element
            // check if its 5
            if (getDataIndexAttr(document.activeElement) == "4") {
              moveBottomItemToTopOfList(
                document.activeElement.parentElement,
                document.activeElement.parentElement.children
              );
              return;
            } else {
              // swap current listitem with nextSibling first child element
            }
            // focus next sibling element
            changeTabindexAndFocusElement(document.activeElement, nextSibling);

            break;
          case "ArrowUp":
            // get previous sibling
            const previousSibling =
              document.activeElement.previousElementSibling;
            // check data-index of current focus element
            // check if its 1
            if (getDataIndexAttr(document.activeElement) === "0") {
              moveTopItemToBottomOfList(
                document.activeElement.parentElement,
                document.activeElement.parentElement.children
              );
              return;
            } else {
              // sway current listitem with previous sibling first child element
            }
            // focus previous sibling element
            changeTabindexAndFocusElement(
              document.activeElement,
              previousSibling
            );

            break;
        }
      });

    // first.focus();
    // Array.prototype.slice
    //   .call(document.querySelectorAll(".drop-zone ul li div[id]"))
    //   .forEach(function addDragStart(divItem) {
    //     divItem.addEventListener("dragstart", elementDragStart, false);
    //     // btnItem.addEventListener("click", elementDragStart);
    //   });
  }

  function getDataIndexAttr(element) {
    return element.attributes["data-index"].value;
  }

  function changeTabindexAndFocusElement(currentElement, focusElement) {
    // current focus element. document.activeElement
    // change currentELement tabindex to "-1"
    currentElement.attributes["tabindex"].value = "-1";
    // change focusElement tabindex to "0"
    focusElement.attributes["tabindex"].value = "0";
    // change focus to focusElement
    focusElement.focus();
  }

  function moveTopItemToBottomOfList(unorderedList, listItems) {
    // length of unorderlist
    const lengthOfUnorderedList = unorderedList.children.length;

    const [firstItem, ...bottomOfListItems] =
      Array.prototype.slice.call(listItems);
    const reorderedListItems = [...bottomOfListItems, firstItem];
    // new list order with updated data-index
    const listItemsReordered =
      createChildrenForUnorderedListAndUpdateDataIndex(reorderedListItems);
    // append list items to unorderlist
    unorderedList.appendChild(listItemsReordered);
    unorderedList.children[lengthOfUnorderedList - 1].focus();
    // update data-index
    // reorderedListItems.forEach(function updateDataIndex(eachLi, index) {
    //   eachLi.attributes["data-index"].value = String(index);
    // });
  }

  function moveBottomItemToTopOfList(unorderedList, listItems) {
    const arrayOfItems = Array.from(listItems);
    const lengthOfArray = arrayOfItems.length;
    const lastItem = arrayOfItems[lengthOfArray - 1];
    const topOfListItems = arrayOfItems.slice(0, lengthOfArray - 1);
    const reorderedArray = [lastItem, ...topOfListItems];
    // append li to DocumentFrangment
    const newListOrder =
      createChildrenForUnorderedListAndUpdateDataIndex(reorderedArray);
    unorderedList.appendChild(newListOrder);
    unorderedList.children[0].focus();
    // update data-index
    // reorderedArray.forEach(function changeDataIndex(eachItem, index) {
    //   eachItem.attributes["data-index"].value = String(index);
    // });
  }

  function swapListItems(currentFocusElement, replacedElement) {}

  function createChildrenForUnorderedListAndUpdateDataIndex(list) {
    var fragment = new DocumentFragment();
    // append listitems to fragment;
    list.forEach(function appendItems(element, index) {
      fragment.appendChild(element);
      element.attributes["data-index"].value = String(index);
    });
    return fragment;
  }

  /**
   * cached our data
   * **/

  function scopeOurData() {
    const dataObj = {};

    return function closureOverCachedObj() {
      return dataObj;
    };
  }

  function notes() {
    // element with id list is an empty <ul>
    var list = document.querySelector("#list");
    var fruits = ["Apple", "Orange", "Banana", "Melon"];

    var fragment = new DocumentFragment();

    fruits.forEach(function (fruit) {
      var li = document.createElement("li");
      li.innerHTML = fruit;
      fragment.appendChild(li);
    });

    list.appendChild(fragment);
  }
})();
