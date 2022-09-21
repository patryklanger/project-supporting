// import 'hammerjs';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MenuComponent } from './components/menu/menu.component';
import { OkDialogComponent } from './shared/dialog/ok-dialog/ok-dialog.component';
import { CollapseElement } from './components/menu/menu.component';
import { HomePageComponent } from './pages/home/home-page/home-page.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import * as fromAuth from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './store/app.effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { reducers } from './store/app-store';
import { metaReducers } from './store/app-store/index';
import { DialogService } from './shared/services/dialog.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from './shared/shared.module';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

import { TopicService } from './topics/services/topic.service';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { SemestersModule } from './semesters/semesters.module';
import { topicsReducer } from './topics/store/reducers/index';
import { TopicsEffects } from './topics/store/topics.effects';
import { lecturersReducer } from './lecturers/store/reducers/index';
import { LecturerEffects } from './lecturers/store/lecturer.effects';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { groupsFeatureKey } from './groups/store/reducers/index';
import { groupsReducer } from './groups/store/reducers/index';
import { GroupsEffects } from './groups/store/groups.effects';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CollapseElement,
    HomePageComponent,
    ProfileComponent,
    ErrorPageComponent,
  ],
  imports: [
    BrowserModule,
    OAuthModule.forRoot(),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictActionSerializability: true,
        strictStateSerializability: true,
      },
    }),
    !environment.production
      ? StoreDevtoolsModule.instrument()
      : [EffectsModule],
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.authReducer),
    StoreModule.forFeature('topics', topicsReducer),
    StoreModule.forFeature('lecturers', lecturersReducer),
    StoreModule.forFeature(groupsFeatureKey, groupsReducer),
    EffectsModule.forRoot([
      AppEffects,
      TopicsEffects,
      LecturerEffects,
      GroupsEffects,
    ]),
    SemestersModule,
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal,
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    SharedModule,
    HttpClientModule,
    MatTooltipModule,
    FormsModule,
    MatSnackBarModule,
  ],
  exports: [CollapseElement],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' },
    DialogService,
    TopicService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [OkDialogComponent],
})
export class AppModule {}
