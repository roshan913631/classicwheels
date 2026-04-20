import { b as useParams, u as useNavigate, r as reactExports, j as jsxRuntimeExports, a as LoadingSpinner, L as Link, c as ue } from "./index-HwI002Ox.js";
import { a as useCar, b as useSubmitInquiry } from "./useCars-CCzp4_0f.js";
const EMPTY_FORM = {
  buyerName: "",
  buyerEmail: "",
  buyerPhone: "",
  message: ""
};
function validateForm(form) {
  const errors = {};
  if (!form.buyerName.trim()) errors.buyerName = "Full name is required.";
  if (!form.buyerEmail.trim()) {
    errors.buyerEmail = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.buyerEmail)) {
    errors.buyerEmail = "Please enter a valid email address.";
  }
  if (!form.buyerPhone.trim()) {
    errors.buyerPhone = "Phone number is required.";
  } else if (!/^[\d\s\-+().]{7,}$/.test(form.buyerPhone)) {
    errors.buyerPhone = "Please enter a valid phone number.";
  }
  if (!form.message.trim()) errors.message = "Message is required.";
  return errors;
}
const SPEC_LABEL = "block font-display text-xs uppercase tracking-[0.12em] text-muted-foreground mb-1";
const SPEC_VALUE = "font-display font-bold text-base text-foreground";
const FIELD_LABEL = "block font-display text-xs uppercase tracking-widest text-foreground mb-1.5";
const FIELD_INPUT = "w-full bg-background border-2 border-input focus:border-primary outline-none px-3 py-2.5 font-body text-sm text-foreground transition-smooth placeholder:text-muted-foreground/60";
const FIELD_ERROR = "mt-1 font-body text-xs text-destructive";
function SpecItem({ label, value, highlight = false }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `p-4 border-2 ${highlight ? "border-primary bg-primary/5" : "border-primary/40 bg-card"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: SPEC_LABEL, children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `${SPEC_VALUE} ${highlight ? "text-primary text-xl" : ""}`,
            children: value
          }
        )
      ]
    }
  );
}
function CarDetail() {
  const { id } = useParams({ from: "/cars/$id" });
  const { data: car, isLoading, error } = useCar(id);
  const submitInquiry = useSubmitInquiry();
  const navigate = useNavigate();
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const [errors, setErrors] = reactExports.useState({});
  const [touched, setTouched] = reactExports.useState({});
  const [submitted, setSubmitted] = reactExports.useState(false);
  const [activeImage, setActiveImage] = reactExports.useState(0);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center min-h-[60vh] gap-4",
        "data-ocid": "car_detail.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xs uppercase tracking-widest text-muted-foreground animate-pulse", children: "Loading vehicle details…" })
        ]
      }
    );
  }
  if (error || !car) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "max-w-2xl mx-auto px-6 py-24 text-center",
        "data-ocid": "car_detail.error_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-2 border-primary bg-card p-12 mx-auto max-w-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-6xl text-primary mb-4 leading-none", children: "404" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-0.5 bg-primary mx-auto mb-6" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl uppercase tracking-[0.15em] text-foreground mb-3", children: "Vehicle Not Found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-muted-foreground text-sm leading-relaxed mb-8", children: "This vehicle may have already found a new home, or the listing is no longer available." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/",
              "data-ocid": "car_detail.back_link",
              className: "inline-block font-display font-bold uppercase tracking-widest text-sm px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth",
              children: "← Return to Inventory"
            }
          )
        ] })
      }
    );
  }
  const images = car.imageUrls.length > 0 ? car.imageUrls : ["/assets/generated/hero-showroom.dim_1200x600.jpg"];
  const price = Number(car.price).toLocaleString("en-US");
  const mileage = Number(car.mileage).toLocaleString("en-US");
  const year = Number(car.year);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateForm({ ...form, [name]: value })[name]
      }));
    }
  };
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateForm(form)[name]
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = {
      buyerName: true,
      buyerEmail: true,
      buyerPhone: true,
      message: true
    };
    setTouched(allTouched);
    const validationErrors = validateForm(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    try {
      await submitInquiry.mutateAsync({ carId: car.id, ...form });
      setSubmitted(true);
      setForm(EMPTY_FORM);
      setErrors({});
      setTouched({});
      ue.success("Inquiry sent! We'll contact you within 1 business day.");
    } catch {
      ue.error("Failed to send inquiry. Please try again.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", "data-ocid": "car_detail.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b-2 border-primary/30 bg-card px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/",
          "data-ocid": "car_detail.back_button",
          className: "inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-widest text-primary hover:text-primary/80 transition-smooth",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base leading-none", children: "←" }),
            "Back to Inventory"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border/40", children: "|" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "nav",
        {
          "aria-label": "Breadcrumb",
          className: "flex items-center gap-2 font-body text-xs text-muted-foreground",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-primary transition-smooth", children: "Inventory" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground truncate max-w-[200px]", children: [
              year,
              " ",
              car.make,
              " ",
              car.model
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary px-6 py-5 mb-8 border-2 border-primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-3xl sm:text-4xl text-primary-foreground uppercase tracking-wide leading-tight", children: [
          year,
          " ",
          car.make,
          " ",
          car.model
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-2xl text-primary-foreground/90", children: [
            "$",
            price
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-body text-primary-foreground/60 text-sm border-l border-primary-foreground/30 pl-4", children: [
            mileage,
            " miles on the clock"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-7 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "car_detail.images_panel", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[16/10] border-2 border-primary overflow-hidden bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: images[activeImage],
                alt: `${year} ${car.make} ${car.model}`,
                className: "w-full h-full object-cover transition-smooth"
              }
            ) }),
            images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2 mt-2", children: images.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setActiveImage(i),
                "data-ocid": `car_detail.thumbnail.${i + 1}`,
                className: `aspect-[4/3] border-2 overflow-hidden transition-smooth cursor-pointer ${i === activeImage ? "border-primary" : "border-primary/30 hover:border-primary/70"}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: img,
                    alt: "",
                    className: "w-full h-full object-cover"
                  }
                )
              },
              img
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "car_detail.specs_section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1 h-6 bg-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-sm uppercase tracking-[0.15em] text-foreground", children: "Vehicle Specifications" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SpecItem, { label: "Year", value: String(year) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SpecItem, { label: "Make", value: car.make }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SpecItem, { label: "Model", value: car.model }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SpecItem, { label: "Mileage", value: `${mileage} mi` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SpecItem, { label: "Price", value: `$${price}`, highlight: true }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SpecItem, { label: "Condition", value: "Vintage / Classic" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border-2 border-primary/40 p-6",
              "data-ocid": "car_detail.description_section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1 h-6 bg-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-sm uppercase tracking-[0.15em] text-foreground", children: "About This Vehicle" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-foreground leading-relaxed text-sm", children: car.description })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border-2 border-primary sticky top-6",
            "data-ocid": "car_detail.inquiry_panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/10 border-b-2 border-primary/40 px-5 py-5 flex flex-col gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-2xl text-primary", children: [
                    "$",
                    price
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-body text-xs text-muted-foreground uppercase tracking-widest", children: [
                    mileage,
                    " mi"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => navigate({ to: "/checkout", search: { carId: car.id } }),
                    "data-ocid": "car_detail.buy_now_button",
                    className: "w-full bg-primary text-primary-foreground font-display font-bold uppercase tracking-widest py-3.5 border-2 border-primary hover:bg-primary/90 transition-smooth text-sm",
                    children: [
                      "Buy Now — $",
                      price
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary px-5 py-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-base uppercase tracking-widest text-primary-foreground", children: "Inquire About This Vehicle" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-primary-foreground/70 mt-0.5", children: "All fields required. We respond within 1 business day." })
              ] }),
              submitted ? (
                /* ── Success state ── */
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "p-8 text-center",
                    "data-ocid": "car_detail.inquiry_success_state",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 border-2 border-primary bg-primary/10 flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "✓" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold uppercase tracking-widest text-foreground text-sm mb-2", children: "Inquiry Received!" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-muted-foreground text-sm leading-relaxed mb-6", children: [
                        "Thank you for your interest in the ",
                        year,
                        " ",
                        car.make,
                        " ",
                        car.model,
                        ". Our team will reach out to you shortly."
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setSubmitted(false),
                          "data-ocid": "car_detail.send_another_button",
                          className: "font-display font-bold text-xs uppercase tracking-widest px-6 py-2.5 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth",
                          children: "Send Another Inquiry"
                        }
                      )
                    ]
                  }
                )
              ) : (
                /* ── Form ── */
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "form",
                  {
                    onSubmit: handleSubmit,
                    noValidate: true,
                    className: "p-5 space-y-4",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "buyerName", className: FIELD_LABEL, children: "Full Name *" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            id: "buyerName",
                            name: "buyerName",
                            type: "text",
                            value: form.buyerName,
                            onChange: handleChange,
                            onBlur: handleBlur,
                            "data-ocid": "car_detail.name_input",
                            className: `${FIELD_INPUT} ${errors.buyerName ? "border-destructive" : ""}`,
                            placeholder: "e.g. James Mitchell",
                            autoComplete: "name"
                          }
                        ),
                        errors.buyerName && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: FIELD_ERROR,
                            "data-ocid": "car_detail.name_input.field_error",
                            children: errors.buyerName
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "buyerEmail", className: FIELD_LABEL, children: "Email Address *" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            id: "buyerEmail",
                            name: "buyerEmail",
                            type: "email",
                            value: form.buyerEmail,
                            onChange: handleChange,
                            onBlur: handleBlur,
                            "data-ocid": "car_detail.email_input",
                            className: `${FIELD_INPUT} ${errors.buyerEmail ? "border-destructive" : ""}`,
                            placeholder: "you@example.com",
                            autoComplete: "email"
                          }
                        ),
                        errors.buyerEmail && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: FIELD_ERROR,
                            "data-ocid": "car_detail.email_input.field_error",
                            children: errors.buyerEmail
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "buyerPhone", className: FIELD_LABEL, children: "Phone Number *" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            id: "buyerPhone",
                            name: "buyerPhone",
                            type: "tel",
                            value: form.buyerPhone,
                            onChange: handleChange,
                            onBlur: handleBlur,
                            "data-ocid": "car_detail.phone_input",
                            className: `${FIELD_INPUT} ${errors.buyerPhone ? "border-destructive" : ""}`,
                            placeholder: "(555) 867-5309",
                            autoComplete: "tel"
                          }
                        ),
                        errors.buyerPhone && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: FIELD_ERROR,
                            "data-ocid": "car_detail.phone_input.field_error",
                            children: errors.buyerPhone
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "message", className: FIELD_LABEL, children: "Message *" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "textarea",
                          {
                            id: "message",
                            name: "message",
                            rows: 4,
                            value: form.message,
                            onChange: handleChange,
                            onBlur: handleBlur,
                            "data-ocid": "car_detail.message_textarea",
                            className: `${FIELD_INPUT} resize-none ${errors.message ? "border-destructive" : ""}`,
                            placeholder: `I'm interested in the ${year} ${car.make} ${car.model}. Could you please send me more details about its condition and history?`
                          }
                        ),
                        errors.message && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: FIELD_ERROR,
                            "data-ocid": "car_detail.message_textarea.field_error",
                            children: errors.message
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "submit",
                          disabled: submitInquiry.isPending,
                          "data-ocid": "car_detail.inquiry_submit_button",
                          className: "w-full bg-primary text-primary-foreground font-display font-bold uppercase tracking-widest py-3.5 border-2 border-primary hover:bg-primary/90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed text-sm",
                          children: submitInquiry.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 justify-center", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "block w-3.5 h-3.5 border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin",
                                "aria-hidden": "true"
                              }
                            ),
                            "Sending…"
                          ] }) : "Send Inquiry"
                        }
                      ),
                      submitInquiry.isError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-center font-body text-xs text-destructive",
                          "data-ocid": "car_detail.inquiry_error_state",
                          children: "Something went wrong. Please try again."
                        }
                      )
                    ]
                  }
                )
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 bg-primary/20 border-t border-primary/30" })
            ]
          }
        ) })
      ] })
    ] })
  ] });
}
export {
  CarDetail as default
};
