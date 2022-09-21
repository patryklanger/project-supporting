import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home-page/home-page.component';
import { ProfileComponent } from './components/profile/profile.component';
import { IsLoggedGuard } from './guard/is-logged.guard';
import { ErrorPageComponent } from './components/error-page/error-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [IsLoggedGuard],
    data: { roles: [] },
  },
  {
    path: 'topic',
    loadChildren: () =>
      import('./topics/topics.module').then((m) => m.TopicsModule),
    data: { roles: ['lecturer', 'admin', 'student'] },
    canActivate: [IsLoggedGuard],
  },
  {
    path: 'lecturer',
    loadChildren: () =>
      import('./lecturers/lecturers.module').then((m) => m.LecturersModule),
    data: { roles: ['lecturer', 'admin', 'student'] },
    canActivate: [IsLoggedGuard],
  },
  {
    path: 'student',
    loadChildren: () =>
      import('./student/student.module').then((m) => m.StudentModule),
    data: { roles: ['lecturer', 'admin'] },
    canActivate: [IsLoggedGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    data: { roles: ['admin'] },
    canActivate: [IsLoggedGuard],
  },
  {
    path: 'groups',
    loadChildren: () =>
      import('./groups/groups.module').then((m) => m.GroupsModule),
    data: { roles: ['lecturer', 'admin', 'student'] },
  },
  { path: 'error', component: ErrorPageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      relativeLinkResolution: 'legacy',
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
