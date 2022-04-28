const fetchItem = (id) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/items/${id}`;
  const itemById = fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log('Something went wrong.'));
  return itemById;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
