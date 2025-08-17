// application state
const state = {
  posts: [],
  currentPage: 0,
  pagesCount: null,
  postsPerPage: 10,
  search: {
    value: null,
    data: [],
  },
};

// dom selection
const tableBody = document.querySelector(".posts>table>tbody");
const pagesButtonsContainer = document.querySelector(".pagination>.pages");
const selectPageCounter = document.querySelector(".pagination>select");
const pageStatus = document.querySelector(".page-status>span");
const searchBox = document.querySelector(".search > input");

console.log("select", selectPageCounter);

selectPageCounter.addEventListener("input", function (event) {
  console.log("event", Number(event.target.value));
  state.postsPerPage = Number(event.target.value);
  renderPage(state.postsPerPage, state.currentPage);
});

// helpers
const URI = "http://localhost:5000/posts";

// function to render state object
const fetchData = async function () {
  try {
    const response = await fetch(URI);
    //   console.log("response", response);
    const data = await response.json();
    //   console.log("data", data);
    state.posts.push(...data);
    state.pagesCount = Math.ceil(data.length / state.postsPerPage);
    console.log(state);
    return true;
  } catch (error) {
    console.log("error ######:", error);
    return false;
  }
};

// function to create table row
const createTableRow = (tr) =>
  `<tr><td>${tr.id}</td><td>${tr.title}</td><td>${tr.body}</td></tr>`;

// function to render page button
const createPageBtn = (btn, active) =>
  `<button class='${active ? "active page" : "page"}' data-page=${
    btn - 1
  }>${btn}</button>`;

// render pagination container
const createPaginationContainer = function (length, page) {
  // console.log("length", length);
  const content = [...Array(length)]
    .map((_, i) => i)
    .map((ele) => createPageBtn(ele + 1, page === ele))
    .join("");
  pagesButtonsContainer.innerHTML = "";
  pagesButtonsContainer.insertAdjacentHTML("afterbegin", content);
};

// render table body
const renderTableBody = (posts, startIndex, endIndex) => {
  // const startIndex = countPerPage * page;
  // const endIndex = (page + 1) * 10;
  const data = posts.slice(startIndex, endIndex);
  const pageContent = data.map((ele) => createTableRow(ele)).join("");
  tableBody.innerHTML = "";
  tableBody.insertAdjacentHTML("afterbegin", pageContent);
};
const renderPageStatus = function (show, hidden) {
  pageStatus.innerHTML = `Shown ${show} From ${hidden}`;
};
// function to render Table
const renderPage = function (countPerPage, page) {
  state.currentPage = page;
  const posts = state.search.value ? state.search.data : state.posts;
  state.pagesCount = Math.ceil(posts.length / state.postsPerPage);
  renderTableBody(posts, countPerPage * page, (page + 1) * state.postsPerPage);
  createPaginationContainer(state.pagesCount, page);
  const postsShowingLength = (state.currentPage + 1) * state.postsPerPage;
  const showing =
    postsShowingLength > posts.length ? posts.length : postsShowingLength;

  const end = state.posts.length;
  renderPageStatus(showing, end);
};

// listen for click on a page
window.addEventListener("click", function (event) {
  if (!event.target.closest(".page")) return;
  console.log(event.target.dataset.page);
  renderPage(state.postsPerPage, Number(event.target.dataset.page));
});

// implement search function
console.log(searchBox);

searchBox.addEventListener("input", function (event) {
  setTimeout(() => {
    const searchKeyWord = event.target.value.trim();
    if (!searchKeyWord) {
      renderPage(state.postsPerPage, state.currentPage);
      state.search.value = null;
      return;
    }

    state.search.value = searchKeyWord;
    // console.log(state);
    const filteredPosts = state.posts.filter((ele) =>
      ele.title.includes(searchKeyWord)
    );
    // console.log(filteredPosts);

    state.search.data = filteredPosts;
    // console.log("state", state);
    renderPage(state.postsPerPage, state.currentPage);
  }, 500);
}) -
  (async function () {
    await fetchData();
    renderPage(state.postsPerPage, 0);
    console.dir(state);
  })();

console.log("table body", tableBody);
console.log("pages", pagesButtonsContainer);
