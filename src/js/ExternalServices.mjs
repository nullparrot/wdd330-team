const baseURL = "https://wdd330-backend.onrender.com/";
const checkoutURL = "https://wdd330-backend.onrender.com/checkout";

function convertToJson(res) {
  const dataResponse = res.json();
  if (res.ok) {
    return dataResponse;
  } else {
    throw { name: "servicesError", message: dataResponse };
  }
}

export default class ExternalServices {
  constructor(category) {
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
}

export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  await fetch(baseURL + "checkout/", options).then(convertToJson);
}
