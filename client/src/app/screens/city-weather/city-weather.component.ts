import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subscription, tap } from 'rxjs';
import { CitiesService } from 'src/app/services/cities.service';
import { WeatherService } from 'src/app/services/weather.service';
import { IWeather, IWeatherAndForecast } from 'src/app/types/weather.model';

@Component({
  selector: 'app-city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.scss'],
})
export class CityWeatherComponent implements OnInit {
  constructor(
    private weatherService: WeatherService,
    private citiesService: CitiesService,
    private route: ActivatedRoute
  ) {}

  currentWeather!: IWeather;

  weatherData$!: Subscription;

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.weatherData$ = this.getWeatherData(id).subscribe();
    // this.weatherService.getWeatherForecastForCity(id).subscribe();
  }

  getWeatherData(id: number): Observable<void> {
    return this.weatherService.getWeatherForecastForCity(id).pipe(
      map((x: IWeatherAndForecast) => {
        this.currentWeather = x.current;
      })
    );
  }
}
