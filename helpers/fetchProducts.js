const fetchProducts = () => {
  // seu código aqui
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=$computador';
  const dataAPI = fetch(url)
    .then((response) => response.json())
    .then((data) => data.results).catch((error) => console.log('Something went wrong.'));
  return dataAPI;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
