import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './components/user-form/user-form.component';
import { ErrorDialogComponent } from './dialog/error-dialog/error-dialog.component';
import { OkDialogComponent } from './dialog/ok-dialog/ok-dialog.component';
import { ProgressSpinnerComponent } from './dialog/progress-spinner/progress-spinner.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SemesterSelectComponent } from './semester-select/semester-select.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    UserFormComponent,
    ErrorDialogComponent,
    OkDialogComponent,
    ProgressSpinnerComponent,
    SemesterSelectComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
  ],
  exports: [UserFormComponent, SemesterSelectComponent],
})
export class SharedModule {}
