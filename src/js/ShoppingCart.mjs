import { getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
   return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images.PrimaryMedium}"
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
}
  
export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }
  renderTotal(cartItems){
    if(cartItems){
      let total = 0
      cartItems.map((item) => {total += item.FinalPrice})
      // for(let i = 0; i < cartItems.length; i += 1){
      //   total += cartItems[i].FinalPrice
      // }
      document.querySelector(".cart-total").innerHTML = `Total: ${total}`
      document.querySelector(".cart-total").setAttribute("visibility","visible")
    }
  }
  renderCartContents() {
    const cartItems = getLocalStorage(this.key);
    if(cartItems){
      const htmlItems = cartItems.map((item) => cartItemTemplate(item));
      this.renderTotal(cartItems)
      document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
    }
  }
}