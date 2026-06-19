import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { GradeSummary } from '../../model/note/grade-summary';

Chart.register(...registerables);

@Component({
  selector: 'app-grade-chart',
  imports: [BaseChartDirective],
  standalone: true,
  templateUrl: './grade-chart.html',
  styleUrl: './grade-chart.css',
})
export class GradeChart implements OnChanges {
  @Input() gradeSummary: GradeSummary[] | null = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        label: 'Average grade',
        data: [],
      },
    ],
  };
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 10,
      },
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['gradeSummary']) {
      const summary = this.gradeSummary ?? [];

      this.barChartData = {
        labels: summary.map((x) => x.date),
        datasets: [
          {
            label: 'Average grade',
            data: summary.map((x) => x.averageGrade),
          },
        ],
      };
    }
  }
}
