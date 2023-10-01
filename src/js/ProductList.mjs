function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.NameWithoutBrand}">
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.ListPrice}</p>
      <p class="product-card__value">Normally $${product.SuggestedRetailPrice}! Savings of $${Math.round(product.SuggestedRetailPrice-product.ListPrice)}!!</p>
    </a>
  </li>`
}

export default class ProductList{
    //category = the type of product, dataSource = the product's data, listElement = the element the data is rendered 
    constructor(category, dataSource, listElement) {
        // We passed in this information to make our class as reusable as possible.
        // Being able to define these things when we use the class will make it very flexible
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
      }

      async init() {
        const list = await this.dataSource.getData(this.category);
        this.renderList(list)
        document.querySelector(".title").innerHTML = "Top Products: "+this.category;
      }
      renderList(list) {
        const htmlStrings = list.map(productCardTemplate);
        this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));
      }
}