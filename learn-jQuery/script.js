console.log("start learn jquery");

// $() => jQuery Object
const _ = jQuery;
// console.log(_(document));
// console.log(_);

_(document).ready(function () {
  _(".btn-hide-p").click(() => {
    console.log("hide p");
    _("p").toggle();
  });
  $("*").css("color", "red");
});

const p = _("p");
console.log("p element", p);
