const { consoleLog } = require('mocha/lib/reporters/base');

const fetchProducts = () => {
  // seu código aqui
  const f = fetch(
    'https://api.mercadolibre.com/sites/MLB/search?q=$computador',
  )
  .then((response) => response.json())
  .then((data) => consoleLog(data));
};

// fetchProducts();

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
