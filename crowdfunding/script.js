// const userAvatar = document.querySelector(".avatar>div");
// console.log(userAvatar);
document.addEventListener("click", function (event) {
  const userAvatar = event.target.closest(".avatar");
  if (userAvatar) {
    document.querySelector(".avatar>.user-actions").classList.toggle("hidden");
  } else {
    document.querySelector(".avatar>.user-actions").classList.add("hidden");
  }
});
const href = window.location.href
  .split("/")
  .filter((ele) => ele.trim())
  .at(-1);

console.log("href", href);

document.querySelector(`header a[href='./']`).classList.add("active");
