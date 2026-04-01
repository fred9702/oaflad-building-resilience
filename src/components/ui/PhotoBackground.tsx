import Image from "next/image";

interface PhotoBackgroundProps {
  src: string;
  alt: string;
  overlayColor?: string;
  overlayOpacity?: string;
  children: React.ReactNode;
}

export function PhotoBackground({
  src,
  alt,
  overlayColor = "bg-brown",
  overlayOpacity = "opacity-80",
  children,
}: PhotoBackgroundProps) {
  return (
    <div className="relative">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div
        className={`absolute inset-0 ${overlayColor} ${overlayOpacity}`}
        aria-hidden="true"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
