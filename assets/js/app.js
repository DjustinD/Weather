import { cities } from "./locations.js";
import { AIR_START, dateRange, fetchWeather, fetchAir, seasonalProfile } from "./data.js";
import { drawChart, showChartMessage } from "./chart.js";

const controls = ["continent", "country", "region", "city"].map(id => document.getElementById(id));
const range = dateRange();
const status = document.getElementById("status");
const retry = document.getElementById("retry");
const cards = Object.fromEntries([...document.querySelectorAll("[data-metric]")].map(card => [card.dataset.metric, card]));
const metrics = {
  temperature: { field: "temperature_2m_mean", unit: "°C" },
  precipitation: { field: "precipitation_sum", unit: "mm/day", nonnegative: true },
  sunshine: { field: "sunshine_duration", unit: "hours/day", nonnegative: true, transform: value => value / 3600 },
  wind: { field: "wind_speed_10m_max", unit: "km/h", nonnegative: true }
};
let controller;
let requestId = 0;
let updateTimer;

function populate(select, values, desired) {
  const sorted = [...new Set(values)].sort((a, b) => a.localeCompare(b));
  select.replaceChildren(...sorted.map(value => new Option(value, value)));
  select.value = sorted.includes(desired) ? desired : sorted[0];
}

function updateControls(start, preferred = {}) {
  for (let index = start; index < controls.length; index++) {
    const key = controls[index].id;
    const matches = cities.filter(city => controls.slice(0, index).every(control => city[control.id] === control.value));
    populate(controls[index], matches.map(city => city[key]), preferred[key]);
  }
}

function selectedCity() {
  return cities.find(city => controls.every(control => city[control.id] === control.value));
}

function cardMessage(metric, message) {
  const card = cards[metric];
  showChartMessage(card.querySelector(".chart"), message);
  card.querySelector(".chart-coverage").textContent = "";
}

function render(metric, records, unit, nonnegative, coverage) {
  const card = cards[metric];
  const available = records.filter(record => Number.isFinite(record.value));
  const rendered = drawChart(card.querySelector(".chart"), seasonalProfile(records, nonnegative), metric, unit);
  if (!rendered) {
    card.querySelector(".chart-coverage").textContent = "No valid daily values";
    return false;
  }
  const dates = available.map(record => record.date).sort();
  card.querySelector(".chart-coverage").textContent = `${coverage} · ${dates[0]}–${dates[dates.length - 1]}`;
  return true;
}

async function load() {
  if (controller) controller.abort();
  controller = new AbortController();
  const current = ++requestId;
  const city = selectedCity();
  document.getElementById("place-name").textContent = city.city;
  document.getElementById("place-description").textContent = `${city.region}, ${city.country} · The rhythm of the seasons, revealed by historical data.`;
  document.getElementById("baseline").textContent = `${range.start.slice(0, 4)}–${range.end.slice(0, 4)}`;
  retry.hidden = true;
  status.textContent = "Getting the bigger picture together…";
  Object.keys(cards).forEach(metric => cardMessage(metric, "Loading historical data…"));
  if (!window.d3) {
    Object.keys(cards).forEach(metric => cardMessage(metric, "Charts could not load. Check your connection and try again."));
    status.textContent = "The chart library could not be loaded. Refresh the page to try again.";
    return;
  }

  const weather = fetchWeather(city, range, controller.signal).then(data => {
    if (current !== requestId) return [];
    const errors = [];
    for (const [metric, config] of Object.entries(metrics)) {
      const records = data.time.map((date, index) => {
        const value = data[config.field][index];
        return { date, value: Number.isFinite(value) && config.transform ? config.transform(value) : value };
      });
      if (!render(metric, records, config.unit, config.nonnegative, "Weather")) errors.push(metric);
    }
    return errors;
  }).catch(error => {
    if (current !== requestId) return [];
    Object.keys(metrics).forEach(metric => cardMessage(metric, `Weather data unavailable: ${error.message}`));
    return ["weather"];
  });
  const air = fetchAir(city, range, controller.signal).then(records => {
    if (current !== requestId) return [];
    return render("pollution", records, "µg/m³", true, "PM2.5") ? [] : ["air quality"];
  }).catch(error => {
    if (current !== requestId) return [];
    cardMessage("pollution", `Air-quality data unavailable: ${error.message}`);
    return ["air quality"];
  });
  const errors = (await Promise.all([weather, air])).flat();
  if (current !== requestId) return;
  if (errors.length) {
    status.textContent = `Some data could not be displayed (${errors.join(", ")}). Please try again.`;
    retry.hidden = false;
  } else {
    status.textContent = `Weather: ${range.start}–${range.end}. PM2.5: ${AIR_START}–${range.end}, subject to availability.`;
  }
}

controls.forEach((control, index) => control.addEventListener("change", () => {
  updateControls(index + 1);
  clearTimeout(updateTimer);
  if (controller) controller.abort();
  requestId++;
  const city = selectedCity();
  document.getElementById("place-name").textContent = city.city;
  document.getElementById("place-description").textContent = `${city.region}, ${city.country} · The rhythm of the seasons, revealed by historical data.`;
  Object.keys(cards).forEach(metric => cardMessage(metric, "Loading historical data…"));
  status.textContent = "Getting the bigger picture together…";
  retry.hidden = true;
  updateTimer = setTimeout(load, 600);
}));
retry.addEventListener("click", load);
updateControls(0, { continent: "North America", country: "Canada", region: "Manitoba", city: "Winnipeg" });
load();
