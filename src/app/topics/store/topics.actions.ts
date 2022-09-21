import { createAction, props } from '@ngrx/store';
import { Topic } from '../model/topic';
import { PaginatedResult } from './../../model/paginatedResult.model';

export const loadAllTopics = createAction(
  '[Topics Resolver] Load Next Topics Page',
  props<{ page: number; limit: number }>()
);

export const allTopicsLoaded = createAction(
  '[Load Topics Effect] Next Page Topics Loaded',
  props<{ topics: PaginatedResult<Topic> }>()
);
export const loadTopicsFromObjectArray = createAction(
  '[Page reload] Load Topics from Local Storage',
  props<{ topics: PaginatedResult<Topic> }>()
);

export const topicLoadingSuccess = createAction(
  '[Topic effects] Adding topic to store',
  props<{ topic: Topic }>()
);

export const topicLoadingFailure = createAction(
  '[Topic effects] Cannot fetch topic with given id'
);

export const editTopicInit = createAction(
  '[Edit topic form] Edit topic init',
  props<{ topic: Topic }>()
);

export const editTopicSuccess = createAction(
  '[Edit topic form] Edit topic success',
  props<{ topic: Topic }>()
);

export const editTopicFail = createAction(
  '[Edit topic form] Edit topic fail',
  props<{ error: string }>()
);

export const deleteTopic = createAction(
  '[Topic] Delete topic',
  props<{ topicId: string }>()
);

export const loadTopicById = createAction(
  '[Topic by id resolver] Fetching topic by id',
  props<{ topicId: string }>()
);

export const initCreatingNewTopic = createAction(
  '[Add topic component] Inited adding new topic',
  props<{ topic: Topic }>()
);

export const creatingNewTopicFail = createAction(
  '[Topic effects] Creating new topic failed'
);

export const creatingNewTopicSuccess = createAction(
  '[Topic effects] Creating new topic succed',
  props<{ topic: Topic }>()
);

export const creatingNewTopicFormReseted = createAction(
  '[New Topic component] Form reseted'
);
