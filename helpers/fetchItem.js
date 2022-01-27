const fetchItem = async (itemId) => {
  try {
    return await fetch(`https://api.mercadolibre.com/items/${itemId}`)
    .then((response) => response.json())
    .then((object) => object);
  } catch (error) {
    throw new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
