import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WeatherSummaryComponent } from './components/shared/weather/weather-summary/weather-summary.component';
import { CityWeatherComponent } from './components/city-weather/city-weather.component';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { ErrorComponent } from './components/shared/error/error/error.component';

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
