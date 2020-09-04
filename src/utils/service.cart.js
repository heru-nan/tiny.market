

export default class Cart{
    constructor(){
        this.cart = [];
        this.amount = 0;
        this.type = "$";
    }

    add({id, price}){
        if(!id) return false;
        this.cart = [...this.cart, {id, price}];
        this.changeAmount(this.cart);
        return true;
    }

    changeAmount(cart){
        this.amount = cart.reduce((e, acum) => e.price + acum);
    }

    toString(){
        return `Total Products: ${this.cart.length}, Total Amount: $${this.amount}`;
    }
    
   
}
