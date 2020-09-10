// import Market from "../utils/service.products";
// import Cart from "../utils/cart.logic";
import { data } from "../../public/data/data";

export function indexPage(cart) {
  render(data, cart);
}

const render = (data, cart) => {
  try {
    refreshNav();
    const container = document.getElementById("products");
    data.map((e) => {
      addNode(container, e, cart);
    });
  } catch (error) {
    console.log(error);
  }
};

const addNode = (container, product, cart) => {
  let { title, description, price, id, image } = product;

  title = title[0].toUpperCase() + title.slice(1);

  if ("content" in document.createElement("template")) {
    let template = document.querySelector("template");
    let clone = template.content.cloneNode(true);
    let div = clone.querySelector("div");
    div.id = id;

    div.querySelector("img").src = `data:image/png;base64, ${image}`;
    div.querySelector("#title").textContent = title;
    div.querySelector("button").textContent = "take it";
    div.querySelector("#description").textContent = description;
    div.querySelector("#price").textContent = "$ " + price;

    div.querySelector("button").onclick = function () {
      product.image = null;
      cart.items = [...cart.items, product];
      cart.amount += product.price;
      window.sessionStorage.setItem("cart", JSON.stringify(cart));

      this.style.visibility = "hidden";

      refreshNav();
    };

    container.appendChild(div);
  }
};

const refreshNav = () => {
  document.querySelector("#span_items").textContent = `${
    JSON.parse(sessionStorage.cart).items.length
  }`;
};
