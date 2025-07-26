import CatalogJsonRepository from '../../../../infrastructure/repositories/CatalogJsonRepository';
import ItemCatalog from '../../../../domain/entities/ItemCatalog';

// Mock do arquivo JSON
jest.mock('../../../../infrastructure/data/catalog.json', () => [
  { descricao: 'Resistor 1kΩ 1/4W', valor: 0.15 },
  { descricao: 'Capacitor cerâmico 100nF', valor: 0.1 },
  { descricao: 'Transistor NPN BC547', valor: 0.5 },
]);

describe('CatalogJsonRepository', () => {
  let repository: CatalogJsonRepository;

  beforeEach(() => {
    repository = new CatalogJsonRepository();
  });

  describe('getAll', () => {
    it('deve retornar todos os itens do catálogo', () => {
      const items = repository.getAll();

      expect(items).toHaveLength(3);
      expect(items[0]).toBeInstanceOf(ItemCatalog);
      expect(items[1]).toBeInstanceOf(ItemCatalog);
      expect(items[2]).toBeInstanceOf(ItemCatalog);
    });

    it('deve retornar itens com descrição e valor corretos', () => {
      const items = repository.getAll();

      expect(items[0].descricao).toBe('Resistor 1kΩ 1/4W');
      expect(items[0].valor).toBe(0.15);

      expect(items[1].descricao).toBe('Capacitor cerâmico 100nF');
      expect(items[1].valor).toBe(0.1);

      expect(items[2].descricao).toBe('Transistor NPN BC547');
      expect(items[2].valor).toBe(0.5);
    });

    it('deve mapear corretamente os dados JSON', () => {
      const items = repository.getAll();

      items.forEach(item => {
        expect(item).toBeInstanceOf(ItemCatalog);
        expect(typeof item.descricao).toBe('string');
        expect(typeof item.valor).toBe('number');
        expect(item.descricao.length).toBeGreaterThan(0);
      });
    });

    it('deve implementar a interface CatalogRepository', () => {
      expect(typeof repository.getAll).toBe('function');
    });
  });
});
