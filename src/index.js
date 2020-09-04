import "./styles.css";
import "./card.css";
import Market from "./utils/service.products";
import Cart from "./utils/service.cart";

import { data } from "./data/data";

const pages = ["", "cart"];

// app will be:
/*
 **RenderOverlayNavegation
 **RenderOnlyPresentPage
 */
const App = () => {
  if (location.href.includes(pages[1])) {
    const marketButton = document.getElementById("market");
    marketButton.onclick = () => {
      location.href = `http://localhost:3000/${pages[0]}`;
    };
  } else {
    const cartButton = document.getElementById("cart");
    cartButton.onclick = () => {
      location.href = `http://localhost:3000/${pages[1]}`;
    };
  }

  const TinyMarket = new Market(data);
  const TinyCart = new Cart();

  console.log(TinyMarket.toString());
  console.log(TinyCart.toString());
};
App();
