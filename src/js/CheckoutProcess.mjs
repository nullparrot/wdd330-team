import {getLocalStorage,setLocalStorage} from "./utils.mjs"
const tax_rate = 0.06
const shipping_first = 8.00
const shipping_after_first = 2.00
let subtotal = 0
let total = 0
let tax = 0
let shipping = 0
let cart_items = getLocalStorage("so-cart")

export function calculate_subtotal(){
    //Calculate Subtotal
    cart_items.map((item) => {subtotal += item.FinalPrice*item.Qty})
    document.querySelector("#subtotal").innerHTML = `Subtotal: ${subtotal.toFixed(2)}`
}

export function calculate_the_rest(){
    //Calculate Tax
    tax = subtotal * tax_rate
    document.querySelector("#tax").innerHTML = `Tax: ${tax.toFixed(2)}`
    //Calculate Shipping
    shipping = shipping_first
    cart_items.forEach(item => {
        shipping += shipping_after_first*item.Qty
    });
    document.querySelector("#shipping").innerHTML = `Shipping: ${shipping.toFixed(2)}`
    //Calculate Total
    total = subtotal + tax + shipping
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
            quantity: item.Qty
        }
        items.push(packeged_item)
    })
    return items
}
  
export async function makePayload(form) {
      let form_data = formDataToJSON(form)
      let packed_items = packageItems()
      form_data.items = packed_items
      form_data.orderTotal = total
      form_data.tax = tax
      form_data.shipping = shipping
      form_data.address = form_data.street + ", " + form_data.city + ", " + form_data.state + ", " + form_data.zip
      form_data.orderDate = new Date()
      return form_data
}

export function emptyCart(){
    cart = []
    setLocalStorage("so-cart", cart);
}

// takes a form element and returns an object where the key is the "name" of the form input.
function formDataToJSON(formElement) {
    const formData = new FormData(formElement),
      convertedJSON = {};
  
    formData.forEach(function (value, key) {
      convertedJSON[key] = value;
    });
    return convertedJSON;
  }