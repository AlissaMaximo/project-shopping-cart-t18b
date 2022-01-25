const fetchProducts = () => fetch('https://api.mercadolibre.com/sites/MLB/search?q=$computador')
  .then((response) => response.json())
  .then((object) => object);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
