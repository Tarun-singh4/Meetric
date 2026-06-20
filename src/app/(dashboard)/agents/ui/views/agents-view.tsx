"use client";


import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import {useTRPC} from "@/src/trpc/client";
import {useSuspenseQuery} from "@tanstack/react-query";

export const AgentsView=()=>  {
    const trpc=useTRPC();
    const {data}=useSuspenseQuery(trpc.agents.getMany.queryOptions());



    return(
        <div>
            {JSON.stringify(data,null,2)}
        </div>
    )
}

export const AgentsViewLoading=()=>  {
    return(
        <LoadingState title="Loading agents" description="This may take few seconds"/>
    )
}

export const AgentsViewError=()=>{
    return(
        <ErrorState 
        title="Failed to Load Agents"
        description="Something went wrong"/>
    )
}