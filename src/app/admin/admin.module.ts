import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllUserComponent } from './components/all-user/all-user.component';
import { AdminRoutingModule } from './admin-routing.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import * as fromAdminUserState from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { AdminUserEffects } from './store/adminUser.effects';
import { UserCardComponent } from './components/user-card/user-card.component';
import { MatIconModule } from '@angular/material/icon';
import { AdminEffects } from './store/admin.effects';
import { adminReducer } from './store/reducers/admin.reducer';
import { AdminCardComponent } from './components/admin-card/admin-card.component';
import { AllAdminComponent } from './components/all-admin/all-admin.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NewAdminFormComponent } from './new-admin-form/new-admin-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AllUserComponent,
    UserCardComponent,
    AdminCardComponent,
    AllAdminComponent,
    NewAdminFormComponent,
    AddAdminComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    SharedModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forFeature(
      fromAdminUserState.adminUserStateFeatureKey,
      fromAdminUserState.adminUserReducers
    ),
    StoreModule.forFeature('admins', adminReducer),

    EffectsModule.forFeature([AdminUserEffects, AdminEffects]),
  ],
})
export class AdminModule {}
