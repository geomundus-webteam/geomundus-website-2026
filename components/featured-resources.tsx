import Link from "next/link";

interface FeaturedResourceProps {
  link: string;
  title?: string;
  description?: string;
  buttonText?: string;
}

export function FeaturedResource({
  link,
  title = "Conference Guide",
  description = "Planning to attend the GeoMundus Conference? Download our comprehensive infographic with all the essential information.",
  buttonText = "Download Infographic",
}: FeaturedResourceProps) {
  return (
    <div className="container p-8 mx-auto xl:px-0 py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
          {description}
        </p>
        <Link
          href={link}
          className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-emerald-700 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
