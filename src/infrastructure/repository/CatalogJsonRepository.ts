import CatalogRepository from '../../domain/repository/CatalogRepository';
import ItemCatalog from '../../domain/entity/ItemCatalog';
import catalog from '../data/catalog.json';

export default class CatalogJsonRepository implements CatalogRepository {
  getAll(): ItemCatalog[] {
    return catalog.map(item => new ItemCatalog(item.descricao, item.valor));
  }
}
