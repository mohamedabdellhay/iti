$(function () {
  console.log("start dev using jQuery");

  $(".btn").click(function (index, element) {
    const $contents = $(".content-container > div");
    const buttonIndex = $(".btn").index(this);
    $(".btn").removeClass("highlight");

    console.log("btn index", buttonIndex);

    $(this).addClass("highlight");
    // $(".content-container > div").each(function (index, element) {
    //   $(element).addClass("hidden");
    //   if (index === buttonIndex) $(element).removeClass("hidden");
    // });

    // use fade in to
    $contents.stop(true, true).fadeOut(200, function () {
      $contents.addClass("hidden");
      $contents.eq(buttonIndex).removeClass("hidden").hide().fadeIn(400);
    });
  });
});
