function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/index.html?product=">
      <img src="" alt="Image of ">
      <h3 class="card__brand"></h3>
      <h2 class="card__name"></h2>
      <p class="product-card__price">$</p>
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
        // our dataSource will return a Promise...so we can use await to resolve it.
        const list = await this.dataSource.getData();
        // render the list - to be completed
        this.renderList(list)
      }
      renderList(list) {
        const htmlStrings = list.map(productCardTemplate);
        this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));
      }
      // renderList(list){
      //   list.map((item) => productCardTemplate(item))
      // }
}