const fetchProducts = (item) => {
  // seu código aqui
 const url = `https://api.mercadolibre.com/sites/MLB/search?q=${item}`;
  const dataAPI = fetch(url)
    .then((response) => response.json())
    .then((data) => data).catch((error) => error);
  return dataAPI;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
