import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLecturerLayComponent } from './edit-lecturer-lay.component';

describe('EditLecturerLayComponent', () => {
  let component: EditLecturerLayComponent;
  let fixture: ComponentFixture<EditLecturerLayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLecturerLayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLecturerLayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
