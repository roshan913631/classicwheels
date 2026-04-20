export type { Car, Inquiry, Order, OrderInput } from "../backend.d";

export type InquiryStatus = "new" | "pending" | "replied" | "closed";

export interface InquiryFormData {
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  message: string;
}

export interface PaymentFormData {
  cardNumber: string;
  expiry: string;
  cvc: string;
}

export interface CheckoutFormData {
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  payment: PaymentFormData;
}
