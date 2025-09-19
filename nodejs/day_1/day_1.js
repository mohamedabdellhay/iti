// task3
import fs from "fs";

//1
console.log("Start");

fs.readFile(__filename, () => {
  console.log("File Read Complete"); //4
  setTimeout(() => console.log("Timeout inside I/O"), 0); //8
  setImmediate(() => console.log("Immediate inside I/O")); //6
  process.nextTick(() => console.log("Next Tick inside I/O")); //5
});

setTimeout(() => console.log("Timeout 1"), 0); //7
setImmediate(() => console.log("Immediate 1")); //3

//2
console.log("End");
