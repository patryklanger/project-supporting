import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllLecturersComponent } from './all-lecturers.component';

describe('AllLecturersComponent', () => {
  let component: AllLecturersComponent;
  let fixture: ComponentFixture<AllLecturersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllLecturersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllLecturersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
