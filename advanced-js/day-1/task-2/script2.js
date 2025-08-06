console.log("start script 2 ");
const p = document.querySelector("p");
let message =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus ratione beatae nihil expedita, accusantium eum porro dolore totam, tenetur, dolor rerum corporis nam officiis neque optio necessitatibus eveniet repellendus. Reiciendis?";

let i = 0;
const delay = 50;
const messageLength = message.length;

const initInterval = setInterval(() => {
  i < messageLength
    ? (p.textContent += message.charAt(i++))
    : clearInterval(initInterval);
}, 50);

// initInterval();

const windowWillBeClosedAfter = delay * messageLength + 1000;
document
  .querySelector(".timer")
  .insertAdjacentHTML(
    "afterbegin",
    `Window Will be closed after (${Math.round(
      windowWillBeClosedAfter / 1000
    )}) Seconds`
  );
setTimeout(() => window.close(), windowWillBeClosedAfter);
