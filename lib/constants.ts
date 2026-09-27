export const BRAND_NAME = "Apex Tech Store";
export const WHATSAPP_NUMBER = "923341504177";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
export const INSTAGRAM_HANDLE = "@apextechstore_";
export const INSTAGRAM_LINK = "https://instagram.com/apextechstore_";
export const LOCATION = "Hyderabad, Sindh";
export const HOURS = "Mon–Sat, 10am–8pm";

export const SERVICE_TYPE_LABELS = {
  SOFTWARE_LICENSING: "Genuine software licensing",
  SETUP_ACTIVATION: "Setup & activation",
  MENTORSHIP: "Skill mentorship",
  PC_REPAIR: "PC repair & support",
  OTHER: "Something else",
} as const;

export type ServiceTypeKey = keyof typeof SERVICE_TYPE_LABELS;
