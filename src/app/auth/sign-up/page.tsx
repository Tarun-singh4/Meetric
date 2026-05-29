
import {auth} from "@/src/lib/auth";
import { headers } from "next/headers";
import {redirect} from "next/navigation";

import { SignUpView } from "@/src/modules/auth/ui/views/sign-up-view";

const Page =async () => {
   const session=await auth.api.getSession({
        headers: await headers()
      });
    
      if(!!session){
        redirect("/");
      }
  return <SignUpView />;
}   

export default Page;