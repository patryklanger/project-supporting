import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdminUserState } from './reducers/index';
import * as fromAdminUsers from './reducers/index';

export const selectAdminUserState = createFeatureSelector<AdminUserState>(
  fromAdminUsers.adminUserStateFeatureKey
);

export const selectAllAdminUsers = createSelector(
  selectAdminUserState,
  fromAdminUsers.selectAll
);
