import { createAction, props } from '@ngrx/store';
import { Group } from 'src/app/groups/model/group.model';
import { PaginatedResult } from 'src/app/model/paginatedResult.model';
import { GroupState } from 'src/app/groups/utils/groupState.model';
import { HttpErrorResponse } from '@angular/common/http';
import { PresenceChangeRequest } from './../model/presenceChangeRequest';

export const loadAllGroupsForSemesterInit = createAction(
  '[Groups resolver] Load Next Topics Page',
  props<{ page: number; limit: number }>()
);

export const loadAllGroupsForSemesterSuccess = createAction(
  '[Groups effects] Load Next Groups Page success',
  props<{ groups: PaginatedResult<Group>; semesterId: number }>()
);

export const loadAllGroupsForSemesterErorr = createAction(
  '[Groups effects] Load Next Groups Page Error',
  props<{ error: string }>()
);

export const createGroupInit = createAction(
  '[Groups create component] Create new group init',
  props<{ maxSize: number; semesterId: number; topicId: number }>()
);

export const createGroupSuccess = createAction(
  '[Groups effects] Create new group success',
  props<{ group: Group }>()
);

export const createGroupFail = createAction(
  '[Groups effects] Create new group failure',
  props<{ error: string }>()
);

export const getGroupByIdInit = createAction(
  '[Group resolver] Get group by id',
  props<{ id: number }>()
);

export const getGroupByIdSuccess = createAction(
  '[Group actions] Get group by id success',
  props<{ group: Group }>()
);

export const getGroupByIdFail = createAction(
  '[Group actions] Get group by id failure',
  props<{ error: string }>()
);

export const deleteAllGroups = createAction('[] Delete all groups');

export const setGroupsError = createAction(
  '[] Set groups error',
  props<{ error: string }>()
);

export const addStudentsToGroupInit = createAction(
  '[Add students dialog] Add students to group init',
  props<{ groupId: number; studentsIds: string[] }>()
);

export const addStudentsToGroupSuccess = createAction(
  '[group effects] Add students to group success',
  props<{ group: Group }>()
);

export const addStudentsToGroupFailure = createAction(
  '[group effects] Add Students to group failure',
  props<{ error: string }>()
);

export const changeGroupStateInit = createAction(
  '[Group change state dialog] Change group state init',
  props<{ groupId: number; state: GroupState }>()
);

export const changeGroupStateSuccess = createAction(
  '[Group effects] Change group state success',
  props<{ group: Group }>()
);

export const changeGroupStateFailure = createAction(
  '[Group effects] Change group state failure',
  props<{ error: string }>()
);

export const addMeetingForGroupInit = createAction(
  '[] Add meeting for a group init',
  props<{ groupId: number; time: string }>()
);

export const changeMarkInit = createAction(
  '[Group details] Change mark init',
  props<{ mark: number; studentId: string; groupId: number }>()
);
export const changeMarkSuccess = createAction(
  '[Group effects] Change mark success',
  props<{ group: Group }>()
);
export const changeMarkError = createAction(
  '[Group effects] Change mark failure',
  props<{ erorr: string }>()
);

export const changePresenceStateInit = createAction(
  '[Change presence dialog] Change presence init',
  props<{ meetingId: number; data: PresenceChangeRequest[] }>()
);

export const changePresenceStateSuccess = createAction(
  '[Group effects] Change presence success'
);

export const changePresenceStateError = createAction(
  '[Change presence dialog] Change presence error',
  props<{ error: string }>()
);

export const generatePdfInit = createAction(
  '[Group details] Generate pdf init',
  props<{ groupId: number }>()
);

export const generatePdfSuccess = createAction(
  '[Group details] Generate pdf Success',
  props<{ group: Group }>()
);

export const generatePdfError = createAction(
  '[Group details] Generate pdf failure',
  props<{ error: string }>()
);

export const signUpToGroupInit = createAction(
  '[Group details] Sign up user to group init',
  props<{ groupId: number }>()
);

export const signUpToGroupSuccess = createAction(
  '[Group details] Sign up user to group success',
  props<{ group: Group }>()
);

export const signUpToGroupFail = createAction(
  '[Group details] Sign up user to group fail',
  props<{ error: string }>()
);
