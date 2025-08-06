console.log("start task 2 from day 1 at advanced js");

document.querySelector("button").addEventListener("click", function () {
  console.log("clicked");
  const newWindow = window.open(
    "/window.html",
    "_blank",
    "width=500,height=600"
  );
  console.log("new window", newWindow);

  console.log("message in new window");
});
