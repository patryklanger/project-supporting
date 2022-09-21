import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Student } from '../../model/student.model';
import { Pagination } from 'src/app/model/pagination.model';
import { createReducer, on } from '@ngrx/store';
import { StudentActions } from '../action-types';

export interface StudentsState extends EntityState<Student> {
  pagination: Pagination;
  limit: number;
}

export const adapter = createEntityAdapter<Student>({});

export const initialStudentsState = adapter.getInitialState({
  pagination: {
    count: 0,
    totalCount: 0,
    startElement: 0,
  },
  limit: 20,
});

export const studentReducer = createReducer(
  initialStudentsState,
  on(StudentActions.getStudentsSuccess, (state, action) =>
    adapter.addMany(action.students.results, {
      ...state,
      pagination: {
        count: action.students.count,
        totalCount: action.students.totalCount,
        startElement: action.students.startElement,
      },
    })
  ),
  on(StudentActions.addStudentSuccess, (state, action) =>
    adapter.addOne(action.student, {
      ...state,
      pagination: {
        ...state.pagination,
        totalCount: state.pagination.totalCount + 1,
      },
    })
  ),
  on(StudentActions.getStudentByIdSuccess, (state, action) =>
    adapter.addOne(action.student, {
      ...state,
      pagination: {
        ...state.pagination,
        totalCount: state.pagination.totalCount + 1,
      },
    })
  ),
  on(StudentActions.deleteStudentSuccess, (state, action) =>
    adapter.removeOne(action.id, {
      ...state,
      pagination: {
        ...state.pagination,
        totalCount: state.pagination.totalCount - 1,
      },
    })
  ),
  on(StudentActions.editStudentSuccess, (state, action) =>
    adapter.setOne(action.student, state)
  )
);

export const { selectAll } = adapter.getSelectors();
