import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLecturerFormComponent } from './new-lecturer-form.component';

describe('NewLecturerFormComponent', () => {
  let component: NewLecturerFormComponent;
  let fixture: ComponentFixture<NewLecturerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewLecturerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLecturerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
