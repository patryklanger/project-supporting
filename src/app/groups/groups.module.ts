import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllGroupComponent } from './components/all-group/all-group.component';
import { GroupsRoutingModule } from './groups-routing.module';
import { NewGroupComponent } from './components/new-group/new-group.component';
import { SharedModule } from './../shared/shared.module';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { GroupCardComponent } from './components/group-card/group-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { GroupDetailsComponent } from './components/group-details/group-details.component';
import { AddStudentsComponentComponent } from './components/add-students-component/add-students-component.component';
import { ChangeGroupStateComponent } from './components/change-group-state/change-group-state.component';
import { CreateMeetingDialogComponent } from './components/create-meeting-dialog/create-meeting-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ChangeMarkDialogComponent } from './components/change-mark-dialog/change-mark-dialog.component';
import { MeetingDialogComponent } from './components/meeting-dialog/meeting-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FileUploadDialogComponent } from './components/file-upload-dialog/file-upload-dialog.component';

@NgModule({
  declarations: [
    AllGroupComponent,
    NewGroupComponent,
    GroupCardComponent,
    GroupDetailsComponent,
    AddStudentsComponentComponent,
    ChangeGroupStateComponent,
    CreateMeetingDialogComponent,
    ChangeMarkDialogComponent,
    MeetingDialogComponent,
    FileUploadDialogComponent,
  ],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    SharedModule,
    TextFieldModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    MatSnackBarModule,
    MatCheckboxModule,
  ],
})
export class GroupsModule {}
