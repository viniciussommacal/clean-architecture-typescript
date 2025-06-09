import ItemCatalog from '../entity/ItemCatalog';

export default interface ICatalogRepository {
  getAll(): ItemCatalog[];
}
