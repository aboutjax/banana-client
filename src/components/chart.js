import React from 'react';
import {Line, defaults} from 'react-chartjs-2'
import _ from 'lodash';

defaults.global.elements.point.borderWidth = 0;
defaults.global.elements.point.radius = 0;
defaults.global.elements.point.backgroundColor = 'rgba(0,0,0,0)';
defaults.global.elements.line.tension = 0.25;
defaults.global.elements.line.borderWidth = 0;
defaults.global.defaultFontFamily = "'-apple-system','Helvetica Neue', 'Helvetica', 'Arial', sans-serif";

const globalTicksFontSize = 9
const globalLineWidth = 1
const globalElevationFillColor = 'rgba(0,0,0,0.5)';
const globalElevationBorderColor = 'rgba(0,0,0,0)';


function ActivityChart(props) {
  function mToKm(m) {
    return _.round(m / 1000, 2);
  }

  let distanceStreamKm = _.map(props.distanceStream, mToKm)

  let options;
  let data;

  if(props.dataType === 'heartrate'){
    data = {
      labels: distanceStreamKm,
      datasets: [
        {
          label: props.dataTypeLegendLabel,
          borderColor: 'rgba(255, 255, 255, 1)',
          borderWidth: globalLineWidth,
          yAxisID: 'main-data-y-axis',
          fill: false,
          data: props.mainDataStream
        },{
          label: 'Elevation',
          fill: true,
          backgroundColor: globalElevationFillColor,
          borderColor: globalElevationBorderColor,
          borderWidth: 0,
          data: props.altitudeStream
        }
      ]
    };
    options = {
      layout: {
        padding: 0
      },
      responsive: true,
      maintainAspectRatio: true,
      legend: {
        display: false,
        usePointStyle: true,
        position: 'bottom',
        labels: {
          boxWidth: 10,
          padding: 20
        }
      },
      tooltips: {
        mode: 'index',
        intersect: false,
        displayColors: false,
        xPadding: 10,
        yPadding: 10
      },
      hover: {
        mode: 'nearest',
        intersect: true,
        animationDuration: 1000
      },
      scales: {
        xAxes: [{
          type: 'category',
          display: false,
          ticks: {
            fontSize: globalTicksFontSize,
            autoSkipPadding: 400,
            maxRotation: 0,
            callback: function(value) {
              return _.round(value, 1) + ' km'
            }
          },
          stepSize: 10
        }],
        yAxes: [
          {
            display: false,
            id: 'altitude-y-axis',
            position: 'left',
            borderColor: 'rgba(0, 140, 255, 0.9)',
            ticks: {
              fontSize: globalTicksFontSize,
              stepSize: 50,
              autoSkip: true,
              autoSkipPadding: 400,
              callback: function(value) {
                return _.round(value, 0) + ' m'
              }
            }
          },{
            display: true,
            id: 'main-data-y-axis',
            position: 'right',
            ticks: {
              fontSize: globalTicksFontSize,
              fontColor: 'rgba(255,255,255,0.5)',
              autoSkip: true,
              autoSkipPadding: 400,
              callback: function(value) {
                return _.round(value, 0) + ' ' + props.dataTypeUnit
              }
            }
          }
        ]
      }
    }
  } else if (props.dataType === 'velocity') {

    data = {
      labels: distanceStreamKm,
      datasets: [
        {
          label: props.dataTypeLegendLabel,
          borderColor: 'rgba(255, 255, 255, 1)',
          borderWidth: globalLineWidth,
          yAxisID: 'main-data-y-axis',
          fill: false,
          data: props.mainDataStream
        },{
          label: 'Elevation',
          fill: true,
          backgroundColor: globalElevationFillColor,
          borderColor: globalElevationBorderColor,
          borderWidth: 0,
          data: props.altitudeStream
        }
      ]
    }

    options = {
      layout: {
        padding: 0
      },
      responsive: true,
      maintainAspectRatio: true,
      legend: {
        display: false,
        usePointStyle: true,
        position: 'bottom',
        labels: {
          boxWidth: 10,
          padding: 20
        }
      },
      tooltips: {
        mode: 'index',
        intersect: false,
        displayColors: false,
        xPadding: 10,
        yPadding: 10
      },
      hover: {
        mode: 'nearest',
        intersect: true,
        animationDuration: 1000
      },
      scales: {
        xAxes: [{
          type: 'category',
          display: false,
          ticks: {
            fontSize: globalTicksFontSize,
            autoSkipPadding: 400,
            maxRotation: 0,
            callback: function(value) {
              return _.round(value, 1) + ' km'
            }
          },
          stepSize: 10
        }],
        yAxes: [
          {
            display: false,
            id: 'altitude-y-axis',
            position: 'left',
            borderColor: 'rgba(0, 140, 255, 0.9)',
            ticks: {
              fontSize: globalTicksFontSize,
              stepSize: 50,
              autoSkip: true,
              autoSkipPadding: 400,
              callback: function(value) {
                return _.round(value, 0) + ' m'
              }
            }
          },{
            display: true,
            id: 'main-data-y-axis',
            position: 'right',
            ticks: {
              fontSize: globalTicksFontSize,
              fontColor: 'rgba(255,255,255,0.5)',
              autoSkip: true,
              autoSkipPadding: 400,
              callback: function(value) {
                return _.round(value, 0) + ' ' + props.dataTypeUnit
              }
            }
          }
        ]
      }
    }

  } else if (props.dataType === 'cadence') {
    data = {
      labels: distanceStreamKm,
      datasets: [
        {
          label: props.dataTypeLegendLabel,
          borderColor: 'rgba(255, 255, 255, 1)',
          borderWidth: 0,
          pointRadius: 0.5,
          pointBorderWidth: 1,
          showLine: false,
          pointBackgroundColor: 'rgba(255, 255, 255, 1)',
          yAxisID: 'main-data-y-axis',
          fill: false,
          data: props.mainDataStream
        },{
          label: 'Elevation',
          fill: true,
          backgroundColor: globalElevationFillColor,
          borderColor: globalElevationBorderColor,
          borderWidth: 0,
          data: props.altitudeStream
        }
      ]
    }

    options = {
      layout: {
        padding: 0
      },
      responsive: true,
      maintainAspectRatio: true,
      legend: {
        display: false,
        usePointStyle: true,
        position: 'bottom',
        labels: {
          boxWidth: 10,
          padding: 20
        }
      },
      tooltips: {
        mode: 'index',
        intersect: false,
        displayColors: false,
        xPadding: 10,
        yPadding: 10
      },
      hover: {
        mode: 'nearest',
        intersect: true,
        animationDuration: 1000
      },
      scales: {
        xAxes: [{
          type: 'category',
          display: false,
          ticks: {
            fontSize: globalTicksFontSize,
            autoSkipPadding: 400,
            maxRotation: 0,
            callback: function(value) {
              return _.round(value, 1) + ' km'
            }
          },
          stepSize: 10
        }],
        yAxes: [
          {
            display: false,
            id: 'altitude-y-axis',
            position: 'left',
            borderColor: 'rgba(0, 140, 255, 0.9)',
            ticks: {
              fontSize: globalTicksFontSize,
              stepSize: 50,
              autoSkip: true,
              autoSkipPadding: 400,
              callback: function(value) {
                return _.round(value, 0) + ' m'
              }
            }
          },{
            display: true,
            id: 'main-data-y-axis',
            position: 'right',
            ticks: {
              fontSize: globalTicksFontSize,
              fontColor: 'rgba(255,255,255,0.5)',
              autoSkip: true,
              autoSkipPadding: 400,
              callback: function(value) {
                return _.round(value, 0) + ' ' + props.dataTypeUnit
              }
            }
          }
        ]
      }
    }
  } else {
    data = {
      labels: distanceStreamKm,
      datasets: [
        {
          label: props.dataTypeLegendLabel,
          borderColor: 'rgba(255, 255, 255, 1)',
          borderWidth: globalLineWidth,
          yAxisID: 'main-data-y-axis',
          fill: true,
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          data: props.mainDataStream,
          cubicInterpolationMode: 'monotone'
        },{
          label: 'Elevation',
          fill: true,
          backgroundColor: globalElevationFillColor,
          borderColor: globalElevationBorderColor,
          borderWidth: 0,
          data: props.altitudeStream
        }
      ]
    }

    options = {
      layout: {
        padding: 0
      },
      responsive: true,
      maintainAspectRatio: true,
      legend: {
        display: false,
        usePointStyle: true,
        position: 'bottom',
        labels: {
          boxWidth: 10,
          padding: 20
        }
      },
      tooltips: {
        mode: 'index',
        intersect: false,
        displayColors: false,
        xPadding: 10,
        yPadding: 10
      },
      hover: {
        mode: 'nearest',
        intersect: true,
        animationDuration: 1000
      },
      scales: {
        xAxes: [{
          type: 'category',
          display: false,
          ticks: {
            fontSize: globalTicksFontSize,
            autoSkipPadding: 400,
            maxRotation: 0,
            callback: function(value) {
              return _.round(value, 1) + ' km'
            }
          },
          stepSize: 10
        }],
        yAxes: [
          {
            display: false,
            id: 'altitude-y-axis',
            position: 'left',
            borderColor: 'rgba(0, 140, 255, 0.9)',
            ticks: {
              fontSize: globalTicksFontSize,
              stepSize: 50,
              autoSkip: true,
              autoSkipPadding: 400,
              callback: function(value) {
                return _.round(value, 0) + ' m'
              }
            }
          },{
            display: true,
            id: 'main-data-y-axis',
            position: 'right',
            ticks: {
              fontSize: globalTicksFontSize,
              fontColor: 'rgba(255,255,255,0.5)',
              autoSkip: true,
              autoSkipPadding: 400,
              callback: function(value) {
                return _.round(value, 0) + ' ' + props.dataTypeUnit
              }
            }
          }
        ]
      }
    }
  }


  return(
    <Line data={data} options={options} width={50} height={15}/>
  )
}

export default ActivityChart
