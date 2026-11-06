# Atmosphere

A static, D3-powered seasonal climate dashboard for a curated selection of cities. Winnipeg is the default. Use the EN/FR switch to choose Canadian English or Canadian French; the preference is saved in browser local storage where available. Historical weather uses the last 50 complete calendar years of ERA5 data; modeled global PM2.5 is available only from August 2022. The dashboard displays a 31-day seasonal mean and a band of ±1 population standard deviation of daily values, not a forecast or a confidence interval. See [data sources and methodology](data-sources.html) for details and attribution.

## Run locally

From the project directory, run `python -m http.server 8000` and visit `http://localhost:8000`. An internet connection is needed for D3, optional web fonts, and the Open-Meteo APIs. No API key or build step is required.

## Publish on GitHub Pages

Push these files to a GitHub repository. In **Settings → Pages**, choose **Deploy from a branch**, select the branch and `/ (root)` folder, then save. All site links and assets are relative, so the site also works under a repository subpath. The free Open-Meteo API is for non-commercial use and is subject to rate limits; review its [terms](https://open-meteo.com/en/terms) before deployment.

## Test

Run `node --test tests\data.test.mjs` with Node.js 20 or later. To add cities, edit `assets/js/locations.js` and provide a continent, country, region, city, and approximate coordinates.
