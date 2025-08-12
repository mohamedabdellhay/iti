const mohamed = document.getElementById("write-mohamed");
const width = 400;
const height = 400;
mohamed.width = width;
mohamed.height = height;
const myCtx = mohamed.getContext("2d");
console.log("myCtx", myCtx);

myCtx.beginPath();
myCtx.moveTo(40, 280);
myCtx.lineTo(80, 280);
myCtx.lineTo(80, 180);
myCtx.lineTo(120, 242);
myCtx.lineTo(160, 180);
myCtx.lineTo(160, 280);
myCtx.lineTo(200, 280);
myCtx.lineTo(200, 140);
myCtx.lineTo(160, 140);
myCtx.lineTo(120, 190);
myCtx.lineTo(80, 140);
myCtx.lineTo(40, 140);
myCtx.lineTo(40, 280);

myCtx.lineWidth = 5;
myCtx.strokeStyle = "red";
myCtx.lineCap = "round";

myCtx.stroke();
