import { regionPhotos } from "./region-photos";
import "./region-photos.css";

export default function RegionPhoto({ slug }: { slug: string }) {
  const photo = regionPhotos[slug];
  if (!photo) return null;
  const imageUrl = `https://healthplusint.com.au/assets/regions/${slug}.webp`;
  const description = `${photo.alt}, NSW, Australia`;
  const imageMetadata = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "@id": `${imageUrl}#image`,
    contentUrl: imageUrl,
    name: `${photo.place}, NSW`,
    description,
    caption: `${photo.place}, NSW`,
    creator: { "@type": "Person", name: photo.author },
    creditText: `Photo: ${photo.author}. Cropped and resized.`,
    license: photo.licenseUrl,
    acquireLicensePage: photo.source,
    isBasedOn: photo.source,
    contentLocation: { "@type": "Place", name: `${photo.place}, NSW, Australia` },
    encodingFormat: "image/webp",
    width: 960,
    height: 480,
  };
  return <figure className="region-photo">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(imageMetadata).replace(/</g, "\\u003c") }} />
    <div className="region-photo-frame">
      <img src={`/assets/regions/${slug}.webp`} alt={description} width="960" height="480" loading="lazy" decoding="async" />
      <span className="region-photo-location">{photo.place}, NSW</span>
    </div>
    <figcaption>Photo: <a href={photo.source} target="_blank" rel="noopener noreferrer">{photo.author}</a> · <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer">{photo.license}</a> · Cropped &amp; resized</figcaption>
  </figure>;
}
