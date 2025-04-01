import { FilterRequest } from './filter-request.model';
import { PageRequest } from './page-request.model';
import { SortRequest } from './sort-request.model';

export interface SearchFilter {
  filters?: FilterRequest[];
  pageRequest?: PageRequest;
  sortRequest?: SortRequest;
}
