import { cities } from "./locations.js";
import { AIR_START, dateRange, fetchWeather, fetchAir, seasonalProfile } from "./data.js";
import { drawChart, showChartMessage } from "./chart.js";
import { initializeLanguage, locale, text, place, errorText } from "./i18n.js";

const controls = ["continent", "country", "region", "city"].map(id => document.getElementById(id));
const range = dateRange();
const status = document.getElementById("status");
const retry = document.getElementById("retry");
const cards = Object.fromEntries([...document.querySelectorAll("[data-metric]")].map(card => [card.dataset.metric, card]));
const metrics = {
  temperature: { field: "temperature_2m_mean" },
  precipitation: { field: "precipitation_sum", nonnegative: true },
  sunshine: { field: "sunshine_duration", nonnegative: true, transform: value => value / 3600 },
  wind: { field: "wind_speed_10m_max", nonnegative: true }
};
let controller;
let requestId = 0;
let updateTimer;
let weatherState = { state: "loading" };
let airState = { state: "loading" };
let libraryMissing = false;

function populate(select, values, desired) {
  const sorted = [...new Set(values)].sort((a, b) => place(a).localeCompare(place(b), locale()));
  select.replaceChildren(...sorted.map(value => new Option(place(value), value)));
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
  const chart = card.querySelector(".chart");
  chart.setAttribute("aria-label", text().chartLabels[metric]);
  showChartMessage(chart, message);
  card.querySelector(".chart-coverage").textContent = "";
}

function render(metric, records, nonnegative, coverage) {
  const card = cards[metric];
  const available = records.filter(record => Number.isFinite(record.value));
  const rendered = drawChart(card.querySelector(".chart"), seasonalProfile(records, nonnegative), metric, text().units[metric]);
  if (!rendered) {
    card.querySelector(".chart-coverage").textContent = text().noValid;
    return false;
  }
  const dates = available.map(record => record.date).sort();
  card.querySelector(".chart-coverage").textContent = `${coverage} · ${dates[0]}–${dates[dates.length - 1]}`;
  return true;
}

function renderDashboard() {
  const city = selectedCity();
  document.getElementById("place-name").textContent = place(city.city);
  document.getElementById("place-description").textContent = `${place(city.region)}, ${place(city.country)} · ${text().description}`;
  document.getElementById("baseline").textContent = `${range.start.slice(0, 4)}–${range.end.slice(0, 4)}`;
  const errors = [];
  for (const [metric, config] of Object.entries(metrics)) {
    if (libraryMissing) cardMessage(metric, text().chartFailure);
    else if (weatherState.state === "loading") cardMessage(metric, text().loading);
    else if (weatherState.state === "error") cardMessage(metric, `${text().weatherError} : ${errorText(weatherState.error)}`);
    else {
      const data = weatherState.data;
      const records = data.time.map((date, index) => {
        const value = data[config.field][index];
        return { date, value: Number.isFinite(value) && config.transform ? config.transform(value) : value };
      });
      if (!render(metric, records, config.nonnegative, text().weather)) errors.push(text().chartLabels[metric]);
    }
  }
  if (libraryMissing) cardMessage("pollution", text().chartFailure);
  else if (airState.state === "loading") cardMessage("pollution", text().loading);
  else if (airState.state === "error") cardMessage("pollution", `${text().airError} : ${errorText(airState.error)}`);
  else if (!render("pollution", airState.data, true, locale() === "fr-CA" ? "PM2,5" : "PM2.5")) errors.push(text().air);

  if (weatherState.state === "error") errors.push(text().weather.toLocaleLowerCase(locale()));
  if (airState.state === "error") errors.push(text().air);
  retry.hidden = true;
  if (libraryMissing) status.textContent = text().libraryFailure;
  else if (weatherState.state === "loading" || airState.state === "loading") status.textContent = text().loadingStatus;
  else if (errors.length) {
    status.textContent = text().failed(errors.join(", "));
    retry.hidden = false;
  } else status.textContent = text().complete(range.start, range.end, AIR_START);
}

async function load() {
  if (controller) controller.abort();
  controller = new AbortController();
  const current = ++requestId;
  const city = selectedCity();
  weatherState = { state: "loading" };
  airState = { state: "loading" };
  libraryMissing = !window.d3;
  renderDashboard();
  if (libraryMissing) return;

  const weather = fetchWeather(city, range, controller.signal).then(data => {
    if (current !== requestId) return;
    weatherState = { state: "ready", data };
    renderDashboard();
  }).catch(error => {
    if (current !== requestId) return;
    console.error("Weather request failed:", error);
    weatherState = { state: "error", error };
    renderDashboard();
  });
  const air = fetchAir(city, range, controller.signal).then(data => {
    if (current !== requestId) return;
    airState = { state: "ready", data };
    renderDashboard();
  }).catch(error => {
    if (current !== requestId) return;
    console.error("Air-quality request failed:", error);
    airState = { state: "error", error };
    renderDashboard();
  });
  await Promise.all([weather, air]);
}

controls.forEach((control, index) => control.addEventListener("change", () => {
  updateControls(index + 1);
  clearTimeout(updateTimer);
  if (controller) controller.abort();
  requestId++;
  weatherState = { state: "loading" };
  airState = { state: "loading" };
  renderDashboard();
  updateTimer = setTimeout(load, 600);
}));
retry.addEventListener("click", load);
updateControls(0, { continent: "North America", country: "Canada", region: "Manitoba", city: "Winnipeg" });
initializeLanguage(() => {
  const selected = Object.fromEntries(controls.map(control => [control.id, control.value]));
  updateControls(0, selected);
  renderDashboard();
});
updateControls(0, Object.fromEntries(controls.map(control => [control.id, control.value])));
load();
