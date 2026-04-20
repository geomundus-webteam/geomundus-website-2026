import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

// This secret is used to ensure only authorized requests can revalidate
const REVALIDATE_SECRET = process.env.SANITY_REVALIDATE_SECRET;

export async function POST(request: NextRequest) {
  try {
    // Check if the secret is configured
    if (!REVALIDATE_SECRET) {
      console.error("SANITY_REVALIDATE_SECRET is not configured");
      return NextResponse.json(
        { message: "SANITY_REVALIDATE_SECRET is not configured" },
        { status: 500 },
      );
    }

    const body = await request.json();

    // Log the incoming webhook for debugging
    console.log("Received Sanity webhook:", JSON.stringify(body));

    // Verify the request has the correct secret
    const secret = request.headers.get("x-webhook-secret");
    if (secret !== REVALIDATE_SECRET) {
      console.error("Invalid webhook secret received");
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    // Extract information from the webhook payload
    const { _type, _id } = body;

    if (!_type || !_id) {
      console.error("Missing _type or _id in webhook payload");
      return NextResponse.json(
        { message: "Missing document information" },
        { status: 400 },
      );
    }

    // Create a tag for this specific document
    const documentTag = `${_type}:${_id}`;

    // Revalidate the specific document using its tag
    console.log(`Revalidating tag: ${documentTag}`);
    revalidateTag(documentTag);

    // Determine which paths to revalidate based on document type
    console.log(`Revalidating paths for document type: ${_type}`);
    switch (_type) {
      case "siteSettings":
        // Site settings affect all pages
        revalidatePath("/", "layout");
        break;
      case "conference":
        // Revalidate archive and specific conference page
        revalidatePath("/archive");
        if (body.year) {
          revalidatePath(`/archive/${body.year}`);
        }
        break;
      case "speaker":
        // Speakers appear on the home page and speakers page
        revalidatePath("/");
        revalidatePath("/speakers");
        break;
      case "sponsor":
      case "partner":
        // Sponsors and partners appear on home and sponsors page
        revalidatePath("/");
        revalidatePath("/sponsors");
        break;
      case "faq":
        // FAQs appear on the home page
        revalidatePath("/");
        break;
      case "submission":
        // Submission info appears on the submissions page
        revalidatePath("/submissions");
        break;
      case "schedule":
        // Schedule appears on the home page
        revalidatePath("/");
        break;
      case "registration":
        // Registration data might appear in various places
        revalidatePath("/");
        revalidatePath("/registration");
        break;
      default:
        // For any other document types, revalidate the home page
        revalidatePath("/");
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      documentType: _type,
      documentId: _id,
    });
  } catch (err) {
    console.error("Revalidation error:", err);
    return NextResponse.json(
      { message: "Error revalidating", error: String(err) },
      { status: 500 },
    );
  }
}
