import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  BAR_HEIGHT,
  StatsTypes,
} from '../utils/const';
import {
  calcDuration,
  getDuration,
} from '../utils/event';
import Smart from './smart';

const getDataFromEvents = (type, events) => {
  const data = {};

  const temp = {
    labels: new Set(),
    values: {},
  };

  events.forEach((event) => {
    temp.labels.add(event.type.toUpperCase());

    if (!temp.values[event.type]) {
      temp.values[event.type] = 0;
    }
  });

  switch (type) {
    case StatsTypes.MONEY:
      events.forEach((event) => {
        temp.values[event.type] += event.price;
      });
      data.formatter = (value) => `€ ${value}`;
      break;
    case StatsTypes.TYPE:
      events.forEach((event) => {
        temp.values[event.type] += 1;
      });
      data.formatter = (value) => `${value}x`;
      break;
    case StatsTypes.TIME_SPEND:
      events.forEach((event) => {
        temp.values[event.type] += calcDuration(event.startTime, event.endTime);
      });
      data.formatter = (value) => `${getDuration(value)}`;
      break;
  }

  data.labels = [...temp.labels];
  data.values = [...Object.values(temp.values)];

  return data;
};

const renderChart = (container, type, events) => {
  const data = getDataFromEvents(type, events);

  container.height = BAR_HEIGHT * data.labels.length;

  return new Chart(container, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: data.labels,
      datasets: [
        {
          data: data.values,
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
          anchor: `start`,
          minBarLength: 100,
          barThickness: 44,
        },
      ],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: data.formatter,
        },
      },
      title: {
        display: true,
        text: type,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: `#000000`,
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createStatsTemplate = () => {
  return (
    `<section class="statistics">
      <h2 class="visually-hidden">Trip statistics</h2>
      <div class="statistics__item statistics__item--money">
        <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
      </div>
      <div class="statistics__item statistics__item--transport">
        <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
      </div>
      <div class="statistics__item statistics__item--time-spend">
        <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
      </div>
    </section>`
  );
};

export default class Stats extends Smart {
  constructor(events) {
    super();
    this._data = events;

    this._moneyChart = null;
    this._typeChart = null;
    this._timeSpendChart = null;

    this._setCharts();
  }

  removeElement() {
    super.removeElement();

    this._removeCharts();
  }

  getTemplate() {
    return createStatsTemplate(this._data);
  }

  restoreHandlers() {
    this._setCharts();
  }

  _removeCharts() {
    if (this._moneyChart !== null || this._typeChart !== null || this._timeChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeChart = null;
    }
  }

  _setCharts() {
    this._removeCharts();

    const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);
    const typeCtx = this.getElement().querySelector(`.statistics__chart--transport`);
    const timeCtx = this.getElement().querySelector(`.statistics__chart--time`);

    this._moneyChart = renderChart(moneyCtx, StatsTypes.MONEY, this._data);
    this._typeChart = renderChart(typeCtx, StatsTypes.TYPE, this._data);
    this._timeChart = renderChart(timeCtx, StatsTypes.TIME_SPEND, this._data);
  }
}
