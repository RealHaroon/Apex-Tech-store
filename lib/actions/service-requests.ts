"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const serviceRequestSchema = z.object({
  service: z.enum([
    "SOFTWARE_LICENSING",
    "SETUP_ACTIVATION",
    "MENTORSHIP",
    "PC_REPAIR",
    "OTHER",
  ]),
  fullName: z.string().trim().min(2, "Enter your full name"),
  phone: z.string().trim().min(7, "Enter a valid phone number"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email")
    .optional()
    .or(z.literal("")),
  address: z.string().trim().optional().or(z.literal("")),
  preferredDate: z.string().trim().optional().or(z.literal("")),
  preferredTime: z.string().trim().optional().or(z.literal("")),
  details: z.string().trim().min(10, "Tell us a bit more about what you need"),
});

export type ServiceRequestInput = z.infer<typeof serviceRequestSchema>;

export type ServiceRequestResult =
  | { success: true; requestNumber: string }
  | { success: false; error: string };

export async function createServiceRequest(
  input: ServiceRequestInput,
): Promise<ServiceRequestResult> {
  const parsed = serviceRequestSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }
  const data = parsed.data;

  const requestCount = await prisma.serviceRequest.count();
  const requestNumber = `APX-SR-${String(requestCount + 1).padStart(6, "0")}`;

  await prisma.serviceRequest.create({
    data: {
      requestNumber,
      service: data.service,
      fullName: data.fullName,
      phone: data.phone,
      email: data.email || null,
      address: data.address || null,
      preferredDate: data.preferredDate ? new Date(data.preferredDate) : null,
      preferredTime: data.preferredTime || null,
      details: data.details,
    },
  });

  return { success: true, requestNumber };
}
