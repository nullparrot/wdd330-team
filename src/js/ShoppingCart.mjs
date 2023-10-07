import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
   return `<li class="cart-card divider">
    <a href="../product_pages/index.html?product=${item.Id}" class="cart-card__image">
      <img
        src="${item.Images.PrimaryMedium}"
        alt="${item.Name}"
      />
    </a>
    <a href="../product_pages/index.html?product=${item.Id}">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">Qty: ${item.Qty}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <span class="cart-card__x" data-id="${item.Id}">X</span>
  </li>`;
}
  
export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }
  removeItem(){
    let cartItems = getLocalStorage("so-cart")
    cartItems.splice(this.getAttribute("cartPos"), 1)
    setLocalStorage("so-cart", cartItems)
  }
  callRenderCart(){
    this.renderCartContents()
  }
  addRemoveListeners(){
    let cartPos = 0
    let cart = this
    let cartElements = document.querySelector(".product-list").querySelectorAll(".cart-card__x")
    cartElements.forEach(item => {
      item.addEventListener("click", this.removeItem)
      item.addEventListener("click", ()=>{cart.callRenderCart()})
      item.setAttribute("cartPos", cartPos)
      cartPos += 1
    });
  }
  renderTotal(cartItems){
    if(cartItems){
      let total = 0
      cartItems.map((item) => {total += item.FinalPrice*item.Qty})
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
      this.addRemoveListeners()
    }
  }
}