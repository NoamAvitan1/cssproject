import { array, number, object, string } from "yup";

export const moduleObject = object({
    title: string().max(20).required(),
    access_type: string().oneOf(["public", "paid", "private"]).required(),
    price: number().required(),
    description: string().max(200).required(),
    css: string().min(5).required(),
    html: array().of(string().min(5)).min(1).max(4),
    examples_count: number().positive().max(4),
    user_id: string().required()
  });