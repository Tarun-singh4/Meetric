import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardNavbar } from "@/src/modules/dashboard/ui/components/dashboard-navbar";
import { DashborardSidebar } from "@/src/modules/dashboard/ui/components/dashboard-sidebar";
import { DashboardUserButton } from "@/src/modules/dashboard/ui/components/dashboard-user-button";

interface props{
    children: React.ReactNode;
}

const Layout= ({children}:props)=>{
    return(
        <SidebarProvider>
            <DashborardSidebar/>
            <main className="flex flex-col h-screen w-screen bg-muted">
                <DashboardNavbar/>
                {children}
            </main>
            
        </SidebarProvider>
    );
}

export default Layout;