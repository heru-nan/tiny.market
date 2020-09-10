import { data } from "../../public/data/data";
export function cartPage() {
  let cart = JSON.parse(window.sessionStorage.cart);
  render(cart.items, cart.amount);
}

const render = (items, amount) => {
  try {
    refreshSubtotal(amount);
    let cnt = 0;
    const container_items = document.querySelector("#container_items");
    items.map((e) => {
      for (let i of data) {
        if (i.id === e.id) {
          let tempNode = addNode(container_items, i);
          if (++cnt < items.length) {
            addBar(tempNode);
          }
          break;
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const addNode = (container, product) => {
  let { title, price, id, image } = product;

  title = title[0].toUpperCase() + title.slice(1);

  if ("content" in document.createElement("template")) {
    let template = document.querySelector("template");
    let clone = template.content.cloneNode(true);
    let div = clone.querySelector("div");
    div.id = id;

    div.querySelector("img").src = `data:image/png;base64, ${image}`;
    div.querySelector("#title").textContent = title;
    div.querySelector("#price").textContent = "$" + price;

    div.querySelector("button").onclick = function () {
      let cart = JSON.parse(window.sessionStorage.cart);
      console.log();
      cart.amount = cart.amount - price;

      cart.items = cart.items.filter((i) => i.id != id);
      window.sessionStorage.setItem("cart", JSON.stringify(cart));

      div.style.display = "none";
      refreshSubtotal(cart.amount);
    };

    return container.appendChild(div);
  }
};

const refreshSubtotal = (amount) => {
  document.querySelector("#subtotal").textContent = `$ ${amount}`;
};

const addBar = (container) => {
  const div = document.createElement("div");
  div.className = "bar";
  container.appendChild(div);
};
