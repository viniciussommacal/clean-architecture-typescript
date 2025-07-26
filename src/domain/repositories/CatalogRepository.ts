import ItemCatalog from '../entities/ItemCatalog';

export default interface ICatalogRepository {
  getAll(): ItemCatalog[];
}
