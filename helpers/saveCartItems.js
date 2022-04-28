const saveCartItems = (cart, items) => {
  // seu código aqui
  localStorage.clear();
  localStorage.setItem(items, cart.innerHTML);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
