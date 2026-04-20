import { PortableText } from "@portabletext/react";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";

// Custom components for the Portable Text renderer
const components = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="relative w-full h-auto my-6">
          <Image
            src={urlForImage(value).url() || "/placeholder.svg"}
            alt={value.alt || "Image"}
            width={800}
            height={600}
            className="rounded-lg object-cover"
          />
          {value.caption && (
            <div className="text-sm text-gray-500 mt-2 italic">
              {value.caption}
            </div>
          )}
        </div>
      );
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      const target = !value.href.startsWith("/") ? "_blank" : undefined;
      return (
        <Link
          href={value.href}
          rel={rel}
          target={target}
          className="text-emerald-700 underline hover:text-emerald-900 transition-colors"
        >
          {children}
        </Link>
      );
    },
    strong: ({ children }: any) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="bg-gray-100 rounded px-1 py-0.5 font-mono text-sm">
        {children}
      </code>
    ),
    underline: ({ children }: any) => (
      <span className="underline">{children}</span>
    ),
    "strike-through": ({ children }: any) => (
      <span className="line-through">{children}</span>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold mt-6 mb-3">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-bold mt-6 mb-2">{children}</h4>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-emerald-700 pl-4 italic my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
};

interface PortableTextRendererProps {
  content: any;
}

export default function PortableTextRenderer({
  content,
}: PortableTextRendererProps) {
  if (!content) {
    return null;
  }

  return (
    <div className="portable-text">
      <PortableText value={content} components={components} />
    </div>
  );
}
