import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Page } from '../models/Page';
import { SensorReading } from '../models/SensorReading';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private http: HttpClient,
  ) { }

  public getWeatherInfo(pageNumber: number, pageSize: number): Observable<Page<SensorReading> | null> {
    const url = `https://iot-juanp.somee.com/api/IoTTemperature/get-readings?PageNumber=${pageNumber}&PageSize=${pageSize}`;
    return this.http.get<Page<SensorReading>>(url).pipe(
      catchError((err) => {
        return of(null);
      })
    );
  }

  public getResumedData(): Observable<ResumedData | null> {
    const url = `https://iot-juanp.somee.com/api/IoTTemperature/get-resumed-data`;
    return this.http.get<ResumedData>(url).pipe(
      catchError((err) => {
        return of(null);
      })
    );
  }
}

export interface ResumedData {
  lastTemperature: number;
  maxTemperature: number;
  minTemperature: number;
  avgTemperature: number;
  lastHumidity: number;
  maxHumidity: number;
  minHumidity: number;
  avgHumidity: number;
}