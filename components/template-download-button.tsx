"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon } from "lucide-react";
import posthog from "posthog-js";

interface TemplateDownloadButtonProps {
  href: string;
}

export function TemplateDownloadButton({ href }: TemplateDownloadButtonProps) {
  return (
    <Button asChild variant="outline" className="w-full">
      <Link
        href={href}
        className="flex items-center justify-center gap-2"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          posthog.capture("abstract_template_downloaded", {
            template_url: href,
          })
        }
      >
        Download <ExternalLinkIcon className="h-4 w-4" />
      </Link>
    </Button>
  );
}
