import { Component, OnInit, signal } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar';
import { HeroComponent } from './components/hero/hero';
import { AboutComponent } from './components/about/about';
import { SkillsComponent } from './components/skills/skills';
import { ExperienceComponent } from './components/experience/experience';
import { AchievementsComponent } from './components/achievements/achievements';
import { EducationComponent } from './components/education/education';
import { ContactComponent } from './components/contact/contact';

import { PortfolioService } from './core/services/portfolio';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent, HeroComponent, AboutComponent, SkillsComponent,
    ExperienceComponent, AchievementsComponent, EducationComponent, ContactComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  data = signal<any>(null);

  constructor(private portfolio: PortfolioService) {}

  ngOnInit() {
    this.portfolio.getAll().subscribe(d => this.data.set(d));
  }
}
