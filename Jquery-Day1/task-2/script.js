$(function () {
  console.log("start using jQuery");
  const parent = $(".inputs");

  $("#_add").click(function (e) {
    e.preventDefault();
    console.log("test click");
    let user = $("#name-input");

    const li = $(
      `<li><span>${user.val()}</span><button class='btn delete'>Delete</button></li>`
    );
    parent.append(li);
    user.val("");
  });

  $(document).click(function (e) {
    const deleteBtnClicked = Array.from(e.target.classList).includes("delete");

    if (!deleteBtnClicked) return;

    $(e.target.parentElement.remove()).remove();
  });
});
