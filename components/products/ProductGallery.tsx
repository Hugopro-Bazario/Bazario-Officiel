import Image from "next/image";
import { Carousel } from "@/components/ui/carousel";

export function ProductGallery({ title, images }: { title: string; images: string[] }) {
  const safeImages = images.length ? images : ["https://placehold.co/960x960/f4f4f5/18181b?text=Bazario"];

  return (
    <section className="space-y-4">
      <div className="hidden grid-cols-2 gap-3 md:grid">
        {safeImages.slice(0, 4).map((image, index) => (
          <div key={`${image}-${index}`} className="relative aspect-square overflow-hidden rounded-xl bg-zinc-100">
            <Image
              src={image}
              alt={`${title} ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
      <Carousel className="md:hidden">
        {safeImages.map((image, index) => (
          <div key={`${image}-${index}`} className="relative aspect-square min-w-full snap-center overflow-hidden rounded-xl bg-zinc-100">
            <Image
              src={image}
              alt={`${title} ${index + 1}`}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ))}
      </Carousel>
    </section>
  );
}
