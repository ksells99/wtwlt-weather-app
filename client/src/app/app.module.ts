import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { WeatherSummaryComponent } from './components/weather-summary/weather-summary.component';
import { CityWeatherComponent } from './screens/city-weather/city-weather.component';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { NotFoundComponent } from './screens/not-found/not-found.component';
import { ErrorComponent } from './screens/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    WeatherSummaryComponent,
    CityWeatherComponent,
    NotFoundComponent,
    ErrorComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
