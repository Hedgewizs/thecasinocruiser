/* Sailing finder — shared by the homepage hero and sailings.html.
   Data: data/ships.json (178 ships, 9 lines), data/sailings.json (staged itineraries).
   No live API calls: everything runs from staged JSON + Open-Meteo weather. */
(function(){
"use strict";

var LINE_NAMES = {
  "princess-cruises": "Princess Cruises",
  "carnival-cruise-line": "Carnival Cruise Line",
  "royal-caribbean": "Royal Caribbean",
  "celebrity-cruises": "Celebrity Cruises",
  "norwegian-cruise-line": "Norwegian Cruise Line",
  "virgin-voyages": "Virgin Voyages",
  "msc-cruises": "MSC Cruises",
  "holland-america-line": "Holland America Line",
  "disney-cruise-line": "Disney Cruise Line"
};

var T = window.SAIL_T || {
  pickLine: "1 · Pick your cruise line",
  pickShip: "2 · Pick your ship",
  shipCapacity: "guests",
  comingSoon: "Live itineraries for this ship are coming soon — check back.",
  nights: "nights",
  departs: "Departs",
  portCalls: "port calls",
  viewItin: "View day-by-day itinerary",
  hideItin: "Hide itinerary",
  embark: "Embark",
  disembark: "Disembark",
  portDay: "Port day",
  scenic: "Scenic cruising",
  seaDay: "At sea",
  wxSoon: "Forecast opens ~16 days out.",
  wxFail: "Weather unavailable right now.",
  planPort: "Plan this port day",
  fullFinder: "Open the full sailing finder",
  noSailings: "No staged sailings for this ship yet.",
  plannerUrl: "ports.html"
};

var data = { ships: null, sailings: null };

function loadData(){
  if (data.ships) return Promise.resolve(data);
  var prefix = window.SAIL_DATA_PREFIX || "data/";
  return Promise.all([
    fetch(prefix + "ships.json").then(function(r){ return r.json(); }),
    fetch(prefix + "sailings.json").then(function(r){ return r.json(); }),
    fetch(prefix + "sailings-princess-1.json").then(function(r){ return r.json(); }),
    fetch(prefix + "sailings-princess-2.json").then(function(r){ return r.json(); }),
    fetch(prefix + "sailings-princess-3.json").then(function(r){ return r.json(); }),
    fetch(prefix + "sailings-princess-4.json").then(function(r){ return r.json(); })
  ]).then(function(res){
    data.ships = res[0]; data.sailings = res[1];
    data.sailings["princess-cruises"] = res[2].concat(res[3], res[4], res[5]);
    return data;
  });
}

function lineOptions(sel, placeholder){
  sel.innerHTML = "";
  var o = document.createElement("option");
  o.value = ""; o.textContent = placeholder || T.pickLine;
  sel.appendChild(o);
  Object.keys(LINE_NAMES).forEach(function(slug){
    var opt = document.createElement("option");
    opt.value = slug; opt.textContent = LINE_NAMES[slug];
    sel.appendChild(opt);
  });
}

function shipOptions(sel, lineSlug, placeholder){
  sel.innerHTML = "";
  var o = document.createElement("option");
  o.value = ""; o.textContent = placeholder || T.pickShip;
  sel.appendChild(o);
  if (!lineSlug || !data.ships[lineSlug]) return;
  data.ships[lineSlug].forEach(function(ship){
    var opt = document.createElement("option");
    opt.value = ship.id; opt.textContent = ship.name;
    sel.appendChild(opt);
  });
}

function findShip(lineSlug, shipId){
  var list = (data.ships[lineSlug] || []);
  for (var i = 0; i < list.length; i++) if (list[i].id === shipId) return list[i];
  return null;
}

function sailingsFor(lineSlug, shipId){
  var list = (data.sailings[lineSlug] || []);
  var ship = findShip(lineSlug, shipId);
  var name = ship ? ship.name : "";
  return list.filter(function(s){
    return s.ship_name === name ||
      s.ship_name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"") === shipId;
  });
}

function fmtDate(ds){
  return new Date(ds + "T00:00:00").toLocaleDateString("en-US",
    {weekday:"short", month:"short", day:"numeric", year:"numeric"});
}

function fmtCap(n){
  return n ? n.toLocaleString("en-US") + " " + T.shipCapacity : "";
}

/* ---- weather (same Open-Meteo pattern as the Port Day Planner) ---- */
function fetchWx(lat, lon, dateStr){
  var today = new Date(); today.setHours(0,0,0,0);
  var target = new Date(dateStr + "T00:00:00");
  var diff = Math.round((target - today) / 86400000);
  if (diff < 0 || diff > 16 || lat == null || lon == null) return Promise.resolve(null);
  var url = "https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon +
    "&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,weathercode" +
    "&start_date=" + dateStr + "&end_date=" + dateStr + "&temperature_unit=celsius&wind_speed_unit=mph&timezone=auto";
  return fetch(url).then(function(r){ if(!r.ok) throw 0; return r.json(); }).then(function(j){
    var d = j.daily;
    return { hi: Math.round(d.temperature_2m_max[0]), lo: Math.round(d.temperature_2m_min[0]),
             rain: d.precipitation_probability_max[0], wind: Math.round(d.wind_speed_10m_max[0]), code: d.weathercode[0] };
  }).catch(function(){ return "error"; });
}
function f2c(c){ return Math.round(c*9/5+32); }
function wxIcon(code){
  if (code <= 1) return "☀️"; if (code <= 3) return "⛅"; if (code <= 48) return "🌫️";
  if (code <= 67) return "🌧️"; if (code <= 77) return "🌨️"; if (code <= 82) return "🌧️";
  return "⛈️";
}
function wxHtml(wx){
  if (wx === "error") return '<p class="wx-note">' + T.wxFail + "</p>";
  if (!wx) return '<p class="wx-note">' + T.wxSoon + "</p>";
  return '<div class="wx-line">' + wxIcon(wx.code) + " " + f2c(wx.hi) + "°F / " + f2c(wx.lo) +
    "°F · 🌧 " + wx.rain + "% · 💨 " + wx.wind + " mph</div>";
}

var KIND_LABEL = { embark: "embark", call: "portDay", sea: "seaDay", scenic: "scenic", disembark: "disembark" };

function findPortInfo(day){
  if (typeof PORTS === "undefined" || !day.port_id) return null;
  for (var i = 0; i < PORTS.length; i++) {
    if (PORTS[i].id === day.port_id) return PORTS[i];
  }
  // fallback: match by name
  var nm = (day.port_name || "").toLowerCase();
  for (var j = 0; j < PORTS.length; j++) {
    if (PORTS[j].name.toLowerCase() === nm) return PORTS[j];
  }
  return null;
}

function dayRow(day){
  var label = T[KIND_LABEL[day.kind] || "portDay"];
  var badge = '<span class="day-badge kind-' + day.kind + '">' + label + "</span>";
  var info = (day.kind === "call" || day.kind === "embark" || day.kind === "disembark") ? findPortInfo(day) : null;
  var place = day.port_name ? "<strong>" + day.port_name + "</strong>" : "";
  if (info) place = '<a href="ports.html#' + info.id + '" class="port-link"><strong>' + day.port_name + "</strong></a>";
  var wxSlot = (day.kind !== "sea" && day.lat != null)
    ? '<div class="wx-slot" data-lat="' + day.lat + '" data-lon="' + day.lon + '" data-date="' + day.date + '"><p class="wx-note">…</p></div>'
    : "";
  var todoHtml = "";
  if (info && info.do && info.do.length) {
    todoHtml = '<div class="port-todo"><span class="todo-label">📌 What to do:</span><ul>' +
      info.do.slice(0, 3).map(function(d){ return "<li>" + d + "</li>"; }).join("") +
      '</ul><a href="ports.html#' + info.id + '" class="port-more">Full port guide →</a></div>';
  }
  return '<div class="day-row">' +
    '<div class="day-date">' + fmtDate(day.date) + "<br>" + badge + "</div>" +
    '<div class="day-body">' + place + wxSlot + todoHtml + "</div></div>";
}

function sailingCard(s, idx){
  var calls = s.itinerary.filter(function(d){ return d.kind === "call"; }).length;
  var last = s.itinerary[s.itinerary.length - 1];
  var disembark = last.port_name || "";
  var html = '<div class="sailing-card">' +
    '<h3>' + s.ship_name + "</h3>" +
    '<p class="sail-meta">' + T.departs + " " + fmtDate(s.departure_date) + " · " + s.nights + " " + T.nights +
    " · " + s.embark_port + " → " + disembark + " · " + calls + " " + T.portCalls + "</p>" +
    '<button class="btn ghost small toggle-itin" data-idx="' + idx + '">' + T.viewItin + "</button>" +
    '<div class="itin" id="itin-' + idx + '" style="display:none">' +
      s.itinerary.map(dayRow).join("") +
      '<p class="wx-note"><a href="' + T.plannerUrl + '">' + T.planPort + " →</a></p>" +
    "</div></div>";
  return html;
}

function hydrateWeather(root){
  var slots = root.querySelectorAll(".wx-slot");
  slots.forEach(function(slot){
    fetchWx(parseFloat(slot.dataset.lat), parseFloat(slot.dataset.lon), slot.dataset.date)
      .then(function(wx){ slot.innerHTML = wxHtml(wx); });
  });
}

function bindToggle(root){
  root.addEventListener("click", function(e){
    var b = e.target.closest(".toggle-itin");
    if (!b) return;
    var panel = document.getElementById("itin-" + b.dataset.idx);
    var open = panel.style.display !== "none";
    panel.style.display = open ? "none" : "block";
    b.textContent = open ? T.viewItin : T.hideItin;
    if (!open) hydrateWeather(panel);
  });
}

window.SailFinder = {
  LINE_NAMES: LINE_NAMES, loadData: loadData, lineOptions: lineOptions,
  shipOptions: shipOptions, findShip: findShip, sailingsFor: sailingsFor,
  sailingCard: sailingCard, fmtCap: fmtCap, fmtDate: fmtDate,
  hydrateWeather: hydrateWeather, bindToggle: bindToggle, getT: function(){ return T; }
};
})();
