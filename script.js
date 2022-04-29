const cart = document.querySelector('.cart__items');
const oldPrice = JSON.parse(localStorage.getItem('total price'));

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const calculatePrice = (plus, minus) => {
  localStorage.setItem('total price', JSON.stringify(oldPrice + plus - minus));
  document.getElementById('total').innerText = `Total: ${(oldPrice + plus - minus).toFixed(2)}`;
};

function cartItemClickListener(event) {
  cart.removeChild(event.target);
  saveCartItems(cart, 'items');
  const arrayText = event.target.innerText.split('$');
  const priceToRemove = parseFloat(arrayText[1]);
  calculatePrice(0, priceToRemove);
}

const displayTotalPrice = () => {
  const displayPrice = document.createElement('div');
  displayPrice.className = 'total-price';
  const total = document.createElement('h3');
  total.id = 'total';
  displayPrice.appendChild(total);
  document.querySelector('.cart').appendChild(displayPrice);
};
displayTotalPrice();

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addItemToCart = async (item) => {
  const clicked = item.target.parentNode;
  const productId = getSkuFromProductItem(clicked);
  const product = await fetchItem(productId);
  const objProduct = {
    sku: product.id,
    name: product.title,
    salePrice: product.price,
  };
  cart.appendChild(createCartItemElement(objProduct));
  saveCartItems(cart, 'items');
  calculatePrice(product.price, 0);
};

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = createCustomElement(
    'button',
    'item__add',
    'Adicionar ao carrinho!',
  );
  button.addEventListener('click', addItemToCart);
  section.appendChild(button);
  return section;
}

const addProducts = async () => {
  const products = await fetchProducts();
  products.forEach((product) => {
    const sectionItems = document.querySelector('.items');
    const objProduct = {
      sku: product.id,
      name: product.title,
      image: product.thumbnail,
    };
    sectionItems.appendChild(createProductItemElement(objProduct));
  });
};
addProducts();

window.onload = () => {
  getSavedCartItems('items', cartItemClickListener);
  document.getElementById('total').innerText = `Total: ${oldPrice.toFixed(2)}`;
};
