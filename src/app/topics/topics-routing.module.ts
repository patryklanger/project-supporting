import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTopicComponent } from './add-topic/add-topic.component';
import { AllTopicComponent } from './all-topic/all-topic.component';
import { AuthGuard } from '../guard/auth.guard';
import { TopicsResolver } from './topics.resolver';
import { TopicDetailsComponent } from './topic-details/topic-details.component';
import { EditTopicComponent } from './edit-topic/edit-topic.component';
import { TopicByIdResolver } from './topic-by-id.resolver';
import { IsLoggedGuard } from '../guard/is-logged.guard';

const topicRoutes: Routes = [
  {
    path: 'add',
    component: AddTopicComponent,
    canActivate: [AuthGuard],
    data: { roles: ['lecturer'] },
  },
  { path: 'all', redirectTo: 'all/page/1' },
  {
    path: 'all/page/:id',
    component: AllTopicComponent,
    canActivate: [AuthGuard],
    resolve: { topics: TopicsResolver },
  },
  {
    path: ':id',
    component: TopicDetailsComponent,
    resolve: { topics: TopicByIdResolver },
  },
  {
    path: 'edit/:id',
    component: EditTopicComponent,
    resolve: { topics: TopicByIdResolver },
    canActivate: [AuthGuard],
    data: { roles: ['lecturer', 'admin'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(topicRoutes)],

  exports: [RouterModule],
})
export class TopicsRoutingModule {}
