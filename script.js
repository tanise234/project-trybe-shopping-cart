const cart = document.querySelector('.cart__items');
const totalPrice = 'total price';
const oldPrice = () => JSON.parse(localStorage.getItem(totalPrice));

const createLoadingElement = () => {
  const loadingText = document.createElement('p');
  loadingText.innerText = 'Carregando...';
  loadingText.className = 'loading';
  document.querySelector('.items').appendChild(loadingText);
};
createLoadingElement();

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

const displayTotalPrice = () => {
  const displayPrice = document.createElement('div');
  displayPrice.className = 'total-price';
  const total = document.createElement('h3');
  total.id = 'total';
  displayPrice.appendChild(total);
  document.querySelector('.cart').appendChild(displayPrice);
};
displayTotalPrice();
const totalDisplayed = document.getElementById('total');

const calculatePrice = (plus, minus) => {
  const op = oldPrice();
  localStorage.setItem(totalPrice, JSON.stringify(op + plus - minus));
  totalDisplayed.innerText = `${op + plus - minus}`;
};

function cartItemClickListener(event) {
  cart.removeChild(event.target);
  saveCartItems(cart, 'items');
  const arrayText = event.target.innerText.split('$');
  const priceToRemove = parseFloat(arrayText[1]);
  calculatePrice(0, priceToRemove);
}

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
  const productsRaw = await fetchProducts('computador');
  const products = productsRaw.results;
  const sectionItems = document.querySelector('.items');
  const loading = document.querySelector('.loading');
  sectionItems.removeChild(loading);
  products.forEach((product) => {
    const objProduct = {
      sku: product.id,
      name: product.title,
      image: product.thumbnail,
    };
    sectionItems.appendChild(createProductItemElement(objProduct));
  });
};
addProducts();

const removeAllProducts = () => {
  localStorage.removeItem('items');
  localStorage.removeItem(totalPrice);
  totalDisplayed.innerText = 'Total: R$ 0.00';
  const totalItems = cart.childElementCount;
  for (i = 0; i < totalItems; i += 1) {
    cart.removeChild(cart.firstElementChild);
  }
};

const emptyCart = () => {
  document
    .querySelector('.empty-cart')
    .addEventListener('click', removeAllProducts);
};
emptyCart();

window.onload = () => {
  getSavedCartItems('items', cartItemClickListener);
  if (oldPrice()) {
    totalDisplayed.innerText = `${oldPrice()}`;
  } else {
    totalDisplayed.innerText = 'Total: R$ 0.00';
  }
};
