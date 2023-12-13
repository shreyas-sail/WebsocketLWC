import { LightningElement, track,api } from 'lwc';
import chartjs from '@salesforce/resourceUrl/ChartJs';
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class ChartExample extends LightningElement {
    @track isChartJsInitialized;
    chart;
    @api marketData;
    chartData;


    config = {
        type: 'line',
        data: {
            datasets: [{
                fill: false,
                label: 'Line ',
                data: this.chartData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                pointBackgroundColor: 'rgba(255, 99, 132, 0.2)',
                pointBorderColor: 'rgba(255, 99, 132, 1)'
            },
            ]
        },
        options: {
            title: {
                display: true,
                text: 'Sand Samples Against Comm Weight %.'
            },
            scales: {
                xAxes: [{
                    type: 'linear',
                    ticks: {
                        suggestedMin: 1384673444,
                        suggestedMax: 1384674000,
                        stepSize: 30,
                    }
                }],
                yAxes: [{
                    type: 'linear',
                    ticks: {
                        autoSkip: true,
                        suggestedMin: 19460,
                        suggestedMax: 19760,
                        stepSize: 20,
                        callback: function (value) {
                            return value + '%';
                        }
                    }
                }]
            },
        }
    };

    renderedCallback() {
        console.log('Market data LOG>> '+ this.marketData);
        this.chartData = JSON.parse(JSON.stringify(this.marketData));
        if (this.isChartJsInitialized) {
            return;
        }
        this.isChartJsInitialized = true;

        Promise.all([
            loadScript(this, chartjs)
        ]).then(() => {
            const ctx = this.template.querySelector('canvas.linechart').getContext('2d');
            this.chart = new window.Chart(ctx, this.config);
            this.chart.canvas.parentNode.style.height = '100%';
            this.chart.canvas.parentNode.style.width = '100%';
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error loading ChartJS',
                    message: error.message,
                    variant: 'error',
                }),
            );
        });
    }
}



// [{  
//     y:100,
//     x:0
//  },
//  {  
//     y:96,
//     x:10
//  },
//  {  
//     y:93,
//     x:20
//  },
//  {  
//     y:89,
//     x:30
//  },
//  {  
//     y:85,
//     x:50
//  },
//  {  
//     y:80,
//     x:60
//  },
//  {  
//     y:71,
//     x:70
//  },
//  {  
//     y:43,
//     x:80
//  },
//  {  
//     y:19,
//     x:90
//  },
//  {  
//     y:9,
//     x:100
//  },
//  {  
//     y:4,
//     x:110
//  },
//  {  
//     y:2,
//     x:120
//  },
//  {  
//     y:0,
//     x:130
//  },
//  {  
//     y: 140,
//     x:140
//  }
 
//  ]