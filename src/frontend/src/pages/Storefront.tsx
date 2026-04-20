import { useMemo, useState } from "react";
import CarCard from "../components/CarCard";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useCars } from "../hooks/useCars";
import type { Car } from "../types";

// ─── Sample data ──────────────────────────────────────────────────────────────

const SAMPLE_CARS: Car[] = [
  {
    id: "1963-jaguar-etype",
    make: "Jaguar",
    model: "E-Type Coupe",
    year: BigInt(1963),
    price: BigInt(185000),
    mileage: BigInt(43200),
    description:
      "Meticulously restored. Matching numbers. Stunning condition. Original 4.2L inline-six engine delivers effortless performance.",
    imageUrls: ["/assets/generated/hero-showroom.dim_1200x600.jpg"],
  },
  {
    id: "1957-ford-thunderbird",
    make: "Ford",
    model: "Thunderbird",
    year: BigInt(1957),
    price: BigInt(139000),
    mileage: BigInt(38500),
    description:
      "Iconic two-seat personal luxury car. Original V8 engine, fully restored interior. Show-quality chrome and paint.",
    imageUrls: ["/assets/generated/hero-showroom.dim_1200x600.jpg"],
  },
  {
    id: "1969-dodge-charger",
    make: "Dodge",
    model: "Charger R/T",
    year: BigInt(1969),
    price: BigInt(225000),
    mileage: BigInt(56800),
    description:
      "Numbers matching 440 Magnum. Original black on black. One of the most desirable muscle cars ever produced.",
    imageUrls: ["/assets/generated/hero-showroom.dim_1200x600.jpg"],
  },
  {
    id: "1955-mercedes-300sl",
    make: "Mercedes-Benz",
    model: "300SL Gullwing",
    year: BigInt(1955),
    price: BigInt(1750000),
    mileage: BigInt(28000),
    description:
      "The legendary Gullwing. Fuel-injected inline-six. Original Silver over red leather. A true automotive icon.",
    imageUrls: ["/assets/generated/hero-showroom.dim_1200x600.jpg"],
  },
  {
    id: "1961-chevrolet-corvette",
    make: "Chevrolet",
    model: "Corvette",
    year: BigInt(1961),
    price: BigInt(95000),
    mileage: BigInt(52300),
    description:
      "Classic two-tone beauty with the desirable fuelie 283 V8. Fully documented with build sheet intact.",
    imageUrls: ["/assets/generated/hero-showroom.dim_1200x600.jpg"],
  },
  {
    id: "1967-shelby-gt500",
    make: "Shelby",
    model: "GT500",
    year: BigInt(1967),
    price: BigInt(320000),
    mileage: BigInt(31000),
    description:
      "The ultimate pony car. 428 Cobra Jet producing 360hp. Marti Report certified. Museum quality condition.",
    imageUrls: ["/assets/generated/hero-showroom.dim_1200x600.jpg"],
  },
];

// ─── Sort options ─────────────────────────────────────────────────────────────

type SortKey =
  | "price-asc"
  | "price-desc"
  | "year-asc"
  | "year-desc"
  | "mileage-asc"
  | "mileage-desc";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "year-asc", label: "Year: Oldest First" },
  { value: "year-desc", label: "Year: Newest First" },
  { value: "mileage-asc", label: "Mileage: Lowest" },
  { value: "mileage-desc", label: "Mileage: Highest" },
];

function sortCars(cars: Car[], sort: SortKey): Car[] {
  return [...cars].sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return Number(a.price) - Number(b.price);
      case "price-desc":
        return Number(b.price) - Number(a.price);
      case "year-asc":
        return Number(a.year) - Number(b.year);
      case "year-desc":
        return Number(b.year) - Number(a.year);
      case "mileage-asc":
        return Number(a.mileage) - Number(b.mileage);
      case "mileage-desc":
        return Number(b.mileage) - Number(a.mileage);
    }
  });
}

// ─── Promise benefits ─────────────────────────────────────────────────────────

const PROMISES = [
  {
    icon: "🔍",
    title: "Thoroughly Inspected",
    desc: "Every vehicle undergoes a 200-point mechanical and cosmetic inspection before listing.",
  },
  {
    icon: "📋",
    title: "Fully Documented",
    desc: "Complete ownership history, service records, and provenance documentation provided.",
  },
  {
    icon: "🤝",
    title: "White Glove Service",
    desc: "Nationwide shipping, concierge delivery, and post-sale support on every purchase.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Storefront() {
  const { data: cars, isLoading, error } = useCars();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("year-desc");

  const sourceCars = cars && cars.length > 0 ? cars : SAMPLE_CARS;

  const filteredAndSorted = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = q
      ? sourceCars.filter(
          (c) =>
            c.make.toLowerCase().includes(q) ||
            c.model.toLowerCase().includes(q) ||
            String(Number(c.year)).includes(q),
        )
      : sourceCars;
    return sortCars(filtered, sort);
  }, [sourceCars, search, sort]);

  const isSearchActive = search.trim().length > 0;
  const totalCount = sourceCars.length;
  const resultCount = filteredAndSorted.length;

  return (
    <div data-ocid="storefront.page">
      {/* ── Hero ── */}
      <section
        className="relative bg-accent text-accent-foreground border-b-2 border-primary overflow-hidden"
        data-ocid="storefront.hero_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">
            {/* Hero text */}
            <div className="flex flex-col justify-center py-16 pr-0 lg:pr-12 z-10">
              <p className="font-display text-xs uppercase tracking-[0.3em] text-accent-foreground/60 mb-4">
                Est. 1962 · Detroit, Michigan
              </p>
              <h1 className="font-display font-bold text-4xl sm:text-5xl xl:text-6xl uppercase tracking-wide text-accent-foreground leading-none mb-6">
                Classic Beauty.
                <br />
                <span className="text-primary">Unforgettable Rides.</span>
              </h1>
              <p className="font-body text-accent-foreground/80 text-lg mb-10 max-w-md leading-relaxed">
                Curated vintage automobiles for the discerning collector. Every
                car handpicked, authenticated, and ready to turn heads.
              </p>
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("inventory")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-ocid="storefront.browse_button"
                className="font-display font-bold uppercase tracking-widest text-sm px-8 py-3.5 border-2 border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent transition-smooth w-fit"
              >
                Browse Inventory
              </button>
            </div>

            {/* Hero image */}
            <div className="relative hidden lg:block border-l-2 border-primary/30">
              <img
                src="/assets/generated/hero-showroom.dim_1200x600.jpg"
                alt="Vintage car showroom"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-accent/20" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats banner ── */}
      <section className="bg-primary text-primary-foreground border-b-2 border-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-3 divide-x divide-primary-foreground/30 text-center">
            {[
              { value: "60+", label: "Years in Business" },
              { value: "500+", label: "Cars Sold" },
              { value: "100%", label: "Authenticated" },
            ].map((stat) => (
              <div key={stat.label} className="px-4 py-2">
                <div className="font-display font-bold text-2xl">
                  {stat.value}
                </div>
                <div className="font-body text-xs text-primary-foreground/80 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Inventory ── */}
      <section
        id="inventory"
        className="bg-background py-16"
        data-ocid="storefront.inventory_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="mb-8 border-b-2 border-primary pb-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 mb-6">
              <div>
                <h2 className="font-display font-bold text-3xl uppercase tracking-widest text-foreground">
                  Current Inventory
                </h2>
                <p className="font-body text-muted-foreground text-sm mt-1">
                  {isLoading ? (
                    "Loading inventory…"
                  ) : isSearchActive ? (
                    <>
                      <span className="font-bold text-foreground">
                        {resultCount}
                      </span>{" "}
                      of {totalCount} vehicles match your search
                    </>
                  ) : (
                    <>
                      <span className="font-bold text-foreground">
                        {totalCount}
                      </span>{" "}
                      vehicles available
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Search + Sort controls */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative flex-1">
                <label htmlFor="car-search" className="sr-only">
                  Search by make, model, or year
                </label>
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  id="car-search"
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by make, model, or year…"
                  data-ocid="storefront.search_input"
                  className="w-full pl-10 pr-4 py-2.5 bg-card border-2 border-primary font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth"
                />
                {isSearchActive && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {/* Sort */}
              <div className="relative sm:w-60">
                <label htmlFor="car-sort" className="sr-only">
                  Sort vehicles
                </label>
                <select
                  id="car-sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  data-ocid="storefront.sort_select"
                  className="w-full appearance-none bg-card border-2 border-primary font-display font-bold uppercase tracking-wide text-xs text-foreground px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth cursor-pointer"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Active search tag */}
            {isSearchActive && (
              <div className="mt-3 flex items-center gap-2">
                <span className="font-body text-xs text-muted-foreground uppercase tracking-wide">
                  Searching for:
                </span>
                <span className="font-display font-bold text-xs uppercase tracking-wide bg-primary text-primary-foreground px-3 py-1">
                  "{search}"
                </span>
              </div>
            )}
          </div>

          {/* Loading */}
          {isLoading && (
            <div
              className="flex items-center justify-center py-24"
              data-ocid="storefront.loading_state"
            >
              <LoadingSpinner size="lg" />
            </div>
          )}

          {/* Error */}
          {error && (
            <div
              className="bg-destructive/10 border-2 border-destructive p-6 text-center"
              data-ocid="storefront.error_state"
            >
              <p className="font-display font-bold text-destructive uppercase tracking-wide">
                Unable to load inventory
              </p>
              <p className="font-body text-muted-foreground text-sm mt-1">
                Please refresh the page or try again later.
              </p>
            </div>
          )}

          {/* Car grid */}
          {!isLoading && filteredAndSorted.length > 0 && (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              data-ocid="storefront.cars_list"
            >
              {filteredAndSorted.map((car, i) => (
                <CarCard key={car.id} car={car} index={i} />
              ))}
            </div>
          )}

          {/* Empty state — no search match */}
          {!isLoading && !error && isSearchActive && resultCount === 0 && (
            <div
              className="text-center py-24 border-2 border-dashed border-primary/40"
              data-ocid="storefront.empty_state"
            >
              <p className="font-display font-bold text-2xl uppercase tracking-wide text-foreground mb-2">
                No Matches Found
              </p>
              <p className="font-body text-muted-foreground mb-6">
                No vehicles matched "
                <span className="text-foreground font-bold">{search}</span>".
                Try a different make, model, or year.
              </p>
              <button
                type="button"
                onClick={() => setSearch("")}
                data-ocid="storefront.clear_search_button"
                className="font-display font-bold uppercase tracking-widest text-xs px-6 py-2.5 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Empty state — no cars at all */}
          {!isLoading &&
            !error &&
            !isSearchActive &&
            sourceCars.length === 0 && (
              <div
                className="text-center py-24 border-2 border-dashed border-primary/30"
                data-ocid="storefront.empty_state"
              >
                <p className="font-display font-bold text-2xl uppercase tracking-wide text-foreground mb-2">
                  No Cars Listed Yet
                </p>
                <p className="font-body text-muted-foreground">
                  Check back soon — new inventory arrives regularly.
                </p>
              </div>
            )}
        </div>
      </section>

      {/* ── Promise section ── */}
      <section className="bg-muted/40 border-t-2 border-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-2xl uppercase tracking-widest text-foreground mb-10 text-center">
            The Vintage Garage Promise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROMISES.map((item) => (
              <div
                key={item.title}
                className="bg-card border-2 border-primary p-6"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-display font-bold uppercase tracking-wide text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
