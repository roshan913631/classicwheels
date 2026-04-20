import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  AlertCircle,
  ChevronRight,
  CreditCard,
  Lock,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { useState } from "react";
import { useCar } from "../hooks/useCars";
import { useSubmitOrder } from "../hooks/useOrders";
import type { CheckoutFormData } from "../types";

function formatPrice(price: bigint): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(price));
}

function formatCardNumber(value: string): string {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
}

export default function Checkout() {
  const search = useSearch({ strict: false }) as { carId?: string };
  const navigate = useNavigate();
  const carId = search.carId ?? "";

  const { data: car, isLoading: carLoading } = useCar(carId);
  const submitOrder = useSubmitOrder();

  const [form, setForm] = useState<CheckoutFormData>({
    buyerName: "",
    buyerEmail: "",
    buyerPhone: "",
    payment: { cardNumber: "", expiry: "", cvc: "" },
  });
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  function validate(): boolean {
    const next: Partial<Record<string, string>> = {};
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
      const year = 2000 + Number.parseInt(expiryMatch[2], 10);
      const month = Number.parseInt(expiryMatch[1], 10);
      const now = new Date();
      if (
        year < now.getFullYear() ||
        (year === now.getFullYear() && month < now.getMonth() + 1)
      ) {
        next.expiry = "Card has expired";
      }
    }

    if (!form.payment.cvc.match(/^\d{3}$/)) next.cvc = "CVC must be 3 digits";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
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
        buyerPhone: form.buyerPhone,
      });
      navigate({ to: "/order-confirmation/$orderId", params: { orderId } });
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Order submission failed. Please try again.",
      );
    }
  }

  if (!carId) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
        <h2 className="font-display text-2xl font-bold mb-2">
          No Car Selected
        </h2>
        <p className="text-muted-foreground mb-6">
          Please browse our listings and select a car to purchase.
        </p>
        <Button
          onClick={() => navigate({ to: "/" })}
          data-ocid="checkout.browse_button"
        >
          Browse Cars
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10" data-ocid="checkout.page">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Secure Checkout
        </h1>
        <p className="text-muted-foreground mt-1">
          Complete your purchase below. All transactions are secured.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Left column — form */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-3 space-y-6"
          noValidate
        >
          {/* Buyer Info */}
          <Card className="border-border">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 font-display text-lg">
                <User className="w-5 h-5 text-primary" />
                Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="buyerName">Full Name</Label>
                <Input
                  id="buyerName"
                  placeholder="John Doe"
                  value={form.buyerName}
                  onChange={(e) =>
                    setForm({ ...form, buyerName: e.target.value })
                  }
                  onBlur={validate}
                  data-ocid="checkout.name_input"
                  className={errors.buyerName ? "border-destructive" : ""}
                />
                {errors.buyerName && (
                  <p
                    className="text-destructive text-xs mt-1"
                    data-ocid="checkout.name_input.field_error"
                  >
                    {errors.buyerName}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="buyerEmail">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="buyerEmail"
                    type="email"
                    placeholder="you@example.com"
                    value={form.buyerEmail}
                    onChange={(e) =>
                      setForm({ ...form, buyerEmail: e.target.value })
                    }
                    onBlur={validate}
                    className={`pl-9 ${errors.buyerEmail ? "border-destructive" : ""}`}
                    data-ocid="checkout.email_input"
                  />
                </div>
                {errors.buyerEmail && (
                  <p
                    className="text-destructive text-xs mt-1"
                    data-ocid="checkout.email_input.field_error"
                  >
                    {errors.buyerEmail}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="buyerPhone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="buyerPhone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={form.buyerPhone}
                    onChange={(e) =>
                      setForm({ ...form, buyerPhone: e.target.value })
                    }
                    onBlur={validate}
                    className={`pl-9 ${errors.buyerPhone ? "border-destructive" : ""}`}
                    data-ocid="checkout.phone_input"
                  />
                </div>
                {errors.buyerPhone && (
                  <p
                    className="text-destructive text-xs mt-1"
                    data-ocid="checkout.phone_input.field_error"
                  >
                    {errors.buyerPhone}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card className="border-border">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 font-display text-lg">
                <CreditCard className="w-5 h-5 text-primary" />
                Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 bg-muted/40 rounded px-3 py-2 text-xs text-muted-foreground border border-border">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                Demo mode — no real payment is processed. Any 16-digit number is
                accepted.
              </div>

              <div className="space-y-1">
                <Label htmlFor="cardNumber">Card Number</Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="cardNumber"
                    inputMode="numeric"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    value={form.payment.cardNumber}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        payment: {
                          ...form.payment,
                          cardNumber: formatCardNumber(e.target.value),
                        },
                      })
                    }
                    onBlur={validate}
                    className={`pl-9 font-mono tracking-widest ${errors.cardNumber ? "border-destructive" : ""}`}
                    data-ocid="checkout.card_number_input"
                  />
                </div>
                {errors.cardNumber && (
                  <p
                    className="text-destructive text-xs mt-1"
                    data-ocid="checkout.card_number_input.field_error"
                  >
                    {errors.cardNumber}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    inputMode="numeric"
                    placeholder="MM/YY"
                    maxLength={5}
                    value={form.payment.expiry}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        payment: {
                          ...form.payment,
                          expiry: formatExpiry(e.target.value),
                        },
                      })
                    }
                    onBlur={validate}
                    className={`font-mono ${errors.expiry ? "border-destructive" : ""}`}
                    data-ocid="checkout.expiry_input"
                  />
                  {errors.expiry && (
                    <p
                      className="text-destructive text-xs mt-1"
                      data-ocid="checkout.expiry_input.field_error"
                    >
                      {errors.expiry}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    inputMode="numeric"
                    placeholder="123"
                    maxLength={3}
                    value={form.payment.cvc}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        payment: {
                          ...form.payment,
                          cvc: e.target.value.replace(/\D/g, "").slice(0, 3),
                        },
                      })
                    }
                    onBlur={validate}
                    className={`font-mono ${errors.cvc ? "border-destructive" : ""}`}
                    data-ocid="checkout.cvc_input"
                  />
                  {errors.cvc && (
                    <p
                      className="text-destructive text-xs mt-1"
                      data-ocid="checkout.cvc_input.field_error"
                    >
                      {errors.cvc}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {submitError && (
            <div
              className="flex items-center gap-2 bg-destructive/10 border border-destructive/30 rounded px-4 py-3 text-destructive text-sm"
              data-ocid="checkout.error_state"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              {submitError}
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full font-display text-base"
            disabled={submitOrder.isPending}
            data-ocid="checkout.submit_button"
          >
            {submitOrder.isPending ? (
              <span
                className="flex items-center gap-2"
                data-ocid="checkout.loading_state"
              >
                <svg
                  className="animate-spin w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  role="img"
                  aria-label="Loading"
                >
                  <title>Loading</title>
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Processing Order…
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Complete Purchase <ChevronRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </form>

        {/* Right column — order summary */}
        <div className="lg:col-span-2">
          <Card className="sticky top-6 border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-lg">
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {carLoading ? (
                <div
                  className="space-y-3"
                  data-ocid="checkout.car_summary.loading_state"
                >
                  <Skeleton className="h-40 w-full rounded" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ) : car ? (
                <>
                  {car.imageUrls[0] && (
                    <img
                      src={car.imageUrls[0]}
                      alt={`${car.make} ${car.model}`}
                      className="w-full h-40 object-cover rounded border border-border"
                    />
                  )}
                  <div>
                    <p className="font-display font-bold text-lg leading-tight">
                      {Number(car.year)} {car.make} {car.model}
                    </p>
                    <p className="text-muted-foreground text-sm mt-1">
                      {Number(car.mileage).toLocaleString()} miles
                    </p>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Vehicle Price
                    </span>
                    <span className="font-bold text-foreground">
                      {formatPrice(car.price)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Taxes & Fees</span>
                    <span>Included</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-display font-bold text-xl text-primary">
                      {formatPrice(car.price)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground border-t border-border pt-3 mt-2">
                    Delivery within 5–7 business days after order confirmation.
                  </p>
                </>
              ) : (
                <p
                  className="text-muted-foreground text-sm"
                  data-ocid="checkout.car_summary.error_state"
                >
                  Unable to load car details.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
