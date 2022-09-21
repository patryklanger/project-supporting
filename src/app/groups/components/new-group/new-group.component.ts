import { Component, OnInit, ViewChild } from '@angular/core';
import {
  debounceTime,
  tap,
  Observable,
  takeUntil,
  Subject,
  concatMap,
  map,
  of,
  concat,
  forkJoin,
} from 'rxjs';
import { Lecturer } from 'src/app/lecturers/models/lecturer.model';
import { FormControl } from '@angular/forms';
import { LecturerService } from './../../../lecturers/services/lecturer.service';
import { Topic } from 'src/app/topics/model/topic';
import { TopicService } from './../../../topics/services/topic.service';
import { sha1 } from '@angular/compiler/src/i18n/digest';
import { Semester } from 'src/app/model/semester.model';
import { GroupsState } from '../../store/reducers';
import { Store } from '@ngrx/store';
import { GroupsActions } from '../../store/action-types';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.scss'],
})
export class NewGroupComponent implements OnInit {
  topicSelected = false;

  selectedTopicId: string | null;

  selectedTopicName: string | null;

  topicCtrl: FormControl = new FormControl();

  topicFilterCtrl: FormControl = new FormControl();

  maxSizeCtrl: FormControl = new FormControl();

  selectedSemester: Semester | null;

  lecturers$: Observable<Lecturer[]>;

  topics$: Observable<Topic[]>;

  savedTopics$: Observable<Topic[]> = of([]);

  protected _onDestroy = new Subject<void>();

  constructor(
    private topicService: TopicService,
    private store: Store<GroupsState>
  ) {}

  onSemesterSelected(semester: Semester) {
    this.selectedSemester = semester;
  }
  onFormSubmit() {
    if (
      !this.topicCtrl.valid ||
      !this.maxSizeCtrl.valid ||
      this.selectedSemester == undefined
    )
      return;
    this.store.dispatch(
      GroupsActions.createGroupInit({
        maxSize: this.maxSizeCtrl.value,
        semesterId: this.selectedSemester.id,
        topicId: this.topicCtrl.value,
      })
    );
  }

  ngOnInit(): void {
    this.topics$ = this.topicFilterCtrl.valueChanges.pipe(
      takeUntil(this._onDestroy),
      debounceTime(500),
      concatMap(() =>
        this.topicService.getTopicByName(this.topicFilterCtrl.value)
      )
    );
  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
