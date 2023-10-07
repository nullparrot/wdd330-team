import { loadHeaderFooter,alertMessage } from "./utils.mjs";
import {
  calculate_subtotal,
  calculate_the_rest,
  packageItems,
  makePayload,
  emptyCart,
} from "./CheckoutProcess.mjs";
import { checkout } from "./ExternalServices.mjs";

loadHeaderFooter();

calculate_subtotal();
calculate_the_rest();
packageItems();

async function run_checkout() {
  let payload = await makePayload(document.forms["form-checkout"]);
  console.log(payload);
  try {
    await checkout(payload);
    emptyCart()
    window.location.href = "./success.html";
  } catch (servicesError) {
    console.log(await servicesError.message)
  }
}

document.querySelector("#form-checkout").addEventListener("submit", (e) => {
  e.preventDefault();
  run_checkout();
});
