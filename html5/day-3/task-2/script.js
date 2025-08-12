const labels = document.querySelectorAll(".label");
const boxes = document.querySelectorAll(".box");

let draggedItem = null;

labels.forEach((label) => {
  console.log("label", label);

  label.addEventListener("dragstart", (e) => {
    draggedItem = label;
    console.log("dragged item", draggedItem);

    setTimeout(() => (label.style.display = "none"), 0);
  });

  label.addEventListener("dragend", (e) => {
    draggedItem.style.display = "block";
    draggedItem = null;
  });
});

boxes.forEach((box) => {
  box.addEventListener("dragover", (e) => {
    e.preventDefault(); // allow drop
  });

  box.addEventListener("drop", (e) => {
    console.log(draggedItem);

    if (draggedItem) {
      box.appendChild(draggedItem);
    }
  });
});
