// // const canvas = document.querySelector("canvas");
// // console.dir(canvas);

// // let ctx = canvas.getContext("2d");
// // // console.log("ctx", ctx);
// // // ctx.fillStyle = "#eee";
// // // ctx.fillRect(100, 50, 300, 300);

// // // ctx.strokeStyle = "#46f";
// // // ctx.lineWidth = 3;
// // // ctx.strokeRect(100, 50, 300, 300);
// // ctx.fillStyle = "#f00";
// // ctx.fillRect(0, 0, 500, 200);
// // ctx.fillStyle = "#fff";
// // ctx.fillRect(0, 200, 500, 200);
// // ctx.fillStyle = "#000";
// // ctx.fillRect(0, 400, 500, 200);

// const mohamed = document.getElementById("write-mohamed");
// console.log(mohamed);

// console.log("m", mohamed);

// const myCtx = mohamed.getContext("2d");
// console.log("myCtx", myCtx);

// myCtx.font = "30px Arial";
// myCtx.fillStyle = "#000";
// myCtx.fillText("Hello Canvas", 0, 0);
// myCtx.strokeStyle = "orange";
// myCtx.strokeText("Outline Text", 50, 320);

const mohamed = document.getElementById("write-mohamed");

// if (!mohamed) {
//   console.error("Canvas element with ID 'write-mohamed' not found.");
// } else if (!(mohamed instanceof HTMLCanvasElement)) {
//   console.error("Element with ID 'write-mohamed' is not a canvas.");
// } else {
//   console.log("mohamed", mohamed);

// Set canvas size if not defined
mohamed.width = mohamed.width || 400;
mohamed.height = mohamed.height || 400;

const myCtx = mohamed.getContext("2d");
console.log("myCtx", myCtx);

myCtx.font = "30px Arial";
myCtx.fillStyle = "#f00";
myCtx.fillText("Mohamed", 0, 30); // Adjusted y-coordinate
myCtx.strokeStyle = "orange";
myCtx.strokeText("Outline Text", 50, 320);

// }
