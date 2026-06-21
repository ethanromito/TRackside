"use strict";

const START_ISO = "2026-01-01";
const END_ISO = "2027-12-31";
const DAY_MS = 24 * 60 * 60 * 1000;
const STORAGE_KEY = "trackside.collection.v1";

const THEME_LIBRARY = {
  riviera: {
    accent: "#d9a441",
    secondary: "#2e8f78",
    skyTop: "#516f75",
    skyBottom: "#d9b56c",
    terrain: "#2f5c56",
    water: "#1d6f7a",
    architecture: "#dbc49a",
    asphalt: "#1f1d18",
    track: "#fff3d6",
    curb: "#b94234",
  },
  alpine: {
    accent: "#e0b456",
    secondary: "#4b8a62",
    skyTop: "#526b6c",
    skyBottom: "#b8a16f",
    terrain: "#244336",
    water: "#2a6d73",
    architecture: "#c9b991",
    asphalt: "#201f1a",
    track: "#f6eedc",
    curb: "#c74735",
  },
  forest: {
    accent: "#c89b46",
    secondary: "#5e8f5f",
    skyTop: "#455b4f",
    skyBottom: "#b8aa76",
    terrain: "#233f2f",
    water: "#2d625f",
    architecture: "#b8a275",
    asphalt: "#1d1d19",
    track: "#f3ead5",
    curb: "#d6d0b2",
  },
  heritage: {
    accent: "#cfa24b",
    secondary: "#a94032",
    skyTop: "#5b5650",
    skyBottom: "#c1a06c",
    terrain: "#4b4638",
    water: "#315f66",
    architecture: "#d7bf91",
    asphalt: "#1d1b17",
    track: "#fff0cf",
    curb: "#b33c2f",
  },
  city: {
    accent: "#d8b14b",
    secondary: "#7c8f8d",
    skyTop: "#4e5658",
    skyBottom: "#c0995d",
    terrain: "#36362f",
    water: "#256877",
    architecture: "#b7b0a0",
    asphalt: "#1a1916",
    track: "#f8eed7",
    curb: "#c44c39",
  },
  desert: {
    accent: "#d49c45",
    secondary: "#917047",
    skyTop: "#6c6151",
    skyBottom: "#d0a35d",
    terrain: "#7a6040",
    water: "#2f6870",
    architecture: "#ceb07d",
    asphalt: "#211d18",
    track: "#f7ecd4",
    curb: "#c44935",
  },
  coast: {
    accent: "#d5a64b",
    secondary: "#2f8b88",
    skyTop: "#506d75",
    skyBottom: "#cfad72",
    terrain: "#486246",
    water: "#1f6f82",
    architecture: "#cfbc91",
    asphalt: "#1f1d18",
    track: "#f7efd9",
    curb: "#c43f33",
  },
};

const FACT_CATEGORIES = [
  {
    label: "Heritage",
    getFact: (track) => track.heritage,
  },
  {
    label: "Landscape",
    getFact: (track) => track.landscape,
  },
  {
    label: "Engineering",
    getFact: (track) => track.engineering,
  },
  {
    label: "Iconic Corner",
    getFact: (track) => track.cornerFact,
  },
  {
    label: "Legacy",
    getFact: (track) => track.achievement,
  },
];

const masterTrackList = [
  {
    id: "monaco",
    name: "Circuit de Monaco",
    location: "Monte Carlo, Monaco",
    length: "3.337 km",
    opened: "1929",
    elevation: "Harbor climb",
    type: "Street circuit",
    theme: "riviera",
    scenery: ["coast", "city", "heritage"],
    weight: 8,
    landmark: "Casino Square, Port Hercule, and the cliffside run toward the tunnel make Monaco feel carved into the Riviera.",
    corner: "Fairmont Hairpin",
    cornerFact: "The Fairmont Hairpin is taken at walking pace by racing standards, yet it is one of the most photographed corners in motorsport.",
    heritage: "First raced in 1929, Monaco turned a compact city route into the sport's most theatrical test of precision.",
    landscape: "The circuit threads between yachts, stone walls, apartments, and the Mediterranean instead of grandstands and runoff.",
    engineering: "Its narrow streets force low-speed rotation, braking stability, and traction to matter more than outright horsepower.",
    achievement: "Graham Hill's five Monaco Grand Prix wins helped cement the race as a crown jewel of Formula 1.",
    prompt: "Cinematic dawn aerial over Monaco harbor, Casino Square, tunnel mouth, yachts, sea walls, and a glowing street-circuit ribbon.",
    outline: "M18 63 C24 48 32 46 36 31 C41 17 55 21 55 35 C55 43 43 44 45 55 C47 68 69 56 76 65 C84 75 68 86 48 82 C31 78 15 78 18 63Z",
    marker: [18, 63],
  },
  {
    id: "spa-francorchamps",
    name: "Spa-Francorchamps",
    location: "Stavelot, Belgium",
    length: "7.004 km",
    opened: "1921",
    elevation: "Ardennes rise",
    type: "Grand Prix road course",
    theme: "forest",
    scenery: ["forest", "mountain", "heritage"],
    weight: 8,
    landmark: "The Ardennes forest surrounds the circuit with mist, deep greens, and sudden weather shifts.",
    corner: "Eau Rouge and Raidillon",
    cornerFact: "Eau Rouge and Raidillon launch cars uphill in a left-right-left compression that still defines Spa's identity.",
    heritage: "Spa began on public roads between Francorchamps, Malmedy, and Stavelot before becoming a modern closed course.",
    landscape: "Long forested straights, valley floors, and steep climbs make the lap feel like a high-speed tour through the Ardennes.",
    engineering: "Teams chase a rare balance between low-drag speed for Kemmel and confidence through fast, loaded corners.",
    achievement: "The Belgian Grand Prix has produced era-defining wet races, endurance classics, and some of racing's bravest qualifying laps.",
    prompt: "Cinematic aerial over Spa in the Ardennes, fog lifting from forest, Raidillon climbing sharply, long straights disappearing into trees.",
    outline: "M16 70 C22 48 28 38 39 45 C49 52 45 25 60 18 C75 11 90 27 78 42 C68 55 91 61 80 77 C68 94 39 88 24 84 C16 82 12 78 16 70Z",
    marker: [16, 70],
  },
  {
    id: "le-mans",
    name: "Circuit de la Sarthe",
    location: "Le Mans, France",
    length: "13.626 km",
    opened: "1923",
    elevation: "Country-road speed",
    type: "Endurance road circuit",
    theme: "heritage",
    scenery: ["forest", "heritage"],
    weight: 8,
    landmark: "The Mulsanne Straight and the village-edge public roads give Le Mans its unmistakable endurance atmosphere.",
    corner: "Tertre Rouge",
    cornerFact: "Tertre Rouge decides how much speed a driver can carry onto the long Mulsanne section.",
    heritage: "The 24 Hours of Le Mans began in 1923 as a proving ground for speed, reliability, lighting, brakes, and stamina.",
    landscape: "The lap blends permanent circuit, forest edge, villages, and public-road character into one long night-and-day journey.",
    engineering: "Le Mans rewards low drag, stable braking from extreme speeds, and cars that can stay gentle on tires for hours.",
    achievement: "Manufacturers from Bentley to Ferrari, Porsche, Audi, Toyota, and Ford built legends on this course.",
    prompt: "Cinematic aerial of Le Mans at golden hour, Mulsanne cutting through countryside, grandstands, forest, and endurance headlights.",
    outline: "M12 58 C22 38 37 33 51 18 C61 7 75 13 70 29 C65 45 87 43 89 59 C91 75 74 87 51 83 C32 80 5 78 12 58Z",
    marker: [12, 58],
  },
  {
    id: "nurburgring-nordschleife",
    name: "Nurburgring Nordschleife",
    location: "Nurburg, Germany",
    length: "20.832 km",
    opened: "1927",
    elevation: "Eifel mountains",
    type: "Mountain road course",
    theme: "forest",
    scenery: ["forest", "mountain"],
    weight: 8,
    landmark: "The Eifel forest wraps around miles of crests, blind entries, and villages near the old castle at Nurburg.",
    corner: "Karussell",
    cornerFact: "The Karussell's banked concrete bowl pulls cars into a tight, rough arc that feels unlike any modern corner.",
    heritage: "Opened in 1927, the Nordschleife became the benchmark for courage, development, and lap-record mythology.",
    landscape: "The circuit rises, dives, and vanishes through trees with more than 150 corners across a single lap.",
    engineering: "Its surface changes, compression zones, and blind crests expose every weakness in suspension and driver rhythm.",
    achievement: "Jackie Stewart's 'Green Hell' nickname captured both its beauty and its unforgiving reputation.",
    prompt: "Cinematic aerial over the Nurburgring Nordschleife, Eifel forest, castle ridge, endless ribbon of asphalt, mist and elevation.",
    outline: "M13 70 C20 44 35 48 31 30 C28 12 57 8 69 22 C80 35 59 42 72 53 C86 66 76 86 53 82 C36 80 37 94 22 85 C12 79 9 75 13 70Z",
    marker: [13, 70],
  },
  {
    id: "suzuka",
    name: "Suzuka Circuit",
    location: "Suzuka, Japan",
    length: "5.807 km",
    opened: "1962",
    elevation: "Figure-eight flow",
    type: "Grand Prix road course",
    theme: "forest",
    scenery: ["forest", "heritage"],
    weight: 7,
    landmark: "The crossover bridge gives Suzuka its rare figure-eight silhouette.",
    corner: "130R",
    cornerFact: "130R is a fast, committed left-hander that rewards a car planted enough to trust at very high speed.",
    heritage: "Designed as a Honda test track, Suzuka grew into one of the world's most complete driver circuits.",
    landscape: "Trees, service roads, and the overpass frame a flowing lap that feels compact but never simple.",
    engineering: "The S Curves, Degners, Spoon, and 130R demand a chassis that can change direction without losing balance.",
    achievement: "Several Formula 1 championships were decided at Suzuka, including unforgettable late-season Japanese Grands Prix.",
    prompt: "Cinematic aerial of Suzuka's figure-eight layout, crossover bridge, wooded infield, S Curves, and low autumn light.",
    outline: "M15 58 C23 35 43 39 52 52 C61 65 79 66 83 52 C88 35 62 22 49 36 C36 51 27 77 47 82 C62 86 69 73 55 63 C41 52 27 74 15 58Z",
    marker: [15, 58],
  },
  {
    id: "monza",
    name: "Autodromo Nazionale Monza",
    location: "Monza, Italy",
    length: "5.793 km",
    opened: "1922",
    elevation: "Royal park speed",
    type: "Grand Prix road course",
    theme: "heritage",
    scenery: ["forest", "heritage"],
    weight: 7,
    landmark: "The old banking still sleeps in the trees of the royal park like a concrete monument to speed.",
    corner: "Parabolica",
    cornerFact: "Parabolica asks drivers to stay patient on entry so the car can breathe onto the main straight.",
    heritage: "Monza opened in 1922 and became Italy's temple of speed, where slipstreams and tifosi shape the air.",
    landscape: "Fast straights cut through parkland, with grandstands and old concrete banking adding layers of history.",
    engineering: "Low drag, braking confidence, and curb control matter because the lap is built around speed interrupted by chicanes.",
    achievement: "Ferrari victories at Monza have produced some of Formula 1's loudest and most emotional podium scenes.",
    prompt: "Cinematic aerial over Monza, royal park trees, old banking, main straight, Parabolica, and packed Italian grandstands.",
    outline: "M16 53 C18 25 39 14 62 18 C82 22 88 39 79 53 C68 69 84 78 64 85 C43 92 18 78 16 53Z",
    marker: [16, 53],
  },
  {
    id: "silverstone",
    name: "Silverstone Circuit",
    location: "Towcester, England",
    length: "5.891 km",
    opened: "1948",
    elevation: "Airfield sweep",
    type: "Grand Prix road course",
    theme: "heritage",
    scenery: ["heritage", "field"],
    weight: 7,
    landmark: "Its old airfield roots still show in the broad, open geometry of the Northamptonshire site.",
    corner: "Maggotts and Becketts",
    cornerFact: "Maggotts, Becketts, and Chapel form a high-speed direction-change sequence that exposes aerodynamic balance.",
    heritage: "Silverstone hosted the first Formula 1 World Championship Grand Prix in 1950.",
    landscape: "Open fields, huge skies, and wide sightlines make the track feel fast before the cars even arrive.",
    engineering: "The lap rewards aero stability through rapid linked corners and braking strength into heavy stops.",
    achievement: "British racing history runs through Silverstone, from early airfield races to modern championship battles.",
    prompt: "Cinematic aerial over Silverstone, former airfield geometry, Maggotts-Becketts sweep, hangar echoes, and British summer light.",
    outline: "M17 42 C30 20 54 19 68 29 C79 37 76 51 87 59 C77 72 56 65 48 82 C35 76 21 78 18 64 C15 55 8 51 17 42Z",
    marker: [17, 42],
  },
  {
    id: "mount-panorama",
    name: "Mount Panorama",
    location: "Bathurst, Australia",
    length: "6.213 km",
    opened: "1938",
    elevation: "Mountain descent",
    type: "Public-road circuit",
    theme: "alpine",
    scenery: ["mountain", "heritage"],
    weight: 7,
    landmark: "The course climbs from town streets to the skyline before plunging through the Esses and the Dipper.",
    corner: "The Dipper",
    cornerFact: "The Dipper drops so sharply that cars appear to fall off the mountain before catching the next piece of road.",
    heritage: "Bathurst turned a public scenic road into one of touring car racing's great annual pilgrimages.",
    landscape: "Panoramic ridgelines, eucalyptus slopes, and town views make the elevation change visible from almost every angle.",
    engineering: "Cars need straight-line speed for Conrod and compliance for the narrow, cambered mountain section.",
    achievement: "The Bathurst 1000 made Mount Panorama sacred ground for Australian motorsport fans.",
    prompt: "Cinematic aerial over Mount Panorama at Bathurst, town below, mountain ridge, Conrod Straight, Esses, and warm Australian light.",
    outline: "M20 75 C12 52 29 36 39 21 C50 5 69 14 65 33 C62 49 86 52 82 68 C77 87 35 91 20 75Z",
    marker: [20, 75],
  },
  {
    id: "laguna-seca",
    name: "Laguna Seca",
    location: "Monterey, California",
    length: "3.602 km",
    opened: "1957",
    elevation: "Dry-lake corkscrew",
    type: "Road course",
    theme: "desert",
    scenery: ["desert", "mountain"],
    weight: 6,
    landmark: "The Corkscrew drops through Monterey hills with the Pacific not far beyond the ridge.",
    corner: "The Corkscrew",
    cornerFact: "The Corkscrew is a blind left-right plunge where the car turns before the driver can fully see the exit.",
    heritage: "Laguna Seca grew from California sports-car culture into a global landmark for bikes, prototypes, and GT cars.",
    landscape: "Dry grass, rolling hills, and coastal light give the circuit a golden, unmistakably Californian look.",
    engineering: "Elevation and traction changes make braking and rotation more important than the short lap first suggests.",
    achievement: "Alex Zanardi's 1996 pass on Bryan Herta became one of the defining moments of American open-wheel racing.",
    prompt: "Cinematic aerial of Laguna Seca, golden Monterey hills, Corkscrew drop, dry lakebed tones, and Pacific haze.",
    outline: "M20 65 C25 38 41 24 61 22 C78 20 86 34 73 45 C58 58 77 72 61 82 C44 94 17 84 20 65Z",
    marker: [20, 65],
  },
  {
    id: "cota",
    name: "Circuit of the Americas",
    location: "Austin, Texas",
    length: "5.513 km",
    opened: "2012",
    elevation: "Turn 1 climb",
    type: "Grand Prix road course",
    theme: "desert",
    scenery: ["desert", "city"],
    weight: 5,
    landmark: "The observation tower and steep climb to Turn 1 give COTA an instant skyline.",
    corner: "Turn 1",
    cornerFact: "Turn 1 rises dramatically from the start-finish straight, creating a braking zone that invites bold moves.",
    heritage: "COTA gave Formula 1 a purpose-built modern home in the United States.",
    landscape: "Texas scrubland, amphitheater slopes, and the red tower make the circuit read clearly from the air.",
    engineering: "The lap mixes Suzuka-style esses, heavy braking, long acceleration, and a technical stadium section.",
    achievement: "Its United States Grand Prix crowds helped make Austin a modern F1 festival city.",
    prompt: "Cinematic aerial of COTA, red observation tower, steep Turn 1 hill, amphitheater, Texas scrub, and sunset grandstands.",
    outline: "M17 56 C23 29 46 21 61 32 C74 42 52 51 64 63 C79 80 54 88 37 78 C25 71 11 73 17 56Z",
    marker: [17, 56],
  },
  {
    id: "imola",
    name: "Imola",
    location: "Imola, Italy",
    length: "4.909 km",
    opened: "1953",
    elevation: "Parkland rhythm",
    type: "Grand Prix road course",
    theme: "heritage",
    scenery: ["forest", "heritage"],
    weight: 6,
    landmark: "The Santerno River, old town edge, and parkland setting give Imola a layered Italian identity.",
    corner: "Acque Minerali",
    cornerFact: "Acque Minerali drops and rises through a technical pair of right-handers that reward patience and traction.",
    heritage: "Officially Autodromo Enzo e Dino Ferrari, Imola carries triumph, tragedy, and deep Ferrari-country emotion.",
    landscape: "Trees, riverbanks, and historic walls make the circuit feel woven into the town rather than placed beside it.",
    engineering: "Anti-clockwise flow, curb usage, and medium-speed balance define the lap more than raw top speed.",
    achievement: "The 1994 San Marino Grand Prix changed Formula 1 safety forever.",
    prompt: "Cinematic aerial of Imola, Santerno River, Italian parkland, old-town edge, Tamburello, and golden Emilia-Romagna light.",
    outline: "M19 57 C20 36 43 25 58 31 C75 38 83 54 70 63 C56 73 58 86 39 82 C22 78 13 70 19 57Z",
    marker: [19, 57],
  },
  {
    id: "mugello",
    name: "Mugello",
    location: "Scarperia e San Piero, Italy",
    length: "5.245 km",
    opened: "1974",
    elevation: "Tuscan sweep",
    type: "Road course",
    theme: "alpine",
    scenery: ["mountain", "field"],
    weight: 4,
    landmark: "Tuscan hills surround Mugello with long sightlines and a spectacularly fast main straight.",
    corner: "Arrabbiata 1 and 2",
    cornerFact: "The Arrabbiata corners are fast, uphill, and loaded, asking drivers to trust grip through sustained lateral force.",
    heritage: "Mugello's modern circuit inherited the spirit of road races once held through nearby Tuscan villages.",
    landscape: "The track folds into green hills, cypress lines, and open countryside north of Florence.",
    engineering: "High-speed changes of direction and elevation make tire temperature and aero confidence essential.",
    achievement: "Mugello has become a beloved MotoGP stage and hosted Formula 1's Tuscan Grand Prix in 2020.",
    prompt: "Cinematic aerial over Mugello, Tuscan hills, cypress roads, Arrabbiata sweep, long straight, and warm stone villages.",
    outline: "M14 60 C25 38 43 17 58 24 C74 32 80 50 70 58 C57 68 77 80 58 87 C37 94 7 80 14 60Z",
    marker: [14, 60],
  },
  {
    id: "red-bull-ring",
    name: "Red Bull Ring",
    location: "Spielberg, Austria",
    length: "4.318 km",
    opened: "1969",
    elevation: "Styrian bowl",
    type: "Alpine road course",
    theme: "alpine",
    scenery: ["mountain", "field"],
    weight: 5,
    landmark: "The circuit sits in a natural amphitheater under green Styrian hills.",
    corner: "Remus",
    cornerFact: "The uphill Remus hairpin creates a heavy braking zone where slipstream battles often detonate.",
    heritage: "From the Osterreichring to the A1-Ring to the Red Bull Ring, Spielberg has kept Austria on the Grand Prix map.",
    landscape: "Short straights, steep climbs, and mountain views make the lap feel compact but dramatic.",
    engineering: "Traction out of slow corners and braking stability matter because the lap has few places to hide mistakes.",
    achievement: "The circuit's modern revival brought Formula 1 back to Austria and turned the hills into a festival bowl.",
    prompt: "Cinematic aerial of the Red Bull Ring, Styrian mountains, amphitheater hills, uphill Turn 3, and green grandstands.",
    outline: "M19 64 C19 43 35 24 55 24 C73 25 84 43 76 58 C69 72 83 82 62 87 C40 92 18 82 19 64Z",
    marker: [19, 64],
  },
  {
    id: "interlagos",
    name: "Interlagos",
    location: "Sao Paulo, Brazil",
    length: "4.309 km",
    opened: "1940",
    elevation: "Urban bowl",
    type: "Grand Prix road course",
    theme: "city",
    scenery: ["city", "heritage"],
    weight: 6,
    landmark: "The circuit sits inside Sao Paulo's city fabric with grandstands pressed around the Senna S.",
    corner: "Senna S",
    cornerFact: "The Senna S invites overtakes at the end of the main straight and immediately tests traction on exit.",
    heritage: "Officially Autodromo Jose Carlos Pace, Interlagos has long carried Brazilian racing passion and weather drama.",
    landscape: "A natural bowl, skyline edges, and sudden rain give the place its live-wire energy.",
    engineering: "Anti-clockwise load, altitude, bumps, and tire degradation create races that rarely settle down.",
    achievement: "Championships in 2007, 2008, and 2012 gave Interlagos some of modern F1's most tense finales.",
    prompt: "Cinematic aerial of Interlagos, Sao Paulo skyline, Senna S, natural bowl grandstands, storm clouds, and late sun.",
    outline: "M18 46 C31 28 52 21 70 32 C87 43 81 65 62 70 C46 75 52 90 32 83 C14 77 6 61 18 46Z",
    marker: [18, 46],
  },
  {
    id: "marina-bay",
    name: "Marina Bay",
    location: "Singapore",
    length: "4.940 km",
    opened: "2008",
    elevation: "Night skyline",
    type: "Street circuit",
    theme: "city",
    scenery: ["city", "coast"],
    weight: 5,
    landmark: "Skyscrapers, the bay, and stadium lighting turn the circuit into a glowing night-time arena.",
    corner: "Anderson Bridge approach",
    cornerFact: "The old-city bridge sector compresses the field into a narrow, architectural section of the lap.",
    heritage: "Singapore introduced Formula 1's first night race and changed how a Grand Prix could look on television.",
    landscape: "The city skyline, waterfront, and dense lighting create an unmistakable urban race image.",
    engineering: "Heat, humidity, traction zones, and relentless braking make the race physically draining.",
    achievement: "Its night-race format became a modern classic and a benchmark for street-circuit presentation.",
    prompt: "Cinematic night aerial of Marina Bay, Singapore skyline, glowing street circuit, waterfront bridges, and reflections on the bay.",
    outline: "M22 76 C10 57 20 42 37 47 C52 52 45 27 62 24 C78 21 88 39 80 53 C71 67 88 74 73 85 C58 94 34 89 22 76Z",
    marker: [22, 76],
  },
  {
    id: "baku",
    name: "Baku City Circuit",
    location: "Baku, Azerbaijan",
    length: "6.003 km",
    opened: "2016",
    elevation: "Castle city sprint",
    type: "Street circuit",
    theme: "city",
    scenery: ["city", "coast", "heritage"],
    weight: 4,
    landmark: "The old city walls and the Caspian Sea boulevard give Baku a medieval-meets-modern look.",
    corner: "Castle section",
    cornerFact: "The castle section narrows sharply between stone walls, forcing Formula 1 cars through a corridor-like climb.",
    heritage: "Baku quickly became known for chaotic restarts, long slipstreams, and street-circuit unpredictability.",
    landscape: "Ancient walls, glass towers, and the waterfront make the lap feel like a city tour at racing speed.",
    engineering: "Teams chase low drag for the enormous straight while keeping enough downforce for tight old-city corners.",
    achievement: "The 2017 Azerbaijan Grand Prix delivered one of the wildest modern F1 races.",
    prompt: "Cinematic aerial over Baku, Caspian waterfront, Flame Towers, castle walls, narrow old city section, and long main straight.",
    outline: "M14 70 L30 70 C39 70 36 47 48 47 L72 47 C85 47 87 61 76 69 C65 77 75 88 55 88 C36 88 16 82 14 70Z",
    marker: [14, 70],
  },
  {
    id: "gilles-villeneuve",
    name: "Circuit Gilles Villeneuve",
    location: "Montreal, Canada",
    length: "4.361 km",
    opened: "1978",
    elevation: "Island park",
    type: "Island road circuit",
    theme: "coast",
    scenery: ["coast", "city", "forest"],
    weight: 5,
    landmark: "Ile Notre-Dame places the circuit between water, parkland, rowing basins, and the Montreal skyline.",
    corner: "Wall of Champions",
    cornerFact: "The final chicane punishes overcommitment with the famous Wall of Champions waiting on exit.",
    heritage: "Named for Gilles Villeneuve, Montreal's circuit balances city energy with parkland intimacy.",
    landscape: "Water on both sides and skyline views make the venue feel like a racing island.",
    engineering: "Long straights and heavy braking zones reward efficient cars that can attack curbs without losing stability.",
    achievement: "The 2011 Canadian Grand Prix became the longest Formula 1 race by duration and a comeback classic.",
    prompt: "Cinematic aerial of Circuit Gilles Villeneuve, Montreal skyline, island park, rowing basin, final chicane, and river light.",
    outline: "M13 58 C23 43 37 33 55 32 C76 31 88 43 82 60 C76 77 52 84 34 79 C19 75 6 70 13 58Z",
    marker: [13, 58],
  },
  {
    id: "zandvoort",
    name: "Zandvoort",
    location: "Zandvoort, Netherlands",
    length: "4.259 km",
    opened: "1948",
    elevation: "Dune banking",
    type: "Coastal road course",
    theme: "coast",
    scenery: ["coast", "desert"],
    weight: 4,
    landmark: "North Sea dunes wrap around the circuit, with modern banking giving the lap a distinctive flow.",
    corner: "Tarzanbocht",
    cornerFact: "Tarzanbocht is a heavy-braking first corner that invites brave lunges in front of huge orange crowds.",
    heritage: "Zandvoort's postwar circuit returned to the Formula 1 calendar with its seaside identity intact.",
    landscape: "Sand dunes, coastal wind, and compact sightlines make the venue feel close and alive.",
    engineering: "Banked corners and fast direction changes require a car that can lean on load without overheating tires.",
    achievement: "Its modern F1 revival turned the Dutch Grand Prix into one of Europe's loudest race weekends.",
    prompt: "Cinematic aerial of Zandvoort, North Sea dunes, banked corners, beachside wind, orange grandstands, and coastal haze.",
    outline: "M21 69 C14 48 33 27 54 25 C72 23 86 34 81 52 C76 70 58 64 56 80 C44 88 26 83 21 69Z",
    marker: [21, 69],
  },
  {
    id: "hockenheimring",
    name: "Hockenheimring",
    location: "Hockenheim, Germany",
    length: "4.574 km",
    opened: "1932",
    elevation: "Forest stadium",
    type: "Grand Prix road course",
    theme: "forest",
    scenery: ["forest", "heritage"],
    weight: 4,
    landmark: "The Motodrom stadium section packs grandstands tightly around the final corners.",
    corner: "Sachs Kurve",
    cornerFact: "Sachs Kurve sits inside the Motodrom, where patience and rear grip matter under grandstand pressure.",
    heritage: "Hockenheim evolved from long forest straights into a compact modern circuit with deep German Grand Prix history.",
    landscape: "Its identity still carries the contrast between forest speed and stadium intensity.",
    engineering: "The lap asks for braking strength, traction, and enough straight-line efficiency to attack into the hairpin.",
    achievement: "German Grand Prix weekends here became emotional home stages for drivers including Michael Schumacher and Sebastian Vettel.",
    prompt: "Cinematic aerial over Hockenheimring, Motodrom grandstands, forest edges, hairpin, and late-afternoon German summer light.",
    outline: "M18 57 C18 36 38 20 59 26 C80 32 88 50 75 64 C63 77 77 84 56 87 C34 90 17 76 18 57Z",
    marker: [18, 57],
  },
  {
    id: "brands-hatch",
    name: "Brands Hatch GP",
    location: "Kent, England",
    length: "3.916 km",
    opened: "1950",
    elevation: "Woodland amphitheater",
    type: "Historic road course",
    theme: "forest",
    scenery: ["forest", "heritage"],
    weight: 4,
    landmark: "Paddock Hill Bend falls away in a natural amphitheater that lets fans see the drama unfold.",
    corner: "Paddock Hill Bend",
    cornerFact: "Paddock Hill Bend is a fast downhill plunge where the track drops away just as the car commits.",
    heritage: "Brands Hatch grew from a grass-track venue into one of Britain's most loved racing stages.",
    landscape: "Woodland, elevation, and close spectator banks give the Grand Prix loop an intimate old-school feel.",
    engineering: "Blind crests and camber changes make rhythm and confidence more important than a perfect simulator line.",
    achievement: "The circuit hosted memorable British Grands Prix and countless touring car battles.",
    prompt: "Cinematic aerial of Brands Hatch GP, woodland amphitheater, Paddock Hill drop, close banks, and British racing heritage.",
    outline: "M24 71 C12 50 29 31 47 29 C66 27 82 41 78 58 C74 76 54 72 46 84 C34 93 27 84 24 71Z",
    marker: [24, 71],
  },
  {
    id: "donington-park",
    name: "Donington Park",
    location: "Leicestershire, England",
    length: "4.020 km",
    opened: "1931",
    elevation: "Parkland sweep",
    type: "Historic road course",
    theme: "heritage",
    scenery: ["forest", "field", "heritage"],
    weight: 4,
    landmark: "Craner Curves sweep downhill through open parkland with a rhythm that feels almost airborne.",
    corner: "Craner Curves",
    cornerFact: "Craner Curves reward bravery because the car is loaded, descending, and changing direction at speed.",
    heritage: "Donington was a prewar Grand Prix venue before becoming a beloved modern British circuit.",
    landscape: "Rolling parkland and the old estate setting make the lap feel naturally shaped.",
    engineering: "The first half favors flow and aero confidence; the Melbourne Loop adds heavy braking and traction.",
    achievement: "Ayrton Senna's opening lap in the wet at the 1993 European Grand Prix became racing folklore.",
    prompt: "Cinematic aerial of Donington Park, Craner Curves, green estate parkland, old paddock, and wet-weather atmosphere.",
    outline: "M18 61 C30 34 50 28 65 36 C82 45 75 63 61 66 C46 70 56 86 37 85 C20 84 9 75 18 61Z",
    marker: [18, 61],
  },
  {
    id: "goodwood",
    name: "Goodwood Motor Circuit",
    location: "West Sussex, England",
    length: "3.809 km",
    opened: "1948",
    elevation: "Estate airfield",
    type: "Historic road course",
    theme: "heritage",
    scenery: ["field", "heritage"],
    weight: 3,
    landmark: "The circuit circles the old airfield beside the Goodwood estate, with period detail everywhere.",
    corner: "Madgwick",
    cornerFact: "Madgwick is a long, fast right-hander where historic cars lean and slide in full view of the crowd.",
    heritage: "Goodwood preserves postwar British racing atmosphere more completely than almost any active venue.",
    landscape: "Open grass, hangars, estate buildings, and low Sussex light create a living time capsule.",
    engineering: "Momentum matters because vintage machinery flows across fast bends with minimal modern runoff.",
    achievement: "The Goodwood Revival turned the circuit into a global celebration of historic racing craft and style.",
    prompt: "Cinematic aerial of Goodwood Motor Circuit, estate lawns, vintage paddock, old airfield, Madgwick, and period race atmosphere.",
    outline: "M18 53 C20 31 39 18 60 22 C80 26 89 45 78 62 C66 80 40 87 24 76 C16 70 14 62 18 53Z",
    marker: [18, 53],
  },
  {
    id: "kyalami",
    name: "Kyalami",
    location: "Midrand, South Africa",
    length: "4.529 km",
    opened: "1961",
    elevation: "Highveld climb",
    type: "Grand Prix road course",
    theme: "desert",
    scenery: ["desert", "city"],
    weight: 3,
    landmark: "Highveld elevation and South African light give Kyalami a bright, open intensity.",
    corner: "The Crocodiles",
    cornerFact: "The Crocodiles section combines fast commitment with elevation and a circuit character unlike newer venues.",
    heritage: "Kyalami carried South Africa's Grand Prix era and later returned as a modernized international circuit.",
    landscape: "Dry grassland, distant city edges, and high-altitude air shape the venue's feel.",
    engineering: "Altitude reduces engine performance while flowing corners still demand strong aerodynamic balance.",
    achievement: "The circuit hosted decades of South African Grand Prix history and major endurance racing.",
    prompt: "Cinematic aerial of Kyalami, Highveld grassland, modern paddock, elevation change, Johannesburg edge, and copper sunset.",
    outline: "M18 66 C24 42 44 26 63 31 C80 36 84 54 73 66 C60 79 70 89 50 88 C29 87 11 80 18 66Z",
    marker: [18, 66],
  },
  {
    id: "fuji",
    name: "Fuji Speedway",
    location: "Oyama, Japan",
    length: "4.563 km",
    opened: "1965",
    elevation: "Mountain backdrop",
    type: "Road course",
    theme: "alpine",
    scenery: ["mountain", "heritage"],
    weight: 4,
    landmark: "Mount Fuji dominates the horizon beyond one of motorsport's longest main straights.",
    corner: "Dunlop Corner",
    cornerFact: "Dunlop Corner begins the technical final sector after the circuit's huge straight-line burst.",
    heritage: "Fuji has shifted from banked-speedway ambition to modern road-course endurance and Grand Prix history.",
    landscape: "The mountain backdrop gives the circuit a postcard identity when weather reveals the summit.",
    engineering: "The long straight rewards power and low drag, while the final sector asks for mechanical grip and patience.",
    achievement: "Fuji became a signature Japanese endurance venue and hosted memorable wet Formula 1 races.",
    prompt: "Cinematic aerial of Fuji Speedway, Mount Fuji backdrop, long main straight, misty paddock, and Japanese mountain light.",
    outline: "M15 55 C17 34 34 23 55 25 C78 27 87 44 78 57 C68 72 83 84 61 88 C38 92 13 78 15 55Z",
    marker: [15, 55],
  },
  {
    id: "sepang",
    name: "Sepang",
    location: "Sepang, Malaysia",
    length: "5.543 km",
    opened: "1999",
    elevation: "Tropical heat",
    type: "Grand Prix road course",
    theme: "coast",
    scenery: ["forest", "city"],
    weight: 3,
    landmark: "The sweeping twin grandstands and palm-lined setting made Sepang a template for modern Asian circuits.",
    corner: "Turn 15",
    cornerFact: "Turn 15 ends one long straight and begins another, making it a classic late-braking overtaking spot.",
    heritage: "Sepang announced Malaysia's arrival on the Formula 1 calendar with a bold, hot, wide circuit.",
    landscape: "Tropical heat, sudden storms, and palm-fringed edges give the venue a dense atmospheric quality.",
    engineering: "Long straights, wide corners, and heat stress test cooling, tire life, and braking consistency.",
    achievement: "Sepang hosted title-shaping Formula 1 races and became a major MotoGP destination.",
    prompt: "Cinematic aerial of Sepang, sweeping twin grandstands, tropical palms, storm clouds, wide asphalt, and humid sunset light.",
    outline: "M16 64 C21 41 41 23 60 28 C78 33 82 53 68 61 C55 69 70 81 52 88 C32 95 10 82 16 64Z",
    marker: [16, 64],
  },
  {
    id: "phillip-island",
    name: "Phillip Island",
    location: "Victoria, Australia",
    length: "4.445 km",
    opened: "1956",
    elevation: "Ocean edge",
    type: "Coastal road course",
    theme: "coast",
    scenery: ["coast", "field"],
    weight: 4,
    landmark: "Ocean views and fast corners make Phillip Island feel like it is racing along the edge of the world.",
    corner: "Lukey Heights",
    cornerFact: "Lukey Heights crests before dropping toward MG, turning elevation into a braking and balance puzzle.",
    heritage: "Phillip Island's racing roots run from public-road events to one of motorcycle racing's finest modern venues.",
    landscape: "Coastal wind, grasslands, and sea light give the circuit a clean, dramatic backdrop.",
    engineering: "High-speed corners load tires for long periods, making rhythm and tire conservation inseparable.",
    achievement: "MotoGP races here are famous for slipstream packs, last-lap moves, and breathtaking corner speed.",
    prompt: "Cinematic aerial of Phillip Island, Bass Strait coastline, sweeping fast corners, Lukey Heights, grassland, and ocean glare.",
    outline: "M19 66 C16 45 34 27 55 27 C76 27 88 45 78 61 C68 77 41 89 25 79 C20 76 18 71 19 66Z",
    marker: [19, 66],
  },
  {
    id: "macau-guia",
    name: "Macau Guia",
    location: "Macau, China",
    length: "6.120 km",
    opened: "1954",
    elevation: "City mountain",
    type: "Street circuit",
    theme: "city",
    scenery: ["city", "coast", "mountain"],
    weight: 4,
    landmark: "The lap compresses seafront straights, city towers, and the narrow climb around Guia Hill.",
    corner: "Melco Hairpin",
    cornerFact: "Melco Hairpin is so tight that overtaking is prohibited there during many races for safety.",
    heritage: "Macau's Guia Circuit became a proving ground for touring cars, motorcycles, and junior single-seater stars.",
    landscape: "Armco, apartment blocks, hillside roads, and harbor light create a dense urban mountain stage.",
    engineering: "The setup must handle flat-out straights and narrow, bumpy, low-speed hill sections with almost no margin.",
    achievement: "The Macau Grand Prix has launched international careers and produced legendary Formula 3 victories.",
    prompt: "Cinematic aerial of Macau Guia Circuit, harbor skyline, Guia Hill climb, tight Melco Hairpin, Armco streets, and city lights.",
    outline: "M18 72 C12 55 25 45 35 48 C45 51 43 28 60 25 C78 22 88 39 80 54 C73 67 85 77 70 86 C53 96 26 88 18 72Z",
    marker: [18, 72],
  },
  {
    id: "long-beach",
    name: "Long Beach",
    location: "Long Beach, California",
    length: "3.167 km",
    opened: "1975",
    elevation: "Waterfront streets",
    type: "Street circuit",
    theme: "coast",
    scenery: ["coast", "city"],
    weight: 4,
    landmark: "Shoreline Drive, the marina, and downtown towers frame America's classic waterfront street race.",
    corner: "Queen's Hairpin",
    cornerFact: "The hairpin before the front stretch bunches the field and sets up drag races past the convention center.",
    heritage: "Long Beach translated Monaco-style city racing into a Southern California institution.",
    landscape: "Palm trees, harbor water, concrete walls, and city balconies give it a festival-like street-course identity.",
    engineering: "Traction, braking, and patience matter because the lap has tight corners connected by fast city straights.",
    achievement: "The race has hosted Formula 1, Indy cars, IMSA, and decades of North American street-racing history.",
    prompt: "Cinematic aerial of Long Beach street circuit, marina, Shoreline Drive, downtown towers, palm trees, and late California sun.",
    outline: "M19 72 L40 72 C54 72 55 57 44 55 C31 53 35 36 54 33 C73 30 85 42 81 59 C77 76 61 86 42 86 C27 86 19 81 19 72Z",
    marker: [19, 72],
  },
  {
    id: "barcelona-catalunya",
    name: "Barcelona-Catalunya",
    location: "Montmelo, Spain",
    length: "4.657 km",
    opened: "1991",
    elevation: "Catalan benchmark",
    type: "Grand Prix road course",
    theme: "desert",
    scenery: ["field", "city"],
    weight: 4,
    landmark: "The main grandstand, long front straight, and Montmelo hills make it a familiar testing landmark.",
    corner: "Turn 3",
    cornerFact: "Turn 3 is a long loaded right-hander that reveals how gently a car can protect its front tires.",
    heritage: "Barcelona became Formula 1's long-time testing reference because its layout samples many corner types.",
    landscape: "Dry hills, Catalan light, and a bowl-like stadium section give the circuit a practical but handsome character.",
    engineering: "Aero balance, tire wear, and straight-line efficiency are all tested in one lap.",
    achievement: "Max Verstappen's first Formula 1 win in 2016 arrived here on his Red Bull debut.",
    prompt: "Cinematic aerial of Barcelona-Catalunya, Montmelo hills, long straight, Turn 3 sweep, stadium section, and Catalan sunset.",
    outline: "M17 57 C22 35 43 24 61 30 C78 36 87 52 77 65 C67 78 46 72 42 86 C26 82 11 73 17 57Z",
    marker: [17, 57],
  },
  {
    id: "portimao",
    name: "Algarve International Circuit",
    location: "Portimao, Portugal",
    length: "4.653 km",
    opened: "2008",
    elevation: "Roller-coaster hills",
    type: "Road course",
    theme: "desert",
    scenery: ["mountain", "coast"],
    weight: 4,
    landmark: "Blind crests and steep drops make Portimao look like a roller coaster from above.",
    corner: "Portimao final corner",
    cornerFact: "The long final right-hander asks drivers to commit early while the car is still climbing and loaded.",
    heritage: "Portimao quickly earned affection because its modern facilities still deliver old-school elevation drama.",
    landscape: "The Algarve's dry hills and nearby Atlantic coast give the circuit a bright, sculpted appearance.",
    engineering: "Crests unload the car, so setup must keep stability without dulling direction changes.",
    achievement: "The Portuguese Grand Prix's Formula 1 return in 2020 introduced a wider audience to the track's wild elevation.",
    prompt: "Cinematic aerial of Portimao, Algarve hills, roller-coaster elevation, blind crests, Atlantic haze, and copper evening light.",
    outline: "M19 70 C13 50 31 32 50 29 C68 26 83 39 78 55 C74 72 55 63 55 82 C41 91 25 84 19 70Z",
    marker: [19, 70],
  },
  {
    id: "jerez",
    name: "Jerez",
    location: "Jerez de la Frontera, Spain",
    length: "4.428 km",
    opened: "1985",
    elevation: "Andalusian flow",
    type: "Road course",
    theme: "desert",
    scenery: ["field", "heritage"],
    weight: 3,
    landmark: "The Andalusian setting and compact grandstands make Jerez feel sun-baked and intensely close.",
    corner: "Dry Sack",
    cornerFact: "Dry Sack is the classic passing point, a heavy-braking right-hander after a fast run.",
    heritage: "Jerez became a major testing, motorcycle, and Grand Prix venue in southern Spain.",
    landscape: "White buildings, warm earth, and open Andalusian skies define the circuit's visual tone.",
    engineering: "Medium-speed rhythm and rear traction matter because the lap flows from one loaded corner to the next.",
    achievement: "The 1997 European Grand Prix title showdown between Jacques Villeneuve and Michael Schumacher unfolded here.",
    prompt: "Cinematic aerial of Jerez, Andalusian landscape, Dry Sack hairpin, white paddock buildings, and sunlit Spanish grandstands.",
    outline: "M18 64 C19 43 37 26 57 29 C78 32 85 49 75 62 C65 75 72 86 51 88 C30 90 13 80 18 64Z",
    marker: [18, 64],
  },
  {
    id: "estoril",
    name: "Estoril",
    location: "Cascais, Portugal",
    length: "4.182 km",
    opened: "1972",
    elevation: "Atlantic hillside",
    type: "Road course",
    theme: "coast",
    scenery: ["coast", "field"],
    weight: 3,
    landmark: "The circuit sits near the Atlantic coast with bright light and a long, decisive main straight.",
    corner: "Parabolica Interior",
    cornerFact: "Parabolica Interior loads the car in a long arc that decides momentum toward the final sector.",
    heritage: "Estoril hosted memorable Portuguese Grands Prix through an era of turbo and V10 Formula 1.",
    landscape: "Coastal hills, dry grass, and ocean air create a clean Iberian backdrop.",
    engineering: "Its long corners and braking zones reward stable front grip and traction over bumps.",
    achievement: "Ayrton Senna took his first Formula 1 win at a rain-soaked Estoril in 1985.",
    prompt: "Cinematic aerial of Estoril, Atlantic hillside, long straight, dry grass, coastal light, and rain-memory atmosphere.",
    outline: "M20 59 C24 36 43 22 62 29 C79 35 85 50 75 61 C64 73 80 83 60 88 C39 92 15 78 20 59Z",
    marker: [20, 59],
  },
  {
    id: "reims-gueux",
    name: "Reims-Gueux",
    location: "Gueux, France",
    length: "7.816 km",
    opened: "1926",
    elevation: "Champagne roads",
    type: "Historic road course",
    theme: "heritage",
    scenery: ["field", "heritage"],
    weight: 3,
    landmark: "The preserved pits and grandstands still face the old public road like a motorsport ruin in Champagne country.",
    corner: "Thillois",
    cornerFact: "Thillois was the final slow corner before cars blasted back toward the start through open French countryside.",
    heritage: "Reims-Gueux was one of Europe's great slipstream circuits, famous for speed and roadside architecture.",
    landscape: "Flat fields, villages, and art-deco pit buildings make the abandoned course uniquely atmospheric.",
    engineering: "The old layout rewarded horsepower, bravery in the tow, and braking from very high speed.",
    achievement: "Juan Manuel Fangio, Mike Hawthorn, and other Grand Prix greats made Reims part of racing's golden-age map.",
    prompt: "Cinematic aerial of historic Reims-Gueux, restored pit buildings, Champagne fields, old public roads, and golden-age race ghosts.",
    outline: "M13 64 L45 26 C56 15 76 26 80 42 C84 59 62 60 66 76 C52 87 24 86 13 64Z",
    marker: [13, 64],
  },
  {
    id: "rouen-les-essarts",
    name: "Rouen-Les-Essarts",
    location: "Grand-Couronne, France",
    length: "6.542 km",
    opened: "1950",
    elevation: "Forest road drop",
    type: "Historic road course",
    theme: "forest",
    scenery: ["forest", "mountain", "heritage"],
    weight: 3,
    landmark: "Public roads through forested hills created a fast, beautiful, and unforgiving French Grand Prix venue.",
    corner: "Six Freres",
    cornerFact: "Six Freres swept downhill with the kind of speed and consequence that defined old road circuits.",
    heritage: "Rouen-Les-Essarts hosted French Grands Prix during an era when road circuits still felt like adventures.",
    landscape: "The course dropped through woods and climbed back across open roads with little modern forgiveness.",
    engineering: "High-speed bends, narrow roads, and elevation made commitment more valuable than setup perfection.",
    achievement: "Jacky Ickx took his first Formula 1 win at Rouen in 1968.",
    prompt: "Cinematic aerial of Rouen-Les-Essarts, French forest roads, steep downhill sweep, old village edges, and 1960s Grand Prix atmosphere.",
    outline: "M15 73 C20 48 35 39 39 23 C43 8 66 16 72 32 C78 49 58 55 70 68 C82 82 54 92 31 86 C20 83 12 79 15 73Z",
    marker: [15, 73],
  },
  {
    id: "targa-florio",
    name: "Targa Florio",
    location: "Sicily, Italy",
    length: "72.000 km",
    opened: "1906",
    elevation: "Sicilian mountains",
    type: "Historic road course",
    theme: "alpine",
    scenery: ["mountain", "coast", "heritage"],
    weight: 4,
    landmark: "Madonie mountain villages, stone walls, and sea glimpses made the Targa Florio feel epic and intimate at once.",
    corner: "Collesano roads",
    cornerFact: "The village roads near Collesano captured the Targa's mix of speed, stone walls, crowds, and mountain rhythm.",
    heritage: "Founded in 1906, the Targa Florio is one of motorsport's oldest and most romantic road races.",
    landscape: "The route climbed through Sicilian mountains, brushed villages, and returned toward the coast through sunlit roads.",
    engineering: "Endurance, cooling, brakes, and mechanical sympathy mattered as much as speed over the long mountain lap.",
    achievement: "Porsche, Alfa Romeo, Ferrari, and local heroes all built chapters of legend on the Sicilian roads.",
    prompt: "Cinematic aerial of the Targa Florio, Sicilian mountain villages, stone walls, coast glimpses, hairpins, and vintage endurance atmosphere.",
    outline: "M12 66 C18 39 35 44 34 24 C33 5 62 11 72 28 C83 46 58 48 72 62 C87 77 61 93 37 86 C22 82 7 78 12 66Z",
    marker: [12, 66],
  },
  {
    id: "isle-of-man-tt",
    name: "Isle of Man TT Mountain Course",
    location: "Isle of Man",
    length: "60.725 km",
    opened: "1911",
    elevation: "Mountain roads",
    type: "Public-road course",
    theme: "coast",
    scenery: ["coast", "mountain", "heritage"],
    weight: 4,
    landmark: "Snaefell Mountain, village roads, stone walls, and sea air define the world's most demanding motorcycle course.",
    corner: "Ballaugh Bridge",
    cornerFact: "Ballaugh Bridge briefly launches motorcycles over a public-road crest in one of the TT's signature images.",
    heritage: "The TT Mountain Course has tested riders on public roads since 1911.",
    landscape: "The route moves from towns to hedgerows to open mountain, with the Irish Sea never far away.",
    engineering: "Machines need stability, gearing, cooling, and durability for a lap that is longer than many full races.",
    achievement: "Generations of TT winners became legends by mastering speed and consequence on the island roads.",
    prompt: "Cinematic aerial of Isle of Man TT Mountain Course, Snaefell, village roads, stone walls, coastline, and racing motorcycles in morning light.",
    outline: "M11 61 C19 35 39 31 50 16 C63 0 83 18 79 39 C75 58 92 72 73 85 C52 99 23 84 11 61Z",
    marker: [11, 61],
  },
  {
    id: "charade",
    name: "Circuit de Charade",
    location: "Saint-Genes-Champanelle, France",
    length: "8.055 km",
    opened: "1958",
    elevation: "Volcanic mountains",
    type: "Historic mountain circuit",
    theme: "alpine",
    scenery: ["mountain", "forest"],
    weight: 3,
    landmark: "The Auvergne volcanic landscape made Charade feel like a miniature French Nurburgring.",
    corner: "Manson",
    cornerFact: "Manson sits in the mountain rhythm, where blind bends and changing camber made the old lap demanding.",
    heritage: "Charade hosted French Grands Prix on a twisting mountain layout that drivers both admired and feared.",
    landscape: "Volcanic hills, forest, and steep slopes created a dramatic natural arena.",
    engineering: "The old layout's endless corners and elevation changes punished motion sickness, brakes, and concentration.",
    achievement: "Jim Clark, Jackie Stewart, and Jochen Rindt all raced Formula 1 through Charade's mountain roads.",
    prompt: "Cinematic aerial of Circuit de Charade, volcanic Auvergne hills, forested mountain road, blind bends, and vintage Grand Prix mood.",
    outline: "M17 69 C21 47 31 35 45 38 C59 41 50 18 66 20 C82 22 88 42 77 55 C66 68 83 78 65 87 C45 98 11 87 17 69Z",
    marker: [17, 69],
  },
  {
    id: "magny-cours",
    name: "Magny-Cours",
    location: "Nevers, France",
    length: "4.411 km",
    opened: "1960",
    elevation: "French countryside",
    type: "Grand Prix road course",
    theme: "heritage",
    scenery: ["field", "heritage"],
    weight: 3,
    landmark: "Its smooth surface and named corner tributes give Magny-Cours a precise, almost technical French identity.",
    corner: "Adelaide Hairpin",
    cornerFact: "The Adelaide Hairpin is a hard-braking passing zone after a fast straight.",
    heritage: "Magny-Cours became the French Grand Prix's home through much of the 1990s and 2000s.",
    landscape: "Open countryside, low buildings, and wide runoff create a clean, controlled setting.",
    engineering: "Smooth asphalt and varied corner radii reward exact setup work and braking confidence.",
    achievement: "Michael Schumacher clinched the 2002 Formula 1 world championship here with six races remaining.",
    prompt: "Cinematic aerial of Magny-Cours, French countryside, Adelaide hairpin, smooth asphalt, low paddock, and summer heat shimmer.",
    outline: "M16 58 C20 35 38 25 58 27 C78 29 88 45 78 59 C68 72 78 86 58 87 C38 88 11 77 16 58Z",
    marker: [16, 58],
  },
  {
    id: "paul-ricard",
    name: "Circuit Paul Ricard",
    location: "Le Castellet, France",
    length: "5.842 km",
    opened: "1970",
    elevation: "Provence plateau",
    type: "Road course",
    theme: "coast",
    scenery: ["coast", "desert"],
    weight: 3,
    landmark: "The blue and red runoff stripes make Paul Ricard instantly recognizable from the air.",
    corner: "Signes",
    cornerFact: "Signes is a fast right-hander after the Mistral Straight that rewards commitment and aero stability.",
    heritage: "Paul Ricard was built as a modern test circuit and became a French Grand Prix venue with a graphic identity all its own.",
    landscape: "The Provence plateau, dry hills, and nearby Mediterranean light sharpen the circuit's vivid palette.",
    engineering: "The configurable layout, long straight, and high-speed corners make it a natural testing laboratory.",
    achievement: "The circuit helped define French motorsport infrastructure and returned Formula 1 to France in 2018.",
    prompt: "Cinematic aerial of Circuit Paul Ricard, blue and red runoff bands, Mistral Straight, Provence hills, and Mediterranean light.",
    outline: "M17 62 C22 42 42 28 62 30 C80 32 88 47 80 62 C72 77 52 70 49 85 C33 89 11 78 17 62Z",
    marker: [17, 62],
  },
  {
    id: "yas-marina",
    name: "Yas Marina",
    location: "Abu Dhabi, United Arab Emirates",
    length: "5.281 km",
    opened: "2009",
    elevation: "Marina twilight",
    type: "Grand Prix road course",
    theme: "desert",
    scenery: ["desert", "coast", "city"],
    weight: 4,
    landmark: "The hotel bridge, marina, and twilight lighting make Yas Marina one of racing's most recognizable modern venues.",
    corner: "Turn 9",
    cornerFact: "The reprofiled Turn 9 creates a faster, longer loaded corner beside the marina.",
    heritage: "Yas Marina brought Formula 1 a day-into-night season finale setting.",
    landscape: "Desert, waterfront, architecture, and artificial light combine into a polished modern race image.",
    engineering: "Long straights and slow traction zones reward efficient aero and tire management in heat.",
    achievement: "Several championship finales have unfolded under the lights in Abu Dhabi.",
    prompt: "Cinematic aerial of Yas Marina, illuminated hotel bridge, marina water, desert island, twilight track, and glowing grandstands.",
    outline: "M16 61 C21 39 42 25 61 30 C78 35 84 48 76 61 C68 75 83 82 63 88 C42 94 10 79 16 61Z",
    marker: [16, 61],
  },
  {
    id: "bahrain",
    name: "Bahrain International Circuit",
    location: "Sakhir, Bahrain",
    length: "5.412 km",
    opened: "2004",
    elevation: "Desert amphitheater",
    type: "Grand Prix road course",
    theme: "desert",
    scenery: ["desert", "heritage"],
    weight: 4,
    landmark: "Desert towers, floodlights, and sand-colored grandstands give Bahrain a strong architectural silhouette.",
    corner: "Turn 1",
    cornerFact: "Turn 1 creates a classic braking duel after the main straight and often shapes the whole first lap.",
    heritage: "Bahrain became the first Middle Eastern venue to host a Formula 1 Grand Prix.",
    landscape: "Sakhir's desert setting turns dusk races into a contrast of floodlit asphalt and open sand.",
    engineering: "Rear tire traction, braking, and wind-blown sand all influence the lap.",
    achievement: "The 2014 Bahrain Grand Prix produced a celebrated wheel-to-wheel Mercedes duel under the lights.",
    prompt: "Cinematic aerial of Bahrain International Circuit, Sakhir desert, floodlit towers, Turn 1, sand-colored architecture, and night racing glow.",
    outline: "M19 64 C17 43 36 26 57 29 C76 31 88 44 80 57 C72 70 82 84 62 87 C41 91 13 79 19 64Z",
    marker: [19, 64],
  },
  {
    id: "jeddah",
    name: "Jeddah Corniche",
    location: "Jeddah, Saudi Arabia",
    length: "6.174 km",
    opened: "2021",
    elevation: "Red Sea speed",
    type: "Street circuit",
    theme: "coast",
    scenery: ["coast", "city", "desert"],
    weight: 3,
    landmark: "The Red Sea corniche and illuminated waterfront make Jeddah a high-speed night circuit.",
    corner: "Turn 13",
    cornerFact: "Turn 13's banked left-hander lets cars carry speed in a way few street circuits allow.",
    heritage: "Jeddah brought a new high-speed street-racing profile to the Formula 1 calendar.",
    landscape: "Waterfront lighting, sea air, and city structures create a fast coastal corridor.",
    engineering: "High average speed, close walls, and rapid direction changes make precision essential.",
    achievement: "Its early Grands Prix immediately became known for qualifying drama and safety-car tension.",
    prompt: "Cinematic aerial of Jeddah Corniche Circuit, Red Sea waterfront, night lights, fast sweeping street layout, and modern city edge.",
    outline: "M12 70 C22 44 35 54 42 31 C49 7 74 17 79 38 C84 58 61 61 76 76 C64 90 28 88 12 70Z",
    marker: [12, 70],
  },
  {
    id: "albert-park",
    name: "Albert Park",
    location: "Melbourne, Australia",
    length: "5.278 km",
    opened: "1996",
    elevation: "Lake park",
    type: "Parkland street circuit",
    theme: "coast",
    scenery: ["coast", "city", "forest"],
    weight: 4,
    landmark: "Albert Park Lake and the Melbourne skyline frame the Australian Grand Prix's parkland circuit.",
    corner: "Turn 11 and 12",
    cornerFact: "The fast Turn 11 and 12 sequence lets the car skim the lake edge with commitment.",
    heritage: "Albert Park turned Melbourne's lakeside roads into a season-opening Formula 1 tradition.",
    landscape: "Water, park trees, skyline views, and temporary grandstands give it a relaxed but grand scale.",
    engineering: "A semi-permanent surface evolves all weekend, challenging braking points and traction.",
    achievement: "For many seasons, Albert Park carried the anticipation of Formula 1's first race of the year.",
    prompt: "Cinematic aerial of Albert Park, Melbourne skyline, lake reflections, park roads, temporary grandstands, and crisp morning light.",
    outline: "M14 59 C20 36 42 24 62 29 C80 34 89 52 77 65 C65 78 41 84 25 75 C16 70 10 66 14 59Z",
    marker: [14, 59],
  },
  {
    id: "adelaide",
    name: "Adelaide Street Circuit",
    location: "Adelaide, Australia",
    length: "3.780 km",
    opened: "1985",
    elevation: "City parklands",
    type: "Street circuit",
    theme: "city",
    scenery: ["city", "field"],
    weight: 3,
    landmark: "Victoria Park and the city grid made Adelaide a festive, compact street-circuit stage.",
    corner: "Brabham Straight chicane",
    cornerFact: "The chicane and braking zones around the parklands create tight racing in a venue famous for finales.",
    heritage: "Adelaide hosted Formula 1 season finales before becoming an Australian touring-car festival.",
    landscape: "Parkland roads, city edges, and temporary walls give the circuit a bright urban character.",
    engineering: "Heavy braking, curb control, and heat management define the street-course challenge.",
    achievement: "The 1986 Australian Grand Prix at Adelaide decided one of Formula 1's most dramatic title battles.",
    prompt: "Cinematic aerial of Adelaide Street Circuit, Victoria Park, city grid, temporary walls, warm Australian streets, and finale atmosphere.",
    outline: "M20 75 L43 75 C58 75 56 58 43 57 C30 56 36 39 55 36 C75 33 84 47 80 63 C76 79 59 87 39 86 C26 85 20 81 20 75Z",
    marker: [20, 75],
  },
  {
    id: "sebring",
    name: "Sebring",
    location: "Sebring, Florida",
    length: "6.019 km",
    opened: "1950",
    elevation: "Airport concrete",
    type: "Endurance road course",
    theme: "heritage",
    scenery: ["field", "heritage"],
    weight: 4,
    landmark: "Old airport concrete slabs give Sebring its brutal texture and endurance-racing soul.",
    corner: "Turn 17",
    cornerFact: "Turn 17 is long, bumpy, dark at night, and decisive for carrying speed onto the front straight.",
    heritage: "Sebring transformed a World War II airfield into America's great endurance test.",
    landscape: "Flat Florida light, airport geometry, and glowing night pits create a unique endurance mood.",
    engineering: "The bumps punish suspension, electronics, drivers, and prototypes over twelve demanding hours.",
    achievement: "The 12 Hours of Sebring became a pillar of international sports-car racing.",
    prompt: "Cinematic aerial of Sebring, old airport runways, concrete slabs, Turn 17, endurance paddock lights, and Florida dusk.",
    outline: "M12 61 C22 37 41 26 62 31 C84 36 87 54 74 64 C61 74 74 85 53 88 C31 91 6 78 12 61Z",
    marker: [12, 61],
  },
  {
    id: "istanbul-park",
    name: "Istanbul Park",
    location: "Tuzla, Turkey",
    length: "5.338 km",
    opened: "2005",
    elevation: "Turn 8 load",
    type: "Grand Prix road course",
    theme: "desert",
    scenery: ["field", "city"],
    weight: 4,
    landmark: "Rolling land outside Istanbul gives the circuit elevation and an open, sculpted feel.",
    corner: "Turn 8",
    cornerFact: "Turn 8 is a long, multi-apex left-hander that loads the car for what feels like an eternity.",
    heritage: "Istanbul Park became an instant driver favorite because it paired modern design with old-school commitment.",
    landscape: "Broad hills, exposed sky, and flowing asphalt give the track a muscular shape from above.",
    engineering: "Anti-clockwise direction and sustained lateral load through Turn 8 punish tires and necks alike.",
    achievement: "Its 2020 wet Formula 1 race produced a masterclass victory and title-clinching drive by Lewis Hamilton.",
    prompt: "Cinematic aerial of Istanbul Park, rolling Turkish hills, Turn 8 sweep, broad asphalt, and dramatic cloud shadows.",
    outline: "M16 66 C21 41 41 24 62 28 C80 32 86 47 77 59 C68 72 84 81 64 88 C42 96 9 81 16 66Z",
    marker: [16, 66],
  },
  {
    id: "hungaroring",
    name: "Hungaroring",
    location: "Mogyorod, Hungary",
    length: "4.381 km",
    opened: "1986",
    elevation: "Dusty valley",
    type: "Grand Prix road course",
    theme: "desert",
    scenery: ["field", "heritage"],
    weight: 4,
    landmark: "The circuit sits in a valley outside Budapest, giving spectators wide views across much of the lap.",
    corner: "Turn 4",
    cornerFact: "Turn 4 is a fast blind left over a crest where precision and trust matter.",
    heritage: "The Hungaroring brought Formula 1 behind the Iron Curtain in 1986.",
    landscape: "Dry hills, dust, and bowl-like viewing banks make the track feel close and technical.",
    engineering: "Low-speed grip, tire temperature, and clean air matter because overtaking is difficult.",
    achievement: "Damon Hill nearly won for Arrows here in 1997, one of the great underdog near-misses.",
    prompt: "Cinematic aerial of Hungaroring, dusty valley bowl, Budapest outskirts, technical corners, and hot summer haze.",
    outline: "M17 59 C21 37 43 24 62 31 C79 38 82 55 69 62 C56 69 70 82 51 87 C30 92 12 76 17 59Z",
    marker: [17, 59],
  },
  {
    id: "dijon-prenois",
    name: "Dijon-Prenois",
    location: "Prenois, France",
    length: "3.801 km",
    opened: "1972",
    elevation: "Burgundy sweep",
    type: "Historic road course",
    theme: "heritage",
    scenery: ["field", "forest"],
    weight: 3,
    landmark: "The compact Burgundy circuit is fast, flowing, and tucked into rolling countryside.",
    corner: "Pouas",
    cornerFact: "Pouas is a long, fast final right-hander that decides speed onto the main straight.",
    heritage: "Dijon-Prenois hosted French and Swiss Grands Prix in a brief but memorable Formula 1 chapter.",
    landscape: "Rolling fields and forest edges give the short lap a surprisingly grand sense of motion.",
    engineering: "The circuit rewards momentum, balance, and confidence through long high-speed arcs.",
    achievement: "The 1979 Villeneuve-Arnoux duel at Dijon became one of Formula 1's definitive wheel-to-wheel fights.",
    prompt: "Cinematic aerial of Dijon-Prenois, Burgundy countryside, fast flowing corners, Pouas, forest edge, and late summer sun.",
    outline: "M19 63 C23 42 40 27 60 29 C79 31 87 45 78 58 C69 72 81 84 60 88 C39 92 13 79 19 63Z",
    marker: [19, 63],
  },
  {
    id: "zolder",
    name: "Zolder",
    location: "Heusden-Zolder, Belgium",
    length: "4.011 km",
    opened: "1963",
    elevation: "Limburg forest",
    type: "Historic road course",
    theme: "forest",
    scenery: ["forest", "heritage"],
    weight: 3,
    landmark: "Forest edges and compact Belgian corners give Zolder a dense, old-school feel.",
    corner: "Lucien Bianchi Bocht",
    cornerFact: "The Lucien Bianchi Bocht anchors the technical middle of the lap with rhythm and braking discipline.",
    heritage: "Zolder hosted Belgian Grands Prix and carries both celebration and tragedy in Formula 1 memory.",
    landscape: "Wooded surroundings and tight spectator areas create a grounded, intimate atmosphere.",
    engineering: "Chicanes, traction zones, and curb precision make the lap tougher than its length suggests.",
    achievement: "Gilles Villeneuve's fatal 1982 accident at Zolder remains one of motorsport's most solemn markers.",
    prompt: "Cinematic aerial of Zolder, Belgian forest, compact circuit, chicanes, heritage paddock, and subdued evening light.",
    outline: "M18 60 C22 39 40 24 59 30 C77 36 84 53 73 64 C62 76 74 86 55 88 C34 90 12 77 18 60Z",
    marker: [18, 60],
  },
  {
    id: "mexico-city",
    name: "Autodromo Hermanos Rodriguez",
    location: "Mexico City, Mexico",
    length: "4.304 km",
    opened: "1959",
    elevation: "High-altitude stadium",
    type: "Grand Prix road course",
    theme: "city",
    scenery: ["city", "heritage"],
    weight: 5,
    landmark: "The Foro Sol stadium section sends cars through a baseball venue packed with fans.",
    corner: "Peraltada",
    cornerFact: "The old Peraltada was a fearsome banked final corner, and its memory still shapes the circuit's identity.",
    heritage: "Named for racing brothers Ricardo and Pedro Rodriguez, the track carries deep Mexican motorsport pride.",
    landscape: "High-altitude air, city haze, and the stadium section make the venue unlike any other Grand Prix stop.",
    engineering: "Thin air reduces downforce and cooling, forcing teams to run high wing levels with surprising straight-line speeds.",
    achievement: "The modern Mexican Grand Prix podium inside Foro Sol became one of Formula 1's signature celebrations.",
    prompt: "Cinematic aerial of Autodromo Hermanos Rodriguez, Mexico City skyline, Foro Sol stadium, old Peraltada memory, and high-altitude haze.",
    outline: "M15 57 C21 35 41 23 61 28 C80 33 88 49 78 62 C68 75 47 70 43 85 C27 83 10 74 15 57Z",
    marker: [15, 57],
  },
  {
    id: "montjuic",
    name: "Montjuic Park",
    location: "Barcelona, Spain",
    length: "3.791 km",
    opened: "1932",
    elevation: "City hillside",
    type: "Historic street circuit",
    theme: "city",
    scenery: ["city", "mountain", "heritage"],
    weight: 3,
    landmark: "The park roads climbed around Barcelona's Montjuic hill with city views and monumental architecture.",
    corner: "Stadium sweeps",
    cornerFact: "The stadium-side sweepers showed how fast and exposed the hillside street circuit could be.",
    heritage: "Montjuic hosted Spanish Grands Prix on a beautiful but dangerous parkland street layout.",
    landscape: "Trees, stone walls, museums, fountains, and city skyline views made it visually spectacular.",
    engineering: "Fast public roads and elevation left little room for error or modern safety margins.",
    achievement: "Jochen Mass won the shortened 1975 Spanish Grand Prix, the final Formula 1 race held there.",
    prompt: "Cinematic aerial of Montjuic Park circuit, Barcelona hillside, museums, fountains, city skyline, and 1970s Grand Prix atmosphere.",
    outline: "M18 71 C13 52 29 37 39 42 C49 47 45 23 63 22 C81 21 88 40 78 55 C68 70 82 81 62 89 C42 97 24 86 18 71Z",
    marker: [18, 71],
  },
  {
    id: "pau-ville",
    name: "Pau-Ville",
    location: "Pau, France",
    length: "2.760 km",
    opened: "1933",
    elevation: "Pyrenees streets",
    type: "Street circuit",
    theme: "city",
    scenery: ["city", "mountain", "heritage"],
    weight: 3,
    landmark: "The streets of Pau climb and fall with Pyrenees views and old-town architecture.",
    corner: "Virage de la Gare",
    cornerFact: "The station hairpin compresses cars into a tight city turn where rhythm matters more than speed.",
    heritage: "Pau is one of Europe's oldest street races, often called a miniature Monaco with its own French character.",
    landscape: "Stone buildings, trees, rails, hills, and mountain glimpses give the compact lap a rich visual texture.",
    engineering: "Short straights, tight corners, and walls reward precision and quick traction.",
    achievement: "The Pau Grand Prix became a proving ground for junior single-seater talent and touring cars.",
    prompt: "Cinematic aerial of Pau-Ville street circuit, French old town, Pyrenees backdrop, station hairpin, trees, and historic city racing.",
    outline: "M24 76 C13 63 22 45 36 48 C49 51 42 31 59 27 C76 23 86 37 80 53 C74 69 88 78 70 87 C52 96 34 88 24 76Z",
    marker: [24, 76],
  },
];

const WIKI_PAGE_TITLES = {
  monaco: "Circuit de Monaco",
  "spa-francorchamps": "Circuit de Spa-Francorchamps",
  "le-mans": "Circuit de la Sarthe",
  "nurburgring-nordschleife": "Nurburgring",
  suzuka: "Suzuka Circuit",
  monza: "Monza Circuit",
  silverstone: "Silverstone Circuit",
  "mount-panorama": "Mount Panorama Circuit",
  "laguna-seca": "WeatherTech Raceway Laguna Seca",
  cota: "Circuit of the Americas",
  imola: "Imola Circuit",
  mugello: "Mugello Circuit",
  "red-bull-ring": "Red Bull Ring",
  interlagos: "Interlagos Circuit",
  "marina-bay": "Marina Bay Street Circuit",
  baku: "Baku City Circuit",
  "gilles-villeneuve": "Circuit Gilles Villeneuve",
  zandvoort: "Circuit Zandvoort",
  hockenheimring: "Hockenheimring",
  "brands-hatch": "Brands Hatch",
  "donington-park": "Donington Park",
  goodwood: "Goodwood Circuit",
  kyalami: "Kyalami Grand Prix Circuit",
  fuji: "Fuji Speedway",
  sepang: "Sepang International Circuit",
  "phillip-island": "Phillip Island Grand Prix Circuit",
  "macau-guia": "Guia Circuit",
  "long-beach": "Long Beach Street Circuit",
  "barcelona-catalunya": "Circuit de Barcelona-Catalunya",
  portimao: "Algarve International Circuit",
  jerez: "Circuito de Jerez",
  estoril: "Circuito do Estoril",
  "reims-gueux": "Reims-Gueux",
  "rouen-les-essarts": "Rouen-Les-Essarts",
  "targa-florio": "Targa Florio",
  "isle-of-man-tt": "Snaefell Mountain Course",
  charade: "Charade Circuit",
  "magny-cours": "Circuit de Nevers Magny-Cours",
  "paul-ricard": "Circuit Paul Ricard",
  "yas-marina": "Yas Marina Circuit",
  bahrain: "Bahrain International Circuit",
  jeddah: "Jeddah Corniche Circuit",
  "albert-park": "Albert Park Circuit",
  adelaide: "Adelaide Street Circuit",
  sebring: "Sebring International Raceway",
  "istanbul-park": "Istanbul Park",
  hungaroring: "Hungaroring",
  "dijon-prenois": "Dijon-Prenois",
  zolder: "Circuit Zolder",
  "mexico-city": "Autodromo Hermanos Rodriguez",
  montjuic: "Montjuic circuit",
  "pau-ville": "Pau Grand Prix",
};

const PHOTO_CACHE_KEY = "trackside.photoCache.v1";
const EXPANDED_CALENDAR_CACHE_KEY = "trackside.expandedCalendar.v1";
const DISCOVERY_SOURCE_PAGE = "List_of_motor_racing_tracks";
const DISCOVERY_BATCH_SIZE = 45;
const DISCOVERY_BATCH_LIMIT = 28;
const TRACK_TITLE_PATTERN = /(?:circuit|raceway|racing|motorsport|autodrom|autodromo|autodrome|ring|speedway|course|track|street|road|park|hillclimb|tt|targa|route|grand prix)/i;
const NON_TRACK_TITLE_PATTERN = /(?:list of|calendar|season|standings|championship|\bgrand prix$|driver|team|constructor|results|records|fatal|accident|video game|simulator|template:|category:|file:|portal:)/i;
const DISALLOWED_TRACK_TEXT_PATTERN = /(?:\bnascar\b|horse|thoroughbred|equestrian|greyhound|harness racing|racecourse|race course|velodrome|video game|simulator)/i;
const BAD_IMAGE_PATTERN = /(?:map|layout|diagram|logo|outline|plan|blank|icon|poster|profile|svg)/i;
const F1_LAYOUT_TITLE_ALIASES = {
  "autodromo do estoril": "Circuito do Estoril",
  "autodromo internazionale del mugello": "Mugello Circuit",
  "autodromo internazionale enzo e dino ferrari": "Imola Circuit",
  "autodromo jose carlos pace": "Interlagos circuit",
  "autodromo nazionale di monza": "Monza Circuit",
  "brands hatch circuit": "Brands Hatch",
  "bugatti circuit": "Circuit de la Sarthe",
  "caesars palace grand prix circuit": "Caesars Palace Grand Prix",
  "circuit de pedralbes": "Pedralbes Circuit",
  "circuit de reims gueux": "Reims-Gueux",
  "circuit dijon prenois": "Dijon-Prenois",
  "circuito permanente de jerez": "Circuito de Jerez",
  "circuito permanente del jarama": "Circuito del Jarama",
  "dallas fair park": "Fair Park",
  "kyalami grand prix circuit": "Kyalami",
  "mosport park": "Canadian Tire Motorsport Park",
  "scandinavian raceway": "Anderstorp Raceway",
  "sebring raceway": "Sebring International Raceway",
  "sochi autodrom": "Sirius Autodrom",
  "suzuka international racing course": "Suzuka Circuit",
  "ti circuit aida": "Okayama International Circuit",
  "zeltweg airfield": "Zeltweg Air Base",
};

let f1LayoutLookup = null;

const elements = {
  visual: document.getElementById("trackVisual"),
  photoStage: document.getElementById("photoStage"),
  trackPhotos: [document.getElementById("trackPhotoA"), document.getElementById("trackPhotoB")],
  collectionDay: document.getElementById("collectionDay"),
  headerDate: document.getElementById("headerDate"),
  dateLabel: document.getElementById("dateLabel"),
  factCategory: document.getElementById("factCategory"),
  trackName: document.getElementById("trackName"),
  trackLocation: document.getElementById("trackLocation"),
  trackFact: document.getElementById("trackFact"),
  trackLength: document.getElementById("trackLength"),
  trackOpened: document.getElementById("trackOpened"),
  trackElevation: document.getElementById("trackElevation"),
  previousButton: document.getElementById("previousButton"),
  todayButton: document.getElementById("todayButton"),
  nextButton: document.getElementById("nextButton"),
  randomButton: document.getElementById("randomButton"),
  favoriteButton: document.getElementById("favoriteButton"),
  motionButton: document.getElementById("motionButton"),
  shareButton: document.getElementById("shareButton"),
  outlineTitle: document.getElementById("outlineTitle"),
  outlineStage: document.querySelector(".outline-stage"),
  layoutImage: document.getElementById("layoutImage"),
  outlineHalo: document.getElementById("outlineHalo"),
  outlinePath: document.getElementById("outlinePath"),
  outlineDashes: document.getElementById("outlineDashes"),
  outlineMarker: document.getElementById("outlineMarker"),
  landmarkText: document.getElementById("landmarkText"),
  cornerText: document.getElementById("cornerText"),
  achievementText: document.getElementById("achievementText"),
  promptText: document.getElementById("promptText"),
  dateIsoLabel: document.getElementById("dateIsoLabel"),
  progressFill: document.getElementById("progressFill"),
  toast: document.getElementById("toast"),
};

const startTime = parseIsoDate(START_ISO).getTime();
const endTime = parseIsoDate(END_ISO).getTime();
const totalDays = Math.round((endTime - startTime) / DAY_MS) + 1;
const trackById = new Map(masterTrackList.map((track) => [track.id, track]));
let calendarTrackList = buildInitialCalendarTracks();
let dateAssignments = calendarTrackList.map((track) => track.id);
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  month: "long",
  day: "numeric",
  year: "numeric",
});

let storedState = loadState();
let favoriteIds = new Set(storedState.favorites || []);
let photoCache = loadPhotoCache();
let activePhotoLayer = 0;
let photoRequestId = 0;
let currentIndex = readHashIndex() ?? getTodayIndex();
let transitionTimer = 0;
let toastTimer = 0;
let resizeFrame = 0;

if (storedState.motion === undefined && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  storedState.motion = false;
}

document.body.classList.toggle("motion-on", storedState.motion !== false);
elements.motionButton.setAttribute("aria-pressed", String(storedState.motion !== false));

renderCurrentTrack(false);
bindInteractions();
hydrateImageBackedCalendar();

function bindInteractions() {
  elements.previousButton.addEventListener("click", () => setTrackIndex(currentIndex - 1));
  elements.nextButton.addEventListener("click", () => setTrackIndex(currentIndex + 1));
  elements.todayButton.addEventListener("click", () => setTrackIndex(getTodayIndex()));
  elements.randomButton.addEventListener("click", showRandomTrack);
  elements.favoriteButton.addEventListener("click", toggleFavorite);
  elements.motionButton.addEventListener("click", toggleMotion);
  elements.shareButton.addEventListener("click", shareCurrentTrack);

  document.addEventListener("keydown", (event) => {
    const tagName = event.target && event.target.tagName;
    if (tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT") {
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setTrackIndex(currentIndex - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      setTrackIndex(currentIndex + 1);
    } else if (event.key.toLowerCase() === "t") {
      setTrackIndex(getTodayIndex());
    } else if (event.key.toLowerCase() === "r") {
      showRandomTrack();
    } else if (event.key.toLowerCase() === "f") {
      toggleFavorite();
    } else if (event.key.toLowerCase() === "s") {
      shareCurrentTrack();
    }
  });

  window.addEventListener("resize", () => {
    window.cancelAnimationFrame(resizeFrame);
    resizeFrame = window.requestAnimationFrame(() => {
      const track = getTrackForIndex(currentIndex);
      drawTrackScene(track, currentIndex);
    });
  });

  window.addEventListener("hashchange", () => {
    const hashIndex = readHashIndex();
    if (hashIndex !== null && hashIndex !== currentIndex) {
      setTrackIndex(hashIndex);
    }
  });
}

function setTrackIndex(nextIndex, animated = true) {
  const normalizedIndex = wrapIndex(nextIndex);
  window.clearTimeout(transitionTimer);

  if (!animated) {
    currentIndex = normalizedIndex;
    renderCurrentTrack(false);
    return;
  }

  document.body.classList.add("is-changing");
  transitionTimer = window.setTimeout(() => {
    currentIndex = normalizedIndex;
    renderCurrentTrack(true);
    window.requestAnimationFrame(() => document.body.classList.remove("is-changing"));
  }, 170);
}

function renderCurrentTrack(updateHash) {
  const iso = isoFromIndex(currentIndex);
  const track = getTrackForIndex(currentIndex);
  const theme = THEME_LIBRARY[track.theme] || THEME_LIBRARY.heritage;
  const categoryIndex = Math.abs(currentIndex + track.name.length) % FACT_CATEGORIES.length;
  const category = FACT_CATEGORIES[categoryIndex];
  const fact = category.getFact(track);
  const isFavorite = favoriteIds.has(track.id);
  const visited = storedState.visited || {};

  visited[iso] = track.id;
  storedState.visited = visited;
  storedState.lastDate = iso;
  persistState();

  applyTheme(theme);
  applyTitleScale(track.name);

  elements.collectionDay.textContent = `Day ${currentIndex + 1} of ${totalDays}`;
  elements.headerDate.textContent = formatDisplayDate(iso);
  elements.dateLabel.textContent = formatDisplayDate(iso);
  elements.factCategory.textContent = category.label;
  elements.trackName.textContent = track.name;
  elements.trackLocation.textContent = `${track.location} / ${track.type}`;
  elements.trackFact.textContent = fact;
  elements.trackLength.textContent = track.length;
  elements.trackOpened.textContent = track.opened;
  elements.trackElevation.textContent = track.elevation;
  updateLayoutDiagram(track);
  elements.outlineTitle.textContent = track.layoutImageUrl
    ? `${track.name} actual Formula 1 layout`
    : `${track.name} outline`;
  elements.outlineHalo.setAttribute("d", track.outline);
  elements.outlinePath.setAttribute("d", track.outline);
  elements.outlineDashes.setAttribute("d", track.outline);
  elements.outlineMarker.setAttribute("cx", track.marker[0]);
  elements.outlineMarker.setAttribute("cy", track.marker[1]);
  elements.landmarkText.textContent = track.landmark;
  elements.cornerText.textContent = `${track.corner}. ${track.cornerFact}`;
  elements.achievementText.textContent = track.achievement;
  elements.promptText.textContent = track.prompt;
  elements.dateIsoLabel.textContent = iso;
  elements.progressFill.style.width = `${((currentIndex + 1) / totalDays) * 100}%`;
  elements.favoriteButton.setAttribute("aria-pressed", String(isFavorite));
  elements.favoriteButton.setAttribute(
    "aria-label",
    isFavorite ? "Remove from Tony's favorites" : "Add to Tony's favorites",
  );

  document.title = `${track.name} | TRackside`;
  drawTrackScene(track, currentIndex);
  updateTrackPhoto(track);

  if (updateHash) {
    try {
      history.replaceState(null, "", `#${iso}`);
    } catch (error) {
      window.location.hash = iso;
    }
  }
}

function updateLayoutDiagram(track) {
  const layoutUrl = track.f1History && track.layoutImageUrl ? track.layoutImageUrl : "";
  const layoutImage = elements.layoutImage;
  const outlineStage = elements.outlineStage;

  layoutImage.onload = null;
  layoutImage.onerror = null;
  outlineStage.classList.remove("has-layout-image");

  if (!layoutUrl) {
    layoutImage.removeAttribute("src");
    layoutImage.removeAttribute("data-layout-url");
    layoutImage.alt = "";
    return;
  }

  layoutImage.alt = `${track.name} actual Formula 1 circuit layout`;
  layoutImage.onload = () => {
    if (layoutImage.dataset.layoutUrl === layoutUrl) {
      outlineStage.classList.add("has-layout-image");
    }
  };
  layoutImage.onerror = () => {
    if (layoutImage.dataset.layoutUrl === layoutUrl) {
      outlineStage.classList.remove("has-layout-image");
    }
  };

  if (layoutImage.dataset.layoutUrl !== layoutUrl) {
    layoutImage.dataset.layoutUrl = layoutUrl;
    layoutImage.src = layoutUrl;
    return;
  }

  if (layoutImage.complete && layoutImage.naturalWidth > 0) {
    outlineStage.classList.add("has-layout-image");
  }
}

function applyTheme(theme) {
  const root = document.documentElement;
  root.style.setProperty("--track-primary", theme.accent);
  root.style.setProperty("--track-secondary", theme.secondary);
  root.style.setProperty("--track-line", theme.track);
  root.style.setProperty("--track-panel", "rgba(20, 19, 15, 0.74)");
}

function applyTitleScale(name) {
  const root = document.documentElement;
  const words = name.split(/\s+/);
  const longestWord = Math.max(...words.map((word) => word.length));
  const lengthScale = Math.min(1, 30 / Math.max(name.length, 1));
  const wordScale = Math.min(1, 13 / Math.max(longestWord, 1));
  const scale = Math.max(0.68, Math.min(lengthScale, wordScale));

  root.style.setProperty("--title-size", `${Math.max(3.5, 5.8 * scale).toFixed(2)}rem`);
  root.style.setProperty("--title-size-mobile", `${Math.max(2.2, 3 * scale).toFixed(2)}rem`);
}

function showRandomTrack() {
  let nextIndex = Math.floor(Math.random() * totalDays);
  if (nextIndex === currentIndex) {
    nextIndex = wrapIndex(nextIndex + 37);
  }
  setTrackIndex(nextIndex);
}

function toggleFavorite() {
  const track = getTrackForIndex(currentIndex);
  if (favoriteIds.has(track.id)) {
    favoriteIds.delete(track.id);
    showToast(`${track.name} removed from Tony's favorites.`);
  } else {
    favoriteIds.add(track.id);
    showToast(`${track.name} added to Tony's favorites.`);
  }

  storedState.favorites = [...favoriteIds];
  persistState();
  renderCurrentTrack(true);
}

function toggleMotion() {
  const nextMotion = !document.body.classList.contains("motion-on");
  document.body.classList.toggle("motion-on", nextMotion);
  elements.motionButton.setAttribute("aria-pressed", String(nextMotion));
  storedState.motion = nextMotion;
  persistState();
}

async function shareCurrentTrack() {
  const iso = isoFromIndex(currentIndex);
  const track = getTrackForIndex(currentIndex);
  const category = FACT_CATEGORIES[Math.abs(currentIndex + track.name.length) % FACT_CATEGORIES.length];
  const text = `TRackside - ${formatDisplayDate(iso)}\n${track.name}\n${track.location}\n${category.getFact(track)}`;
  const shareData = {
    title: `${track.name} | TRackside`,
    text,
    url: `${window.location.href.split("#")[0]}#${iso}`,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }
    await copyToClipboard(`${text}\n${shareData.url}`);
    showToast("Track card copied for sharing.");
  } catch (error) {
    if (error && error.name !== "AbortError") {
      showToast("Share was not available in this browser.");
    }
  }
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  elements.toast.textContent = message;
  elements.toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => {
    elements.toast.classList.remove("is-visible");
  }, 2600);
}

function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }

  return new Promise((resolve, reject) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand("copy");
      resolve();
    } catch (error) {
      reject(error);
    } finally {
      document.body.removeChild(textArea);
    }
  });
}

function getTrackForIndex(index) {
  return calendarTrackList[wrapIndex(index)] || masterTrackList[0];
}

function buildInitialCalendarTracks() {
  const staticPhotoTracks = buildStaticPhotoCalendarTracks();
  if (staticPhotoTracks.length >= totalDays) {
    return staticPhotoTracks.slice(0, totalDays);
  }

  const seededTracks = [];
  const seenIds = new Set();

  for (const track of masterTrackList) {
    if (!seenIds.has(track.id)) {
      seededTracks.push(track);
      seenIds.add(track.id);
    }
  }

  for (let index = seededTracks.length; index < totalDays; index += 1) {
    const source = masterTrackList[index % masterTrackList.length];
    const clone = {
      ...source,
      id: `${source.id}-archive-${index}`,
      name: `${source.name} Archive ${Math.floor(index / masterTrackList.length) + 1}`,
    };
    seededTracks.push(clone);
  }

  return seededTracks.slice(0, totalDays);
}

function buildStaticPhotoCalendarTracks() {
  const records = Array.isArray(window.TRACKSIDE_PHOTO_TRACKS) ? window.TRACKSIDE_PHOTO_TRACKS : [];
  if (!records.length) {
    return [];
  }

  return mergeUniqueCalendarTracks(
    records.map((record, index) =>
      createDiscoveredTrack(
        {
          title: record.title || record.name,
          extract: record.extract || record.description,
          location: record.location,
          photoUrl: record.photoUrl,
          sourceUrl: record.sourceUrl,
          sourceType: "static",
          priority: record.priority,
          f1History: record.f1History,
        },
        index,
      ),
    ),
  )
    .sort(compareCalendarTracks)
    .slice(0, totalDays);
}

function hasCompleteStaticPhotoCalendar() {
  return buildStaticPhotoCalendarTracks().length >= totalDays;
}

function setCalendarTrackList(tracks) {
  const uniqueTracks = [];
  const seenIds = new Set();
  const seenNames = new Set();

  for (const track of tracks) {
    const normalizedName = normalizeTitle(track.name);
    if (!track.id || !track.name || seenIds.has(track.id) || seenNames.has(normalizedName)) {
      continue;
    }

    uniqueTracks.push(track);
    seenIds.add(track.id);
    seenNames.add(normalizedName);

    if (uniqueTracks.length >= totalDays) {
      break;
    }
  }

  if (uniqueTracks.length < totalDays) {
    return false;
  }

  calendarTrackList = uniqueTracks;
  dateAssignments = calendarTrackList.map((track) => track.id);
  if (window.TRackside) {
    window.TRackside.calendarTrackList = calendarTrackList;
    window.TRackside.dateAssignments = dateAssignments;
  }
  return true;
}

function parseIsoDate(iso) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function isoFromIndex(index) {
  const date = new Date(startTime + wrapIndex(index) * DAY_MS);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function indexFromIso(iso) {
  return Math.round((parseIsoDate(iso).getTime() - startTime) / DAY_MS);
}

function formatDisplayDate(iso) {
  return dateFormatter.format(parseIsoDate(iso));
}

function getTodayIndex() {
  const now = new Date();
  const localIso = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");
  return wrapIndex(indexFromIso(localIso));
}

function readHashIndex() {
  const match = window.location.hash.match(/(\d{4}-\d{2}-\d{2})/);
  if (!match) {
    return null;
  }

  const index = indexFromIso(match[1]);
  if (Number.isNaN(index)) {
    return null;
  }

  return wrapIndex(index);
}

function wrapIndex(index) {
  return ((index % totalDays) + totalDays) % totalDays;
}

function loadState() {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || {};
  } catch (error) {
    return {};
  }
}

function persistState() {
  const stateToSave = {
    ...storedState,
    favorites: [...favoriteIds],
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  } catch (error) {
    storedState = stateToSave;
  }
}

function loadPhotoCache() {
  try {
    return JSON.parse(window.localStorage.getItem(PHOTO_CACHE_KEY)) || {};
  } catch (error) {
    return {};
  }
}

function persistPhotoCache() {
  try {
    window.localStorage.setItem(PHOTO_CACHE_KEY, JSON.stringify(photoCache));
  } catch (error) {
    return;
  }
}

async function hydrateImageBackedCalendar() {
  if (hasCompleteStaticPhotoCalendar()) {
    return;
  }

  const cachedTracks = loadExpandedCalendarCache();
  if (setCalendarTrackList(cachedTracks)) {
    renderCurrentTrack(false);
  }

  const discoveredTracks = await discoverImageBackedCalendarTracks();
  if (setCalendarTrackList(discoveredTracks)) {
    persistExpandedCalendarCache(calendarTrackList);
    renderCurrentTrack(false);
  }
}

function loadExpandedCalendarCache() {
  try {
    const cached = JSON.parse(window.localStorage.getItem(EXPANDED_CALENDAR_CACHE_KEY)) || [];
    if (!Array.isArray(cached)) {
      return [];
    }

    return cached.filter(isCompleteImageBackedTrack).slice(0, totalDays);
  } catch (error) {
    return [];
  }
}

function persistExpandedCalendarCache(tracks) {
  const compactTracks = tracks.slice(0, totalDays).map(compactCalendarTrack);
  try {
    window.localStorage.setItem(EXPANDED_CALENDAR_CACHE_KEY, JSON.stringify(compactTracks));
  } catch (error) {
    return;
  }
}

function compactCalendarTrack(track) {
  return {
    id: track.id,
    name: track.name,
    location: track.location,
    length: track.length,
    opened: track.opened,
    elevation: track.elevation,
    type: track.type,
    theme: track.theme,
    scenery: track.scenery,
    landmark: track.landmark,
    corner: track.corner,
    cornerFact: track.cornerFact,
    heritage: track.heritage,
    landscape: track.landscape,
    engineering: track.engineering,
    achievement: track.achievement,
    prompt: track.prompt,
    outline: track.outline,
    marker: track.marker,
    layoutImageUrl: track.layoutImageUrl,
    layoutSourceUrl: track.layoutSourceUrl,
    f1History: track.f1History,
    photoUrl: track.photoUrl,
    discoveryScore: track.discoveryScore,
    sourceUrl: track.sourceUrl,
  };
}

function isCompleteImageBackedTrack(track) {
  return Boolean(
    track &&
      track.id &&
      track.name &&
      track.photoUrl &&
      isUsableTrackPhoto(track.photoUrl, track.name) &&
      track.outline &&
      Array.isArray(track.marker) &&
      track.marker.length === 2,
  );
}

async function discoverImageBackedCalendarTracks() {
  const discovered = [];
  const wikidataTracks = await fetchWikidataImageTracks();
  discovered.push(...wikidataTracks);

  if (discovered.length < totalDays + 120) {
    const wikipediaTitles = await fetchWikipediaTrackTitleCandidates();
    const wikipediaTracks = await fetchWikipediaImageTracks(wikipediaTitles, totalDays + 180);
    discovered.push(...wikipediaTracks);
  }

  return mergeUniqueCalendarTracks(discovered)
    .sort(compareCalendarTracks)
    .slice(0, totalDays);
}

async function fetchWikidataImageTracks() {
  const endpoint = new URL("https://query.wikidata.org/sparql");
  const query = `
SELECT ?item ?itemLabel ?itemDescription ?image ?countryLabel ?adminLabel ?article WHERE {
  ?item wdt:P31/wdt:P279* wd:Q2338524.
  ?item wdt:P18 ?image.
  OPTIONAL { ?item wdt:P17 ?country. }
  OPTIONAL { ?item wdt:P131 ?admin. }
  OPTIONAL {
    ?article schema:about ?item;
      schema:isPartOf <https://en.wikipedia.org/>.
  }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
LIMIT 1400`;

  endpoint.searchParams.set("format", "json");
  endpoint.searchParams.set("query", query);

  try {
    const response = await fetch(endpoint.toString(), {
      cache: "force-cache",
      headers: {
        Accept: "application/sparql-results+json",
      },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    const rows = data.results?.bindings || [];
    return rows
      .map((row, index) => {
        const title = row.itemLabel?.value || "";
        const description = row.itemDescription?.value || "";
        const location = [row.adminLabel?.value, row.countryLabel?.value].filter(Boolean).join(", ");
        const photoUrl = normalizeImageUrl(row.image?.value || "");
        const sourceUrl = row.article?.value || row.item?.value || "";

        return createDiscoveredTrack(
          {
            title,
            extract: description,
            location,
            photoUrl,
            sourceUrl,
            sourceType: "wikidata",
          },
          index,
        );
      })
      .filter(Boolean);
  } catch (error) {
    return [];
  }
}

async function fetchWikipediaTrackTitleCandidates() {
  const candidateTitles = [];
  const listTitles = await fetchWikipediaListTrackTitles();
  candidateTitles.push(...listTitles);

  const searchTitles = await fetchWikipediaSearchTrackTitles();
  candidateTitles.push(...searchTitles);

  const seen = new Set();
  return candidateTitles.filter((title) => {
    const normalized = normalizeTitle(title);
    if (!isTrackCandidateTitle(title) || seen.has(normalized)) {
      return false;
    }
    seen.add(normalized);
    return true;
  });
}

async function fetchWikipediaListTrackTitles() {
  const endpoint = new URL("https://en.wikipedia.org/w/api.php");
  endpoint.searchParams.set("action", "parse");
  endpoint.searchParams.set("format", "json");
  endpoint.searchParams.set("origin", "*");
  endpoint.searchParams.set("page", DISCOVERY_SOURCE_PAGE);
  endpoint.searchParams.set("prop", "links");

  try {
    const response = await fetch(endpoint.toString(), { cache: "force-cache" });
    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return (data.parse?.links || [])
      .map((link) => link["*"] || link.title || "")
      .filter(Boolean);
  } catch (error) {
    return [];
  }
}

async function fetchWikipediaSearchTrackTitles() {
  const queries = [
    'intitle:"circuit" motorsport',
    'intitle:"raceway" motorsport',
    'intitle:"racing circuit"',
    'intitle:"motorsport park"',
    'intitle:"autodrome"',
    'intitle:"autodromo"',
    'intitle:"street circuit"',
    'intitle:"grand prix circuit"',
    '"former racing circuit"',
    '"closed racing circuit"',
    '"historic race track"',
    '"hillclimb course" motorsport',
  ];
  const titles = [];

  for (const query of queries) {
    for (let offset = 0; offset <= 100; offset += 50) {
      const endpoint = new URL("https://en.wikipedia.org/w/api.php");
      endpoint.searchParams.set("action", "query");
      endpoint.searchParams.set("format", "json");
      endpoint.searchParams.set("origin", "*");
      endpoint.searchParams.set("list", "search");
      endpoint.searchParams.set("srlimit", "50");
      endpoint.searchParams.set("sroffset", String(offset));
      endpoint.searchParams.set("srsearch", query);

      try {
        const response = await fetch(endpoint.toString(), { cache: "force-cache" });
        if (!response.ok) {
          continue;
        }

        const data = await response.json();
        titles.push(...(data.query?.search || []).map((result) => result.title).filter(Boolean));
      } catch (error) {
        continue;
      }
    }
  }

  return titles;
}

async function fetchWikipediaImageTracks(titles, targetCount) {
  const discovered = [];
  const limit = Math.min(titles.length, DISCOVERY_BATCH_SIZE * DISCOVERY_BATCH_LIMIT);

  for (let start = 0; start < limit && discovered.length < targetCount; start += DISCOVERY_BATCH_SIZE) {
    const pages = await fetchWikipediaTrackPageBatch(titles.slice(start, start + DISCOVERY_BATCH_SIZE));
    pages.forEach((page, pageIndex) => {
      const photoUrl = normalizeImageUrl(page?.original?.source || page?.thumbnail?.source || "");
      const title = page?.title || "";
      const extract = page?.extract || "";

      if (!isTrackCandidateTitle(title, extract) || !isUsableTrackPhoto(photoUrl, title)) {
        return;
      }

      const track = createDiscoveredTrack(
        {
          title,
          extract,
          photoUrl,
          sourceUrl: `https://en.wikipedia.org/wiki/${encodeURIComponent(title.replace(/\s/g, "_"))}`,
          sourceType: "wikipedia",
        },
        start + pageIndex,
      );

      if (track) {
        discovered.push(track);
      }
    });
  }

  return discovered;
}

async function fetchWikipediaTrackPageBatch(titles) {
  if (!titles.length) {
    return [];
  }

  const endpoint = new URL("https://en.wikipedia.org/w/api.php");
  endpoint.searchParams.set("action", "query");
  endpoint.searchParams.set("format", "json");
  endpoint.searchParams.set("origin", "*");
  endpoint.searchParams.set("redirects", "1");
  endpoint.searchParams.set("prop", "pageimages|extracts");
  endpoint.searchParams.set("piprop", "original|thumbnail");
  endpoint.searchParams.set("pithumbsize", "2400");
  endpoint.searchParams.set("exintro", "1");
  endpoint.searchParams.set("explaintext", "1");
  endpoint.searchParams.set("titles", titles.join("|"));

  try {
    const response = await fetch(endpoint.toString(), { cache: "force-cache" });
    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return Object.values(data.query?.pages || {}).filter((page) => !page.missing);
  } catch (error) {
    return [];
  }
}

function createDiscoveredTrack(record, sequence) {
  const title = cleanTrackTitle(record.title || "");
  const photoUrl = normalizeImageUrl(record.photoUrl || "");
  const extract = normalizeWhitespace(record.extract || "");
  const priority = Number(record.priority) || 0;
  const isF1History = Boolean(record.f1History);
  const f1Layout = isF1History ? getF1LayoutForTitle(title) : null;

  if (!title || !isTrackCandidateTitle(title, extract) || !isUsableTrackPhoto(photoUrl, title)) {
    return null;
  }

  const outlineData = generateOutlineFromSeed(`${title}-${record.sourceType || "track"}-${sequence}`);
  const location = record.location || extractLocationFromSummary(extract) || "Historic motorsport venue";
  const theme = inferDiscoveredTheme(`${title} ${extract} ${location}`);
  const type = inferDiscoveredType(`${title} ${extract}`);
  const opened = extractYear(extract) || "Historic";
  const firstSentence = extractFirstSentence(extract);
  const scenery = inferDiscoveredScenery(theme, `${title} ${extract} ${location}`);

  return {
    id: `wiki-${slugify(title)}`,
    name: title,
    location,
    length: "Archive entry",
    opened,
    elevation: inferDiscoveredElevation(`${title} ${extract} ${location}`),
    type,
    theme,
    scenery,
    weight: 1,
    landmark: firstSentence || `${title} is presented as a photo-backed stop in the TRackside motorsport archive.`,
    corner: inferDiscoveredCorner(type, title),
    cornerFact: isF1History
      ? `${title} is part of Formula 1 World Championship history and keeps the daily diagram treatment in the sidebar.`
      : `${title} keeps the daily diagram treatment while the main stage uses an actual track photograph.`,
    heritage: firstSentence || `${title} adds a unique venue to Tony's daily racing-history calendar.`,
    landscape: `The background image is tied to ${title}, giving the day's entry a real sense of place.`,
    engineering: `${type} entries reward different rhythms, from old public-road sections to compact club-style layouts and permanent circuits.`,
    achievement: isF1History
      ? `${title} has hosted a Formula 1 World Championship Grand Prix, so it is protected as part of the core TRackside collection.`
      : scoreTrackTitle(title, extract) >= 30 ? `${title} stands out as a historically flavored archive pick.` : `${title} expands the collection beyond the usual headline venues.`,
    prompt: `Cinematic trackside photography of ${title}, highlighting the real circuit setting, racing surface, landmarks, and atmosphere.`,
    outline: outlineData.outline,
    marker: outlineData.marker,
    layoutImageUrl: f1Layout?.layoutImageUrl || "",
    layoutSourceUrl: f1Layout?.sourceUrl || "",
    photoUrl,
    discoveryScore: scoreTrackTitle(title, extract) + priority,
    f1History: isF1History,
    sourceUrl: record.sourceUrl || "",
  };
}

function mergeUniqueCalendarTracks(tracks) {
  const merged = [];
  const seenIds = new Set();
  const seenNames = new Set();

  tracks.forEach((track) => {
    if (!isCompleteImageBackedTrack(track)) {
      return;
    }

    const normalizedName = normalizeTitle(track.name);
    if (seenIds.has(track.id) || seenNames.has(normalizedName)) {
      return;
    }

    seenIds.add(track.id);
    seenNames.add(normalizedName);
    merged.push(track);
  });

  return merged;
}

function compareCalendarTracks(a, b) {
  const scoreDifference = (b.discoveryScore || 0) - (a.discoveryScore || 0);
  if (scoreDifference !== 0) {
    return scoreDifference;
  }

  return hashString(a.name) - hashString(b.name);
}

function isTrackCandidateTitle(title, extract = "") {
  const text = `${title} ${extract}`;
  return TRACK_TITLE_PATTERN.test(text) && !NON_TRACK_TITLE_PATTERN.test(title) && !DISALLOWED_TRACK_TEXT_PATTERN.test(text);
}

function scoreTrackTitle(title, extract = "") {
  const text = `${title} ${extract}`.toLowerCase();
  let score = 20;

  if (/(?:closed|defunct|former|disused|abandoned|historic|historical|demolished)/.test(text)) {
    score += 28;
  }
  if (/(?:opened|built|constructed|founded|first used|inaugurated)\s+(?:in\s+)?(?:18|19)\d{2}/.test(text)) {
    score += 22;
  }
  if (/(?:street|road|public roads|hillclimb|mountain|forest|park|coast|island|harbor|harbour|airfield)/.test(text)) {
    score += 18;
  }
  if (/(?:grand prix|le mans|tourist trophy|targa|world championship|formula one|formula 1|motogp)/.test(text)) {
    score += 12;
  }
  if (/(?:kart|dragstrip|drag strip|nascar|horse racing|velodrome|simulator|video game)/.test(text)) {
    score -= 45;
  }

  return score;
}

function normalizeImageUrl(url) {
  if (!url) {
    return "";
  }

  return url.replace(/^http:\/\/commons\.wikimedia\.org\/wiki\/Special:FilePath\//i, "https://commons.wikimedia.org/wiki/Special:FilePath/");
}

function cleanTrackTitle(title) {
  return normalizeWhitespace(title.replace(/\s*\([^)]*\)\s*$/g, ""));
}

function normalizeTitle(title) {
  return normalizeWhitespace(title)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function getF1LayoutForTitle(title) {
  const normalizedTitle = normalizeTitle(title);
  if (!f1LayoutLookup) {
    f1LayoutLookup = new Map();
    const layouts = Array.isArray(window.TRACKSIDE_F1_LAYOUTS) ? window.TRACKSIDE_F1_LAYOUTS : [];
    layouts.forEach((layout) => {
      if (layout.title && layout.layoutImageUrl) {
        f1LayoutLookup.set(normalizeTitle(layout.title), layout);
      }
    });
  }

  const alias = F1_LAYOUT_TITLE_ALIASES[normalizedTitle];
  return f1LayoutLookup.get(normalizedTitle) || (alias ? f1LayoutLookup.get(normalizeTitle(alias)) : null) || null;
}

function normalizeWhitespace(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function slugify(value) {
  const slug = normalizeTitle(value).replace(/\s+/g, "-");
  return slug || `track-${hashString(value).toString(36)}`;
}

function extractFirstSentence(extract) {
  const sentence = normalizeWhitespace(extract).match(/^(.{40,240}?[.!?])(?:\s|$)/);
  return sentence ? sentence[1] : "";
}

function extractLocationFromSummary(extract) {
  const text = normalizeWhitespace(extract);
  const match = text.match(/\b(?:in|near|at|outside|located in)\s+([^.;]{3,80})/i);
  if (!match) {
    return "";
  }

  return match[1]
    .replace(/\s+(?:and|that|which|where|with)\b.*$/i, "")
    .replace(/\s*,?\s*(?:a|an|the)\s+(?:motor|auto|racing|former|closed).*$/i, "")
    .trim();
}

function extractYear(extract) {
  const openedMatch = extract.match(/\b(?:opened|built|constructed|founded|inaugurated|first used|established)\D{0,24}((?:18|19|20)\d{2})\b/i);
  if (openedMatch) {
    return openedMatch[1];
  }

  const anyYear = extract.match(/\b((?:18|19)\d{2})\b/);
  return anyYear ? anyYear[1] : "";
}

function inferDiscoveredTheme(text) {
  if (/(?:coast|harbor|harbour|marina|island|beach|sea|bay)/i.test(text)) {
    return "coast";
  }
  if (/(?:mountain|hill|alpine|ridge|valley|elevation|climb)/i.test(text)) {
    return "alpine";
  }
  if (/(?:forest|wood|park|green|country|rural)/i.test(text)) {
    return "forest";
  }
  if (/(?:street|city|town|downtown|urban|boulevard)/i.test(text)) {
    return "city";
  }
  if (/(?:desert|dune|arid|sand)/i.test(text)) {
    return "desert";
  }
  return "heritage";
}

function inferDiscoveredScenery(theme, text) {
  const scenery = new Set(["heritage"]);
  if (theme === "coast" || /(?:river|lake|sea|bay|harbor|harbour|marina)/i.test(text)) {
    scenery.add("water");
  }
  if (theme === "alpine") {
    scenery.add("mountain");
  }
  if (theme === "forest") {
    scenery.add("forest");
    scenery.add("field");
  }
  if (theme === "city") {
    scenery.add("city");
  }
  if (theme === "desert") {
    scenery.add("desert");
  }
  if (/(?:field|airfield|farm|rural|country)/i.test(text)) {
    scenery.add("field");
  }
  return [...scenery];
}

function inferDiscoveredType(text) {
  if (/(?:street circuit|street course|public roads|road circuit|road race)/i.test(text)) {
    return "Public-road circuit";
  }
  if (/(?:closed|defunct|former|disused|abandoned)/i.test(text)) {
    return "Historic closed circuit";
  }
  if (/(?:hillclimb|hill climb|mountain course)/i.test(text)) {
    return "Hillclimb course";
  }
  if (/(?:raceway|speedway|autodrome|autodromo|circuit)/i.test(text)) {
    return "Motorsport circuit";
  }
  return "Historic racing venue";
}

function inferDiscoveredElevation(text) {
  if (/(?:mountain|hill|climb|valley|ridge|elevation)/i.test(text)) {
    return "Elevation character";
  }
  if (/(?:street|city|harbor|harbour|coast|island)/i.test(text)) {
    return "Landmark setting";
  }
  if (/(?:closed|defunct|former|disused|abandoned)/i.test(text)) {
    return "Archive atmosphere";
  }
  return "Circuit rhythm";
}

function inferDiscoveredCorner(type, title) {
  if (/hillclimb/i.test(type)) {
    return "Climbing Section";
  }
  if (/public-road/i.test(type)) {
    return "Road Section";
  }
  if (/closed/i.test(type)) {
    return "Lost Corner";
  }
  return `${title.split(/\s+/)[0]} Bend`;
}

function generateOutlineFromSeed(seedLabel) {
  const random = seededRandom(hashString(seedLabel));
  const pointCount = 8 + Math.floor(random() * 5);
  const centerX = 50 + (random() - 0.5) * 8;
  const centerY = 51 + (random() - 0.5) * 8;
  const radiusX = 28 + random() * 12;
  const radiusY = 23 + random() * 13;
  const points = [];

  for (let index = 0; index < pointCount; index += 1) {
    const angle = (Math.PI * 2 * index) / pointCount + (random() - 0.5) * 0.34;
    const radiusPulse = 0.72 + random() * 0.52;
    const kinkX = Math.cos(angle * 2.1) * (random() - 0.5) * 6;
    const kinkY = Math.sin(angle * 1.7) * (random() - 0.5) * 6;
    points.push({
      x: clamp(centerX + Math.cos(angle) * radiusX * radiusPulse + kinkX, 12, 88),
      y: clamp(centerY + Math.sin(angle) * radiusY * radiusPulse + kinkY, 14, 86),
    });
  }

  const first = points[0];
  const path = [`M${first.x.toFixed(1)} ${first.y.toFixed(1)}`];

  for (let index = 0; index < points.length; index += 1) {
    const current = points[index];
    const next = points[(index + 1) % points.length];
    const midX = ((current.x + next.x) / 2).toFixed(1);
    const midY = ((current.y + next.y) / 2).toFixed(1);
    path.push(`Q${current.x.toFixed(1)} ${current.y.toFixed(1)} ${midX} ${midY}`);
  }

  path.push("Z");
  return {
    outline: path.join(" "),
    marker: [Number(first.x.toFixed(1)), Number(first.y.toFixed(1))],
  };
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

async function updateTrackPhoto(track) {
  const requestId = ++photoRequestId;
  let activePhoto = elements.trackPhotos[activePhotoLayer];

  if (activePhoto.dataset.trackId === track.id && activePhoto.currentSrc) {
    document.body.classList.add("has-photo");
    return;
  }

  hideTrackPhoto();
  activePhoto = elements.trackPhotos[activePhotoLayer];

  const photoUrl = await resolveTrackPhoto(track);
  if (requestId !== photoRequestId) {
    return;
  }

  if (!photoUrl) {
    hideTrackPhoto();
    return;
  }

  const nextPhotoIndex = activePhotoLayer === 0 ? 1 : 0;
  const nextPhoto = elements.trackPhotos[nextPhotoIndex];

  nextPhoto.onload = () => {
    if (requestId !== photoRequestId) {
      return;
    }

    nextPhoto.onload = null;
    nextPhoto.onerror = null;
    nextPhoto.classList.add("is-active");
    activePhoto.classList.remove("is-active");
    activePhotoLayer = nextPhotoIndex;
    elements.photoStage.dataset.photoSource = photoUrl;
    document.body.classList.add("has-photo");
  };

  nextPhoto.onerror = () => {
    if (requestId !== photoRequestId) {
      return;
    }

    nextPhoto.onload = null;
    nextPhoto.onerror = null;
    if (photoCache[track.id] === photoUrl) {
      delete photoCache[track.id];
      persistPhotoCache();
    }
    hideTrackPhoto();
  };

  nextPhoto.dataset.trackId = track.id;
  nextPhoto.src = photoUrl;

  if (nextPhoto.complete && nextPhoto.naturalWidth > 0) {
    nextPhoto.onload();
  }
}

function hideTrackPhoto() {
  document.body.classList.remove("has-photo");
  elements.photoStage.removeAttribute("data-photo-source");
  elements.trackPhotos.forEach((photo) => {
    photo.onload = null;
    photo.onerror = null;
    photo.classList.remove("is-active");
    photo.removeAttribute("src");
    photo.removeAttribute("data-track-id");
  });
  activePhotoLayer = 0;
  elements.trackPhotos[activePhotoLayer].classList.add("is-active");
}

async function resolveTrackPhoto(track) {
  if (track.photoUrl && isUsableTrackPhoto(track.photoUrl, track.name)) {
    return track.photoUrl;
  }

  if (photoCache[track.id]) {
    return photoCache[track.id];
  }

  const pageTitle = WIKI_PAGE_TITLES[track.id] || track.name;
  const pagePhoto = await fetchWikipediaPageImage(pageTitle);
  if (pagePhoto) {
    return cacheTrackPhoto(track.id, pagePhoto);
  }

  const commonsPhoto = await fetchCommonsTrackPhoto(track, pageTitle);
  if (commonsPhoto) {
    return cacheTrackPhoto(track.id, commonsPhoto);
  }

  return "";
}

function cacheTrackPhoto(trackId, photoUrl) {
  photoCache = {
    ...photoCache,
    [trackId]: photoUrl,
  };
  persistPhotoCache();
  return photoUrl;
}

async function fetchWikipediaPageImage(pageTitle) {
  const endpoint = new URL("https://en.wikipedia.org/w/api.php");
  endpoint.searchParams.set("action", "query");
  endpoint.searchParams.set("format", "json");
  endpoint.searchParams.set("origin", "*");
  endpoint.searchParams.set("redirects", "1");
  endpoint.searchParams.set("prop", "pageimages");
  endpoint.searchParams.set("piprop", "original|thumbnail");
  endpoint.searchParams.set("pithumbsize", "2400");
  endpoint.searchParams.set("titles", pageTitle);

  try {
    const response = await fetch(endpoint.toString(), { cache: "force-cache" });
    if (!response.ok) {
      return "";
    }

    const data = await response.json();
    const page = Object.values(data.query?.pages || {}).find((candidate) => !candidate.missing);
    const photoUrl = page?.original?.source || page?.thumbnail?.source || "";
    return isUsableTrackPhoto(photoUrl, page?.title) ? photoUrl : "";
  } catch (error) {
    return "";
  }
}

async function fetchCommonsTrackPhoto(track, pageTitle) {
  const endpoint = new URL("https://commons.wikimedia.org/w/api.php");
  const searchTerm = `${pageTitle} ${track.location.split(",")[0]} race track photo`;

  endpoint.searchParams.set("action", "query");
  endpoint.searchParams.set("format", "json");
  endpoint.searchParams.set("origin", "*");
  endpoint.searchParams.set("generator", "search");
  endpoint.searchParams.set("gsrnamespace", "6");
  endpoint.searchParams.set("gsrlimit", "12");
  endpoint.searchParams.set("gsrsearch", searchTerm);
  endpoint.searchParams.set("prop", "imageinfo");
  endpoint.searchParams.set("iiprop", "url|mime");
  endpoint.searchParams.set("iiurlwidth", "2400");

  try {
    const response = await fetch(endpoint.toString(), { cache: "force-cache" });
    if (!response.ok) {
      return "";
    }

    const data = await response.json();
    const pages = Object.values(data.query?.pages || {});
    for (const page of pages) {
      const info = page.imageinfo?.[0];
      const photoUrl = info?.thumburl || info?.url || "";
      if (info?.mime?.startsWith("image/") && isUsableTrackPhoto(photoUrl, page.title)) {
        return photoUrl;
      }
    }
  } catch (error) {
    return "";
  }

  return "";
}

function isUsableTrackPhoto(photoUrl, label = "") {
  if (!photoUrl) {
    return false;
  }

  const decoded = decodeURIComponent(`${photoUrl} ${label}`).replace(/\+/g, " ");
  const isBitmap = /\.(?:jpe?g|png|webp)(?:[?#]|$)/i.test(photoUrl);
  return isBitmap && !BAD_IMAGE_PATTERN.test(decoded);
}

function drawTrackScene(track, index) {
  const canvas = elements.visual;
  const context = canvas.getContext("2d");
  if (!context) {
    return;
  }
  const width = window.innerWidth;
  const height = window.innerHeight;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const theme = THEME_LIBRARY[track.theme] || THEME_LIBRARY.heritage;

  if (canvas.width !== Math.round(width * ratio) || canvas.height !== Math.round(height * ratio)) {
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
  }

  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.clearRect(0, 0, width, height);

  drawSky(context, width, height, theme);
  drawSceneTerrain(context, width, height, theme, track, index);
  drawAtmosphereLines(context, width, height, theme, index);
  drawAerialTrack(context, width, height, theme, track);
}

function drawSky(context, width, height, theme) {
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, theme.skyTop);
  gradient.addColorStop(0.48, theme.skyBottom);
  gradient.addColorStop(1, "#15120d");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);
}

function drawSceneTerrain(context, width, height, theme, track, index) {
  const random = seededRandom(hashString(`${track.id}-${index}`));
  const scenery = new Set(track.scenery);

  if (scenery.has("coast")) {
    drawWater(context, width, height, theme, random);
  }

  if (scenery.has("mountain")) {
    drawMountains(context, width, height, theme, random);
  }

  if (scenery.has("desert")) {
    drawDunes(context, width, height, theme, random);
  }

  if (scenery.has("field")) {
    drawFields(context, width, height, theme, random);
  }

  if (scenery.has("forest")) {
    drawForest(context, width, height, theme, random);
  }

  if (scenery.has("city")) {
    drawCity(context, width, height, theme, random);
  }

  if (scenery.has("heritage")) {
    drawHeritageStructures(context, width, height, theme, random);
  }
}

function drawWater(context, width, height, theme, random) {
  const water = context.createLinearGradient(width * 0.55, height * 0.15, width, height);
  water.addColorStop(0, withAlpha(theme.water, 0.18));
  water.addColorStop(1, withAlpha(theme.water, 0.72));

  context.beginPath();
  context.moveTo(width * (0.58 + random() * 0.12), 0);
  context.bezierCurveTo(width * 0.74, height * 0.24, width * 0.64, height * 0.52, width, height * 0.72);
  context.lineTo(width, 0);
  context.closePath();
  context.fillStyle = water;
  context.fill();

  context.strokeStyle = withAlpha("#fff6df", 0.18);
  context.lineWidth = 1;
  for (let line = 0; line < 9; line += 1) {
    const y = height * (0.18 + line * 0.065 + random() * 0.025);
    context.beginPath();
    context.moveTo(width * (0.62 + random() * 0.15), y);
    context.lineTo(width * (0.93 + random() * 0.06), y + random() * 14);
    context.stroke();
  }
}

function drawMountains(context, width, height, theme, random) {
  for (let layer = 0; layer < 3; layer += 1) {
    const base = height * (0.45 + layer * 0.12);
    const amplitude = height * (0.1 + layer * 0.025);
    context.beginPath();
    context.moveTo(0, base);

    for (let x = 0; x <= width + 80; x += width / 9) {
      const y = base - amplitude * (0.35 + random() * 0.9);
      context.lineTo(x, y);
    }

    context.lineTo(width, height);
    context.lineTo(0, height);
    context.closePath();
    context.fillStyle = withAlpha(layer === 0 ? theme.terrain : "#171711", 0.34 + layer * 0.16);
    context.fill();
  }
}

function drawDunes(context, width, height, theme, random) {
  context.strokeStyle = withAlpha("#f1d19a", 0.2);
  context.lineWidth = 1.2;
  for (let line = 0; line < 12; line += 1) {
    const y = height * (0.35 + line * 0.055);
    context.beginPath();
    context.moveTo(0, y);
    for (let x = 0; x <= width; x += 70) {
      context.quadraticCurveTo(x + 35, y + 16 * Math.sin(line + x * 0.01) + random() * 9, x + 70, y);
    }
    context.stroke();
  }
}

function drawFields(context, width, height, theme, random) {
  context.save();
  context.translate(width * 0.08, height * 0.3);
  context.rotate(-0.12);
  for (let band = 0; band < 10; band += 1) {
    context.fillStyle = band % 2 === 0 ? withAlpha(theme.terrain, 0.24) : withAlpha(theme.secondary, 0.18);
    context.fillRect(-width * 0.2, band * height * 0.08, width * 1.25, height * 0.045 + random() * 12);
  }
  context.restore();
}

function drawForest(context, width, height, theme, random) {
  const count = Math.floor((width * height) / 14500);
  context.fillStyle = withAlpha(theme.secondary, 0.24);
  for (let tree = 0; tree < count; tree += 1) {
    const x = random() * width;
    const y = height * (0.18 + random() * 0.72);
    const size = 2 + random() * 5;
    context.beginPath();
    context.moveTo(x, y - size);
    context.lineTo(x + size * 0.8, y + size);
    context.lineTo(x - size * 0.8, y + size);
    context.closePath();
    context.fill();
  }
}

function drawCity(context, width, height, theme, random) {
  const baseY = height * 0.22;
  const startX = width * 0.58;
  for (let building = 0; building < 18; building += 1) {
    const blockWidth = width * (0.018 + random() * 0.026);
    const blockHeight = height * (0.08 + random() * 0.22);
    const x = startX + building * width * 0.028;
    const y = baseY + random() * height * 0.08;
    context.fillStyle = withAlpha(theme.architecture, 0.16 + random() * 0.18);
    context.fillRect(x, y, blockWidth, blockHeight);
    context.fillStyle = withAlpha("#fff6df", 0.12);
    context.fillRect(x + blockWidth * 0.2, y + blockHeight * 0.16, blockWidth * 0.16, blockHeight * 0.68);
  }
}

function drawHeritageStructures(context, width, height, theme, random) {
  context.strokeStyle = withAlpha(theme.architecture, 0.24);
  context.lineWidth = 2;
  const y = height * (0.72 + random() * 0.08);
  const x = width * (0.08 + random() * 0.12);
  for (let bay = 0; bay < 8; bay += 1) {
    const bayX = x + bay * width * 0.045;
    context.strokeRect(bayX, y, width * 0.032, height * 0.065);
    context.beginPath();
    context.moveTo(bayX, y);
    context.lineTo(bayX + width * 0.016, y - height * 0.025);
    context.lineTo(bayX + width * 0.032, y);
    context.stroke();
  }
}

function drawAtmosphereLines(context, width, height, theme, index) {
  context.save();
  context.globalCompositeOperation = "screen";
  context.strokeStyle = withAlpha(theme.accent, 0.09);
  context.lineWidth = 1;
  for (let line = 0; line < 7; line += 1) {
    const y = height * (0.18 + line * 0.11);
    const offset = ((index + line * 13) % 29) - 14;
    context.beginPath();
    context.moveTo(width * 0.02, y + offset);
    context.bezierCurveTo(width * 0.28, y - 24, width * 0.55, y + 28, width * 0.98, y - 8);
    context.stroke();
  }
  context.restore();
}

function drawAerialTrack(context, width, height, theme, track) {
  if (!window.Path2D) {
    return;
  }

  const path = new Path2D(track.outline);
  const sceneSize = Math.min(width * (width > 860 ? 0.56 : 0.78), height * 0.78);
  const centerX = width > 860 ? width * 0.62 : width * 0.53;
  const centerY = width > 860 ? height * 0.48 : height * 0.41;
  const scale = sceneSize / 100;
  const offsetX = centerX - sceneSize / 2;
  const offsetY = centerY - sceneSize / 2;

  context.save();
  context.translate(offsetX, offsetY);
  context.scale(scale, scale);
  context.lineCap = "round";
  context.lineJoin = "round";

  context.shadowColor = withAlpha(theme.accent, 0.42);
  context.shadowBlur = 2.8;
  context.strokeStyle = withAlpha("#000000", 0.42);
  context.lineWidth = 7.2;
  context.stroke(path);

  context.shadowBlur = 0;
  context.strokeStyle = theme.asphalt;
  context.lineWidth = 4.5;
  context.stroke(path);

  context.strokeStyle = theme.track;
  context.lineWidth = 1.9;
  context.stroke(path);

  context.setLineDash([1.1, 2.2]);
  context.strokeStyle = theme.curb;
  context.lineWidth = 0.72;
  context.stroke(path);
  context.restore();

  drawTrackMarker(context, offsetX + track.marker[0] * scale, offsetY + track.marker[1] * scale, theme);
}

function drawTrackMarker(context, x, y, theme) {
  context.save();
  context.translate(x, y);
  context.rotate(Math.PI / 4);
  context.fillStyle = theme.accent;
  context.shadowColor = withAlpha(theme.accent, 0.58);
  context.shadowBlur = 18;
  context.fillRect(-5, -5, 10, 10);
  context.restore();
}

function withAlpha(hex, alpha) {
  const normalized = hex.replace("#", "");
  const value = Number.parseInt(normalized, 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function hashString(value) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededRandom(seed) {
  let value = seed;
  return () => {
    value += 0x6d2b79f5;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

window.TRackside = {
  START_ISO,
  END_ISO,
  totalDays,
  masterTrackList,
  calendarTrackList,
  dateAssignments,
  getTrackForDate(iso) {
    return getTrackForIndex(indexFromIso(iso));
  },
  expansion: {
    favoritesStorageKey: STORAGE_KEY,
    searchableFields: ["name", "location", "type", "corner", "landmark", "achievement"],
    timelineSource: "dateAssignments",
    trackOfTheMonthReady: true,
    printableCalendarReady: true,
    seasonalImageryFields: ["theme", "scenery", "prompt"],
  },
};
