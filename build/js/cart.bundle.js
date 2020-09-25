!function(t){var e={};function n(i){if(e[i])return e[i].exports;var a=e[i]={i:i,l:!1,exports:{}};return t[i].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(i,a,function(e){return t[e]}.bind(null,a));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=6)}([function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));class i{static saveProducts(t){localStorage.setItem("products",JSON.stringify(t.items))}static getProduct(t){return JSON.parse(localStorage.getItem("products")).find(e=>e.id===t)}static addProduct(t,e){t=[...t,e]}static saveCart(t){localStorage.setItem("cart",JSON.stringify(t))}static getCart(){return localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[]}}},function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));class i{async getProducts(){let t=JSON.parse(localStorage.getItem("products"));if(t&&t.length>0)return{items:t};let e=await fetch("http://localhost:3000/products");return(await e.json()).data}}},,,,,function(t,e,n){"use strict";n.r(e);var i=n(1),a=n(0);n(7),n(8);let r=[],o=[],s=[],c=document.querySelector("#products"),d=document.querySelector("#subtotal"),l=document.querySelector("#extra_gastos"),u=document.querySelector("#total"),m=document.querySelector("#products"),p=[];class f{displayProducts(t){let e="\n      <h2>Shopping Cart</h2>\n    ";t.length;t.forEach(t=>{let{id:n,title:i,description:a,price:r,image:o,amount:s}=t;i=i[0].toUpperCase()+i.slice(1),a=a[0].toUpperCase()+a.slice(1),e+=`\n      <div id=${n} class="item">\n                <div class="item__image">\n\n                        <img class="image" src="data:image/png;base64, ${o}"  />\n                </div>\n                <div class="item__content">\n\n                  <div class="item__content_info">\n                        <h4 id="title" class="title">${i}</h4>\n                        <p id="description" class="description">Thanks for<br /> cho-cho-choosing me!</p>\n                  </div>\n                <span class="price" id="price">$${r}</span>\n\n                  <button id="item_button_delete" class="delete_button" data-id=${n}>delete</button>\n                  <div class="item__content_actions">\n                    <button id="item_button" data-id=${n} name="decrement" >-1</button>\n                    <span id="item_amount" class="amount" data-id=${n}>${s}</span>\n                    <button id="item_button" data-id=${n} name="increment">+1</button>\n                  </div>\n                </div>\n      </div>\n      `}),c.innerHTML=e}static displayResumen(t){let e=0,n=0;t.map(t=>{e+=t.price*t.amount,n+=t.amount});let i=e?3:0,a=e+i;d.innerHTML="$ "+parseFloat(e.toFixed(2)),l.innerHTML="$ "+i,u.innerHTML="$ "+parseFloat(a.toFixed(2))}setupApp(){p=a.a.getCart(),this.displayProducts(p),this.getButtons(),f.displayResumen(p)}increment(){let t=this.dataset.id,e=p.find(e=>e.id===t);s.find(e=>e.dataset.id===t).innerHTML=++e.amount,a.a.saveCart(p.map(t=>t.id===e.id?e:t)),f.displayResumen(p)}decrement(t){let e=p.find(t=>t.id===this.dataset.id);s.find(t=>t.dataset.id===this.dataset.id).innerHTML=--e.amount,a.a.saveCart(p.map(t=>t.id===e.id?e:t)),f.displayResumen(p)}delete(t){let{id:e}=this.dataset,n=a.a.getProduct(e);if(confirm("_____confirm delete: "+n.title)){let t=p.filter(t=>t.id!=e);a.a.saveCart(t),m||console.log("products not defined"),m.querySelector("#"+e).remove(),console.log(m),p=t}else console.log("not delete");f.displayResumen(p)}getButtons(){o=[...document.querySelectorAll("#item_button_delete")],r=[...document.querySelectorAll("#item_button")],s=[...document.querySelectorAll("#item_amount")],o.forEach(t=>{t.addEventListener("click",this.delete)}),r.forEach(t=>{"increment"===t.name?t.addEventListener("click",this.increment):t.addEventListener("click",this.decrement)})}}document.addEventListener("DOMContentLoaded",()=>{const t=new f;new i.a;t.setupApp()})},function(t,e,n){},function(t,e,n){}]);