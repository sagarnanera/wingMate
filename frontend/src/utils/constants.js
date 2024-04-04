// constants for the frontend

const env = import.meta.env;

export const API_URL =
  env.VITE_ENVIRONMENT === "production"
    ? env.VITE_PROD_API_URL
    : env.VITE_DEV_API_URL;

export const ROLES = {
  SECRETORY: "secretory",
  WING_ADMIN: "wing admin",
  HOUSE_OWNER: "house owner",
  RESIDENT: "resident",
};
