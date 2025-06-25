import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// ✅ ESM-compatible __dirname resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load .env
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// ✅ Export all environment variables
export const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
export const RAZORPAY_SECRET = process.env.RAZORPAY_SECRET;
export const JWT_SECRET = process.env.JWT_SECRET;
export const MONGODB_URI = process.env.MONGODB_URI;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_SECRET_KEY = process.env.CLOUDINARY_SECRET_KEY;
export const CURRENCY = process.env.CURRENCY || "INR";
