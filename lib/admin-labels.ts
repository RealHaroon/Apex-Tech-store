import type { OrderStatus, PaymentMethod, RequestStatus } from "@prisma/client";

type BadgeColor = "amber" | "blue" | "indigo" | "green" | "gray" | "red";

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  FULFILLED: "Fulfilled",
  CANCELLED: "Cancelled",
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, BadgeColor> = {
  PENDING: "amber",
  CONFIRMED: "blue",
  FULFILLED: "green",
  CANCELLED: "red",
};

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  COD: "Cash on Delivery",
  BANK_TRANSFER: "Bank Transfer",
};

export const REQUEST_STATUS_LABELS: Record<RequestStatus, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  SCHEDULED: "Scheduled",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export const REQUEST_STATUS_COLORS: Record<RequestStatus, BadgeColor> = {
  NEW: "amber",
  CONTACTED: "blue",
  SCHEDULED: "indigo",
  COMPLETED: "green",
  CANCELLED: "red",
};
