import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate, useParams } from "@tanstack/react-router";
import { Calendar, CheckCircle2, Home, Phone, Truck } from "lucide-react";
import { motion } from "motion/react";
import { useCar } from "../hooks/useCars";
import { useOrderById } from "../hooks/useOrders";

function formatPrice(price: bigint): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(price));
}

function formatOrderDate(ts: bigint): string {
  const ms = Number(ts) / 1_000_000;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(ms));
}

const steps = [
  {
    icon: CheckCircle2,
    label: "Order Received",
    desc: "Your order has been confirmed",
  },
  {
    icon: Phone,
    label: "We'll Contact You",
    desc: "Our team will reach out within 24 hours",
  },
  {
    icon: Truck,
    label: "Vehicle Delivery",
    desc: "Delivery within 5–7 business days",
  },
];

export default function OrderConfirmation() {
  const { orderId } = useParams({ strict: false }) as { orderId: string };
  const navigate = useNavigate();

  const { data: order, isLoading: orderLoading } = useOrderById(orderId);
  const { data: car, isLoading: carLoading } = useCar(order?.carId ?? "");

  const isLoading = orderLoading || (!!order && carLoading);

  return (
    <div
      className="max-w-2xl mx-auto px-4 py-12"
      data-ocid="order_confirmation.page"
    >
      {isLoading ? (
        <div className="space-y-6" data-ocid="order_confirmation.loading_state">
          <Skeleton className="h-20 w-20 rounded-full mx-auto" />
          <Skeleton className="h-8 w-2/3 mx-auto" />
          <Skeleton className="h-4 w-1/2 mx-auto" />
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>
      ) : order ? (
        <>
          {/* Success badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="flex flex-col items-center text-center mb-10"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mb-5">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h1 className="font-display text-3xl font-bold mb-2">
              Order Confirmed!
            </h1>
            <p className="text-muted-foreground max-w-sm">
              Thank you,{" "}
              <span className="text-foreground font-semibold">
                {order.buyerName}
              </span>
              . Your purchase has been received and is being processed.
            </p>
          </motion.div>

          {/* Order details card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            <Card
              className="border-border bg-card mb-6"
              data-ocid="order_confirmation.card"
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                      Order ID
                    </p>
                    <p className="font-mono text-sm font-bold mt-0.5 break-all">
                      {order.orderId}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                      Date
                    </p>
                    <p className="text-sm mt-0.5 flex items-center gap-1 justify-end">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatOrderDate(order.createdAt)}
                    </p>
                  </div>
                </div>

                <Separator />

                {car && (
                  <div className="flex items-center gap-4">
                    {car.imageUrls[0] && (
                      <img
                        src={car.imageUrls[0]}
                        alt={`${car.make} ${car.model}`}
                        className="w-20 h-16 object-cover rounded border border-border shrink-0"
                      />
                    )}
                    <div className="min-w-0">
                      <p className="font-display font-bold text-base leading-tight">
                        {Number(car.year)} {car.make} {car.model}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {Number(car.mileage).toLocaleString()} miles
                      </p>
                    </div>
                  </div>
                )}

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                      Amount Paid
                    </p>
                    <p className="font-display text-2xl font-bold text-primary mt-0.5">
                      {formatPrice(order.paymentAmount)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                      Status
                    </p>
                    <span className="inline-block mt-1 px-3 py-0.5 bg-primary/10 text-primary border border-primary/30 rounded-full text-xs font-semibold capitalize">
                      {order.orderStatus}
                    </span>
                  </div>
                </div>

                <div className="bg-muted/40 rounded p-3 text-sm text-muted-foreground">
                  Confirmation sent to{" "}
                  <span className="text-foreground font-medium">
                    {order.buyerEmail}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* What's next steps */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mb-8"
          >
            <h2 className="font-display text-lg font-bold mb-4">
              What Happens Next
            </h2>
            <div className="space-y-3">
              {steps.map((step, i) => (
                <div
                  key={step.label}
                  className="flex items-start gap-4 p-4 rounded-lg border border-border bg-card"
                  data-ocid={`order_confirmation.step.${i + 1}`}
                >
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <step.icon className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{step.label}</p>
                    <p className="text-muted-foreground text-xs mt-0.5">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => navigate({ to: "/" })}
              data-ocid="order_confirmation.browse_more_button"
            >
              <Home className="w-4 h-4 mr-2" />
              Browse More Cars
            </Button>
          </div>
        </>
      ) : (
        <div
          className="text-center py-16"
          data-ocid="order_confirmation.error_state"
        >
          <p className="text-muted-foreground mb-4">
            Order not found or still loading.
          </p>
          <Button
            onClick={() => navigate({ to: "/" })}
            data-ocid="order_confirmation.home_button"
          >
            Return Home
          </Button>
        </div>
      )}
    </div>
  );
}
