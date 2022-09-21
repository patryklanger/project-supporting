import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GroupsState } from './reducers';
import * as fromGroups from './reducers';

export const selectGroupState = createFeatureSelector<GroupsState>('groups');

export const selectAllGroups = createSelector(
  selectGroupState,
  fromGroups.selectAll
);

export const selectGroupsPagination = createSelector(
  selectGroupState,
  (state) => state.pagination
);

export const selectGroupsCount = createSelector(
  selectGroupState,
  (state) => state.pagination.count
);

export const selectGroupsTotalCount = createSelector(
  selectGroupState,
  (state) => state.pagination.totalCount
);

export const selectGroupsPagesAmount = createSelector(
  selectGroupState,
  (state) => {
    return Math.ceil(state.pagination.totalCount / state.limit);
  }
);

export const selectGroupsPageLimit = createSelector(
  selectGroupState,
  (state) => state.limit
);
