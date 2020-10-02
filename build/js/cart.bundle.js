!function(e){var t={};function n(a){if(t[a])return t[a].exports;var o=t[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(a,o,function(t){return e[t]}.bind(null,o));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=6)}([function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));class a{static saveProducts(e){localStorage.setItem("products",JSON.stringify(e.items))}static getProduct(e){return JSON.parse(localStorage.getItem("products")).find(t=>t.id===e)}static addProduct(e,t){e=[...e,t]}static saveCart(e){localStorage.setItem("cart",JSON.stringify(e))}static getCart(){return localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[]}}},function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));let a="http://localhost:3000",o="/products",i=new URL(window.location.href).origin;a!=i&&(a=i);class r{async getProducts(){let e=await fetch(a+o);return(await e.json()).data}static async submitPay(e){o="/pay/submit";try{let t=await fetch(a+o,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});return await t.json()}catch(e){console.log(e)}}}},,,,,function(e,t,n){"use strict";n.r(t);var a=n(1),o=n(0);n(7),n(8),n(9);let i=[],r=[],c=[],s=document.querySelector("#products"),d=document.querySelector("#subtotal"),l=document.querySelector("#extra_gastos"),u=document.querySelector("#total"),m=document.querySelector("#products"),p=document.querySelector("#modal"),f=document.querySelector("#lastModal"),y=document.querySelector("#pay"),v=[];class h{displayProducts(e){let t='\n    <div class="header" id ="header">\n      <h2>Shopping Cart</h2>\n      <button id="clean_cart" class="clean_button">Clean Cart</button>\n      </div>\n    ';e.length;e.forEach(e=>{let{id:n,name:a,description:o,price:i,image:r,amount:c}=e;a=a[0].toUpperCase()+a.slice(1),o=o[0].toUpperCase()+o.slice(1),t+=`\n      <div id=${n} class="item">\n                <div class="item__image">\n\n                        <img class="image" src="${r}"  />\n                </div>\n                <div class="item__content">\n\n                  <div class="item__content_info">\n                        <h4 id="name" class="name">${a}</h4>\n                        <p id="description" class="description">Thanks for<br /> cho-cho-choosing me!</p>\n                  </div>\n                <span class="price" id="price">$${i}</span>\n\n                  <button id="item_button_delete" class="delete_button" data-id=${n}>delete</button>\n                  <div class="item__content_actions">\n                    <button id="item_button" data-id=${n} name="decrement" >-1</button>\n                    <span id="item_amount" class="amount" data-id=${n}>${c}</span>\n                    <button id="item_button" data-id=${n} name="increment">+1</button>\n                  </div>\n                </div>\n      </div>\n      `}),s.innerHTML=t}static displayResumen(e){let t=0,n=0;e.map(e=>{t+=e.price*e.amount,n+=e.amount});let a=t?3:0,o=t+a;d.innerHTML="$ "+parseFloat(t.toFixed(2)),l.innerHTML="$ "+a,u.innerHTML="$ "+parseFloat(o.toFixed(2))}setupApp(){v=o.a.getCart(),this.displayProducts(v),this.getButtons(),h.displayResumen(v)}increment(){let e=this.dataset.id,t=v.find(t=>t.id===e);c.find(t=>t.dataset.id===e).innerHTML=++t.amount,o.a.saveCart(v.map(e=>e.id===t.id?t:e)),h.displayResumen(v)}decrement(e){let t=v.find(e=>e.id===this.dataset.id);c.find(e=>e.dataset.id===this.dataset.id).innerHTML=--t.amount,o.a.saveCart(v.map(e=>e.id===t.id?t:e)),h.displayResumen(v)}delete(e){let{id:t}=this.dataset,n=o.a.getProduct(t);if(confirm("_____confirm delete: "+n.name)){let e=v.filter(e=>e.id!=t);o.a.saveCart(e),m||console.log("products not defined"),m.querySelector("#"+t).remove(),v=e}else console.log("not delete");h.displayResumen(v)}clean(e=!1){e&&location.reload(),localStorage.removeItem("cart")}showModal(){p.classList.add("open")}closeModal(){p.classList.remove("open")}getButtons(){r=[...document.querySelectorAll("#item_button_delete")],i=[...document.querySelectorAll("#item_button")],c=[...document.querySelectorAll("#item_amount")],r.forEach(e=>{e.addEventListener("click",this.delete)}),i.forEach(e=>{"increment"===e.name?e.addEventListener("click",this.increment):e.addEventListener("click",this.decrement)}),document.querySelector("#clean_cart").addEventListener("click",()=>{confirm("_____confirm clean cart")&&this.clean(!0)}),y.addEventListener("click",this.showModal),p.addEventListener("click",e=>{"modal"===e.target.id&&this.closeModal()});let e=document.querySelector("form");e.addEventListener("submit",async t=>{t.preventDefault();let{fname:n,lname:o,city:i,street:r,number:c}=e.elements,s={fname:n.value,lname:o.value,city:i.value,street:r.value,number:c.value,cart:v},d=await a.a.submitPay(s);d.ok&&(this.closeModal(),setTimeout(()=>{f.querySelector("#link").href=d.link;f.classList.add("open"),console.log("1")},1e3))})}}document.addEventListener("DOMContentLoaded",()=>{(new h).setupApp()})},function(e,t,n){},function(e,t,n){},function(e,t,n){}]);