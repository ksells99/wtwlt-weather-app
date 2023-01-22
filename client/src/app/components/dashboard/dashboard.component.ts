import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { IWeather } from 'src/app/types/weather.model';
import { ICity } from 'src/app/types/city.model';
import popularCities from '../../../assets/cities/popular-cities.json';
import { combineLatest, forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private weatherService: WeatherService) {}

  weatherCities: IWeather[] = [];
  weatherData$!: Observable<IWeather>[];

  ngOnInit(): void {
    this.weatherData$ = popularCities.map((city) =>
      this.weatherService.getCurrentWeatherForCity(
        city.coord.lat,
        city.coord.lon
      )
    );

    combineLatest([...this.weatherData$]).subscribe((x: IWeather[]) => {
      console.log(x);
      x.map((y) => this.weatherCities.push(y));
    });
  }
}
