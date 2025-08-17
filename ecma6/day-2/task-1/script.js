let textBtn = document.querySelector("input");
let htmlBtn = document.querySelectorAll("input")[1];
let jsonBtn = document.querySelectorAll("input")[2];
let jsonExBtn = document.querySelectorAll("input")[3];
let getALLbtn = document.querySelectorAll("input")[4];
let getByIDbtn = document.querySelectorAll("input")[5];
let getProductBtn = document.querySelectorAll("input")[6];
let postProductBtn = document.querySelectorAll("input")[7];
let targetDiv = document.querySelector("div.content-area");
const createProductBtn = document.querySelector(".create");
const updateBtn = document.querySelector(".update");
const productId = document.querySelector("input[name='id']");
const productName = document.querySelector("input[name='productName']");
const deletedProductId = document.querySelector(".deleted-product-id");
const deleteProductBtn = document.querySelector(".delete");
const ProductFormInputs = document.querySelector(".group-inputs");

// helper functions

// function to return full uri
const localURL = (path) => `http://localhost:5000/${path}`;

// function to render single row in table
const renderTableRow = function (tr) {
  const row = document.createElement("tr");
  for (td in tr) {
    const rowCell = document.createElement("td");
    rowCell.textContent = tr[td];
    row.appendChild(rowCell);
  }
  return row;
};

// function to render table body using renderTableRow function
const renderTable = function (data) {
  const table = document.createElement("table");
  console.log("is array from table", !Array.isArray(data));
  Array.isArray(data) && typeof data !== "string"
    ? data.map((ele) => table.appendChild(renderTableRow(ele)))
    : table.appendChild(renderTableRow(data));
  console.log(table);
  return table;
};

// function to fetch data from url and return promise object
const fetchData = async (path) => await fetch(path);

// function to check response type and decide which function should run
const checkResponseType = async function (path) {
  const response = await fetchData(path);
  const contentType = response.headers.get("content-type");
  console.log("content type ", contentType);
  if (contentType && contentType.includes("text/")) {
    console.log("Response is text-based.");
    return response.text(); // Process as text
  } else {
    return response.json(); // Process as JSON
  }
};

//  function to render data in target dev based on checkResponseType return value
const renderData = async function (path) {
  const data = await checkResponseType(path);
  console.log(data);
  targetDiv.innerHTML = "";
  if (typeof data == "string") {
    targetDiv.insertAdjacentHTML("afterbegin", data);
    return;
  }
  targetDiv.appendChild(renderTable(data));
};

const productService = async function (type, data = {}) {
  console.log("type", type);
  if (type === "post") {
    let response = await fetch(localURL("Products"), {
      method: type,
      body: JSON.stringify(data),
    });
    let product = await response.json();
    console.log(product);
    return;
  } else if (type === "put") {
    console.log("method", type);
    let product = await fetch(localURL(`Products/${data.id}`));
    const status = product.status;
    if (status === 200) {
      const updatedProduct = await fetch(localURL(`Products/${data.id}`), {
        method: type,
        body: JSON.stringify(data),
      });
      console.log("updated", updatedProduct);
      return;
    }
    console.log("product Not found", status);
  } else if (type === "delete") {
    const updatedProduct = await fetch(localURL(`Products/${data.id}`), {
      method: type,
    });
    console.log("deleted", updatedProduct);
  } else {
    console.log("unknown method type!");
  }
};
// productService("post", { productName: "mohamed abdellhay", cost: 500 });
textBtn.addEventListener("click", () => renderData("test.txt")); // end txt
htmlBtn.addEventListener("click", () => renderData("test.html")); // end html
jsonBtn.addEventListener("click", () => renderData("test.json")); // end json
getALLbtn.addEventListener("click", () => renderData(localURL("users")));
getByIDbtn.addEventListener("click", () => renderData(localURL("users/10")));
getProductBtn.addEventListener("click", () => renderData(localURL("Products")));
jsonExBtn.addEventListener("click", () =>
  renderData("https://jsonplaceholder.typicode.com/posts")
); //end external

createProductBtn.addEventListener("click", () => {
  const inputs = ProductFormInputs.querySelectorAll("*");
  console.log("inputs", inputs);

  productService("post", {
    productName: `${document.querySelector("#product_name").value}`,
    cost: 20,
  });
});

updateBtn.addEventListener("click", function (e) {
  console.log(e);
  const id = productId.value.trim();
  const updatedValue = document
    .querySelector("input[name='updatedProductName']")
    .value.trim();
  if (!updatedValue) return;
  console.log(id, productName.value.trim());
  productService("put", { id: id, productName: updatedValue });
});

deleteProductBtn.addEventListener("click", () =>
  productService("delete", { id: deletedProductId.value })
);

document.querySelector(".add-more").addEventListener("click", function () {
  let html = `<input type="text" placeholder="Enter Row of data" class="form-control product-data">`;
  ProductFormInputs.insertAdjacentHTML("beforeend", html);
});
