const getSavedCartItems = () => {
  const mySavedCart = localStorage.getItem('cartItems');

  return mySavedCart;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
