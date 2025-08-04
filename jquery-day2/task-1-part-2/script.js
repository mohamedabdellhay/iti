$(function () {
  console.log("start task 1 part 2 day 2");
  const images = $(".image-btns img");
  let currentIndex = 0;
  images.click(function (e) {
    console.log(e.target);
    currentIndex = images.index(this);
    console.log(currentIndex);
    updateMainImage(e.target.src);
    $(".image-show").fadeIn();
  });

  $(".right").click(function () {
    console.log("right clicked");
    currentIndex = (currentIndex + 1) % images.length;
    console.log(currentIndex);

    updateMainImage(images.eq(currentIndex).attr("src"));
  });

  $(".left").click(function () {
    console.log("left clicked");
    currentIndex = (currentIndex - 1) % images.length;
    console.log(currentIndex);

    updateMainImage(images.eq(currentIndex).attr("src"));
  });
  $(".close").click(function () {
    $(".image-show").fadeOut();
  });

  function updateMainImage(src) {
    $(".main-image-show").prop("src", src);
  }
});
