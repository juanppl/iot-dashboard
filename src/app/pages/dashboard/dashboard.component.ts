import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { WeatherCardsComponent } from '../weather-cards/weather-cards.component';
import { ResumedData, WeatherService } from 'src/app/services/weather.service';
import { Page } from 'src/app/models/Page';
import { SensorReading } from 'src/app/models/SensorReading';
import { forkJoin } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, WeatherCardsComponent, MatProgressSpinnerModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  displayedColumns: string[] = ['Id', 'Temperature', 'Humidity', 'Reading Date'];
  dataSource = new MatTableDataSource<SensorReading>();

  public results?: Page<SensorReading> | null;
  public currentPage = 1;
  public pageSize = 10;
  public recordCount = 0;

  public resumedData?: ResumedData | null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public isLoading!: boolean;

  constructor(
    private weatherService: WeatherService
  ) {
    this.getTableInformation();
  }

  private getTableInformation(): void {
    this.isLoading = true;
    forkJoin({
      sensorReading: this.weatherService.getWeatherInfo(this.currentPage, this.pageSize),
      resumedData: this.weatherService.getResumedData()
    }).subscribe(({sensorReading, resumedData}) => {
      this.results = sensorReading;
      this.dataSource.data = this.results!.results;
      this.recordCount = this.results!.recordCount;

      this.resumedData = resumedData;
      this.isLoading = false;
    });
  }

  public chengePage(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.getTableInformation();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
