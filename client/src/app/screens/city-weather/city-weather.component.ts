import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subscription, tap } from 'rxjs';
import { CitiesService } from 'src/app/services/cities.service';
import { WeatherService } from 'src/app/services/weather.service';
import {
  IForecast,
  IWeather,
  IWeatherAndForecast,
} from 'src/app/types/weather.model';

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
  threeHourForecast!: IForecast[];
  fiveDayForecast!: IForecast[];

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

        // 3 hourly forecast - we only care about first 5
        this.threeHourForecast = x.forecast.slice(0, 5);

        // 5 day forecast - get 12pm forecast for each day
        // this.fiveDayForecast = x.forecast
        //   .filter((f) => {
        //     return f.dateTimeText.match('12:00');
        //   })
        //   .slice(0, 5);

        console.log(this.threeHourForecast);
        console.log(this.fiveDayForecast);
      })
    );
  }
}
