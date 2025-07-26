import CatalogRepository from '../../domain/repositories/CatalogRepository';
import ItemCatalog from '../../domain/entities/ItemCatalog';
import catalog from '../data/catalog.json';

export default class CatalogJsonRepository implements CatalogRepository {
  getAll(): ItemCatalog[] {
    return catalog.map(item => new ItemCatalog(item.descricao, item.valor));
  }
}
