# Atmosphere

A static, D3-powered seasonal climate dashboard for a curated selection of cities. Winnipeg is the default. Use the EN/FR switch to choose Canadian English or Canadian French; the preference is saved in browser local storage where available. Historical weather uses the last 50 complete calendar years of ERA5 data; modeled global PM2.5 is available only from August 2022. The dashboard displays a 31-day seasonal mean and a band of ±1 population standard deviation of daily values, not a forecast or a confidence interval. See [data sources and methodology](data-sources.html) for details and attribution.

## Run locally

From the project directory, run `python -m http.server 8000` and visit `http://localhost:8000`. An internet connection is needed for D3, optional web fonts, and the Open-Meteo APIs. No API key or build step is required.

## Publish on GitHub Pages

1. Push these files to the public GitHub repository `DjustinD/Weather`.
2. In the repository, open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select the branch containing the site (for example, `main`) and the **/ (root)** folder, then save.
4. Once GitHub Pages finishes deploying, visit **[https://djustind.github.io/Weather/](https://djustind.github.io/Weather/)**. The Pages settings page shows the deployment status and published URL.

All site links and assets are relative, so they work under the `/Weather/` repository subpath. The free Open-Meteo API is for non-commercial use and is subject to rate limits; review its [terms](https://open-meteo.com/en/terms) before deployment.

## Test

Run `npm test` with Node.js 20 or later. To add cities, edit `assets/js/locations.js` and provide a continent, country, region, city, and approximate coordinates. Add French translations for any location names that differ in `assets/js/i18n.js`.
