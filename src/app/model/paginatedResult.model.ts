import { Pagination } from './pagination.model';

export interface PaginatedResult<T> extends Pagination {
  results: T[];
}
