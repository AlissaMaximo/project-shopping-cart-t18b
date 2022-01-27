const saveCartItems = ({ sku, name, salePrice }, oldCart) => {
  let currentCart = oldCart;
  if (currentCart === null) {
    currentCart = { content: [] };
  }
  currentCart.content.push({ sku, name, salePrice });

  localStorage.setItem('cartItems', JSON.stringify(currentCart));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
