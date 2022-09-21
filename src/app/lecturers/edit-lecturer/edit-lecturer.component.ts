import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LecturersState } from '../store/reducers';
import { Store } from '@ngrx/store';
import { Lecturer } from '../models/lecturer.model';

@Component({
  selector: 'app-edit-lecturer',
  templateUrl: './edit-lecturer.component.html',
  styleUrls: ['./edit-lecturer.component.scss'],
})
export class EditLecturerComponent implements OnInit {
  userInput: Lecturer = {
    id: 0,
    firstName: '',
    lastName: '',
    subject: '',
    academicDegree: '',
    cathedral: '',
  };

  @Input() lecturerToEdit$: Observable<Lecturer>;

  @Output() editLecturer = new EventEmitter<Lecturer>();

  passwordsNotEqual = false;

  userForm: FormGroup;

  constructor(private store: Store<LecturersState>) {
    this.userForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      subject: new FormControl('', []),
      academicDegree: new FormControl('', []),
      catherdral: new FormControl('', []),
    });
  }

  onFormSubmit() {
    if (!this.userForm.valid) return;

    var lecturerToEmit: Lecturer = {
      id: this.userInput.id,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      subject: this.subject.value,
      academicDegree: this.academicDegree.value,
      cathedral: this.catherdral.value,
    };

    this.editLecturer.emit(lecturerToEmit);
  }

  get firstName() {
    return this.userForm.get('firstName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }

  get subject() {
    return this.userForm.get('subject');
  }

  get academicDegree() {
    return this.userForm.get('academicDegree');
  }

  get catherdral() {
    return this.userForm.get('catherdral');
  }
  updateForm() {
    if (!this.userInput) return;
    this.firstName.setValue(this.userInput.firstName);
    this.lastName.setValue(this.userInput.lastName);
    this.subject.setValue(this.userInput.subject);
    this.academicDegree.setValue(this.userInput.academicDegree);
    this.catherdral.setValue(this.userInput.cathedral);
  }

  ngOnInit(): void {
    if (this.lecturerToEdit$) {
      this.lecturerToEdit$.subscribe((topic) => {
        this.userInput = topic;
        this.updateForm();
      });
    }
  }
}
