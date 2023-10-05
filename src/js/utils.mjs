// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
//Get parameters from url
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const value = urlParams.get(param)
  return value
}

function renderWithTemplate(data, listElement) {
  listElement.insertAdjacentHTML("afterbegin", data);
}

async function loadTemplate(template){
  let x = await fetch(template);
  let y = await x.text();
  return y
}

export async function loadHeaderFooter(){
  const header_template = await loadTemplate("../partials/header.html")
  const footer_template = await loadTemplate("../partials/footer.html")
  const header_element = document.querySelector("#main-header")
  const footer_element = document.querySelector("#main-footer")
  renderWithTemplate(header_template, header_element)
  renderWithTemplate(footer_template, footer_element)
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  const htmlStrings = list.map(templateFn);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}