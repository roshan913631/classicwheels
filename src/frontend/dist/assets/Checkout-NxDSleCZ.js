import { j as jsxRuntimeExports, n as cn, r as reactExports, o as useSearch, u as useNavigate } from "./index-HwI002Ox.js";
import { P as Primitive, c as createLucideIcon, B as Button, C as Card, a as CardHeader, b as CardTitle, d as CardContent, e as Phone, S as Skeleton, f as Separator } from "./phone-BCKFzTel.js";
import { a as useCar } from "./useCars-CCzp4_0f.js";
import { c as useSubmitOrder } from "./useOrders-Cxng5tbg.js";
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
var NAME = "Label";
var Label$1 = reactExports.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.label,
    {
      ...props,
      ref: forwardedRef,
      onMouseDown: (event) => {
        var _a;
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;
        (_a = props.onMouseDown) == null ? void 0 : _a.call(props, event);
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }
    }
  );
});
Label$1.displayName = NAME;
var Root = Label$1;
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(Number(price));
}
function formatCardNumber(value) {
  return value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}
function formatExpiry(value) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
}
function Checkout() {
  const search = useSearch({ strict: false });
  const navigate = useNavigate();
  const carId = search.carId ?? "";
  const { data: car, isLoading: carLoading } = useCar(carId);
  const submitOrder = useSubmitOrder();
  const [form, setForm] = reactExports.useState({
    buyerName: "",
    buyerEmail: "",
    buyerPhone: "",
    payment: { cardNumber: "", expiry: "", cvc: "" }
  });
  const [errors, setErrors] = reactExports.useState({});
  const [submitError, setSubmitError] = reactExports.useState(null);
  function validate() {
    const next = {};
    if (!form.buyerName.trim()) next.buyerName = "Full name is required";
    if (!form.buyerEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      next.buyerEmail = "Enter a valid email address";
    if (!form.buyerPhone.trim()) next.buyerPhone = "Phone number is required";
    const rawCard = form.payment.cardNumber.replace(/\s/g, "");
    if (rawCard.length !== 16)
      next.cardNumber = "Card number must be 16 digits";
    const expiryMatch = form.payment.expiry.match(/^(0[1-9]|1[0-2])\/(\d{2})$/);
    if (!expiryMatch) next.expiry = "Enter expiry as MM/YY";
    else {
      const year = 2e3 + Number.parseInt(expiryMatch[2], 10);
      const month = Number.parseInt(expiryMatch[1], 10);
      const now = /* @__PURE__ */ new Date();
      if (year < now.getFullYear() || year === now.getFullYear() && month < now.getMonth() + 1) {
        next.expiry = "Card has expired";
      }
    }
    if (!form.payment.cvc.match(/^\d{3}$/)) next.cvc = "CVC must be 3 digits";
    setErrors(next);
    return Object.keys(next).length === 0;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;
    if (!carId) {
      setSubmitError("No car selected.");
      return;
    }
    try {
      const orderId = await submitOrder.mutateAsync({
        carId,
        buyerName: form.buyerName,
        buyerEmail: form.buyerEmail,
        buyerPhone: form.buyerPhone
      });
      navigate({ to: "/order-confirmation/$orderId", params: { orderId } });
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Order submission failed. Please try again."
      );
    }
  }
  if (!carId) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto px-4 py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-12 h-12 text-destructive mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold mb-2", children: "No Car Selected" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Please browse our listings and select a car to purchase." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: () => navigate({ to: "/" }),
          "data-ocid": "checkout.browse_button",
          children: "Browse Cars"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 py-10", "data-ocid": "checkout.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "Secure Checkout" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Complete your purchase below. All transactions are secured." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-8 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleSubmit,
          className: "lg:col-span-3 space-y-6",
          noValidate: true,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 font-display text-lg", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-5 h-5 text-primary" }),
                "Your Information"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "buyerName", children: "Full Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "buyerName",
                      placeholder: "John Doe",
                      value: form.buyerName,
                      onChange: (e) => setForm({ ...form, buyerName: e.target.value }),
                      onBlur: validate,
                      "data-ocid": "checkout.name_input",
                      className: errors.buyerName ? "border-destructive" : ""
                    }
                  ),
                  errors.buyerName && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-destructive text-xs mt-1",
                      "data-ocid": "checkout.name_input.field_error",
                      children: errors.buyerName
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "buyerEmail", children: "Email Address" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "buyerEmail",
                        type: "email",
                        placeholder: "you@example.com",
                        value: form.buyerEmail,
                        onChange: (e) => setForm({ ...form, buyerEmail: e.target.value }),
                        onBlur: validate,
                        className: `pl-9 ${errors.buyerEmail ? "border-destructive" : ""}`,
                        "data-ocid": "checkout.email_input"
                      }
                    )
                  ] }),
                  errors.buyerEmail && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-destructive text-xs mt-1",
                      "data-ocid": "checkout.email_input.field_error",
                      children: errors.buyerEmail
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "buyerPhone", children: "Phone Number" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "buyerPhone",
                        type: "tel",
                        placeholder: "+1 (555) 000-0000",
                        value: form.buyerPhone,
                        onChange: (e) => setForm({ ...form, buyerPhone: e.target.value }),
                        onBlur: validate,
                        className: `pl-9 ${errors.buyerPhone ? "border-destructive" : ""}`,
                        "data-ocid": "checkout.phone_input"
                      }
                    )
                  ] }),
                  errors.buyerPhone && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-destructive text-xs mt-1",
                      "data-ocid": "checkout.phone_input.field_error",
                      children: errors.buyerPhone
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 font-display text-lg", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-5 h-5 text-primary" }),
                "Payment Details"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-muted/40 rounded px-3 py-2 text-xs text-muted-foreground border border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3.5 h-3.5 shrink-0" }),
                  "Demo mode — no real payment is processed. Any 16-digit number is accepted."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cardNumber", children: "Card Number" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "cardNumber",
                        inputMode: "numeric",
                        placeholder: "1234 5678 9012 3456",
                        maxLength: 19,
                        value: form.payment.cardNumber,
                        onChange: (e) => setForm({
                          ...form,
                          payment: {
                            ...form.payment,
                            cardNumber: formatCardNumber(e.target.value)
                          }
                        }),
                        onBlur: validate,
                        className: `pl-9 font-mono tracking-widest ${errors.cardNumber ? "border-destructive" : ""}`,
                        "data-ocid": "checkout.card_number_input"
                      }
                    )
                  ] }),
                  errors.cardNumber && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-destructive text-xs mt-1",
                      "data-ocid": "checkout.card_number_input.field_error",
                      children: errors.cardNumber
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "expiry", children: "Expiry Date" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "expiry",
                        inputMode: "numeric",
                        placeholder: "MM/YY",
                        maxLength: 5,
                        value: form.payment.expiry,
                        onChange: (e) => setForm({
                          ...form,
                          payment: {
                            ...form.payment,
                            expiry: formatExpiry(e.target.value)
                          }
                        }),
                        onBlur: validate,
                        className: `font-mono ${errors.expiry ? "border-destructive" : ""}`,
                        "data-ocid": "checkout.expiry_input"
                      }
                    ),
                    errors.expiry && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-destructive text-xs mt-1",
                        "data-ocid": "checkout.expiry_input.field_error",
                        children: errors.expiry
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cvc", children: "CVC" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "cvc",
                        inputMode: "numeric",
                        placeholder: "123",
                        maxLength: 3,
                        value: form.payment.cvc,
                        onChange: (e) => setForm({
                          ...form,
                          payment: {
                            ...form.payment,
                            cvc: e.target.value.replace(/\D/g, "").slice(0, 3)
                          }
                        }),
                        onBlur: validate,
                        className: `font-mono ${errors.cvc ? "border-destructive" : ""}`,
                        "data-ocid": "checkout.cvc_input"
                      }
                    ),
                    errors.cvc && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-destructive text-xs mt-1",
                        "data-ocid": "checkout.cvc_input.field_error",
                        children: errors.cvc
                      }
                    )
                  ] })
                ] })
              ] })
            ] }),
            submitError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-2 bg-destructive/10 border border-destructive/30 rounded px-4 py-3 text-destructive text-sm",
                "data-ocid": "checkout.error_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 shrink-0" }),
                  submitError
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                size: "lg",
                className: "w-full font-display text-base",
                disabled: submitOrder.isPending,
                "data-ocid": "checkout.submit_button",
                children: submitOrder.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "flex items-center gap-2",
                    "data-ocid": "checkout.loading_state",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "svg",
                        {
                          className: "animate-spin w-4 h-4",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          role: "img",
                          "aria-label": "Loading",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Loading" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "circle",
                              {
                                className: "opacity-25",
                                cx: "12",
                                cy: "12",
                                r: "10",
                                stroke: "currentColor",
                                strokeWidth: "4"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                className: "opacity-75",
                                fill: "currentColor",
                                d: "M4 12a8 8 0 018-8v8H4z"
                              }
                            )
                          ]
                        }
                      ),
                      "Processing Order…"
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  "Complete Purchase ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                ] })
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "sticky top-6 border-border bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-lg", children: "Order Summary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-4", children: carLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "space-y-3",
            "data-ocid": "checkout.car_summary.loading_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 w-full rounded" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" })
            ]
          }
        ) : car ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          car.imageUrls[0] && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: car.imageUrls[0],
              alt: `${car.make} ${car.model}`,
              className: "w-full h-40 object-cover rounded border border-border"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-lg leading-tight", children: [
              Number(car.year),
              " ",
              car.make,
              " ",
              car.model
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
              Number(car.mileage).toLocaleString(),
              " miles"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Vehicle Price" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground", children: formatPrice(car.price) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Taxes & Fees" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Included" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-xl text-primary", children: formatPrice(car.price) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground border-t border-border pt-3 mt-2", children: "Delivery within 5–7 business days after order confirmation." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-muted-foreground text-sm",
            "data-ocid": "checkout.car_summary.error_state",
            children: "Unable to load car details."
          }
        ) })
      ] }) })
    ] })
  ] });
}
export {
  Checkout as default
};
