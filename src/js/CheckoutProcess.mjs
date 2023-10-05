import {getLocalStorage} from "./utils.mjs"
const tax_rate = 0.06
const shipping_first = 8.00
const shipping_after_first = 2.00
let subtotal = 0
let cart_items = getLocalStorage("so-cart")

export function calculate_subtotal(){
    //Calculate Subtotal
    cart_items.map((item) => {subtotal += item.FinalPrice})
    document.querySelector("#subtotal").innerHTML = `Subtotal: ${subtotal.toFixed(2)}`
}

export function calculate_the_rest(){
    //Calculate Tax
    let tax = subtotal * tax_rate
    document.querySelector("#tax").innerHTML = `Tax: ${tax.toFixed(2)}`
    //Calculate Shipping
    let shipping = shipping_first
    cart_items.forEach(item => {
        shipping += shipping_after_first
    });
    document.querySelector("#shipping").innerHTML = `Shipping: ${shipping.toFixed(2)}`
    //Calculate Total
    let total = subtotal + tax + shipping
    document.querySelector("#order-total").innerHTML = `Order Total: ${total.toFixed(2)}`
}

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
export function packageItems() {
    // convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
    let items = [] 
    cart_items.map((item) => {
        let packeged_item = {
            id: item.Id,
            name: item.Name,
            price: item.FinalPrice,
            quantity: 1
        }
        items.push(packeged_item)
    })
    console.log(items)
}
  
async function checkout(form) {
      // build the data object from the calculated fields, the items in the cart, and the information entered into the form
  
      // call the checkout method in our ExternalServices module and send it our data object.
}