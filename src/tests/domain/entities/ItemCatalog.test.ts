import ItemCatalog from '../../../domain/entity/ItemCatalog';

describe('ItemCatalog', () => {
  it('deve criar um item com descrição e valor', () => {
    const item = new ItemCatalog('Resistor 10k', 0.25);

    expect(item.descricao).toBe('Resistor 10k');
    expect(item.valor).toBe(0.25);
  });
});
