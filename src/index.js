import "./styles.css";
import "./card.css";
import Products from './scripts/handle.products';

const elements = [
    {
        title: "first element",
        description: "aasdasda",
        price: 5,
        typePrice: "USD",
    },
    {
        title: "first element",
        description: "aasdasda",
        price: 5,
        typePrice: "USD",
    },{
        title: "first element",
        description: "aasdasda",
        price: 5,
        typePrice: "USD",
    }
]


import {cloneElement} from "./scripts/clone.product";

const App = () => {
    const products = document.getElementById("products");
    
    const Market = new Products(elements);  

    console.log(Products.count);


    //observer.observe(products, {childList: true})
    
}
App();
