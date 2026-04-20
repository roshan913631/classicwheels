import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useCar, useSubmitInquiry } from "../hooks/useCars";
import type { InquiryFormData } from "../types";

type FormErrors = Partial<Record<keyof InquiryFormData, string>>;

const EMPTY_FORM: InquiryFormData = {
  buyerName: "",
  buyerEmail: "",
  buyerPhone: "",
  message: "",
};

function validateForm(form: InquiryFormData): FormErrors {
  const errors: FormErrors = {};
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

const SPEC_LABEL =
  "block font-display text-xs uppercase tracking-[0.12em] text-muted-foreground mb-1";
const SPEC_VALUE = "font-display font-bold text-base text-foreground";
const FIELD_LABEL =
  "block font-display text-xs uppercase tracking-widest text-foreground mb-1.5";
const FIELD_INPUT =
  "w-full bg-background border-2 border-input focus:border-primary outline-none px-3 py-2.5 font-body text-sm text-foreground transition-smooth placeholder:text-muted-foreground/60";
const FIELD_ERROR = "mt-1 font-body text-xs text-destructive";

interface SpecItemProps {
  label: string;
  value: string;
  highlight?: boolean;
}

function SpecItem({ label, value, highlight = false }: SpecItemProps) {
  return (
    <div
      className={`p-4 border-2 ${highlight ? "border-primary bg-primary/5" : "border-primary/40 bg-card"}`}
    >
      <div className={SPEC_LABEL}>{label}</div>
      <div
        className={`${SPEC_VALUE} ${highlight ? "text-primary text-xl" : ""}`}
      >
        {value}
      </div>
    </div>
  );
}

export default function CarDetail() {
  const { id } = useParams({ from: "/cars/$id" });
  const { data: car, isLoading, error } = useCar(id);
  const submitInquiry = useSubmitInquiry();
  const navigate = useNavigate();

  const [form, setForm] = useState<InquiryFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof InquiryFormData, boolean>>
  >({});
  const [submitted, setSubmitted] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  // ─── Loading ────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] gap-4"
        data-ocid="car_detail.loading_state"
      >
        <LoadingSpinner size="lg" />
        <p className="font-display text-xs uppercase tracking-widest text-muted-foreground animate-pulse">
          Loading vehicle details…
        </p>
      </div>
    );
  }

  // ─── 404 ────────────────────────────────────────────────────────────────
  if (error || !car) {
    return (
      <div
        className="max-w-2xl mx-auto px-6 py-24 text-center"
        data-ocid="car_detail.error_state"
      >
        <div className="border-2 border-primary bg-card p-12 mx-auto max-w-md">
          <div className="font-display font-bold text-6xl text-primary mb-4 leading-none">
            404
          </div>
          <div className="w-16 h-0.5 bg-primary mx-auto mb-6" />
          <h1 className="font-display font-bold text-xl uppercase tracking-[0.15em] text-foreground mb-3">
            Vehicle Not Found
          </h1>
          <p className="font-body text-muted-foreground text-sm leading-relaxed mb-8">
            This vehicle may have already found a new home, or the listing is no
            longer available.
          </p>
          <Link
            to="/"
            data-ocid="car_detail.back_link"
            className="inline-block font-display font-bold uppercase tracking-widest text-sm px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
          >
            ← Return to Inventory
          </Link>
        </div>
      </div>
    );
  }

  // ─── Helpers ─────────────────────────────────────────────────────────────
  const images =
    car.imageUrls.length > 0
      ? car.imageUrls
      : ["/assets/generated/hero-showroom.dim_1200x600.jpg"];
  const price = Number(car.price).toLocaleString("en-US");
  const mileage = Number(car.mileage).toLocaleString("en-US");
  const year = Number(car.year);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name as keyof InquiryFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateForm({ ...form, [name]: value })[
          name as keyof InquiryFormData
        ],
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateForm(form)[name as keyof InquiryFormData],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = {
      buyerName: true,
      buyerEmail: true,
      buyerPhone: true,
      message: true,
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
      toast.success("Inquiry sent! We'll contact you within 1 business day.");
    } catch {
      toast.error("Failed to send inquiry. Please try again.");
    }
  };

  // ─── Page ────────────────────────────────────────────────────────────────
  return (
    <div className="bg-background min-h-screen" data-ocid="car_detail.page">
      {/* ── Back bar ─────────────────────────────────────────── */}
      <div className="border-b-2 border-primary/30 bg-card px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-4">
        <Link
          to="/"
          data-ocid="car_detail.back_button"
          className="inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-widest text-primary hover:text-primary/80 transition-smooth"
        >
          <span className="text-base leading-none">←</span>
          Back to Inventory
        </Link>
        <span className="text-border/40">|</span>
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 font-body text-xs text-muted-foreground"
        >
          <Link to="/" className="hover:text-primary transition-smooth">
            Inventory
          </Link>
          <span>/</span>
          <span className="text-foreground truncate max-w-[200px]">
            {year} {car.make} {car.model}
          </span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* ── Title banner ─────────────────────────────────────── */}
        <div className="bg-primary px-6 py-5 mb-8 border-2 border-primary">
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-primary-foreground uppercase tracking-wide leading-tight">
            {year} {car.make} {car.model}
          </h1>
          <div className="flex items-center gap-6 mt-2">
            <span className="font-display font-bold text-2xl text-primary-foreground/90">
              ${price}
            </span>
            <span className="font-body text-primary-foreground/60 text-sm border-l border-primary-foreground/30 pl-4">
              {mileage} miles on the clock
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ── Left column: images + specs ──────────────────────── */}
          <div className="lg:col-span-7 space-y-6">
            {/* Hero image */}
            <div data-ocid="car_detail.images_panel">
              <div className="aspect-[16/10] border-2 border-primary overflow-hidden bg-muted">
                <img
                  src={images[activeImage]}
                  alt={`${year} ${car.make} ${car.model}`}
                  className="w-full h-full object-cover transition-smooth"
                />
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {images.map((img, i) => (
                    <button
                      key={img}
                      type="button"
                      onClick={() => setActiveImage(i)}
                      data-ocid={`car_detail.thumbnail.${i + 1}`}
                      className={`aspect-[4/3] border-2 overflow-hidden transition-smooth cursor-pointer ${
                        i === activeImage
                          ? "border-primary"
                          : "border-primary/30 hover:border-primary/70"
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Spec grid */}
            <div data-ocid="car_detail.specs_section">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-primary" />
                <h2 className="font-display font-bold text-sm uppercase tracking-[0.15em] text-foreground">
                  Vehicle Specifications
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <SpecItem label="Year" value={String(year)} />
                <SpecItem label="Make" value={car.make} />
                <SpecItem label="Model" value={car.model} />
                <SpecItem label="Mileage" value={`${mileage} mi`} />
                <SpecItem label="Price" value={`$${price}`} highlight />
                <SpecItem label="Condition" value="Vintage / Classic" />
              </div>
            </div>

            {/* Description */}
            <div
              className="bg-card border-2 border-primary/40 p-6"
              data-ocid="car_detail.description_section"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-primary" />
                <h2 className="font-display font-bold text-sm uppercase tracking-[0.15em] text-foreground">
                  About This Vehicle
                </h2>
              </div>
              <p className="font-body text-foreground leading-relaxed text-sm">
                {car.description}
              </p>
            </div>
          </div>

          {/* ── Right column: buy now + inquiry form ──────────── */}
          <div className="lg:col-span-5">
            <div
              className="bg-card border-2 border-primary sticky top-6"
              data-ocid="car_detail.inquiry_panel"
            >
              {/* Buy Now section */}
              <div className="bg-primary/10 border-b-2 border-primary/40 px-5 py-5 flex flex-col gap-3">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-display font-bold text-2xl text-primary">
                    ${price}
                  </span>
                  <span className="font-body text-xs text-muted-foreground uppercase tracking-widest">
                    {mileage} mi
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    navigate({ to: "/checkout", search: { carId: car.id } })
                  }
                  data-ocid="car_detail.buy_now_button"
                  className="w-full bg-primary text-primary-foreground font-display font-bold uppercase tracking-widest py-3.5 border-2 border-primary hover:bg-primary/90 transition-smooth text-sm"
                >
                  Buy Now — ${price}
                </button>
              </div>

              {/* Panel header */}
              <div className="bg-primary px-5 py-4">
                <h2 className="font-display font-bold text-base uppercase tracking-widest text-primary-foreground">
                  Inquire About This Vehicle
                </h2>
                <p className="font-body text-xs text-primary-foreground/70 mt-0.5">
                  All fields required. We respond within 1 business day.
                </p>
              </div>

              {submitted ? (
                /* ── Success state ── */
                <div
                  className="p-8 text-center"
                  data-ocid="car_detail.inquiry_success_state"
                >
                  <div className="w-16 h-16 border-2 border-primary bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <span className="text-2xl">✓</span>
                  </div>
                  <h3 className="font-display font-bold uppercase tracking-widest text-foreground text-sm mb-2">
                    Inquiry Received!
                  </h3>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed mb-6">
                    Thank you for your interest in the {year} {car.make}{" "}
                    {car.model}. Our team will reach out to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    data-ocid="car_detail.send_another_button"
                    className="font-display font-bold text-xs uppercase tracking-widest px-6 py-2.5 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                /* ── Form ── */
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="p-5 space-y-4"
                >
                  {/* Full name */}
                  <div>
                    <label htmlFor="buyerName" className={FIELD_LABEL}>
                      Full Name *
                    </label>
                    <input
                      id="buyerName"
                      name="buyerName"
                      type="text"
                      value={form.buyerName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      data-ocid="car_detail.name_input"
                      className={`${FIELD_INPUT} ${errors.buyerName ? "border-destructive" : ""}`}
                      placeholder="e.g. James Mitchell"
                      autoComplete="name"
                    />
                    {errors.buyerName && (
                      <p
                        className={FIELD_ERROR}
                        data-ocid="car_detail.name_input.field_error"
                      >
                        {errors.buyerName}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="buyerEmail" className={FIELD_LABEL}>
                      Email Address *
                    </label>
                    <input
                      id="buyerEmail"
                      name="buyerEmail"
                      type="email"
                      value={form.buyerEmail}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      data-ocid="car_detail.email_input"
                      className={`${FIELD_INPUT} ${errors.buyerEmail ? "border-destructive" : ""}`}
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                    {errors.buyerEmail && (
                      <p
                        className={FIELD_ERROR}
                        data-ocid="car_detail.email_input.field_error"
                      >
                        {errors.buyerEmail}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="buyerPhone" className={FIELD_LABEL}>
                      Phone Number *
                    </label>
                    <input
                      id="buyerPhone"
                      name="buyerPhone"
                      type="tel"
                      value={form.buyerPhone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      data-ocid="car_detail.phone_input"
                      className={`${FIELD_INPUT} ${errors.buyerPhone ? "border-destructive" : ""}`}
                      placeholder="(555) 867-5309"
                      autoComplete="tel"
                    />
                    {errors.buyerPhone && (
                      <p
                        className={FIELD_ERROR}
                        data-ocid="car_detail.phone_input.field_error"
                      >
                        {errors.buyerPhone}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className={FIELD_LABEL}>
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      data-ocid="car_detail.message_textarea"
                      className={`${FIELD_INPUT} resize-none ${errors.message ? "border-destructive" : ""}`}
                      placeholder={`I'm interested in the ${year} ${car.make} ${car.model}. Could you please send me more details about its condition and history?`}
                    />
                    {errors.message && (
                      <p
                        className={FIELD_ERROR}
                        data-ocid="car_detail.message_textarea.field_error"
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitInquiry.isPending}
                    data-ocid="car_detail.inquiry_submit_button"
                    className="w-full bg-primary text-primary-foreground font-display font-bold uppercase tracking-widest py-3.5 border-2 border-primary hover:bg-primary/90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {submitInquiry.isPending ? (
                      <span className="inline-flex items-center gap-2 justify-center">
                        <span
                          className="block w-3.5 h-3.5 border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin"
                          aria-hidden="true"
                        />
                        Sending…
                      </span>
                    ) : (
                      "Send Inquiry"
                    )}
                  </button>

                  {submitInquiry.isError && (
                    <p
                      className="text-center font-body text-xs text-destructive"
                      data-ocid="car_detail.inquiry_error_state"
                    >
                      Something went wrong. Please try again.
                    </p>
                  )}
                </form>
              )}

              {/* Decorative footer stripe */}
              <div className="h-1 bg-primary/20 border-t border-primary/30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
