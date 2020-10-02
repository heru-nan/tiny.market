// imports
import "../../public/home/styles.css";
import "../../public/home/cardModal.css";
import "../../public/home/card.css";
import "../../public/home/pbutton.css";
import Storage from "./Storage";
import Products from "./Products";
// variables
let containerProducts = document.querySelector("#products");
let cartItems = document.querySelector("#span_items");
let modal = document.querySelector("#modal");
let containerModal = document.querySelector("#modal_container");
let actionsButtons = document.querySelector("#actions");
let buttonsDOM = [];

modal.onclick = function (e) {
  console.log(e.target.id);
  if (e.target.id === "modal" || e.target.id === "close_modal")
    modal.classList.remove("open");
};

containerModal.onclick = function () {};

// cart
let cart = [];

// class display products
class UI {
  displayProducts(products) {
    let result = "";
    let { items } = products;
    items.forEach((product) => {
      let { id, name, description, price, image } = product;
      name = name[0].toUpperCase() + name.slice(1);
      description = description[0].toUpperCase() + description.slice(1);
      result += `
      <div id="${id}" class="card">
                <h4 id="name" class="name">${name}</h4>
                <p id="description"class="description">${description}</p>
                <div>
                    <p class="card_price">Ship Cost: $<span id="price">${price}</span></p><button id="product_button" data-id=${id} class="inCart button1">Add</button>                
                </div>
                <img class="image zoom inCart" id="product_button" data-id=${id} src="${image}" />
      </div>
      `;
    });
    containerProducts.innerHTML = result;
  }

  getButtons() {
    const buttons = [...document.querySelectorAll("#product_button")];
    buttonsDOM = buttons;
    buttons.forEach((button) => {
      let { id } = button.dataset;
      let inCart = cart.find((item) => item.id === id);

      if (inCart) {
        button.innerText = "In Cart";
        button.disabled = true;
      } else {
        button.addEventListener("click", (event) => {
          event.target.innerText = "In Cart";
          event.target.disabled = true;

          let cartItem = { ...Storage.getProduct(id), amount: 1 };

          cart = [...cart, cartItem];

          Storage.saveCart(cart);
          // set cart values
          let cartValues = this.setCartValue(cart);
          this.showProduct(cartItem, cartValues);
        });
      }
    });
  }
  setCartValue(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;
    cart.map((item) => {
      tempTotal += item.price * item.amount;
      itemsTotal += item.amount;
    });
    //
    return { itemsTotal, tempTotal };
  }
  showProduct(product, cartValues) {
    let { itemsTotal, tempTotal } = cartValues;
    containerModal.innerHTML = `
    <h4>Product Added To Cart</h4>
    <div>
    <p>${product.name[0].toUpperCase() + product.name.slice(1)}</p>
    <img src="${product.image}">
    <p>Thank for cho cho chosing me!</p>
    <div>
    <p id="price" class="price">Subtotal(<span >${itemsTotal} kittys</span>): <span class="subtotal">$${parseFloat(
      tempTotal.toFixed(2)
    )}<span></p>
    <div id="actions">
    <a href="#" class="button1" id="close_modal">
    Shopping
    </a>
    <a href="/shopcart" class="button1">Go Cart</a>
    </div>
  `;

    cartItems.innerHTML = itemsTotal;
    modal.classList.add("open");
  }
  setupApp() {
    cart = Storage.getCart();
    let values = this.setCartValue(cart);
    cartItems.innerHTML = values.itemsTotal;
  }
}

// local storage class

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();
  ui.setupApp();
  products
    .getProducts()
    .then((data) => {
      ui.displayProducts(data);
      Storage.saveProducts(data);
    })
    .then(() => {
      ui.getButtons();
    });
});
