require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  test('2.1 - Teste se fetchItem é uma função', async () => {
    await expect(typeof fetchItem).toBe('function');
  });
  test('2.2 - Teste se, ao chamar fetchItem("MLB1615760527"), a função fetch é chamada', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toBeCalled();
  });
  test('2.3 - Teste se, ao chamar fetchItem("MLB1615760527"), a função fetch utiliza o endpoint (https://api.mercadolibre.com/items/MLB1615760527)', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toBeCalledWith(
      'https://api.mercadolibre.com/items/MLB1615760527'
    );
  });
  test('Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toMatchObject(item);
  });
  test('2.5 - Teste se, ao chamar a função fetchItem sem argumento, , retorna um erro com a mensagem: You must provide an url', async () => {
    const result = await fetchItem();
    expect(result).toEqual(new Error('You must provide an url'));
  });
});
