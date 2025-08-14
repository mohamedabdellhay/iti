let textBtn = document.querySelector("input");
let htmlBtn = document.querySelectorAll("input")[1];
let jsonBtn = document.querySelectorAll("input")[2];
let jsonExBtn = document.querySelectorAll("input")[3];
let getALLbtn = document.querySelectorAll("input")[4];
let getByIDbtn = document.querySelectorAll("input")[5];
let getProductBtn = document.querySelectorAll("input")[6];
let postProductBtn = document.querySelectorAll("input")[7];
let targetDiv = document.querySelector("div");
const updateBtn = document.querySelector(".update");
const productId = document.querySelector("input[name='id']");
const productName = document.querySelector("input[name='productName']");
const deletedProductId = document.querySelector(".deleted-product-id");
const deleteProductBtn = document.querySelector(".delete");

// helper functions
const localURL = function (path) {
  return `http://localhost:5000/${path}`;
};

const renderTableRow = function (tr) {
  const row = document.createElement("tr");
  for (td in tr) {
    const rowCell = document.createElement("td");
    rowCell.textContent = tr[td];
    row.appendChild(rowCell);
  }
  return row;
};

const renderTable = function (data) {
  const table = document.createElement("table");
  console.log("is array from table", !Array.isArray(data));
  Array.isArray(data) && typeof data !== "string"
    ? data.map((ele) => table.appendChild(renderTableRow(ele)))
    : table.appendChild(renderTableRow(data));
  console.log(table);
  return table;
};

const fetchData = async function (path) {
  let res = await fetch(path);
  return res;
};

const checkResponseType = async function (path) {
  const response = await fetchData(path);
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("text/")) {
    console.log("Response is text-based.");
    return response.text(); // Process as text
  } else {
    return response.json(); // Process as JSON
  }
};

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

textBtn.addEventListener("click", () => renderData("test.txt")); // end txt
htmlBtn.addEventListener("click", () => renderData("test.html")); // end html
jsonBtn.addEventListener("click", () => renderData("test.json")); // end json
jsonExBtn.addEventListener("click", () =>
  renderData("https://jsonplaceholder.typicode.com/posts")
);
getALLbtn.addEventListener("click", () => renderData(localURL("users")));
getByIDbtn.addEventListener("click", () => renderData(localURL("users/10")));
getProductBtn.addEventListener("click", () => renderData(localURL("Products")));

postProductBtn.addEventListener("click", async () => {
  let obj = {
    productName: "product2",
    cost: 20,
  };
  let res = await fetch(localURL("Products"), {
    method: "post",
    body: JSON.stringify(obj),
  });
  let data = await res.json();
  console.log(data);
}); // end json

updateBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  const id = productId.value.trim();
  const pName = productName.value.trim();
  console.log(id, pName);
  let product = await fetch(localURL(`Products/${id}`));
  const status = await product.status;
  if (status === 200) {
    const obj = {
      id: id,
      productName: pName,
    };
    const updatedProduct = await fetch(localURL(`Products/${id}`), {
      method: "put",
      body: JSON.stringify(obj),
    });
    console.log("updated", updatedProduct);

    return;
  }
  console.log("product Not found", status);
});

async function deleteProduct(id) {
  const updatedProduct = await fetch(localURL(`Products/${id}`), {
    method: "delete",
  });
  console.log("deleted", updatedProduct);
}

deleteProductBtn.addEventListener("click", () =>
  deleteProduct(deletedProductId.value)
);
