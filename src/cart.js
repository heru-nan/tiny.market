import Products from "./Products";
import Storage from "./Storage";

let containerCart = document.querySelector("#products");

let cart = [];

class Ui {
  displayProducts(cart) {
    let result = `
      <h2>Shopping Cart</h2>
    `;
    let cnt = 0;
    let totalItems = cart.length;
    cart.forEach((item) => {
      let { id, title, description, price, image } = item;
      title = title[0].toUpperCase() + title.slice(1);
      description = description[0].toUpperCase() + description.slice(1);
      result += `
      <div id="product" class="item">
                <div class="item__image">
                        <img class="image" src="${image}" />
                </div>
                <div class="item__content">
                  <div class="info">
                        <h4 id="title" class="title">${title}</h4>
                        <p >Cost aprox: <span class="price" id="price">${price}</span></p>
                        <p id="description" class="description">Thanks for<br /> cho-cho-choosing me!</p>
                  </div>
                  <div class="actions">
                    <button>Delete</button>
                    <button>Save for later</button>
                  </div>
                </div>  
      </div>
      `;
      // if (++cnt < totalItems) result += `<div class="bar"></div>`;
    });
    containerCart.innerHTML = result;
  }
  setupApp() {
    cart = Storage.getCart();
    this.displayProducts(cart);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new Ui();
  const products = new Products();
  ui.setupApp();
});
