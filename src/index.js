import "../public/home/styles.css";
import "../public/home/card.css";
import { indexPage } from "./client/index.page";

// const pages = ["/", "/cart"];

// app will be:
/*
 **RenderOverlayNavegation
 **RenderOnlyPresentPage
 */
const App = () => {
  let cart;

  if (!window.sessionStorage.cart) {
    cart = {
      id: "tiny.market",
      items: [],
      amount: 0,
    };
    sessionStorage.setItem("cart", JSON.stringify(cart));
  } else {
    cart = JSON.parse(sessionStorage.cart);
  }

  indexPage(cart);
};
App();
