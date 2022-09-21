import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChange,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Topic } from '../model/topic';
import { Observable, tap } from 'rxjs';
import { TopicsState } from '../store/reducers';
import { select, Store } from '@ngrx/store';
import { selectAllTopics } from '../store/topics.selectors';

@Component({
  selector: 'app-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.scss'],
})
export class TopicFormComponent implements OnInit {
  @Output() newTopic = new EventEmitter<Topic>();

  @Input() topic$: Observable<Topic>;

  topic: Topic = {
    topicName: '',
    description: '',
  };

  topicForm: FormGroup;

  constructor(private store: Store<TopicsState>) {
    this.topicForm = new FormGroup({
      name: new FormControl(this.topic.topicName, [
        Validators.required,
        Validators.minLength(4),
      ]),
      description: new FormControl(
        this.topic.description,
        Validators.maxLength(3000)
      ),
    });
  }

  onFormSubmit() {
    const topic: Topic = {
      id: this.topic.id,
      topicName: this.name?.value,
      description: this.description?.value,
    };
    this.newTopic.emit(topic);
  }

  updateForm() {
    this.name.setValue(this.topic?.topicName);
    this.description.setValue(this.topic?.description);
    this.topicForm.markAllAsTouched();
  }

  resetForm() {
    this.name?.setValue('');
    this.description?.setValue('');
    Object.keys(this.topicForm.controls).forEach((key) => {
      this.topicForm.get(key)?.setErrors(null);
    });
    this.topicForm.markAsUntouched();
  }

  get name() {
    return this.topicForm.get('name');
  }

  get description() {
    return this.topicForm.get('description');
  }
  ngOnInit(): void {
    if (this.topic$) {
      this.topic$.subscribe((topic) => {
        this.topic = topic;
        this.updateForm();
      });
    }
  }
}
