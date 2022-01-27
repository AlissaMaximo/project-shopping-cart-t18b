const fetchProducts = async (param) => {
  try {
    return await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${param}`)
    .then((response) => response.json())
    .then((object) => object);
  } catch (error) {
    throw new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
