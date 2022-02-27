(function scopeOurVariables() {
  const accessData = scopeOurData();
  const cachedData = accessData();

  // in order to get css style :focus to work with .focus() method
  // element's tabindex we want to apply focus style to needs to be "0"

  // mouse drag and drop
  mouseClick();
  mouseDragAndDrop();

  function mouseClick() {
    document
      .querySelector(".drop-zone ul")
      .addEventListener("click", function mouseAction(event) {
        const [previousFocusedElement] = Array.prototype.slice
          .call(event.target.closest("ul").children)
          .filter(function findElementWithTabIndexZero(listitem) {
            const elementTabindex = listitem.getAttribute("tabindex");
            return elementTabindex === "0";
          });
        if (cachedData.draggedItemSelected) {
          // previousFocusedElement will have tabindex "0" and drag-selected class
          previousFocusedElement.classList.remove("drag-selected");
          event.target.closest("li").classList.add("drag-selected");
        }
        // when user click on list item, we want to assign value "0" to that list item
        // and assign value of "-1" to the previous list item that had tabindex "0"
        previousFocusedElement.setAttribute("tabindex", "-1");
        event.target.closest("li").setAttribute("tabindex", "0");
        event.target.closest("li").focus();
      });
  }

  function mouseDragAndDrop(fn) {
    /**
     * best to add dragstart and dragend to li of button element of to do list
     * when we create the element and append to <ul>
     * if we want to add/remove event listeners on dragStart and dragEnd
     * we will need to cached the list of <li> elements on our cachedData obj
     * **/
    // identify which item is the target of dragstart
    // other items will have dragenter event add to them. they will be valid drop zones

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

      //another approach
      cachedData.dragSourceElement = event.target.parentElement;
      cachedData.grabbedItemDataIndex =
        event.target.parentElement.getAttribute("data-index");
      // we want to assign the value "0" to tabindex on the li that is
      // the parent of the event.target which is the dragged element
      /**
       * since mouse click will handle assigning the correct tabindex
       * we dont need to handle tabindex algorithm in dragstart event
       * **/
      // event.target.parentElement.setAttribute("tabindex", "0");
      // // then we want to make an array of listitems that is not the dragged element parent element
      // // we can loop through and assign "-1" to attr tabindex
      // // using reduce
      // // const assignValueNegativeOne = Array.prototype.slice
      // //   .call(event.target.closest("ul").children)
      // //   .reduce(function notDraggedElement(buildingUp, currentValue) {
      // //     if (currentValue != event.target.parentElement) {
      // //       buildingUp.push(currentValue);
      // //     }
      // //     return buildingUp;
      // //   }, []);
      // // using filter
      // // const assignValueNegativeOne = Array.prototype.slice.call(event.target.parentElement.parentElement.children)
      // const assignValueNegativeOne = Array.prototype.slice
      //   .call(event.target.closest("ul").children)
      //   .filter(function elementNotDraggedElement(item) {
      //     // we want to assign value -1 to listitem that is not the target of the drag event
      //     return item != event.target.parentElement;
      //   });
      // assignValueNegativeOne.forEach(function updateTabIndex(element) {
      //   element.setAttribute("tabindex", "-1");
      // });
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

      event.target.closest("li").classList.add("drag-over");
      // console.log(dragSourceElement);
    }

    function elementDragDrop(event) {
      event.stopPropagation();
      // listItems
      const arrayOfOriginalListItems = Array.prototype.slice.call(
        this.parentElement.children
      );
      const unorderedListElement = event.target.closest("li").parentElement;
      // length of listItems;
      const lengthOfListItems = arrayOfOriginalListItems.length;
      // grabbed element
      const grabbedListItem = cachedData.dragSourceElement;
      // dropped element
      const droppedListItem = event.target.closest("li");
      // update tabindex of sounce item parent and
      // drop zone item parent
      // convert data index to number
      const droppedItemDataIndex = event.target
        .closest("li")
        .getAttribute("data-index");
      event.target.closest("li").classList.remove("drag-over");
      // .closest above algorithm is more readable for modern browsers
      // console.log(grabbedListItem);
      const itemsAboveDroppedElement = itemsAboveDroppedAreaElement(
        arrayOfOriginalListItems,
        Number(droppedItemDataIndex)
      );
      const itemsBelowDroppedElement = itemsBelowDroppedAreaElement(
        arrayOfOriginalListItems,
        Number(droppedItemDataIndex)
      );
      // filter out grabbed element or original above/below array
      const updateListItemsAboveDropped = filterOutGrabbedListItem(
        itemsAboveDroppedElement,
        cachedData.grabbedItemDataIndex
      );
      const updateListItemsBelowDropped = filterOutGrabbedListItem(
        itemsBelowDroppedElement,
        cachedData.grabbedItemDataIndex
      );
      // dropped element data-index less then < grabbed data index, grabbed element goes above dropped element
      // createChildrenForUnorderedListAndUpdateDataIndex
      if (droppedItemDataIndex < cachedData.grabbedItemDataIndex) {
        const listitemsWithGrabbedAboveDropped = grabbedElementGoesAbove(
          updateListItemsAboveDropped,
          updateListItemsBelowDropped,
          grabbedListItem,
          droppedListItem
        );
        const updateGrabbedGoesAbove =
          createChildrenForUnorderedListAndUpdateDataIndex(
            listitemsWithGrabbedAboveDropped
          );
        // remove listitems and append new list
        removeUnorderedChildrenAppendNewList(
          unorderedListElement,
          updateGrabbedGoesAbove
        );
        // unorderedListElement.replaceChildren();
        // unorderedListElement.appendChild(updateGrabbedGoesAbove);
      } else {
        // dropped element data-index greater than > grabbed data index, grabbed element goes below dropped element
        const listitemsWithGrabbedBelowDropped = grabbedElementGoesBelow(
          updateListItemsAboveDropped,
          updateListItemsBelowDropped,
          grabbedListItem,
          droppedListItem
        );
        const updateGrabbedGoesBelow =
          createChildrenForUnorderedListAndUpdateDataIndex(
            listitemsWithGrabbedBelowDropped
          );
        // remove listitems and append new list
        removeUnorderedChildrenAppendNewList(
          unorderedListElement,
          updateGrabbedGoesBelow
        );
        // unorderedListElement.replaceChildren();
        // unorderedListElement.appendChild(updateGrabbedGoesBelow);
      }
      grabbedListItem.focus();
      // below algorithm to support IE prior to IE 15-18
      // var parent = null;
      // if (event.target.tagName == "LI") {
      //   event.target.classList.remove("drag-over");
      // } else {
      //   parent = event.target.parentElement;
      //   while (parent.tagName != "LI") {
      //     parent = parent.parentElement;
      //   }
      //   parent.classList.remove("drag-over");
      // }

      // console.log(event.target.parentElement);
      // let parent = event.target.parentElement;
      // while (parent.tagName != "LI") {
      //   parent = parent.parentElement;
      // }
      // console.log(parent);
      // console.log(parent.firstElementChild);
      // let parent = event.target.closest("li");
      // source li
      // get parent of sourceElement
      // remove child of sourceElement parent element
      // append the child element of li. the child element will have the text, div with btns and btn element
      // drop zone li
      // parent variable will be the li of the drop zone element
      // drop zone elements could be any descendant of drop zone li
      /**
       * another approach
       * **/

      /**
       * another approach
       * **/
      /**
       * worked
       * **/
      // const dropZoneItem = parent.firstElementChild; //div
      // const dragItemParent = dragSourceElement.parentElement; //li
      // console.log(dropZoneItem);
      // console.log(parent);
      // console.log(dragSourceElement);
      // console.log(dragItemParent);
      // dragItemParent.removeChild(dragSourceElement);
      // dragItemParent.append(dropZoneItem);
      /**
       * drop zone
       * **/
      // parent.append(dragSourceElement);
      /**
       * worked
       * **/
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

  // remove and append

  function removeUnorderedChildrenAppendNewList(parentElement, listItems) {
    parentElement.replaceChildren();
    parentElement.appendChild(listItems);
  }

  // grabbed goes above dropped

  function grabbedElementGoesAbove(
    itemsAbove,
    itemsBelow,
    grabbedElement,
    droppedElement
  ) {
    return [...itemsAbove, grabbedElement, droppedElement, ...itemsBelow];
  }

  // grabbed goes below dropped

  function grabbedElementGoesBelow(
    itemsAbove,
    itemsBelow,
    grabbedElement,
    droppedElement
  ) {
    return [...itemsAbove, droppedElement, grabbedElement, ...itemsBelow];
  }

  // filter out grabbed element

  function filterOutGrabbedListItem(array, dataIndex) {
    // filter method will eiter return an array without listitem that matches dataIndex
    // or original array;
    return array.filter(function removeListItem(listItem) {
      const elementDataIndex = listItem.getAttribute("data-index");
      return elementDataIndex != dataIndex;
    });
  }

  function itemsAboveDroppedAreaElement(array, droppedElementIndex) {
    //
    const copyOfArray = [...array];
    return copyOfArray.slice(0, droppedElementIndex);
  }

  function itemsBelowDroppedAreaElement(array, droppedElementIndex) {
    //
    const copyOfArray = [...array];
    return copyOfArray.slice(droppedElementIndex + 1);
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
    // const [first, , , , last] = Array.prototype.slice.call(
    //   document.querySelectorAll(".drop-zone ul li")
    // );
    // console.log(first);
    // console.log(last);
    // add keydown event
    document
      .querySelector(".drop-zone ul")
      .addEventListener("keydown", function accessibilityDragAndDrop(event) {
        if (document.activeElement.tagName == "LI") {
          switch (event.code) {
            case "Space":
            case "Enter":
              if (!cachedData.draggedItemSelected) {
                document.activeElement.classList.add("drag-selected");
                cachedData.draggedItemSelected = true;
              } else {
                document.activeElement.classList.remove("drag-selected");
                cachedData.draggedItemSelected = false;
              }
              break;
            case "ArrowDown":
              // get next sibling
              const nextSibling = document.activeElement.nextElementSibling;
              // check data-index of current focus element
              // check if its 5
              if (cachedData.draggedItemSelected) {
                if (getDataIndexAttr(document.activeElement) == "4") {
                  moveBottomItemToTopOfList(
                    document.activeElement.parentElement,
                    document.activeElement.parentElement.children
                  );
                  return;
                } else {
                  // swap current listitem with nextSibling first child element
                  swapListItemsChildElement(
                    document.activeElement,
                    nextSibling
                  );
                }
              }
              // focus next sibling element
              changeTabindexDraggedClassAndFocusElement(
                document.activeElement,
                nextSibling
              );

              break;
            case "ArrowUp":
              // get previous sibling
              const previousSibling =
                document.activeElement.previousElementSibling;
              // check data-index of current focus element
              // check if its 1
              if (cachedData.draggedItemSelected) {
                if (getDataIndexAttr(document.activeElement) === "0") {
                  moveTopItemToBottomOfList(
                    document.activeElement.parentElement,
                    document.activeElement.parentElement.children
                  );
                  return;
                } else {
                  // sway current listitem with previous sibling first child element
                  swapListItemsChildElement(
                    document.activeElement,
                    previousSibling
                  );
                }
              }
              // focus previous sibling element
              changeTabindexDraggedClassAndFocusElement(
                document.activeElement,
                previousSibling
              );

              break;
          }
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

  function changeTabindexDraggedClassAndFocusElement(
    currentElement,
    focusElement
  ) {
    if (cachedData.draggedItemSelected) {
      currentElement.classList.remove("drag-selected");
      focusElement.classList.add("drag-selected");
    }
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
    unorderedList.replaceChildren();
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
    unorderedList.replaceChildren();
    unorderedList.appendChild(newListOrder);
    unorderedList.children[0].focus();
    // update data-index
    // reorderedArray.forEach(function changeDataIndex(eachItem, index) {
    //   eachItem.attributes["data-index"].value = String(index);
    // });
  }

  function swapListItemsChildElement(currentFocusElement, replacedElement) {
    // get current list item child
    const currentListItemChild = currentFocusElement.firstElementChild;
    // get replaceElement item child
    const replaceElementItemChild = replacedElement.firstElementChild;
    // remove current list item child
    currentFocusElement.removeChild(currentListItemChild);
    // append replaceELement item child to current list item element
    currentFocusElement.append(replaceElementItemChild);
    // append current list item child to replaceElement list item element
    replacedElement.append(currentListItemChild);
  }

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
    const dataObj = {
      grabbedItemDataIndex: null,
      dragSourceElement: null,
      draggedItemSelected: false,
    };

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
