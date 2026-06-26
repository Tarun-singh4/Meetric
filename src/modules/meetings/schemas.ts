import {z} from "zod";

export const meetingsInsetSchema=z.object({
    name:z.string().min(1,{message:"name is required"}),
    agentId:z.string().min(1,{message:"Agent is required"})
})

export const meetingsUpdateSchema = meetingsInsetSchema.extend({
  id: z.string().min(1, { message: "Id is required" }),
});