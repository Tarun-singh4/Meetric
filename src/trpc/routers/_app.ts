import {agentsRouter} from "@/src/modules/agents/server/procedures";
import {  createTRPCRouter } from '../init';
import { meetingRouter } from "@/src/modules/meetings/server/procedures";
 
export const appRouter = createTRPCRouter({
  agents: agentsRouter,
  meetings:meetingRouter

});
 
// export type definition of API
export type AppRouter = typeof appRouter;