import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeGroupStateComponent } from './change-group-state.component';

describe('ChangeGroupStateComponent', () => {
  let component: ChangeGroupStateComponent;
  let fixture: ComponentFixture<ChangeGroupStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeGroupStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeGroupStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
