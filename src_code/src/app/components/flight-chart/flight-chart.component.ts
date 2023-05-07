import { Component, Input, ElementRef, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';

interface FlightData {
  name: string;
  count: number;
}

@Component({
  selector: 'flight-chart',
  template: `
    <div>
      <canvas #flightChart></canvas>
    </div>
  `,
  styleUrls: ['./flight-chart.component.scss']
})
export class FlightChartComponent implements OnInit {
  @ViewChild('flightChart', { static: true }) 
  private chartRef!: ElementRef<HTMLCanvasElement>;
  @Input() ourArrivalCount! : number;
  @Input() ourDepartureCount! : number;  

  private chart!: Chart;
  
  chartData : FlightData[] = [
    { name: 'Arrivals', count: this.ourArrivalCount },
    { name: 'Departures', count: this.ourDepartureCount}
  ];

  constructor() {}

  ngOnInit() {
    
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Update chart data and re-render chart
    if (this.chart && changes) {
      const chartData : FlightData[] = [
        { name: 'Arrivals', count: this.ourArrivalCount },
        { name: 'Departures', count: this.ourDepartureCount}
      ];
      this.chart.data.labels = chartData.map(d => d.name);
      this.chart.data.datasets[0].data = chartData.map(d => d.count);
      this.chart.update();
    }
  }

  private createChart() {
    const chartData : FlightData[] = [
      { name: 'Arrivals', count: this.ourArrivalCount },
      { name: 'Departures', count: this.ourDepartureCount}
    ];
    
    console.log(this.ourArrivalCount)

    if(this.ourArrivalCount !== 0 && this.ourDepartureCount !== 0) {
      const ctx = this.chartRef.nativeElement.getContext('2d');
      if (!ctx) {return;}
    
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: chartData.map(d => d.name),
          datasets: [{
            label: 'Number of Arrival and Departure of Flights in Selected Airport',
            data:chartData.map(d => d.count),
            backgroundColor: ['#ff0000', '#0000ff'],
          }]
        },
        options: {
          scales: {
            x: {
              grid: { display: true },

            },
            y: {
              grid: { color: 'rgba(0, 0, 0, 0.1)' },
              title: {
                display: true,
                text: 'Flight Counts',
              },
            }
          }}
    });
  }
}
  
}