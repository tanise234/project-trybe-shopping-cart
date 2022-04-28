const getSavedCartItems = (items, callback) => {
  // seu código aqui
  const cart = document.querySelector('.cart__items');
  cart.innerHTML = localStorage.getItem(items);
  cart.childNodes.forEach((item) => item.addEventListener('click', callback));
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
