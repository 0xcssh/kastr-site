// The single JSON-LD API of the site: <JsonLd data={...} />. Build the object in lib/schema.ts.
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so a string inside the data can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
