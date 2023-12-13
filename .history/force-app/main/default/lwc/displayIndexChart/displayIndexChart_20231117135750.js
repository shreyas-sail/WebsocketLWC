import { LightningElement, track,api } from 'lwc';
import chartjs from '@salesforce/resourceUrl/ChartJs';
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class ChartExample extends LightningElement {
    @track isChartJsInitialized;
    chart;
    @api marketData;
    chartData;

    staticData = [
        {
            "y": 19772.30078125,
            "x": 1384673982
        },
        {
            "y": 19772.44921875,
            "x": 1384673983
        },
        {
            "y": 19772,
            "x": 1384673984
        },
        {
            "y": 19771.599609375,
            "x": 1384673985
        },
        {
            "y": 19771.349609375,
            "x": 1384673986
        },
        {
            "y": 19771.849609375,
            "x": 1384673987
        },
        {
            "y": 19772.150390625,
            "x": 1384673988
        },
        {
            "y": 19772.349609375,
            "x": 1384673989
        },
        {
            "y": 19771.80078125,
            "x": 1384673990
        },
        {
            "y": 19771.69921875,
            "x": 1384673991
        },
        {
            "y": 19771.94921875,
            "x": 1384673992
        },
        {
            "y": 19772.55078125,
            "x": 1384673993
        },
        {
            "y": 19771.80078125,
            "x": 1384673994
        },
        {
            "y": 19771.69921875,
            "x": 1384673995
        },
        {
            "y": 19771.150390625,
            "x": 1384673996
        },
        {
            "y": 19770.900390625,
            "x": 1384673997
        },
        {
            "y": 19772,
            "x": 1384673998
        },
        {
            "y": 19771.849609375,
            "x": 1384673999
        },
        {
            "y": 19771.44921875,
            "x": 1384674000
        },
        {
            "y": 19771.55078125,
            "x": 1384674001
        },
        {
            "y": 19771.19921875,
            "x": 1384674002
        },
        {
            "y": 19771.80078125,
            "x": 1384674003
        },
        {
            "y": 19771.650390625,
            "x": 1384674004
        },
        {
            "y": 19771.75,
            "x": 1384674005
        },
        {
            "y": 19770.69921875,
            "x": 1384674006
        },
        {
            "y": 19771.44921875,
            "x": 1384674007
        },
        {
            "y": 19771.25,
            "x": 1384674008
        },
        {
            "y": 19770.94921875,
            "x": 1384674009
        },
        {
            "y": 19771.25,
            "x": 1384674010
        },
        {
            "y": 19771.55078125,
            "x": 1384674011
        },
        {
            "y": 19771.400390625,
            "x": 1384674012
        },
        {
            "y": 19771.650390625,
            "x": 1384674013
        },
        {
            "y": 19771.25,
            "x": 1384674014
        },
        {
            "y": 19771.650390625,
            "x": 1384674015
        },
        {
            "y": 19770.900390625,
            "x": 1384674016
        },
        {
            "y": 19771.19921875,
            "x": 1384674017
        },
        {
            "y": 19770.75,
            "x": 1384674018
        },
        {
            "y": 19771.599609375,
            "x": 1384674019
        },
        {
            "y": 19771.150390625,
            "x": 1384674020
        },
        {
            "y": 19771.400390625,
            "x": 1384674021
        },
        {
            "y": 19771.19921875,
            "x": 1384674022
        },
        {
            "y": 19771,
            "x": 1384674023
        },
        {
            "y": 19771.19921875,
            "x": 1384674025
        },
        {
            "y": 19770.599609375,
            "x": 1384674026
        },
        {
            "y": 19770.94921875,
            "x": 1384674027
        }
    ];


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
                        suggestedMin:this.chartData?.length>0? this.chartData[0].x:1384673444,
                        suggestedMax:this.chartData?.length>0? this.chartData[this.chartData.length -1].x:1384673544,
                        stepSize: 30,
                    }
                }],
                yAxes: [{
                    type: 'linear',
                    ticks: {
                        autoSkip: true,
                        suggestedMin:this.chartData?.length>0? this.chartData[0].y:19782,
                        suggestedMax:this.chartData?.length>0? this.chartData[this.chartData.length -1].y:19882,
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