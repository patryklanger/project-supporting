import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Topic } from 'src/app/topics/model/topic';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { TopicService } from '../services/topic.service';
import { TopicFormComponent } from './../topic-form/topic-form.component';
import { TopicsState } from '../store/reducers';
import { Store } from '@ngrx/store';
import {
  creatingNewTopicFormReseted,
  initCreatingNewTopic,
} from './../store/topics.actions';
import { Observable } from 'rxjs';
import { selectTopicResetFormFlag } from './../store/topics.selectors';

@Component({
  selector: 'app-add-topic',
  templateUrl: './add-topic.component.html',
  styleUrls: ['./add-topic.component.scss'],
})
export class AddTopicComponent implements OnInit {
  resetForm$: Observable<boolean>;

  @ViewChild(TopicFormComponent) topicFormComponent:
    | TopicFormComponent
    | undefined;

  constructor(private store: Store<TopicsState>) {}

  onFormSubmit(event: Topic) {
    let topic: Topic = {
      topicName: event.topicName,
      description: event.description,
    };

    this.store.dispatch(initCreatingNewTopic({ topic }));
  }

  ngOnInit(): void {
    this.resetForm$ = this.store.select(selectTopicResetFormFlag);
    this.resetForm$.subscribe((e) => {
      if (e === true) {
        this.topicFormComponent.resetForm();
        this.store.dispatch(creatingNewTopicFormReseted());
      }
    });
  }
}
