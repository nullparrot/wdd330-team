import {loadHeaderFooter} from "./utils.mjs";
import { calculate_subtotal, calculate_the_rest, packageItems, makePayload} from "./CheckoutProcess.mjs";
import {checkout} from "./ExternalServices.mjs"

loadHeaderFooter()

calculate_subtotal()
calculate_the_rest()
packageItems()


async function run_checkout(){
    let payload = await makePayload(document.forms["form-checkout"])
    console.log(payload)
    await checkout(payload)
}

document.querySelector("#checkout-button").addEventListener("submit", (e) => {
    e.preventDefault();
    run_Checkout.checkout();
  })