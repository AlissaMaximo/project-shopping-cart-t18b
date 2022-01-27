const getSavedCartItems = () => {
  const mySavedCart = JSON.parse(localStorage.getItem('cartItems'));

  return mySavedCart;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
