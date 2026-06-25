import {z} from "zod";

export const agentsInsetSchema=z.object({
    name:z.string().min(1,{message:"name is required"}),
    instructions:z.string().min(1,{message:"Instructions are required"})
})

export const agentsUpdateSchema = agentsInsetSchema.extend({
  id: z.string().min(1, { message: "Id is required" }),
});