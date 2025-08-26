import * as z from "zod";

export const registerFormSchema = z.object({
  firstName: z.string().min(3, "First name must be at least 3 characters long"),
  lastName: z.string().optional(),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  phoneNumber: z
    .string()
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, "Invalid phone number"),
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  zipCode: z.string().min(1, "ZipCode is required"),
});

export const createParcelFormSchema = z.object({
  firstName: z.string().min(3, "First name must be at least 3 characters long"),
  email: z.email("Invalid email address"),
  phoneNumber: z
    .string()
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, "Invalid phone number"),
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  zipCode: z.string().min(1, "ZipCode is required"),
  description: z.string().min(1, "Description is required"),
  weightKg: z.number().min(0.1, "Weight must be at least 0.1 kg"),
  isFragile: z.boolean().optional(),
});

export const updateStatusSchema = z.object({
  status: z.string().min(1, "status is required"),
});
