import { sanityWriteClient } from "../lib/sanity.write";

async function importConferences() {
  const entries = [
    {
      _type: "conference",
      year: 2018,
      title: "GeoMundus 2018 Conference",
      location: "Lisbon, Portugal",
      description:
        "The 10th edition of the GeoMundus Conference was held on December 7-8, 2018 at NOVA IMS, Universidade Nova de Lisboa, in Lisbon, Portugal. Organized by students of the Erasmus Mundus Master's of Science in Geospatial Technologies, the conference brought together researchers, professionals, and students to share cutting-edge scientific research in Geospatial Technologies, Geoinformatics, and Geosciences.",
      current: false,
    },
    {
      _type: "conference",
      year: 2019,
      title: "GeoMundus 2019 Conference",
      location: "Castellon de la Plana, Spain",
      description:
        "The 11th edition of the GeoMundus Conference was held in Castellon de la Plana, Spain, hosted by Universitat Jaume I. Organized by students of the Erasmus Mundus Master's of Science in Geospatial Technologies, the conference aimed to share cutting-edge scientific research, knowledge, and skills in Geospatial Technologies, Geoinformatics, and Geosciences. GeoMundus 2019 also explored the emerging role of Artificial Intelligence in these fields.",
      current: false,
    },
  ];

  for (const entry of entries) {
    try {
      const existing = await sanityWriteClient.fetch(
        `*[_type == "conference" && year == $year][0]`,
        { year: entry.year }
      );

      if (existing) {
        console.log(`SKIP: ${entry.year} already exists (id: ${existing._id})`);
        continue;
      }

      const result = await sanityWriteClient.create(entry);
      console.log(`OK: created ${entry.year} (id: ${result._id})`);
    } catch (error) {
      console.error(`ERROR importing ${entry.year}:`, error);
    }
  }
}

importConferences()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
