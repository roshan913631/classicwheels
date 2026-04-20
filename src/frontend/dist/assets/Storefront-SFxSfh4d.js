import { u as useNavigate, j as jsxRuntimeExports, L as Link, r as reactExports, a as LoadingSpinner } from "./index-HwI002Ox.js";
import { u as useCars } from "./useCars-CCzp4_0f.js";
function CarCard({ car, index }) {
  const price = Number(car.price).toLocaleString("en-US");
  const mileage = Number(car.mileage).toLocaleString("en-US");
  const year = Number(car.year);
  const imageUrl = car.imageUrls[0] ?? "/assets/generated/hero-showroom.dim_1200x600.jpg";
  const navigate = useNavigate();
  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate({ to: "/checkout", search: { carId: car.id } });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/cars/$id",
      params: { id: car.id },
      "data-ocid": `cars.item.${index + 1}`,
      className: "block group bg-card border-2 border-primary transition-smooth hover:shadow-[0_6px_0_0_oklch(var(--primary)/0.25)] focus-visible:outline-2 focus-visible:outline-primary",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] overflow-hidden border-b-2 border-primary bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: imageUrl,
            alt: `${year} ${car.make} ${car.model}`,
            className: "w-full h-full object-cover transition-smooth group-hover:scale-105",
            loading: "lazy"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-bold text-foreground text-lg leading-tight line-clamp-1", children: [
              year,
              " ",
              car.make,
              " ",
              car.model
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-primary text-lg whitespace-nowrap shrink-0", children: [
              "$",
              price
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs font-body mb-3 uppercase tracking-wide", children: [
            mileage,
            " miles"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground text-sm font-body line-clamp-2 leading-relaxed", children: car.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-3 border-t border-primary/30 flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xs uppercase tracking-widest text-primary font-bold group-hover:underline", children: "View Details →" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleBuyNow,
                "data-ocid": `cars.buy_now_button.${index + 1}`,
                className: "font-display font-bold text-xs uppercase tracking-widest px-4 py-2 bg-primary text-primary-foreground border-2 border-primary hover:bg-primary/90 transition-smooth shrink-0",
                children: "Buy Now"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
const SAMPLE_CARS = [
  {
    id: "1963-jaguar-etype",
    make: "Jaguar",
    model: "E-Type Coupe",
    year: BigInt(1963),
    price: BigInt(185e3),
    mileage: BigInt(43200),
    description: "Meticulously restored. Matching numbers. Stunning condition. Original 4.2L inline-six engine delivers effortless performance.",
    imageUrls: ["/assets/generated/hero-showroom.dim_1200x600.jpg"]
  },
  {
    id: "1957-ford-thunderbird",
    make: "Ford",
    model: "Thunderbird",
    year: BigInt(1957),
    price: BigInt(139e3),
    mileage: BigInt(38500),
    description: "Iconic two-seat personal luxury car. Original V8 engine, fully restored interior. Show-quality chrome and paint.",
    imageUrls: ["/assets/generated/hero-showroom.dim_1200x600.jpg"]
  },
  {
    id: "1969-dodge-charger",
    make: "Dodge",
    model: "Charger R/T",
    year: BigInt(1969),
    price: BigInt(225e3),
    mileage: BigInt(56800),
    description: "Numbers matching 440 Magnum. Original black on black. One of the most desirable muscle cars ever produced.",
    imageUrls: ["/assets/generated/hero-showroom.dim_1200x600.jpg"]
  },
  {
    id: "1955-mercedes-300sl",
    make: "Mercedes-Benz",
    model: "300SL Gullwing",
    year: BigInt(1955),
    price: BigInt(175e4),
    mileage: BigInt(28e3),
    description: "The legendary Gullwing. Fuel-injected inline-six. Original Silver over red leather. A true automotive icon.",
    imageUrls: ["/assets/generated/hero-showroom.dim_1200x600.jpg"]
  },
  {
    id: "1961-chevrolet-corvette",
    make: "Chevrolet",
    model: "Corvette",
    year: BigInt(1961),
    price: BigInt(95e3),
    mileage: BigInt(52300),
    description: "Classic two-tone beauty with the desirable fuelie 283 V8. Fully documented with build sheet intact.",
    imageUrls: ["/assets/generated/hero-showroom.dim_1200x600.jpg"]
  },
  {
    id: "1967-shelby-gt500",
    make: "Shelby",
    model: "GT500",
    year: BigInt(1967),
    price: BigInt(32e4),
    mileage: BigInt(31e3),
    description: "The ultimate pony car. 428 Cobra Jet producing 360hp. Marti Report certified. Museum quality condition.",
    imageUrls: ["/assets/generated/hero-showroom.dim_1200x600.jpg"]
  }
];
const SORT_OPTIONS = [
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "year-asc", label: "Year: Oldest First" },
  { value: "year-desc", label: "Year: Newest First" },
  { value: "mileage-asc", label: "Mileage: Lowest" },
  { value: "mileage-desc", label: "Mileage: Highest" }
];
function sortCars(cars, sort) {
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
const PROMISES = [
  {
    icon: "🔍",
    title: "Thoroughly Inspected",
    desc: "Every vehicle undergoes a 200-point mechanical and cosmetic inspection before listing."
  },
  {
    icon: "📋",
    title: "Fully Documented",
    desc: "Complete ownership history, service records, and provenance documentation provided."
  },
  {
    icon: "🤝",
    title: "White Glove Service",
    desc: "Nationwide shipping, concierge delivery, and post-sale support on every purchase."
  }
];
function Storefront() {
  const { data: cars, isLoading, error } = useCars();
  const [search, setSearch] = reactExports.useState("");
  const [sort, setSort] = reactExports.useState("year-desc");
  const sourceCars = cars && cars.length > 0 ? cars : SAMPLE_CARS;
  const filteredAndSorted = reactExports.useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = q ? sourceCars.filter(
      (c) => c.make.toLowerCase().includes(q) || c.model.toLowerCase().includes(q) || String(Number(c.year)).includes(q)
    ) : sourceCars;
    return sortCars(filtered, sort);
  }, [sourceCars, search, sort]);
  const isSearchActive = search.trim().length > 0;
  const totalCount = sourceCars.length;
  const resultCount = filteredAndSorted.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "storefront.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "relative bg-accent text-accent-foreground border-b-2 border-primary overflow-hidden",
        "data-ocid": "storefront.hero_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 min-h-[480px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center py-16 pr-0 lg:pr-12 z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xs uppercase tracking-[0.3em] text-accent-foreground/60 mb-4", children: "Est. 1962 · Detroit, Michigan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-4xl sm:text-5xl xl:text-6xl uppercase tracking-wide text-accent-foreground leading-none mb-6", children: [
              "Classic Beauty.",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Unforgettable Rides." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-accent-foreground/80 text-lg mb-10 max-w-md leading-relaxed", children: "Curated vintage automobiles for the discerning collector. Every car handpicked, authenticated, and ready to turn heads." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  var _a;
                  return (_a = document.getElementById("inventory")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
                },
                "data-ocid": "storefront.browse_button",
                className: "font-display font-bold uppercase tracking-widest text-sm px-8 py-3.5 border-2 border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent transition-smooth w-fit",
                children: "Browse Inventory"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative hidden lg:block border-l-2 border-primary/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: "/assets/generated/hero-showroom.dim_1200x600.jpg",
                alt: "Vintage car showroom",
                className: "absolute inset-0 w-full h-full object-cover"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-accent/20" })
          ] })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-primary text-primary-foreground border-b-2 border-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 divide-x divide-primary-foreground/30 text-center", children: [
      { value: "60+", label: "Years in Business" },
      { value: "500+", label: "Cars Sold" },
      { value: "100%", label: "Authenticated" }
    ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-2xl", children: stat.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-body text-xs text-primary-foreground/80 uppercase tracking-wide", children: stat.label })
    ] }, stat.label)) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        id: "inventory",
        className: "bg-background py-16",
        "data-ocid": "storefront.inventory_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 border-b-2 border-primary pb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl uppercase tracking-widest text-foreground", children: "Current Inventory" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-muted-foreground text-sm mt-1", children: isLoading ? "Loading inventory…" : isSearchActive ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground", children: resultCount }),
                " ",
                "of ",
                totalCount,
                " vehicles match your search"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground", children: totalCount }),
                " ",
                "vehicles available"
              ] }) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "car-search", className: "sr-only", children: "Search by make, model, or year" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "svg",
                  {
                    className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "car-search",
                    type: "search",
                    value: search,
                    onChange: (e) => setSearch(e.target.value),
                    placeholder: "Search by make, model, or year…",
                    "data-ocid": "storefront.search_input",
                    className: "w-full pl-10 pr-4 py-2.5 bg-card border-2 border-primary font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth"
                  }
                ),
                isSearchActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setSearch(""),
                    "aria-label": "Clear search",
                    className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "svg",
                      {
                        className: "w-4 h-4",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "aria-hidden": "true",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "path",
                          {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M6 18L18 6M6 6l12 12"
                          }
                        )
                      }
                    )
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative sm:w-60", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "car-sort", className: "sr-only", children: "Sort vehicles" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    id: "car-sort",
                    value: sort,
                    onChange: (e) => setSort(e.target.value),
                    "data-ocid": "storefront.sort_select",
                    className: "w-full appearance-none bg-card border-2 border-primary font-display font-bold uppercase tracking-wide text-xs text-foreground px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth cursor-pointer",
                    children: SORT_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: opt.value, children: opt.label }, opt.value))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "svg",
                  {
                    className: "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M19 9l-7 7-7-7"
                      }
                    )
                  }
                )
              ] })
            ] }),
            isSearchActive && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-xs text-muted-foreground uppercase tracking-wide", children: "Searching for:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-xs uppercase tracking-wide bg-primary text-primary-foreground px-3 py-1", children: [
                '"',
                search,
                '"'
              ] })
            ] })
          ] }),
          isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex items-center justify-center py-24",
              "data-ocid": "storefront.loading_state",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg" })
            }
          ),
          error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-destructive/10 border-2 border-destructive p-6 text-center",
              "data-ocid": "storefront.error_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-destructive uppercase tracking-wide", children: "Unable to load inventory" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-muted-foreground text-sm mt-1", children: "Please refresh the page or try again later." })
              ]
            }
          ),
          !isLoading && filteredAndSorted.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
              "data-ocid": "storefront.cars_list",
              children: filteredAndSorted.map((car, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(CarCard, { car, index: i }, car.id))
            }
          ),
          !isLoading && !error && isSearchActive && resultCount === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-24 border-2 border-dashed border-primary/40",
              "data-ocid": "storefront.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-2xl uppercase tracking-wide text-foreground mb-2", children: "No Matches Found" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-muted-foreground mb-6", children: [
                  'No vehicles matched "',
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-bold", children: search }),
                  '". Try a different make, model, or year.'
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setSearch(""),
                    "data-ocid": "storefront.clear_search_button",
                    className: "font-display font-bold uppercase tracking-widest text-xs px-6 py-2.5 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth",
                    children: "Clear Search"
                  }
                )
              ]
            }
          ),
          !isLoading && !error && !isSearchActive && sourceCars.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-24 border-2 border-dashed border-primary/30",
              "data-ocid": "storefront.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-2xl uppercase tracking-wide text-foreground mb-2", children: "No Cars Listed Yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-muted-foreground", children: "Check back soon — new inventory arrives regularly." })
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/40 border-t-2 border-primary py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl uppercase tracking-widest text-foreground mb-10 text-center", children: "The Vintage Garage Promise" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: PROMISES.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border-2 border-primary p-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-3", children: item.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold uppercase tracking-wide text-foreground mb-2", children: item.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-muted-foreground text-sm leading-relaxed", children: item.desc })
          ]
        },
        item.title
      )) })
    ] }) })
  ] });
}
export {
  Storefront as default
};
