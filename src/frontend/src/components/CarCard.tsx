import { Link, useNavigate } from "@tanstack/react-router";
import type { Car } from "../backend.d";

interface CarCardProps {
  car: Car;
  index: number;
}

export default function CarCard({ car, index }: CarCardProps) {
  const price = Number(car.price).toLocaleString("en-US");
  const mileage = Number(car.mileage).toLocaleString("en-US");
  const year = Number(car.year);
  const imageUrl =
    car.imageUrls[0] ?? "/assets/generated/hero-showroom.dim_1200x600.jpg";
  const navigate = useNavigate();

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate({ to: "/checkout", search: { carId: car.id } });
  };

  return (
    <Link
      to="/cars/$id"
      params={{ id: car.id }}
      data-ocid={`cars.item.${index + 1}`}
      className="block group bg-card border-2 border-primary transition-smooth hover:shadow-[0_6px_0_0_oklch(var(--primary)/0.25)] focus-visible:outline-2 focus-visible:outline-primary"
    >
      <div className="aspect-[4/3] overflow-hidden border-b-2 border-primary bg-muted">
        <img
          src={imageUrl}
          alt={`${year} ${car.make} ${car.model}`}
          className="w-full h-full object-cover transition-smooth group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-display font-bold text-foreground text-lg leading-tight line-clamp-1">
            {year} {car.make} {car.model}
          </h3>
          <span className="font-display font-bold text-primary text-lg whitespace-nowrap shrink-0">
            ${price}
          </span>
        </div>
        <p className="text-muted-foreground text-xs font-body mb-3 uppercase tracking-wide">
          {mileage} miles
        </p>
        <p className="text-foreground text-sm font-body line-clamp-2 leading-relaxed">
          {car.description}
        </p>
        <div className="mt-4 pt-3 border-t border-primary/30 flex items-center justify-between gap-2">
          <span className="font-display text-xs uppercase tracking-widest text-primary font-bold group-hover:underline">
            View Details →
          </span>
          <button
            type="button"
            onClick={handleBuyNow}
            data-ocid={`cars.buy_now_button.${index + 1}`}
            className="font-display font-bold text-xs uppercase tracking-widest px-4 py-2 bg-primary text-primary-foreground border-2 border-primary hover:bg-primary/90 transition-smooth shrink-0"
          >
            Buy Now
          </button>
        </div>
      </div>
    </Link>
  );
}
