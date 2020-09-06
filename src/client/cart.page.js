import { data } from "../../public/data/data";
export function cartPage() {
  let cart = JSON.parse(window.sessionStorage.cart);
  render(cart.items);
}

const render = (items) => {
  try {
    const container = document.querySelector("#cart");

    items.map((e) => {
      for (let i of data) {
        if (i.id === e.id) {
          addNode(container, i);
          break;
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const addNode = (container, product) => {
  const { title, price, id, image } = product;

  if ("content" in document.createElement("template")) {
    let template = document.querySelector("template");
    let clone = template.content.cloneNode(true);
    let div = clone.querySelector("div");
    div.id = id;

    div.querySelector("img").src = `data:image/png;base64, ${image}`;
    div.querySelector("#title").textContent = title;
    div.querySelector("#price").textContent = price;

    div.querySelector("button").onclick = function () {
      alert("ups");
    };

    container.appendChild(div);
  }
};
