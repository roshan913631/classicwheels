import { d as useInternetIdentity, e as useQueryClient, f as useInquiries, g as useIsAdmin, h as useUpdateInquiryStatus, i as useDeleteInquiry, r as reactExports, j as jsxRuntimeExports, a as LoadingSpinner, c as ue, k as useActor, l as useMutation, m as createActor } from "./index-HwI002Ox.js";
import { u as useCars } from "./useCars-CCzp4_0f.js";
import { u as useGetOrders, a as useUpdateOrderStatus, b as useDeleteOrder } from "./useOrders-Cxng5tbg.js";
const INQUIRY_STATUS_OPTIONS = [
  "new",
  "contacted",
  "resolved"
];
const ORDER_STATUS_OPTIONS = [
  "pending",
  "confirmed",
  "shipped",
  "delivered"
];
function formatDate(ts) {
  const ms = Number(ts);
  const d = new Date(ms > 1e13 ? ms / 1e6 : ms);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function inquiryStatusLabel(s) {
  if (s === "contacted") return "Contacted";
  if (s === "resolved") return "Resolved";
  return "New";
}
function orderStatusLabel(s) {
  const map = {
    pending: "Pending",
    confirmed: "Confirmed",
    shipped: "Shipped",
    delivered: "Delivered"
  };
  return map[s.toLowerCase()] ?? s;
}
function formatPrice(n) {
  return `$${Number(n).toLocaleString()}`;
}
function StatusBadge({
  status,
  type
}) {
  const s = status.toLowerCase();
  let cls = "";
  if (type === "inquiry") {
    if (s === "new") cls = "bg-primary text-primary-foreground border-primary";
    else if (s === "contacted")
      cls = "bg-[oklch(0.75_0.12_75)] text-[oklch(0.2_0.05_40)] border-[oklch(0.65_0.12_75)]";
    else if (s === "resolved")
      cls = "bg-[oklch(0.52_0.1_145)] text-[oklch(0.97_0.01_85)] border-[oklch(0.45_0.1_145)]";
    else cls = "bg-muted text-muted-foreground border-border";
  } else {
    if (s === "pending")
      cls = "bg-primary text-primary-foreground border-primary";
    else if (s === "confirmed")
      cls = "bg-[oklch(0.55_0.14_220)] text-[oklch(0.97_0.01_85)] border-[oklch(0.48_0.14_220)]";
    else if (s === "shipped")
      cls = "bg-[oklch(0.6_0.12_75)] text-[oklch(0.2_0.05_40)] border-[oklch(0.55_0.12_75)]";
    else if (s === "delivered")
      cls = "bg-[oklch(0.52_0.1_145)] text-[oklch(0.97_0.01_85)] border-[oklch(0.45_0.1_145)]";
    else cls = "bg-muted text-muted-foreground border-border";
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-block border-2 font-display font-bold uppercase tracking-widest text-xs px-2.5 py-0.5 ${cls}`,
      children: type === "inquiry" ? inquiryStatusLabel(s) : orderStatusLabel(s)
    }
  );
}
function DeleteConfirm({
  onConfirm,
  onCancel,
  isDeleting,
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 backdrop-blur-sm",
      "data-ocid": "admin.delete_dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-2 border-primary p-8 max-w-sm w-full mx-4 shadow-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl uppercase tracking-widest text-foreground mb-3", children: "Confirm Delete" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-sm text-muted-foreground mb-6 leading-relaxed", children: [
          "This ",
          label,
          " will be permanently removed. This action cannot be undone."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onConfirm,
              disabled: isDeleting,
              "data-ocid": "admin.delete_dialog.confirm_button",
              className: "flex-1 font-display font-bold uppercase tracking-widest text-xs py-2.5 px-4 border-2 border-destructive bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-smooth disabled:opacity-50",
              children: isDeleting ? "Deleting..." : "Yes, Delete"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onCancel,
              disabled: isDeleting,
              "data-ocid": "admin.delete_dialog.cancel_button",
              className: "flex-1 font-display font-bold uppercase tracking-widest text-xs py-2.5 px-4 border-2 border-border text-foreground hover:border-primary hover:text-primary transition-smooth disabled:opacity-50",
              children: "Cancel"
            }
          )
        ] })
      ] })
    }
  );
}
function InquiryRow({
  inquiry,
  carName,
  index,
  onStatusChange,
  onDeleteRequest,
  isUpdating
}) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const rowNum = index + 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "tr",
      {
        className: "border-b border-primary/20 hover:bg-primary/5 transition-smooth cursor-pointer select-none",
        onClick: () => setExpanded((v) => !v),
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") setExpanded((v) => !v);
        },
        tabIndex: 0,
        "aria-expanded": expanded,
        "data-ocid": `admin.inquiry_row.${rowNum}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-body text-sm text-foreground min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-1", children: carName }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-body text-sm text-foreground min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-1", children: inquiry.buyerName }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-body text-xs text-muted-foreground hidden md:table-cell min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-1", children: inquiry.buyerEmail }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: inquiry.status, type: "inquiry" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-body text-xs text-muted-foreground hidden lg:table-cell whitespace-nowrap", children: formatDate(inquiry.createdAt) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-xs text-muted-foreground", "aria-hidden": true, children: expanded ? "▲" : "▼" }) })
        ]
      }
    ),
    expanded && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "tr",
      {
        className: "bg-background border-b-2 border-primary/30",
        "data-ocid": `admin.inquiry_detail.${rowNum}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { colSpan: 6, className: "px-6 py-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xs uppercase tracking-widest text-muted-foreground mb-2 border-b border-primary/20 pb-1", children: "Buyer Info" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm font-semibold text-foreground", children: inquiry.buyerName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground", children: inquiry.buyerEmail }),
              inquiry.buyerPhone && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground", children: inquiry.buyerPhone })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xs uppercase tracking-widest text-muted-foreground mb-2 border-b border-primary/20 pb-1", children: "Vehicle" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-foreground", children: carName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-xs text-muted-foreground mt-0.5", children: [
                "Ref:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
                  inquiry.carId.slice(0, 8),
                  "…"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xs uppercase tracking-widest text-muted-foreground mb-2 border-b border-primary/20 pb-1", children: "Message" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-foreground leading-relaxed whitespace-pre-wrap line-clamp-5", children: inquiry.message || "No message provided." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-4 border-t border-primary/20 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xs uppercase tracking-widest text-muted-foreground", children: "Status:" }),
            INQUIRY_STATUS_OPTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                disabled: isUpdating || inquiry.status.toLowerCase() === s,
                onClick: (e) => {
                  e.stopPropagation();
                  onStatusChange(inquiry.id, s);
                },
                "data-ocid": `admin.inquiry_status_button.${s}`,
                className: `font-display text-xs uppercase tracking-widest px-3 py-1.5 border-2 transition-smooth disabled:opacity-50 ${inquiry.status.toLowerCase() === s ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground hover:border-primary hover:text-primary"}`,
                children: s
              },
              s
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: (e) => {
                  e.stopPropagation();
                  onDeleteRequest(inquiry.id);
                },
                "data-ocid": `admin.inquiry_delete_button.${rowNum}`,
                className: "ml-auto font-display text-xs uppercase tracking-widest px-3 py-1.5 border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-smooth",
                children: "Delete"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
function OrderRow({
  order,
  carName,
  index,
  onStatusChange,
  onDeleteRequest,
  isUpdating
}) {
  const rowNum = index + 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "tr",
    {
      className: "border-b border-primary/20 hover:bg-primary/5 transition-smooth",
      "data-ocid": `admin.order_row.${rowNum}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap", children: [
          order.orderId.slice(0, 8),
          "…"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-body text-sm text-foreground min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-1", children: carName }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-body text-sm text-foreground min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-1", children: order.buyerName }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-body text-xs text-muted-foreground hidden md:table-cell min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-1", children: order.buyerEmail }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-display font-bold text-sm text-foreground whitespace-nowrap text-right", children: formatPrice(order.paymentAmount) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: order.orderStatus, type: "order" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden lg:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            value: order.orderStatus.toLowerCase(),
            disabled: isUpdating,
            onChange: (e) => onStatusChange(order.orderId, e.target.value),
            onClick: (e) => e.stopPropagation(),
            onKeyDown: (e) => e.stopPropagation(),
            "data-ocid": `admin.order_status_select.${rowNum}`,
            className: "font-display text-xs uppercase tracking-widest bg-background border-2 border-border text-foreground px-2 py-1 focus:border-primary focus:outline-none transition-smooth disabled:opacity-50 cursor-pointer",
            children: ORDER_STATUS_OPTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: orderStatusLabel(s) }, s))
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-body text-xs text-muted-foreground whitespace-nowrap hidden xl:table-cell", children: formatDate(order.createdAt) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => onDeleteRequest(order.orderId),
            "data-ocid": `admin.order_delete_button.${rowNum}`,
            className: "font-display text-xs uppercase tracking-widest px-2.5 py-1.5 border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-smooth",
            children: "Delete"
          }
        ) })
      ]
    }
  );
}
const EMPTY_SELL_FORM = {
  make: "",
  model: "",
  year: "",
  price: "",
  mileage: "",
  description: "",
  imageUrl1: "",
  imageUrl2: "",
  imageUrl3: ""
};
function useAddCar() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (car) => {
      if (!actor) throw new Error("Not connected");
      return actor.addCar(car);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    }
  });
}
function FieldError({ msg }) {
  if (!msg) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "p",
    {
      className: "font-body text-xs text-destructive mt-1",
      "data-ocid": "admin.sell_form.field_error",
      children: msg
    }
  );
}
function SellCarForm() {
  const [fields, setFields] = reactExports.useState(EMPTY_SELL_FORM);
  const [errors, setErrors] = reactExports.useState({});
  const addCar = useAddCar();
  const set = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }));
  const validate = () => {
    const errs = {};
    if (!fields.make.trim()) errs.make = "Make is required";
    if (!fields.model.trim()) errs.model = "Model is required";
    const yr = Number.parseInt(fields.year, 10);
    if (!fields.year.trim() || Number.isNaN(yr) || yr < 1886 || yr > (/* @__PURE__ */ new Date()).getFullYear() + 1)
      errs.year = "Enter a valid year";
    const pr = Number.parseFloat(fields.price);
    if (!fields.price.trim() || Number.isNaN(pr) || pr <= 0)
      errs.price = "Enter a valid price";
    const mi = Number.parseInt(fields.mileage, 10);
    if (!fields.mileage.trim() || Number.isNaN(mi) || mi < 0)
      errs.mileage = "Enter a valid mileage";
    if (!fields.description.trim() || fields.description.trim().length < 10)
      errs.description = "Description must be at least 10 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const imageUrls = [
      fields.imageUrl1,
      fields.imageUrl2,
      fields.imageUrl3
    ].filter((u) => u.trim() !== "");
    const car = {
      make: fields.make.trim(),
      model: fields.model.trim(),
      year: BigInt(Number.parseInt(fields.year, 10)),
      price: BigInt(Math.round(Number.parseFloat(fields.price))),
      mileage: BigInt(Number.parseInt(fields.mileage, 10)),
      description: fields.description.trim(),
      imageUrls
    };
    try {
      await addCar.mutateAsync(car);
      ue.success(
        `${fields.year} ${fields.make} ${fields.model} listed successfully!`
      );
      setFields(EMPTY_SELL_FORM);
      setErrors({});
    } catch {
      ue.error("Failed to list vehicle. Please try again.");
    }
  };
  const inputCls = "w-full bg-input border-2 border-border text-foreground font-body text-sm px-3 py-2.5 focus:border-primary focus:outline-none transition-smooth placeholder:text-muted-foreground/60";
  const labelCls = "font-display text-xs uppercase tracking-widest text-muted-foreground block mb-1.5";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "max-w-3xl mx-auto",
      "data-ocid": "admin.sell_form",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground mb-8 leading-relaxed", children: "Fill out the details below to add a new vehicle to the ClassicWheels inventory. All fields except image URLs are required." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "sell-make", className: labelCls, children: "Make *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "sell-make",
                type: "text",
                value: fields.make,
                onChange: set("make"),
                placeholder: "e.g. Ford",
                className: inputCls,
                "data-ocid": "admin.sell_form.make_input",
                onBlur: validate
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: errors.make })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "sell-model", className: labelCls, children: "Model *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "sell-model",
                type: "text",
                value: fields.model,
                onChange: set("model"),
                placeholder: "e.g. Mustang Fastback",
                className: inputCls,
                "data-ocid": "admin.sell_form.model_input",
                onBlur: validate
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: errors.model })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "sell-year", className: labelCls, children: "Year *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "sell-year",
                type: "number",
                value: fields.year,
                onChange: set("year"),
                placeholder: "e.g. 1967",
                min: "1886",
                max: (/* @__PURE__ */ new Date()).getFullYear() + 1,
                className: inputCls,
                "data-ocid": "admin.sell_form.year_input",
                onBlur: validate
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: errors.year })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "sell-price", className: labelCls, children: "Price (USD) *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "sell-price",
                type: "number",
                value: fields.price,
                onChange: set("price"),
                placeholder: "e.g. 65000",
                min: "0",
                className: inputCls,
                "data-ocid": "admin.sell_form.price_input",
                onBlur: validate
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: errors.price })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "sell-mileage", className: labelCls, children: "Mileage *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "sell-mileage",
                type: "number",
                value: fields.mileage,
                onChange: set("mileage"),
                placeholder: "e.g. 42000",
                min: "0",
                className: inputCls,
                "data-ocid": "admin.sell_form.mileage_input",
                onBlur: validate
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: errors.mileage })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "sell-description", className: labelCls, children: "Description *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              id: "sell-description",
              rows: 5,
              value: fields.description,
              onChange: set("description"),
              placeholder: "Describe the vehicle's condition, history, special features...",
              className: `${inputCls} resize-y min-h-[120px]`,
              "data-ocid": "admin.sell_form.description_textarea",
              onBlur: validate
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: errors.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${labelCls} mb-3`, children: "Image URLs (optional — up to 3)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((n) => {
            const key = `imageUrl${n}`;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "url",
                value: fields[key],
                onChange: set(key),
                placeholder: `https://example.com/car-photo-${n}.jpg`,
                className: inputCls,
                "data-ocid": `admin.sell_form.image_url_${n}_input`
              },
              n
            );
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              disabled: addCar.isPending,
              "data-ocid": "admin.sell_form.submit_button",
              className: "font-display font-bold uppercase tracking-widest text-sm px-8 py-3 bg-primary text-primary-foreground border-2 border-primary hover:bg-primary/90 transition-smooth disabled:opacity-50",
              children: addCar.isPending ? "Listing Vehicle…" : "List Vehicle for Sale"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                setFields(EMPTY_SELL_FORM);
                setErrors({});
              },
              "data-ocid": "admin.sell_form.reset_button",
              className: "font-display text-xs uppercase tracking-widest px-5 py-3 border-2 border-border text-foreground hover:border-primary hover:text-primary transition-smooth",
              children: "Reset"
            }
          )
        ] })
      ]
    }
  );
}
function Admin() {
  const { identity, clear } = useInternetIdentity();
  const queryClient = useQueryClient();
  const {
    data: inquiries,
    isLoading: inquiriesLoading,
    isError: inquiriesError
  } = useInquiries();
  const {
    data: orders,
    isLoading: ordersLoading,
    isError: ordersError
  } = useGetOrders();
  const { data: cars } = useCars();
  const { data: isAdminData } = useIsAdmin();
  const updateInquiryStatus = useUpdateInquiryStatus();
  const deleteInquiry = useDeleteInquiry();
  const updateOrderStatus = useUpdateOrderStatus();
  const deleteOrder = useDeleteOrder();
  const [activeTab, setActiveTab] = reactExports.useState("inquiries");
  const [inquiryStatusFilter, setInquiryStatusFilter] = reactExports.useState("all");
  const [orderSearch, setOrderSearch] = reactExports.useState("");
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const identityStr = (identity == null ? void 0 : identity.getPrincipal().toText()) ?? "";
  const shortIdentity = identityStr.length > 12 ? `${identityStr.slice(0, 6)}…${identityStr.slice(-4)}` : identityStr;
  const carMap = new Map(
    cars == null ? void 0 : cars.map((c) => [c.id, `${Number(c.year)} ${c.make} ${c.model}`])
  );
  const filteredInquiries = (inquiries ?? []).filter(
    (i) => inquiryStatusFilter === "all" || i.status.toLowerCase() === inquiryStatusFilter
  );
  const filteredOrders = (orders ?? []).filter((o) => {
    if (!orderSearch.trim()) return true;
    const q = orderSearch.toLowerCase();
    return o.buyerEmail.toLowerCase().includes(q) || (carMap.get(o.carId) ?? "").toLowerCase().includes(q);
  });
  const handleLogout = () => {
    clear();
    queryClient.clear();
  };
  const handleInquiryStatus = async (id, status) => {
    try {
      await updateInquiryStatus.mutateAsync({ id, status });
      ue.success(`Status updated to "${status}"`);
    } catch {
      ue.error("Failed to update status.");
    }
  };
  const handleOrderStatus = async (orderId, status) => {
    try {
      await updateOrderStatus.mutateAsync({ orderId, status });
      ue.success(`Order status updated to "${orderStatusLabel(status)}"`);
    } catch {
      ue.error("Failed to update order status.");
    }
  };
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      if (deleteTarget.type === "inquiry") {
        await deleteInquiry.mutateAsync(deleteTarget.id);
        ue.success("Inquiry deleted.");
      } else {
        await deleteOrder.mutateAsync(deleteTarget.id);
        ue.success("Order deleted.");
      }
    } catch {
      ue.error("Failed to delete.");
    } finally {
      setDeleteTarget(null);
    }
  };
  const inquiryCounts = {
    all: (inquiries == null ? void 0 : inquiries.length) ?? 0,
    new: (inquiries == null ? void 0 : inquiries.filter((i) => i.status.toLowerCase() === "new").length) ?? 0,
    contacted: (inquiries == null ? void 0 : inquiries.filter((i) => i.status.toLowerCase() === "contacted").length) ?? 0,
    resolved: (inquiries == null ? void 0 : inquiries.filter((i) => i.status.toLowerCase() === "resolved").length) ?? 0
  };
  const tabs = [
    { id: "inquiries", label: "Inquiries", count: inquiryCounts.all },
    { id: "orders", label: "Orders", count: (orders == null ? void 0 : orders.length) ?? 0 },
    { id: "sell", label: "Sell a Car" }
  ];
  const isDeleting = deleteInquiry.isPending || deleteOrder.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "admin.page", children: [
    deleteTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(
      DeleteConfirm,
      {
        onConfirm: handleDeleteConfirm,
        onCancel: () => setDeleteTarget(null),
        isDeleting,
        label: deleteTarget.type === "inquiry" ? "inquiry" : "order"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-accent text-accent-foreground border-b-2 border-primary px-4 sm:px-6 lg:px-8 py-5",
        "data-ocid": "admin.header",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl sm:text-3xl uppercase tracking-widest leading-tight", children: "Admin Dashboard" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-accent-foreground/70 text-sm mt-0.5", children: "Inventory & Order Management — The Vintage Garage" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
            shortIdentity && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "font-mono text-xs text-accent-foreground/70 bg-accent-foreground/10 border border-accent-foreground/20 px-3 py-1.5 truncate max-w-[180px]",
                title: identityStr,
                "data-ocid": "admin.identity_badge",
                children: shortIdentity
              }
            ),
            isAdminData !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `font-display text-xs uppercase tracking-widest px-2.5 py-1 border-2 ${isAdminData ? "border-[oklch(0.52_0.1_145)] text-[oklch(0.52_0.1_145)]" : "border-muted-foreground text-muted-foreground"}`,
                children: isAdminData ? "Admin" : "Staff"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleLogout,
                "data-ocid": "admin.logout_button",
                className: "font-display font-bold uppercase tracking-widest text-xs px-4 py-2 border-2 border-accent-foreground/40 text-accent-foreground hover:bg-accent-foreground/10 transition-smooth",
                children: "Sign Out"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8", children: [
        {
          label: "All Inquiries",
          value: inquiryCounts.all,
          colorCls: "text-foreground"
        },
        {
          label: "New Inquiries",
          value: inquiryCounts.new,
          colorCls: "text-primary"
        },
        {
          label: "Total Orders",
          value: (orders == null ? void 0 : orders.length) ?? 0,
          colorCls: "text-[oklch(0.55_0.14_220)]"
        },
        {
          label: "Cars Listed",
          value: (cars == null ? void 0 : cars.length) ?? 0,
          colorCls: "text-[oklch(0.52_0.1_145)]"
        }
      ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border-2 border-primary p-5",
          "data-ocid": `admin.stat.${stat.label.replace(/\s+/g, "_").toLowerCase()}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `font-display font-bold text-3xl ${stat.colorCls}`,
                children: stat.value
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xs uppercase tracking-widest text-muted-foreground mt-1", children: stat.label })
          ]
        },
        stat.label
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex border-b-2 border-primary mb-0",
          "data-ocid": "admin.tabs",
          children: tabs.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setActiveTab(tab.id),
              "data-ocid": `admin.tab.${tab.id}`,
              className: `font-display font-bold uppercase tracking-widest text-xs px-5 py-3.5 border-2 border-b-0 -mb-0.5 transition-smooth ${activeTab === tab.id ? "bg-card border-primary text-foreground border-b-card" : "bg-transparent border-transparent text-muted-foreground hover:text-foreground hover:border-primary/40"}`,
              style: activeTab === tab.id ? { borderBottomColor: "var(--color-card)" } : {},
              children: [
                tab.label,
                tab.count !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `ml-2 font-mono text-xs px-1.5 py-0.5 ${activeTab === tab.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`,
                    children: tab.count
                  }
                )
              ]
            },
            tab.id
          ))
        }
      ),
      activeTab === "inquiries" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border-2 border-primary border-t-0",
          "data-ocid": "admin.inquiries_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-accent/20 border-b-2 border-primary px-6 py-4 flex items-center justify-between flex-wrap gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg uppercase tracking-widest text-foreground", children: "Buyer Inquiries" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex items-center gap-1 flex-wrap",
                  "data-ocid": "admin.inquiry_filter_tabs",
                  children: ["all", ...INQUIRY_STATUS_OPTIONS].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setInquiryStatusFilter(s),
                      "data-ocid": `admin.inquiry_filter.${s}`,
                      className: `font-display text-xs uppercase tracking-widest px-3 py-1.5 border-2 transition-smooth ${inquiryStatusFilter === s ? "bg-primary text-primary-foreground border-primary" : "bg-transparent text-foreground border-border hover:border-primary"}`,
                      children: s === "all" ? `All (${inquiryCounts.all})` : `${s} (${inquiryCounts[s]})`
                    },
                    s
                  ))
                }
              )
            ] }),
            inquiriesLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex items-center justify-center py-16",
                "data-ocid": "admin.inquiries.loading_state",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xs uppercase tracking-widest text-muted-foreground mt-4", children: "Loading inquiries…" })
                ] })
              }
            ),
            !inquiriesLoading && inquiriesError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "text-center py-16 px-6",
                "data-ocid": "admin.inquiries.error_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-3", children: "⚠" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-lg uppercase tracking-wide text-foreground mb-2", children: "Failed to Load" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-muted-foreground text-sm", children: "Could not retrieve inquiries. Please refresh and try again." })
                ]
              }
            ),
            !inquiriesLoading && !inquiriesError && filteredInquiries.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "text-center py-16 px-6",
                "data-ocid": "admin.inquiries.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-4", children: "📬" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-xl uppercase tracking-wide text-foreground mb-2", children: "No Inquiries" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-muted-foreground text-sm", children: inquiryStatusFilter === "all" ? "No customer inquiries have been received yet." : `No inquiries with status "${inquiryStatusFilter}" found.` })
                ]
              }
            ),
            !inquiriesLoading && !inquiriesError && filteredInquiries.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", "data-ocid": "admin.inquiries_table", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b-2 border-primary/30 bg-muted/20", children: [
                "Vehicle",
                "Buyer",
                "Email",
                "Status",
                "Date",
                "expand"
              ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "th",
                {
                  className: `px-4 py-3 text-left font-display text-xs uppercase tracking-widest text-muted-foreground ${h === "Email" ? "hidden md:table-cell" : ""} ${h === "Date" ? "hidden lg:table-cell" : ""} ${h === "expand" ? "w-8" : ""}`,
                  children: h === "expand" ? "" : h
                },
                h
              )) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filteredInquiries.map((inquiry, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                InquiryRow,
                {
                  inquiry,
                  carName: carMap.get(inquiry.carId) ?? inquiry.carId,
                  index: i,
                  onStatusChange: handleInquiryStatus,
                  onDeleteRequest: (id) => setDeleteTarget({ id, type: "inquiry" }),
                  isUpdating: updateInquiryStatus.isPending
                },
                inquiry.id
              )) })
            ] }) })
          ]
        }
      ),
      activeTab === "orders" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border-2 border-primary border-t-0",
          "data-ocid": "admin.orders_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-accent/20 border-b-2 border-primary px-6 py-4 flex items-center justify-between flex-wrap gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg uppercase tracking-widest text-foreground", children: "Customer Orders" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "search",
                    value: orderSearch,
                    onChange: (e) => setOrderSearch(e.target.value),
                    placeholder: "Search by email or car name…",
                    "data-ocid": "admin.orders.search_input",
                    className: "font-body text-sm bg-input border-2 border-border text-foreground pl-3 pr-8 py-1.5 focus:border-primary focus:outline-none transition-smooth placeholder:text-muted-foreground/60 w-64"
                  }
                ),
                orderSearch && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setOrderSearch(""),
                    className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                    "aria-label": "Clear search",
                    children: "✕"
                  }
                )
              ] })
            ] }),
            ordersLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex items-center justify-center py-16",
                "data-ocid": "admin.orders.loading_state",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xs uppercase tracking-widest text-muted-foreground mt-4", children: "Loading orders…" })
                ] })
              }
            ),
            !ordersLoading && ordersError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "text-center py-16 px-6",
                "data-ocid": "admin.orders.error_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-3", children: "⚠" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-lg uppercase tracking-wide text-foreground mb-2", children: "Failed to Load" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-muted-foreground text-sm", children: "Could not retrieve orders. Please refresh and try again." })
                ]
              }
            ),
            !ordersLoading && !ordersError && filteredOrders.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "text-center py-16 px-6",
                "data-ocid": "admin.orders.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-4", children: "🛒" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-xl uppercase tracking-wide text-foreground mb-2", children: "No Orders" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-muted-foreground text-sm", children: orderSearch ? `No orders matching "${orderSearch}".` : "No customer orders have been placed yet." })
                ]
              }
            ),
            !ordersLoading && !ordersError && filteredOrders.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", "data-ocid": "admin.orders_table", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b-2 border-primary/30 bg-muted/20", children: [
                "Order ID",
                "Vehicle",
                "Buyer",
                "Email",
                "Amount",
                "Status",
                "Update Status",
                "Date",
                "actions"
              ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "th",
                {
                  className: `px-4 py-3 text-left font-display text-xs uppercase tracking-widest text-muted-foreground ${h === "Email" ? "hidden md:table-cell" : ""} ${h === "Amount" ? "text-right" : ""} ${h === "Update Status" ? "hidden lg:table-cell" : ""} ${h === "Date" ? "hidden xl:table-cell" : ""}`,
                  children: h === "actions" ? "" : h
                },
                h
              )) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filteredOrders.map((order, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                OrderRow,
                {
                  order,
                  carName: carMap.get(order.carId) ?? order.carId,
                  index: i,
                  onStatusChange: handleOrderStatus,
                  onDeleteRequest: (id) => setDeleteTarget({ id, type: "order" }),
                  isUpdating: updateOrderStatus.isPending
                },
                order.orderId
              )) })
            ] }) })
          ]
        }
      ),
      activeTab === "sell" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border-2 border-primary border-t-0",
          "data-ocid": "admin.sell_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-accent/20 border-b-2 border-primary px-6 py-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg uppercase tracking-widest text-foreground", children: "List a Vehicle for Sale" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground mt-1", children: "Add a new classic car to the ClassicWheels inventory" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SellCarForm, {}) })
          ]
        }
      )
    ] })
  ] });
}
export {
  Admin as default
};
