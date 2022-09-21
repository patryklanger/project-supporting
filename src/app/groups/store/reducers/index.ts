import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Group } from 'src/app/groups/model/group.model';
import { Pagination } from 'src/app/model/pagination.model';
import { createReducer, on } from '@ngrx/store';
import { GroupsActions } from '../action-types';
export const groupsFeatureKey = 'groups';

export interface GroupsState extends EntityState<Group> {
  pagination: Pagination;
  limit: number;
  error: string | null;
  loading: boolean;
}

const adapter = createEntityAdapter<Group>({});

export const initialGroupsState: GroupsState = adapter.getInitialState({
  pagination: {
    count: 0,
    totalCount: 0,
    startElement: 0,
  },
  limit: 20,
  error: null,
  loading: false,
});

export const groupsReducer = createReducer(
  initialGroupsState,

  on(GroupsActions.loadAllGroupsForSemesterInit, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(GroupsActions.loadAllGroupsForSemesterSuccess, (state, action) =>
    adapter.addMany(action.groups.results, {
      ...state,
      loading: false,
      error: null,
      pagination: {
        count: state.pagination.count + action.groups.count,
        totalCount: action.groups.totalCount,
        startElement: action.groups.startElement,
      },
    })
  ),
  on(GroupsActions.loadAllGroupsForSemesterErorr, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),

  on(GroupsActions.createGroupSuccess, (state, action) =>
    adapter.addOne(action.group, {
      ...state,
      loading: false,
      pagination: {
        ...state.pagination,
        totalCount: state.pagination.totalCount + 1,
      },
      error: null,
    })
  ),
  on(GroupsActions.createGroupFail, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
  on(GroupsActions.deleteAllGroups, (state, action) => initialGroupsState),
  on(GroupsActions.setGroupsError, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
  on(GroupsActions.getGroupByIdSuccess, (state, action) =>
    adapter.setOne(action.group, {
      ...state,
      error: null,
    })
  ),
  on(GroupsActions.addStudentsToGroupSuccess, (state, action) =>
    adapter.setOne(action.group, {
      ...state,
      error: null,
    })
  ),
  on(GroupsActions.addStudentsToGroupFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(GroupsActions.changeGroupStateSuccess, (state, action) =>
    adapter.setOne(action.group, state)
  ),
  on(GroupsActions.changeMarkSuccess, (state, action) =>
    adapter.setOne(action.group, state)
  ),
  on(GroupsActions.generatePdfSuccess, (state, action) =>
    adapter.setOne(action.group, state)
  ),
  on(GroupsActions.signUpToGroupSuccess, (state, action) =>
    adapter.setOne(action.group, state)
  )
);

export const { selectAll, selectEntities, selectIds } = adapter.getSelectors();
