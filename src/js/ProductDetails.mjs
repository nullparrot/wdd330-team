import { GetParam } from "./ProductData.mjs";

export default class ProductDetails {
    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
      }
      async init() {
        // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        // once we have the product details we can render out the HTML
        // once the HTML is rendered we can add a listener to Add to Cart button
        // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
        document.getElementById('addToCart')
          .addEventListener('click', this.addToCart.bind(this));
        }
     addProductToCart(product) {
        setLocalStorage("so-cart", product);
      }
      // add to cart button event handler
      async addToCartHandler(e) {
        const product = await dataSource.findProductById(e.target.dataset.id);
        addProductToCart(product);
      }
      renderProductDetails(){
if ("content" in document.createElement("template")) {
  const productDetail = document.querySelector("product-detail");
  const ProductTemplate = document.querySelector("#productTemplate");
  const productDisplay = productTemplate.content.cloneNode(true);
  //Work needed to get product imported into script.
  productDisplay.querySelector("product__brand").content = "Product Brand Here"
  productDisplay.querySelector("product__name").content = "Product Name Here"
  productImage = productDisplay.querySelector("product__image")
  productImage.src = "Image Source Here"
  productImage.alt = "Product Name Here"
  productDisplay.querySelector("product-card__price").content = "Product Price Here"
  productDisplay.querySelector("product__color").content = "Product Color Here"
  productDisplay.querySelector("product__description").content = "Product Description Here"
  productDisplay.querySelector("#addToCart").setAttribute("data-id","Product ID Here")

  productDetail.appendChild(product);
} else {
  //Work needed below if we want to design some sort of error handling
  const productDetail = document.querySelector("product-detail");
  errorMessage = document.createElement('h2')
  errorMessage.content="Our bad, we don't this piece working yet. It's planned."
  productDetail.appendChild(errorMessage)
}



      }
  }