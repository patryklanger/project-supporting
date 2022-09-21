import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TopicsState } from './reducers';
import * as fromTopics from './reducers/index';

export const selectTopicsState = createFeatureSelector<TopicsState>('topics');

export const selectAllTopics = createSelector(
  selectTopicsState,
  fromTopics.selectAll
);

export const selectTopicsPagination = createSelector(
  selectTopicsState,
  (state) => state.pagination
);

export const selectTopicPagesAmount = createSelector(
  selectTopicsState,
  (state) => {
    return Math.ceil(state.pagination.totalCount / state.limit);
  }
);

export const selectTopicPageLimit = createSelector(
  selectTopicsState,
  (state) => state.limit
);

export const selectTopicResetFormFlag = createSelector(
  selectTopicsState,
  (state) => state.resetForm
);
