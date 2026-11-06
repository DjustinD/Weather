import test from "node:test";
import assert from "node:assert/strict";

test("language preference, translations, and switching", async () => {
  let handler;
  const toggle = { checked: false, addEventListener: (event, callback) => { assert.equal(event, "change"); handler = callback; } };
  const storage = new Map([["atmosphere-language", "fr-CA"]]);
  globalThis.localStorage = { getItem: key => storage.get(key), setItem: (key, value) => storage.set(key, value) };
  globalThis.document = {
    documentElement: { lang: "" },
    title: "",
    querySelector: query => query === "#language-toggle" ? toggle : null,
    querySelectorAll: () => []
  };
  const { initializeLanguage, locale, text, place, errorText } = await import("../assets/js/i18n.js");
  let changes = 0;
  initializeLanguage(() => changes++);
  assert.equal(locale(), "fr-CA");
  assert.equal(document.documentElement.lang, "fr-CA");
  assert.equal(toggle.checked, true);
  assert.equal(place("Montreal"), "Montréal");
  assert.equal(place("Canada"), "Canada");
  assert.match(errorText(new Error("Data provider rate limit reached (HTTP 429)")), /Limite.*429/);
  assert.match(errorText(new Error("Data provider returned HTTP 503")), /HTTP 503/);
  assert.match(text().chartLabels.temperature, /Température/);

  toggle.checked = false;
  handler();
  assert.equal(changes, 1);
  assert.equal(locale(), "en-CA");
  assert.equal(document.documentElement.lang, "en-CA");
  assert.equal(storage.get("atmosphere-language"), "en-CA");
  assert.equal(place("Montreal"), "Montreal");
  assert.match(text().chartLabels.temperature, /temperature/);
  delete globalThis.document;
  delete globalThis.localStorage;
});
