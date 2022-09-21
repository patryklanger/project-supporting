export const lecturersFeatureKey = 'lecturers';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Lecturer } from './../../models/lecturer.model';
import { createReducer, on } from '@ngrx/store';
import { LecturerActions } from '../action-types';
import { Pagination } from 'src/app/model/pagination.model';

export interface LecturersState extends EntityState<Lecturer> {
  pagination: Pagination;
  limit: number;
}

export const adapter = createEntityAdapter<Lecturer>({});

export const initialLecturersState = adapter.getInitialState({
  pagination: {
    count: 0,
    totalCount: 0,
    startElement: 0,
  },
  limit: 20,
});

export const lecturersReducer = createReducer(
  initialLecturersState,
  on(LecturerActions.addLecturerSuccess, (state, action) =>
    adapter.addOne(action.lecturer, {
      ...state,
      pagination: {
        ...state.pagination,
        totalCount: state.pagination.totalCount + 1,
      },
    })
  ),
  on(LecturerActions.getLecturersSuccess, (state, action) =>
    adapter.addMany(action.lecturers.results, {
      ...state,
      pagination: {
        count: action.lecturers.count,
        totalCount: action.lecturers.totalCount,
        startElement: action.lecturers.startElement,
      },
    })
  ),
  on(LecturerActions.getLecturerByIdSuccess, (state, action) =>
    adapter.addOne(action.lecturer, state)
  ),
  on(LecturerActions.deleteLecturerInit, (state, action) =>
    adapter.removeOne(action.id, {
      ...state,
      pagination: {
        ...state.pagination,
        totalCount: state.pagination.totalCount - 1,
      },
    })
  ),
  on(LecturerActions.editLecturerSuccess, (state, action) =>
    adapter.setOne(action.lecturer, state)
  )
);

export const { selectAll, selectEntities, selectIds } = adapter.getSelectors();
