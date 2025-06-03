const canvas = document.getElementById("canvas");
const dragElements = document.querySelectorAll(".draggable-element");
const form = document.getElementById("form-perperties");
let element = null;

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
      newElement.style.width = "150px";
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
    case "Video":
      newElement = document.createElement("video");
      newElement.src = "Add Video Link Here";
      newElement.controls = true;
      newElement.style.width = "200px";
      break;
  }
  newElement.style.position = "absolute";
  newElement.style.left = x + "px";
  newElement.style.top = y + "px";
  canvas.appendChild(newElement);
});
