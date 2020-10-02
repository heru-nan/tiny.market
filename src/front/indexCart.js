import Products from "./Products";
import Storage from "./Storage";
import "./public/cart/cart.css";
import "./public/cart/styles.css";
import "./public/cart/modal.css";
import "./public/cart/pbutton.css";

let itemButtons = [];
let deleteButtons = [];
let itemAmounts = [];

let containerCart = document.querySelector("#products");
let subtotalDOM = document.querySelector("#subtotal");
let gastosDOM = document.querySelector("#extra_gastos");
let totalDOM = document.querySelector("#total");
let products = document.querySelector("#products");
let modal = document.querySelector("#modal");
let lastModal = document.querySelector("#lastModal");
let payButton = document.querySelector("#pay");
let cart = [];

document.querySelector("#nav_title").addEventListener("click", () => {
  location.href = "/";
});

class Ui {
  displayProducts(cart) {
    let result = `
    <div class="header" id ="header">
      <h2>Shopping Cart</h2>
      <button id="clean_cart" class="clean_button button1">Clean Cart</button>
      </div>
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
                  <div class="item__content_actions">
                  <div>
                    <button class="item_button button1" id="item_button" data-id=${id} name="decrement" >-1</button>
                    <span id="item_amount" class="amount" data-id=${id}>${amount}</span>
                    <button class="item_button button1" id="item_button" data-id=${id} name="increment">+1</button>
                    </div>
                    <button id="item_button_delete" class="delete_button button1" data-id=${id}>delete</button>
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
      cart = newCart;
    } else {
      console.log("not delete");
    }

    Ui.displayResumen(cart);
  }

  clean(flag = false) {
    if (flag) location.reload();
    localStorage.removeItem("cart");
  }

  showModal() {
    modal.classList.add("open");
  }

  closeModal() {
    modal.classList.remove("open");
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

    document.querySelector("#clean_cart").addEventListener("click", () => {
      if (confirm(`_____confirm clean cart`)) this.clean(true);
    });

    payButton.addEventListener("click", this.showModal);

    modal.addEventListener("click", (e) => {
      if (e.target.id === "modal") {
        this.closeModal();
      }
    });

    let form = document.querySelector("form");
    form.addEventListener("submit", async (e) => {
      let url = e.preventDefault();
      let { fname, lname, city, street, number } = form.elements;
      let formObj = {
        fname: fname.value,
        lname: lname.value,
        city: city.value,
        street: street.value,
        number: number.value,
        cart,
      };
      let res = await Products.submitPay(formObj);
      if (res.ok) {
        // show success transaction
        this.closeModal();
        setTimeout(() => {
          let x = (lastModal.querySelector("#link").href = res.link);
          lastModal.classList.add("open");
          console.log("1");
        }, 1000);
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new Ui();
  // const products = new Products();
  ui.setupApp();
});
