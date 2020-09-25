import Products from "./Products";
import Storage from "./Storage";
import "../../public/cart/cart.css";
import "../../public/cart/styles.css";

let itemButtons = [];
let deleteButtons = [];
let itemAmounts = [];

let containerCart = document.querySelector("#products");
let subtotalDOM = document.querySelector("#subtotal");
let gastosDOM = document.querySelector("#extra_gastos");
let totalDOM = document.querySelector("#total");
let products = document.querySelector("#products");
let cart = [];

class Ui {
  displayProducts(cart) {
    let result = `
      <h2>Shopping Cart</h2>
    `;
    let cnt = 0;
    let totalItems = cart.length;
    cart.forEach((item) => {
      let { id, name, description, price, image, amount } = item;
      name = name[0].toUpperCase() + name.slice(1);
      description = description[0].toUpperCase() + description.slice(1);
      result += `
      <div id=${id} class="item">
                <div class="item__image">

                        <img class="image" src="${image}"  />
                </div>
                <div class="item__content">

                  <div class="item__content_info">
                        <h4 id="name" class="name">${name}</h4>
                        <p id="description" class="description">Thanks for<br /> cho-cho-choosing me!</p>
                  </div>
                <span class="price" id="price">$${price}</span>

                  <button id="item_button_delete" class="delete_button" data-id=${id}>delete</button>
                  <div class="item__content_actions">
                    <button id="item_button" data-id=${id} name="decrement" >-1</button>
                    <span id="item_amount" class="amount" data-id=${id}>${amount}</span>
                    <button id="item_button" data-id=${id} name="increment">+1</button>
                  </div>
                </div>
      </div>
      `;
      // if (++cnt < totalItems) result += `<div class="bar"></div>`;
    });
    containerCart.innerHTML = result;
  }

  static displayResumen(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;

    cart.map((item) => {
      tempTotal += item.price * item.amount;
      itemsTotal += item.amount;
    });

    let gastos = tempTotal ? 3 : 0;
    let total = tempTotal + gastos; // ****
    subtotalDOM.innerHTML = "$ " + parseFloat(tempTotal.toFixed(2));
    gastosDOM.innerHTML = "$ " + gastos;
    totalDOM.innerHTML = "$ " + parseFloat(total.toFixed(2));
  }

  setupApp() {
    cart = Storage.getCart();
    this.displayProducts(cart);
    this.getButtons();

    Ui.displayResumen(cart);
  }

  increment() {
    let id = this.dataset.id;
    let itemCart = cart.find((item) => item.id === id);
    let itemAmount = itemAmounts.find((item) => item.dataset.id === id);
    itemAmount.innerHTML = ++itemCart.amount;
    Storage.saveCart(
      cart.map((item) => (item.id === itemCart.id ? itemCart : item))
    );

    Ui.displayResumen(cart);
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

    Ui.displayResumen(cart);
  }

  delete(e) {
    let { id } = this.dataset;
    let itemCart = Storage.getProduct(id);

    if (confirm(`_____confirm delete: ${itemCart.name}`)) {
      let newCart = cart.filter((item) => item.id != id);

      Storage.saveCart(newCart);
      if (!products) console.log("products not defined");
      products.querySelector(`#${id}`).remove();
      console.log(products);
      cart = newCart;
    } else {
      console.log("not delete");
    }

    Ui.displayResumen(cart);
  }

  getButtons() {
    deleteButtons = [...document.querySelectorAll("#item_button_delete")];
    itemButtons = [...document.querySelectorAll("#item_button")];
    itemAmounts = [...document.querySelectorAll("#item_amount")];
    deleteButtons.forEach((item) => {
      item.addEventListener("click", this.delete);
    });
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
