import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = new Array(getLocalStorage("so-cart"));
  //A check if cartItems array isn't empty and if it is return to exit he function
  if (cartItems.length != 0){
    return 
  }else{
    cartItems.map((item) => cartItemTemplate(item));
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
