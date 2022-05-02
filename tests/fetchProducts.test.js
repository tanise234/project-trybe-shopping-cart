require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  test('1.1 - Teste se fetchProducts é uma função', async () => {
    await expect(typeof fetchProducts).toBe('function');
  });
  test('1.2 - Teste se fetch foi chamada quando fetchProducts("computador") for executada', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  test('1.3 - Teste se fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador" quando fetchProducts("computador") for executada', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(
      'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    );
  });
  test('1.4 - Teste se é retornada uma estrutura de dados igual ao objeto computadorSearch quando fetchProducts("computador") for executada', async () => {
    const result = await fetchProducts('computador');
    expect(result).toMatchObject(computadorSearch);
  });
  test('1.5 - Teste se quando fetchProducts for chamada sem parâmetros, retorna um erro com a mensagem: You must provide an url', async () => {
    const result = await fetchProducts();
    expect(result).toEqual(new Error('You must provide an url'));
  });
 });
