import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IWeather, ServerWeather } from '../types/weather.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  // will take in lat/long
  getCurrentWeatherForCity(lat: number, long: number): Observable<IWeather> {
    return this.http
      .get<ServerWeather>(`/api?lat=${lat}&lon=${long}&units=metric`)
      .pipe(
        map((x) => {
          // Map the server data to custom object to only give us what we need
          return <IWeather>{
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
          };
        })
      );
  }
}
