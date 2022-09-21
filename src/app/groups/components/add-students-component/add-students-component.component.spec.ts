import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentsComponentComponent } from './add-students-component.component';

describe('AddStudentsComponentComponent', () => {
  let component: AddStudentsComponentComponent;
  let fixture: ComponentFixture<AddStudentsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStudentsComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
