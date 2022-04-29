const saveCartItems = (cart, items) => {
  localStorage.removeItem(items);
  localStorage.setItem(items, cart.innerHTML);
  };

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
