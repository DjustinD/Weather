import test from "node:test";
import assert from "node:assert/strict";
import { dateRange, dayIndex, dailyAir, seasonalProfile, fetchWeather, fetchAir } from "../assets/js/data.js";

test("uses the last 50 complete calendar years", () => {
  assert.deepEqual(dateRange(new Date(2026, 10, 6)), { start: "1976-01-01", end: "2025-12-31" });
});

test("aligns non-leap dates and omits leap day", () => {
  assert.equal(dayIndex("2024-02-29"), -1);
  assert.equal(dayIndex("2024-03-01"), dayIndex("2023-03-01"));
  assert.equal(dayIndex("2023-12-31"), 364);
});

test("calculates a centered, year-wrapping window and population deviation", () => {
  const profile = seasonalProfile([
    { date: "2023-12-31", value: 2 },
    { date: "2024-01-01", value: 4 },
    { date: "2024-01-16", value: 6 },
    { date: "2024-01-17", value: 100 },
    { date: "2024-02-29", value: 100 },
    { date: "2024-01-01", value: null }
  ]);
  assert.equal(profile[0].count, 3);
  assert.equal(profile[0].mean, 4);
  assert.ok(Math.abs(profile[0].upper - (4 + Math.sqrt(8 / 3))) < 1e-10);
  assert.equal(profile[100].mean, null);
});

test("clips the lower band for nonnegative measures", () => {
  const profile = seasonalProfile([{ date: "2023-01-01", value: 0 }, { date: "2024-01-01", value: 10 }], true);
  assert.equal(profile[0].lower, 0);
});

test("air quality needs at least 18 valid hours per local day", () => {
  const time = Array.from({ length: 48 }, (_, index) => `2024-01-${index < 24 ? "01" : "02"}T${String(index % 24).padStart(2, "0")}:00`);
  const pm2_5 = time.map((_, index) => index < 18 ? 10 : index < 24 ? null : index < 41 ? 20 : null);
  assert.deepEqual(dailyAir({ time, pm2_5 }), [{ date: "2024-01-01", value: 10 }, { date: "2024-01-02", value: null }]);
});

test("weather request selects ERA5 and rejects malformed data", async () => {
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async url => {
      const request = new URL(url);
      assert.equal(request.searchParams.get("models"), "era5");
      assert.equal(request.searchParams.get("timezone"), "auto");
      return new Response(JSON.stringify({ daily: { time: [] } }));
    };
    await assert.rejects(fetchWeather({ latitude: 1, longitude: 2 }, dateRange(new Date(2026, 0, 1))), /unexpected format/);
  } finally {
    globalThis.fetch = original;
  }
});

test("API rate limits are surfaced explicitly", async () => {
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async () => new Response("", { status: 429 });
    await assert.rejects(fetchAir({ latitude: 1, longitude: 2 }, dateRange(new Date(2026, 0, 1))), /rate limit.*429/);
  } finally {
    globalThis.fetch = original;
  }
});
