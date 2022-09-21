import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';

import { StoreModule } from '@ngrx/store';
import { SemesterEffects } from './store/semester.effects';
import { semesterReducer } from './store/reducers/index';
import { currentSemesterReducer } from './store/reducers/current-semester';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('semesters', semesterReducer),
    StoreModule.forFeature('currentSemester', currentSemesterReducer),
    EffectsModule.forFeature([SemesterEffects]),
  ],
})
export class SemestersModule {}
