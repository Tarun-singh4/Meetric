"use client";


import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import {useTRPC} from "@/src/trpc/client";
import {useSuspenseQuery} from "@tanstack/react-query";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useAgentsFilters } from "../../hooks/use-agents-filter";

import { DataPagination } from "../components/data-pagination";
import { useRouter } from "next/navigation";

export const AgentsView=()=>  {
     const [filters, setFilters] = useAgentsFilters();

    const trpc=useTRPC();
    const {data}=useSuspenseQuery(trpc.agents.getMany.queryOptions({
        ...filters,
    }));

    const router=useRouter();

    return(
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
            <DataTable 
            data={data.items}
             columns={columns}
             onRowClick={(row)=> router.push(`/agents/${row.id}`)}
             />
                 <DataPagination
                        page={filters.page}
                        totalPages={data.totalPages}
                        onPageChange={(page) => setFilters({ page })}
                    />
            {data.items.length==0 && (
                <EmptyState
                    title="create your first agent"
                    description="create an agent to join your meetings. Each 
                    agent will follow your instructions and can interact with 
                    participants during the call."
                />
            )}
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