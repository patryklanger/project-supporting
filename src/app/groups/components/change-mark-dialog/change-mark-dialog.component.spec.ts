import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMarkDialogComponent } from './change-mark-dialog.component';

describe('ChangeMarkDialogComponent', () => {
  let component: ChangeMarkDialogComponent;
  let fixture: ComponentFixture<ChangeMarkDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeMarkDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeMarkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
