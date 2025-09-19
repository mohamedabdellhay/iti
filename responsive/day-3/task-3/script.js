document.querySelector(".btn-mobile").addEventListener("click", function () {
  document.querySelector(".site-mobile-menu").classList.toggle("hidden");
});

document
  .querySelector(".site-mobile-menu-header")
  .addEventListener("click", function () {
    document.querySelector(".site-mobile-menu").classList.add("hidden");
  });
