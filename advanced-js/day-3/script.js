console.log("start task for day-3");
const productsApi = "https://fakestoreapi.com/products";
const productsUl = document.querySelector("ul");
const productsOptions = document.getElementById("products");
const productCard = document.getElementById("product-card");
const overLay = document.querySelector(".overlay");
console.log("ul", productsUl);

const loadDataButton = document.querySelector(".load-products");

const product = function (id, title) {
  return `
        <li>
            <div>
                <h3>${title}</h3>
                <button onclick="showProduct(${id})">Show More</button>
            </div>
        </li>
    `;
};
const productOption = function (title, id) {
  return `<option value="${title}" data-id="${id}" onclick="showProduct(${id})">${title}</option>`;
};

const renderProductCard = function (image, title, description, price, rating) {
  return `
     <img src="${image}" alt="${title}" height="400">

            <div class="product-info">
                <h2 class="product-title">${title}</h2>
                <p class="product-description">
                  ${description}
                </p>
                <p class="product-price">${price} $</p>
                <p class="product-rating">⭐ ${rating.rate} (${rating.count} reviews)</p>
            </div>
            <div class="close">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                    fill="#e3e3e3">
                    <path
                        d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
            </div>`;
};

document.addEventListener("DOMContentLoaded", function () {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", productsApi, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      let products = [];
      if (xhr.status === 200) {
        products = JSON.parse(xhr.responseText);
      } else {
        products = [{ response: 400, message: "Error while fetching data" }];
      }

      if (products[0]?.response === 400) {
        return;
      }

      let html = "";
      products.forEach((element) => {
        html += productOption(element.title, element.id);
      });
      productsOptions.insertAdjacentHTML("afterbegin", html);
    }
  };

  xhr.send();
});

document.addEventListener("click", function (event) {
  if (!event.target.closest(".close")) return;
  console.log("close clicked");
  productCard.classList.add("hidden");
  overLay.classList.add("hidden");
});

function showProduct(id) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `${productsApi}/${id}`, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      let product;
      if (xhr.status === 200) {
        product = JSON.parse(xhr.responseText);
      } else {
        product = [{ response: 400, message: "Error while fetching data" }];
      }

      if (product[0]?.response === 400) {
        productsUl.innerHTML = "";
        productsUl.insertAdjacentHTML(
          "afterbegin",
          `<p>${product[0].message}</p>`
        );
        return;
      }

      const productContent = renderProductCard(
        product.image,
        product.title,
        product.description,
        product.price,
        product.rating
      );
      console.log("product", productContent);
      productCard.innerHTML = "";
      productCard.insertAdjacentHTML("afterbegin", productContent);
      productCard.classList.remove("hidden");
      overLay.classList.remove("hidden");
    }
  };

  xhr.send();
}
