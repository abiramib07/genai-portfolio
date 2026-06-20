import { Component, Input, OnChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
declare const window: any;
@Component({
  selector: 'app-skills',
  imports: [CommonModule, HighchartsChartModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss'
})
export class SkillsComponent implements OnChanges {
  @Input() skills: Record<string, string[]> = {};

  Highcharts: any = typeof window !== 'undefined' ? window.Highcharts : Highcharts;
  activeCategory = signal('');
  categories: string[] = [];
  chartOptions: Highcharts.Options = {};
  updateChart = false;

  private categoryScores: Record<string, number> = {
    'Agentic AI & Orchestration': 95,
    'LLMs & Generative AI': 92,
    'Vector Stores & Retrieval': 88,
    'AI Frameworks & ML': 82,
    'Backend & APIs': 90,
    'Databases': 78,
    'DevOps & Cloud': 75
  };

  ngOnChanges() {
    if (!this.skills || !Object.keys(this.skills).length) return;
    this.categories = Object.keys(this.skills);
    this.activeCategory.set(this.categories[0]);
    this.buildChart();
  }

  selectCategory(cat: string) {
    this.activeCategory.set(cat);
  }

  get activeSkills(): string[] {
    return this.skills[this.activeCategory()] || [];
  }

  private buildChart() {
    const cats = this.categories;
    const scores = cats.map(c => this.categoryScores[c] || 80);

    this.chartOptions = {
      chart: { polar: true, type: 'area', backgroundColor: 'transparent', height: 320 },
      title: { text: '' },
      pane: { startAngle: 0, endAngle: 360 },
      xAxis: {
        categories: cats,
        tickmarkPlacement: 'on',
        lineWidth: 0,
        labels: { style: { color: '#64748b', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace' } }
      },
      yAxis: { gridLineInterpolation: 'polygon', lineWidth: 0, min: 0, max: 100, labels: { style: { color: '#64748b' } }, gridLineColor: 'rgba(99,102,241,0.1)' },
      series: [{
        type: 'area',
        name: 'Proficiency',
        data: scores,
        color: '#6366f1',
        fillColor: { linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }, stops: [[0, 'rgba(99,102,241,0.4)'], [1, 'rgba(99,102,241,0.05)']] },
        pointPlacement: 'on',
        lineWidth: 2,
        marker: { fillColor: '#6366f1', lineColor: '#22d3ee', lineWidth: 1, radius: 4 }
      }],
      legend: { enabled: false },
      tooltip: { pointFormat: '<b>{point.value}%</b> proficiency', style: { fontFamily: 'JetBrains Mono, monospace' } },
      credits: { enabled: false }
    };
    this.updateChart = true;
  }
}
