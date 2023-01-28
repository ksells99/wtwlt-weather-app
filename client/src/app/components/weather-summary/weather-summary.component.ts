import { Component, Input } from '@angular/core';
import { IWeather } from 'src/app/types/weather.model';

@Component({
  selector: 'weather-summary',
  templateUrl: './weather-summary.component.html',
  styleUrls: ['./weather-summary.component.scss'],
})
export class WeatherSummaryComponent {
  @Input() showCityName!: boolean;
  @Input() showCurrentWeatherHeader!: boolean;
  @Input() weatherData!: IWeather;
}
