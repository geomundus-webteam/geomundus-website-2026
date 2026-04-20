import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import ReactPlayerWrapper from "./youtube-player";

interface YouTubeSectionProps {
  videoId: string;
  title?: string;
  description?: string;
  channelUrl?: string;
}

export default function YouTubeSection({
  videoId,
  //   title = "GeoMundus Conference",
  //   description = "Watch our latest conference video to learn more about GeoMundus and the exciting topics we cover in geospatial technologies.",
  channelUrl = "https://www.youtube.com/@geomundusteam4169",
}: YouTubeSectionProps) {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Watch GeoMundus in Action
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Get a glimpse of our conference atmosphere, presentations, and
              community.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
            <ReactPlayerWrapper
              url={`https://www.youtube.com/watch?v=${videoId}`}
              //   title={title}
              //   description={description}
              light={true}
              controls={true}
            />

            <div className="p-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Subscribe to our channel for more videos from past and upcoming
                conferences.
              </p>

              <Button
                asChild
                variant="outline"
                className="flex items-center gap-2"
              >
                <a
                  href={channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <span>Visit Our Channel</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
