import { AfterViewInit, Component,Input,OnInit } from '@angular/core';
import { Chart, registerables  } from 'chart.js';
import 'chartjs-adapter-moment';
@Component({
  selector: 'multiline-chart',
  templateUrl: './multiline-chart.component.html',
  styleUrls: ['./multiline-chart.component.css']
})
export class MultilineChartComponent implements AfterViewInit, OnInit  {
  chart: any;
  @Input() data:any = {};
  constructor() {
   
    
  }
  ngOnInit() {
    console.log(this.data)
    
    Chart.register(...registerables);
    this.ngAfterViewInit();
  }
  ngAfterViewInit() {
    
    let ctx: any = document.getElementById('lineChart'+this.data.id) as HTMLElement;
    let chartsdata = {
      // labels: ['match1', 'match2', 'match3', 'match4', 'match5'],
      datasets: [
        {
          label: this.data["values"][0]["label"].toUpperCase(),
          data: this.data["values"][0]["data"],
          backgroundColor: 'blue',
          borderColor: 'lightblue',
          fill: false,
          lineTension: 0,
          radius: 100,
        },
        {
          label: this.data["values"][1]["label"].toUpperCase(),
          data: this.data["values"][1]["data"],
          backgroundColor: 'green',
          borderColor: 'lightgreen',
          fill: false,
          lineTension: 0,
          radius: 5,
        },
        {
          label: this.data["values"][2]["label"].toUpperCase(),
          data: this.data["values"][2]["data"],
          backgroundColor: 'green',
          borderColor: 'lightgreen',
          fill: false,
          lineTension: 0,
          radius: 5,
        },
      ],
    };

    //options
    let options = {
      responsive: true,
      title: {
        display: true,
        position: 'top',
        text: 'Line Graph',
        fontSize: 18,
        fontColor: '#111',
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          fontColor: '#333',
          fontSize: 16,
        },
      },
      scales: {
        x: {
            type: 'time',
           
            time: {
                unit: 'hour',
                parse:'DD/MM/YYYY HH:mm',
                distribution: 'linear',
                unitStepSize:1,
                displayFormats:{hour: 'DD/MM/YYYY HH:mm'}
            }
        }
    }
    };

    let chart = new Chart(ctx, {
      type: 'line',
    data: {
        datasets: this.data.values,
    },
    options: {
        scales: {
          x: {
            type: 'time',
            time: {
                displayFormats: {
                    quarter: 'MMM YYYY'
                }
            }
        }
        },
        responsive: true,
        maintainAspectRatio: false
    }
    });
  }
}
