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
  @api currentPoints;

  get currentSign() {
    return this.changePercentage > 0 ? "+" : "";
  }

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
                stepSize: 1,
                callback: function (value) {
                  let val = value * Math.pow(10, 3);
                  let now = new Date(val);
                  return (
                    now.getHours().toString() +
                    ":" +
                    now.getMinutes().toString() +
                    ":" +
                    now.getSeconds().toString()
                  );
                }
              }
            }
          ],
          yAxes: [
            {
              type: "linear",
              ticks: {
                autoSkip: true,
                suggestedMin:
                  this.chartData?.length > 0 ? this.chartData[0].y : 20000,
                suggestedMax:
                  this.chartData?.length > 0
                    ? this.chartData[this.chartData.length - 1].y
                    : 24000,
                stepSize: 5
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
