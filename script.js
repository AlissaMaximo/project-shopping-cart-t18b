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
  event.target.remove();
  saveCartItems(document.getElementsByClassName('cart__items')[0].innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function createProductsList() {
  const data = await fetchProducts('computador');
  const { results } = data;
  const items = document.querySelector('.items');

  results.forEach((result) => {
    const sku = result.id;
    const name = result.title;
    const image = result.thumbnail;
    const elementProduct = createProductItemElement({ sku, name, image });
    items.appendChild(elementProduct);
  });

  document.querySelector('.loading').remove();
}

async function getItemSku(itemSku) {
  const selectedItem = await fetchItem(itemSku);
  const { id: sku, title: name, price: salePrice } = selectedItem;
  const cartItem = createCartItemElement({ sku, name, salePrice });
  const cartList = document.querySelector('.cart__items');

  cartList.appendChild(cartItem);

  saveCartItems(document.getElementsByClassName('cart__items')[0].innerHTML);
}

function addToCart() {
  const allAddButtons = document.querySelectorAll('.item__add');

  allAddButtons.forEach((addButton) => {
    addButton.addEventListener('click', (e) => {
      const elementParent = e.target.parentNode;
      const itemSku = getSkuFromProductItem(elementParent);

      getItemSku(itemSku);
    
      // calculateTotal();
    });
  });
}

/* function calculateTotal(price) {
    let totalPriceElement = document.querySelector('.total-price');
    if (totalPriceElement === null) {
      totalPriceElement = document.createElement('h2');
      const cartSection = document.querySelector('.cart');
      let totalValue = 0;
      totalPriceElement.innerText = totalValue;
      cartSection.appendChild(totalPriceElement);
    }
    let totalValue = totalPriceElement.innerText;
    console.log(totalValue);

    totalPriceElement.innerText = totalValue;
  }
  calculateTotal(salePrice); */

function clearCart() {
  const cartList = document.querySelector('.cart__items');
  const totalPriceValue = document.querySelector('.total-price');

  cartList.innerHTML = '';
  totalPriceValue.innerText = 0;
}

const clearButton = document.querySelector('.empty-cart');
clearButton.addEventListener('click', clearCart);

window.onload = async () => {
  await createProductsList();
  addToCart();
  document.getElementsByClassName('cart__items')[0].innerHTML = getSavedCartItems();
  document.getElementsByClassName('cart__items')[0].childNodes.forEach((product) => {
    product.addEventListener('click', cartItemClickListener);
  });
};

/*
REFERÊNCIAS
Requisito 1: Tonn me auxiliou a mostrar as informações na página.
Requisito 2 e 8: Lilian Azevedo me auxiliou a entender o que algumas funções realizam, se deixasse tudo no init() o Linter iria apontar erro, que é necessário 5 its e não 5 expects, e no geral.
Requisito 8: https://jestjs.io/docs/expect#tohavebeencalled
https://jestjs.io/docs/expect
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch
Requisito 4: Bruno Alvez me ajudou a entender como fazer o localStorage.
Requisito 4 refeito com Esdras Tenório para passar no requisito 10 que também foi auxiliado.
Requisito 6 e 7: Gabriel Julio me auxiliou a entender e implementar os requisitos, quanto ao fetch/await, o CSS e outros.
*/
