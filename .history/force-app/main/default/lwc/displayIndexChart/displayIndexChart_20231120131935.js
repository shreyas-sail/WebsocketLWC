import { LightningElement, track, api } from "lwc";
import chartjs from "@salesforce/resourceUrl/ChartJs";
import { loadScript } from "lightning/platformResourceLoader";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class ChartExample extends LightningElement {
  @track isChartJsInitialized;
  chart;
  @api marketData;
  chartData;
  config;
  @api inputValue;
  @api list;
  @api changePercentage;
  @api changeAbsolute;

  get currentIndexPoints() {
    return this.chartData?.length > 0 ? this.chartData[0].y : "";
  }

  //   get title() {
  //     return `NIFTY INDEX \n ${this.currentIndexPoints}  ${this.changeAbsolute}  ${this.changePercentage}`;
  //   }

  staticData = [
    {
      y: 19744.150390625,
      x: 1384677022
    },
    {
      y: 19743.400390625,
      x: 1384677023
    },
    {
      y: 19742.900390625,
      x: 1384677024
    },
    {
      y: 19744.599609375,
      x: 1384677025
    },
    {
      y: 19744.30078125,
      x: 1384677026
    },
    {
      y: 19744.05078125,
      x: 1384677027
    },
    {
      y: 19745.650390625,
      x: 1384677028
    },
    {
      y: 19745.30078125,
      x: 1384677029
    },
    {
      y: 19745.69921875,
      x: 1384677031
    },
    {
      y: 19746.44921875,
      x: 1384677032
    },
    {
      y: 19746.25,
      x: 1384677033
    },
    {
      y: 19746.19921875,
      x: 1384677034
    },
    {
      y: 19746.75,
      x: 1384677035
    },
    {
      y: 19746.599609375,
      x: 1384677036
    },
    {
      y: 19747.44921875,
      x: 1384677037
    },
    {
      y: 19747.55078125,
      x: 1384677038
    },
    {
      y: 19747.099609375,
      x: 1384677039
    },
    {
      y: 19747.55078125,
      x: 1384677040
    },
    {
      y: 19748.19921875,
      x: 1384677041
    },
    {
      y: 19748.900390625,
      x: 1384677042
    },
    {
      y: 19748.349609375,
      x: 1384677043
    },
    {
      y: 19747.30078125,
      x: 1384677044
    },
    {
      y: 19747.599609375,
      x: 1384677045
    },
    {
      y: 19744.80078125,
      x: 1384677046
    },
    {
      y: 19745.25,
      x: 1384677047
    },
    {
      y: 19745.349609375,
      x: 1384677048
    },
    {
      y: 19745.44921875,
      x: 1384677049
    },
    {
      y: 19745.05078125,
      x: 1384677050
    },
    {
      y: 19744.69921875,
      x: 1384677051
    },
    {
      y: 19745.5,
      x: 1384677052
    },
    {
      y: 19744.849609375,
      x: 1384677053
    },
    {
      y: 19745.099609375,
      x: 1384677054
    },
    {
      y: 19746.19921875,
      x: 1384677055
    },
    {
      y: 19745.099609375,
      x: 1384677056
    },
    {
      y: 19744.5,
      x: 1384677057
    },
    {
      y: 19745,
      x: 1384677058
    },
    {
      y: 19745.150390625,
      x: 1384677059
    },
    {
      y: 19744.849609375,
      x: 1384677060
    },
    {
      y: 19744.25,
      x: 1384677061
    },
    {
      y: 19745.849609375,
      x: 1384677062
    },
    {
      y: 19743.94921875,
      x: 1384677063
    },
    {
      y: 19744.69921875,
      x: 1384677064
    },
    {
      y: 19744.599609375,
      x: 1384677065
    },
    {
      y: 19743.80078125,
      x: 1384677066
    },
    {
      y: 19743.849609375,
      x: 1384677067
    },
    {
      y: 19743.69921875,
      x: 1384677068
    },
    {
      y: 19743.94921875,
      x: 1384677069
    },
    {
      y: 19743.099609375,
      x: 1384677070
    },
    {
      y: 19742.599609375,
      x: 1384677071
    },
    {
      y: 19743.25,
      x: 1384677072
    },
    {
      y: 19743.05078125,
      x: 1384677073
    },
    {
      y: 19742.75,
      x: 1384677074
    },
    {
      y: 19742.80078125,
      x: 1384677075
    },
    {
      y: 19742.55078125,
      x: 1384677076
    },
    {
      y: 19742.150390625,
      x: 1384677077
    },
    {
      y: 19743.650390625,
      x: 1384677078
    },
    {
      y: 19742.849609375,
      x: 1384677079
    },
    {
      y: 19742.150390625,
      x: 1384677080
    },
    {
      y: 19742.400390625,
      x: 1384677081
    },
    {
      y: 19743.94921875,
      x: 1384677082
    },
    {
      y: 19743.849609375,
      x: 1384677083
    },
    {
      y: 19743.94921875,
      x: 1384677084
    },
    {
      y: 19744.05078125,
      x: 1384677085
    },
    {
      y: 19744.099609375,
      x: 1384677086
    },
    {
      y: 19743.75,
      x: 1384677087
    },
    {
      y: 19744.05078125,
      x: 1384677088
    },
    {
      y: 19743.80078125,
      x: 1384677089
    },
    {
      y: 19743.75,
      x: 1384677090
    },
    {
      y: 19743.44921875,
      x: 1384677091
    },
    {
      y: 19744.94921875,
      x: 1384677092
    },
    {
      y: 19744.900390625,
      x: 1384677093
    },
    {
      y: 19744.5,
      x: 1384677094
    },
    {
      y: 19745.150390625,
      x: 1384677095
    }
  ];

  setConfigs() {
    this.config = {
      type: "line",
      data: {
        datasets: [
          {
            fill: false,
            label: "Line ",
            data: this.chartData,
            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
            borderColor: ["rgba(255, 99, 132, 1)"],
            pointBackgroundColor: "rgba(255, 99, 132, 0.2)",
            pointBorderColor: "rgba(255, 99, 132, 1)"
          }
        ]
      },
      options: {
        animation: false,
        responsive: true,
        title: {
          display: true,
          text: `NIFTY INDEX `
        },
        scales: {
          xAxes: [
            {
              type: "linear",
              ticks: {
                suggestedMin:
                  this.chartData?.length > 0 ? this.chartData[0].x : 1384673444,
                suggestedMax:
                  this.chartData?.length > 0
                    ? this.chartData[this.chartData.length - 1].x
                    : 1384673544,
                stepSize: 5
              }
            }
          ],
          yAxes: [
            {
              type: "linear",
              ticks: {
                autoSkip: true,
                suggestedMin:
                  this.staticData?.length > 0 ? this.staticData[0].y : 19782,
                suggestedMax:
                  this.staticData?.length > 0
                    ? this.staticData[this.staticData.length - 1].y
                    : 19882,
                stepSize: 20,
                callback: function (value) {
                  return value + "%";
                }
              }
            }
          ]
        }
      }
    };
  }

  renderedCallback() {
    // console.log("Market data LOG>> " + this.marketData);
    this.chartData = JSON.parse(JSON.stringify(this.marketData));
    this.setConfigs();
    // if (this.isChartJsInitialized) {
    //   return;
    // }
    this.isChartJsInitialized = true;

    Promise.all([loadScript(this, chartjs)])
      .then(() => {
        const ctx = this.template
          .querySelector("canvas.linechart")
          .getContext("2d");
        this.chart = new window.Chart(ctx, this.config);
        this.chart.animating = false;
        this.chart.chart.animating = false;
        this.chart.canvas.parentNode.style.height = "100%";
        this.chart.canvas.parentNode.style.width = "100%";
      })
      .catch((error) => {
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Error loading ChartJS",
            message: error.message,
            variant: "error"
          })
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
