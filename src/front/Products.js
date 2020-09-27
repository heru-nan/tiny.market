let host = "http://localhost:3000";
let query = "/products";

export default class Products {
  async getProducts() {
    // let cache = JSON.parse(localStorage.getItem("products"));
    // if (cache && cache.length > 0) {
    //   return { items: cache };
    // }
    let rawRes = await fetch(host + query);
    let res = await rawRes.json();
    return res.data;
  }

  static async submitPay(obj) {
    query = "/pay/submit";
    try {
      let rawRes = await fetch(host + query, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      return await rawRes.json();
    } catch (err) {
      console.log(err);
    }
  }
}
