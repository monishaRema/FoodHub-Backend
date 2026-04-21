import "dotenv/config";
import z from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  PORT: z.coerce.number().int().positive().default(5000),
  NODE_ENV: z.enum(["DEV", "PROD", "TEST"]).default("DEV"),
  JWT_ACCESS_TOKEN_SECRET: z
    .string()
    .min(1, "JWT_ACCESS_TOKEN_SECRET is required"),
  JWT_REFRESH_TOKEN_SECRET: z
    .string()
    .min(1, "JWT_REFRESH_TOKEN_SECRET is required"),

  JWT_REFRESH_TOKEN_EXPIRED_IN: z.string().default("7d"),
  JWT_ACCESS_TOKEN_EXPIRED_IN: z.string().default("1h"),
  BCRYPT_SALT_ROUNDS: z.coerce.number().int().positive().default(10),
  FRONTEND_URL: z.string().min(1, "Frontend Url is required"),
  isProduction: z.boolean().optional().default(false),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const formatted = z.flattenError(parsedEnv.error);

  console.error("Invalid environment variables:");

  console.error(formatted.fieldErrors);
  console.error(formatted.formErrors);

  throw new Error("Invalid environment variables");
}

parsedEnv.data.isProduction = parsedEnv.data.NODE_ENV === "PROD"

export const config = parsedEnv.data
