import CatalogRepository from '../../domain/repositories/CatalogRepository';
import ItemCatalog from '../../domain/entities/ItemCatalog';
import catalog from './catalog.json';

export default class CatalogoJsonRepository implements CatalogRepository {
  getAll(): ItemCatalog[] {
    return catalog.map(
      (item: any) => new ItemCatalog(item.descricao, item.valor),
    );
  }
}
