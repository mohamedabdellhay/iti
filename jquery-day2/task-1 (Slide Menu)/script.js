$(function () {
  console.log("start task 1 using jquery");
  $(".nav").hover(
    function () {
      $(".nav>ul").fadeIn();
    },
    function () {
      $(".nav>ul").fadeOut();
    }
  );

  // image slider
  let currentIndex = 0;
  const $images = $(".image-slider img");
  const $modal = $("#image-modal");
  const $modalImg = $("#modal-img");

  function showModal(index) {
    currentIndex = index;
    $modalImg.attr("src", $images.eq(index).attr("src"));
    $modal.show();
  }

  $images.on("click", function () {
    showModal($images.index(this));
  });

  $(".close, #image-modal").on("click", function (e) {
    if (e.target === this) $modal.hide();
  });

  $(".arrow.left").on("click", function (e) {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + $images.length) % $images.length;
    showModal(currentIndex);
  });

  $(".arrow.right").on("click", function (e) {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % $images.length;
    showModal(currentIndex);
  });

  // Prevent modal image click from closing modal
  $modalImg.on("click", function (e) {
    e.stopPropagation();
  });
});
