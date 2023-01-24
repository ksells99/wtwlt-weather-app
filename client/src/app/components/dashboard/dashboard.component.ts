import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { IWeather } from 'src/app/types/weather.model';
import { forkJoin, map, Observable, Subscription, switchMap } from 'rxjs';
import { CitiesService } from 'src/app/services/cities.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(
    private weatherService: WeatherService,
    private citiesService: CitiesService
  ) {}

  weatherCities: IWeather[] = [];
  weatherData$!: Subscription;

  ngOnInit(): void {
    this.weatherData$ = this.getWeatherData().subscribe();
  }

  getWeatherData(): Observable<number[]> {
    return this.citiesService
      .getPopularCities()
      .pipe(
        switchMap((cities) =>
          forkJoin(
            cities.map((city) =>
              this.weatherService
                .getCurrentWeatherForCity(city.coord.lat, city.coord.lon)
                .pipe(map((x) => this.weatherCities.push(x)))
            )
          )
        )
      );
  }

  ngOnDestroy(): void {
    this.weatherData$.unsubscribe();
  }
}
