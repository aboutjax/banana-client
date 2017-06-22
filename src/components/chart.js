import React, {Component} from 'react';
import {Line} from 'react-chartjs-2'
import _ from 'lodash';
import { defaults } from 'react-chartjs-2';

defaults.global.elements.point.borderWidth = 0;
defaults.global.elements.point.radius = 0;
defaults.global.elements.point.backgroundColor = 'rgba(0,0,0,0)';
defaults.global.elements.line.tension = 0.2;
defaults.global.elements.line.borderColor = 'rgba(255, 255, 255, 0.1)';
defaults.global.elements.line.borderWidth = 0;

function Chart(props) {
  function mToKm(m) {
    return _.round(m / 1000, 2);
  }

  let distanceStreamKm = _.map(props.distanceStream, mToKm)

  const data = {
    labels: distanceStreamKm,
    datasets: [
      {
        label: 'Altitude',
        fill: true,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 0,
        data: props.altitudeStream
      }
    ]
  }

  const options = {
    title: {
      text: 'Climb',
      display: true
    },
    layout: {
      padding: 0
    },
    responsive: true,
    maintainAspectRatio: false,
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
          autoSkipPadding: 100,
          maxRotation: 0,
          callback: function(value) {
            return _.round(value, 0) + ' km'
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
          ticks: {stepSize: 50, autoSkipPadding: 100, callback: function(value) {return _.round(value, 0) + ' m'}}
        },{
          display: false,
          id: 'heartrate-y-axis',
          position: 'right',
          ticks: {stepSize: 20, autoSkipPadding: 100, callback: function(value) {return _.round(value, 0) + ' bpm'}}
        }
      ]
    }
  }

  return(
    <Line data={data} options={options} height={40} redraw/>
  )
}

export default Chart
