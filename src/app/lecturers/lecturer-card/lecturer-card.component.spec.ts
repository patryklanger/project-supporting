import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerCardComponent } from './lecturer-card.component';

describe('LecturerCardComponent', () => {
  let component: LecturerCardComponent;
  let fixture: ComponentFixture<LecturerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LecturerCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
