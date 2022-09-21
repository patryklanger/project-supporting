import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from './service/student.service';
import { StudentFormComponent } from './student-form/student-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { studentReducer } from './store/reducers';
import { StudentEffects } from './store/students.effects';
import { StudentRoutingModule } from './student-routing.module';
import { NewStudentComponent } from './new-student/new-student.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { AllStudentComponent } from './all-student/all-student.component';
import { StudentCardComponent } from './student-card/student-card.component';
import { MatSelectModule } from '@angular/material/select';
import { EditStudentFormComponent } from './edit-student-form/edit-student-form.component';
import { EditStudentComponent } from './edit-student/edit-student.component';

@NgModule({
  declarations: [
    StudentFormComponent,
    NewStudentComponent,
    AllStudentComponent,
    StudentCardComponent,
    EditStudentFormComponent,
    EditStudentComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    StudentRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressBarModule,
    SharedModule,
    MatIconModule,
    EffectsModule.forFeature([StudentEffects]),
    StoreModule.forFeature('students', studentReducer),
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  providers: [StudentService, DatePipe],
})
export class StudentModule {}
