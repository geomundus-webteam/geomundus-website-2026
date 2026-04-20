import Link from "next/link";
import { Button } from "./ui/button";

export function SubmissionButton({
  submissionOpen,
  link,
}: {
  submissionOpen?: boolean;
  link?: string;
}) {
  return submissionOpen ? (
    <Button
      asChild
      size="lg"
      className="w-full bg-emerald-700 hover:bg-emerald-800"
      disabled={submissionOpen}
    >
      <Link href={link || "#"} target="_blank">
        Submit Your Paper
      </Link>
    </Button>
  ) : (
    <Button
      asChild
      size="lg"
      variant="outline"
      className="w-full bg-emerald-700 hover:bg-emerald-800 disabled cursor-not-allowed"
    >
      <Link href="#">Submission Closed Now</Link>
    </Button>
  );
}
