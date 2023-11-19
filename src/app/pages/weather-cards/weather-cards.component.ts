import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ResumedData } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-cards',
  templateUrl: './weather-cards.component.html',
  styleUrls: ['./weather-cards.component.scss'],
  standalone: true,
  imports: [ CommonModule ]
})
export class WeatherCardsComponent {
  @Input({ required: true }) resumedData?: ResumedData | null;
  @Input({ required: true }) isTemperatureCard!: boolean;
}
