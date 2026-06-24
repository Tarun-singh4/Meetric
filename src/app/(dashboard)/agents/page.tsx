
import { getQueryClient,trpc } from "@/src/trpc/server";
import {dehydrate,HydrationBoundary} from "@tanstack/react-query";
import { Suspense } from "react";
import { 
  AgentsView, 
  AgentsViewError, 
  AgentsViewLoading
} from "@/src/modules/agents/ui/views/agents-view";
import { ErrorBoundary } from "react-error-boundary";
import {AgentsListHeader} from "@/src/modules/agents/ui/components/agents-list-header"
import {auth} from "@/src/lib/auth";
import {headers} from "next/headers";
import { redirect } from "next/navigation";
import { loadSearchParams } from "@/src/modules/agents/params";
import type { SearchParams } from "nuqs";

interface Props {
  searchParams: Promise<SearchParams>;
};

const Page= async ({ searchParams }: Props) => {

   const filters = await loadSearchParams(searchParams);
const session=await auth.api.getSession({
    headers: await headers()
  });

  if(!session){
    redirect("/auth/sign-in");
  }

    const queryClient=getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({
      ...filters,
    }));


    return(
        <>
        <AgentsListHeader/>
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<AgentsViewLoading />}>
                <ErrorBoundary fallback={<AgentsViewError />}>
                    <AgentsView />
                </ErrorBoundary>
        </Suspense>
        </HydrationBoundary>
        
        
        </>
    )
}
 
export default Page;