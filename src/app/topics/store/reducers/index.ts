import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Pagination } from 'src/app/model/pagination.model';
import { Topic } from '../../model/topic';
import { TopicActions } from '../action-types';

export const topicsFeatureKey = 'topics';

export interface TopicsState extends EntityState<Topic> {
  pagination: Pagination;
  limit: number;
  resetForm: boolean;
}

export const adapter = createEntityAdapter<Topic>({});

export const initialTopicsState = adapter.getInitialState({
  pagination: {
    count: 0,
    totalCount: 0,
    startElement: 0,
  },
  limit: 20,
  resetForm: false,
});

export const topicsReducer = createReducer(
  initialTopicsState,

  on(TopicActions.allTopicsLoaded, (state, action) =>
    adapter.addMany(action.topics.results, {
      ...state,
      pagination: {
        count: action.topics.count,
        totalCount: action.topics.totalCount,
        startElement: action.topics.startElement,
      },
    })
  ),
  on(TopicActions.loadTopicsFromObjectArray, (state, action) =>
    adapter.addMany(action.topics.results, {
      ...state,
      pagination: {
        count: action.topics.count,
        totalCount: action.topics.totalCount,
        startElement: action.topics.startElement,
      },
    })
  ),
  on(TopicActions.deleteTopic, (state, action) =>
    adapter.removeOne(action.topicId, {
      ...state,
      pagination: {
        ...state.pagination,
        totalCount: state.pagination.totalCount - 1,
      },
    })
  ),
  on(TopicActions.editTopicSuccess, (state, action) =>
    adapter.setOne(action.topic, state)
  ),
  on(TopicActions.topicLoadingSuccess, (state, action) =>
    adapter.addOne(action.topic, state)
  ),
  on(TopicActions.creatingNewTopicSuccess, (state, action) =>
    adapter.addOne(action.topic, {
      ...state,
      pagination: {
        ...state.pagination,
        totalCount: state.pagination.totalCount + 1,
      },
      resetForm: true,
    })
  ),
  on(TopicActions.creatingNewTopicFormReseted, (state) => {
    return {
      ...state,
      resetForm: false,
    };
  })
);

export const { selectAll, selectEntities, selectIds } = adapter.getSelectors();
