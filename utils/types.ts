import { z } from "zod";

export const userSignupSchema = z.object({
  image: z.string().url(),
  name: z.string().min(3, { message: "Name must be 3 characters long" }),
  email: z.string().email({ message: "Email must be valid" }),
  phone: z
    .string()
    .regex(/^\d{10}$/, { message: "Phone number must be 10 digits" }),
  linkedinUrl: z
    .string()
    .regex(/^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+$/, {
      message: "Invalid LinkedIn URL",
    }),
  xUrl: z
    .string()
    .regex(/^https:\/\/x\.com\/[a-zA-Z0-9_\\-]+$/, "Invalid X URL"),
  password: z
    .string()
    .min(5, { message: "Password must be 5 characters long" }),
});

export interface IUser {
  id: string;
  image: string;
  name: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  xUrl: string;
  password: string;
  role: string;
}

export const loginSchema = z.object({
  email: z.string().email({ message: "Email must be valid" }),
  password: z.string(),
});
