let _count = 0;

export default class Products {
  constructor(arr) {
    this.nodeProducts = document.getElementById("products");
    this.buildFront(arr);
  }

  static get count() {
    return _count;
  }
  buildFront(arr) {
    for (let i of arr) {
      this.addNode(i);
    }
  }

  addNode(product) {
    const { title, description, price, typePrice } = product;

    if ("content" in document.createElement("template")) {
      let template = document.querySelector("template");

      let clone = template.content.cloneNode(true);

      let node_title = clone.querySelector("#title");
      let node_description = clone.querySelector("#description");
      let node_price = clone.querySelector("#price");
      let node_button = clone.querySelector("#button");

      node_title.textContent = title || "titulo";
      node_description.textContent = description || "descriptcion";
      node_price.textContent = price || "price";
      node_button.textContent = "do something";

      this.nodeProducts.appendChild(clone);

      _count++;
    }
  }
}
