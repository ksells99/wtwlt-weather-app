import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityWeatherComponent } from './screens/city-weather/city-weather.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { ErrorComponent } from './screens/error/error.component';
import { NotFoundComponent } from './screens/not-found/not-found.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'weather/city/:id', component: CityWeatherComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
