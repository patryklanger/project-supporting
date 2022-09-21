import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { TopicsState } from '../store/reducers';
import {
  Observable,
  tap,
  first,
  filter,
  map,
  shareReplay,
  noop,
  finalize,
} from 'rxjs';
import { Topic } from '../model/topic';
import { selectAllTopics } from '../store/topics.selectors';
import { deleteTopic } from './../store/topics.actions';
import { Lecturer } from 'src/app/lecturers/models/lecturer.model';
import { LecturersState } from 'src/app/lecturers/store/reducers';
import { selectAllLecturers } from 'src/app/lecturers/store/lecturer.selectors';
import { getLecturerByIdInit } from './../../lecturers/store/lecturer.actions';
import { AuthState } from 'src/app/store/reducers';
import { hasStudentRole } from './../../store/app.selectors';

@Component({
  selector: 'app-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.scss'],
})
export class TopicDetailsComponent implements OnInit {
  loading$: Observable<boolean>;

  lecturer: Lecturer;

  topic: Topic;

  editRoute = '/topic/edit/';

  hasStudentRole$: Observable<boolean>

  constructor(
    private route: ActivatedRoute,
    private store: Store<TopicsState>,
    private router: Router,
    private authStore: Store<AuthState>
  ) {}

  deleteTopic() {
    const topicId = this.topic.id.toString();
    this.store.dispatch(deleteTopic({ topicId }));
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (typeof Number(id) != 'number') this.router.navigateByUrl('/');
    let numId: number = +id;
    this.loading$ = this.store.pipe(
      select(selectAllTopics),
      map((topics) => {
        const topic = topics.find((topic) => topic.id == numId);
        this.topic = topic;
        if (topic) {
          this.editRoute += topic.id.toString();
          this.lecturer = topic.lecturer;
        }
        return !!topic;
      }),
      shareReplay()
    );

    this.hasStudentRole$ = this.authStore.select(hasStudentRole)
  }
}
