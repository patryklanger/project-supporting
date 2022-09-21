import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, shareReplay, tap } from 'rxjs';
import { Topic } from '../model/topic';
import { select, Store } from '@ngrx/store';
import { TopicsState } from '../store/reducers';
import { selectAllTopics } from './../store/topics.selectors';
import { TopicService } from './../services/topic.service';
import { DialogService } from './../../shared/services/dialog.service';
import { editTopicInit } from '../store/topics.actions';

@Component({
  selector: 'app-edit-topic',
  templateUrl: './edit-topic.component.html',
  styleUrls: ['./edit-topic.component.scss'],
})
export class EditTopicComponent implements OnInit {
  topicId: string;

  topicToEdit$: Observable<Topic>;

  constructor(
    private topicService: TopicService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService,
    private store: Store<TopicsState>
  ) {}

  onFormSubmit(event: Topic) {
    this.store.dispatch(editTopicInit({ topic: event }));
  }

  fetchData(id: number) {
    this.topicToEdit$ = this.store.pipe(
      select(selectAllTopics),
      map((topics) => topics.find((topic) => topic.id == id)),
      shareReplay()
    );
  }

  ngOnInit(): void {
    this.topicId = this.activatedRoute.snapshot.paramMap.get('id');

    const id = parseInt(this.topicId);
    if (isNaN(id)) return;
    this.fetchData(id);
  }
}
