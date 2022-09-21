import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllGroupComponent } from './components/all-group/all-group.component';
import { NewGroupComponent } from './components/new-group/new-group.component';
import { AllGroupsResolver } from './all-groups.resolver';
import { GroupDetailsComponent } from './components/group-details/group-details.component';
import { GroupByIdResolver } from './group-by-id.resolver';
import { AuthGuard } from '../guard/auth.guard';

const groupsRoutes: Routes = [
  { path: '', redirectTo: 'all', pathMatch: 'full', canActivate: [AuthGuard] },
  {
    path: 'add',
    component: NewGroupComponent,
    canActivate: [AuthGuard],
    data: { roles: ['lecturer', 'admin'] },
  },
  {
    path: 'all',
    component: AllGroupComponent,
    pathMatch: 'full',
    resolve: [AllGroupsResolver],
    canActivate: [AuthGuard],
  },
  {
    path: ':id',
    component: GroupDetailsComponent,
    resolve: [GroupByIdResolver],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(groupsRoutes)],

  exports: [RouterModule],
})
export class GroupsRoutingModule {}
