import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GroupService } from './../services/group.service';
import { GroupsActions } from './action-types';
import { concatMap, map, of, catchError, tap } from 'rxjs';
import { SemesterState } from 'src/app/semesters/store/reducers';
import { Store } from '@ngrx/store';
import { selectCurrentSemester } from 'src/app/semesters/store/semester.selectors';
import {
  loadAllGroupsForSemesterErorr,
  loadAllGroupsForSemesterSuccess,
} from './groups.actions';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MeetingService } from './../services/meeting.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class GroupsEffects {
  loadGroupsBySemesterInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupsActions.loadAllGroupsForSemesterInit),
      concatMap((action) => {
        let currentSemester: number;
        this.groupsStore.select(selectCurrentSemester).subscribe((e) => {
          if (!e) currentSemester = undefined;
          else currentSemester = e.id;
        });
        if (currentSemester == undefined) {
          return of(undefined);
        }
        return this.groupsService.getGroups(
          currentSemester,
          action.page,
          action.limit
        );
      }),
      map((value) => {
        var currentSemester: number;
        if (value == undefined) {
          this._snackBar.open("You haven't provided semester!", 'OK!', {
            duration: 3000,
            horizontalPosition: 'end',
          });
          return loadAllGroupsForSemesterErorr({ error: 'No id provided!' });
        }

        this.groupsStore.select(selectCurrentSemester).subscribe((e) => {
          currentSemester = e.id;
        });
        return loadAllGroupsForSemesterSuccess({
          groups: value,
          semesterId: currentSemester,
        });
      })
    )
  );

  getGroupByIdInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupsActions.getGroupByIdInit),
      concatMap((action) => this.groupsService.getGroupById(action.id)),
      map((group) => GroupsActions.getGroupByIdSuccess({ group })),
      catchError((error: HttpErrorResponse) =>
        of(GroupsActions.getGroupByIdFail({ error: error.error.message }))
      )
    )
  );

  createGroupInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupsActions.createGroupInit),
      concatMap((action) =>
        this.groupsService.createGroup(
          action.semesterId,
          action.topicId,
          action.maxSize
        )
      ),
      map((group) => GroupsActions.createGroupSuccess({ group })),
      catchError((error: HttpErrorResponse) =>
        of(GroupsActions.createGroupFail({ error: error.error.message }))
      )
    )
  );

  createGroupSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GroupsActions.createGroupSuccess),
        tap(() =>
          this.dialogService.openDialog(
            'Success!',
            'Successfully added a group!'
          )
        )
      ),
    { dispatch: false }
  );

  createGroupFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GroupsActions.createGroupFail),
        tap((action) => this.dialogService.openDialog('Error', action.error))
      ),
    { dispatch: false }
  );

  addStudentsToGroupInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupsActions.addStudentsToGroupInit),
      concatMap((action) =>
        this.groupsService.addStudentsToGroup(
          action.groupId,
          action.studentsIds
        )
      ),
      map((group) => GroupsActions.addStudentsToGroupSuccess({ group })),
      catchError((error: string) =>
        of(
          GroupsActions.addStudentsToGroupFailure({
            error: error,
          })
        )
      )
    )
  );

  changeGroupStateInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupsActions.changeGroupStateInit),
      concatMap((action) =>
        this.groupsService.changeGroupState(action.groupId, action.state)
      ),
      map((group) => GroupsActions.changeGroupStateSuccess({ group })),
      catchError((error: HttpErrorResponse) =>
        of(
          GroupsActions.changeGroupStateFailure({ error: error.error.message })
        )
      )
    )
  );

  changeGroupStateFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupsActions.changeGroupStateFailure),
      tap((action) => this.dialogService.openDialog('Error', action.error))
    )
  );

  addMeetingForGroupInit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GroupsActions.addMeetingForGroupInit),
        concatMap((action) =>
          this.meetingService.createMeetingForGroup(action.groupId, action.time)
        )
      ),
    { dispatch: false }
  );

  changeMarkInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupsActions.changeMarkInit),
      concatMap((action) => {
        console.log('Trying');
        return this.groupsService
          .changeMark(action.groupId, action.mark, action.studentId)
          .pipe(
            map((group) => GroupsActions.changeMarkSuccess({ group })),
            catchError((error: HttpErrorResponse) =>
              of(GroupsActions.changeMarkError({ erorr: error.error.message }))
            )
          );
      }),
      catchError((error: HttpErrorResponse) =>
        of(GroupsActions.changeMarkError({ erorr: error.error.message }))
      )
    )
  );

  changeMarkError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GroupsActions.changeMarkError),
        tap((action) => this.dialogService.openDialog('Error', action.erorr))
      ),
    { dispatch: false }
  );
  changePresenceStateError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GroupsActions.changePresenceStateError),
        tap((action) => this.dialogService.openDialog('Error', action.error))
      ),
    { dispatch: false }
  );

  changePresenceStateInit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GroupsActions.changePresenceStateInit),
        concatMap((action) =>
          this.meetingService
            .changePresensceStateForMeeting(action.data, action.meetingId)
            .pipe(
              map(() => GroupsActions.changePresenceStateSuccess()),
              catchError((err) =>
                of(GroupsActions.changePresenceStateError({ error: err }))
              )
            )
        )
      ),
    { dispatch: false }
  );

  generatePdfInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupsActions.generatePdfInit),
      concatMap((action) =>
        this.groupsService.generatePdf(action.groupId).pipe(
          map((group) => GroupsActions.generatePdfSuccess({ group })),
          catchError((error: HttpErrorResponse) =>
            of(GroupsActions.generatePdfError({ error: error.error.message }))
          )
        )
      )
    )
  );

  generatePdfError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GroupsActions.generatePdfError),
        tap((action) => this.dialogService.openDialog('Error', action.error))
      ),
    { dispatch: false }
  );

  signUpToGroupInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupsActions.signUpToGroupInit),
      concatMap((action) =>
        this.groupsService.singUserToGroup(action.groupId).pipe(
          map((group) => GroupsActions.signUpToGroupSuccess({ group })),
          catchError((error: HttpErrorResponse) => {
            console.log(error);
            return of(
              GroupsActions.signUpToGroupFail({ error: error.error.message })
            );
          })
        )
      ),
      catchError((error: HttpErrorResponse) =>
        of(GroupsActions.signUpToGroupFail({ error: error.error.message }))
      )
    )
  );

  signUpToGroupFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GroupsActions.signUpToGroupFail),
        tap((action) => this.dialogService.openDialog('Error', action.error))
      ),
    { dispatch: false }
  );

  constructor(
    private meetingService: MeetingService,
    private actions$: Actions,
    private groupsService: GroupService,
    private groupsStore: Store<SemesterState>,
    private dialogService: DialogService,
    private _snackBar: MatSnackBar
  ) {}
}
