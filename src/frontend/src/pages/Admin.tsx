import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";
import type { CarInput, Inquiry, Order } from "../backend.d";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useCars } from "../hooks/useCars";
import {
  useDeleteInquiry,
  useInquiries,
  useIsAdmin,
  useUpdateInquiryStatus,
} from "../hooks/useInquiries";
import {
  useDeleteOrder,
  useGetOrders,
  useUpdateOrderStatus,
} from "../hooks/useOrders";

// ─── Types ────────────────────────────────────────────────────────────────────

type InquiryStatus = "new" | "contacted" | "resolved";
const INQUIRY_STATUS_OPTIONS: InquiryStatus[] = [
  "new",
  "contacted",
  "resolved",
];

type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered";
const ORDER_STATUS_OPTIONS: OrderStatus[] = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
];

type AdminTab = "inquiries" | "orders" | "sell";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(ts: bigint): string {
  const ms = Number(ts);
  const d = new Date(ms > 1e13 ? ms / 1_000_000 : ms);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function inquiryStatusLabel(s: string) {
  if (s === "contacted") return "Contacted";
  if (s === "resolved") return "Resolved";
  return "New";
}

function orderStatusLabel(s: string) {
  const map: Record<string, string> = {
    pending: "Pending",
    confirmed: "Confirmed",
    shipped: "Shipped",
    delivered: "Delivered",
  };
  return map[s.toLowerCase()] ?? s;
}

function formatPrice(n: bigint) {
  return `$${Number(n).toLocaleString()}`;
}

// ─── StatusBadge ──────────────────────────────────────────────────────────────

function StatusBadge({
  status,
  type,
}: { status: string; type: "inquiry" | "order" }) {
  const s = status.toLowerCase();
  let cls = "";
  if (type === "inquiry") {
    if (s === "new") cls = "bg-primary text-primary-foreground border-primary";
    else if (s === "contacted")
      cls =
        "bg-[oklch(0.75_0.12_75)] text-[oklch(0.2_0.05_40)] border-[oklch(0.65_0.12_75)]";
    else if (s === "resolved")
      cls =
        "bg-[oklch(0.52_0.1_145)] text-[oklch(0.97_0.01_85)] border-[oklch(0.45_0.1_145)]";
    else cls = "bg-muted text-muted-foreground border-border";
  } else {
    if (s === "pending")
      cls = "bg-primary text-primary-foreground border-primary";
    else if (s === "confirmed")
      cls =
        "bg-[oklch(0.55_0.14_220)] text-[oklch(0.97_0.01_85)] border-[oklch(0.48_0.14_220)]";
    else if (s === "shipped")
      cls =
        "bg-[oklch(0.6_0.12_75)] text-[oklch(0.2_0.05_40)] border-[oklch(0.55_0.12_75)]";
    else if (s === "delivered")
      cls =
        "bg-[oklch(0.52_0.1_145)] text-[oklch(0.97_0.01_85)] border-[oklch(0.45_0.1_145)]";
    else cls = "bg-muted text-muted-foreground border-border";
  }
  return (
    <span
      className={`inline-block border-2 font-display font-bold uppercase tracking-widest text-xs px-2.5 py-0.5 ${cls}`}
    >
      {type === "inquiry" ? inquiryStatusLabel(s) : orderStatusLabel(s)}
    </span>
  );
}

// ─── DeleteConfirm ────────────────────────────────────────────────────────────

function DeleteConfirm({
  onConfirm,
  onCancel,
  isDeleting,
  label,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
  label: string;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 backdrop-blur-sm"
      data-ocid="admin.delete_dialog"
    >
      <div className="bg-card border-2 border-primary p-8 max-w-sm w-full mx-4 shadow-2xl">
        <h2 className="font-display font-bold text-xl uppercase tracking-widest text-foreground mb-3">
          Confirm Delete
        </h2>
        <p className="font-body text-sm text-muted-foreground mb-6 leading-relaxed">
          This {label} will be permanently removed. This action cannot be
          undone.
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            data-ocid="admin.delete_dialog.confirm_button"
            className="flex-1 font-display font-bold uppercase tracking-widest text-xs py-2.5 px-4 border-2 border-destructive bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-smooth disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Yes, Delete"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            data-ocid="admin.delete_dialog.cancel_button"
            className="flex-1 font-display font-bold uppercase tracking-widest text-xs py-2.5 px-4 border-2 border-border text-foreground hover:border-primary hover:text-primary transition-smooth disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── InquiryRow ───────────────────────────────────────────────────────────────

function InquiryRow({
  inquiry,
  carName,
  index,
  onStatusChange,
  onDeleteRequest,
  isUpdating,
}: {
  inquiry: Inquiry;
  carName: string;
  index: number;
  onStatusChange: (id: string, status: string) => void;
  onDeleteRequest: (id: string) => void;
  isUpdating: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const rowNum = index + 1;
  return (
    <>
      <tr
        className="border-b border-primary/20 hover:bg-primary/5 transition-smooth cursor-pointer select-none"
        onClick={() => setExpanded((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setExpanded((v) => !v);
        }}
        tabIndex={0}
        aria-expanded={expanded}
        data-ocid={`admin.inquiry_row.${rowNum}`}
      >
        <td className="px-4 py-3 font-body text-sm text-foreground min-w-0">
          <span className="line-clamp-1">{carName}</span>
        </td>
        <td className="px-4 py-3 font-body text-sm text-foreground min-w-0">
          <span className="line-clamp-1">{inquiry.buyerName}</span>
        </td>
        <td className="px-4 py-3 font-body text-xs text-muted-foreground hidden md:table-cell min-w-0">
          <span className="line-clamp-1">{inquiry.buyerEmail}</span>
        </td>
        <td className="px-4 py-3">
          <StatusBadge status={inquiry.status} type="inquiry" />
        </td>
        <td className="px-4 py-3 font-body text-xs text-muted-foreground hidden lg:table-cell whitespace-nowrap">
          {formatDate(inquiry.createdAt)}
        </td>
        <td className="px-4 py-3 text-center">
          <span className="font-body text-xs text-muted-foreground" aria-hidden>
            {expanded ? "▲" : "▼"}
          </span>
        </td>
      </tr>
      {expanded && (
        <tr
          className="bg-background border-b-2 border-primary/30"
          data-ocid={`admin.inquiry_detail.${rowNum}`}
        >
          <td colSpan={6} className="px-6 py-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">
              <div>
                <div className="font-display text-xs uppercase tracking-widest text-muted-foreground mb-2 border-b border-primary/20 pb-1">
                  Buyer Info
                </div>
                <p className="font-body text-sm font-semibold text-foreground">
                  {inquiry.buyerName}
                </p>
                <p className="font-body text-sm text-muted-foreground">
                  {inquiry.buyerEmail}
                </p>
                {inquiry.buyerPhone && (
                  <p className="font-body text-sm text-muted-foreground">
                    {inquiry.buyerPhone}
                  </p>
                )}
              </div>
              <div>
                <div className="font-display text-xs uppercase tracking-widest text-muted-foreground mb-2 border-b border-primary/20 pb-1">
                  Vehicle
                </div>
                <p className="font-body text-sm text-foreground">{carName}</p>
                <p className="font-body text-xs text-muted-foreground mt-0.5">
                  Ref:{" "}
                  <span className="font-mono">
                    {inquiry.carId.slice(0, 8)}…
                  </span>
                </p>
              </div>
              <div>
                <div className="font-display text-xs uppercase tracking-widest text-muted-foreground mb-2 border-b border-primary/20 pb-1">
                  Message
                </div>
                <p className="font-body text-sm text-foreground leading-relaxed whitespace-pre-wrap line-clamp-5">
                  {inquiry.message || "No message provided."}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-primary/20 flex-wrap">
              <span className="font-display text-xs uppercase tracking-widest text-muted-foreground">
                Status:
              </span>
              {INQUIRY_STATUS_OPTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  disabled={isUpdating || inquiry.status.toLowerCase() === s}
                  onClick={(e) => {
                    e.stopPropagation();
                    onStatusChange(inquiry.id, s);
                  }}
                  data-ocid={`admin.inquiry_status_button.${s}`}
                  className={`font-display text-xs uppercase tracking-widest px-3 py-1.5 border-2 transition-smooth disabled:opacity-50 ${
                    inquiry.status.toLowerCase() === s
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {s}
                </button>
              ))}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteRequest(inquiry.id);
                }}
                data-ocid={`admin.inquiry_delete_button.${rowNum}`}
                className="ml-auto font-display text-xs uppercase tracking-widest px-3 py-1.5 border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-smooth"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

// ─── OrderRow ─────────────────────────────────────────────────────────────────

function OrderRow({
  order,
  carName,
  index,
  onStatusChange,
  onDeleteRequest,
  isUpdating,
}: {
  order: Order;
  carName: string;
  index: number;
  onStatusChange: (orderId: string, status: string) => void;
  onDeleteRequest: (orderId: string) => void;
  isUpdating: boolean;
}) {
  const rowNum = index + 1;
  return (
    <tr
      className="border-b border-primary/20 hover:bg-primary/5 transition-smooth"
      data-ocid={`admin.order_row.${rowNum}`}
    >
      <td className="px-4 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap">
        {order.orderId.slice(0, 8)}…
      </td>
      <td className="px-4 py-3 font-body text-sm text-foreground min-w-0">
        <span className="line-clamp-1">{carName}</span>
      </td>
      <td className="px-4 py-3 font-body text-sm text-foreground min-w-0">
        <span className="line-clamp-1">{order.buyerName}</span>
      </td>
      <td className="px-4 py-3 font-body text-xs text-muted-foreground hidden md:table-cell min-w-0">
        <span className="line-clamp-1">{order.buyerEmail}</span>
      </td>
      <td className="px-4 py-3 font-display font-bold text-sm text-foreground whitespace-nowrap text-right">
        {formatPrice(order.paymentAmount)}
      </td>
      <td className="px-4 py-3">
        <StatusBadge status={order.orderStatus} type="order" />
      </td>
      <td className="px-4 py-3 hidden lg:table-cell">
        <select
          value={order.orderStatus.toLowerCase()}
          disabled={isUpdating}
          onChange={(e) => onStatusChange(order.orderId, e.target.value)}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          data-ocid={`admin.order_status_select.${rowNum}`}
          className="font-display text-xs uppercase tracking-widest bg-background border-2 border-border text-foreground px-2 py-1 focus:border-primary focus:outline-none transition-smooth disabled:opacity-50 cursor-pointer"
        >
          {ORDER_STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {orderStatusLabel(s)}
            </option>
          ))}
        </select>
      </td>
      <td className="px-4 py-3 font-body text-xs text-muted-foreground whitespace-nowrap hidden xl:table-cell">
        {formatDate(order.createdAt)}
      </td>
      <td className="px-4 py-3 text-right">
        <button
          type="button"
          onClick={() => onDeleteRequest(order.orderId)}
          data-ocid={`admin.order_delete_button.${rowNum}`}
          className="font-display text-xs uppercase tracking-widest px-2.5 py-1.5 border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-smooth"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

// ─── SellCarForm ──────────────────────────────────────────────────────────────

interface SellCarFields {
  make: string;
  model: string;
  year: string;
  price: string;
  mileage: string;
  description: string;
  imageUrl1: string;
  imageUrl2: string;
  imageUrl3: string;
}

const EMPTY_SELL_FORM: SellCarFields = {
  make: "",
  model: "",
  year: "",
  price: "",
  mileage: "",
  description: "",
  imageUrl1: "",
  imageUrl2: "",
  imageUrl3: "",
};

function useAddCar() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (car: CarInput) => {
      if (!actor) throw new Error("Not connected");
      return actor.addCar(car);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p
      className="font-body text-xs text-destructive mt-1"
      data-ocid="admin.sell_form.field_error"
    >
      {msg}
    </p>
  );
}

function SellCarForm() {
  const [fields, setFields] = useState<SellCarFields>(EMPTY_SELL_FORM);
  const [errors, setErrors] = useState<Partial<SellCarFields>>({});
  const addCar = useAddCar();

  const set =
    (key: keyof SellCarFields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((f) => ({ ...f, [key]: e.target.value }));

  const validate = (): boolean => {
    const errs: Partial<SellCarFields> = {};
    if (!fields.make.trim()) errs.make = "Make is required";
    if (!fields.model.trim()) errs.model = "Model is required";
    const yr = Number.parseInt(fields.year, 10);
    if (
      !fields.year.trim() ||
      Number.isNaN(yr) ||
      yr < 1886 ||
      yr > new Date().getFullYear() + 1
    )
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const imageUrls = [
      fields.imageUrl1,
      fields.imageUrl2,
      fields.imageUrl3,
    ].filter((u) => u.trim() !== "");
    const car: CarInput = {
      make: fields.make.trim(),
      model: fields.model.trim(),
      year: BigInt(Number.parseInt(fields.year, 10)),
      price: BigInt(Math.round(Number.parseFloat(fields.price))),
      mileage: BigInt(Number.parseInt(fields.mileage, 10)),
      description: fields.description.trim(),
      imageUrls,
    };
    try {
      await addCar.mutateAsync(car);
      toast.success(
        `${fields.year} ${fields.make} ${fields.model} listed successfully!`,
      );
      setFields(EMPTY_SELL_FORM);
      setErrors({});
    } catch {
      toast.error("Failed to list vehicle. Please try again.");
    }
  };

  const inputCls =
    "w-full bg-input border-2 border-border text-foreground font-body text-sm px-3 py-2.5 focus:border-primary focus:outline-none transition-smooth placeholder:text-muted-foreground/60";
  const labelCls =
    "font-display text-xs uppercase tracking-widest text-muted-foreground block mb-1.5";

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto"
      data-ocid="admin.sell_form"
    >
      <p className="font-body text-sm text-muted-foreground mb-8 leading-relaxed">
        Fill out the details below to add a new vehicle to the ClassicWheels
        inventory. All fields except image URLs are required.
      </p>

      {/* Row 1: Make + Model */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div>
          <label htmlFor="sell-make" className={labelCls}>
            Make *
          </label>
          <input
            id="sell-make"
            type="text"
            value={fields.make}
            onChange={set("make")}
            placeholder="e.g. Ford"
            className={inputCls}
            data-ocid="admin.sell_form.make_input"
            onBlur={validate}
          />
          <FieldError msg={errors.make} />
        </div>
        <div>
          <label htmlFor="sell-model" className={labelCls}>
            Model *
          </label>
          <input
            id="sell-model"
            type="text"
            value={fields.model}
            onChange={set("model")}
            placeholder="e.g. Mustang Fastback"
            className={inputCls}
            data-ocid="admin.sell_form.model_input"
            onBlur={validate}
          />
          <FieldError msg={errors.model} />
        </div>
      </div>

      {/* Row 2: Year + Price + Mileage */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
        <div>
          <label htmlFor="sell-year" className={labelCls}>
            Year *
          </label>
          <input
            id="sell-year"
            type="number"
            value={fields.year}
            onChange={set("year")}
            placeholder="e.g. 1967"
            min="1886"
            max={new Date().getFullYear() + 1}
            className={inputCls}
            data-ocid="admin.sell_form.year_input"
            onBlur={validate}
          />
          <FieldError msg={errors.year} />
        </div>
        <div>
          <label htmlFor="sell-price" className={labelCls}>
            Price (USD) *
          </label>
          <input
            id="sell-price"
            type="number"
            value={fields.price}
            onChange={set("price")}
            placeholder="e.g. 65000"
            min="0"
            className={inputCls}
            data-ocid="admin.sell_form.price_input"
            onBlur={validate}
          />
          <FieldError msg={errors.price} />
        </div>
        <div>
          <label htmlFor="sell-mileage" className={labelCls}>
            Mileage *
          </label>
          <input
            id="sell-mileage"
            type="number"
            value={fields.mileage}
            onChange={set("mileage")}
            placeholder="e.g. 42000"
            min="0"
            className={inputCls}
            data-ocid="admin.sell_form.mileage_input"
            onBlur={validate}
          />
          <FieldError msg={errors.mileage} />
        </div>
      </div>

      {/* Description */}
      <div className="mb-5">
        <label htmlFor="sell-description" className={labelCls}>
          Description *
        </label>
        <textarea
          id="sell-description"
          rows={5}
          value={fields.description}
          onChange={set("description")}
          placeholder="Describe the vehicle's condition, history, special features..."
          className={`${inputCls} resize-y min-h-[120px]`}
          data-ocid="admin.sell_form.description_textarea"
          onBlur={validate}
        />
        <FieldError msg={errors.description} />
      </div>

      {/* Image URLs */}
      <div className="mb-8">
        <div className={`${labelCls} mb-3`}>
          Image URLs (optional — up to 3)
        </div>
        <div className="space-y-3">
          {([1, 2, 3] as const).map((n) => {
            const key = `imageUrl${n}` as `imageUrl${typeof n}`;
            return (
              <input
                key={n}
                type="url"
                value={fields[key]}
                onChange={set(key)}
                placeholder={`https://example.com/car-photo-${n}.jpg`}
                className={inputCls}
                data-ocid={`admin.sell_form.image_url_${n}_input`}
              />
            );
          })}
        </div>
      </div>

      {/* Submit */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={addCar.isPending}
          data-ocid="admin.sell_form.submit_button"
          className="font-display font-bold uppercase tracking-widest text-sm px-8 py-3 bg-primary text-primary-foreground border-2 border-primary hover:bg-primary/90 transition-smooth disabled:opacity-50"
        >
          {addCar.isPending ? "Listing Vehicle…" : "List Vehicle for Sale"}
        </button>
        <button
          type="button"
          onClick={() => {
            setFields(EMPTY_SELL_FORM);
            setErrors({});
          }}
          data-ocid="admin.sell_form.reset_button"
          className="font-display text-xs uppercase tracking-widest px-5 py-3 border-2 border-border text-foreground hover:border-primary hover:text-primary transition-smooth"
        >
          Reset
        </button>
      </div>
    </form>
  );
}

// ─── Admin ────────────────────────────────────────────────────────────────────

export default function Admin() {
  const { identity, clear } = useInternetIdentity();
  const queryClient = useQueryClient();
  const {
    data: inquiries,
    isLoading: inquiriesLoading,
    isError: inquiriesError,
  } = useInquiries();
  const {
    data: orders,
    isLoading: ordersLoading,
    isError: ordersError,
  } = useGetOrders();
  const { data: cars } = useCars();
  const { data: isAdminData } = useIsAdmin();
  const updateInquiryStatus = useUpdateInquiryStatus();
  const deleteInquiry = useDeleteInquiry();
  const updateOrderStatus = useUpdateOrderStatus();
  const deleteOrder = useDeleteOrder();

  const [activeTab, setActiveTab] = useState<AdminTab>("inquiries");
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<
    "all" | InquiryStatus
  >("all");
  const [orderSearch, setOrderSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    type: "inquiry" | "order";
  } | null>(null);

  const identityStr = identity?.getPrincipal().toText() ?? "";
  const shortIdentity =
    identityStr.length > 12
      ? `${identityStr.slice(0, 6)}…${identityStr.slice(-4)}`
      : identityStr;

  const carMap = new Map(
    cars?.map((c) => [c.id, `${Number(c.year)} ${c.make} ${c.model}`]),
  );

  // Filtered inquiries
  const filteredInquiries = (inquiries ?? []).filter(
    (i) =>
      inquiryStatusFilter === "all" ||
      i.status.toLowerCase() === inquiryStatusFilter,
  );

  // Filtered orders
  const filteredOrders = (orders ?? []).filter((o) => {
    if (!orderSearch.trim()) return true;
    const q = orderSearch.toLowerCase();
    return (
      o.buyerEmail.toLowerCase().includes(q) ||
      (carMap.get(o.carId) ?? "").toLowerCase().includes(q)
    );
  });

  const handleLogout = () => {
    clear();
    queryClient.clear();
  };

  const handleInquiryStatus = async (id: string, status: string) => {
    try {
      await updateInquiryStatus.mutateAsync({ id, status });
      toast.success(`Status updated to "${status}"`);
    } catch {
      toast.error("Failed to update status.");
    }
  };

  const handleOrderStatus = async (orderId: string, status: string) => {
    try {
      await updateOrderStatus.mutateAsync({ orderId, status });
      toast.success(`Order status updated to "${orderStatusLabel(status)}"`);
    } catch {
      toast.error("Failed to update order status.");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      if (deleteTarget.type === "inquiry") {
        await deleteInquiry.mutateAsync(deleteTarget.id);
        toast.success("Inquiry deleted.");
      } else {
        await deleteOrder.mutateAsync(deleteTarget.id);
        toast.success("Order deleted.");
      }
    } catch {
      toast.error("Failed to delete.");
    } finally {
      setDeleteTarget(null);
    }
  };

  const inquiryCounts = {
    all: inquiries?.length ?? 0,
    new: inquiries?.filter((i) => i.status.toLowerCase() === "new").length ?? 0,
    contacted:
      inquiries?.filter((i) => i.status.toLowerCase() === "contacted").length ??
      0,
    resolved:
      inquiries?.filter((i) => i.status.toLowerCase() === "resolved").length ??
      0,
  };

  const tabs: { id: AdminTab; label: string; count?: number }[] = [
    { id: "inquiries", label: "Inquiries", count: inquiryCounts.all },
    { id: "orders", label: "Orders", count: orders?.length ?? 0 },
    { id: "sell", label: "Sell a Car" },
  ];

  const isDeleting = deleteInquiry.isPending || deleteOrder.isPending;

  return (
    <div className="min-h-screen bg-background" data-ocid="admin.page">
      {/* Delete confirmation overlay */}
      {deleteTarget && (
        <DeleteConfirm
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
          isDeleting={isDeleting}
          label={deleteTarget.type === "inquiry" ? "inquiry" : "order"}
        />
      )}

      {/* Admin header */}
      <div
        className="bg-accent text-accent-foreground border-b-2 border-primary px-4 sm:px-6 lg:px-8 py-5"
        data-ocid="admin.header"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl uppercase tracking-widest leading-tight">
              Admin Dashboard
            </h1>
            <p className="font-body text-accent-foreground/70 text-sm mt-0.5">
              Inventory &amp; Order Management — The Vintage Garage
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {shortIdentity && (
              <div
                className="font-mono text-xs text-accent-foreground/70 bg-accent-foreground/10 border border-accent-foreground/20 px-3 py-1.5 truncate max-w-[180px]"
                title={identityStr}
                data-ocid="admin.identity_badge"
              >
                {shortIdentity}
              </div>
            )}
            {isAdminData !== undefined && (
              <span
                className={`font-display text-xs uppercase tracking-widest px-2.5 py-1 border-2 ${isAdminData ? "border-[oklch(0.52_0.1_145)] text-[oklch(0.52_0.1_145)]" : "border-muted-foreground text-muted-foreground"}`}
              >
                {isAdminData ? "Admin" : "Staff"}
              </span>
            )}
            <button
              type="button"
              onClick={handleLogout}
              data-ocid="admin.logout_button"
              className="font-display font-bold uppercase tracking-widest text-xs px-4 py-2 border-2 border-accent-foreground/40 text-accent-foreground hover:bg-accent-foreground/10 transition-smooth"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "All Inquiries",
              value: inquiryCounts.all,
              colorCls: "text-foreground",
            },
            {
              label: "New Inquiries",
              value: inquiryCounts.new,
              colorCls: "text-primary",
            },
            {
              label: "Total Orders",
              value: orders?.length ?? 0,
              colorCls: "text-[oklch(0.55_0.14_220)]",
            },
            {
              label: "Cars Listed",
              value: cars?.length ?? 0,
              colorCls: "text-[oklch(0.52_0.1_145)]",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-card border-2 border-primary p-5"
              data-ocid={`admin.stat.${stat.label.replace(/\s+/g, "_").toLowerCase()}`}
            >
              <div
                className={`font-display font-bold text-3xl ${stat.colorCls}`}
              >
                {stat.value}
              </div>
              <div className="font-display text-xs uppercase tracking-widest text-muted-foreground mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tab navigation */}
        <div
          className="flex border-b-2 border-primary mb-0"
          data-ocid="admin.tabs"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              data-ocid={`admin.tab.${tab.id}`}
              className={`font-display font-bold uppercase tracking-widest text-xs px-5 py-3.5 border-2 border-b-0 -mb-0.5 transition-smooth ${
                activeTab === tab.id
                  ? "bg-card border-primary text-foreground border-b-card"
                  : "bg-transparent border-transparent text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
              style={
                activeTab === tab.id
                  ? { borderBottomColor: "var(--color-card)" }
                  : {}
              }
            >
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={`ml-2 font-mono text-xs px-1.5 py-0.5 ${activeTab === tab.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ─── INQUIRIES TAB ─────────────────────────────────────────────── */}
        {activeTab === "inquiries" && (
          <div
            className="bg-card border-2 border-primary border-t-0"
            data-ocid="admin.inquiries_panel"
          >
            <div className="bg-accent/20 border-b-2 border-primary px-6 py-4 flex items-center justify-between flex-wrap gap-3">
              <h2 className="font-display font-bold text-lg uppercase tracking-widest text-foreground">
                Buyer Inquiries
              </h2>
              <div
                className="flex items-center gap-1 flex-wrap"
                data-ocid="admin.inquiry_filter_tabs"
              >
                {(["all", ...INQUIRY_STATUS_OPTIONS] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setInquiryStatusFilter(s)}
                    data-ocid={`admin.inquiry_filter.${s}`}
                    className={`font-display text-xs uppercase tracking-widest px-3 py-1.5 border-2 transition-smooth ${
                      inquiryStatusFilter === s
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-transparent text-foreground border-border hover:border-primary"
                    }`}
                  >
                    {s === "all"
                      ? `All (${inquiryCounts.all})`
                      : `${s} (${inquiryCounts[s]})`}
                  </button>
                ))}
              </div>
            </div>

            {inquiriesLoading && (
              <div
                className="flex items-center justify-center py-16"
                data-ocid="admin.inquiries.loading_state"
              >
                <div className="text-center">
                  <LoadingSpinner size="lg" />
                  <p className="font-display text-xs uppercase tracking-widest text-muted-foreground mt-4">
                    Loading inquiries…
                  </p>
                </div>
              </div>
            )}
            {!inquiriesLoading && inquiriesError && (
              <div
                className="text-center py-16 px-6"
                data-ocid="admin.inquiries.error_state"
              >
                <div className="text-3xl mb-3">⚠</div>
                <p className="font-display font-bold text-lg uppercase tracking-wide text-foreground mb-2">
                  Failed to Load
                </p>
                <p className="font-body text-muted-foreground text-sm">
                  Could not retrieve inquiries. Please refresh and try again.
                </p>
              </div>
            )}
            {!inquiriesLoading &&
              !inquiriesError &&
              filteredInquiries.length === 0 && (
                <div
                  className="text-center py-16 px-6"
                  data-ocid="admin.inquiries.empty_state"
                >
                  <div className="text-4xl mb-4">📬</div>
                  <p className="font-display font-bold text-xl uppercase tracking-wide text-foreground mb-2">
                    No Inquiries
                  </p>
                  <p className="font-body text-muted-foreground text-sm">
                    {inquiryStatusFilter === "all"
                      ? "No customer inquiries have been received yet."
                      : `No inquiries with status "${inquiryStatusFilter}" found.`}
                  </p>
                </div>
              )}
            {!inquiriesLoading &&
              !inquiriesError &&
              filteredInquiries.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full" data-ocid="admin.inquiries_table">
                    <thead>
                      <tr className="border-b-2 border-primary/30 bg-muted/20">
                        {(
                          [
                            "Vehicle",
                            "Buyer",
                            "Email",
                            "Status",
                            "Date",
                            "expand",
                          ] as const
                        ).map((h) => (
                          <th
                            key={h}
                            className={`px-4 py-3 text-left font-display text-xs uppercase tracking-widest text-muted-foreground ${h === "Email" ? "hidden md:table-cell" : ""} ${h === "Date" ? "hidden lg:table-cell" : ""} ${h === "expand" ? "w-8" : ""}`}
                          >
                            {h === "expand" ? "" : h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInquiries.map((inquiry: Inquiry, i: number) => (
                        <InquiryRow
                          key={inquiry.id}
                          inquiry={inquiry}
                          carName={carMap.get(inquiry.carId) ?? inquiry.carId}
                          index={i}
                          onStatusChange={handleInquiryStatus}
                          onDeleteRequest={(id) =>
                            setDeleteTarget({ id, type: "inquiry" })
                          }
                          isUpdating={updateInquiryStatus.isPending}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
          </div>
        )}

        {/* ─── ORDERS TAB ────────────────────────────────────────────────── */}
        {activeTab === "orders" && (
          <div
            className="bg-card border-2 border-primary border-t-0"
            data-ocid="admin.orders_panel"
          >
            <div className="bg-accent/20 border-b-2 border-primary px-6 py-4 flex items-center justify-between flex-wrap gap-3">
              <h2 className="font-display font-bold text-lg uppercase tracking-widest text-foreground">
                Customer Orders
              </h2>
              <div className="relative">
                <input
                  type="search"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="Search by email or car name…"
                  data-ocid="admin.orders.search_input"
                  className="font-body text-sm bg-input border-2 border-border text-foreground pl-3 pr-8 py-1.5 focus:border-primary focus:outline-none transition-smooth placeholder:text-muted-foreground/60 w-64"
                />
                {orderSearch && (
                  <button
                    type="button"
                    onClick={() => setOrderSearch("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {ordersLoading && (
              <div
                className="flex items-center justify-center py-16"
                data-ocid="admin.orders.loading_state"
              >
                <div className="text-center">
                  <LoadingSpinner size="lg" />
                  <p className="font-display text-xs uppercase tracking-widest text-muted-foreground mt-4">
                    Loading orders…
                  </p>
                </div>
              </div>
            )}
            {!ordersLoading && ordersError && (
              <div
                className="text-center py-16 px-6"
                data-ocid="admin.orders.error_state"
              >
                <div className="text-3xl mb-3">⚠</div>
                <p className="font-display font-bold text-lg uppercase tracking-wide text-foreground mb-2">
                  Failed to Load
                </p>
                <p className="font-body text-muted-foreground text-sm">
                  Could not retrieve orders. Please refresh and try again.
                </p>
              </div>
            )}
            {!ordersLoading && !ordersError && filteredOrders.length === 0 && (
              <div
                className="text-center py-16 px-6"
                data-ocid="admin.orders.empty_state"
              >
                <div className="text-4xl mb-4">🛒</div>
                <p className="font-display font-bold text-xl uppercase tracking-wide text-foreground mb-2">
                  No Orders
                </p>
                <p className="font-body text-muted-foreground text-sm">
                  {orderSearch
                    ? `No orders matching "${orderSearch}".`
                    : "No customer orders have been placed yet."}
                </p>
              </div>
            )}
            {!ordersLoading && !ordersError && filteredOrders.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full" data-ocid="admin.orders_table">
                  <thead>
                    <tr className="border-b-2 border-primary/30 bg-muted/20">
                      {(
                        [
                          "Order ID",
                          "Vehicle",
                          "Buyer",
                          "Email",
                          "Amount",
                          "Status",
                          "Update Status",
                          "Date",
                          "actions",
                        ] as const
                      ).map((h) => (
                        <th
                          key={h}
                          className={`px-4 py-3 text-left font-display text-xs uppercase tracking-widest text-muted-foreground ${h === "Email" ? "hidden md:table-cell" : ""} ${h === "Amount" ? "text-right" : ""} ${h === "Update Status" ? "hidden lg:table-cell" : ""} ${h === "Date" ? "hidden xl:table-cell" : ""}`}
                        >
                          {h === "actions" ? "" : h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order: Order, i: number) => (
                      <OrderRow
                        key={order.orderId}
                        order={order}
                        carName={carMap.get(order.carId) ?? order.carId}
                        index={i}
                        onStatusChange={handleOrderStatus}
                        onDeleteRequest={(id) =>
                          setDeleteTarget({ id, type: "order" })
                        }
                        isUpdating={updateOrderStatus.isPending}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ─── SELL CAR TAB ──────────────────────────────────────────────── */}
        {activeTab === "sell" && (
          <div
            className="bg-card border-2 border-primary border-t-0"
            data-ocid="admin.sell_panel"
          >
            <div className="bg-accent/20 border-b-2 border-primary px-6 py-4">
              <h2 className="font-display font-bold text-lg uppercase tracking-widest text-foreground">
                List a Vehicle for Sale
              </h2>
              <p className="font-body text-xs text-muted-foreground mt-1">
                Add a new classic car to the ClassicWheels inventory
              </p>
            </div>
            <div className="px-6 py-8">
              <SellCarForm />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
