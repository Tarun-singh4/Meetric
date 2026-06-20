import {createTRPCRouter, baseProcedure} from "@/src/trpc/init";
import {db} from "@/src/db";
import {agents} from "@/src/db/schema";



export const agentsRouter=createTRPCRouter({

    getMany:baseProcedure.query(async()=>{
        const data =await db.select().from(agents);

        return data;
    })
})