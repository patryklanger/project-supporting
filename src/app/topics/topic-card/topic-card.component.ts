import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Topic } from '../model/topic';
import { TopicsState } from '../store/reducers';
import { deleteTopic } from '../store/topics.actions';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/store/reducers';
import { hasStudentRole } from './../../store/app.selectors';

@Component({
  selector: 'app-topic-card',
  templateUrl: './topic-card.component.html',
  styleUrls: ['./topic-card.component.scss'],
})
export class TopicCardComponent implements OnInit {
  @Input() topic: Topic;

  hasStudentRole$: Observable<boolean>

  constructor(private router: Router, private store: Store<TopicsState>, private authStore: Store<AuthState>) {}

  showTopicDetails() {
    this.router.navigateByUrl(`/topic/${this.topic.id}`);
  }

  editTopic() {
    this.router.navigateByUrl(`topic/edit/${this.topic.id}`);
  }

  deleteTopic() {
    this.store.dispatch(deleteTopic({ topicId: `${this.topic.id}` }));
  }

  ngOnInit(): void {
    this.hasStudentRole$ = this.authStore.select(hasStudentRole)
  }
}
