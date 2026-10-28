import { regionPhotos } from "./region-photos";
import "./region-photos.css";

export default function RegionPhoto({ slug }: { slug: string }) {
  const photo = regionPhotos[slug];
  if (!photo) return null;
  return <figure className="region-photo">
    <div className="region-photo-frame">
      <img src={`/assets/regions/${slug}.webp`} alt={photo.alt} width="960" height="480" loading="lazy" decoding="async" />
      <span className="region-photo-location">{photo.place}, NSW</span>
    </div>
    <figcaption>Photo: <a href={photo.source} target="_blank" rel="noopener noreferrer">{photo.author}</a> · <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer">{photo.license}</a> · Cropped &amp; resized</figcaption>
  </figure>;
}
