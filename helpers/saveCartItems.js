const saveCartItems = ({ sku, name, salePrice }) => {
  let myNewCart = getSavedCartItems();

  if (myNewCart === null) {
    myNewCart = {content: []};
  }
  myNewCart.content.push({ sku, name, salePrice });

  localStorage.setItem('cartItems', JSON.stringify(myNewCart));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
