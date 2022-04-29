require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  test('1.1 - Teste se fetchProducts é uma função', async () => {
  await expect(typeof(fetchProducts)).toBe('function');
  });
  // test('1.2 - Teste se fetch foi chamada quando fetchProducts("computador") for executada', async () => {
  //   await fetchProducts('computador');
  //   expect(typeof(fetchProducts)).toBe('function');
  //   });
  fail('Teste vazio');
});
