(function scopeOurVariables() {
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

    event.dataTransfer.effectAllowed = "copy";
    event.dataTransfer.setData("text/plain", dragSourceElement);
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
    event.stopPropagation();
    console.log("hello");
    event.target.classList.remove("drag-over");
    console.log(event.target.parentElement);
    let parent = event.target.parentElement;
    while (parent.tagName != "LI") {
      parent = parent.parentElement;
    }
    console.log(parent.firstElementChild);
    // source li
    // get parent of sourceElement
    // remove child of sourceElement parent element
    // append the child element of li. the child element will have the text, div with btns and btn element
    // drop zone li
    // parent variable will be the li of the drop zone element
    // drop zone elements could be any descendant of drop zone li
    // if (dragSourceElement !== event.target) {
    //   dragSourceElement.innerHTML = event.target.innerHTML;
    //   event.target.innerHTML = event.dataTransfer.getData("text/plain");
    // }
    // return false;
  }

  function notes() {
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
