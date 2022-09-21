import { createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { AdminUser } from './../../model/adminUser.model';
import { Pagination } from '../../../model/pagination.model';
import { AdminUserActions } from '../action-types';

export const adminUserStateFeatureKey = 'adminUserState';

export interface AdminUserState extends EntityState<AdminUser> {
  pagination: Pagination;
}

export const adapter = createEntityAdapter<AdminUser>({});

export const initialAdminUserState = adapter.getInitialState({
  pagination: null,
});

export const adminUserReducers = createReducer(
  initialAdminUserState,
  on(AdminUserActions.getAllUsersSuccess, (state, action) =>
    adapter.addMany(action.paginatedUsers.results, {
      ...state,
      pagination: {
        count: action.paginatedUsers.count,
        totalCount: action.paginatedUsers.totalCount,
        startElement: action.paginatedUsers.startElement,
      },
    })
  ),
  on(AdminUserActions.deleteUserInit, (state, action) =>
    adapter.removeOne(action.id, {
      ...state,
      pagination: {
        ...state.pagination,
        totalCount: state.pagination.totalCount - 1,
      },
    })
  )
);

export const { selectAll } = adapter.getSelectors();
