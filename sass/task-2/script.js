document.addEventListener("click", function (event) {
  const headerMenuButton = event.target.closest(".header_menu");
  const searchBtn = event.target.closest(".search");
  if (headerMenuButton) {
    document.querySelector(".header_menu").classList.toggle("close");
    console.log(document.querySelector(".mobile-menu"));
    document.querySelector(".mobile-menu").classList.toggle("hidden");
  }
  if (searchBtn) {
    document.querySelector(".search input").classList.toggle("hidden");
  }
});
