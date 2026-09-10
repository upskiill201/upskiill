interface JsonLdProps {
  /** One or more JSON-LD schema objects */
  data: Record<string, unknown> | Record<string, unknown>[];
}

// Renders structured data for search engines and AI answer engines.
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
