// set loadedPosts as a global variable to allow all function to access it
let loadedPosts = 0;
$(async function () {
  console.log("start task 2 - day 2");

  const API = "https://jsonplaceholder.typicode.com/posts";
  const DATA = await $.get(API, function (data, status) {
    return data;
  });

  console.log("data", DATA);
  renderElements(DATA, 10);
  $(".load-more").click(function () {
    renderElements(DATA, 10);
    console.log(loadedPosts);
  });
});

// helper functions

// function to render single post
function singleElement(title, description) {
  return `<div class="post">
                <h2>${title}</h2>
                <p>${description}</p>
            </div>`;
}
// function to render posts
function renderElements(elements, count) {
  if (loadedPosts >= elements.length) {
    $(".load-more").prop("disabled", true);
    return;
  }
  loadedPosts += count;
  const data = elements
    .slice(0, loadedPosts)
    .map((ele) => singleElement(ele.title, ele.body));
  $(".posts").html(data);
  $(".posts-count").html(loadedPosts);
}
