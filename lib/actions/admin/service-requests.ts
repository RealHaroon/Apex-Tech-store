"use server";

import { revalidatePath } from "next/cache";
import { RequestStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import type { ActionResult } from "@/lib/actions/admin/categories";

export async function updateServiceRequestStatus(
  id: string,
  status: RequestStatus,
): Promise<ActionResult> {
  await requireAdmin();
  if (!Object.values(RequestStatus).includes(status)) {
    return { success: false, error: "Invalid status." };
  }
  await prisma.serviceRequest.update({ where: { id }, data: { status } });
  revalidatePath("/admin/service-requests");
  revalidatePath(`/admin/service-requests/${id}`);
  return { success: true };
}
