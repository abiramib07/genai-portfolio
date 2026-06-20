import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience',
  imports: [CommonModule],
  templateUrl: './experience.html',
  styleUrl: './experience.scss'
})
export class ExperienceComponent {
  @Input() experience: any[] = [];
  expandedProject = signal<string | null>(null);

  toggleProject(key: string) {
    this.expandedProject.set(this.expandedProject() === key ? null : key);
  }

  projectKey(jobIdx: number, projIdx: number) { return `${jobIdx}-${projIdx}`; }
}
