import "./styles.css";
import "./card.css";

import {cloneElement} from "./scripts/clone.product";

const App = () => {
    const products = document.getElementById("products");
    const product = document.getElementById("product");
    const button = document.getElementById("product_button")

    button.onclick = (e)=>{
        const node = cloneElement(product);
    }

    const observer = new MutationObserver((mutationList, ovserver)=>{
        mutationList.forEach((mutation) => {
            switch(mutation.type){
                case 'childList':
                    let button = mutation.target.lastChild.querySelector("button");
                    button.onclick = ()=>{
                        const node = cloneElement(product);
                    }
                    break;
                default:
                    console.log(mutation.type);
                    break;
            }
        })
    })
    observer.observe(products, {childList: true})
    
}
App();
