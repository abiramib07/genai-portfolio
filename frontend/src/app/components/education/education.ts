import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-education',
  imports: [CommonModule],
  templateUrl: './education.html',
  styleUrl: './education.scss'
})
export class EducationComponent {
  @Input() education: any = {};
}
