import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllUserComponent } from './components/all-user/all-user.component';
import { AllAdminComponent } from './components/all-admin/all-admin.component';
import { AdminResolver } from './admin.resolver';
import { AddAdminComponent } from './add-admin/add-admin.component';

const adminRoutes: Routes = [
  { path: 'user/all', component: AllUserComponent },
  {
    path: 'admin/all',
    redirectTo: 'admin/all/page/1',
  },
  {
    path: 'admin/all/page/:id',
    component: AllAdminComponent,
    resolve: [AdminResolver],
  },
  { path: 'admin/add', component: AddAdminComponent },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
