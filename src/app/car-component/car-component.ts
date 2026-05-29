import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Car } from '../models/Cars';

@Component({
  standalone: true,
  selector: 'app-car-component',
  imports: [CommonModule ],
  templateUrl: './car-component.html',
  styleUrl: './car-component.scss',
})
export class CarComponent {

  @Input() car!: Car;
}
