import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewLecturerFormComponent } from './components/new-lecturer-form/new-lecturer-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AddLecturerComponent } from './add-lecturer/add-lecturer.component';
import { SharedModule } from '../shared/shared.module';
import { LecturerRoutingModule } from './lecturer-routing.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { LecturerCardComponent } from './lecturer-card/lecturer-card.component';
import { AllLecturersComponent } from './all-lecturers/all-lecturers.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EditLecturerComponent } from './edit-lecturer/edit-lecturer.component';
import { EditLecturerLayComponent } from './edit-lecturer-lay/edit-lecturer-lay.component';

@NgModule({
  declarations: [
    NewLecturerFormComponent,
    AddLecturerComponent,
    LecturerCardComponent,
    AllLecturersComponent,
    EditLecturerComponent,
    EditLecturerLayComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressBarModule,
    SharedModule,
    MatIconModule,
    LecturerRoutingModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
})
export class LecturersModule {}
