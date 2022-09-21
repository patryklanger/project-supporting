import { Routes, RouterModule } from '@angular/router';
import { AddLecturerComponent } from './add-lecturer/add-lecturer.component';
import { AuthGuard } from './../guard/auth.guard';
import { NgModule } from '@angular/core';
import { AllLecturersComponent } from './all-lecturers/all-lecturers.component';
import { LecturerResolver } from './lecturer.resolver';
import { LecturerByIdResolver } from './lecturer-by-id.resolver';
import { EditLecturerLayComponent } from './edit-lecturer-lay/edit-lecturer-lay.component';

const lecturerRoutes: Routes = [
  {
    path: 'add',
    component: AddLecturerComponent,
    canActivate: [AuthGuard],
    data: { roles: ['lecturer', 'admin'] },
  },
  { path: 'all', redirectTo: 'all/page/1' },
  {
    path: 'all/page/:id',
    component: AllLecturersComponent,
    canActivate: [AuthGuard],
    resolve: { topics: LecturerResolver },
  },
  {
    path: 'edit/:id',
    component: EditLecturerLayComponent,
    canActivate: [AuthGuard],
    data: { roles: ['lecturer', 'admin'] },
    resolve: { topics: LecturerByIdResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(lecturerRoutes)],

  exports: [RouterModule],
})
export class LecturerRoutingModule {}
