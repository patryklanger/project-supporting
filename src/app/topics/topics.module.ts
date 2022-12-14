import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicsRoutingModule } from './topics-routing.module';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AddTopicComponent } from './add-topic/add-topic.component';
import { AllTopicComponent } from './all-topic/all-topic.component';
import { LongTextPipe } from './pipes/long-text.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TopicsResolver } from './topics.resolver';
import { EffectsModule } from '@ngrx/effects';
import { TopicsEffects } from './store/topics.effects';
import { StoreModule } from '@ngrx/store';
import { topicsReducer } from './store/reducers/index';
import { TopicCardComponent } from './topic-card/topic-card.component';
import { MatIconModule } from '@angular/material/icon';
import { TopicDetailsComponent } from './topic-details/topic-details.component';
import { DialogService } from '../shared/services/dialog.service';
import { TopicFormComponent } from './topic-form/topic-form.component';
import { EditTopicComponent } from './edit-topic/edit-topic.component';

@NgModule({
  declarations: [
    AddTopicComponent,
    AllTopicComponent,
    LongTextPipe,
    TopicCardComponent,
    TopicDetailsComponent,
    TopicFormComponent,
    EditTopicComponent,
  ],
  imports: [
    CommonModule,
    TopicsRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule,
    MatMenuModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
  ],
  exports: [AddTopicComponent, AllTopicComponent],
  providers: [TopicsResolver, DialogService],
})
export class TopicsModule {}
