import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, Observable, shareReplay, tap } from 'rxjs';
import { Group } from '../../model/group.model';
import { GroupsState } from 'src/app/groups/store/reducers';
import { selectAllGroups } from '../../store/groups.selectors';
import { MatDialog } from '@angular/material/dialog';
import { AddStudentsComponentComponent } from './../add-students-component/add-students-component.component';
import { ChangeGroupStateComponent } from './../change-group-state/change-group-state.component';
import { ChangeGroupDialogData } from './../change-group-state/utils/change-group-dialog-data';
import { CreateMeetingDialogComponent } from './../create-meeting-dialog/create-meeting-dialog.component';
import { GroupsActions } from '../../store/action-types';
import { GroupState } from '../../utils/groupState.model';
import { ChangeMarkDialogComponent } from './../change-mark-dialog/change-mark-dialog.component';
import { Meeting } from 'src/app/model/meeting.model';
import { MeetingDialogComponent } from './../meeting-dialog/meeting-dialog.component';
import { GroupService } from './../../services/group.service';
import { FileUploadDialogComponent } from './../file-upload-dialog/file-upload-dialog.component';
import { AuthState } from 'src/app/store/reducers';
import { hasLecturerRole } from 'src/app/store/app.selectors';
import { hasAdminRole, hasStudentRole } from './../../../store/app.selectors';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss'],
})
export class GroupDetailsComponent implements OnInit {
  group$: Observable<Group>;

  groupId: number;

  groupState: string;

  meetings: Meeting[];

  currentlyInGroup: string[] = [];

  error: string | null = null;

  openState = GroupState.OPEN;

  regState = GroupState.REG;

  closeState = GroupState.CLOSE;

  hasLecturerRole$: Observable<boolean>;

  hasAdminRole$: Observable<boolean>;

  hasStudentRole$: Observable<boolean>;

  isFull: boolean;

  constructor(
    private authStore: Store<AuthState>,
    private groupService: GroupService,
    private route: ActivatedRoute,
    private store: Store<GroupsState>,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.hasLecturerRole$ = this.authStore.select(hasLecturerRole);

    this.hasAdminRole$ = this.authStore.select(hasAdminRole);

    this.hasStudentRole$ = this.authStore.select(hasStudentRole);
  }

  openAddStudentsDialog(): void {
    const dialogRef = this.dialog.open(AddStudentsComponentComponent, {
      width: '80vw',
      maxWidth: '550px',
      data: {
        groupId: this.groupId,
        studentIdsInGroup: this.currentlyInGroup,
      },
    });
    dialogRef.afterClosed().subscribe((event) => {
      this.store.dispatch(GroupsActions.getGroupByIdInit({ id: this.groupId }));
    });
  }

  openChangeGroupStateDialog() {
    const dialogRef = this.dialog.open(ChangeGroupStateComponent, {
      width: '50vw',
      maxWidth: '300px',
      data: {
        groupId: this.groupId,
        currentState: this.groupState,
        isFull: this.isFull,
      },
    });
    dialogRef.afterClosed().subscribe((event) => {
      this.store.dispatch(GroupsActions.getGroupByIdInit({ id: this.groupId }));
    });
  }
  changeMarkClick(studentId: string) {
    const dialogRef = this.dialog.open(ChangeMarkDialogComponent, {
      width: '50vw',
      maxWidth: '550px',
      data: { groupId: this.groupId, studentId: studentId },
    });
  }

  signUpClicked() {
    this.store.dispatch(
      GroupsActions.signUpToGroupInit({ groupId: this.groupId })
    );
  }

  openUploadFileDialog() {
    const dialogRef = this.dialog.open(FileUploadDialogComponent, {
      width: '50vw',
      maxWidth: '550px',
      data: { groupId: this.groupId },
    });
  }
  generatePdf() {
    this.store.dispatch(
      GroupsActions.generatePdfInit({ groupId: this.groupId })
    );
  }

  downloadFile(filepath: string) {
    this.groupService.downloadFileFromServer(this.groupId, filepath);
  }

  openPresenceDialog(meetingId: number) {
    const meeting = this.meetings.find((meeting) => meeting.id == meetingId);
    const dialogRef = this.dialog.open(MeetingDialogComponent, {
      width: '50vw',
      data: { meeting },
    });
    dialogRef.afterClosed().subscribe((event) => {
      this.store.dispatch(GroupsActions.getGroupByIdInit({ id: this.groupId }));
    });
  }

  openCreateMeetingDialog() {
    const dialogRef = this.dialog.open(CreateMeetingDialogComponent, {
      width: '50vw',
      data: { groupId: this.groupId },
    });
    dialogRef.afterClosed().subscribe((event) => {
      this.store.dispatch(GroupsActions.getGroupByIdInit({ id: this.groupId }));
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (typeof Number(id) != 'number') this.router.navigateByUrl('/');
    let numId: number = +id;
    this.group$ = this.store.pipe(
      select(selectAllGroups),
      map((groups) => {
        const group = groups.find((group) => group.id == numId);
        return group;
      }),
      tap((group) => {
        if (!group) {
          this.error = 'Group with given id not found!';
          return;
        }
        this.currentlyInGroup = group.students.map((student) => student.id);
        this.groupState = group.groupState;
        this.groupId = group.id;
        this.meetings = group.meetings;
        this.isFull = group.maxSize == group.students.length;
      })
    );
  }
}
