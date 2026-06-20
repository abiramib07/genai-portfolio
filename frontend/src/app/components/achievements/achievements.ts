import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartComponent } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import * as HighchartsMore from 'highcharts/highcharts-more';
import * as SolidGauge from 'highcharts/modules/solid-gauge';

(HighchartsMore as any)(Highcharts);
(SolidGauge as any)(Highcharts);

@Component({
  selector: 'app-achievements',
  imports: [CommonModule, HighchartsChartModule],
  templateUrl: './achievements.html',
  styleUrl: './achievements.scss'
})
export class AchievementsComponent implements OnChanges {
  @Input() achievements: any[] = [];
  Highcharts = Highcharts;
  gaugeOptions: Highcharts.Options[] = [];

  private metricToNum(val: string): number {
    const n = parseFloat(val.replace('%', '').replace('+', ''));
    return isNaN(n) ? 80 : Math.min(n, 100);
  }

  ngOnChanges() {
    if (!this.achievements.length) return;
    this.gaugeOptions = this.achievements.map(a => ({
      chart: { type: 'solidgauge', backgroundColor: 'transparent', height: 180, margin: [0,0,0,0] },
      title: { text: '' },
      pane: { center: ['50%','85%'], size:'140%', startAngle:-90, endAngle:90, background: [{ backgroundColor:'rgba(99,102,241,0.08)', innerRadius:'60%', outerRadius:'100%', shape:'arc', borderWidth:0 }] },
      yAxis: { min:0, max:100, lineWidth:0, tickWidth:0, labels:{ enabled:false }, stops:[[0.2,'#6366f1'],[0.6,'#818cf8'],[1,'#22d3ee']] },
      series: [{ type:'solidgauge', data:[this.metricToNum(a.metric)], dataLabels:{ format:'<div style="text-align:center"><span style="font-size:1.6rem;font-weight:900;color:#e2e8f0;font-family:Inter">' + a.metric + '</span></div>', borderWidth:0, y:-28 }, tooltip:{ valueSuffix:'' } }],
      credits:{ enabled:false }, legend:{ enabled:false }
    }));
  }
}
