
/*
    Date: 12/7/2023
    This file contains the funcionality to create the shop items
    add, delete item, add to cart
*/
let shop = document.getElementById('shop');


let basket = JSON.parse(localStorage.getItem("data")) || [];


let generateCart = () => {
    return (shop.innerHTML = shopItemsData.map((x)=>{
        let {id,name,price,img} = x;
        let search = basket.find((x) => x.id === id) || [];
        return `
        <div id=product-id-${id} class="product_item">

            <img src="${img}" alt="A glass with cold matcha" class="product-img">
            <ul>
                    <li class="description">${name}</li>
                    <li class="product_id">id: ${id} </li>
            </ul>

            <div class="price-quantity">
                <h2 class="price">$ ${price}</h2>
                <div class="buttons">

                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">${search.item === undefined? 0: search.item}</div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>

                </div>
            </div>
            
        </div>
        `
    }).join(""));

};

generateCart();

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
    
    //console.log(basket);
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
    //console.log(basket);
    
    //local storage
    localStorage.setItem("data", JSON.stringify(basket));  
};
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
};




















/*

// ----------------------------NEW SHOP-------------------------------  //
// CART
let cartIcon = document.querySelector('#cart-icon')
let cart = document.querySelector('.cart')
let closeCart = document.querySelector('#close-cart')

//  Open cart
cartIcon.onclick = () => {
    cart.classList.add('active');
}

// Close cart
closeCart.onclick = () => {
    cart.classList.remove('active');
}


// CART WORKING JS

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready();
}

//MAKING FUCTIONS 
function ready() {
    //Remove items from cart
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem)
    }
    // quantity changes
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    // Add to cart
   // var addCart = document.getElementsByClassName("add-cart");
   // for (var i = 0; i < addCart.length; i++) {
   //     var button = addCart[i];
   //     button.addEventListener("click", addCartClicked);
   // }
//}





// REMOVE ITEMS FROM CART
function removeCartItem (event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove()
    updateTotal();

}

// QUANTITY CHANGES
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1 ;
    }
    updateTotal();
}

// ADD TO CART
/*function addCartClicked (event) {
    var button = event.target;      
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('description')[0].innerText;
    console.log(title)
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
}*/ 

/*

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    //cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++) {
        alert("You have already added this items to your cart"); 
    }
}
var cartBoxContent =`<img src="matcha_cake.jpg" alt="" class="cart-img">
                    <div class="detail-box">
                    <div class="cart-product-title">Sponge Matcha Cake</div>
                    <div class="cart-price">$7.99</div>
                    <input type="number" value="1" class="cart-quantity">
                    </div>
                    <!-- Remove cart -->
                    <img src="trash-regular.png" alt="" class="cart-remove">`


// UPDATE TOTAL
function updateTotal () {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$", "")); // change innerHTML
        var quantity = quantityElement.value;
        total = total + (price * quantity);
        // if price contais some cents value
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName("total-price")[0].innerText = "$" + total;
    }
}

*/
