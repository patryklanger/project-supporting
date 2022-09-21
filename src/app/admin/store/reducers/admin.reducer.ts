import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Pagination } from 'src/app/model/pagination.model';
import { AdminDto } from '../../model/adminDto.model';
import { createReducer, on } from '@ngrx/store';
import { AdminActions } from '../action-types';

export const adminStateFetureKey = 'admins';

export interface AdminState extends EntityState<AdminDto> {
  pagination: Pagination;
  limit: number;
}

export const adapter = createEntityAdapter<AdminDto>({});

export const initialAdminState = adapter.getInitialState({
  pagination: {
    count: 0,
    totalCount: 0,
    startElement: 0,
  },
  limit: 20,
});

export const adminReducer = createReducer(
  initialAdminState,
  on(AdminActions.getAdminsSuccess, (state, action) =>
    adapter.addMany(action.admins.results, {
      ...state,
      pagination: {
        totalCount: action.admins.totalCount,
        startElement: action.admins.startElement,
        count: action.admins.count,
      },
    })
  )
);

export const { selectAll } = adapter.getSelectors();
