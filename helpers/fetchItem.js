const fetchItem = (id) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/items/${id}`;
  const itemById = fetch(url)
    .then((response) => response.json())
    .catch((error) => error);
  return itemById;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
