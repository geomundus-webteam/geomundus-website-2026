import { sanityWriteClient } from "../lib/sanity.write";

async function publish2018() {
  const draft = await sanityWriteClient.fetch(
    `*[_id == "drafts.eac3880f-cad3-4892-968f-dea3d24db14b"][0]`
  );

  if (!draft) {
    console.log("No draft found for 2018");
    return;
  }

  console.log("Draft found:", { year: draft.year, title: draft.title });

  const publishedId = draft._id.replace("drafts.", "");
  const { _id, _rev, ...doc } = draft;

  await sanityWriteClient.createOrReplace({ ...doc, _id: publishedId });
  await sanityWriteClient.delete(draft._id);

  console.log(`OK: published 2018 (id: ${publishedId})`);
}

publish2018()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
