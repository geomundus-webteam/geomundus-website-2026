import { sanityWriteClient } from "../lib/sanity.write";

async function update2018() {
  const result = await sanityWriteClient
    .patch("eac3880f-cad3-4892-968f-dea3d24db14b")
    .set({
      title: "GeoMundus 2018 Conference",
      location: "Lisbon, Portugal",
      description:
        "The 10th edition of the GeoMundus Conference was held on December 7-8, 2018 at NOVA IMS, Universidade Nova de Lisboa, in Lisbon, Portugal. Organized by students of the Erasmus Mundus Master's of Science in Geospatial Technologies, the conference brought together researchers, professionals, and students to share cutting-edge scientific research in Geospatial Technologies, Geoinformatics, and Geosciences.",
    })
    .commit();

  console.log("OK: 2018 updated", { id: result._id, year: result.year, title: result.title });
}

update2018()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
