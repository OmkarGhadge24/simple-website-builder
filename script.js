const canvas = document.getElementById("canvas");
const dragElements = document.querySelectorAll(".draggable-element");
const form = document.getElementById("form-properties");
let element = null;
let selectedElement = null;

dragElements.forEach((item) => {
  item.addEventListener("dragstart", (e) => {
    element = e.target.lastElementChild.innerHTML;
  });
});

canvas.addEventListener("dragover", (e) => {
  e.preventDefault();
});

canvas.addEventListener("drop", (e) => {
  e.preventDefault();
  const x = e.offsetX;
  const y = e.offsetY;
  let newElement;
  switch (element) {
    case "Image":
      newElement = document.createElement("img");
      newElement.src = "Add Image Link Here";
      newElement.style.width = "200px";
      break;
    case "Button":
      newElement = document.createElement("button");
      newElement.innerText = "Click Me";
      break;
    case "Text":
      newElement = document.createElement("p");
      newElement.innerText = "Edit Text";
      newElement.contentEditable = true;
      break;
  }
  newElement.style.position = "absolute";
  newElement.style.left = x + "px";
  newElement.style.top = y + "px";
  canvas.appendChild(newElement);
});

function showFormProperties(elem) {
  form.innerHTML = "";
  let Name = elem.tagName;
  if (Name === "IMG" || Name === "BUTTON" || Name === "P") {
    form.innerHTML += `<div class="form-element" > <label class="form-label" >Top : </label><input class="form-input" name="top" type="text" value="${elem.style.top}" ></div>`;
    form.innerHTML += `<div class="form-element" > <label class="form-label" >Left : </label><input class="form-input" name="left" type="text" value="${elem.style.left}" ></div>`;
    form.innerHTML += `<div class="form-element" > <label class="form-label" >Width : </label><input class="form-input" name="width" type="text" value="${elem.style.width || elem.offsetWidth
      }" ></div>`;
    form.innerHTML += `<div class="form-element" > <label class="form-label" >Height : </label><input class="form-input" name="height" type="text" value="${elem.style.height || elem.offsetHeight
      }" ></div>`;
  }
  if (Name === "IMG") {
    form.innerHTML += `<div class="form-element" > <label class="form-label" >Source : </label><input class="form-input" name="src" type="text" value="${elem.src}" ></div>`;
  }
  if (Name === "BUTTON" || Name === "P") {
    form.innerHTML += `<div class="form-element" > <label class="form-label" >Text : </label><input class="form-input" name="text" type="text" value="${elem.innerText}" ></div>`;
  }
}

canvas.addEventListener("click", (e) => {
  if (e.target !== canvas) {
    selectedElement = e.target;
    showFormProperties(selectedElement);
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Delete" && selectedElement) {
    selectedElement.remove();
    form.innerHTML = "";
    selectedElement = null;
  }
});

form.addEventListener("input", (e) => {
  const label = e.target.name.trim();
  const value = e.target.value;

  if (!selectedElement) return;

  switch (label) {
    case "top":
      selectedElement.style.top = value;
      break;
    case "left":
      selectedElement.style.left = value;
      break;
    case "width":
      selectedElement.style.width = value;
      break;
    case "height":
      selectedElement.style.height = value;
      break;
    case "src":
      selectedElement.src = value;
      break;
    case "text":
      selectedElement.innerText = value;
      break;
  }
});
