import { Component, Input } from '@angular/core';
import { IForecast } from 'src/app/types/weather.model';

@Component({
  selector: 'three-hour-forecast',
  templateUrl: './three-hour-forecast.component.html',
  styleUrls: ['./three-hour-forecast.component.scss'],
})
export class ThreeHourForecastComponent {
  @Input() forecast!: IForecast;
}
