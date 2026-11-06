export const AIR_START = "2022-08-01";
export const WEATHER_FIELDS = ["temperature_2m_mean", "precipitation_sum", "sunshine_duration", "wind_speed_10m_max"];

export function dateRange(now = new Date()) {
  const endYear = now.getFullYear() - 1;
  return { start: `${endYear - 49}-01-01`, end: `${endYear}-12-31` };
}

async function getJSON(url, signal) {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    if (response.status === 429) throw new Error("Data provider rate limit reached (HTTP 429); wait before trying again");
    throw new Error(`Data provider returned HTTP ${response.status}`);
  }
  const data = await response.json();
  if (data.error) throw new Error(data.reason || "Data provider returned an error");
  return data;
}

export async function fetchWeather(city, range, signal) {
  const params = new URLSearchParams({ latitude: city.latitude, longitude: city.longitude, start_date: range.start, end_date: range.end, daily: WEATHER_FIELDS.join(","), timezone: "auto", models: "era5" });
  const data = await getJSON(`https://archive-api.open-meteo.com/v1/archive?${params}`, signal);
  if (!Array.isArray(data.daily?.time) || WEATHER_FIELDS.some(field => !Array.isArray(data.daily[field]) || data.daily[field].length !== data.daily.time.length)) throw new Error("Weather data has an unexpected format");
  return data.daily;
}

export async function fetchAir(city, range, signal) {
  const params = new URLSearchParams({ latitude: city.latitude, longitude: city.longitude, start_date: AIR_START, end_date: range.end, hourly: "pm2_5", domains: "cams_global", timezone: "auto" });
  const data = await getJSON(`https://air-quality-api.open-meteo.com/v1/air-quality?${params}`, signal);
  if (!Array.isArray(data.hourly?.time) || !Array.isArray(data.hourly.pm2_5) || data.hourly.time.length !== data.hourly.pm2_5.length) throw new Error("Air-quality data has an unexpected format");
  return dailyAir(data.hourly);
}

export function dailyAir(hourly) {
  const days = new Map();
  hourly.time.forEach((time, index) => {
    const date = time.slice(0, 10);
    if (!days.has(date)) days.set(date, []);
    const value = hourly.pm2_5[index];
    if (Number.isFinite(value)) days.get(date).push(value);
  });
  return Array.from(days, ([date, values]) => ({ date, value: values.length >= 18 ? values.reduce((a, b) => a + b, 0) / values.length : null }));
}

// A fixed non-leap year aligns calendar days across all input years.
export function dayIndex(date) {
  const monthDay = date.slice(5, 10);
  if (monthDay === "02-29") return -1;
  const time = Date.parse(`2001-${monthDay}T00:00:00Z`);
  return Number.isFinite(time) ? Math.round((time - Date.UTC(2001, 0, 1)) / 86400000) : -1;
}

export function seasonalProfile(records, nonnegative = false) {
  const buckets = Array.from({ length: 365 }, () => []);
  for (const { date, value } of records) {
    const day = dayIndex(date);
    if (day >= 0 && day < 365 && Number.isFinite(value)) buckets[day].push(value);
  }
  return buckets.map((_, day) => {
    let count = 0, sum = 0, sumSquares = 0;
    for (let offset = -15; offset <= 15; offset++) {
      for (const value of buckets[(day + offset + 365) % 365]) {
        count++;
        sum += value;
        sumSquares += value * value;
      }
    }
    if (!count) return { day, mean: null, lower: null, upper: null, count };
    const mean = sum / count;
    const deviation = Math.sqrt(Math.max(0, sumSquares / count - mean * mean));
    return { day, mean, lower: nonnegative ? Math.max(0, mean - deviation) : mean - deviation, upper: mean + deviation, count };
  });
}
