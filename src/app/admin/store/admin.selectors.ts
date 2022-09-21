import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAdmins from './reducers/admin.reducer';

export const selectAdminState =
  createFeatureSelector<fromAdmins.AdminState>('admins');

export const selectAllAdmins = createSelector(
  selectAdminState,
  fromAdmins.selectAll
);

export const selectAdminsPagination = createSelector(
  selectAdminState,
  (state) => state.pagination
);

export const selectAdminsPagesAmount = createSelector(
  selectAdminState,
  (state) => {
    return Math.ceil(state.pagination.totalCount / state.limit);
  }
);

export const selectAdminsPageLimit = createSelector(
  selectAdminState,
  (state) => state.limit
);
