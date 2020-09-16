import Products from "./Products";
import Storage from "./Storage";
import "../public/cart/cart.css";

let itemButtons = [];
let containerCart = document.querySelector("#products");
let itemAmounts = [];

let cart = [];

class Ui {
  displayProducts(cart) {
    let result = `
      <h2>Shopping Cart</h2>
    `;
    let cnt = 0;
    let totalItems = cart.length;
    cart.forEach((item) => {
      let { id, title, description, price, image, amount } = item;
      title = title[0].toUpperCase() + title.slice(1);
      description = description[0].toUpperCase() + description.slice(1);
      result += `
      <div id="product" class="item">
                <div class="item__image">
                        <img class="image" src="${image}" />
                </div>
                <div class="item__content">
                  <div class="item__content_info">
                        <h4 id="title" class="title">${title}</h4>
                        <p >Cost aprox: <span class="price" id="price">${price}</span></p>
                        <p id="description" class="description">Thanks for<br /> cho-cho-choosing me!</p>
                  </div>
                  <div class="item__content_actions">
                    <button id="item_button" data-id=${id} name="decrement" >-1</button>
                    <span id="item_amount" data-id=${id}>${amount}</span>
                    <button id="item_button" data-id=${id} name="increment">+1</button>
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
    this.getButtons();
  }

  increment(e) {
    let itemCart = cart.find((item) => item.id === this.dataset.id);
    let itemAmount = itemAmounts.find(
      (item) => item.dataset.id === this.dataset.id
    );
    itemAmount.innerHTML = ++itemCart.amount;
    Storage.saveCart(
      cart.map((item) => (item.id === itemCart.id ? itemCart : item))
    );
  }

  decrement(e) {
    let itemCart = cart.find((item) => item.id === this.dataset.id);
    let itemAmount = itemAmounts.find(
      (item) => item.dataset.id === this.dataset.id
    );
    itemAmount.innerHTML = --itemCart.amount;
    Storage.saveCart(
      cart.map((item) => (item.id === itemCart.id ? itemCart : item))
    );
  }

  getButtons() {
    itemButtons = [...document.querySelectorAll("#item_button")];
    itemAmounts = [...document.querySelectorAll("#item_amount")];
    console.log(itemAmounts);
    itemButtons.forEach((item) => {
      if (item.name === "increment") {
        item.addEventListener("click", this.increment);
      } else {
        item.addEventListener("click", this.decrement);
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new Ui();
  const products = new Products();
  ui.setupApp();
});
