const { consoleLog } = require('mocha/lib/reporters/base');

const fetchProducts = async () => {
  // seu código aqui
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=$computador';
  const dataAPI = await fetch(url)
    .then((response) => response.json())
    .then((data) =>
      data.results.map((result) => {
        const modification = {
          sku: result.id,
          name: result.title,
          image: result.thumbnail,
        };
        return modification;
      })); // retornar o array com 50 resultados da busca
  return dataAPI;
  // await console.log('dataAPI', dataAPI);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
