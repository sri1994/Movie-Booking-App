import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentBookingComponent } from './shared/components/payment-booking/payment-booking.component';
import { AuthGuard } from './core/auth/service/authguard.service';
import { ProfileComponent } from './features/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: './features/home/home.module#HomeModule'
    // loadChildren: './home/home.module#HomeModule'
  },
  { path: 'movie', loadChildren: './features/movie/movie.module#MovieModule' },
  { path: 'search', loadChildren: './features/search/search.module#SearchModule' },
  // { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'admin', loadChildren: './features/admin/admin.module#AdminModule' },
  {
    path: 'payment/:movieTitle/:theatre/:time/:seat/:total',
    component: PaymentBookingComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
