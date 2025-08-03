$(function () {
  console.log("start dev using jQuery");

  $(".btn").click(function (index, element) {
    $(".btn").removeClass("highlight");
    $(this).addClass("highlight");
    $(".content").text($(this).data("content"));
  });
});
