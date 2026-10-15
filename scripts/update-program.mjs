import { createClient } from "@sanity/client";
import fs from "fs";

const env = fs.existsSync(".env.local") ? fs.readFileSync(".env.local", "utf8") : "";
const getEnv = (k) => {
  const m = env.match(new RegExp("^\\s*" + k + "\\s*=\\s*(.*)$", "m"));
  return m ? m[1].trim().replace(/^["']|["']$/g, "") : process.env[k];
};

const client = createClient({
  projectId: "2orem60g",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: getEnv("SANITY_API_TOKEN"),
  useCdn: false,
});

const ID = "50c510dc-5c8e-452f-b1ba-4bbf5a2d03f7";
const HALL = "Aula Magna (TD0301CC)";

let k = 0;
const key = () => "e" + (k++).toString(36);
const ev = (time, title, type, speaker, location) => ({
  _key: key(), _type: "event", time, title, type,
  ...(speaker ? { speaker } : {}),
  ...(location ? { location } : {}),
});

const days = [
  {
    _key: "day0", _type: "day", date: "2026-10-15",
    events: [ ev("18:00-22:00", "Welcome Meetup", "social") ],
  },
  {
    _key: "day1", _type: "day", date: "2026-10-16",
    events: [
      ev("08:45-09:30", "Registration + Welcome Kit Pickup", "other", undefined, "Entrance Hall"),
      ev("09:30-10:00", "Opening Ceremony", "other", undefined, HALL),
      ev("10:00-10:45", "Fusion of field measurements, airborne LiDAR, space-borne imagery and AI in wildfire mitigation", "keynote", "Dr. Tuomo Kauranne", HALL),
      ev("10:45-11:15", "Coffee Break", "break"),
      ev("11:15-11:45", "ESRI's AI solutions for GIS workflows", "talk", "Michael Gould", HALL),
      ev("11:45-12:30", "Oral Presentation: An Integrated ArcGIS Python Toolbox for SCS-CN-Based Flood Prediction in Data-Scarce Basins — Development, Validation, and Operational Application in Eastern Ethiopia", "talk", "Kalid Hassen Yasin", HALL),
      ev("11:45-12:30", "Oral Presentation: Beyond Hazard Mapping: Integrating GeoAI, Earth Observation and Cloud Computing for Disaster Intelligence", "talk", "Maycol Zaraza Aguilera", HALL),
      ev("12:30-13:00", "Beyond Maps: Real-World Geospatial Projects and Career Paths at con terra", "talk", "Héctor Honrubia Huertas & Francisco Vaquero Cáceres", HALL),
      ev("13:00-13:15", "Group Photo", "other"),
      ev("13:15-14:45", "Lunch Break", "break", undefined, "Cafetería"),
      ev("14:45-17:15", "Parallel Workshop: Flood Mapping from Satellite Imagery with ML4Floods", "workshop", "Enrique Portalés-Julià", "TD1301AA"),
      ev("14:45-17:15", "Parallel Workshop: Sensors and IoT for Disaster Resilience with senseBox", "workshop", "Dr. Thomas Bartoschek & Mario Pesch", "TD1304AA"),
      ev("14:45-17:15", "Parallel Workshop: Disaster Mapping with OpenStreetMap (OSM)", "workshop", "Héctor Ochoa Ortiz", "TD1316AA"),
      ev("14:45-17:15", "Parallel Workshop: Wildfire Risk Mapping and Fire Spread Modelling with Open Earth Observation Data", "workshop", "Dr. Sergio Trilles, Dr. Pablo Juan Verdoy, Dr. Somnath Chaudhuri & Sahibzada Saadoon Hammad", "TD2022AI"),
      ev("17:15-17:45", "Workshop Overview + Closing First Day", "other", undefined, HALL),
      ev("19:50", "The Conference Dinner", "social"),
    ],
  },
  {
    _key: "day2", _type: "day", date: "2026-10-17",
    events: [
      ev("09:00-09:30", "Registration", "other", undefined, "Entrance Hall"),
      ev("09:30-09:45", "Second Day Opening Remarks", "other", undefined, HALL),
      ev("09:45-10:45", "Alumni Panel: Navigating Geospatial Careers", "talk", "Emmanuel Jolaiya, Dr. Somnath Chaudhuri, Eftychia Koukouraki & Alaa Bakry", HALL),
      ev("10:45-11:15", "Coffee Break", "break"),
      ev("11:15-12:00", "From Validation Services to Advanced Risk Assessment: Tracasa Global's Expertise in Emergency Management", "keynote", "Maria Gorzynska", HALL),
      ev("12:00-12:45", "Forecast to Recovery: Flood Risk Management in UN Operations", "keynote", "Dr. Mariangela Noviello", HALL),
      ev("12:45-14:15", "Lunch Break", "break", undefined, "La Pecera"),
      ev("14:15-15:00", "Oral Presentation: Flood susceptibility mapping of Rajanpur District using a hybrid GIS-AHP framework", "talk", "Adnan Tabsum", HALL),
      ev("14:15-15:00", "Oral Presentation: Open Data for Disaster Mapping", "talk", "Sushma Ghimire", HALL),
      ev("14:15-15:00", "Oral Presentation: Earth observation and geospatial intelligence to detect spatio-temporal flood hazards in the Sebou watershed, North Morocco — Al-Gharb plain case study", "talk", "Achraf Samy Houari", HALL),
      ev("15:00-15:30", "Interactive Trivia", "social", undefined, HALL),
      ev("15:30-15:45", "Map Presentation", "other", undefined, HALL),
      ev("15:45-16:15", "Awards + Closing Ceremony", "other", undefined, HALL),
    ],
  },
];

async function run() {
  if (!getEnv("SANITY_API_TOKEN")) { console.error("No SANITY_API_TOKEN found in .env.local"); process.exit(1); }
  await client.patch(ID).set({ days }).commit();
  const back = await client.fetch(`*[_id=="${ID}"][0]{ "d": count(days), "e": count(days[].events[]) }`);
  console.log("✓ Schedule updated — days:", back.d, "events:", back.e);
}
run().catch((e) => { console.error(e); process.exit(1); });
