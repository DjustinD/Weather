const french = {
  ".site-header .brand[aria-label]": { aria: "Accueil d’Atmosphere" },
  ".site-header nav": { aria: "Navigation principale" },
  ".site-header nav a:first-child": "Le tableau de bord",
  ".site-header nav a:last-child": "Données et méthodologie <span aria-hidden=\"true\">↗</span>",
  ".hero .eyebrow": "<span class=\"eyebrow-dot\"></span> UN PEU DE CONTEXTE POUR LES PRÉVISIONS",
  ".hero h1": "Chaque lieu raconte<br><em>une histoire météorologique.</em>",
  ".hero-copy > p": "Allez au-delà des prévisions du jour. Explorez les tendances, les saisons et les petites surprises qui façonnent le climat d’une ville.",
  ".hero-art-caption": "UNE AUTRE FAÇON DE<br>VOIR LA MÉTÉO <span>↗</span>",
  ".location-intro .section-kicker": "01 / LE LIEU",
  "#location-heading": "Trouvez votre ville<span class=\"accent\">.</span>",
  ".location-intro p": "Choisissez une ville pour découvrir son profil saisonnier.",
  ".dashboard-heading .section-kicker": "02 / VUE D’ENSEMBLE",
  "#dashboard-heading": "Une année à <em id=\"place-name\">Winnipeg</em><span class=\"accent\">.</span>",
  ".period-tag div > span": "PÉRIODE DE RÉFÉRENCE",
  ".explainer p": "Chaque courbe représente une journée typique de l’année, lissée sur 31 jours. La zone ombrée représente <strong>±1 écart-type</strong> des valeurs quotidiennes de cette fenêtre. <a href=\"data-sources.html#methodology\">Comment lire ces graphiques ↗</a>",
  "[data-metric=temperature] .chart-index": "01 / TEMPÉRATURE",
  "[data-metric=temperature] h3": "Au fil des saisons",
  "[data-metric=temperature] .card-top p": "Température moyenne quotidienne · °C",
  "[data-metric=precipitation] .chart-index": "02 / PRÉCIPITATIONS",
  "[data-metric=precipitation] h3": "Pluie et neige",
  "[data-metric=precipitation] .card-top p": "Précipitations quotidiennes · mm / jour",
  "[data-metric=sunshine] .chart-index": "03 / ENSOLEILLEMENT",
  "[data-metric=sunshine] h3": "À la recherche du soleil",
  "[data-metric=sunshine] .card-top p": "Durée quotidienne d’ensoleillement · heures / jour",
  "[data-metric=wind] .chart-index": "04 / VENT",
  "[data-metric=wind] h3": "Au gré du vent",
  "[data-metric=wind] .card-top p": "Vitesse maximale quotidienne du vent · km/h",
  "[data-metric=pollution] .chart-index": "05 / QUALITÉ DE L’AIR",
  "[data-metric=pollution] h3": "Un souffle de perspective",
  "[data-metric=pollution] .card-top p": "Moyenne quotidienne de particules fines (PM2,5) · µg/m³",
  ".legend": "<i></i> Moyenne sur 31 jours <i class=\"band-key\"></i> ±1 écart-type",
  ".pollution-note": "Une période plus courte, et non une référence sur 50 ans. Les données mondiales modélisées sur la qualité de l’air sont disponibles depuis août 2022.",
  ".insight-card .section-kicker": "UNE NOTE SUR LES CHIFFRES",
  ".insight-card h3": "La météo raconte une histoire,<br><em>pas une ligne droite.</em>",
  ".insight-card p": "Il s’agit d’estimations historiques modélisées, et non de relevés d’une seule station météo. Les journées réelles peuvent se situer bien au-delà de la zone ombrée.",
  ".insight-card a": "En savoir plus sur les données <span>↗</span>",
  "#retry": "Réessayer",
  "footer p": "Pour les personnes curieuses, où qu’elles soient.",
  "footer > a:last-child[href='data-sources.html']": "Sources et méthodologie ↗",
  "footer > a:last-child[href='index.html']": "Explorer le tableau de bord ↗",
  ".back-link": "← Retour au tableau de bord",
  ".sources-page > .section-kicker": "LES DÉTAILS DERRIÈRE LES DONNÉES",
  ".sources-page h1": "Toute bonne histoire commence<br><em>avec de bonnes sources.</em>",
  ".sources-lede": "Découvrez d’où viennent les chiffres, ce qu’ils signifient et leurs limites.",
  ".source-content section:nth-child(1) .section-kicker": "01 / MÉTÉO",
  ".source-content section:nth-child(1) h2": "Cinquante ans de recul<span class=\"accent\">.</span>",
  ".source-content section:nth-child(1) p:nth-of-type(1)": "La température, les précipitations, l’ensoleillement et le vent proviennent de l’<a href=\"https://open-meteo.com/en/docs/historical-weather-api\">API de données météorologiques historiques d’Open-Meteo</a>, qui utilise la réanalyse ERA5 du CEPMMT. Le tableau de bord demande les 50 dernières années civiles complètes (ERA5 commence en 1940), selon le fuseau horaire local de chaque ville.",
  ".source-content section:nth-child(1) p:nth-of-type(2)": "ERA5 combine des observations et un modèle physique sur une grille; il ne s’agit pas d’une série continue provenant d’une station dans la ville. La cellule de grille et l’altitude sélectionnées peuvent différer de celles du centre-ville. La précision des estimations peut varier selon la période. La durée d’ensoleillement est estimée à partir du rayonnement solaire; le vent correspond au maximum quotidien de la vitesse à 10 mètres, et non à une moyenne ou à une rafale. Les précipitations comprennent la pluie et la neige exprimées en équivalent d’eau liquide.",
  ".source-content section:nth-child(1) p:nth-of-type(3)": "Source : Hersbach et coll., <a href=\"https://doi.org/10.24381/cds.adbb2d47\">données horaires ERA5 sur niveaux uniques depuis 1940</a>, Climate Data Store du Service Copernicus concernant le changement climatique; données obtenues par Open-Meteo. Voir aussi la <a href=\"https://doi.org/10.5281/zenodo.7970649\">citation du logiciel Open-Meteo</a>.",
  ".source-content section:nth-child(2) .section-kicker": "02 / QUALITÉ DE L’AIR",
  ".source-content section:nth-child(2) h2": "Une série distincte et plus courte<span class=\"accent\">.</span>",
  ".source-content section:nth-child(2) p:nth-of-type(1)": "Les particules fines (PM2,5) proviennent de l’<a href=\"https://open-meteo.com/en/docs/air-quality-api\">API de qualité de l’air d’Open-Meteo</a>, qui utilise le modèle mondial du Service Copernicus de surveillance de l’atmosphère (CAMS). Son archive mondiale commence en août 2022; le graphique des PM2,5 <strong>ne repose donc pas</strong> sur 50 ans. Les données sont demandées jusqu’à la dernière année civile complète; 2022 est une année partielle.",
  ".source-content section:nth-child(2) p:nth-of-type(2)": "Les valeurs horaires de PM2,5 sont regroupées en moyennes quotidiennes locales lorsqu’au moins 18 valeurs horaires sont disponibles. Les valeurs manquantes sont exclues. Les PM2,5 ne sont qu’un polluant, et non un indice complet de qualité de l’air. Ces estimations modélisées sur une grille peuvent différer des mesures locales; elles ne doivent pas servir à prendre des décisions de santé ou de sécurité.",
  ".source-content section:nth-child(2) p:nth-of-type(3)": "Source : <a href=\"https://atmosphere.copernicus.eu/\">Service Copernicus de surveillance de l’atmosphère (CAMS)</a>, données obtenues par Open-Meteo. Consultez les autorités locales pour connaître les conditions et les recommandations actuelles.",
  ".source-content section:nth-child(3) .section-kicker": "03 / MÉTHODOLOGIE",
  ".source-content section:nth-child(3) h2": "Lire entre les lignes<span class=\"accent\">.</span>",
  ".source-content section:nth-child(3) p:nth-of-type(1)": "L’axe horizontal représente une seule année civile, et non une chronologie des années. Pour chaque jour de l’année, nous regroupons les valeurs quotidiennes disponibles dans une fenêtre de 31 jours centrée sur ce jour, pour toutes les années disponibles. La courbe représente leur moyenne arithmétique; la zone ombrée représente la moyenne plus ou moins un écart-type de population de ces valeurs quotidiennes. Pour les variables qui ne peuvent pas être négatives, la limite inférieure est ramenée à zéro. Cette bande décrit la variabilité, et non l’incertitude ou un intervalle de confiance.",
  ".source-content section:nth-child(3) p:nth-of-type(2)": "La fenêtre se poursuit d’une année à l’autre. Le 29 février est omis pour aligner toutes les années sur un calendrier commun de 365 jours. Les valeurs quotidiennes manquantes sont exclues plutôt que traitées comme des zéros. La série sur la pollution est beaucoup plus courte et la première année partielle ne contribue que là où des données existent; ses moyennes saisonnières doivent être interprétées avec prudence. Survolez un graphique ou sélectionnez-le pour examiner les valeurs.",
  ".source-content section:nth-child(4) .section-kicker": "04 / DONNÉES OUVERTES",
  ".source-content section:nth-child(4) h2": "Conçu pour être partagé<span class=\"accent\">.</span>",
  ".source-content section:nth-child(4) p": "Les données sont fournies par <a href=\"https://open-meteo.com/\">Open-Meteo</a> selon <a href=\"https://open-meteo.com/en/licence\">ses conditions d’attribution et de licence</a>. L’API gratuite est destinée à un usage non commercial et est soumise à des limites de requêtes; consultez les <a href=\"https://open-meteo.com/en/terms\">conditions d’utilisation</a> avant le déploiement. Les graphiques sont réalisés avec <a href=\"https://d3js.org/\">D3.js</a>. Les coordonnées des villes proviennent d’une petite liste intégrée au site."
};

const translations = {
  "North America": "Amérique du Nord", "South America": "Amérique du Sud", "Europe": "Europe", "Asia": "Asie", "Africa": "Afrique", "Oceania": "Océanie",
  "United States": "États-Unis", "Mexico": "Mexique", "Argentina": "Argentine", "Brazil": "Brésil", "Chile": "Chili", "Germany": "Allemagne", "United Kingdom": "Royaume-Uni", "Spain": "Espagne", "India": "Inde", "Japan": "Japon", "Singapore": "Singapour", "Egypt": "Égypte", "Kenya": "Kenya", "South Africa": "Afrique du Sud", "Australia": "Australie", "New Zealand": "Nouvelle-Zélande",
  "British Columbia": "Colombie-Britannique", "Nova Scotia": "Nouvelle-Écosse", "Quebec": "Québec", "California": "Californie", "New York": "New York", "Washington": "Washington", "Mexico City": "Mexico", "Santiago Metropolitan": "Région métropolitaine de Santiago", "Berlin": "Berlin", "England": "Angleterre", "Community of Madrid": "Communauté de Madrid", "Delhi": "Delhi", "Tokyo": "Tokyo", "Cairo": "Le Caire", "Western Cape": "Cap-Occidental", "New South Wales": "Nouvelle-Galles du Sud",
  "Montreal": "Montréal", "New York City": "New York", "Paris": "Paris", "London": "Londres", "Madrid": "Madrid", "New Delhi": "New Delhi", "Cape Town": "Le Cap"
};

const messages = {
  "en-CA": {
    continent: "CONTINENT", country: "COUNTRY", region: "PROVINCE / STATE", city: "MUNICIPALITY",
    description: "The rhythm of the seasons, revealed by historical data.",
    loading: "Loading historical data…", loadingStatus: "Getting the bigger picture together…",
    noData: "No data available for this period.", noValid: "No valid daily values", weather: "Weather", air: "air quality",
    weatherError: "Weather data unavailable", airError: "Air-quality data unavailable",
    chartFailure: "Charts could not load. Check your connection and try again.",
    libraryFailure: "The chart library could not be loaded. Refresh the page to try again.",
    failed: errors => `Some data could not be displayed (${errors}). Please try again.`,
    complete: (start, end, airStart) => `Weather: ${start}–${end}. PM2.5: ${airStart}–${end}, subject to availability.`,
    rateLimit: "Data provider rate limit reached (HTTP 429); wait before trying again",
    httpError: code => `Data provider returned HTTP ${code}`,
    formatError: "Data provider returned an unexpected format",
    networkError: "The data request failed; check your connection and try again",
    keyboard: "Use left and right arrow keys to inspect dates.", deviation: "SD",
    units: { temperature: "°C", precipitation: "mm/day", sunshine: "hours/day", wind: "km/h", pollution: "µg/m³" },
    chartLabels: { temperature: "Seasonal daily mean temperature with standard deviation band", precipitation: "Seasonal daily precipitation with standard deviation band", sunshine: "Seasonal daily sunshine duration with standard deviation band", wind: "Seasonal daily maximum wind speed with standard deviation band", pollution: "Seasonal daily mean PM2.5 with standard deviation band" },
    titleDashboard: "Atmosphere | A city's climate, in perspective", titleSources: "Data & methodology | Atmosphere"
  },
  "fr-CA": {
    continent: "CONTINENT", country: "PAYS", region: "PROVINCE / ÉTAT", city: "MUNICIPALITÉ",
    description: "Le rythme des saisons, révélé par les données historiques.",
    loading: "Chargement des données historiques…", loadingStatus: "Nous rassemblons les données…",
    noData: "Aucune donnée disponible pour cette période.", noValid: "Aucune valeur quotidienne valide", weather: "Météo", air: "qualité de l’air",
    weatherError: "Données météo indisponibles", airError: "Données sur la qualité de l’air indisponibles",
    chartFailure: "Impossible de charger les graphiques. Vérifiez votre connexion et réessayez.",
    libraryFailure: "Impossible de charger la bibliothèque de graphiques. Actualisez la page pour réessayer.",
    failed: errors => `Certaines données n’ont pas pu être affichées (${errors}). Veuillez réessayer.`,
    complete: (start, end, airStart) => `Météo : ${start}–${end}. PM2,5 : ${airStart}–${end}, selon la disponibilité.`,
    rateLimit: "Limite de requêtes du fournisseur atteinte (HTTP 429); attendez avant de réessayer",
    httpError: code => `Le fournisseur a retourné une erreur HTTP ${code}`,
    formatError: "Le fournisseur a retourné des données dans un format inattendu",
    networkError: "La requête a échoué; vérifiez votre connexion et réessayez",
    keyboard: "Utilisez les flèches gauche et droite pour examiner les dates.", deviation: "écart-type",
    units: { temperature: "°C", precipitation: "mm/jour", sunshine: "heures/jour", wind: "km/h", pollution: "µg/m³" },
    chartLabels: { temperature: "Température moyenne quotidienne saisonnière avec bande d’écart-type", precipitation: "Précipitations quotidiennes saisonnières avec bande d’écart-type", sunshine: "Durée quotidienne saisonnière d’ensoleillement avec bande d’écart-type", wind: "Vitesse maximale quotidienne saisonnière du vent avec bande d’écart-type", pollution: "Moyenne quotidienne saisonnière des PM2,5 avec bande d’écart-type" },
    titleDashboard: "Atmosphere | Le climat d’une ville en perspective", titleSources: "Données et méthodologie | Atmosphere"
  }
};

let language = "en-CA";
const originals = new Map();
const selector = document.querySelector("#language-toggle");

export function locale() { return language; }
export function text() { return messages[language]; }
export function place(value) { return language === "fr-CA" ? translations[value] || value : value; }
export function errorText(error) {
  if (error.message.includes("429")) return text().rateLimit;
  const http = error.message.match(/HTTP (\d+)/);
  if (http) return text().httpError(http[1]);
  if (error.message.includes("unexpected format")) return text().formatError;
  return `${text().networkError} (${error.message})`;
}

function applyLanguage() {
  document.documentElement.lang = language;
  document.title = document.querySelector(".sources-page") ? text().titleSources : text().titleDashboard;
  for (const [query, translation] of Object.entries(french)) {
    document.querySelectorAll(query).forEach(element => {
      if (!originals.has(element)) originals.set(element, { html: element.innerHTML, aria: element.getAttribute("aria-label") });
      const original = originals.get(element);
      if (typeof translation === "string") element.innerHTML = language === "fr-CA" ? translation : original.html;
      else element.setAttribute("aria-label", language === "fr-CA" ? translation.aria : original.aria);
    });
  }
  document.querySelectorAll(".location-controls label").forEach(label => {
    const select = label.querySelector("select");
    label.firstChild.textContent = `${text()[select.id]} `;
  });
  selector.checked = language === "fr-CA";
}

export function initializeLanguage(onChange = () => {}) {
  try {
    const saved = localStorage.getItem("atmosphere-language");
    if (saved === "en-CA" || saved === "fr-CA") language = saved;
  } catch (error) {
    console.warn("Language preference could not be read:", error);
  }
  applyLanguage();
  selector.addEventListener("change", () => {
    language = selector.checked ? "fr-CA" : "en-CA";
    try { localStorage.setItem("atmosphere-language", language); }
    catch (error) { console.warn("Language preference could not be saved:", error); }
    applyLanguage();
    onChange();
  });
}
