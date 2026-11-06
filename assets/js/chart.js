const colors = {
  temperature: "#df815f",
  precipitation: "#608da2",
  sunshine: "#d8a340",
  wind: "#7d9d89",
  pollution: "#9b82aa"
};

export function drawChart(container, profile, metric, unit) {
  const d3 = window.d3;
  const width = 560, height = 235;
  const margin = { top: 16, right: 18, bottom: 32, left: 43 };
  const valid = profile.filter(d => d.mean !== null);
  container.replaceChildren();
  if (!valid.length) {
    container.textContent = "No data available for this period.";
    container.classList.add("chart-message");
    return false;
  }
  container.classList.remove("chart-message");
  const x = d3.scaleLinear().domain([0, 364]).range([margin.left, width - margin.right]);
  let minimum = d3.min(valid, d => d.lower);
  let maximum = d3.max(valid, d => d.upper);
  if (minimum === maximum) { minimum -= 1; maximum += 1; }
  const y = d3.scaleLinear().domain([minimum, maximum]).nice().range([height - margin.bottom, margin.top]);
  const svg = d3.select(container).append("svg").attr("viewBox", `0 0 ${width} ${height}`).attr("aria-hidden", "true");
  svg.append("g").attr("class", "grid").attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(4).tickSize(-(width - margin.left - margin.right)).tickFormat(""));
  svg.append("g").attr("class", "axis").attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(4).tickSize(0).tickPadding(9));
  const monthTicks = [0, 59, 120, 181, 243, 304];
  const months = ["JAN", "MAR", "MAY", "JUL", "SEP", "NOV"];
  svg.append("g").attr("class", "axis month-axis").attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickValues(monthTicks).tickFormat((_, i) => months[i]).tickSize(0).tickPadding(14));
  const defined = d => d.mean !== null;
  const area = d3.area().defined(defined).x(d => x(d.day)).y0(d => y(d.lower)).y1(d => y(d.upper));
  const line = d3.line().defined(defined).x(d => x(d.day)).y(d => y(d.mean));
  svg.append("path").datum(profile).attr("d", area).attr("fill", colors[metric]).attr("fill-opacity", 0.16);
  svg.append("path").datum(profile).attr("d", line).attr("fill", "none").attr("stroke", colors[metric]).attr("stroke-width", 2.5);
  const marker = svg.append("g").style("display", "none");
  marker.append("line").attr("y1", margin.top).attr("y2", height - margin.bottom).attr("stroke", colors[metric]).attr("stroke-dasharray", "3 4");
  marker.append("circle").attr("r", 4).attr("fill", colors[metric]).attr("stroke", "white").attr("stroke-width", 2);
  const output = document.createElement("div");
  output.className = "chart-tooltip";
  output.hidden = true;
  container.append(output);
  const live = document.createElement("span");
  live.className = "sr-only chart-live";
  live.setAttribute("aria-live", "polite");
  container.parentElement.querySelector(".chart-live")?.remove();
  container.after(live);
  container.tabIndex = 0;
  container.setAttribute("aria-label", `${container.getAttribute("aria-label").split(". Use left")[0]}. Use left and right arrow keys to inspect dates.`);
  let selected = 0;
  function show(day) {
    selected = Math.max(0, Math.min(364, day));
    const point = profile[selected];
    if (point.mean === null) { marker.style("display", "none"); output.hidden = true; return; }
    const date = new Date(Date.UTC(2001, 0, selected + 1)).toLocaleDateString("en", { month: "short", day: "numeric", timeZone: "UTC" });
    marker.style("display", null).attr("transform", `translate(${x(selected)},0)`);
    marker.select("circle").attr("cy", y(point.mean));
    output.textContent = `${date} · ${point.mean.toFixed(1)} ${unit} (±1 SD: ${point.lower.toFixed(1)}–${point.upper.toFixed(1)})`;
    output.hidden = false;
    if (document.activeElement === container) live.textContent = output.textContent;
  }
  container.onpointermove = event => {
    const rect = svg.node().getBoundingClientRect();
    show(Math.round(x.invert((event.clientX - rect.left) * width / rect.width)));
  };
  container.onpointerleave = () => { if (document.activeElement !== container) { marker.style("display", "none"); output.hidden = true; } };
  container.onfocus = () => show(selected);
  container.onblur = () => { marker.style("display", "none"); output.hidden = true; };
  container.onkeydown = event => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      show(selected + (event.key === "ArrowRight" ? 1 : -1));
    }
  };
  return true;
}

export function showChartMessage(container, message) {
  container.replaceChildren();
  container.parentElement.querySelector(".chart-live")?.remove();
  container.textContent = message;
  container.classList.add("chart-message");
  container.removeAttribute("tabindex");
  container.onpointermove = container.onpointerleave = container.onfocus = container.onblur = container.onkeydown = null;
}
