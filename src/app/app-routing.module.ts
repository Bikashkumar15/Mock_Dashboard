import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './core/component/account/account.component';
import { DashboardComponent } from './core/component/dashboard/dashboard.component';
import { AuthGuardService } from './core/services/auth-guard.service';
import { DataResolverService } from './core/services/data-resolver.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'account/login',
    pathMatch: 'full',
  },

  {
    path: 'account',
    component: AccountComponent,
    data: { pageTitle: 'Account Master Page' },
    children: [
      {
        path: 'login',
        data: { pageTitle: 'Login Page' },
        loadChildren: () =>
          import('./pages/login/login.module').then(
            (m) => m.LoginModule
          ),
      },
      {
        path: 'forgot-password',
        data: { pageTitle: 'Forgot Password Page' },
        loadChildren: () =>
          import('./pages/login/login.module').then(
            (m) => m.LoginModule
          ),
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate:[AuthGuardService],
    resolve:{
      user:DataResolverService
    },
    data: { pageTitle: 'Dashboard Master Layout' },
    children: [
      {
        path: '',
        data: { pageTitle: 'Dashboard Summary' },
        loadChildren: () => import('./pages/summary/summary.module').then(m => m.SummaryModule)
      },
      {
        path: 'pwstable',
        data:{pageTitle:'Reports'},
        loadChildren:()=>import('./pages/pws-table/psw-table.module').then(m=>m.PswTableModule)
      },
    
      {
        path: 'device',
        data:{pageTitle:'Devices'},
        loadChildren:()=>import('./pages/device/device.module').then(m=>m.DeviceModule)
    
      }
      
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}