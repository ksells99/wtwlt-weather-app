import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { ICity } from '../types/city.model';

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  constructor(private http: HttpClient) {}

  getPopularCities(): Observable<ICity[]> {
    console.log('hello');
    return this.http.get<ICity[]>(`/api/cities/popular`);
    // .pipe(tap((x) => console.log(x)));
  }
}
