import { SidebarProvider } from "@/components/ui/sidebar";

import { DashborardSidebar } from "@/src/modules/dashboard/ui/components/dashboard-sidebar";

interface props{
    children: React.ReactNode;
}

const Layout= ({children}:props)=>{
    return(
        <SidebarProvider>
            <DashborardSidebar/>
            <main className="flex flex-col h-screen w-screen bg-muted">
                {children}
            </main>
            
        </SidebarProvider>
    );
}

export default Layout;