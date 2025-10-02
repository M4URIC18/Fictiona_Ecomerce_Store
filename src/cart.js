/*
    Date: 12/7/2023
    This file contains the funcionality for the checkout
    users can see total price and modifie the cart
*/


let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');
let basket = JSON.parse(localStorage.getItem("data")) || [];


/*

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map( (x) => x.item ).reduce( (x,y) => x+y, 0);
};

calculation();

*/

let generateCartItems = () => {
    if( basket.length !== 0) {
        return (shoppingCart.innerHTML = basket.map((x) => {
            //console.log(x);
            let {id, item} = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            let {img, name, price} = search;
            return `
            <div class="cart-item">
                <img width="100" src="${img}" alt="" >
                <div class="details">

                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${name}</p>
                            <p class="cart-item-price">$ ${price}</p>
                        </h4>
                        <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>  
                    </div>
                    <div class="buttons">

                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>

                    </div>
                    <h3>$ ${item*search.price}</h3>
                </div>
            </div>
            `;
        }).join(''));
    } else {
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2 class="title-empty">Cart is Empty</h2> 
        <a href="products1.html" >
            <button class="HomeBtn">Back to Products</button>
        </a>
        `;
    }
};

generateCartItems();

let increment = (id) => {
    let selectItem = id;
    let search = basket.find((x) => x.id === selectItem.id);
    if(search === undefined) {
        basket.push({
            id: selectItem.id,
            item: 1,
        });
    }
    else {
        search.item += 1;
    }
    
    generateCartItems();
    update(selectItem.id);
    //local storage
    localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
    let selectItem = id;
    let search = basket.find((x) => x.id === selectItem.id);

    if (search === undefined) return;
    else if(search.item === 0) return;
    else {
        search.item -= 1;
    }
    
    update(selectItem.id);
    
    basket = basket.filter((x) => x.item !== 0);
    generateCartItems();    
    
    //local storage
    localStorage.setItem("data", JSON.stringify(basket));  
};
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    totalAmount();
};

let removeItem = (id) => {
    let selectedItem = id;
    //console.log(selectedItem.id);
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    totalAmount();
    localStorage.setItem("data", JSON.stringify(basket));
    
};

let clearCart = () => {
    basket = [];
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
};

let totalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket.map((x) => {
            let {item, id} = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item * search.price;

        })
        .reduce( (x,y) => x + y, 0);
        //console.log(amount);
        label.innerHTML = `
        <h2 class="title-bill">Total Bill: $ ${amount}</h2>
        <button onclick="checkout()" class="checkout">Checkout</button>
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        `;
    } else return;
};

totalAmount();

let checkout = () => {
    window.alert("SUCCESSFUL PURCHASE");
    clearCart();
    shoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2 class="title-empty">Cart is Empty</h2> 
        <a href="products1.html" >
            <button class="HomeBtn">Back to Products</button>
        </a>
    `;
};