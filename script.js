function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  const cartList = document.querySelector('.cart__items');
  event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function createProductsList() {
  const data = await fetchProducts();
  const { results } = data;
  const items = document.querySelector('.items');

  results.forEach((result) => {
    const sku = result.id;
    const name = result.title;
    const image = result.thumbnail;
    const elementProduct = createProductItemElement({ sku, name, image });
    items.appendChild(elementProduct);
  });
}

async function getItemSku(itemSku) {
  const selectedItem = await fetchItem(itemSku);
  const { id: sku, title: name, price: salePrice } = selectedItem;
  const cartItem = createCartItemElement({ sku, name, salePrice });
  const cartList = document.querySelector('.cart__items');
  cartList.appendChild(cartItem);
}

function addToCart() {
  const allAddButtons = document.querySelectorAll('.item__add');

  allAddButtons.forEach((addButton) => {
    addButton.addEventListener('click', (e) => {
      const elementParent = e.target.parentNode;
      const itemSku = getSkuFromProductItem(elementParent);
      getItemSku(itemSku);
    })
  })
}

window.onload = async () => {
  await createProductsList();
  addToCart();
};

/*
REFERÊNCIAS
Requisito 1: Tonn me auxiliou a mostrar as informações na página.
Requisito 2 e 8: Lilian Azevedo me auxiliou a entender o que algumas funções realizam, se deixasse tudo no init() o Linter iria apontar erro, que é necessário 5 its e não 5 expects, e no geral.
Requisito 8: https://jestjs.io/docs/expect#tohavebeencalled
https://jestjs.io/docs/expect
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch

*/
