import { 
  MeetingsView, 
  MeetingsViewError, 
  MeetingsViewLoading
} from "@/src/modules/meetings/ui/views/meetings-view";
import { getQueryClient, trpc } from "@/src/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { SearchParams } from "nuqs/server";
import { ErrorBoundary } from "react-error-boundary";
import { auth } from "@/src/lib/auth";



const Page=()=>{

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getMany.queryOptions({})
  );
    return(
         <>
      
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<MeetingsViewLoading />}>
          <ErrorBoundary fallback={<MeetingsViewError />}>
            <MeetingsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
    );
}
export default Page;