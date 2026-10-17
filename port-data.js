/* Port database for the Casino Cruiser Port Day Planner.
   30 cruise ports + 2 embarkation ports. Coordinates feed Open-Meteo
   (free, no key) for live weather. merch: Printify product URL when live. */
const PORTS = [
 // Caribbean
 {id:"cozumel", name:"Cozumel", country:"Mexico", region:"Caribbean", lat:20.51, lon:-86.95, merch:null,
  do:["Snorkel Palancar Reef — drift diving over coral gardens, 10 min from the pier","Playa Mia or Mr Sanchos beach clubs for an all-inclusive day","Rent a jeep and circle the island: Punta Sur lighthouse + wild east-side beaches"]},
 {id:"nassau", name:"Nassau", country:"Bahamas", region:"Caribbean", lat:25.06, lon:-77.35, merch:null,
  do:["Atlantis Aquaventure water park — the big-ticket day if you go once","Straw Market + Bay Street for souvenirs, 10 min walk from port","Harbor catamaran sail with snorkel stop over the reefs"]},
 {id:"st-thomas", name:"St. Thomas", country:"US Virgin Islands", region:"Caribbean", lat:18.34, lon:-64.93, merch:null,
  do:["Magens Bay — consistently ranked a top-10 world beach","Skyride to Paradise Point for the harbor view + bushwacker","Charlotte Amalie: duty-free shopping and Danish colonial streets"]},
 {id:"st-maarten", name:"St. Maarten", country:"St. Martin / St. Maarten", region:"Caribbean", lat:18.02, lon:-63.04, merch:null,
  do:["Maho Beach — watch jets land right over your head","Orient Bay for beach clubs and French-side lunch","Catamaran to Anguilla or around the island lagoons"]},
 {id:"san-juan", name:"San Juan", country:"Puerto Rico", region:"Caribbean", lat:18.47, lon:-66.11, merch:null,
  do:["Walk Old San Juan: El Morro fortress, blue cobblestones, pina colada birthplace","Bacardi distillery tour across the bay in Catano","Rainforest day trip to El Yunque if you have 6+ hours"]},
 {id:"grand-cayman", name:"Grand Cayman", country:"Cayman Islands", region:"Caribbean", lat:19.29, lon:-81.38, merch:null,
  do:["Stingray City sandbar — stand in waist-deep water with the rays","Seven Mile Beach for the classic postcard afternoon","Tender port: leave early, lines build by mid-morning"]},
 {id:"ocho-rios", name:"Ocho Rios", country:"Jamaica", region:"Caribbean", lat:18.41, lon:-77.11, merch:null,
  do:["Climb Dunn's River Falls with a guide — the signature excursion","Bamboo rafting on the Martha Brae for a slow morning","Mystic Mountain bobsled + zipline combo"]},
 {id:"roatan", name:"Roatán", country:"Honduras", region:"Caribbean", lat:16.30, lon:-86.55, merch:null,
  do:["West Bay Beach — the island's best sand, reef right offshore","Snorkel the Mesoamerican Barrier Reef from shore","Sloth + monkey sanctuary visit in the hills"]},
 {id:"belize-city", name:"Belize City", country:"Belize", region:"Caribbean", lat:17.50, lon:-88.19, merch:null,
  do:["Tender port + long excursions: Altun Ha Mayan ruins is the classic","Cave tubing through the rainforest river caves","Hol Chan-style reef snorkel via Caye Caulker boats"]},
 {id:"grand-turk", name:"Grand Turk", country:"Turks & Caicos", region:"Caribbean", lat:21.47, lon:-71.13, merch:null,
  do:["Gibbs Cay stingray encounter by boat","The cruise center beach is genuinely good — stay close","Dive the wall: 7,000-ft drop-off 15 min offshore"]},
 // Alaska
 {id:"juneau", name:"Juneau", country:"Alaska, USA", region:"Alaska", lat:58.30, lon:-134.42, merch:null,
  do:["Mendenhall Glacier + Nugget Falls — bus or tour, go early","Mount Roberts tramway from right at the pier","Whale watching in Auke Bay, peak in summer"]},
 {id:"ketchikan", name:"Ketchikan", country:"Alaska, USA", region:"Alaska", lat:55.34, lon:-131.65, merch:null,
  do:["Misty Fjords floatplane — the splurge that earns it","Creek Street boardwalk + Saxman totem park","Lumberjack show: cheesy, fun, right in town"]},
 {id:"skagway", name:"Skagway", country:"Alaska, USA", region:"Alaska", lat:59.45, lon:-135.33, merch:null,
  do:["White Pass railway to the Yukon summit — book ahead","Walk the Klondike Gold Rush streets + Red Onion Saloon","Hike Lower Dewey Lake trail if you want legs"]},
 // Mexican Riviera
 {id:"cabo", name:"Cabo San Lucas", country:"Mexico", region:"Mexican Riviera", lat:22.89, lon:-109.91, merch:null,
  do:["El Arco boat tour — the arch + sea lion colony","Medano Beach for swim + beach bars","Tender port: last tender lines are long, plan buffer"]},
 {id:"puerto-vallarta", name:"Puerto Vallarta", country:"Mexico", region:"Mexican Riviera", lat:20.62, lon:-105.23, merch:null,
  do:["Malecon boardwalk + old town, easy walk from port","Marietas Islands: hidden beach boat trip","Rhythms of the Night dinner cruise if overnight"]},
 {id:"mazatlan", name:"Mazatlán", country:"Mexico", region:"Mexican Riviera", lat:23.25, lon:-106.42, merch:null,
  do:["Cliff divers at El Mirador + old town plaza","Stone Island beach day by water taxi","Take the pulmonia (open-air taxi) along the malecon"]},
 // Mediterranean
 {id:"barcelona", name:"Barcelona", country:"Spain", region:"Mediterranean", lat:41.38, lon:2.18, merch:"https://hedgewiz.printify.me/product/33230520",
  do:["Sagrada Familia — book the timed entry before you sail","Gothic Quarter wander + tapas crawl","Port is 30+ min from the sights: use the shuttle or taxi"]},
 {id:"rome", name:"Rome (Civitavecchia)", country:"Italy", region:"Mediterranean", lat:42.09, lon:11.79, merch:"https://hedgewiz.printify.me/product/33230522",
  do:["Rome is 90 min away: train from Civitavecchia or ship tour","Colosseum + Forum with timed entry if DIY","Short day? Tarquinia Etruscan tombs, 20 min away"]},
 {id:"venice", name:"Venice", country:"Italy", region:"Mediterranean", lat:45.44, lon:12.34, merch:null,
  do:["Most ships now dock at Marghera/Chioggia: check your terminal","St Mark's + Doge's Palace, timed entries essential","Gondola ride at opening to beat crowds"]},
 {id:"athens", name:"Athens (Piraeus)", country:"Greece", region:"Mediterranean", lat:37.94, lon:23.64, merch:"https://hedgewiz.printify.me/product/33230517",
  do:["Acropolis first thing — opens 8 AM, crowds by 10","Plaka lunch under the Parthenon","Metro from Piraeus to Monastiraki: 20 min, cheap"]},
 {id:"santorini", name:"Santorini", country:"Greece", region:"Mediterranean", lat:36.42, lon:25.46, merch:null,
  do:["Tender + cable car lines are brutal: go early or book a tour","Oia blue domes, then back before the crowds","Catamaran caldera sail with hot springs swim"]},
 {id:"istanbul", name:"Istanbul", country:"Turkey", region:"Mediterranean", lat:41.01, lon:28.98, merch:"https://hedgewiz.printify.me/product/33230524",
  do:["Blue Mosque + Hagia Sophia, walkable from Galataport","Grand Bazaar haggle + Turkish lunch","Bosphorus sunset cruise if you overnight"]},
 {id:"alexandria", name:"Alexandria", country:"Egypt", region:"Mediterranean", lat:31.20, lon:29.90, merch:null,
  do:["Full-day Cairo/Giza is 3+ hrs each way: ship tour recommended","Bibliotheca Alexandrina + citadel for a local day","Port Said alternative: same Cairo math applies"]},
 // Northern Europe
 {id:"reykjavik", name:"Reykjavik", country:"Iceland", region:"Northern Europe", lat:64.15, lon:-21.94, merch:null,
  do:["Golden Circle in a day: Thingvellir, Geysir, Gullfoss","Blue Lagoon or Sky Lagoon — book ahead","Puffin watching boat tours in summer"]},
 {id:"bergen", name:"Bergen", country:"Norway", region:"Northern Europe", lat:60.39, lon:5.32, merch:null,
  do:["Floibanen funicular for the fjord-city view","Bryggen wharf: Hanseatic alleys + fish market","Norway in a Nutshell add-on if you overnight"]},
 // South America
 {id:"rio", name:"Rio de Janeiro", country:"Brazil", region:"South America", lat:-22.91, lon:-43.17, merch:null,
  do:["Christ the Redeemer at opening — timed tickets","Sugarloaf cable car at sunset","Copacabana/Ipanema beach walk between"]},
 {id:"buenos-aires", name:"Buenos Aires", country:"Argentina", region:"South America", lat:-34.60, lon:-58.38, merch:null,
  do:["La Boca's Caminito street + San Telmo market","Tango show with dinner for an evening in port","Recoleta Cemetery + Palermo parks"]},
 {id:"valparaiso", name:"Valparaiso", country:"Chile", region:"South America", lat:-33.04, lon:-71.63, merch:null,
  do:["Hillside ascensores + street art walking tour","Wine day in Casablanca Valley between port and Santiago","Santiago is 90 min: full-day commitment"]},
 {id:"ushuaia", name:"Ushuaia", country:"Argentina", region:"South America", lat:-54.80, lon:-68.30, merch:null,
  do:["End of the world: Beagle Channel boat with sea lions","Tierra del Fuego National Park, easy half day","Penguin colony at Martillo Island (seasonal)"]},
 // Antarctica
 {id:"antarctica", name:"Antarctica (Paradise Bay)", country:"Antarctica", region:"Antarctica", lat:-64.82, lon:-62.87, merch:null,
  do:["Zodiac cruising among icebergs — the core experience","Penguin colonies: gentoo + chinstrap up close","Polar plunge if your expedition allows it"]},
 // Embarkation ports (for sample itineraries)
 {id:"miami", name:"Miami", country:"Florida, USA", region:"Embarkation", lat:25.77, lon:-80.19, merch:null, embark:true,
  do:["South Beach + Little Havana if you fly in early","Wynwood Walls street art district"]},
 {id:"seattle", name:"Seattle", country:"Washington, USA", region:"Embarkation", lat:47.61, lon:-122.33, merch:null, embark:true,
  do:["Pike Place Market + Space Needle pre-cruise","Chihuly Garden glass exhibit"]},
];
const PORT_BY_ID = Object.fromEntries(PORTS.map(p => [p.id, p]));

/* Sample 7-day itineraries. sea:true = day at sea. */
const ITINERARIES = [
 {id:"w-carib", name:"7-Day Western Caribbean", from:"Miami",
  days:[{d:1,port:"miami",note:"Embark"},{d:2,sea:true},{d:3,port:"cozumel"},{d:4,port:"grand-cayman"},{d:5,port:"ocho-rios"},{d:6,sea:true},{d:7,port:"miami",note:"Debark"}]},
 {id:"e-carib", name:"7-Day Eastern Caribbean", from:"Miami",
  days:[{d:1,port:"miami",note:"Embark"},{d:2,sea:true},{d:3,port:"st-thomas"},{d:4,port:"san-juan"},{d:5,port:"grand-turk"},{d:6,sea:true},{d:7,port:"miami",note:"Debark"}]},
 {id:"alaska", name:"7-Day Alaska Inside Passage", from:"Seattle",
  days:[{d:1,port:"seattle",note:"Embark"},{d:2,sea:true},{d:3,port:"juneau"},{d:4,port:"skagway"},{d:5,port:"ketchikan"},{d:6,sea:true},{d:7,port:"seattle",note:"Debark"}]},
 {id:"greek", name:"7-Day Greek Isles & Turkey", from:"Athens",
  days:[{d:1,port:"athens",note:"Embark"},{d:2,port:"santorini"},{d:3,port:"istanbul"},{d:4,sea:true},{d:5,port:"alexandria"},{d:6,port:"athens"},{d:7,port:"athens",note:"Debark"}]},
];
