import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewStudentComponent } from './new-student/new-student.component';
import { AllStudentComponent } from './all-student/all-student.component';
import { StudentResolver } from './student.resolver';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { StudentByIdResolver } from './student-by-id.resolver';

export const studentRoutes: Routes = [
  { path: 'add', component: NewStudentComponent },
  { path: 'all', redirectTo: 'all/page/1' },
  {
    path: 'all/page/:id',
    component: AllStudentComponent,
    resolve: [StudentResolver],
  },
  {
    path: 'edit/:id',
    component: EditStudentComponent,
    resolve: [StudentByIdResolver],
  },
];

@NgModule({
  imports: [RouterModule.forChild(studentRoutes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
