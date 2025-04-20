import * as z from "zod";

export const SignValidation = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().min(10),
  name: z.string().min(2),
  laneAddress: z.string().min(5),
  country: z.string().min(2),
  city: z.string().min(2),
  pincode: z.string().min(4),
  state: z.string().min(2),
});
