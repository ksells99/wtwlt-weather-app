import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  IForecast,
  IWeather,
  IWeatherAndForecast,
  ServerWeather,
  ServerWeatherAndForecast,
} from '../types/weather.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getCurrentWeatherForCity(lat: number, long: number): Observable<IWeather> {
    return this.http
      .get<ServerWeather>(`/api/weather?lat=${lat}&lon=${long}&units=metric`)
      .pipe(
        map((x) => {
          return this.mapServerWeatherData(x);
        })
      );
  }

  getWeatherForecastForCity(cityId: number): Observable<any> {
    return this.http
      .get<ServerWeatherAndForecast>(`/api/weather/city/${cityId}`)
      .pipe(
        map((x) => {
          // Map the server data to custom object to only give us what we need
          return <IWeatherAndForecast>{
            current: this.mapServerWeatherData(x.current),
            forecast: x.forecast.map((f) => {
              return {
                forecastDateTime: f.dt,
                dateTimeText: f.dt_text,
                temp: f.main.temp,
                feelsLike: f.main.feels_like,
                icon: f.weather[0].icon,
              } as IForecast;
            }),
          };
        })
      );
  }

  // Helper function to map incoming server data to interface
  private mapServerWeatherData(x: ServerWeather): IWeather {
    return {
      city: {
        id: x.sys.id,
        name: x.name,
        coord: {
          lat: x.coord.lat,
          long: x.coord.lon,
        },
        country: x.name,
        sunrise: x.sys.sunrise,
        sunset: x.sys.sunset,
      },
      temp: x.main.temp,
      feelsLike: x.main.feels_like,
      minTemp: x.main.temp_min,
      maxTemp: x.main.temp_max,
      pressure: x.main.pressure,
      humidity: x.main.humidity,
      summary: x.weather[0].main,
      description: x.weather[0].description,
      windSpeed: x.wind.speed,
      icon: x.weather[0].icon,
    };
  }
}
