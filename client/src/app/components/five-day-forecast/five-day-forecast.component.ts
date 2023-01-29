import { Component, Input } from '@angular/core';
import { IForecast } from 'src/app/types/weather.model';

@Component({
  selector: 'five-day-forecast',
  templateUrl: './five-day-forecast.component.html',
  styleUrls: ['./five-day-forecast.component.scss'],
})
export class FiveDayForecastComponent {
  @Input() forecast!: IForecast;
}
