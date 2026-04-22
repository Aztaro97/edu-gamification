import { betterAuth } from "better-auth";
import { Pool } from "pg";

const dialect = new Pool({
  connectionString: process.env.POSTGRES_URL!,
});

export const auth = betterAuth({
  database: { dialect, type: "postgresql" },
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000/",
  emailAndPassword: { enabled: true },
});
