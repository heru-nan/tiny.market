export default class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products.items));
    sessionStorage.setItem("products", JSON.stringify(products.items));
  }

  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find((e) => e.id === id);
  }

  static addProduct(cart, product) {
    cart = [...cart, product];
  }

  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  static getCart() {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  }
}
