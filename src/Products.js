export default class Products {
  async getProducts() {
    let data = await fetch("/public/data/data.json");
    return await data.json();
  }
}
